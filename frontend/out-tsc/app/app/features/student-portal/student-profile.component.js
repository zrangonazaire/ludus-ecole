import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
function StudentProfileComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function StudentProfileComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentProfileComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentProfileComponent_Conditional_2_Conditional_0_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 ", p_r3.levelName, "");
} }
function StudentProfileComponent_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "header", 4);
    i0.ɵɵelement(2, "eduops-avatar", 5);
    i0.ɵɵelementStart(3, "div", 6)(4, "p", 7);
    i0.ɵɵtext(5, "Mon profil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h1", 8);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 9);
    i0.ɵɵtext(9);
    i0.ɵɵtemplate(10, StudentProfileComponent_Conditional_2_Conditional_0_Conditional_10_Template, 2, 1, "span");
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "\u00B7 ");
    i0.ɵɵelementStart(13, "strong", 10);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(15, "section", 11)(16, "h2", 12);
    i0.ɵɵtext(17, "Informations personnelles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dl", 13)(19, "div", 14)(20, "dt");
    i0.ɵɵtext(21, "Sexe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "dd");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 14)(25, "dt");
    i0.ɵɵtext(26, "Date de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 14)(30, "dt");
    i0.ɵɵtext(31, "Nationalit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(34, "section", 15)(35, "h2", 12);
    i0.ɵɵtext(36, "Coordonn\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "dl", 13)(38, "div", 14)(39, "dt");
    i0.ɵɵtext(40, "Courriel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "dd");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 14)(44, "dt");
    i0.ɵɵtext(45, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "dd", 10);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 14)(49, "dt");
    i0.ɵɵtext(50, "Adresse");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "dd");
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const p_r3 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", p_r3.fullName)("photoUrl", p_r3.photoUrl);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(p_r3.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", p_r3.classroomName || "Sans classe", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(p_r3.levelName ? 10 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.studentNumber);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.genderLabel(p_r3.gender));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.birthDate(p_r3.birthDate));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(p_r3.nationality || "\u2014");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(p_r3.email || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(p_r3.phone || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", p_r3.addressLine1 || "\u2014", "", p_r3.city ? " \u00B7 " + p_r3.city : "", "");
} }
function StudentProfileComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentProfileComponent_Conditional_2_Conditional_0_Template, 53, 13, "div", 3);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.profile()) ? 0 : -1, tmp_1_0);
} }
/** La fiche lisible de l'élève (lecture seule, résolue du compte connecté). */
export class StudentProfileComponent {
    dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    profile = signal(null);
    loading = signal(true);
    loadFailed = signal(false);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.dataSource.profile().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (profile) => { this.profile.set(profile); this.loading.set(false); },
            error: () => { this.profile.set(null); this.loadFailed.set(true); this.loading.set(false); }
        });
    }
    genderLabel(value) {
        switch (value) {
            case 'MALE': return 'Masculin';
            case 'FEMALE': return 'Féminin';
            default: return 'Non renseigné';
        }
    }
    birthDate(iso) {
        if (!iso)
            return '—';
        return new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    static ɵfac = function StudentProfileComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentProfileComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentProfileComponent, selectors: [["eduops-student-profile"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [["message", "Chargement de ton profil..."], ["title", "Profil indisponible", "message", "Impossible de r\u00E9cup\u00E9rer ton profil pour le moment."], ["title", "Profil indisponible", "message", "Impossible de r\u00E9cup\u00E9rer ton profil pour le moment.", 3, "retry"], [1, "profile-page"], [1, "profile-header"], ["size", "xl", 3, "name", "photoUrl"], [1, "profile-header__body"], [1, "profile-header__eyebrow"], ["id", "profile-title"], [1, "profile-header__meta"], [1, "numeric"], [1, "about"], [1, "about__title"], [1, "about__grid"], [1, "about__item"], [1, "contact"]], template: function StudentProfileComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StudentProfileComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, StudentProfileComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, StudentProfileComponent_Conditional_2_Template, 1, 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.loadFailed() ? 1 : 2);
        } }, dependencies: [CommonModule, AvatarComponent, ErrorStateComponent, LoadingStateComponent], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] { display: block; }\n\n.profile-page[_ngcontent-%COMP%] { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-5);\n  background: linear-gradient(125deg, var(--brand), var(--chart-4));\n  border-radius: var(--radius-card);\n  color: var(--text-on-brand);\n  box-shadow: var(--shadow-md);\n  margin-bottom: var(--space-4);\n}\n.profile-header__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.profile-header__eyebrow[_ngcontent-%COMP%] { margin: 0 0 var(--space-1); font-size: var(--text-xs); opacity: .82; }\n.profile-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); font-weight: 700; }\n.profile-header__meta[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: inherit; font-size: var(--text-xs); }\n.profile-header__meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-family: var(--font-display); }\n\nsection.about[_ngcontent-%COMP%], section.contact[_ngcontent-%COMP%] { margin-bottom: var(--space-4); }\n.about__title[_ngcontent-%COMP%] { margin: 0 0 var(--space-2); font-size: var(--text-sm); font-weight: 700; }\n\n.about__grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-2); }\n.about__item[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.about__item[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.about__item[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-sm); }\n\n@include mobile {\n  .profile-header { align-items: flex-start; flex-direction: column; }\n  .about__grid { grid-template-columns: 1fr; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentProfileComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-profile', standalone: true, imports: [CommonModule, AvatarComponent, ErrorStateComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement de ton profil...\" />\n} @else if (loadFailed()) {\n  <eduops-error-state\n    title=\"Profil indisponible\"\n    message=\"Impossible de r\u00E9cup\u00E9rer ton profil pour le moment.\"\n    (retry)=\"load()\" />\n} @else {\n  @if (profile(); as p) {\n    <div class=\"profile-page\">\n      <header class=\"profile-header\">\n        <eduops-avatar [name]=\"p.fullName\" [photoUrl]=\"p.photoUrl\" size=\"xl\" />\n        <div class=\"profile-header__body\">\n          <p class=\"profile-header__eyebrow\">Mon profil</p>\n          <h1 id=\"profile-title\">{{ p.fullName }}</h1>\n          <p class=\"profile-header__meta\">\n            {{ p.classroomName || 'Sans classe' }}\n            @if (p.levelName) { <span>\u00B7 {{ p.levelName }}</span> }\n            <span>\u00B7 <strong class=\"numeric\">{{ p.studentNumber }}</strong></span>\n          </p>\n        </div>\n      </header>\n\n      <section class=\"about\">\n        <h2 class=\"about__title\">Informations personnelles</h2>\n        <dl class=\"about__grid\">\n          <div class=\"about__item\">\n            <dt>Sexe</dt>\n            <dd>{{ genderLabel(p.gender) }}</dd>\n          </div>\n          <div class=\"about__item\">\n            <dt>Date de naissance</dt>\n            <dd>{{ birthDate(p.birthDate) }}</dd>\n          </div>\n          <div class=\"about__item\">\n            <dt>Nationalit\u00E9</dt>\n            <dd>{{ p.nationality || '\u2014' }}</dd>\n          </div>\n        </dl>\n      </section>\n\n      <section class=\"contact\">\n        <h2 class=\"about__title\">Coordonn\u00E9es</h2>\n        <dl class=\"about__grid\">\n          <div class=\"about__item\">\n            <dt>Courriel</dt>\n            <dd>{{ p.email || '\u2014' }}</dd>\n          </div>\n          <div class=\"about__item\">\n            <dt>T\u00E9l\u00E9phone</dt>\n            <dd class=\"numeric\">{{ p.phone || '\u2014' }}</dd>\n          </div>\n          <div class=\"about__item\">\n            <dt>Adresse</dt>\n            <dd>{{ p.addressLine1 || '\u2014' }}{{ p.city ? ' \u00B7 ' + p.city : '' }}</dd>\n          </div>\n        </dl>\n      </section>\n    </div>\n  }\n}", styles: ["@import 'styles/tokens';\n\n:host { display: block; }\n\n.profile-page { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.profile-header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-5);\n  background: linear-gradient(125deg, var(--brand), var(--chart-4));\n  border-radius: var(--radius-card);\n  color: var(--text-on-brand);\n  box-shadow: var(--shadow-md);\n  margin-bottom: var(--space-4);\n}\n.profile-header__body { flex: 1; min-width: 0; }\n.profile-header__eyebrow { margin: 0 0 var(--space-1); font-size: var(--text-xs); opacity: .82; }\n.profile-header h1 { font-family: var(--font-display); font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); font-weight: 700; }\n.profile-header__meta { margin: var(--space-1) 0 0; color: inherit; font-size: var(--text-xs); }\n.profile-header__meta strong { font-family: var(--font-display); }\n\nsection.about, section.contact { margin-bottom: var(--space-4); }\n.about__title { margin: 0 0 var(--space-2); font-size: var(--text-sm); font-weight: 700; }\n\n.about__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-2); }\n.about__item {\n  padding: var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.about__item dt { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.about__item dd { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-sm); }\n\n@include mobile {\n  .profile-header { align-items: flex-start; flex-direction: column; }\n  .about__grid { grid-template-columns: 1fr; }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentProfileComponent, { className: "StudentProfileComponent", filePath: "frontend/src/app/features/student-portal/student-profile.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=student-profile.component.js.map