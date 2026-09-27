import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
const _c0 = a0 => ["/students", a0];
const _c1 = () => ["/guardians"];
function PortalsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 1);
    i0.ɵɵtext(1, "Chargement des acc\u00E8s\u2026");
    i0.ɵɵelementEnd();
} }
function PortalsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 2)(1, "h2");
    i0.ɵɵtext(2, "Les acc\u00E8s ne sont pas disponibles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "V\u00E9rifiez votre connexion et vos droits de consultation.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 3);
    i0.ɵɵlistener("click", function PortalsComponent_Conditional_9_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(6, "R\u00E9essayer");
    i0.ɵɵelementEnd()();
} }
function PortalsComponent_Conditional_10_For_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "a", 15);
    i0.ɵɵtext(16, "Consulter la fiche");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const person_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(person_r4.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(person_r4.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(person_r4.kind === "GUARDIAN" ? "Responsable" : "\u00C9l\u00E8ve");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("ready", ctx_r1.ready(person_r4));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.reason(person_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(person_r4.lastLoginAt ? i0.ɵɵpipeBind2(13, 8, person_r4.lastLoginAt, "dd/MM/yyyy HH:mm") : "Jamais");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", person_r4.kind === "STUDENT" ? i0.ɵɵpureFunction1(11, _c0, person_r4.id) : i0.ɵɵpureFunction0(13, _c1));
} }
function PortalsComponent_Conditional_10_ForEmpty_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 16);
    i0.ɵɵtext(2, "Aucune personne ne correspond \u00E0 votre recherche.");
    i0.ɵɵelementEnd()();
} }
function PortalsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "section")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Personnes recens\u00E9es");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "section")(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Acc\u00E8s disponibles");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "section")(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Acc\u00E8s \u00E0 pr\u00E9parer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "section", 5)(17, "label");
    i0.ɵɵtext(18, "Rechercher");
    i0.ɵɵelementStart(19, "input", 6);
    i0.ɵɵlistener("input", function PortalsComponent_Conditional_10_Template_input_input_19_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.search.set($event.target.value); return i0.ɵɵresetView(ctx_r1.page.set(0)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵtext(21, "Profil");
    i0.ɵɵelementStart(22, "select", 7);
    i0.ɵɵlistener("change", function PortalsComponent_Conditional_10_Template_select_change_22_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.kind.set($event.target.value); return i0.ɵɵresetView(ctx_r1.page.set(0)); });
    i0.ɵɵelementStart(23, "option", 8);
    i0.ɵɵtext(24, "Tous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "option", 9);
    i0.ɵɵtext(26, "Responsables");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "option", 10);
    i0.ɵɵtext(28, "\u00C9l\u00E8ves");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "label");
    i0.ɵɵtext(30, "Acc\u00E8s");
    i0.ɵɵelementStart(31, "select", 7);
    i0.ɵɵlistener("change", function PortalsComponent_Conditional_10_Template_select_change_31_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.status.set($event.target.value); return i0.ɵɵresetView(ctx_r1.page.set(0)); });
    i0.ɵɵelementStart(32, "option", 8);
    i0.ɵɵtext(33, "Tous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "option", 11);
    i0.ɵɵtext(35, "Disponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "option", 12);
    i0.ɵɵtext(37, "\u00C0 pr\u00E9parer");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(38, "p");
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 13)(41, "table")(42, "thead")(43, "tr")(44, "th");
    i0.ɵɵtext(45, "Personne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "th");
    i0.ɵɵtext(47, "Profil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "th");
    i0.ɵɵtext(49, "Acc\u00E8s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "th");
    i0.ɵɵtext(51, "Derni\u00E8re connexion");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "th");
    i0.ɵɵtext(53, "Suivi");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(54, "tbody");
    i0.ɵɵrepeaterCreate(55, PortalsComponent_Conditional_10_For_56_Template, 17, 14, "tr", null, _forTrack0, false, PortalsComponent_Conditional_10_ForEmpty_57_Template, 3, 0, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(58, "footer")(59, "button", 0);
    i0.ɵɵlistener("click", function PortalsComponent_Conditional_10_Template_button_click_59_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.page.set(ctx_r1.page() - 1)); });
    i0.ɵɵtext(60, "Pr\u00E9c\u00E9dent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "span");
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "button", 0);
    i0.ɵɵlistener("click", function PortalsComponent_Conditional_10_Template_button_click_63_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.page.set(ctx_r1.page() + 1)); });
    i0.ɵɵtext(64, "Suivant");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "section")(66, "h2");
    i0.ɵɵtext(67, "Pr\u00E9parer les acc\u00E8s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "p");
    i0.ɵɵtext(69, "V\u00E9rifiez le rattachement du compte \u00E0 la personne, son activation et son droit au portail. Les identifiants restent personnels.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "a", 14);
    i0.ɵɵtext(71, "Gestion des utilisateurs");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.people().length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.readyCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.people().length - ctx_r1.readyCount());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", ctx_r1.search());
    i0.ɵɵadvance(20);
    i0.ɵɵtextInterpolate1("", ctx_r1.filtered().length, " r\u00E9sultat(s)");
    i0.ɵɵadvance(16);
    i0.ɵɵrepeater(ctx_r1.displayed());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.page() === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Page ", ctx_r1.page() + 1, " / ", ctx_r1.pages(), "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.page() + 1 >= ctx_r1.pages());
} }
export class PortalsComponent {
    http = inject(HttpClient);
    destroyRef = inject(DestroyRef);
    people = signal([]);
    loading = signal(false);
    failed = signal(false);
    search = signal('');
    kind = signal('');
    status = signal('');
    page = signal(0);
    ready = (p) => p.hasAccount && p.accountActive && p.portalAllowed && !p.locked;
    readyCount = computed(() => this.people().filter(this.ready).length);
    filtered = computed(() => this.people().filter(p => (!this.kind() || p.kind === this.kind()) &&
        (!this.status() || this.ready(p) === (this.status() === 'ready')) &&
        `${p.fullName} ${p.reference}`.toLocaleLowerCase().includes(this.search().trim().toLocaleLowerCase())));
    pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 25)));
    displayed = computed(() => this.filtered().slice(this.page() * 25, (this.page() + 1) * 25));
    constructor() { this.load(); }
    reason(p) {
        return !p.hasAccount ? 'Compte non rattaché' : !p.accountActive ? 'Compte inactif' : p.locked ? 'Compte verrouillé' : !p.portalAllowed ? 'Droit au portail manquant' : 'Disponible';
    }
    load() {
        this.loading.set(true);
        this.failed.set(false);
        this.page.set(0);
        this.http.get(`${environment.apiBaseUrl}/portals`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: people => { this.people.set(people); this.loading.set(false); },
            error: () => { this.failed.set(true); this.loading.set(false); }
        });
    }
    static ɵfac = function PortalsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PortalsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PortalsComponent, selectors: [["eduops-portals"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 11, vars: 2, consts: [[3, "click", "disabled"], ["role", "status"], ["role", "alert"], [3, "click"], [1, "stats"], [1, "filters"], ["type", "search", "placeholder", "Nom ou matricule", 3, "input", "value"], [3, "change"], ["value", ""], ["value", "GUARDIAN"], ["value", "STUDENT"], ["value", "ready"], ["value", "blocked"], [1, "table-wrap"], ["routerLink", "/users"], [3, "routerLink"], ["colspan", "5"]], template: function PortalsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header")(1, "div")(2, "h1");
            i0.ɵɵtext(3, "Portail des familles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Suivez les acc\u00E8s des responsables et des \u00E9l\u00E8ves de votre \u00E9tablissement.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "button", 0);
            i0.ɵɵlistener("click", function PortalsComponent_Template_button_click_6_listener() { return ctx.load(); });
            i0.ɵɵtext(7, "Actualiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, PortalsComponent_Conditional_8_Template, 2, 0, "p", 1)(9, PortalsComponent_Conditional_9_Template, 7, 0, "section", 2)(10, PortalsComponent_Conditional_10_Template, 72, 10);
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 8 : ctx.failed() ? 9 : 10);
        } }, dependencies: [CommonModule, i1.DatePipe, RouterLink], styles: ["[_nghost-%COMP%]{display:block;padding:24px;color:var(--text-primary,#172b4d)}header[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], .filters[_ngcontent-%COMP%], .stats[_ngcontent-%COMP%]{display:flex;gap:20px;align-items:center;justify-content:space-between;margin-bottom:24px}h1[_ngcontent-%COMP%]{margin:0;font-size:28px}p[_ngcontent-%COMP%], small[_ngcontent-%COMP%]{color:var(--text-secondary,#52637a)}section[_ngcontent-%COMP%]{background:var(--surface,#fff);padding:20px;border:1px solid #dde4ee;border-radius:12px}.stats[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{flex:1}.stats[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:30px}.stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], small[_ngcontent-%COMP%]{display:block}.filters[_ngcontent-%COMP%]{justify-content:flex-start;flex-wrap:wrap}label[_ngcontent-%COMP%]{display:grid;gap:8px}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{font:inherit;border:1px solid #b9c7d8;border-radius:8px;padding:10px;background:#fff}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:default}.table-wrap[_ngcontent-%COMP%]{overflow:auto;background:#fff;border-radius:12px;border:1px solid #dde4ee}table[_ngcontent-%COMP%]{border-collapse:collapse;width:100%;min-width:680px}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{text-align:left;padding:16px;border-bottom:1px solid #e7ecf3}th[_ngcontent-%COMP%]{background:#f5f7fb}.ready[_ngcontent-%COMP%]{color:#08764b}a[_ngcontent-%COMP%]{color:#245ac0}footer[_ngcontent-%COMP%]{margin-top:20px}@media(max-width:700px){[_nghost-%COMP%]{padding:12px}header[_ngcontent-%COMP%], .stats[_ngcontent-%COMP%]{align-items:stretch;flex-direction:column}.filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%}}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PortalsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-portals', standalone: true, imports: [CommonModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `
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
  `, styles: [":host{display:block;padding:24px;color:var(--text-primary,#172b4d)}header,footer,.filters,.stats{display:flex;gap:20px;align-items:center;justify-content:space-between;margin-bottom:24px}h1{margin:0;font-size:28px}p,small{color:var(--text-secondary,#52637a)}section{background:var(--surface,#fff);padding:20px;border:1px solid #dde4ee;border-radius:12px}.stats section{flex:1}.stats strong{display:block;font-size:30px}.stats span,small{display:block}.filters{justify-content:flex-start;flex-wrap:wrap}label{display:grid;gap:8px}input,select,button{font:inherit;border:1px solid #b9c7d8;border-radius:8px;padding:10px;background:#fff}button{cursor:pointer}button:disabled{opacity:.5;cursor:default}.table-wrap{overflow:auto;background:#fff;border-radius:12px;border:1px solid #dde4ee}table{border-collapse:collapse;width:100%;min-width:680px}th,td{text-align:left;padding:16px;border-bottom:1px solid #e7ecf3}th{background:#f5f7fb}.ready{color:#08764b}a{color:#245ac0}footer{margin-top:20px}@media(max-width:700px){:host{padding:12px}header,.stats{align-items:stretch;flex-direction:column}.filters label{width:100%}}"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PortalsComponent, { className: "PortalsComponent", filePath: "frontend/src/app/features/portals/portals.component.ts", lineNumber: 43 }); })();
//# sourceMappingURL=portals.component.js.map