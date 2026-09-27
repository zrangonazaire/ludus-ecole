import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionService, CollectionAction } from '@core/services/collection.service';
import { OutstandingStudent } from '@core/models/outstanding.models';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';

@Component({
  selector: 'eduops-collection-panel', standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective, MoneyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display:block; padding:1.5rem; }
    .fields { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem; }
    label { display:grid; gap:.4rem; margin-bottom:1rem; }
    textarea { min-height:90px; width:100%; }
    article { padding:1rem 0; border-bottom:1px solid var(--border, #ddd); }
    article p { white-space:pre-wrap; overflow-wrap:anywhere; }
    .error { color:var(--danger, #a32121); }
    .muted { color:var(--text-muted, #666); }
  `],
  template: `
    <h2>Recouvrement · {{ student.studentName }}</h2>
    <p>Solde : {{ student.outstandingAmount | money:student.currency }} · En retard : {{ student.overdueAmount | money:student.currency }}</p>
    <form *eduopsHasPermission="'FINANCE_MANAGE'" (ngSubmit)="save()" #form="ngForm">
      <p class="muted">Consignez une démarche effectuée. Aucun SMS ou email n'est envoyé depuis ce formulaire.</p>
      <label>Type de démarche
        <select class="input" name="channel" [(ngModel)]="channel">
          @for (item of channels; track item.value) { <option [value]="item.value">{{ item.label }}</option> }
        </select>
      </label>
      <label>Compte rendu
        <textarea class="input" name="note" [(ngModel)]="note" required maxlength="2000" placeholder="Personne contactée, résultat de l'échange…"></textarea>
      </label>
      <div class="fields">
        <label>Prochaine relance<input class="input" type="date" name="next" [(ngModel)]="nextContactDate" [min]="today" /></label>
        <label>Montant promis ({{ student.currency }})<input class="input" type="number" name="amount" [(ngModel)]="promisedAmount" min="0.01" step="0.01" /></label>
        <label>Date promise<input class="input" type="date" name="date" [(ngModel)]="promisedDate" [min]="today" /></label>
      </div>
      <p class="muted">Une promesse ne vaut pas paiement. Utilisez « Encaisser » lorsque le versement est reçu.</p>
      <button class="btn btn--primary" type="submit" [disabled]="saving() || loading() || historyError() || form.invalid || !note.trim()">{{ saving() ? 'Enregistrement…' : 'Enregistrer la démarche' }}</button>
    </form>
    @if (error()) { <p role="alert" class="error">{{ error() }}</p> }
    <h3>Historique des démarches</h3>
    @if (loading()) { <p role="status">Chargement…</p> }
    @else if (historyError()) {
      <p role="alert">Impossible de charger l'historique.</p>
      <button class="btn" type="button" (click)="load()">Réessayer</button>
    } @else {
      @for (action of actions(); track action.id) {
        <article>
          <strong>{{ label(action.channel) }}</strong> · {{ action.createdAt | date:'dd/MM/yyyy HH:mm' }}
          <div class="muted">{{ action.authorName }}</div>
          <p>{{ action.note }}</p>
          @if (action.promisedAmount) { <p>Promesse : {{ action.promisedAmount | money:student.currency }} pour le {{ action.promisedDate | date:'dd/MM/yyyy' }}</p> }
          @if (action.nextContactDate) { <p>Relance prévue le {{ action.nextContactDate | date:'dd/MM/yyyy' }}</p> }
        </article>
      } @empty { <p>Aucune démarche enregistrée pour l'année active.</p> }
    }
  `
})
export class CollectionPanelComponent implements OnInit {
  @Input({ required: true }) student!: OutstandingStudent;
  @Output() readonly saved = new EventEmitter<void>();
  private readonly service = inject(CollectionService);
  private readonly destroyRef = inject(DestroyRef);
  readonly actions = signal<CollectionAction[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly historyError = signal(false);
  readonly today = new Date().toLocaleDateString('en-CA');
  readonly channels = [
    { value: 'PHONE', label: 'Appel téléphonique' }, { value: 'SMS', label: 'SMS effectué' },
    { value: 'EMAIL', label: 'Email effectué' }, { value: 'MEETING', label: 'Rendez-vous' },
    { value: 'NOTE', label: 'Note de suivi' }
  ];
  channel = 'PHONE'; note = ''; nextContactDate = ''; promisedDate = '';
  promisedAmount: number | null = null;
  ngOnInit(): void { this.load(); }
  label(value: string): string { return this.channels.find(c => c.value === value)?.label ?? value; }
  load(): void {
    this.loading.set(true); this.historyError.set(false);
    this.service.history(this.student.studentId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: actions => { this.actions.set(actions); this.loading.set(false); },
      error: () => { this.historyError.set(true); this.loading.set(false); }
    });
  }
  save(): void {
    if (this.saving() || !this.note.trim()) return;
    if ((this.promisedAmount != null) !== !!this.promisedDate) {
      this.error.set('Renseignez ensemble le montant promis et la date de paiement.'); return;
    }
    this.saving.set(true); this.error.set('');
    this.service.create(this.student.studentId, {
      channel: this.channel, note: this.note.trim(), nextContactDate: this.nextContactDate || null,
      promisedDate: this.promisedDate || null, promisedAmount: this.promisedAmount
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: action => {
        this.actions.update(items => [action, ...items]); this.saved.emit(); this.saving.set(false);
        this.note = ''; this.nextContactDate = ''; this.promisedDate = ''; this.promisedAmount = null;
      },
      error: () => { this.saving.set(false); this.error.set('Enregistrement impossible. Vérifiez les dates, le montant et vos droits, puis réessayez.'); }
    });
  }
}
