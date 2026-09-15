import { Component, inject, signal, computed, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'eduops-school-logo', standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="logo-editor"><h2>Logo de l’établissement</h2>
    <p>Ce logo est partagé avec les documents officiels. Les documents déjà émis conservent leur présentation.</p>
    @if (loading()) { <p role="status">Chargement du logo…</p> }
    @else if (loadFailed()) { <p role="alert">Impossible de charger le logo.</p><button type="button" (click)="load()">Réessayer</button> }
    @else {
      @if (preview()) { <img [src]="preview()" alt="Logo de l’établissement" width="180" height="120"> }
      @else { <p>Aucun logo enregistré.</p> }
      @if (canManage()) {
        <label>Choisir ou remplacer le logo<input type="file" accept="image/png,image/jpeg,image/webp" [disabled]="saving() || reading()" (change)="choose($event)"></label>
        <p>PNG, JPEG ou WebP · 500 Ko maximum.</p>
        <div><button type="button" [disabled]="!preview() || saving() || reading()" (click)="preview.set(''); changed.set(true)">Supprimer</button>
          <button type="button" [disabled]="!changed() || saving() || reading()" (click)="save()">{{ saving() ? 'Enregistrement…' : 'Enregistrer le logo' }}</button></div>
      }
    }
    <p role="status" aria-live="polite">{{ message() }}</p></section>`,
  styles: [`.logo-editor{padding:24px;border:1px solid var(--border,#dce3ed);border-radius:12px;margin-bottom:24px;background:var(--surface,#fff)}h2{font-size:20px}img{object-fit:contain;display:block;background:#fff;border:1px solid #ddd;margin:16px 0}label{display:grid;gap:10px}button{padding:10px 14px;border:1px solid #b7c6d9;border-radius:8px;background:#fff;cursor:pointer;margin-right:10px}button:disabled{opacity:.5;cursor:default}p{color:var(--text-secondary,#52637a)}`]
})
export class SchoolLogoComponent {
  private http = inject(HttpClient); private auth = inject(AuthService); private destroy = inject(DestroyRef);
  private url = `${environment.apiBaseUrl}/school/logo`;
  preview = signal(''); changed = signal(false); loading = signal(true); loadFailed = signal(false);
  saving = signal(false); reading = signal(false); message = signal('');
  canManage = computed(() => this.auth.has('SCHOOL_MANAGE'));
  constructor() { this.load(); }
  load(): void {
    this.loading.set(true); this.loadFailed.set(false);
    this.http.get<{dataUrl: string | null}>(this.url).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: result => { this.preview.set(result.dataUrl ?? ''); this.loading.set(false); this.changed.set(false); },
      error: () => { this.loading.set(false); this.loadFailed.set(true); }
    });
  }
  choose(event: Event): void {
    const input = event.target as HTMLInputElement; const file = input.files?.[0]; input.value = '';
    if (!file || !this.canManage()) return;
    if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 500 * 1024) {
      this.message.set('Choisissez une image PNG, JPEG ou WebP de 500 Ko maximum.'); return;
    }
    this.reading.set(true); this.message.set('');
    const reader = new FileReader();
    reader.onerror = () => { this.reading.set(false); this.message.set('Impossible de lire ce fichier.'); };
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => { this.reading.set(false); this.message.set('Ce fichier n’est pas une image valide.'); };
      image.onload = () => { this.preview.set(String(reader.result)); this.changed.set(true); this.reading.set(false); };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }
  save(): void {
    if (!this.canManage() || this.saving() || this.reading() || !this.changed()) return;
    this.saving.set(true); this.message.set('');
    this.http.put(this.url, {dataUrl: this.preview() || null}).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: () => { this.saving.set(false); this.changed.set(false); this.message.set('Logo enregistré.'); },
      error: () => { this.saving.set(false); this.message.set('Le logo n’a pas pu être enregistré. Réessayez.'); }
    });
  }
}
