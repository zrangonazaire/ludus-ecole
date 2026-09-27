import { Component, inject, signal, computed, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
function SchoolLogoComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 1);
    i0.ɵɵtext(1, "Chargement du logo\u2026");
    i0.ɵɵelementEnd();
} }
function SchoolLogoComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1, "Impossible de charger le logo.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 4);
    i0.ɵɵlistener("click", function SchoolLogoComponent_Conditional_6_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd();
} }
function SchoolLogoComponent_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r1.preview(), i0.ɵɵsanitizeUrl);
} }
function SchoolLogoComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucun logo enregistr\u00E9.");
    i0.ɵɵelementEnd();
} }
function SchoolLogoComponent_Conditional_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label");
    i0.ɵɵtext(1, "Choisir ou remplacer le logo");
    i0.ɵɵelementStart(2, "input", 6);
    i0.ɵɵlistener("change", function SchoolLogoComponent_Conditional_7_Conditional_2_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.choose($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "PNG, JPEG ou WebP \u00B7 500 Ko maximum.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "button", 7);
    i0.ɵɵlistener("click", function SchoolLogoComponent_Conditional_7_Conditional_2_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.preview.set(""); return i0.ɵɵresetView(ctx_r1.changed.set(true)); });
    i0.ɵɵtext(7, "Supprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵlistener("click", function SchoolLogoComponent_Conditional_7_Conditional_2_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ctx_r1.reading());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r1.preview() || ctx_r1.saving() || ctx_r1.reading());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.changed() || ctx_r1.saving() || ctx_r1.reading());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : "Enregistrer le logo");
} }
function SchoolLogoComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SchoolLogoComponent_Conditional_7_Conditional_0_Template, 1, 1, "img", 5)(1, SchoolLogoComponent_Conditional_7_Conditional_1_Template, 2, 0, "p")(2, SchoolLogoComponent_Conditional_7_Conditional_2_Template, 10, 4);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.preview() ? 0 : 1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canManage() ? 2 : -1);
} }
export class SchoolLogoComponent {
    http = inject(HttpClient);
    auth = inject(AuthService);
    destroy = inject(DestroyRef);
    url = `${environment.apiBaseUrl}/school/logo`;
    preview = signal('');
    changed = signal(false);
    loading = signal(true);
    loadFailed = signal(false);
    saving = signal(false);
    reading = signal(false);
    message = signal('');
    canManage = computed(() => this.auth.has('SCHOOL_MANAGE'));
    constructor() { this.load(); }
    load() {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.http.get(this.url).pipe(takeUntilDestroyed(this.destroy)).subscribe({
            next: result => { this.preview.set(result.dataUrl ?? ''); this.loading.set(false); this.changed.set(false); },
            error: () => { this.loading.set(false); this.loadFailed.set(true); }
        });
    }
    choose(event) {
        const input = event.target;
        const file = input.files?.[0];
        input.value = '';
        if (!file || !this.canManage())
            return;
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 500 * 1024) {
            this.message.set('Choisissez une image PNG, JPEG ou WebP de 500 Ko maximum.');
            return;
        }
        this.reading.set(true);
        this.message.set('');
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
    save() {
        if (!this.canManage() || this.saving() || this.reading() || !this.changed())
            return;
        this.saving.set(true);
        this.message.set('');
        this.http.put(this.url, { dataUrl: this.preview() || null }).pipe(takeUntilDestroyed(this.destroy)).subscribe({
            next: () => { this.saving.set(false); this.changed.set(false); this.message.set('Logo enregistré.'); },
            error: () => { this.saving.set(false); this.message.set('Le logo n’a pas pu être enregistré. Réessayez.'); }
        });
    }
    static ɵfac = function SchoolLogoComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SchoolLogoComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SchoolLogoComponent, selectors: [["eduops-school-logo"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 10, vars: 2, consts: [[1, "logo-editor"], ["role", "status"], ["role", "status", "aria-live", "polite"], ["role", "alert"], ["type", "button", 3, "click"], ["alt", "Logo de l\u2019\u00E9tablissement", "width", "180", "height", "120", 3, "src"], ["type", "file", "accept", "image/png,image/jpeg,image/webp", 3, "change", "disabled"], ["type", "button", 3, "click", "disabled"]], template: function SchoolLogoComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h2");
            i0.ɵɵtext(2, "Logo de l\u2019\u00E9tablissement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p");
            i0.ɵɵtext(4, "Ce logo est partag\u00E9 avec les documents officiels. Les documents d\u00E9j\u00E0 \u00E9mis conservent leur pr\u00E9sentation.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, SchoolLogoComponent_Conditional_5_Template, 2, 0, "p", 1)(6, SchoolLogoComponent_Conditional_6_Template, 4, 0)(7, SchoolLogoComponent_Conditional_7_Template, 3, 2);
            i0.ɵɵelementStart(8, "p", 2);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.loading() ? 5 : ctx.loadFailed() ? 6 : 7);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.message());
        } }, styles: [".logo-editor[_ngcontent-%COMP%]{padding:24px;border:1px solid var(--border,#dce3ed);border-radius:12px;margin-bottom:24px;background:var(--surface,#fff)}h2[_ngcontent-%COMP%]{font-size:20px}img[_ngcontent-%COMP%]{object-fit:contain;display:block;background:#fff;border:1px solid #ddd;margin:16px 0}label[_ngcontent-%COMP%]{display:grid;gap:10px}button[_ngcontent-%COMP%]{padding:10px 14px;border:1px solid #b7c6d9;border-radius:8px;background:#fff;cursor:pointer;margin-right:10px}button[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:default}p[_ngcontent-%COMP%]{color:var(--text-secondary,#52637a)}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SchoolLogoComponent, [{
        type: Component,
        args: [{ selector: 'eduops-school-logo', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="logo-editor"><h2>Logo de l’établissement</h2>
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
    <p role="status" aria-live="polite">{{ message() }}</p></section>`, styles: [".logo-editor{padding:24px;border:1px solid var(--border,#dce3ed);border-radius:12px;margin-bottom:24px;background:var(--surface,#fff)}h2{font-size:20px}img{object-fit:contain;display:block;background:#fff;border:1px solid #ddd;margin:16px 0}label{display:grid;gap:10px}button{padding:10px 14px;border:1px solid #b7c6d9;border-radius:8px;background:#fff;cursor:pointer;margin-right:10px}button:disabled{opacity:.5;cursor:default}p{color:var(--text-secondary,#52637a)}"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SchoolLogoComponent, { className: "SchoolLogoComponent", filePath: "frontend/src/app/features/administration/school-logo.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=school-logo.component.js.map