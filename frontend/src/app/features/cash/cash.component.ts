import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, finalize } from 'rxjs';
import { CashService, CashSession, CashMovement } from '@core/services/cash.service';
import { NotificationService } from '@core/services/notification.service';
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
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly modal = signal<'open' | 'close' | null>(null);
  readonly selected = signal<CashSession | null>(null);
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
  constructor() { this.load(); }
  load() {
    this.loading.set(true); this.error.set(false);
    this.service.list().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: data => { this.sessions.set(data); this.page.set(Math.min(this.page(), this.pages())); }, error: () => this.error.set(true)
    });
  }
  startOpen() { this.amount = null; this.notes = ''; this.modal.set('open'); }
  startClose(s: CashSession) { this.closing = s; this.amount = null; this.notes = ''; this.modal.set('close'); }
  validAmount() { return this.amount !== null && Number.isFinite(this.amount) && this.amount >= 0 && this.amount <= 9999999999999 && Number.isInteger(this.amount); }
  difference() { return this.amount === null || !this.closing ? null : this.amount - this.closing.expectedBalance; }
  submit() {
    if (!this.validAmount() || this.saving()) return;
    if (this.modal() === 'close' && this.difference() !== 0 && !this.notes.trim()) return;
    let request: Observable<CashSession>;
    if (this.modal() === 'open') request = this.service.open(this.amount!, this.notes.trim());
    else if (this.closing) request = this.service.close(this.closing, this.amount!, this.notes.trim());
    else return;
    this.saving.set(true);
    request.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
      next: () => { this.notifications.success(this.modal() === 'open' ? 'La caisse est ouverte.' : 'La caisse est clôturée.'); this.modal.set(null); this.load(); },
      error: err => {
        this.notifications.error(err.status === 409 ? 'La session ou son solde a changé. Actualisez la caisse avant de recommencer.' : 'Opération impossible. Vérifiez les montants puis réessayez.');
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
}
