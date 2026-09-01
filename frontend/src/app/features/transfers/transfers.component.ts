import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import {
  CLASSROOM_DATA_SOURCE, STUDENT_DATA_SOURCE, TRANSFER_DATA_SOURCE
} from '@core/datasource/data-source';
import { Classroom, StudentSummary } from '@core/models/domain.models';
import {
  DEPARTURE_DOCUMENTS, DEPARTURE_REASONS, DEPARTURE_STATES, Departure,
  DepartureDocumentsPayload, DepartureReason, DepartureStatus, TransferBoard
} from '@core/models/transfer.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/** Les deux mouvements que connaît un secrétariat. */
export type TransfersTab = 'CHANGEMENTS' | 'DEPARTS';

/** Wording of the coachmark shown once per tab, exactly as in the setup flow. */
interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
  ctaLabel: string;
}

/**
 * Movements: changing class, and leaving the school.
 *
 * <p>The two are kept apart on purpose. A change of class is an internal
 * arrangement that happens a dozen times a term. A departure ends the schooling
 * and produces paperwork a receiving school will chase — sometimes years later.
 * One list for both would bury the second under the first.</p>
 *
 * <p>The balance owed is shown on every departure and blocks nothing.
 * Withholding a pupil's school file over a debt is unlawful in many places;
 * what the product owes the secretary is the figure, in front of them, before
 * the family walks out of the door.</p>
 */
@Component({
  selector: 'eduops-transfers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent implements OnInit {
  private readonly dataSource = inject(TRANSFER_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly reasons = DEPARTURE_REASONS;
  readonly documents = DEPARTURE_DOCUMENTS;
  readonly states = DEPARTURE_STATES;
  readonly totalSteps = 2;

  readonly tab = signal<TransfersTab>('CHANGEMENTS');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly board = signal<TransferBoard | null>(null);
  readonly search = signal('');
  readonly classroomList = signal<Classroom[]>([]);
  readonly studentList = signal<StudentSummary[]>([]);

  readonly changeOpen = signal(false);
  readonly departureOpen = signal(false);
  /** La sortie ouverte en détail ; nulle quand le panneau est fermé. */
  readonly reviewing = signal<Departure | null>(null);
  readonly cancelling = signal<Departure | null>(null);

  readonly changeForm = this.fb.nonNullable.group({
    studentId: ['', [Validators.required]],
    toClassroomId: ['', [Validators.required]],
    reason: ['', [Validators.required, Validators.maxLength(1000)]],
    overrideCapacity: [false]
  });

  readonly departureForm = this.fb.nonNullable.group({
    studentId: ['', [Validators.required]],
    reason: ['TRANSFER_OUT' as DepartureReason, [Validators.required]],
    departureDate: ['', [Validators.required]],
    destinationSchool: ['', [Validators.maxLength(200)]],
    destinationCity: ['', [Validators.maxLength(120)]],
    notes: ['', [Validators.maxLength(2000)]]
  });

  readonly cancelForm = this.fb.nonNullable.group({
    reason: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  // ------------------------------------------------------------------ aide

  private readonly help: Record<TransfersTab, HelpCopy> = {
    CHANGEMENTS: {
      step: 1,
      title: 'Un changement de classe reste un arrangement interne',
      description: "L'élève change de groupe, sa scolarité continue. Le motif est "
        + 'obligatoire : il reste au dossier et se relit au conseil de classe, quand '
        + 'personne ne se souvient plus de la raison.',
      points: [
        'Le contrôle de capacité est celui de l\'inscription. Un changement qui '
        + 'l\'ignorerait serait une façon de surcharger une classe sans que personne '
        + 'l\'ait décidé — la dérogation existe, et elle laisse une trace.',
        'Un changement qui traverse un niveau est signalé. C\'est rare en cours '
        + 'd\'année, et le programme n\'est pas le même : cela mérite une relecture.',
        'Le mouvement est enregistré, pas seulement appliqué. La classe d\'origine '
        + 'reste lisible, ce qui compte pour les moyennes déjà calculées.'
      ],
      ctaLabel: 'Voir les changements'
    },
    DEPARTS: {
      step: 2,
      title: 'Un départ met fin à la scolarité et produit des pièces',
      description: "L'exeat, le certificat de radiation, le dernier bulletin, le "
        + "dossier rendu. L'école d'accueil réclamera les premières ; la famille "
        + 'reviendra pour les autres, parfois des années plus tard.',
      points: [
        'Le solde dû est affiché et figé le jour du départ. Il ne bloque rien : '
        + 'retenir un dossier scolaire pour dette est illégal dans beaucoup de pays. '
        + 'Ce que l\'écran doit, c\'est le chiffre sous les yeux avant que la famille '
        + 'reparte.',
        'Les pièces se cochent une à une, à mesure qu\'elles sont remises. Solder un '
        + 'dossier incomplet ferait croire que la famille est repartie avec tout.',
        'Une sortie enregistrée par erreur s\'annule, avec un motif écrit : l\'élève '
        + 'revient dans les effectifs. Sans explication, la personne suivante '
        + 'conclura à un défaut du logiciel.'
      ],
      ctaLabel: 'Traiter les départs'
    }
  };

  readonly helpCopy = computed<HelpCopy>(() => this.help[this.tab()]);

  // --------------------------------------------------------------- cycle

  ngOnInit(): void {
    forkJoin({
      classrooms: this.classrooms.list(),
      students: this.students.search({ page: 0, size: 500 })
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.classroomList.set(data.classrooms);
        this.studentList.set(data.students.content);
      },
      // Les listes de choix manquantes ne doivent pas vider le tableau.
      error: () => undefined
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.board(this.search() || undefined)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (board) => {
          this.board.set(board);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(true);
          this.explain(err);
        }
      });
  }

  changeTab(tab: TransfersTab): void {
    this.tab.set(tab);
    this.closeAll();
  }

  changeSearch(term: string): void {
    this.search.set(term);
    this.load();
  }

  private closeAll(): void {
    this.changeOpen.set(false);
    this.departureOpen.set(false);
    this.reviewing.set(null);
    this.cancelling.set(null);
  }

  // ------------------------------------------------------------- les vues

  readonly classChanges = computed(() => this.board()?.classChanges ?? []);
  readonly departures = computed(() => this.board()?.departures ?? []);

  /** Les sorties dont il manque des pièces : c'est le travail qui reste. */
  readonly pendingDepartures = computed<Departure[]>(
    () => this.departures().filter((row) => row.status === 'RECORDED'));

  /** Les sorties annoncées dont la date n'est pas atteinte. */
  readonly upcomingDepartures = computed<Departure[]>(
    () => this.departures().filter((row) => row.upcoming));

  stateOf(status: DepartureStatus) {
    return this.states.find((state) => state.code === status) ?? this.states[0];
  }

  /** La classe d'accueil choisie, pour afficher son remplissage. */
  readonly changeTarget = computed<Classroom | undefined>(() => {
    const id = this.changeForm.controls.toClassroomId.value;
    return this.classroomList().find((room) => room.id === id);
  });

  /** Vrai quand le motif choisi exige le nom de l'établissement d'accueil. */
  readonly needsDestination = computed(() => {
    const reason = this.departureForm.controls.reason.value;
    return this.reasons.find((item) => item.code === reason)?.needsDestination ?? false;
  });

  reasonHint(reason: DepartureReason): string {
    return this.reasons.find((item) => item.code === reason)?.hint ?? '';
  }

  // ------------------------------------------------- changement de classe

  openChange(): void {
    this.changeForm.reset({
      studentId: '', toClassroomId: '', reason: '', overrideCapacity: false
    });
    this.changeOpen.set(true);
  }

  closeChange(): void {
    this.changeOpen.set(false);
  }

  submitChange(): void {
    if (this.changeForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.changeForm.getRawValue();
    this.dataSource.changeClass({
      // En démonstration comme au serveur, l'inscription porte l'élève.
      enrollmentId: `enr-${value.studentId}`,
      toClassroomId: value.toClassroomId,
      reason: value.reason.trim(),
      overrideCapacity: value.overrideCapacity
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (change) => {
        this.saving.set(false);
        this.closeChange();
        this.load();
        this.notifications.success(
          `${change.studentName} passe de ${change.fromClassroomName} à `
          + `${change.toClassroomName}.`,
          change.crossesLevel ? 'Changement de niveau enregistré' : 'Changement enregistré');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------------------ les départs

  openDeparture(): void {
    this.departureForm.reset({
      studentId: '',
      reason: 'TRANSFER_OUT',
      departureDate: isoToday(),
      destinationSchool: '',
      destinationCity: '',
      notes: ''
    });
    this.departureOpen.set(true);
  }

  closeDeparture(): void {
    this.departureOpen.set(false);
  }

  submitDeparture(): void {
    if (this.departureForm.invalid || this.saving()) {
      return;
    }
    const value = this.departureForm.getRawValue();
    if (this.needsDestination() && !value.destinationSchool.trim()) {
      this.notifications.error(
        "Un transfert vers un autre établissement demande son nom : sans lui, l'exeat "
        + "ne peut pas être rapproché par l'école d'accueil.",
        'Établissement manquant');
      return;
    }
    this.saving.set(true);
    this.dataSource.recordDeparture({
      enrollmentId: `enr-${value.studentId}`,
      reason: value.reason,
      departureDate: value.departureDate,
      destinationSchool: value.destinationSchool.trim() || undefined,
      destinationCity: value.destinationCity.trim() || undefined,
      notes: value.notes.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (departure) => {
        this.saving.set(false);
        this.closeDeparture();
        this.tab.set('DEPARTS');
        this.load();
        this.notifications.success(
          departure.outstandingAmount > 0
            ? `Sortie de ${departure.studentName} enregistrée. Solde dû : `
              + `${formatMoney(departure.outstandingAmount)} ${departure.currency}. `
              + 'Il est noté au dossier et ne bloque pas la remise des pièces.'
            : `Sortie de ${departure.studentName} enregistrée. Aucun solde dû.`,
          'Départ enregistré');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ----------------------------------------------------------- les pièces

  openReview(departure: Departure): void {
    this.reviewing.set(departure);
  }

  closeReview(): void {
    this.reviewing.set(null);
  }

  /** Coche ou décoche une pièce et enregistre aussitôt. */
  toggleDocument(departure: Departure, key: keyof DepartureDocumentsPayload): void {
    if (this.saving() || !departure.editable) {
      return;
    }
    const payload: DepartureDocumentsPayload = {
      exeatIssued: departure.exeatIssued,
      certificateIssued: departure.certificateIssued,
      reportCardIssued: departure.reportCardIssued,
      fileReturned: departure.fileReturned
    };
    payload[key] = !payload[key];

    this.saving.set(true);
    this.dataSource.updateDocuments(departure.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.reviewing.set(saved);
          this.saving.set(false);
          this.load();
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  documentGiven(departure: Departure, key: keyof DepartureDocumentsPayload): boolean {
    return departure[key];
  }

  clearDeparture(departure: Departure): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.clearDeparture(departure.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.reviewing.set(saved);
          this.saving.set(false);
          this.load();
          this.notifications.success(
            `Le dossier de ${saved.studentName} est soldé : la famille est repartie `
            + 'avec les quatre pièces.',
            'Dossier soldé');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ---------------------------------------------------------- l'annulation

  openCancel(departure: Departure): void {
    this.cancelling.set(departure);
    this.cancelForm.reset({ reason: '' });
  }

  closeCancel(): void {
    this.cancelling.set(null);
  }

  submitCancel(): void {
    const departure = this.cancelling();
    if (!departure || this.cancelForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.cancelDeparture(departure.id, this.cancelForm.getRawValue().reason.trim())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.saving.set(false);
          this.closeCancel();
          this.closeReview();
          this.load();
          this.notifications.success(
            `${saved.studentName} reprend sa place en ${saved.classroomName}. `
            + 'Le motif de l\'annulation reste au dossier.',
            'Sortie annulée');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ------------------------------------------------------------- affichage

  formatDate(iso: string | undefined): string {
    if (!iso) {
      return '';
    }
    const source = iso.length > 10 ? iso : `${iso}T00:00:00`;
    return new Date(source).toLocaleDateString('fr-FR',
      { day: 'numeric', month: 'long', year: 'numeric' });
  }

  formatAmount(value: number | undefined): string {
    return value === undefined || value === null ? '—' : formatMoney(value);
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

/* ------------------------------------------------------------------ outils */

function isoToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    + `-${String(now.getDate()).padStart(2, '0')}`;
}

/** Espace insécable comme séparateur : c'est l'usage francophone. */
function formatMoney(value: number): string {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
