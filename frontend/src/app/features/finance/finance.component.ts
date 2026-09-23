import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray, FormBuilder, FormControl, FormGroup, FormsModule,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FEE_DATA_SOURCE } from '@core/datasource/data-source';
import {
  FEE_CATEGORIES, FEE_RECURRENCES, FeeCategoryCode, FeeRecurrenceCode,
  FeeSchedulePayload, FeeType, InstalmentPayload, LevelFees
} from '@core/models/fee.models';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';
import { FeeApprovalService } from '@core/services/fee-approval.service';
import { ApprovalCircuit } from '@core/models/approval-circuit.models';
import { ApprovalExecution } from '@core/models/approval-execution.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

export type FinanceTab = 'TYPES' | 'TARIFS' | 'REQUESTS';
export type FinancePanel = 'TYPE' | 'SCHEDULE' | 'APPLY' | null;

/**
 * Fees: what the school charges, and when it falls due.
 *
 * <p>Two halves of one question, like subjects and their coefficients. What the
 * school bills — inscription, scolarité, cantine — is the same list everywhere;
 * what it costs changes with the level. Keeping them on one screen is what
 * stops a school declaring fee types and never pricing them, which leaves
 * enrolments generating nothing to collect.</p>
 */
@Component({
  selector: 'eduops-finance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent implements OnInit {
  private readonly dataSource = inject(FEE_DATA_SOURCE);
  private readonly approvals = inject(FeeApprovalService);
  private readonly circuitService = inject(ApprovalCircuitService);
  readonly circuits = signal<ApprovalCircuit[]>([]);
  readonly circuitId = signal('');
  readonly requests = signal<ApprovalExecution[]>([]);
  readonly requestsError = signal(false);
  readonly decidingId = signal<string | null>(null);
  readonly comments: Record<string, string> = {};
  readonly pendingCount = computed(() => this.requests().filter(r => r.status === 'SUBMITTED').length);
  readonly statusLabels = { SUBMITTED: 'En validation', APPROVED: 'Approuvée', REJECTED: 'Refusée', EFFECTIVE: 'Appliquée' };

  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = FEE_CATEGORIES;
  readonly recurrences = FEE_RECURRENCES;

  readonly tab = signal<FinanceTab>('TARIFS');
  readonly types = signal<FeeType[]>([]);
  readonly levels = signal<LevelFees[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly panel = signal<FinancePanel>(null);
  readonly editingType = signal<FeeType | null>(null);
  readonly openLevelId = signal<string | null>(null);
  /** Niveau visé par le panneau de tarif. */
  readonly scheduleLevelId = signal<string | null>(null);

  readonly applyTargets = signal<string[]>([]);
  applyReplace = false;

  /** Vrai quand on crée un type de frais sans quitter le panneau de tarif. */
  readonly creatingType = signal(false);

  /** Valeur sentinelle de la liste déroulante qui déclenche la création. */
  static readonly NEW_TYPE = '__new__';
  readonly newTypeOption = FinanceComponent.NEW_TYPE;

  readonly typeForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(40)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    category: ['TUITION' as FeeCategoryCode, [Validators.required]],
    recurrence: ['ANNUAL' as FeeRecurrenceCode, [Validators.required]],
    mandatory: [true],
    refundable: [false]
  });

  readonly scheduleForm = this.fb.nonNullable.group({
    feeTypeId: ['', [Validators.required]],
    totalAmount: [0, [Validators.required, Validators.min(0)]],
    instalments: this.fb.array<FormGroup<InstalmentControls>>([]),
    // Groupe imbriqué plutôt qu'un second formulaire : un [formGroup] dans un
    // autre est refusé par Angular. Désactivé, il n'entre pas dans la validité.
    newType: this.fb.nonNullable.group({
      code: ['', [Validators.required, Validators.maxLength(40)]],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      category: ['OTHER' as FeeCategoryCode, [Validators.required]],
      recurrence: ['ANNUAL' as FeeRecurrenceCode, [Validators.required]],
      mandatory: [true]
    })
  });

  /** Paramètres du bouton « Répartir également », qui ne fait que pré-remplir. */
  spreadCount = 3;
  spreadFirstDate = '';
  spreadMonths = 3;

  get instalments(): FormArray<FormGroup<InstalmentControls>> {
    return this.scheduleForm.controls.instalments;
  }

  get newType() {
    return this.scheduleForm.controls.newType;
  }

  ngOnInit(): void {
    this.newType.disable();
    this.circuitService.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: rows => { this.circuits.set(rows.filter(c => c.usage === 'FEE')); this.circuitId.set(this.circuits()[0]?.id ?? ''); },
      error: () => this.notifications.error('Chargement des circuits impossible.')
    });
    this.load();
  }

  load(): void {
    this.loadRequests();
    this.loading.set(true);
    this.error.set(false);

    this.dataSource.listTypes().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          this.types.set(list);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        }
      });

    this.dataSource.levels().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => this.levels.set(list),
        error: () => this.levels.set([])
      });
  }

  changeTab(tab: FinanceTab): void {
    this.tab.set(tab);
    this.panel.set(null);
  }

  // ------------------------------------------------------------------ vues

  /** Niveaux sans aucun frais obligatoire : leurs inscriptions ne factureront rien. */
  readonly levelsWithoutFees = computed<LevelFees[]>(
    () => this.levels().filter((l) => !l.ready));

  readonly readyCount = computed(() => this.levels().filter((l) => l.ready).length);

  readonly currency = computed(() => this.levels()[0]?.currency ?? 'XOF');

  /** Écart entre le niveau le moins cher et le plus cher, s'il y en a un. */
  readonly priceRange = computed<{ min: number; max: number } | null>(() => {
    const priced = this.levels().filter((l) => l.ready).map((l) => l.mandatoryTotal);
    if (priced.length === 0) {
      return null;
    }
    return { min: Math.min(...priced), max: Math.max(...priced) };
  });

  readonly cycles = computed<Array<{ id: string; name: string; levels: LevelFees[] }>>(() => {
    const groups = new Map<string, { id: string; name: string; levels: LevelFees[] }>();
    this.levels().forEach((level) => {
      const group = groups.get(level.cycleId);
      if (group) {
        group.levels.push(level);
      } else {
        groups.set(level.cycleId, { id: level.cycleId, name: level.cycleName, levels: [level] });
      }
    });
    return Array.from(groups.values());
  });

  toggleLevel(levelId: string): void {
    this.openLevelId.set(this.openLevelId() === levelId ? null : levelId);
  }

  levelById(levelId: string): LevelFees | undefined {
    return this.levels().find((l) => l.levelId === levelId);
  }

  /** Types de frais pas encore tarifés sur ce niveau. */
  availableFor(level: LevelFees): FeeType[] {
    const used = new Set(level.schedules.map((s) => s.feeTypeId));
    return this.types().filter((t) => !used.has(t.id));
  }

  format(amount: number): string {
    return new Intl.NumberFormat('fr-FR').format(amount);
  }

  /**
   * Réagit au choix dans la liste des types de frais.
   *
   * <p>La sentinelle ouvre un formulaire de création sur place. Renvoyer
   * l'utilisateur vers l'onglet « Types de frais » lui ferait perdre le montant
   * et l'échéancier qu'il vient de saisir.</p>
   */
  onFeeTypeChanged(value: string): void {
    if (value === FinanceComponent.NEW_TYPE) {
      this.newType.reset({
        code: '', name: '', category: 'OTHER', recurrence: 'ANNUAL', mandatory: true
      });
      this.newType.enable();
      this.creatingType.set(true);
    } else {
      this.newType.disable();
      this.creatingType.set(false);
    }
  }

  cancelInlineType(): void {
    this.newType.disable();
    this.creatingType.set(false);
    this.scheduleForm.controls.feeTypeId.setValue(this.types()[0]?.id ?? '');
  }

  /** Crée le type puis le sélectionne, sans fermer le panneau de tarif. */
  createInlineType(): void {
    if (this.newType.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.newType.getRawValue();
    if (!this.requireCircuit()) return;
    this.approvals.createType({
      code: value.code.trim(),
      name: value.name.trim(),
      category: value.category,
      recurrence: value.recurrence,
      mandatory: value.mandatory,
      refundable: false
    }, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.cancelInlineType();
        this.saving.set(false);
        this.notifications.success('Demande envoyée. Le nouveau type sera disponible après validation.');
        this.loadRequests();
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  /** Le code est proposé d'après le nom, tant qu'on n'y a pas touché. */
  suggestCode(name: string): void {
    if (this.newType.controls.code.dirty) {
      return;
    }
    const code = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toUpperCase().replace(/[^A-Z0-9]+/g, '').slice(0, 8);
    this.newType.controls.code.setValue(code);
  }

  // -------------------------------------------------------- types de frais

  openType(type?: FeeType): void {
    this.editingType.set(type ?? null);
    this.typeForm.reset({
      code: type?.code ?? '',
      name: type?.name ?? '',
      category: type?.category ?? 'TUITION',
      recurrence: type?.recurrence ?? 'ANNUAL',
      mandatory: type?.mandatory ?? true,
      refundable: type?.refundable ?? false
    });
    this.panel.set('TYPE');
  }

  submitType(): void {
    if (this.typeForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.typeForm.getRawValue();
    const payload = {
      code: value.code.trim(),
      name: value.name.trim(),
      category: value.category,
      recurrence: value.recurrence,
      mandatory: value.mandatory,
      refundable: value.refundable
    };
    const editing = this.editingType();
    if (!this.requireCircuit()) return;
    const request = editing
      ? this.approvals.updateType(editing.id, payload, this.circuitId())
      : this.approvals.createType(payload, this.circuitId());

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.submitted(); },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  archiveType(type: FeeType): void {
    if (!this.requireCircuit()) return;
    this.approvals.archiveType(type.id, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.submitted();
        },
        error: (err) => this.explain(err)
      });
  }

  // -------------------------------------------------------------- tarifs

  openSchedule(levelId: string, feeTypeId?: string): void {
    const level = this.levelById(levelId);
    const existing = feeTypeId
      ? level?.schedules.find((s) => s.feeTypeId === feeTypeId)
      : undefined;
    const fallback = this.availableFor(level!)[0]?.id ?? this.types()[0]?.id ?? '';

    this.scheduleLevelId.set(levelId);
    this.scheduleForm.patchValue({
      feeTypeId: existing?.feeTypeId ?? fallback,
      totalAmount: existing?.totalAmount ?? 0
    });
    this.instalments.clear();
    (existing?.instalments ?? []).forEach((row) => this.instalments.push(this.row(
      row.label, row.amount, row.dueDate, row.graceDays)));
    this.spreadCount = existing?.instalments.length || 3;
    this.spreadFirstDate = existing?.instalments[0]?.dueDate ?? '';
    this.spreadMonths = 3;
    this.panel.set('SCHEDULE');
  }

  /** Une ligne d'échéance : montant et date saisis librement. */
  private row(label: string, amount: number, dueDate: string, graceDays = 0)
      : FormGroup<InstalmentControls> {
    return this.fb.nonNullable.group({
      label: [label, [Validators.maxLength(120)]],
      amount: [amount, [Validators.required, Validators.min(0.01)]],
      dueDate: [dueDate, [Validators.required]],
      graceDays: [graceDays, [Validators.min(0), Validators.max(90)]]
    });
  }

  addInstalment(): void {
    const last = this.instalments.at(this.instalments.length - 1);
    const nextDate = last
      ? this.shiftMonths(last.controls.dueDate.value, this.spreadMonths)
      : (this.spreadFirstDate || this.defaultFirstDate());
    // La nouvelle ligne reprend le reste à répartir : le cas courant est
    // « il me manque une tranche pour tomber juste ».
    const remaining = Math.max(0, this.remaining());
    this.instalments.push(this.row(
      this.ordinal(this.instalments.length + 1), remaining, nextDate));
  }

  removeInstalment(index: number): void {
    this.instalments.removeAt(index);
    this.renumber();
  }

  /**
   * Pré-remplit un échéancier régulier.
   *
   * <p>Ce n'est qu'un point de départ : chaque montant reste ensuite modifiable
   * indépendamment. La différence d'arrondi va sur la première tranche pour que
   * la somme tombe exactement sur le total annoncé.</p>
   */
  spreadEvenly(): void {
    const total = this.scheduleForm.controls.totalAmount.value;
    const count = this.spreadCount;
    if (!count || count < 1 || total <= 0) {
      return;
    }
    const share = Math.round((total / count) * 100) / 100;
    const first = Math.round((total - share * (count - 1)) * 100) / 100;
    let due = this.spreadFirstDate || this.defaultFirstDate();

    this.instalments.clear();
    for (let i = 0; i < count; i++) {
      this.instalments.push(this.row(this.ordinal(i + 1), i === 0 ? first : share, due));
      due = this.shiftMonths(due, this.spreadMonths || 3);
    }
  }

  /** Met le reste à répartir sur une ligne, pour tomber juste en un clic. */
  balanceOn(index: number): void {
    const row = this.instalments.at(index);
    if (!row) {
      return;
    }
    const others = this.instalments.controls
      .filter((_, i) => i !== index)
      .reduce((sum, c) => sum + (c.controls.amount.value || 0), 0);
    const target = Math.round(
      (this.scheduleForm.controls.totalAmount.value - others) * 100) / 100;
    if (target > 0) {
      row.controls.amount.setValue(target);
    }
  }

  private renumber(): void {
    this.instalments.controls.forEach((control, index) => {
      const label = control.controls.label.value;
      if (!label || /^\d+(re|e) tranche$/.test(label)) {
        control.controls.label.setValue(this.ordinal(index + 1));
      }
    });
  }

  private ordinal(sequence: number): string {
    return sequence === 1 ? '1re tranche' : `${sequence}e tranche`;
  }

  private defaultFirstDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().slice(0, 10);
  }

  private shiftMonths(iso: string, months: number): string {
    const date = iso ? new Date(iso) : new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().slice(0, 10);
  }

  // --------------------------------------------------- contrôle de la somme

  /** Somme des échéances saisies. */
  planned(): number {
    return Math.round(this.instalments.controls
      .reduce((sum, c) => sum + (c.controls.amount.value || 0), 0) * 100) / 100;
  }

  /** Ce qu'il reste à répartir. Négatif quand on a dépassé le total. */
  remaining(): number {
    const total = this.scheduleForm.controls.totalAmount.value || 0;
    return Math.round((total - this.planned()) * 100) / 100;
  }

  /** Vrai quand l'échéancier tombe juste, ou qu'il n'y en a pas. */
  balanced(): boolean {
    return this.instalments.length === 0 || Math.abs(this.remaining()) < 0.005;
  }

  submitSchedule(): void {
    const levelId = this.scheduleLevelId();
    if (!levelId || this.creatingType() || this.scheduleForm.invalid
        || !this.balanced() || this.saving()) {
      return;
    }
    this.saving.set(true);
    if (!this.requireCircuit()) return;
    this.approvals.saveSchedule(this.payload(levelId), this.circuitId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => { this.submitted(); },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  removeSchedule(scheduleId: string, label: string): void {
    if (!this.requireCircuit()) return;
    this.approvals.deleteSchedule(scheduleId, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.submitted();
        },
        error: (err) => this.explain(err)
      });
  }

  private payload(levelId: string | undefined): FeeSchedulePayload {
    const value = this.scheduleForm.getRawValue();
    // `newType` sert uniquement à la création sur place : il ne part pas au serveur.
    const instalments: InstalmentPayload[] = value.instalments.map((row) => ({
      label: row.label || undefined,
      amount: row.amount,
      dueDate: row.dueDate,
      graceDays: row.graceDays
    }));
    return {
      feeTypeId: value.feeTypeId,
      levelId,
      totalAmount: value.totalAmount,
      instalments
    };
  }

  // ------------------------------------------------- application groupée

  openApply(levelId?: string): void {
    const source = levelId ? this.levelById(levelId) : undefined;
    const first = source?.schedules[0];
    this.scheduleForm.patchValue({
      feeTypeId: first?.feeTypeId ?? this.types()[0]?.id ?? '',
      totalAmount: first?.totalAmount ?? 0
    });
    this.instalments.clear();
    (first?.instalments ?? []).forEach((row) => this.instalments.push(this.row(
      row.label, row.amount, row.dueDate, row.graceDays)));
    this.spreadCount = first?.instalments.length || 3;
    this.spreadFirstDate = first?.instalments[0]?.dueDate ?? '';
    this.spreadMonths = 3;
    this.applyTargets.set(levelId ? [levelId] : []);
    this.applyReplace = false;
    this.panel.set('APPLY');
  }

  toggleTarget(levelId: string): void {
    this.applyTargets.update((list) => list.includes(levelId)
      ? list.filter((id) => id !== levelId)
      : [...list, levelId]);
  }

  toggleCycleTargets(cycleId: string): void {
    const ids = this.levels().filter((l) => l.cycleId === cycleId).map((l) => l.levelId);
    const all = ids.every((id) => this.applyTargets().includes(id));
    this.applyTargets.update((list) => all
      ? list.filter((id) => !ids.includes(id))
      : Array.from(new Set([...list, ...ids])));
  }

  isTargeted(levelId: string): boolean {
    return this.applyTargets().includes(levelId);
  }

  canApply(): boolean {
    return this.applyTargets().length > 0 && !this.creatingType()
      && this.scheduleForm.valid && this.balanced() && !this.saving();
  }

  submitApply(): void {
    if (!this.canApply()) {
      return;
    }
    this.saving.set(true);
    if (!this.requireCircuit()) return;
    this.approvals.apply({
      levelIds: this.applyTargets(),
      schedule: this.payload(undefined),
      replaceExisting: this.applyReplace
    }, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.submitted(); },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------------------ internals

  closePanel(): void {
    this.panel.set(null);
    this.editingType.set(null);
    this.scheduleLevelId.set(null);
    this.creatingType.set(false);
  }

  private afterWrite(): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
    this.setupStatus.refresh();
  }

  private requireCircuit(): boolean {
    if (this.circuits().some(c => c.id === this.circuitId())) return true;
    this.saving.set(false);
    this.notifications.error('Choisissez un circuit « Frais et tarifs » configuré avant de soumettre.');
    return false;
  }

  private submitted(): void {
    this.notifications.success('Demande envoyée dans le circuit. Aucun changement ne sera appliqué avant la dernière validation.');
    this.afterWrite();
    this.tab.set('REQUESTS');
  }

  loadRequests(): void {
    this.requestsError.set(false);
    this.approvals.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: rows => this.requests.set(rows),
      error: () => this.requestsError.set(true)
    });
  }

  decide(request: ApprovalExecution, decision: 'APPROVE' | 'REJECT'): void {
    if (this.decidingId()) return;
    const comment = this.comments[request.id]?.trim() ?? '';
    if (decision === 'REJECT' && !comment) {
      this.notifications.error('Indiquez le motif du refus.'); return;
    }
    this.decidingId.set(request.id);
    this.approvals.decide(request.id, decision, comment).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: updated => {
        this.decidingId.set(null); delete this.comments[request.id];
        this.notifications.success(updated.status === 'EFFECTIVE' ? 'Validation complète : modification appliquée.' : 'Décision enregistrée.');
        this.load(); this.setupStatus.refresh();
      },
      error: err => { this.decidingId.set(null); this.explain(err); }
    });
  }

  requestDetails(request: ApprovalExecution): string[] {
    const input = request.payload.input ?? {};
    const schedule = (input['schedule'] as Record<string, unknown> | undefined) ?? input;
    const details: string[] = [];
    if (input['name']) details.push(`Nom : ${input['name']} · Code : ${input['code']}`);
    if (input['category']) details.push(`Catégorie : ${this.categories.find(c => c.code === input['category'])?.label ?? input['category']}`);
    if (input['recurrence']) details.push(`Périodicité : ${this.recurrences.find(c => c.code === input['recurrence'])?.label ?? input['recurrence']}`);
    if (typeof input['mandatory'] === 'boolean') details.push(input['mandatory'] ? 'Frais obligatoire' : 'Frais facultatif');
    if (typeof input['refundable'] === 'boolean') details.push(input['refundable'] ? 'Remboursable' : 'Non remboursable');
    if (input['description']) details.push(`Description : ${input['description']}`);
    if (schedule['totalAmount'] != null) {
      details.push(`Montant : ${this.format(Number(schedule['totalAmount']))} ${this.currency()}`);
      const ids = (input['levelIds'] as string[] | undefined) ?? (schedule['levelId'] ? [String(schedule['levelId'])] : []);
      details.push(`Niveaux : ${ids.length ? ids.map(id => this.levelById(id)?.levelName ?? id).join(', ') : 'Tous les niveaux'}`);
      if (input['replaceExisting'] != null) details.push(input['replaceExisting'] ? 'Remplace les tarifs existants' : 'Complète uniquement les niveaux sans tarif');
      details.push(`Nouveaux élèves : ${schedule['appliesToNewStudents'] === false ? 'non' : 'oui'} · Réinscriptions : ${schedule['appliesToReturningStudents'] === false ? 'non' : 'oui'}`);
      const instalments = schedule['instalments'] as { label?: string; amount: number; dueDate: string }[] | undefined;
      for (const row of instalments ?? []) details.push(`${row.label || 'Échéance'} : ${this.format(row.amount)} · ${row.dueDate}`);
      if (!instalments?.length) details.push(schedule['instalmentCount'] ? `${schedule['instalmentCount']} échéances régulières` : 'Montant dû en une fois');
    }
    return details;
  }

  private explain(err: unknown): void {
    const response = (err as { error?: { code?: string; message?: string } })?.error;
    this.notifications.error(response?.message ?? (response?.code ? translateErrorCode(response.code) : 'Action impossible. Réessayez.'), 'Action refusée');
  }

}

/** Contrôles d'une ligne d'échéance. */
interface InstalmentControls {
  label: FormControl<string>;
  amount: FormControl<number>;
  dueDate: FormControl<string>;
  graceDays: FormControl<number>;
}
