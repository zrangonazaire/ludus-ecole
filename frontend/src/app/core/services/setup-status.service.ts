import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { SetupStatus } from '@core/models/setup.models';

/**
 * Tracks how far the school's configuration has got.
 *
 * <p>Held in a signal so the sidebar badge, the dashboard banner and the setup
 * page all read the same value, and all refresh together after any change.</p>
 */
@Injectable({ providedIn: 'root' })
export class SetupStatusService {
  private readonly http = inject(HttpClient);

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
      ? of(this.mockStatus()).pipe(delay(250))
      : this.http.get<SetupStatus>(`${environment.apiBaseUrl}/school/setup-status`);

    return source.pipe(tap((status) => this._status.set(status)));
  }

  /** Called after any screen that could complete a step. */
  refresh(): void {
    this.load().subscribe({ error: () => undefined });
  }

  private mockStatus(): SetupStatus {
    const steps: SetupStatus['steps'] = [
      { key: 'CYCLES', label: 'Cycles et niveaux',
        description: 'Definissez les cycles enseignes et leurs niveaux : primaire, college, lycee.',
        done: true, required: true, count: 10,
        actionRoute: '/onboarding', actionLabel: 'Configurer' },
      { key: 'CLASSES', label: 'Classes',
        description: 'Creez les classes de chaque niveau, avec leur capacite maximale.',
        done: true, required: true, count: 6,
        actionRoute: '/classes', actionLabel: 'Gerer les classes' },
      { key: 'SUBJECTS', label: 'Matieres',
        description: 'Renseignez les matieres enseignees et leurs coefficients.',
        done: true, required: true, count: 7,
        actionRoute: '/subjects', actionLabel: 'Gerer les matieres' },
      { key: 'FEES', label: 'Frais de scolarite',
        description: 'Fixez les frais par niveau et leur echeancier.',
        done: false, required: true, count: 0,
        actionRoute: '/finance', actionLabel: 'Definir les frais' },
      { key: 'TEACHERS', label: 'Enseignants',
        description: 'Ajoutez les enseignants et affectez-les aux classes et matieres.',
        done: true, required: true, count: 5,
        actionRoute: '/teachers', actionLabel: 'Ajouter des enseignants' },
      { key: 'STUDENTS', label: 'Eleves inscrits',
        description: 'Inscrivez vos premiers eleves, un a un ou par import Excel.',
        done: false, required: true, count: 0,
        actionRoute: '/enrollments', actionLabel: 'Inscrire des eleves' }
    ];
    const done = steps.filter((s) => s.done).length;
    return {
      schoolId: 'mock-school',
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
