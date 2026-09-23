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
  FeeSchedule, FeeSchedulePayload, FeeType, FeeTypeUpsertPayload, LevelFees
} from '@core/models/fee.models';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';
import { FeeApprovalService } from '@core/services/fee-approval.service';
import { ApprovalCircuit } from '@core/models/approval-circuit.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

export type FinanceConfigTab = 'DASHBOARD' | 'FEES' | 'PRICING' | 'INSTALMENTS' | 'DISCOUNTS';
export type FeeEditPanel = 'TYPE' | 'SCHEDULE' | null;
export type ScheduleMode = 'AUTO' | 'MANUAL';

/**
 * Paramètres financiers (menu Finance → Paramètres).
 *
 * <p>Les écritures passent toutes par un circuit de validation, comme sur le
 * Plan de facturation : le serveur ne modifie rien avant la dernière
 * approbation. Cette page ne fait que soumettre ; le suivi des demandes reste
 * dans l'onglet « Demandes de validation » du Plan de facturation.</p>
 */
@Component({
  selector: 'eduops-finance-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finance-config.component.html',
  styleUrl: './finance-config.component.scss'
})
export class FinanceConfigComponent implements OnInit {
  private readonly dataSource = inject(FEE_DATA_SOURCE);
  private readonly approvals = inject(FeeApprovalService);
  private readonly circuitService = inject(ApprovalCircuitService);
  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = FEE_CATEGORIES;
  readonly recurrences = FEE_RECURRENCES;

  // ───────────────────────────────────────────── état de l'écran
  readonly tab = signal<FinanceConfigTab>('DASHBOARD');
  readonly panel = signal<FeeEditPanel>(null);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal(false);
  readonly types = signal<FeeType[]>([]);
  readonly levels = signal<LevelFees[]>([]);
  readonly circuits = signal<ApprovalCircuit[]>([]);
  readonly circuitId = signal('');
  readonly editingType = signal<FeeType | null>(null);
  readonly scheduleMode = signal<ScheduleMode>('AUTO');

  // ───────────────────────────────────────────── vues dérivées
  readonly totalFeeTypes = computed(() => this.types().length);
  readonly mandatoryTypes = computed(() => this.types().filter((t) => t.mandatory).length);
  readonly pricedLevels = computed(() => this.levels().filter((l) => l.scheduleCount > 0).length);
  readonly currency = computed(() => this.levels()[0]?.currency ?? 'XOF');

  /** Circuits « frais » s'il en existe, sinon tous (démonstration). */
  readonly feeCircuits = computed(() => {
    const all = this.circuits();
    const fee = all.filter((c) => c.usage === 'FEE');
    return fee.length ? fee : all;
  });
  readonly discountCircuits = computed(
    () => this.circuits().filter((c) => c.usage === 'DISCOUNT'));

  /** Toutes les échéances, à plat et triées par date (onglet Échéances). */
  readonly instalmentRows = computed(() => {
    const rows: InstalmentRow[] = [];
    for (const level of this.levels()) {
      for (const schedule of level.schedules) {
        for (const inst of schedule.instalments) {
          rows.push({
            levelName: level.levelName,
            feeTypeName: schedule.feeTypeName,
            label: inst.label,
            dueDate: inst.dueDate,
            amount: inst.amount,
            currency: schedule.currency
          });
        }
      }
    }
    return rows.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  });

  // ───────────────────────────────────────────── formulaires
  readonly typeForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(40)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    category: ['OTHER' as FeeCategoryCode, [Validators.required]],
    recurrence: ['ANNUAL' as FeeRecurrenceCode, [Validators.required]],
    mandatory: [true],
    refundable: [false],
    description: ['', [Validators.maxLength(500)]]
  });

  readonly scheduleForm = this.fb.nonNullable.group({
    feeTypeId: ['', [Validators.required]],
    levelId: ['', [Validators.required]],
    label: ['', [Validators.maxLength(120)]],
    totalAmount: [0, [Validators.required, Validators.min(1)]],
    appliesToNewStudents: [true],
    appliesToReturningStudents: [true],
    instalmentCount: [3, [Validators.required, Validators.min(1)]],
    firstDueDate: [''],
    monthsBetweenInstalments: [3, [Validators.min(0)]],
    instalments: this.fb.array<FormGroup<InstalmentControls>>([])
  });

  readonly instalments: FormArray<FormGroup<InstalmentControls>> =
    this.scheduleForm.controls.instalments;


  // ────────────────────────────────────── état du panneau tarif
  readonly editingSchedule = signal<FeeSchedule | null>(null);

  readonly instalmentTotal = computed(() =>
    Math.round(this.instalmentRows().reduce((sum, r) => sum + r.amount, 0) * 100) / 100);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);

    this.dataSource.listTypes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list) => {
        this.types.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });

    this.dataSource.levels().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list) => this.levels.set(list),
      error: () => this.levels.set([])
    });

    this.circuitService.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (rows) => {
        this.circuits.set(rows);
        if (!this.circuitId()) {
          this.circuitId.set(rows.find((c) => c.usage === 'FEE')?.id ?? rows[0]?.id ?? '');
        }
      },
      error: () => this.notifications.error('Chargement des circuits de validation impossible.')
    });
  }

  // ────────────────────────────────────────── aide à la saisie
  typeById(id: string): FeeType | undefined {
    return this.types().find((t) => t.id === id);
  }

  levelById(id: string): LevelFees | undefined {
    return this.levels().find((l) => l.levelId === id);
  }

  /** Types de frais pas encore tarifés sur ce niveau. */
  availableFor(level: LevelFees): FeeType[] {
    const used = new Set(level.schedules.map((s) => s.feeTypeId));
    return this.types().filter((t) => !used.has(t.id));
  }

  categoryLabel(code: FeeCategoryCode): string {
    return this.categories.find((c) => c.code === code)?.label ?? code;
  }

  recurrenceLabel(code: FeeRecurrenceCode): string {
    return this.recurrences.find((r) => r.code === code)?.label ?? code;
  }

  format(amount: number): string {
    return new Intl.NumberFormat('fr-FR').format(amount);
  }

  // ────────────────────────────────────────── types de frais
  openType(type?: FeeType): void {
    this.editingType.set(type ?? null);
    this.typeForm.reset({
      code: type?.code ?? '',
      name: type?.name ?? '',
      category: type?.category ?? 'OTHER',
      recurrence: type?.recurrence ?? 'ANNUAL',
      mandatory: type?.mandatory ?? true,
      refundable: type?.refundable ?? false,
      description: type?.description ?? ''
    });
    this.panel.set('TYPE');
  }

  closePanel(): void {
    this.panel.set(null);
    this.editingType.set(null);
    this.editingSchedule.set(null);
  }

  saveType(): void {
    if (this.saving()) {
      return;
    }
    if (this.typeForm.invalid) {
      this.typeForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    if (!this.requireCircuit()) {
      return;
    }

    const value = this.typeForm.getRawValue();
    const payload: FeeTypeUpsertPayload = {
      code: value.code.trim().toUpperCase(),
      name: value.name.trim(),
      category: value.category,
      recurrence: value.recurrence,
      mandatory: value.mandatory,
      refundable: value.refundable,
      description: value.description.trim() || undefined
    };
    const editing = this.editingType();
    const request = editing
      ? this.approvals.updateType(editing.id, payload, this.circuitId())
      : this.approvals.createType(payload, this.circuitId());

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.afterWrite(editing ? 'Type de frais modifié' : 'Type de frais créé'),
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  archiveType(type: FeeType): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    if (!this.requireCircuit()) {
      return;
    }

    this.approvals.archiveType(type.id, this.circuitId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.afterWrite(`« ${type.name} » archivé`),
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ────────────────────────────────── ouverture du panneau tarif
  openSchedule(levelId?: string, feeTypeId?: string): void {
    const level = (levelId ? this.levelById(levelId) : this.levels()[0]) ?? null;
    const existing = level && feeTypeId
      ? level.schedules.find((s) => s.feeTypeId === feeTypeId)
      : undefined;
    const fallbackType = level ? this.availableFor(level)[0] : this.types()[0];

    this.editingSchedule.set(existing ?? null);
    this.scheduleForm.reset({
      feeTypeId: feeTypeId ?? fallbackType?.id ?? '',
      levelId: level?.levelId ?? '',
      label: existing?.label ?? '',
      totalAmount: existing?.totalAmount ?? 0,
      appliesToNewStudents: existing?.appliesToNewStudents ?? true,
      appliesToReturningStudents: existing?.appliesToReturningStudents ?? true,
      instalmentCount: existing?.instalments.length || 3,
      firstDueDate: existing?.instalments[0]?.dueDate ?? '',
      monthsBetweenInstalments: 3
    });
    this.instalments.clear();
    for (const inst of existing?.instalments ?? []) {
      this.instalments.push(this.instalmentRow(inst.label, inst.amount, inst.dueDate));
    }
    this.scheduleMode.set(existing ? 'MANUAL' : 'AUTO');
    this.panel.set('SCHEDULE');
  }

  setScheduleMode(mode: ScheduleMode): void {
    this.scheduleMode.set(mode);
    if (mode === 'MANUAL' && this.instalments.length === 0) {
      this.addInstalmentRow();
    }
  }

  addInstalmentRow(): void {
    const remaining = Math.max(
      0,
      Math.round((this.scheduleForm.controls.totalAmount.value - this.plannedSum()) * 100) / 100);
    this.instalments.push(this.instalmentRow('', remaining, ''));
  }

  removeInstalmentRow(index: number): void {
    if (this.instalments.length > 1) {
      this.instalments.removeAt(index);
    }
  }

  /** Somme des échéances saisies à la main. */
  plannedSum(): number {
    return Math.round(this.instalments.controls
      .reduce((sum, row) => sum + (row.controls.amount.value || 0), 0) * 100) / 100;
  }

  /** Le total saisi et la somme des échéances concordent. */
  balanced(): boolean {
    const total = this.scheduleForm.controls.totalAmount.value || 0;
    return Math.abs(this.plannedSum() - total) < 0.01;
  }

  private instalmentRow(label: string, amount: number, dueDate: string): FormGroup<InstalmentControls> {
    return this.fb.nonNullable.group({
      label: [label, [Validators.maxLength(120)]],
      amount: [amount, [Validators.required, Validators.min(1)]],
      dueDate: [dueDate, [Validators.required]]
    });
  }

  saveSchedule(): void {
    if (this.saving()) {
      return;
    }
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    const mode = this.scheduleMode();
    if (mode === 'AUTO' && !this.scheduleForm.controls.firstDueDate.value) {
      this.notifications.error('Indiquez la date de la première échéance.');
      return;
    }
    if (mode === 'MANUAL') {
      if (this.instalments.length === 0) {
        this.notifications.error('Ajoutez au moins une échéance.');
        return;
      }
      if (!this.balanced()) {
        this.notifications.error('Les échéances saisies ne totalisent pas le montant du tarif.');
        return;
      }
    }
    this.saving.set(true);
    if (!this.requireCircuit()) {
      return;
    }

    this.approvals.saveSchedule(this.buildSchedulePayload(), this.circuitId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.afterWrite(this.editingSchedule() ? 'Tarif modifié' : 'Tarif créé'),
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  deleteSchedule(schedule: FeeSchedule): void {
    if (schedule.locked) {
      this.notifications.error('Ce tarif est déjà facturé : suppression impossible.');
      return;
    }
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    if (!this.requireCircuit()) {
      return;
    }

    this.approvals.deleteSchedule(schedule.id, this.circuitId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.afterWrite('Tarif supprimé'),
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  private buildSchedulePayload(): FeeSchedulePayload {
    const value = this.scheduleForm.getRawValue();
    const base: FeeSchedulePayload = {
      feeTypeId: value.feeTypeId,
      levelId: value.levelId,
      label: value.label.trim() || undefined,
      totalAmount: value.totalAmount,
      appliesToNewStudents: value.appliesToNewStudents,
      appliesToReturningStudents: value.appliesToReturningStudents
    };
    if (this.scheduleMode() === 'AUTO') {
      base.instalmentCount = value.instalmentCount;
      base.firstDueDate = value.firstDueDate;
      if (value.monthsBetweenInstalments > 0) {
        base.monthsBetweenInstalments = value.monthsBetweenInstalments;
      }
    } else {
      base.instalments = this.instalments.controls.map((row) => ({
        label: row.controls.label.value || undefined,
        amount: row.controls.amount.value,
        dueDate: row.controls.dueDate.value,
        graceDays: 0
      }));
    }
    return base;
  }

  // ──────────────────────────────────────────────── internals
  /** Toute écriture exige un circuit de validation choisi. */
  private requireCircuit(): boolean {
    if (this.circuitId() && this.feeCircuits().some((c) => c.id === this.circuitId())) {
      return true;
    }
    this.saving.set(false);
    this.notifications.error('Choisissez un circuit de validation en haut de la page.');
    return false;
  }

  private afterWrite(label: string): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
    this.setupStatus.refresh();
    this.notifications.success(
      `${label} : demande envoyée dans le circuit. Elle s'appliquera après la dernière validation.`);
  }

  private explain(err: unknown): void {
    const response = (err as { error?: { code?: string; message?: string } })?.error;
    this.notifications.error(
      response?.message
        ?? (response?.code ? translateErrorCode(response.code) : 'Action impossible. Réessayez.'),
      'Action refusée');
  }
}

/** Contrôles d'une ligne d'échéance manuelle. */
interface InstalmentControls {
  label: FormControl<string>;
  amount: FormControl<number>;
  dueDate: FormControl<string>;
}

/** Une échéance à plat, pour l'onglet Échéances. */
interface InstalmentRow {
  levelName: string;
  feeTypeName: string;
  label: string;
  amount: number;
  dueDate: string;
  currency: string;
}


