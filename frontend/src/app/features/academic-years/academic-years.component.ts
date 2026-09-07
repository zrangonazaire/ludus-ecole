import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import {
  AcademicYear, TERM_TYPES, Term, TermType
} from '@core/models/academic-year.models';
import { AcademicYearService } from '@core/services/academic-year.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/**
 * Années scolaires et découpage en périodes.
 *
 * <p>L'action lourde de cet écran est la bascule d'année : une vingtaine
 * d'autres écrans lisent l'année de travail, et en changer ne casse rien —
 * tout se met simplement à décrire une autre année. C'est précisément ce qui
 * la rend dangereuse, et pourquoi elle demande une confirmation qui nomme ce
 * que contient l'année quittée.</p>
 */
@Component({
  selector: 'eduops-academic-years',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent,
    ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './academic-years.component.html',
  styleUrl: './academic-years.component.scss'
})
export class AcademicYearsComponent implements OnInit {
  private readonly years = inject(AcademicYearService);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly termTypes = TERM_TYPES;

  readonly list = signal<AcademicYear[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly saving = signal(false);
  readonly creating = signal(false);
  readonly switching = signal<AcademicYear | null>(null);
  readonly expanded = signal<string | null>(null);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.ACADEMIC_YEAR_MANAGE));
  readonly current = computed(() => this.list().find((year) => year.active) ?? null);

  readonly form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(30)]],
    label: ['', Validators.maxLength(120)],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    termType: ['TRIMESTER' as TermType, Validators.required],
    termCount: [3, [Validators.required, Validators.min(1), Validators.max(6)]]
  });

  /** Ce que le serveur créera, calculé avec la même règle que lui. */
  readonly preview = signal<Term[]>([]);

  /** Vide tant que les dates ne permettent pas un découpage valable. */
  readonly previewImpossible = computed(() => {
    const value = this.form.getRawValue();
    return Boolean(value.startDate && value.endDate) && this.preview().length === 0;
  });

  readonly helpCopy = {
    title: 'Une année, puis ses périodes',
    description: 'L’année porte les inscriptions, les classes et les frais. '
      + 'Ses périodes portent les notes et les bulletins : sans elles, le '
      + 'carnet reste vide. Le découpage proposé est ajustable, mais il '
      + 'couvre toujours l’année entière, sans trou.',
    points: [
      'Créer une année ne bascule rien : on prépare la rentrée pendant que '
        + 'l’année en cours tourne encore.',
      'Activer une année change ce que voient tous les autres écrans. '
        + 'L’ancienne passe en clôture, et reste consultable.',
      'Le code sert de référence stable — « 2026-2027 » plutôt que '
        + '« Année en cours ».'
    ]
  };

  ngOnInit(): void {
    this.load();
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.refreshPreview());
  }

  load(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.years.list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (years) => {
          this.list.set(years);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.failed.set(true);
        }
      });
  }

  openCreate(): void {
    const suggestion = this.suggestNextYear();
    this.form.reset({
      code: suggestion.code,
      label: '',
      startDate: suggestion.startDate,
      endDate: suggestion.endDate,
      termType: 'TRIMESTER',
      termCount: 3
    });
    this.refreshPreview();
    this.creating.set(true);
  }

  closeCreate(): void {
    this.creating.set(false);
  }

  /** Change le nombre de périodes par défaut quand on change de découpage. */
  onTermTypeChange(type: TermType): void {
    const preset = TERM_TYPES.find((item) => item.code === type);
    this.form.patchValue({ termType: type, termCount: preset?.defaultCount ?? 3 });
  }

  refreshPreview(): void {
    const value = this.form.getRawValue();
    this.preview.set(this.years.previewTerms(
      value.startDate, value.endDate, value.termType, Number(value.termCount)));
  }

  submit(): void {
    if (this.form.invalid || this.saving() || this.preview().length === 0) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.saving.set(true);
    this.years.create({
      code: value.code.trim(),
      label: value.label.trim() || undefined,
      startDate: value.startDate,
      endDate: value.endDate,
      termType: value.termType,
      termCount: Number(value.termCount)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (year) => {
        this.saving.set(false);
        this.creating.set(false);
        this.notifications.success(
          `${year.code} créée avec ${year.terms.length} période(s).`,
          'Année enregistrée');
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(this.messageOf(err), 'Création refusée');
      }
    });
  }

  askSwitch(year: AcademicYear): void {
    this.switching.set(year);
  }

  cancelSwitch(): void {
    this.switching.set(null);
  }

  confirmSwitch(): void {
    const year = this.switching();
    if (!year || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.years.activate(year.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (activated) => {
          this.saving.set(false);
          this.switching.set(null);
          this.notifications.success(
            `Tous les écrans travaillent maintenant sur ${activated.code}.`,
            'Année de travail changée');
          this.load();
        },
        error: (err) => {
          this.saving.set(false);
          this.notifications.error(this.messageOf(err), 'Bascule refusée');
        }
      });
  }

  toggleTerms(yearId: string): void {
    this.expanded.update((open) => (open === yearId ? null : yearId));
  }

  statusTone(year: AcademicYear): string {
    return year.status.toLowerCase();
  }

  /**
   * L'année suivante, proposée par défaut.
   *
   * <p>Une rentrée ivoirienne s'ouvre en septembre et se ferme en juillet.
   * Proposer ces dates évite six saisies dans le cas courant ; elles restent
   * modifiables pour les établissements qui suivent un autre calendrier.</p>
   */
  private suggestNextYear(): { code: string; startDate: string; endDate: string } {
    const latest = this.list()[0];
    const base = latest ? Number(latest.code.slice(0, 4)) + 1 : new Date().getFullYear();
    const start = Number.isNaN(base) ? new Date().getFullYear() : base;
    return {
      code: `${start}-${start + 1}`,
      startDate: `${start}-09-01`,
      endDate: `${start + 1}-07-31`
    };
  }

  private messageOf(err: unknown): string {
    const failure = (err as { error?: { code?: string; message?: string } })?.error;
    // Le message du serveur d'abord : il nomme le code en doublon ou la durée
    // insuffisante, là où le code d'erreur ne rend qu'une phrase générique.
    return failure?.message?.trim()
      || translateErrorCode(failure?.code ?? 'UNKNOWN');
  }
}
