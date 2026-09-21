import { HttpClient } from '@angular/common/http';
import { TeacherAssignmentService } from './teacher-assignment.service';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { environment } from '@env/environment';
import { SetupStatus, SetupStep, SetupStepKey } from '@core/models/setup.models';
import {
  CLASSROOM_DATA_SOURCE, CURRICULUM_DATA_SOURCE, ENROLLMENT_DATA_SOURCE,
  FEE_DATA_SOURCE, REFERENCE_DATA_SOURCE, TEACHER_DATA_SOURCE
} from '@core/datasource/data-source';

/** Wording of each step, in the order a school actually configures itself. */
interface StepDefinition {
  key: SetupStepKey;
  label: string;
  description: string;
  actionRoute: string;
  actionLabel: string;
}

const STEPS: readonly StepDefinition[] = [
  { key: 'ACADEMIC_YEAR', label: "Activer l'année scolaire",
    description: "Définissez la période de référence et ouvrez la campagne d'inscriptions.",
    actionRoute: '/administration', actionLabel: "Configurer l'année" },
  { key: 'CYCLES', label: 'Définir les cycles',
    description: 'Préscolaire, primaire, collège, lycée : indiquez ce que vous enseignez.',
    actionRoute: '/onboarding', actionLabel: 'Choisir les cycles' },
  { key: 'LEVELS', label: 'Créer les niveaux',
    description: "Les niveaux de chaque cycle, dans l'ordre de progression des élèves.",
    actionRoute: '/onboarding', actionLabel: 'Définir les niveaux' },
  { key: 'CLASSES', label: 'Créer les classes',
    description: 'Les classes de chaque niveau, avec leur nom et leur capacité maximale.',
    actionRoute: '/classes', actionLabel: 'Gérer les classes' },
  { key: 'SUBJECTS', label: 'Déclarer les matières',
    description: "La liste des matières enseignées dans l'établissement.",
    actionRoute: '/subjects', actionLabel: 'Gérer les matières' },
  { key: 'CURRICULUM', label: 'Programme et coefficients',
    description: 'Rattachez les matières à chaque niveau avec leur coefficient : '
      + 'sans cela, aucune moyenne ne peut être calculée.',
    actionRoute: '/subjects', actionLabel: 'Définir le programme' },
  { key: 'FEES', label: 'Plan de facturation',
    description: 'Les frais par niveau et leur échéancier, appliqués à chaque inscription.',
    actionRoute: '/finance', actionLabel: 'Définir le plan' },
  { key: 'TEACHERS', label: 'Ajouter les enseignants',
    description: "Le personnel enseignant de l'établissement.",
    actionRoute: '/teachers', actionLabel: 'Ajouter des enseignants' },
  { key: 'ASSIGNMENTS', label: 'Affecter les enseignants',
    description: 'Qui enseigne quelle matière, à quelle classe. '
      + 'Détermine aussi ce que chacun peut saisir.',
    actionRoute: '/teacher-assignments', actionLabel: 'Affecter aux classes' },
  { key: 'STUDENTS', label: 'Inscrire les élèves',
    description: 'Vos premiers élèves, un à un ou par import Excel.',
    actionRoute: '/enrollments', actionLabel: 'Inscrire des élèves' }
];

/**
 * Tracks how far the school's configuration has got.
 *
 * <p>Held in a signal so the sidebar badge, the dashboard banner and the setup
 * page all read the same value, and all refresh together after any change.</p>
 *
 * <p>The count of each step is <em>derived from the data</em>, never remembered.
 * A step done by hand, outside the wizard, ticks itself off; undo it and it
 * unticks. Demo mode obeys the same rule: it recomputes from the mock data
 * sources instead of returning a frozen snapshot, otherwise the indicator would
 * claim to read reality while showing a fixed picture.</p>
 */
@Injectable({ providedIn: 'root' })
export class SetupStatusService {
  private readonly http = inject(HttpClient);
  private readonly reference = inject(REFERENCE_DATA_SOURCE);
  private readonly curriculum = inject(CURRICULUM_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly enrollments = inject(ENROLLMENT_DATA_SOURCE);
  private readonly fees = inject(FEE_DATA_SOURCE);
  private readonly assignments = inject(TeacherAssignmentService);

  private readonly _status = signal<SetupStatus | null>(null);
  readonly status = this._status.asReadonly();

  /** Drives the sidebar badge; null once everything is done. */
  readonly badge = computed(() => {
    const status = this._status();
    if (!status || status.complete) {
      return null;
    }
    return `${status.completedSteps}/${status.totalSteps}`;
  });

  readonly incomplete = computed(() => {
    const status = this._status();
    return status !== null && !status.complete;
  });

  load(): Observable<SetupStatus> {
    const source = environment.useMockData
      ? this.mockStatus()
      : this.http.get<SetupStatus>(`${environment.apiBaseUrl}/school/setup-status`);

    return source.pipe(tap((status) => this._status.set(status)));
  }

  /** Called after any screen that could complete a step. */
  refresh(): void {
    this.load().subscribe({ error: () => undefined });
  }

  /**
   * Demo mode: same ten steps, counted from the mock data sources.
   *
   * Assignment counts come from the same board used by the assignment screen.
   */
  private mockStatus(): Observable<SetupStatus> {
    return forkJoin({
      years: this.reference.academicYears(),
      assignments: this.assignments.board(),
      levels: this.curriculum.levels(),
      subjects: this.curriculum.listSubjects(),
      classes: this.classrooms.list(),
      teachers: this.teachers.search({ page: 0, size: 200 }),
      enrollments: this.enrollments.search({ page: 0, size: 1 }),
      fees: this.fees.levels()
    }).pipe(map((data) => {
      const cycles = new Set(data.levels.map((l) => l.cycleId));
      const assigned = data.assignments.assignments.length;

      const counts: Record<SetupStepKey, number> = {
        ACADEMIC_YEAR: data.years.filter((y) => y.status === 'ACTIVE').length,
        CYCLES: cycles.size,
        LEVELS: data.levels.length,
        CLASSES: data.classes.length,
        SUBJECTS: data.subjects.length,
        // Comme sur le serveur : un niveau ne compte que s'il porte au moins
        // une matière notée. Ouvrir un programme vide ne coche rien.
        CURRICULUM: data.levels.filter((l) => l.ready).length,
        // Un niveau ne compte que s'il porte au moins un frais obligatoire :
        // un tarif facultatif seul ne facture rien à l'inscription.
        FEES: data.fees.filter((l) => l.ready).length,
        TEACHERS: data.teachers.totalElements,
        ASSIGNMENTS: assigned,
        STUDENTS: data.enrollments.totalElements
      };

      return this.assemble(counts);
    }));
  }

  private assemble(counts: Record<SetupStepKey, number>): SetupStatus {
    const steps: SetupStep[] = STEPS.map((definition) => ({
      key: definition.key,
      label: definition.label,
      description: definition.description,
      done: counts[definition.key] > 0,
      required: true,
      count: counts[definition.key],
      actionRoute: definition.actionRoute,
      actionLabel: definition.actionLabel
    }));

    const done = steps.filter((s) => s.done).length;
    return {
      schoolId: 'demo',
      schoolName: environment.schoolName,
      academicYearCode: '2026-2027',
      completedSteps: done,
      totalSteps: steps.length,
      percentComplete: Math.round((done * 100) / steps.length),
      complete: done === steps.length,
      nextStepKey: steps.find((s) => !s.done)?.key,
      steps
    };
  }
}
