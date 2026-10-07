import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

interface PaymentHistoryItem {
  id: string;
  receiptNumber: string;
  date: string;
  amount: number;
  paymentMethod: string;
  label: string;
  status: 'VALIDATED' | 'PENDING';
}

interface FeeInstalment {
  id: string;
  label: string;
  dueDate: string;
  amount: number;
  amountPaid: number;
  status: 'PAID' | 'PARTIAL' | 'PENDING' | 'OVERDUE';
}

@Component({
  selector: 'eduops-parent-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, MoneyPipe, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Situation financière & Paiements</h1>
        <p class="page-head__sub">Suivi des frais de scolarité, échéances, reçus et paiement en ligne sécurisé</p>
      </div>

      <div class="actions">
        <button class="btn btn--pay" (click)="openPayModal()">
          <span class="icon">💳</span> Effectuer un règlement en ligne
        </button>
      </div>
    </header>

    @if (loading()) {
      <eduops-loading-state message="Chargement des données financières..." />
    } @else {
      <!-- SYNTHÈSE SOLDE -->
      <div class="balance-card card">
        <div class="balance-grid">
          <div class="balance-item">
            <span class="balance-item__label">Total Scolarité Annuelle</span>
            <span class="balance-item__val">{{ 850000 | money }}</span>
            <span class="balance-item__sub">Année scolaire 2025-2026</span>
          </div>
          <div class="balance-item">
            <span class="balance-item__label">Montant déjà réglé</span>
            <span class="balance-item__val balance-item__val--success">{{ 600000 | money }}</span>
            <span class="balance-item__sub">70.6 % de la scolarité payée</span>
          </div>
          <div class="balance-item">
            <span class="balance-item__label">Solde restant dû</span>
            <span class="balance-item__val balance-item__val--danger">{{ 250000 | money }}</span>
            <span class="balance-item__sub">Prochaine échéance : 15 Nov 2026</span>
          </div>
        </div>
      </div>

      <!-- ÉCHÉANCIER -->
      <section class="section">
        <div class="section__header">
          <h2 class="section__title">Échéancier des versements</h2>
          <span class="section__badge">3 tranches</span>
        </div>

        <div class="instalments-list">
          @for (inst of instalments(); track inst.id) {
            <div class="instalment-card card" [class.instalment-card--paid]="inst.status === 'PAID'">
              <div class="instalment-card__info">
                <span class="status-badge" [ngClass]="'status--' + inst.status.toLowerCase()">
                  {{ inst.status === 'PAID' ? 'Réglé' : (inst.status === 'OVERDUE' ? 'En retard' : 'À régler') }}
                </span>
                <h3 class="instalment-card__label">{{ inst.label }}</h3>
                <span class="instalment-card__date">Date limite : {{ inst.dueDate }}</span>
              </div>
              <div class="instalment-card__amounts">
                <span class="amount-total">{{ inst.amount | money }}</span>
                @if (inst.status !== 'PAID') {
                  <span class="amount-remaining">Reste : {{ (inst.amount - inst.amountPaid) | money }}</span>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- HISTORIQUE DES ENCAISSEMENTS & REÇUS -->
      <section class="section">
        <div class="section__header">
          <h2 class="section__title">Historique des règlements & Reçus officiels</h2>
        </div>

        <div class="receipts-card card">
          <table class="receipts-table">
            <thead>
              <tr>
                <th>N° Reçu</th>
                <th>Date</th>
                <th>Objet</th>
                <th>Mode</th>
                <th>Montant</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              @for (rec of paymentHistory(); track rec.id) {
                <tr>
                  <td><strong class="receipt-num">{{ rec.receiptNumber }}</strong></td>
                  <td>{{ rec.date }}</td>
                  <td>{{ rec.label }}</td>
                  <td>
                    <span class="method-pill">{{ rec.paymentMethod }}</span>
                  </td>
                  <td><strong class="receipt-amt">{{ rec.amount | money }}</strong></td>
                  <td>
                    <button class="btn-rec" (click)="downloadReceipt(rec)" title="Télécharger le reçu officiel">
                      📄 Reçu PDF
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    }

    <!-- MODAL DE PAIEMENT SÉCURISÉ (SIMULATION GRAND PUBLIC) -->
    @if (showPayModal()) {
      <div class="modal-overlay" (click)="closePayModal()">
        <div class="modal card" (click)="$event.stopPropagation()">
          <div class="modal__header">
            <h3>Paiement sécurisé en ligne</h3>
            <button class="modal__close" (click)="closePayModal()">✕</button>
          </div>

          <div class="modal__body">
            @if (paymentSuccess()) {
              <div class="pay-success">
                <span class="success-icon">✓</span>
                <h4>Paiement validé avec succès !</h4>
                <p>Votre règlement de <strong>{{ payAmount | money }}</strong> a été enregistré et certifié.</p>
                <p class="trans-id">Transaction N° TX-2026-{{ mathRandomId }}</p>
                <button class="btn btn--primary" (click)="finishPayment()">Télécharger mon reçu officiel</button>
              </div>
            } @else {
              <div class="form-group">
                <label>Élève concerné :</label>
                <input type="text" value="Emmanuel Kouassi (3ème A)" readonly class="input input--readonly">
              </div>

              <div class="form-group">
                <label>Tranche à régler :</label>
                <select class="input" [(ngModel)]="selectedInstalment">
                  <option value="T2">Tranche 2 - Deuxième trimestre (150 000 FCFA)</option>
                  <option value="T3">Tranche 3 - Troisième trimestre (100 000 FCFA)</option>
                  <option value="SOLDE">Solde total restant (250 000 FCFA)</option>
                </select>
              </div>

              <div class="form-group">
                <label>Mode de règlement :</label>
                <div class="methods-grid">
                  <label class="method-option" [class.method-option--active]="payMethod === 'WAVE'">
                    <input type="radio" name="method" value="WAVE" [(ngModel)]="payMethod">
                    <span>🌊 Wave Mobile</span>
                  </label>
                  <label class="method-option" [class.method-option--active]="payMethod === 'ORANGE'">
                    <input type="radio" name="method" value="ORANGE" [(ngModel)]="payMethod">
                    <span>🍊 Orange Money</span>
                  </label>
                  <label class="method-option" [class.method-option--active]="payMethod === 'MTN'">
                    <input type="radio" name="method" value="MTN" [(ngModel)]="payMethod">
                    <span>🟡 MTN MoMo</span>
                  </label>
                  <label class="method-option" [class.method-option--active]="payMethod === 'CARD'">
                    <input type="radio" name="method" value="CARD" [(ngModel)]="payMethod">
                    <span>💳 Carte Bancaire</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Numéro de téléphone / Portefeuille :</label>
                <input type="tel" class="input" placeholder="+225 07 00 00 00 00" [(ngModel)]="phoneNumber">
              </div>

              <div class="modal__summary">
                <span>Total à débiter :</span>
                <strong>{{ (selectedInstalment === 'SOLDE' ? 250000 : (selectedInstalment === 'T2' ? 150000 : 100000)) | money }}</strong>
              </div>

              <div class="modal__footer">
                <button class="btn btn--outline" (click)="closePayModal()">Annuler</button>
                <button class="btn btn--pay" (click)="processPayment()" [disabled]="processing()">
                  {{ processing() ? 'Validation en cours...' : 'Confirmer le règlement sécurisé' }}
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }

    .balance-card {
      background: linear-gradient(135deg, #1b365d 0%, #0e223f 100%);
      color: #fff; padding: var(--space-6); border-radius: var(--radius-card);
      margin-bottom: var(--space-6); box-shadow: 0 4px 14px rgba(27, 54, 93, 0.2);
    }
    .balance-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-5); }
    .balance-item { display: flex; flex-direction: column; gap: 4px; }
    .balance-item__label { font-size: var(--text-xs); color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
    .balance-item__val { font-size: var(--text-2xl); font-family: var(--font-display); font-weight: 800; color: #fff; }
    .balance-item__val--success { color: #4ade80; }
    .balance-item__val--danger { color: #f87171; }
    .balance-item__sub { font-size: var(--text-xs); color: #cbd5e1; }

    .section { margin-bottom: var(--space-6); }
    .section__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
    .section__title { font-size: var(--text-lg); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .section__badge { font-size: var(--text-xs); background: var(--surface-subtle); padding: 2px 8px; border-radius: 999px; }

    .instalments-list { display: flex; flex-direction: column; gap: var(--space-3); }
    .instalment-card {
      display: flex; justify-content: space-between; align-items: center;
      padding: var(--space-4); border: 1px solid var(--border-light); border-radius: var(--radius-card);
      background: var(--surface); transition: transform 0.15s ease;
    }
    .instalment-card--paid { background: #f8fafc; border-left: 4px solid #16a34a; }
    .instalment-card__info { display: flex; flex-direction: column; gap: 2px; }
    .instalment-card__label { font-size: var(--text-md); margin: 4px 0 0; font-family: var(--font-display); }
    .instalment-card__date { font-size: var(--text-xs); color: var(--text-muted); }
    .instalment-card__amounts { text-align: right; display: flex; flex-direction: column; }
    .amount-total { font-size: var(--text-lg); font-weight: 700; color: var(--text-strong); }
    .amount-remaining { font-size: var(--text-xs); color: #dc2626; font-weight: 600; }

    .status-badge {
      display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px;
      border-radius: 999px; width: fit-content; text-transform: uppercase;
    }
    .status--paid { background: #dcfce7; color: #15803d; }
    .status--pending { background: #fef3c7; color: #b45309; }
    .status--overdue { background: #fee2e2; color: #b91c1c; }

    .receipts-card { overflow-x: auto; padding: 0; background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); }
    .receipts-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
    .receipts-table th { text-align: left; padding: 12px 16px; background: var(--surface-subtle); color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; }
    .receipts-table td { padding: 12px 16px; border-bottom: 1px solid var(--border-light); }
    .receipt-num { color: #1b365d; font-family: monospace; }
    .method-pill { font-size: var(--text-xs); background: var(--surface-subtle); padding: 2px 8px; border-radius: 4px; font-weight: 500; }
    .receipt-amt { color: #16a34a; }
    .btn-rec {
      border: 1px solid var(--border-medium); background: var(--surface); padding: 4px 10px;
      border-radius: var(--radius-button); font-size: var(--text-xs); font-weight: 600; cursor: pointer;
    }
    .btn-rec:hover { background: var(--surface-subtle); }

    .btn {
      display: inline-flex; align-items: center; gap: var(--space-2);
      padding: 10px 20px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; transition: all 0.2s; border: none;
    }
    .btn--pay { background: #16a34a; color: #fff; box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3); }
    .btn--pay:hover { background: #15803d; }
    .btn--outline { border: 1px solid var(--border-medium); background: var(--surface); color: var(--text-strong); }
    .btn--primary { background: #1b365d; color: #fff; }

    /* MODAL */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center; z-index: 1000; padding: var(--space-4);
    }
    .modal { width: 100%; max-width: 520px; background: var(--surface); border-radius: var(--radius-card); overflow: hidden; }
    .modal__header {
      display: flex; justify-content: space-between; align-items: center;
      padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-light);
    }
    .modal__header h3 { margin: 0; font-size: var(--text-lg); font-family: var(--font-display); }
    .modal__close { background: none; border: none; font-size: var(--text-lg); cursor: pointer; color: var(--text-muted); }
    .modal__body { padding: var(--space-5); }
    .form-group { margin-bottom: var(--space-4); }
    .form-group label { display: block; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); margin-bottom: 4px; }
    .input {
      width: 100%; padding: 10px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-sm); background: var(--surface); box-sizing: border-box;
    }
    .input--readonly { background: var(--surface-subtle); color: var(--text-muted); }

    .methods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }
    .method-option {
      border: 1px solid var(--border-medium); padding: 10px; border-radius: var(--radius-button);
      display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: var(--text-xs); font-weight: 600;
    }
    .method-option--active { border-color: #1b365d; background: #eef4fc; color: #1b365d; }

    .modal__summary {
      display: flex; justify-content: space-between; align-items: center;
      padding: var(--space-4); background: var(--surface-subtle); border-radius: var(--radius-button);
      margin: var(--space-4) 0; font-size: var(--text-sm);
    }
    .modal__summary strong { font-size: var(--text-lg); color: #16a34a; }
    .modal__footer { display: flex; justify-content: flex-end; gap: var(--space-3); }

    .pay-success { text-align: center; padding: var(--space-4); }
    .success-icon {
      display: inline-flex; width: 56px; height: 56px; border-radius: 50%;
      background: #dcfce7; color: #16a34a; align-items: center; justify-content: center;
      font-size: 28px; font-weight: bold; margin-bottom: var(--space-3);
    }
    .pay-success h4 { margin: 0 0 8px; font-size: var(--text-xl); font-family: var(--font-display); }
    .trans-id { font-family: monospace; font-size: var(--text-xs); color: var(--text-muted); margin: 8px 0 16px; }
  `]
})
export class ParentPaymentsComponent implements OnInit {
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly showPayModal = signal(false);
  readonly processing = signal(false);
  readonly paymentSuccess = signal(false);

  selectedInstalment = 'T2';
  payMethod = 'WAVE';
  phoneNumber = '';
  payAmount = 150000;
  mathRandomId = Math.floor(100000 + Math.random() * 900000);

  readonly instalments = signal<FeeInstalment[]>([
    { id: '1', label: 'Tranche 1 - Inscription & Rentrée', dueDate: '15/09/2026', amount: 350000, amountPaid: 350000, status: 'PAID' },
    { id: '2', label: 'Tranche 2 - Deuxième trimestre', dueDate: '15/11/2026', amount: 250000, amountPaid: 250000, status: 'PAID' },
    { id: '3', label: 'Tranche 3 - Troisième trimestre', dueDate: '15/02/2027', amount: 250000, amountPaid: 0, status: 'PENDING' }
  ]);

  readonly paymentHistory = signal<PaymentHistoryItem[]>([
    { id: 'p1', receiptNumber: 'REC-2026-00412', date: '12/09/2026', amount: 350000, paymentMethod: 'Wave Mobile Money', label: 'Tranche 1 - Scolarité', status: 'VALIDATED' },
    { id: 'p2', receiptNumber: 'REC-2026-00890', date: '04/10/2026', amount: 250000, paymentMethod: 'Orange Money', label: 'Tranche 2 - Scolarité', status: 'VALIDATED' }
  ]);

  ngOnInit(): void {}

  openPayModal(): void {
    this.paymentSuccess.set(false);
    this.showPayModal.set(true);
  }

  closePayModal(): void {
    this.showPayModal.set(false);
  }

  processPayment(): void {
    this.processing.set(true);
    setTimeout(() => {
      this.processing.set(false);
      this.payAmount = this.selectedInstalment === 'SOLDE' ? 250000 : (this.selectedInstalment === 'T2' ? 150000 : 100000);
      this.paymentSuccess.set(true);

      // Ajouter à l'historique
      this.paymentHistory.update((hist) => [
        {
          id: 'p-' + Date.now(),
          receiptNumber: 'REC-2026-0' + Math.floor(1000 + Math.random() * 9000),
          date: new Date().toLocaleDateString('fr-FR'),
          amount: this.payAmount,
          paymentMethod: this.payMethod + ' (En ligne)',
          label: 'Paiement en ligne ' + this.selectedInstalment,
          status: 'VALIDATED'
        },
        ...hist
      ]);
    }, 1200);
  }

  finishPayment(): void {
    this.showPayModal.set(false);
    window.print();
  }

  downloadReceipt(rec: PaymentHistoryItem): void {
    window.print();
  }
}
