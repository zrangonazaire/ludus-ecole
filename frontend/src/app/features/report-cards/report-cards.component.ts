import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, REFERENCE_DATA_SOURCE, REPORT_CARD_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, Term } from '@core/models/domain.models';
import {
  COUNCIL_DECISIONS, CouncilDecision, REPORT_CARD_STATES, ReportCard, ReportCardBatch,
  ReportCardStatus
} from '@core/models/report-card.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/** The three moments of a report card, in the order the term ends. */
export type ReportCardTab = 'GENERATION' | 'RELECTURE' | 'REMISE';

/** Wording of the coachmark shown once per tab, exactly as in the setup flow. */
interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
  ctaLabel: string;
}

/**
 * Report cards: computing them, reviewing them, handing them out.
 *
 * <p>A report card is the one document a school produces that a family keeps
 * for years. It is also the only place where everything else — the marks, the
 * coefficients, the attendance register — is added up and shown to someone
 * outside the school. That is why nothing here is recomputed on the fly: what
 * is printed in December must still read the same in June.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back.</p>
 */
@Component({
  selector: 'eduops-report-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './report-cards.component.html',
  styleUrl: './report-cards.component.scss'
})
export class ReportCardsComponent implements OnInit {
  private readonly dataSource = inject(REPORT_CARD_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly reference = inject(REFERENCE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly decisions = COUNCIL_DECISIONS;
  readonly states = REPORT_CARD_STATES;
  readonly totalSteps = 3;

  readonly tab = signal<ReportCardTab>('GENERATION');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly classroomList = signal<Classroom[]>([]);
  readonly termList = signal<Term[]>([]);
  readonly classroomId = signal('');
  readonly termId = signal('');

  readonly batch = signal<ReportCardBatch | null>(null);

  /** Le bulletin ouvert en relecture ; nul quand le panneau est fermé. */
  readonly reviewing = signal<ReportCard | null>(null);

  /** Les bulletins envoyés à l'impression ; vide hors impression. */
  readonly printing = signal<ReportCard[]>([]);

  readonly remarkForm = this.fb.nonNullable.group({
    generalRemark: ['', [Validators.maxLength(2000)]],
    headTeacherRemark: ['', [Validators.maxLength(2000)]],
    principalRemark: ['', [Validators.maxLength(2000)]],
    councilDecision: ['PENDING_DECISION' as CouncilDecision]
  });

  // ------------------------------------------------------------------ aide

  private readonly help: Record<ReportCardTab, HelpCopy> = {
    GENERATION: {
      step: 1,
      title: 'Un bulletin se calcule une fois, pour toute la classe',
      description: 'La classe entière part en une passe. Sans cela le rang n\'a pas '
        + 'de sens : chaque bulletin porte la position de son élève parmi les autres, '
        + 'calculée sur les mêmes notes au même moment.',
      points: [
        'La génération est refusée tant qu\'un devoir de la période n\'a pas ses '
        + 'notes validées. Les moyennes porteraient sur une partie du travail, et '
        + 'rien en aval ne s\'en apercevrait.',
        'Un élève sans aucune note validée sortirait avec un bulletin vide. L\'écran '
        + 'le dit avant, parce que c\'est un problème de saisie, pas de bulletin.',
        'Rien n\'est recalculé à la lecture. Un bulletin remis en décembre doit dire '
        + 'en juin exactement ce qu\'il disait alors.'
      ],
      ctaLabel: 'Générer les bulletins'
    },
    RELECTURE: {
      step: 2,
      title: 'Les appréciations sont la seule partie qu\'un humain écrit',
      description: 'Les moyennes sortent des notes. Le mot du professeur principal, '
        + 'celui du chef d\'établissement et la décision du conseil sont ajoutés ici, '
        + 'et ne sont jamais régénérés.',
      points: [
        'Le classement se lit d\'un coup d\'œil : moyenne, rang, écart à la moyenne '
        + 'de classe. Un élève très au-dessus ou très en dessous se voit sans '
        + 'ouvrir son bulletin.',
        '« Décision en attente » est la valeur honnête tant que le conseil ne s\'est '
        + 'pas réuni. Pré-remplir « Admis » mettrait des mots dans sa bouche.',
        'Une fois le bulletin remis, les appréciations sont figées elles aussi : '
        + 'elles font partie du document que la famille a reçu.'
      ],
      ctaLabel: 'Relire les bulletins'
    },
    REMISE: {
      step: 3,
      title: 'Les bulletins se remettent ensemble',
      description: 'Publier un par un ferait que certaines familles voient les notes '
        + 'plusieurs jours avant les autres — et c\'est le genre de chose qui finit '
        + 'en discussion dans un couloir.',
      points: [
        'La remise est refusée tant qu\'un bulletin n\'a pas de moyenne générale. Un '
        + 'bulletin vide n\'apprend rien à une famille et ne peut pas être contesté.',
        'Chaque bulletin porte un code de vérification. Une école peut contrôler un '
        + 'papier qu\'on lui présente : un document que personne ne peut vérifier '
        + 'est un document que n\'importe qui peut fabriquer.',
        'Une note corrigée après la remise ne réécrit pas le bulletin : elle produit '
        + 'la révision suivante, et l\'ancienne reste consultable.'
      ],
      ctaLabel: 'Remettre aux familles'
    }
  };

  readonly helpCopy = computed<HelpCopy>(() => this.help[this.tab()]);

  // --------------------------------------------------------------- cycle

  ngOnInit(): void {
    forkJoin({
      classrooms: this.classrooms.list(),
      years: this.reference.academicYears()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.classroomList.set(data.classrooms);
        const active = data.years.find((year) => year.status === 'ACTIVE') ?? data.years[0];
        if (!active) {
          this.loading.set(false);
          return;
        }
        this.loadTerms(active.id);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  private loadTerms(academicYearId: string): void {
    this.reference.terms(academicYearId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (terms) => {
          this.termList.set(terms);
          // La période de saisie en cours d'abord : c'est celle qu'on clôture.
          const current = terms.find((term) => term.status === 'GRADE_ENTRY')
            ?? terms.find((term) => term.status === 'OPEN')
            ?? terms[0];
          this.termId.set(current?.id ?? '');
          this.classroomId.set(this.classroomList()[0]?.id ?? '');
          this.load();
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        }
      });
  }

  load(): void {
    if (!this.classroomId() || !this.termId()) {
      this.loading.set(false);
      return;
    }
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.batch({ classroomId: this.classroomId(), termId: this.termId() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (batch) => {
          this.batch.set(batch);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(true);
          this.explain(err);
        }
      });
  }

  changeTab(tab: ReportCardTab): void {
    this.tab.set(tab);
    this.closeReview();
  }

  changeClassroom(classroomId: string): void {
    this.classroomId.set(classroomId);
    this.load();
  }

  changeTerm(termId: string): void {
    this.termId.set(termId);
    this.load();
  }

  // ------------------------------------------------------------- les vues

  /** Ce que montre l'onglet courant. Les compteurs, eux, ne bougent jamais. */
  readonly visible = computed<ReportCard[]>(() => {
    const cards = this.batch()?.reportCards ?? [];
    switch (this.tab()) {
      case 'RELECTURE':
        return cards.filter((card) => card.editable);
      case 'REMISE':
        return cards.filter((card) => card.status === 'PUBLISHED');
      default:
        return cards;
    }
  });

  readonly pending = computed(() => (this.batch()?.reportCards ?? [])
    .filter((card) => card.editable).length);

  /** Élèves sans bulletin : la génération ne les a pas encore couverts. */
  readonly missing = computed(() => {
    const batch = this.batch();
    return batch ? Math.max(0, batch.studentCount - batch.generatedCount) : 0;
  });

  stateOf(status: ReportCardStatus) {
    return this.states.find((state) => state.code === status) ?? this.states[0];
  }

  /** Écart à la moyenne de la classe, signé, comme sur un bulletin papier. */
  gapToClass(card: ReportCard): string {
    if (card.generalAverage === undefined || card.classAverage === undefined) {
      return '';
    }
    const gap = Math.round((card.generalAverage - card.classAverage) * 100) / 100;
    return gap > 0 ? `+${format(gap)}` : format(gap);
  }

  // ------------------------------------------------------------ génération

  generate(regenerate: boolean): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.generate({
      classroomId: this.classroomId(),
      termId: this.termId(),
      regenerate
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.saving.set(false);
        this.notifications.success(
          `${batch.generatedCount} bulletin(s) calculés pour ${batch.classroomName}. `
          + 'Rien n\'est encore remis aux familles.',
          batch.termName);
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------------------- relecture

  openReview(card: ReportCard): void {
    this.reviewing.set(card);
    this.remarkForm.reset({
      generalRemark: card.generalRemark ?? '',
      headTeacherRemark: card.headTeacherRemark ?? '',
      principalRemark: card.principalRemark ?? '',
      councilDecision: card.councilDecision ?? 'PENDING_DECISION'
    });
    if (!card.editable) {
      this.remarkForm.disable();
    } else {
      this.remarkForm.enable();
    }
  }

  closeReview(): void {
    this.reviewing.set(null);
  }

  submitRemarks(): void {
    const card = this.reviewing();
    if (!card || this.remarkForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.remarkForm.getRawValue();
    this.dataSource.remark(card.id, {
      generalRemark: value.generalRemark.trim() || undefined,
      headTeacherRemark: value.headTeacherRemark.trim() || undefined,
      principalRemark: value.principalRemark.trim() || undefined,
      councilDecision: value.councilDecision
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.reviewing.set(saved);
        this.saving.set(false);
        this.load();
        this.notifications.success(
          `Les appréciations de ${saved.studentName} sont enregistrées.`,
          'Bulletin mis à jour');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ---------------------------------------------------------------- remise

  publishOne(card: ReportCard): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.publish(card.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.saving.set(false);
          this.closeReview();
          this.load();
          this.notifications.success(
            `Le bulletin de ${saved.studentName} est remis. Code de vérification : `
            + `${saved.verificationCode}.`,
            'Bulletin remis');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  publishAll(): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.publishAll({ classroomId: this.classroomId(), termId: this.termId() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (batch) => {
          this.batch.set(batch);
          this.saving.set(false);
          this.notifications.success(
            `${batch.publishedCount} bulletin(s) remis aux familles de `
            + `${batch.classroomName}.`,
            batch.termName);
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ------------------------------------------------------------ impression

  /** Une page par élève, dans l'ordre du classement. */
  printAll(): void {
    const cards = this.batch()?.reportCards ?? [];
    if (cards.length === 0) {
      return;
    }
    this.print(cards);
  }

  printOne(card: ReportCard): void {
    this.print([card]);
  }

  private print(cards: ReportCard[]): void {
    this.printing.set(cards);
    // Le rendu de la feuille est fait par Angular : on attend un tour de boucle
    // avant d'ouvrir le dialogue, sinon la page part vide à l'imprimante.
    setTimeout(() => {
      window.print();
      this.printing.set([]);
    }, 120);
  }

  // ------------------------------------------------------------- affichage

  formatAverage(value: number | undefined, scale?: number): string {
    if (value === undefined || value === null) {
      return '—';
    }
    return scale ? `${format(value)} / ${format(scale)}` : format(value);
  }

  formatDate(iso: string | undefined): string {
    if (!iso) {
      return '';
    }
    return new Date(iso).toLocaleDateString('fr-FR',
      { day: 'numeric', month: 'long', year: 'numeric' });
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

/** Deux décimales, virgule française, sans zéro inutile. */
function format(value: number): string {
  return (Math.round(value * 100) / 100).toString().replace('.', ',');
}
