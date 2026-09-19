import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import {
  ACCESS_PROFILE_DATA_SOURCE, FINANCE_DATA_SOURCE, STUDENT_DATA_SOURCE
} from '@core/datasource/data-source';
import { AccessProfile } from '@core/models/access-profile.models';
import {
  DISCOUNT_KIND_LABELS, DISCOUNT_LEVEL_LABELS, DISCOUNT_STATUS_LABELS,
  DiscountDecisionPayload, DiscountKind, DiscountLevelInput, DiscountRequest
} from '@core/models/discount-request.models';
import { StudentSummary } from '@core/models/domain.models';
import { PERMISSIONS } from '@core/models/auth.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

type TabKey = 'MINE' | 'PENDING' | 'ALL';

/**
 * Réductions de scolarité : demander, suivre le circuit, décider.
 *
 * <p>L'écran est bâti autour d'une seule idée : on ne voit d'abord que ce
 * qui attend une décision. La chaîne de validation est dessinée sur chaque
 * demande, le palier courant en évidence, et les boutons Valider / Refuser
 * n'apparaissent que si le palier appartient au profil du lecteur — le
 * serveur reste seul juge, mais on ne propose pas un geste sans effet.</p>
 */
@Component({
  selector: 'eduops-discounts',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MoneyPipe, LoadingStateComponent, ErrorStateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent implements OnInit {
  private readonly finance = inject(FINANCE_DATA_SOURCE);
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly accessProfiles = inject(ACCESS_PROFILE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly moneyPipe = new MoneyPipe();

  readonly requests = signal<DiscountRequest[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly tab = signal<TabKey>('MINE');

  readonly profiles = signal<AccessProfile[]>([]);

  readonly tabs: readonly { key: TabKey; label: string }[] = [
    { key: 'MINE', label: 'À valider par moi' },
    { key: 'PENDING', label: 'En circuit' },
    { key: 'ALL', label: 'Toutes les demandes' }
  ];

  readonly countMine = computed(() =>
    this.requests().filter((r) => r.awaitingMyDecision).length);
  readonly countPending = computed(() =>
    this.requests().filter((r) => r.status === 'SUBMITTED').length);
  readonly countToApply = computed(() =>
    this.requests().filter((r) => r.status === 'APPROVED').length);

    readonly visible = computed(() => {
    const rows = [...this.requests()].sort((a, b) =>
      (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
    switch (this.tab()) {
      case 'MINE': return rows.filter((r) => r.awaitingMyDecision);
      case 'PENDING': return rows.filter((r) => r.status === 'SUBMITTED');
      default: return rows;
    }
  });

  readonly canRequest = computed(() =>
    this.auth.hasAny(PERMISSIONS.DISCOUNT_REQUEST_MANAGE));

  // formulaire
  readonly formOpen = signal(false);
  readonly submitting = signal(false);
  readonly formError = signal('');
  readonly studentSearch = signal('');
  readonly studentResults = signal<StudentSummary[]>([]);
  readonly formStudentId = signal('');
  readonly selectedStudentName = signal('');
  readonly formLabel = signal('');
  readonly formReason = signal('');
  readonly formKind = signal<DiscountKind>('PERCENTAGE');
  readonly formValue = signal<number | null>(null);
  readonly formLevels = signal<DiscountLevelInput[]>([]);

  private readonly studentQuery$ = new Subject<string>();

  // décision
  readonly deciding = signal<DiscountRequest | null>(null);
  readonly decisionComment = signal('');
  readonly savingDecision = signal(false);
  readonly applying = signal<string | null>(null);

  ngOnInit(): void {
    this.accessProfiles.overview().pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => of(null))
    ).subscribe((overview) => {
      if (overview) {
        this.profiles.set(overview.profiles.filter((p) => p.code !== 'SUPER_ADMIN'));
      }
    });

    this.studentQuery$
      .pipe(
        debounceTime(220),
        distinctUntilChanged(),
        switchMap((term) => this.students.search({ page: 0, size: 8, search: term.trim() })
          .pipe(catchError(() => of(null)))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((page) => this.studentResults.set(page?.content ?? []));

    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.finance.discountRequests().pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.error.set(true);
        return of([]);
      })
    ).subscribe((rows) => {
      this.requests.set(rows);
      this.loading.set(false);
    });
  }

  openForm(): void {
    this.formOpen.set(true);
    this.formError.set('');
    this.formLabel.set('');
    this.formReason.set('');
    this.formKind.set('PERCENTAGE');
    this.formValue.set(null);
    this.formLevels.set([{ name: 'Intendance', roleCode: 'ACCOUNTANT' }]);
    this.formStudentId.set('');
    this.selectedStudentName.set('');
    this.studentSearch.set('');
    this.studentResults.set([]);
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  searchStudents(term: string): void {
    this.studentSearch.set(term);
    if (term.trim().length < 2) {
      this.studentResults.set([]);
      return;
    }
    this.studentQuery$.next(term);
  }

  selectStudent(student: StudentSummary): void {
    this.formStudentId.set(student.id);
    this.selectedStudentName.set(student.fullName);
    this.studentSearch.set(`${student.fullName} — ${student.studentNumber}`);
    this.studentResults.set([]);
  }

  clearStudent(): void {
    this.formStudentId.set('');
    this.studentSearch.set('');
    this.studentResults.set([]);
    this.selectedStudentName.set('');
  }

  addLevel(): void {
    if (this.formLevels().length >= 5) {
      return;
    }
    this.formLevels.set([...this.formLevels(),
      { name: `Niveau ${this.formLevels().length + 1}`, roleCode: 'DIRECTOR' }]);
  }

  removeLevel(index: number): void {
    this.formLevels.set(this.formLevels().filter((_, i) => i !== index));
  }

  updateLevel(index: number, field: 'name' | 'roleCode', value: string): void {
    this.formLevels.set(
      this.formLevels().map((level, i) =>
        i === index ? { ...level, [field]: value } : level
      )
    );
  }

  submitRequest(): void {
    if (!this.formStudentId()) {
      this.formError.set('Choisissez l’élève concerné.');
      return;
    }
    if (!this.formLabel().trim()) {
      this.formError.set('Donnez un intitulé : il apparaîtra dans l’historique.');
      return;
    }
    const value = Number(this.formValue());
    if (!Number.isFinite(value) || value <= 0) {
      this.formError.set('La valeur de la réduction doit être strictement positive.');
      return;
    }
    if (this.formKind() === 'PERCENTAGE' && value > 100) {
      this.formError.set('Un pourcentage ne peut dépasser 100.');
      return;
    }
    if (this.formLevels().length === 0) {
      this.formError.set('Ajoutez au moins un niveau de validation.');
      return;
    }
    if (this.formLevels().some((l) => !l.name.trim() || !l.roleCode)) {
      this.formError.set('Chaque niveau doit avoir un nom et un profil.');
      return;
    }

    this.submitting.set(true);
    this.formError.set('');
    this.finance.createDiscountRequest({
      studentId: this.formStudentId(),
      label: this.formLabel().trim(),
      reason: this.formReason().trim() || undefined,
      discountType: this.formKind(),
      value,
      levels: this.formLevels()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        this.submitting.set(false);
        this.formOpen.set(false);
        this.notifications.success(
          `Demande ${created.reference} envoyée à « ${this.formLevels()[0]?.name ?? '…'} ».`,
          'Demande enregistrée');
        this.load();
      },
      error: (err) => {
        this.submitting.set(false);
        this.formError.set(err?.error?.message ?? 'Enregistrement impossible.');
      }
    });
  }

  askDecision(request: DiscountRequest): void {
    this.deciding.set(request);
    this.decisionComment.set('');
  }

  cancelDecision(): void {
    this.deciding.set(null);
  }

  confirmDecision(decision: 'APPROVE' | 'REJECT'): void {
    const request = this.deciding();
    if (!request) {
      return;
    }
    if (decision === 'REJECT' && !this.decisionComment().trim()) {
      this.notifications.error('Indiquez le motif du refus.', 'Motif requis');
      return;
    }
    this.savingDecision.set(true);
    const payload: DiscountDecisionPayload = {
      decision,
      comment: this.decisionComment().trim() || undefined
    };
    this.finance.decideDiscountRequest(request.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (updated) => {
          this.savingDecision.set(false);
          this.deciding.set(null);
          this.notifications.success(
            decision === 'APPROVE'
              ? (updated.status === 'SUBMITTED'
                  ? `Palier validé. En attente de « ${this.currentLevelLabel(updated)} ».`
                  : 'Tous les paliers sont validés : la réduction peut être appliquée.')
              : `Demande ${updated.reference} refusée.`,
            decision === 'APPROVE' ? 'Validation enregistrée' : 'Demande refusée');
          this.load();
        },
        error: (err) => {
          this.savingDecision.set(false);
          this.notifications.error(
            err?.error?.message ?? 'Décision impossible.', 'Refusé');
        }
      });
  }

  apply(request: DiscountRequest): void {
    this.applying.set(request.id);
    this.finance.applyDiscountRequest(request.id)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.applying.set(null);
          this.notifications.success(
            'Les échéances de l’élève portent désormais la réduction.',
            'Réduction appliquée');
          this.load();
        },
        error: (err) => {
          this.applying.set(null);
          this.notifications.error(
            err?.error?.message ?? 'Application impossible.', 'Refusé');
        }
      });
  }

  // affichage
  statusLabel(request: DiscountRequest): string {
    return DISCOUNT_STATUS_LABELS[request.status];
  }

  levelLabel(status: DiscountRequest['levels'][number]['status']): string {
    return DISCOUNT_LEVEL_LABELS[status];
  }

  canDecide(request: DiscountRequest): boolean {
    return !!request.awaitingMyDecision;
  }

  currentLevelLabel(request: DiscountRequest): string {
    return request.levels
      .find((l) => l.levelNumber === request.currentLevel)
      ?.name ?? '…';
  }

  valueLabel(request: DiscountRequest): string {
    return request.discountType === 'PERCENTAGE'
      ? `${request.value} %`
      : this.moneyPipe.transform(request.value);
  }

  computedAmountLabel(request: DiscountRequest): string {
    const amount = request.computedAmount ?? request.value;
    return request.discountType === 'PERCENTAGE'
      ? `${amount} %`
      : this.moneyPipe.transform(amount);
  }

  effectiveAtLabel(request: DiscountRequest): string {
    return request.effectiveAt ? new Date(request.effectiveAt).toLocaleString('fr-FR') : '';
  }

  progressPercent(request: DiscountRequest): number {
    const done = request.levels.filter((l) => l.status === 'APPROVED').length;
    if (request.status === 'EFFECTIVE') {
      return 100;
    }
    if (request.status === 'REJECTED') {
      return 0;
    }
    return Math.round((done / request.totalLevels) * 100);
  }

  formPreviewRequest(): DiscountRequest {
    return {
      discountType: this.formKind(),
      value: this.formValue() ?? 0,
      levels: this.formLevels(),
      status: 'SUBMITTED',
      currentLevel: 1,
      totalLevels: this.formLevels().length
    } as DiscountRequest;
  }

  formPreviewLevelNames(): string {
    return this.formLevels().map((l) => l.name).join(' → ');
  }
}
