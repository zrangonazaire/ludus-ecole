import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { LEVEL_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { Level } from '@core/models/domain.models';
import { SupplyItem, SupplyList, SupplyListService, SupplyYear } from '@core/services/supply-list.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';

@Component({
  selector: 'eduops-supplies', standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplies.component.html', styleUrl: './supplies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliesComponent implements OnInit {
  private readonly api = inject(SupplyListService);
  private readonly levelSource = inject(LEVEL_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  readonly levels = signal<Level[]>([]);
  readonly years = signal<SupplyYear[]>([]);
  readonly current = signal<SupplyList | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly editing = signal(false);
  readonly selectedLevel = signal('');
  readonly selectedYear = signal('');
  readonly canManage = computed(() => this.auth.has(PERMISSIONS.LEVEL_MANAGE)
    && !['CLOSED', 'ARCHIVED'].includes(this.years().find(y => y.id === this.selectedYear())?.status ?? ''));
  readonly form = this.fb.nonNullable.group({
    title: ['Liste de fournitures scolaires', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(160)]],
    notes: ['', Validators.maxLength(4000)],
    items: this.fb.array<ReturnType<SuppliesComponent['itemForm']>>([], [Validators.required, Validators.maxLength(200)])
  });
  get items() { return this.form.controls.items; }

  ngOnInit(): void { this.initialize(); }

  initialize(): void {
    this.loading.set(true);
    this.error.set('');
    forkJoin({ levels: this.levelSource.list(true), years: this.api.years() })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: ({ levels, years }) => {
          this.levels.set(levels); this.years.set(years);
          this.selectedLevel.set(levels.find(l => l.status === 'ACTIVE')?.id ?? levels[0]?.id ?? '');
          this.selectedYear.set(years.find(y => y.status === 'ACTIVE')?.id ?? years[0]?.id ?? '');
          this.load();
        }, error: () => { this.loading.set(false); this.error.set('Impossible de charger les niveaux et les années scolaires.'); }
      });
  }

  select(kind: 'level' | 'year', value: string): void {
    if (this.editing() && this.form.dirty && !window.confirm('Abandonner les modifications non enregistrées ?')) return;
    if (kind === 'level') this.selectedLevel.set(value); else this.selectedYear.set(value);
    this.load();
  }

  load(): void {
    this.current.set(null); this.editing.set(false); this.error.set('');
    if (!this.selectedLevel() || !this.selectedYear()) { this.loading.set(false); return; }
    this.loading.set(true);
    this.api.get(this.selectedLevel(), this.selectedYear()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: list => { this.current.set(list); this.loading.set(false); },
      error: () => { this.loading.set(false); this.error.set('Impossible de charger la liste de fournitures.'); }
    });
  }

  itemForm(item: SupplyItem = { name: '', quantity: 1, details: '' }) {
    return this.fb.nonNullable.group({
      name: [item.name, [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]],
      quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.max(999), Validators.pattern(/^\d+$/)]],
      details: [item.details, Validators.maxLength(500)]
    });
  }

  edit(): void {
    const list = this.current();
    if (!list || !this.canManage()) return;
    this.form.patchValue({ title: list.title, notes: list.notes });
    this.items.clear();
    (list.items.length ? list.items : [{ name: '', quantity: 1, details: '' }]).forEach(item => this.items.push(this.itemForm(item)));
    this.form.markAsPristine(); this.editing.set(true);
  }

  add(): void { if (this.items.length < 200) { this.items.push(this.itemForm()); this.form.markAsDirty(); } }
  remove(index: number): void { this.items.removeAt(index); this.form.markAsDirty(); }
  cancel(): void {
    if (!this.canLeave()) return;
    this.editing.set(false);
  }

  canLeave(): boolean {
    return !this.saving() && (!this.editing() || !this.form.dirty
      || window.confirm('Abandonner les modifications non enregistrées ?'));
  }

  save(): void {
    if (this.form.invalid || this.saving() || !this.canManage()) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const value = this.form.getRawValue();
    this.api.save(this.selectedLevel(), this.selectedYear(), {
      ...value, version: this.current()?.version ?? null,
      title: value.title.trim(), notes: value.notes.trim(),
      items: value.items.map(i => ({ ...i, name: i.name.trim(), details: i.details.trim() }))
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: list => {
        this.current.set(list); this.saving.set(false); this.editing.set(false);
        this.form.markAsPristine(); this.notifications.success('La liste de fournitures a été enregistrée.');
      }, error: err => {
        this.saving.set(false);
        this.notifications.error(err?.error?.code === 'CONCURRENT_MODIFICATION'
          ? 'Cette liste a été modifiée par une autre personne. Annulez puis rechargez la liste avant de reprendre vos modifications.'
          : translateErrorCode(err?.error?.code ?? 'INTERNAL_ERROR'));
      }
    });
  }

  print(): void {
    const list = this.current();
    if (!list?.id || this.editing()) return;
    const preview = window.open('', '_blank');
    if (!preview) { this.notifications.error('Autorisez les fenêtres contextuelles pour imprimer la liste.'); return; }
    // All user-provided content is inserted as text, never interpreted as HTML.
    const doc = preview.document;
    doc.title = `${list.levelName} — ${list.yearLabel} — Fournitures`;
    const style = doc.createElement('style');
    style.textContent = `@page{size:A4;margin:18mm}body{font:12pt Arial,sans-serif;color:#172033;max-width:180mm;margin:24px auto}h1{font-size:22pt}h2{font-size:14pt}table{border-collapse:collapse;width:100%;margin:24px 0;table-layout:fixed}th,td{border:1px solid #aaa;padding:10px;text-align:left;overflow-wrap:anywhere;white-space:pre-wrap}th:first-child{width:35%}th:nth-child(2){width:12%}thead{display:table-header-group}tr{break-inside:avoid}p{white-space:pre-wrap;overflow-wrap:anywhere}button{padding:10px 16px;margin-right:12px;cursor:pointer}@media print{button{display:none}body{margin:0;max-width:none}}`;
    doc.head.append(style);
    const append = (tag: string, text: string, parent: HTMLElement = doc.body) => {
      const element = doc.createElement(tag); element.textContent = text; parent.append(element); return element;
    };
    const button = append('button', 'Imprimer / Enregistrer en PDF');
    button.addEventListener('click', () => preview.print());
    append('h2', list.schoolName); append('h1', list.title);
    append('p', `Niveau : ${list.levelName}\nAnnée scolaire : ${list.yearLabel}`);
    const table = append('table', ''); const head = append('thead', '', table); const row = append('tr', '', head);
    ['Fourniture', 'Quantité', 'Précisions'].forEach(text => append('th', text, row));
    const body = append('tbody', '', table);
    list.items.forEach(item => {
      const tr = append('tr', '', body);
      [item.name, String(item.quantity), item.details].forEach(text => append('td', text, tr));
    });
    if (list.notes) { append('h2', 'Recommandations'); append('p', list.notes); }
    preview.focus(); preview.setTimeout(() => preview.print(), 200);
  }
}
