import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  CurrencyCode,
  DemoModuleId,
  DemoPriority,
  GradingScale,
  PaymentModeId,
  PeriodScheme,
  SchoolPreset,
  StudentBand
} from '@core/models/demo-setup.models';
import { LEVELS_PER_PRESET, DemoSetupStore } from '@core/services/demo-setup.store';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

type SetupStep = 1 | 2 | 3 | 4;

interface Choice<T extends string> {
  readonly id: T;
  readonly label: string;
  readonly description: string;
}

interface CoachmarkCopy {
  readonly title: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly ctaLabel: string;
}

@Component({
  selector: 'eduops-demo-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo-setup.component.html',
  styleUrl: './demo-setup.component.scss'
})
export class DemoSetupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(DemoSetupStore);
  private readonly destroyRef = inject(DestroyRef);

  private readonly initialDraft = this.store.draft();
  readonly step = signal<SetupStep>(
    Math.min(4, Math.max(1, this.initialDraft.completedStep + 1)) as SetupStep
  );
  readonly formAttempted = signal(false);
  readonly modules = signal<readonly DemoModuleId[]>(this.initialDraft.priorities.modules);
  readonly priority = signal<DemoPriority>(this.initialDraft.priorities.mainPriority);
  readonly paymentModes = signal<readonly PaymentModeId[]>(this.initialDraft.rules.paymentModes);

  readonly profileForm = this.fb.nonNullable.group({
    schoolName: [this.initialDraft.profile.schoolName, [Validators.required, Validators.maxLength(160)]],
    preset: [this.initialDraft.profile.preset, Validators.required],
    country: [this.initialDraft.profile.country, [Validators.required, Validators.maxLength(100)]],
    city: [this.initialDraft.profile.city, [Validators.required, Validators.maxLength(100)]],
    studentBand: [this.initialDraft.profile.studentBand, Validators.required],
    campusCount: [this.initialDraft.profile.campusCount, [Validators.required, Validators.min(1), Validators.max(20)]]
  });

  readonly rulesForm = this.fb.nonNullable.group({
    periodScheme: [this.initialDraft.rules.periodScheme, Validators.required],
    gradingScale: [this.initialDraft.rules.gradingScale, Validators.required],
    rankingEnabled: [this.initialDraft.rules.rankingEnabled],
    classesPerLevel: [this.initialDraft.rules.classesPerLevel,
                      [Validators.required, Validators.min(1), Validators.max(12)]],
    classCapacity: [this.initialDraft.rules.classCapacity, [Validators.required, Validators.min(10), Validators.max(100)]],
    currency: [this.initialDraft.rules.currency, Validators.required]
  });

  /**
   * Combien de classes le profil choisi produira.
   *
   * <p>Les niveaux ne sont pas saisis ici : ils découlent du profil — primaire,
   * secondaire, groupe scolaire. Le total se lit donc de la même table que
   * celle qui sert à créer l'école, et non d'un compte tenu à part qui
   * finirait par diverger.</p>
   */
  readonly plannedClassCount = computed(() => {
    const levels = LEVELS_PER_PRESET[this.profileForm.controls.preset.value] ?? 0;
    return levels * (this.rulesForm.controls.classesPerLevel.value || 0);
  });

  readonly plannedSeatCount = computed(() =>
    this.plannedClassCount() * (this.rulesForm.controls.classCapacity.value || 0));

  readonly presets: readonly Choice<SchoolPreset>[] = [
    { id: 'primary', label: 'Primaire', description: 'Cycles, classes et suivi adaptés aux plus jeunes.' },
    { id: 'secondary', label: 'Secondaire', description: 'Matières, coefficients et bulletins structurés.' },
    { id: 'group', label: 'Groupe scolaire', description: 'Plusieurs cycles ou campus dans une même vision.' }
  ];

  readonly priorities: readonly Choice<DemoPriority>[] = [
    { id: 'organize', label: 'Tout organiser', description: 'Réunir les opérations dans un espace cohérent.' },
    { id: 'collect', label: 'Mieux encaisser', description: 'Clarifier les échéances et le suivi des règlements.' },
    { id: 'engage', label: 'Mieux communiquer', description: 'Fluidifier les échanges avec les familles.' }
  ];

  readonly availableModules: readonly Choice<DemoModuleId>[] = [
    { id: 'students', label: 'Élèves & inscriptions', description: 'Dossiers et admissions' },
    { id: 'pedagogy', label: 'Pédagogie', description: 'Notes, bulletins, présences' },
    { id: 'finance', label: 'Finances', description: 'Frais et règlements' },
    { id: 'communication', label: 'Communication', description: 'Messages aux familles' },
    { id: 'analytics', label: 'Pilotage', description: 'Indicateurs et rapports' },
    { id: 'administration', label: 'Administration', description: 'Équipe, rôles et accès' }
  ];

  readonly paymentChoices: readonly Choice<PaymentModeId>[] = [
    { id: 'cash', label: 'Espèces', description: 'Paiement au guichet' },
    { id: 'mobile-money', label: 'Mobile Money', description: 'Paiement mobile' },
    { id: 'transfer', label: 'Virement', description: 'Paiement bancaire' },
    { id: 'card', label: 'Carte', description: 'Paiement par carte' }
  ];

  readonly stepItems: readonly { id: SetupStep; label: string }[] = [
    { id: 1, label: 'Profil' },
    { id: 2, label: 'Priorités' },
    { id: 3, label: 'Règles' },
    { id: 4, label: 'Aperçu' }
  ];

  readonly coachmarks: Record<SetupStep, CoachmarkCopy> = {
    1: {
      title: 'Une démo qui vous ressemble',
      description: 'Choisissez le profil, la taille et la localisation de votre école pour obtenir un scénario vraiment pertinent.',
      points: ['Aucune donnée d’élève', 'Brouillon privé'],
      ctaLabel: 'Décrire mon école'
    },
    2: {
      title: 'Choisissez votre cap',
      description: 'Indiquez votre objectif principal et les espaces à explorer. La démonstration mettra d’abord en avant ce qui compte.',
      points: ['Une priorité claire', 'Modules au choix'],
      ctaLabel: 'Choisir mon cap'
    },
    3: {
      title: 'Gardez vos habitudes',
      description: 'Définissez périodes, notation, capacité, devise et paiements. Ces choix prépareront votre scénario scolaire.',
      points: ['Résultat visible immédiatement', 'Toujours modifiable'],
      ctaLabel: 'Régler mon cadre'
    },
    4: {
      title: 'Votre scénario est prêt',
      description: 'Relisez votre profil, vos priorités et vos règles avant de créer l’espace qui servira de base à votre démonstration.',
      points: ['Résumé en un regard', 'Retour toujours possible'],
      ctaLabel: 'Examiner mon scénario'
    }
  };

  readonly countries = ['Côte d’Ivoire', 'Bénin', 'Burkina Faso', 'Cameroun', 'Guinée', 'Mali', 'Maroc', 'RDC', 'Sénégal', 'Togo'];
  readonly studentBands: readonly { value: StudentBand; label: string }[] = [
    { value: '1-100', label: 'Jusqu’à 100 élèves' },
    { value: '101-300', label: '101 à 300 élèves' },
    { value: '301-700', label: '301 à 700 élèves' },
    { value: '700+', label: 'Plus de 700 élèves' }
  ];
  readonly currencies: readonly { value: CurrencyCode; label: string }[] = [
    { value: 'XOF', label: 'Franc CFA (XOF)' },
    { value: 'GNF', label: 'Franc guinéen (GNF)' },
    { value: 'CDF', label: 'Franc congolais (CDF)' },
    { value: 'MAD', label: 'Dirham marocain (MAD)' },
    { value: 'EUR', label: 'Euro (EUR)' }
  ];

  readonly draft = this.store.draft;
  readonly coachmark = computed(() => this.coachmarks[this.step()]);
  readonly progressWidth = computed(() => `${this.step() * 25}%`);
  readonly maxReachableStep = computed(() =>
    Math.min(4, this.draft().completedStep + 1) as SetupStep
  );
  readonly selectedModuleLabels = computed(() =>
    this.availableModules
      .filter((choice) => this.modules().includes(choice.id))
      .map((choice) => choice.label)
  );

  constructor() {
    this.profileForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.store.updateProfile(this.profileForm.getRawValue()));

    this.rulesForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.persistRules());
  }

  choosePreset(preset: SchoolPreset): void {
    this.profileForm.controls.preset.setValue(preset);
  }

  choosePriority(priority: DemoPriority): void {
    this.priority.set(priority);
    this.store.updatePriorities({ mainPriority: priority, modules: this.modules() });
  }

  toggleModule(module: DemoModuleId): void {
    const current = this.modules();
    const modules = current.includes(module)
      ? current.filter((item) => item !== module)
      : [...current, module];
    this.modules.set(modules);
    this.store.updatePriorities({ mainPriority: this.priority(), modules });
  }

  setPeriodScheme(value: PeriodScheme): void {
    this.rulesForm.controls.periodScheme.setValue(value);
  }

  setGradingScale(value: GradingScale): void {
    this.rulesForm.controls.gradingScale.setValue(value);
  }

  togglePaymentMode(mode: PaymentModeId): void {
    const current = this.paymentModes();
    const modes = current.includes(mode)
      ? current.filter((item) => item !== mode)
      : [...current, mode];
    this.paymentModes.set(modes);
    this.persistRules();
  }

  next(): void {
    const current = this.step();
    this.formAttempted.set(true);

    if (current === 1 && this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    if (current === 2 && this.modules().length === 0) {
      return;
    }
    if (current === 3 && (this.rulesForm.invalid || this.paymentModes().length === 0)) {
      this.rulesForm.markAllAsTouched();
      return;
    }

    this.store.markStepCompleted(current);
    if (current < 4) {
      this.step.set((current + 1) as SetupStep);
      this.formAttempted.set(false);
      this.focusStepStart();
    }
  }

  previous(): void {
    const current = this.step();
    if (current > 1) {
      this.step.set((current - 1) as SetupStep);
      this.formAttempted.set(false);
      this.focusStepStart();
    }
  }

  goToStep(target: SetupStep): void {
    if (target > this.maxReachableStep()) {
      return;
    }
    this.step.set(target);
    this.formAttempted.set(false);
    this.focusStepStart();
  }

  complete(): void {
    this.store.markStepCompleted(4);
  }

  restart(): void {
    this.store.reset();
    const fresh = this.store.draft();
    this.profileForm.reset(fresh.profile);
    this.rulesForm.reset({
      periodScheme: fresh.rules.periodScheme,
      gradingScale: fresh.rules.gradingScale,
      rankingEnabled: fresh.rules.rankingEnabled,
      classCapacity: fresh.rules.classCapacity,
      currency: fresh.rules.currency
    });
    this.priority.set(fresh.priorities.mainPriority);
    this.modules.set(fresh.priorities.modules);
    this.paymentModes.set(fresh.rules.paymentModes);
    this.step.set(1);
    this.formAttempted.set(false);
    this.focusStepStart();
  }

  presetLabel(value: SchoolPreset): string {
    return this.presets.find((item) => item.id === value)?.label ?? value;
  }

  priorityLabel(value: DemoPriority): string {
    return this.priorities.find((item) => item.id === value)?.label ?? value;
  }

  periodLabel(value: PeriodScheme): string {
    return value === 'trimester' ? '3 trimestres' : '2 semestres';
  }

  scaleLabel(value: GradingScale): string {
    const labels: Record<GradingScale, string> = {
      '20': 'Notes sur 20',
      '100': 'Notes sur 100',
      competency: 'Compétences'
    };
    return labels[value];
  }

  private persistRules(): void {
    this.store.updateRules({
      ...this.rulesForm.getRawValue(),
      paymentModes: this.paymentModes()
    });
  }

  focusStepStart(): void {
    if (typeof document === 'undefined') {
      return;
    }
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#setup-step-title')?.focus());
  }
}
