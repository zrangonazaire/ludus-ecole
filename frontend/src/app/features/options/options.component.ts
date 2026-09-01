import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OPTION_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentSummary } from '@core/models/domain.models';
import {
  AcademicOption, OPTION_CATEGORIES, OPTION_CHOICE_STATES, OPTION_COLORS, OptionCategory,
  OptionChoice, OptionChoiceStatus, OptionLevel, OptionOffering, OptionOverview
} from '@core/models/option.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/** Les trois moments d'une campagne d'options. */
export type OptionsTab = 'CATALOGUE' | 'NIVEAUX' | 'VOEUX';

/** Wording of the coachmark shown once per tab, exactly as in the setup flow. */
interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
  ctaLabel: string;
}

/**
 * Options and languages: the catalogue, where each is open, and who chose what.
 *
 * <p>An option is the one thing in a school that is chosen rather than
 * assigned, and choice needs capacity. Everything on this screen turns on that:
 * a wish beyond the seats available is not refused, it is put on a waiting
 * list — and when somebody cancels, that list is the only reason a seat gets
 * offered to anyone.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back.</p>
 */
@Component({
  selector: 'eduops-options',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit {
  private readonly dataSource = inject(OPTION_DATA_SOURCE);
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = OPTION_CATEGORIES;
  readonly states = OPTION_CHOICE_STATES;
  readonly colors = OPTION_COLORS;
  readonly totalSteps = 3;

  readonly tab = signal<OptionsTab>('CATALOGUE');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly overview = signal<OptionOverview | null>(null);
  readonly choices = signal<OptionChoice[]>([]);
  readonly choiceTotal = signal(0);

  /** Filtres de l'onglet des vœux. */
  readonly levelFilter = signal('');
  readonly statusFilter = signal<OptionChoiceStatus | ''>('');
  readonly search = signal('');

  /** L'option en cours de création ou de modification. */
  readonly editing = signal<AcademicOption | null>(null);
  readonly formOpen = signal(false);

  /** L'option dont on règle les niveaux d'ouverture. */
  readonly offeringFor = signal<AcademicOption | null>(null);
  readonly selectedLevels = signal<string[]>([]);

  /** Le panneau d'affectation d'un élève. */
  readonly assignOpen = signal(false);
  readonly candidates = signal<StudentSummary[]>([]);

  readonly optionForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    category: ['LANGUAGE' as OptionCategory, [Validators.required]],
    languageCode: ['', [Validators.maxLength(10)]],
    description: ['', [Validators.maxLength(1000)]],
    colorHex: [OPTION_COLORS[0]]
  });

  readonly offeringForm = this.fb.nonNullable.group({
    capacity: [30, [Validators.required, Validators.min(1), Validators.max(500)]],
    weeklyHours: [2, [Validators.required, Validators.min(0.25)]],
    choiceStartDate: [''],
    choiceEndDate: ['']
  });

  readonly assignForm = this.fb.nonNullable.group({
    offeringId: ['', [Validators.required]],
    studentId: ['', [Validators.required]],
    priority: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    notes: ['', [Validators.maxLength(1000)]],
    confirmImmediately: [true]
  });

  // ------------------------------------------------------------------ aide

  private readonly help: Record<OptionsTab, HelpCopy> = {
    CATALOGUE: {
      step: 1,
      title: 'Une option existe une fois pour tout l\'établissement',
      description: "Le latin, l'espagnol ou la chorale se déclarent ici une seule "
        + 'fois. Ce qui change d\'un niveau à l\'autre, c\'est la capacité, le volume '
        + 'horaire et la période de choix — cela se règle dans l\'onglet suivant.',
      points: [
        'Une langue vivante porte son code ISO : c\'est lui qui permettra plus tard '
        + 'de distinguer une LV1 d\'une LV2 dans les bulletins et les emplois du temps.',
        'Une option déjà choisie par des élèves ne s\'archive pas. Ils se '
        + 'retrouveraient sans enseignement, sans que rien ne le signale.',
        'La couleur n\'est pas décorative : c\'est elle qui rend une option '
        + 'reconnaissable dans l\'emploi du temps et dans les listes de vœux.'
      ],
      ctaLabel: 'Voir le catalogue'
    },
    NIVEAUX: {
      step: 2,
      title: 'Une option s\'ouvre niveau par niveau, avec une capacité',
      description: 'Cocher les niveaux ouvre l\'option pour chacun d\'eux avec la même '
        + 'capacité et le même horaire. C\'est un remplacement : un niveau décoché '
        + 'ferme son offre.',
      points: [
        'La capacité n\'est pas indicative. Au-delà, un vœu n\'est pas refusé : il '
        + 'passe en liste d\'attente, et une annulation libère une place pour le '
        + 'premier de la liste.',
        'La capacité ne peut pas descendre en dessous des places déjà confirmées : '
        + 'des élèves se retrouveraient inscrits à un cours qui ne peut pas les '
        + 'accueillir.',
        'La fenêtre de choix borne la campagne. Hors de ces dates, les familles ne '
        + 'saisissent plus, et l\'établissement peut arbitrer sur une liste stable.'
      ],
      ctaLabel: 'Ouvrir les niveaux'
    },
    VOEUX: {
      step: 3,
      title: 'Les vœux se traitent par ordre d\'arrivée et de priorité',
      description: 'Chaque élève classe ses vœux. L\'écran remonte d\'abord ce qui '
        + 'attend une décision, puis la liste d\'attente, puis ce qui est réglé.',
      points: [
        'Un élève ne peut choisir qu\'une option ouverte à son propre niveau : '
        + 'ailleurs, elle ne tomberait sur aucune heure de son emploi du temps.',
        'Confirmer au-delà de la capacité est refusé. C\'est le seul geste que '
        + 'l\'écran empêche, parce qu\'il crée un effectif que la salle ne peut pas '
        + 'contenir.',
        'Annuler une place confirmée la rend immédiatement disponible. C\'est ce qui '
        + 'donne un sens à la liste d\'attente.'
      ],
      ctaLabel: 'Traiter les vœux'
    }
  };

  readonly helpCopy = computed<HelpCopy>(() => this.help[this.tab()]);

  // --------------------------------------------------------------- cycle

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.overview()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (overview) => {
          this.overview.set(overview);
          this.loading.set(false);
          if (this.tab() === 'VOEUX') {
            this.loadChoices();
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(true);
          this.explain(err);
        }
      });
  }

  loadChoices(): void {
    this.dataSource.choices({
      levelId: this.levelFilter() || undefined,
      status: this.statusFilter() || undefined,
      search: this.search() || undefined,
      page: 0,
      size: 100
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (page) => {
        this.choices.set(page.content);
        this.choiceTotal.set(page.totalElements);
      },
      error: (err) => this.explain(err)
    });
  }

  changeTab(tab: OptionsTab): void {
    this.tab.set(tab);
    this.closeForm();
    this.closeOfferings();
    this.assignOpen.set(false);
    if (tab === 'VOEUX') {
      this.loadChoices();
    }
  }

  changeLevelFilter(levelId: string): void {
    this.levelFilter.set(levelId);
    this.loadChoices();
  }

  changeStatusFilter(status: string): void {
    this.statusFilter.set(status as OptionChoiceStatus | '');
    this.loadChoices();
  }

  changeSearch(term: string): void {
    this.search.set(term);
    this.loadChoices();
  }

  // ------------------------------------------------------------- les vues

  readonly options = computed<AcademicOption[]>(() => this.overview()?.options ?? []);
  readonly levels = computed<OptionLevel[]>(() => this.overview()?.levels ?? []);

  /** Toutes les offres, à plat : c'est ce que remplit la liste de choix. */
  readonly allOfferings = computed<OptionOffering[]>(
    () => this.options().flatMap((option) => option.offerings));

  /** Les offres pleines : la liste d'attente commence là. */
  readonly fullOfferings = computed(
    () => this.allOfferings().filter((offering) => offering.availableSeats === 0));

  /** Ce que propose un niveau donné, pour la grille de l'onglet Niveaux. */
  offeringAt(option: AcademicOption, levelId: string): OptionOffering | undefined {
    return option.offerings.find((offering) => offering.levelId === levelId);
  }

  optionOf(offeringId: string): AcademicOption | undefined {
    return this.options().find(
      (option) => option.offerings.some((offering) => offering.id === offeringId));
  }

  stateOf(status: OptionChoiceStatus) {
    return this.states.find((state) => state.code === status) ?? this.states[0];
  }

  /** Taux de remplissage, pour la barre de la grille. */
  fillOf(offering: OptionOffering): number {
    return offering.capacity > 0
      ? Math.min(100, Math.round((offering.confirmedCount * 100) / offering.capacity))
      : 0;
  }

  // --------------------------------------------------------- le catalogue

  openForm(option?: AcademicOption): void {
    this.editing.set(option ?? null);
    this.optionForm.reset({
      code: option?.code ?? '',
      name: option?.name ?? '',
      category: option?.category ?? 'LANGUAGE',
      languageCode: option?.languageCode ?? '',
      description: option?.description ?? '',
      colorHex: option?.colorHex ?? OPTION_COLORS[0]
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.editing.set(null);
  }

  pickColor(color: string): void {
    this.optionForm.patchValue({ colorHex: color });
  }

  submitForm(): void {
    if (this.optionForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.optionForm.getRawValue();
    const payload = {
      code: value.code.trim().toUpperCase(),
      name: value.name.trim(),
      category: value.category,
      languageCode: value.languageCode.trim() || undefined,
      description: value.description.trim() || undefined,
      colorHex: value.colorHex
    };
    const option = this.editing();
    const request = option
      ? this.dataSource.update(option.id, payload)
      : this.dataSource.create(payload);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (overview) => {
        this.overview.set(overview);
        this.saving.set(false);
        this.closeForm();
        this.notifications.success(
          option
            ? `${payload.name} est à jour.`
            : `${payload.name} est au catalogue. Ouvrez-la sur les niveaux concernés.`,
          option ? 'Option modifiée' : 'Option créée');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  archive(option: AcademicOption): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.archive(option.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (overview) => {
          this.overview.set(overview);
          this.saving.set(false);
          this.notifications.success(
            `${option.name} n'apparaît plus dans les listes de choix.`, 'Option archivée');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ----------------------------------------------------------- les niveaux

  openOfferings(option: AcademicOption): void {
    this.offeringFor.set(option);
    this.selectedLevels.set(option.offerings.map((offering) => offering.levelId));
    const reference = option.offerings[0];
    this.offeringForm.reset({
      capacity: reference?.capacity ?? 30,
      weeklyHours: reference?.weeklyHours ?? 2,
      choiceStartDate: reference?.choiceStartDate ?? '',
      choiceEndDate: reference?.choiceEndDate ?? ''
    });
  }

  closeOfferings(): void {
    this.offeringFor.set(null);
  }

  toggleLevel(levelId: string): void {
    this.selectedLevels.update((list) => list.includes(levelId)
      ? list.filter((id) => id !== levelId)
      : [...list, levelId]);
  }

  isSelected(levelId: string): boolean {
    return this.selectedLevels().includes(levelId);
  }

  /** Ce qu'un décochage fermerait : l'écran le dit avant d'enregistrer. */
  readonly closingLevels = computed<OptionOffering[]>(() => {
    const option = this.offeringFor();
    if (!option) {
      return [];
    }
    return option.offerings.filter(
      (offering) => !this.selectedLevels().includes(offering.levelId));
  });

  submitOfferings(): void {
    const option = this.offeringFor();
    if (!option || this.offeringForm.invalid || this.saving()) {
      return;
    }
    if (this.selectedLevels().length === 0) {
      this.notifications.error(
        'Choisissez au moins un niveau : une option ouverte nulle part ne peut être '
        + 'choisie par personne.', 'Aucun niveau');
      return;
    }
    this.saving.set(true);
    const value = this.offeringForm.getRawValue();
    this.dataSource.saveOfferings(option.id, {
      levelIds: this.selectedLevels(),
      capacity: value.capacity,
      weeklyHours: value.weeklyHours,
      choiceStartDate: value.choiceStartDate || undefined,
      choiceEndDate: value.choiceEndDate || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (overview) => {
        this.overview.set(overview);
        this.saving.set(false);
        this.closeOfferings();
        this.notifications.success(
          `${option.name} est ouverte sur ${this.selectedLevels().length} niveau(x), `
          + `${value.capacity} places chacun.`,
          'Niveaux enregistrés');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------------------- les vœux

  openAssign(offering?: OptionOffering): void {
    this.assignForm.reset({
      offeringId: offering?.id ?? '',
      studentId: '',
      priority: 1,
      notes: '',
      confirmImmediately: true
    });
    this.candidates.set([]);
    this.assignOpen.set(true);
    if (offering) {
      this.loadCandidates(offering.id);
    }
  }

  closeAssign(): void {
    this.assignOpen.set(false);
  }

  /** Ne propose que les élèves du niveau où l'option est ouverte. */
  onOfferingChosen(offeringId: string): void {
    this.assignForm.patchValue({ offeringId, studentId: '' });
    this.loadCandidates(offeringId);
  }

  private loadCandidates(offeringId: string): void {
    const offering = this.allOfferings().find((row) => row.id === offeringId);
    if (!offering) {
      this.candidates.set([]);
      return;
    }
    this.students.search({ page: 0, size: 500 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (page) => this.candidates.set(page.content.filter(
          (student) => student.levelName === offering.levelName)),
        error: () => this.candidates.set([])
      });
  }

  /** L'offre visée par le formulaire, pour afficher les places restantes. */
  readonly assignTarget = computed<OptionOffering | undefined>(() => {
    const id = this.assignForm.controls.offeringId.value;
    return this.allOfferings().find((offering) => offering.id === id);
  });

  submitAssign(): void {
    if (this.assignForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.assignForm.getRawValue();
    this.dataSource.assign({
      studentId: value.studentId,
      offeringId: value.offeringId,
      priority: value.priority,
      notes: value.notes.trim() || undefined,
      confirmImmediately: value.confirmImmediately
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (choice) => {
        this.saving.set(false);
        this.closeAssign();
        this.load();
        this.notifications.success(
          choice.status === 'WAITLISTED'
            ? `${choice.studentName} est sur la liste d'attente de ${choice.optionName} : `
              + 'la classe est complète. Une annulation lui rendra la place.'
            : `${choice.studentName} est inscrit en ${choice.optionName}.`,
          choice.statusLabel);
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  changeStatus(choice: OptionChoice, status: OptionChoiceStatus): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.changeChoiceStatus(choice.id, status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.saving.set(false);
          this.load();
          this.notifications.success(
            status === 'CANCELLED'
              ? `${saved.studentName} est retiré de ${saved.optionName}. La place est `
                + 'de nouveau disponible.'
              : `${saved.studentName} — ${saved.optionName} : ${saved.statusLabel.toLowerCase()}.`,
            'Vœu mis à jour');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ------------------------------------------------------------- affichage

  categoryHint(category: OptionCategory): string {
    return this.categories.find((item) => item.code === category)?.hint ?? '';
  }

  formatDate(iso: string | undefined): string {
    if (!iso) {
      return '';
    }
    return new Date(`${iso}T00:00:00`)
      .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  }

  /** Traduit le code du serveur plutôt que d'afficher « erreur ». */
  private explain(err: unknown): void {
    const error = (err as { error?: { code?: string; message?: string } })?.error;
    if (error?.code) {
      this.notifications.error(
        error.message ?? translateErrorCode(error.code), 'Action refusée');
      return;
    }
    // En démonstration, le magasin lève un code nu plutôt qu'une réponse HTTP.
    const code = (err as { message?: string })?.message;
    if (code && /^[A-Z_]+$/.test(code)) {
      this.notifications.error(translateErrorCode(code), 'Action refusée');
    }
  }
}
