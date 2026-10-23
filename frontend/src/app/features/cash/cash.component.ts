import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, finalize } from 'rxjs';
import { CashService, CashSession, CashMovement, CashRegister, CashRegisterOverview } from '@core/services/cash.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { AuthService } from '@core/auth/auth.service';
import { MoneyPipe } from '@shared/pipes/money.pipe';

@Component({ selector: 'eduops-cash', standalone: true, imports: [CommonModule, FormsModule, RouterLink, MoneyPipe],
  templateUrl: './cash.component.html', styleUrl: './cash.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CashComponent {
  private readonly service = inject(CashService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  readonly auth = inject(AuthService);
  readonly sessions = signal<CashSession[]>([]);
  readonly registerOverview = signal<CashRegisterOverview>({ registers: [], cashiers: [] });
  readonly registersLoading = signal(false);
  readonly registerSaving = signal(false);
  readonly registerName = signal('');
  readonly registerCashierId = signal('');
  readonly editingRegisterId = signal<string | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly modal = signal<'open' | 'close' | null>(null);
  readonly selected = signal<CashSession | null>(null);
  readonly printing = signal<CashSession | null>(null);
  readonly movements = signal<CashMovement[]>([]);
  readonly movementsLoading = signal(false);
  readonly movementsError = signal(false);
  readonly search = signal('');
  readonly status = signal('');
  readonly page = signal(1);
  readonly current = computed(() => this.sessions().find(s => s.status === 'OPEN'));
  readonly history = computed(() => this.sessions().filter(s => (!this.status() || s.status === this.status()) &&
    s.reference.toLowerCase().includes(this.search().toLowerCase())));
  readonly pages = computed(() => Math.max(1, Math.ceil(this.history().length / 10)));
  readonly visible = computed(() => this.history().slice((this.page() - 1) * 10, this.page() * 10));
  readonly labels = { OPEN: 'Ouverte', CLOSED: 'Clôturée', RECONCILED: 'Rapprochée' };
  readonly methods: Record<string,string> = { CASH: 'Espèces', BANK_TRANSFER: 'Virement', CARD: 'Carte', MOBILE_MONEY: 'Mobile Money', CHEQUE: 'Chèque', OTHER: 'Autre' };
  amount: number | null = null;
  notes = '';
  closing: CashSession | null = null;
  openingRegister: CashRegister | null = null;
  constructor() { this.load(); }
  load() {
    this.loading.set(true); this.error.set(false);
    this.service.list().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: data => { this.sessions.set(data); this.page.set(Math.min(this.page(), this.pages())); }, error: () => this.error.set(true)
    });
    this.loadRegisters();
  }
  private loadRegisters() {
    if (!this.auth.has('USER_MANAGE')) return;
    this.registersLoading.set(true);
    this.service.listRegisters().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.registersLoading.set(false)))
      .subscribe({ next: value => this.registerOverview.set(value), error: () => this.notifications.error('Impossible de charger les affectations de caisse.') });
  }
  editRegister(register: CashRegisterOverview['registers'][number]) {
    this.editingRegisterId.set(register.id);
    this.registerName.set(register.name);
    this.registerCashierId.set(register.cashierUserId);
  }
  cancelRegisterEdit() {
    this.editingRegisterId.set(null);
    this.registerName.set('');
    this.registerCashierId.set('');
  }
  saveRegister() {
    const name = this.registerName().trim();
    const cashierId = this.registerCashierId();
    if (!name || !cashierId || this.registerSaving()) return;
    const editingId = this.editingRegisterId();
    const request = editingId
      ? this.service.updateRegister(editingId, name, cashierId)
      : this.service.createRegister(name, cashierId);
    this.registerSaving.set(true);
    request.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.registerSaving.set(false)))
      .subscribe({
        next: () => {
          this.notifications.success(editingId ? 'Affectation de caisse mise à jour.' : 'Caisse attribuée au caissier.');
          this.cancelRegisterEdit();
          this.loadRegisters();
        },
        error: error => this.notifications.error(error.status === 409
          ? 'Ce caissier ou ce nom de caisse est déjà utilisé, ou une session est encore ouverte.'
          : 'Impossible d’enregistrer cette affectation. Vérifiez que le compte possède le profil Caissier.')
      });
  }
  startOpen(register: CashRegister) {
    this.openingRegister = register;
    this.closing = null;
    this.amount = null;
    this.notes = '';
    this.modal.set('open');
  }
  startClose(s: CashSession) { this.closing = s; this.openingRegister = null; this.amount = null; this.notes = ''; this.modal.set('close'); }
  validAmount() {
    if (this.amount === null || String(this.amount).trim() === '') return false;
    const value = Number(this.amount);
    return Number.isFinite(value) && value >= 0 && value <= 9999999999999 && Number.isInteger(value);
  }
  difference() { return this.amount === null || !this.closing ? null : Number(this.amount) - this.closing.expectedBalance; }
  submit() {
    if (!this.validAmount() || this.saving()) return;
    if (this.modal() === 'close' && this.difference() !== 0 && !this.notes.trim()) return;
    const amount = Number(this.amount);
    let request: Observable<CashSession>;
    if (this.modal() === 'open' && this.openingRegister) request = this.service.openRegister(this.openingRegister.id, amount, this.notes.trim());
    else if (this.closing) request = this.service.close(this.closing, amount, this.notes.trim());
    else return;
    this.saving.set(true);
    request.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
      next: () => { this.notifications.success(this.modal() === 'open' ? 'La caisse est ouverte et attribuée au caissier.' : 'La caisse est clôturée.'); this.modal.set(null); this.load(); },
      error: err => {
        const apiError = err?.error;
        const code = apiError?.code ?? (err?.status === 0 ? 'BACKEND_UNREACHABLE' : err?.status === 409 ? 'CONFLICT' : 'INTERNAL_ERROR');
        this.notifications.error(translateErrorCode(code, apiError), 'Opération impossible');
        if (err.status === 409) { this.modal.set(null); this.load(); }
      }
    });
  }
  inspect(session: CashSession) {
    this.selected.set(session); this.movements.set([]); this.movementsLoading.set(true); this.movementsError.set(false);
    this.service.movements(session.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: items => { if (this.selected()?.id === session.id) { this.movements.set(items); this.movementsLoading.set(false); } },
      error: () => { if (this.selected()?.id === session.id) { this.movementsError.set(true); this.movementsLoading.set(false); } }
    });
  }

  printSession(session: CashSession) {
    this.selected.set(session);
    this.printing.set(session);
    this.movements.set([]);
    this.movementsLoading.set(true);
    this.movementsError.set(false);
    this.service.movements(session.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: items => {
        if (this.printing()?.id !== session.id) return;
        this.movements.set(items);
        this.movementsLoading.set(false);
        setTimeout(() => {
          window.print();
          this.printing.set(null);
        }, 120);
      },
      error: () => {
        if (this.printing()?.id === session.id) {
          this.movementsError.set(true);
          this.movementsLoading.set(false);
          this.printing.set(null);
          this.notifications.error(
            'Le relevé ne peut pas être imprimé car les mouvements de caisse sont indisponibles.',
            'Impression impossible');
        }
      }
    });
  }
}
