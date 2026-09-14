import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';

interface PortalPerson {
  id: string; kind: 'GUARDIAN' | 'STUDENT'; reference: string; fullName: string;
  hasAccount: boolean; accountActive: boolean; locked: boolean; portalAllowed: boolean;
  lastLoginAt: string | null;
}

@Component({
  selector: 'eduops-portals', standalone: true, imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header><div><h1>Portail des familles</h1><p>Suivez les accès des responsables et des élèves de votre établissement.</p></div>
      <button (click)="load()" [disabled]="loading()">Actualiser</button></header>
    @if (loading()) { <p role="status">Chargement des accès…</p> }
    @else if (failed()) { <section role="alert"><h2>Les accès ne sont pas disponibles</h2><p>Vérifiez votre connexion et vos droits de consultation.</p><button (click)="load()">Réessayer</button></section> }
    @else {
      <div class="stats"><section><strong>{{ people().length }}</strong><span>Personnes recensées</span></section>
        <section><strong>{{ readyCount() }}</strong><span>Accès disponibles</span></section>
        <section><strong>{{ people().length - readyCount() }}</strong><span>Accès à préparer</span></section></div>
      <section class="filters"><label>Rechercher<input type="search" placeholder="Nom ou matricule" [value]="search()" (input)="search.set($any($event.target).value); page.set(0)"></label>
        <label>Profil<select (change)="kind.set($any($event.target).value); page.set(0)"><option value="">Tous</option><option value="GUARDIAN">Responsables</option><option value="STUDENT">Élèves</option></select></label>
        <label>Accès<select (change)="status.set($any($event.target).value); page.set(0)"><option value="">Tous</option><option value="ready">Disponible</option><option value="blocked">À préparer</option></select></label></section>
      <p>{{ filtered().length }} résultat(s)</p>
      <div class="table-wrap"><table><thead><tr><th>Personne</th><th>Profil</th><th>Accès</th><th>Dernière connexion</th><th>Suivi</th></tr></thead><tbody>
        @for (person of displayed(); track person.id) {
          <tr><td><strong>{{ person.fullName }}</strong><small>{{ person.reference }}</small></td><td>{{ person.kind === 'GUARDIAN' ? 'Responsable' : 'Élève' }}</td>
            <td><span [class.ready]="ready(person)">{{ reason(person) }}</span></td><td>{{ person.lastLoginAt ? (person.lastLoginAt | date:'dd/MM/yyyy HH:mm') : 'Jamais' }}</td>
            <td><a [routerLink]="person.kind === 'STUDENT' ? ['/students', person.id] : ['/guardians']">Consulter la fiche</a></td></tr>
        } @empty { <tr><td colspan="5">Aucune personne ne correspond à votre recherche.</td></tr> }
      </tbody></table></div>
      <footer><button (click)="page.set(page() - 1)" [disabled]="page() === 0">Précédent</button><span>Page {{ page() + 1 }} / {{ pages() }}</span><button (click)="page.set(page() + 1)" [disabled]="page() + 1 >= pages()">Suivant</button></footer>
      <section><h2>Préparer les accès</h2><p>Vérifiez le rattachement du compte à la personne, son activation et son droit au portail. Les identifiants restent personnels.</p><a routerLink="/users">Gestion des utilisateurs</a></section>
    }
  `,
  styles: [`:host{display:block;padding:24px;color:var(--text-primary,#172b4d)}header,footer,.filters,.stats{display:flex;gap:20px;align-items:center;justify-content:space-between;margin-bottom:24px}h1{margin:0;font-size:28px}p,small{color:var(--text-secondary,#52637a)}section{background:var(--surface,#fff);padding:20px;border:1px solid #dde4ee;border-radius:12px}.stats section{flex:1}.stats strong{display:block;font-size:30px}.stats span,small{display:block}.filters{justify-content:flex-start;flex-wrap:wrap}label{display:grid;gap:8px}input,select,button{font:inherit;border:1px solid #b9c7d8;border-radius:8px;padding:10px;background:#fff}button{cursor:pointer}button:disabled{opacity:.5;cursor:default}.table-wrap{overflow:auto;background:#fff;border-radius:12px;border:1px solid #dde4ee}table{border-collapse:collapse;width:100%;min-width:680px}th,td{text-align:left;padding:16px;border-bottom:1px solid #e7ecf3}th{background:#f5f7fb}.ready{color:#08764b}a{color:#245ac0}footer{margin-top:20px}@media(max-width:700px){:host{padding:12px}header,.stats{align-items:stretch;flex-direction:column}.filters label{width:100%}}`]
})
export class PortalsComponent {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  people = signal<PortalPerson[]>([]); loading = signal(false); failed = signal(false);
  search = signal(''); kind = signal(''); status = signal(''); page = signal(0);
  ready = (p: PortalPerson) => p.hasAccount && p.accountActive && p.portalAllowed && !p.locked;
  readyCount = computed(() => this.people().filter(this.ready).length);
  filtered = computed(() => this.people().filter(p => (!this.kind() || p.kind === this.kind()) &&
    (!this.status() || this.ready(p) === (this.status() === 'ready')) &&
    `${p.fullName} ${p.reference}`.toLocaleLowerCase().includes(this.search().trim().toLocaleLowerCase())));
  pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 25)));
  displayed = computed(() => this.filtered().slice(this.page() * 25, (this.page() + 1) * 25));
  constructor() { this.load(); }
  reason(p: PortalPerson): string {
    return !p.hasAccount ? 'Compte non rattaché' : !p.accountActive ? 'Compte inactif' : p.locked ? 'Compte verrouillé' : !p.portalAllowed ? 'Droit au portail manquant' : 'Disponible';
  }
  load(): void {
    this.loading.set(true); this.failed.set(false); this.page.set(0);
    this.http.get<PortalPerson[]>(`${environment.apiBaseUrl}/portals`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: people => { this.people.set(people); this.loading.set(false); },
      error: () => { this.failed.set(true); this.loading.set(false); }
    });
  }
}

