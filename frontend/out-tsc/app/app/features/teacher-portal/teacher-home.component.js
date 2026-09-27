import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function TeacherHomeComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function TeacherHomeComponent_Conditional_19_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 10)(1, "div", 12)(2, "p", 13);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 14);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "eduops-status-badge", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", classroom_r1.activeEnrollments, " eleves \u2014 ", classroom_r1.levelName, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", classroom_r1.capacityStatus);
} }
function TeacherHomeComponent_Conditional_19_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 11);
    i0.ɵɵtext(1, "Aucune classe ne vous est affectee pour cette annee.");
    i0.ɵɵelementEnd();
} }
function TeacherHomeComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 9);
    i0.ɵɵrepeaterCreate(1, TeacherHomeComponent_Conditional_19_For_2_Template, 7, 4, "li", 10, _forTrack0, false, TeacherHomeComponent_Conditional_19_ForEmpty_3_Template, 2, 0, "li", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.classes());
} }
/**
 * Teacher home.
 *
 * The list of classes is decided by the server from the authenticated account
 * (section 66): a teacher sees only the classes they are assigned to (rule 10).
 */
export class TeacherHomeComponent {
    dataSource = inject(TEACHER_DATA_SOURCE);
    auth = inject(AuthService);
    destroyRef = inject(DestroyRef);
    classes = signal([]);
    loading = signal(true);
    ngOnInit() {
        this.dataSource.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (classes) => {
                this.classes.set(classes);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    firstName() {
        return this.auth.currentUser()?.fullName.split(' ')[0] ?? '';
    }
    today() {
        return new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long'
        });
    }
    static ɵfac = function TeacherHomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherHomeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherHomeComponent, selectors: [["eduops-teacher-home"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 20, vars: 3, consts: [[1, "greeting"], [1, "greeting__title"], [1, "greeting__meta"], [1, "quick"], ["routerLink", "/teacher/attendance", 1, "quick__action"], ["aria-hidden", "true", 1, "quick__icon"], ["routerLink", "/teacher/grades", 1, "quick__action"], [1, "section-title"], ["message", "Chargement de vos classes..."], [1, "classes"], [1, "class", "card"], [1, "empty"], [1, "class__body"], [1, "class__name"], [1, "class__meta", "numeric"], [3, "status"]], template: function TeacherHomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h1", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "section", 3)(6, "a", 4)(7, "span", 5);
            i0.ɵɵtext(8, "\u25C7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "span");
            i0.ɵɵtext(10, "Faire l'appel");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "a", 6)(12, "span", 5);
            i0.ɵɵtext(13, "\u25C9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span");
            i0.ɵɵtext(15, "Saisir des notes");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "h2", 7);
            i0.ɵɵtext(17, "Mes classes");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, TeacherHomeComponent_Conditional_18_Template, 1, 0, "eduops-loading-state", 8)(19, TeacherHomeComponent_Conditional_19_Template, 4, 1, "ul", 9);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("Bonjour, ", ctx.firstName(), "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.today());
            i0.ɵɵadvance(14);
            i0.ɵɵconditional(ctx.loading() ? 18 : 19);
        } }, dependencies: [CommonModule, RouterLink, StatusBadgeComponent, LoadingStateComponent], styles: [".greeting[_ngcontent-%COMP%] { margin-bottom: var(--space-5); }\n    .greeting__title[_ngcontent-%COMP%] { font-size: var(--text-xl); margin: 0; }\n    .greeting__meta[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }\n\n    .quick[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6); }\n    .quick__action[_ngcontent-%COMP%] {\n      display: flex; flex-direction: column; align-items: center; justify-content: center;\n      gap: var(--space-2); padding: var(--space-5) var(--space-3);\n      background: var(--surface-card); border: 1px solid var(--border);\n      border-radius: var(--radius-card); text-decoration: none;\n      font-weight: 600; color: var(--text-strong); font-size: var(--text-sm);\n      min-height: 88px;\n    }\n    .quick__action[_ngcontent-%COMP%]:hover { text-decoration: none; border-color: var(--brand); }\n    .quick__icon[_ngcontent-%COMP%] { font-size: 24px; color: var(--brand); }\n\n    .section-title[_ngcontent-%COMP%] { font-size: var(--text-md); margin-bottom: var(--space-3); }\n\n    .classes[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }\n    .class[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); }\n    .class__body[_ngcontent-%COMP%] { flex: 1; }\n    .class__name[_ngcontent-%COMP%] { margin: 0; font-weight: 600; color: var(--text-strong); }\n    .class__meta[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n    .empty[_ngcontent-%COMP%] { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherHomeComponent, [{
        type: Component,
        args: [{ selector: 'eduops-teacher-home', standalone: true, imports: [CommonModule, RouterLink, StatusBadgeComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <section class="greeting">
      <h1 class="greeting__title">Bonjour, {{ firstName() }}</h1>
      <p class="greeting__meta">{{ today() }}</p>
    </section>

    <section class="quick">
      <a class="quick__action" routerLink="/teacher/attendance">
        <span class="quick__icon" aria-hidden="true">◇</span>
        <span>Faire l'appel</span>
      </a>
      <a class="quick__action" routerLink="/teacher/grades">
        <span class="quick__icon" aria-hidden="true">◉</span>
        <span>Saisir des notes</span>
      </a>
    </section>

    <h2 class="section-title">Mes classes</h2>

    @if (loading()) {
      <eduops-loading-state message="Chargement de vos classes..." />
    } @else {
      <ul class="classes">
        @for (classroom of classes(); track classroom.id) {
          <li class="class card">
            <div class="class__body">
              <p class="class__name">{{ classroom.name }}</p>
              <p class="class__meta numeric">
                {{ classroom.activeEnrollments }} eleves — {{ classroom.levelName }}
              </p>
            </div>
            <eduops-status-badge [status]="classroom.capacityStatus" />
          </li>
        } @empty {
          <li class="empty">Aucune classe ne vous est affectee pour cette annee.</li>
        }
      </ul>
    }
  `, styles: ["\n    .greeting { margin-bottom: var(--space-5); }\n    .greeting__title { font-size: var(--text-xl); margin: 0; }\n    .greeting__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }\n\n    .quick { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6); }\n    .quick__action {\n      display: flex; flex-direction: column; align-items: center; justify-content: center;\n      gap: var(--space-2); padding: var(--space-5) var(--space-3);\n      background: var(--surface-card); border: 1px solid var(--border);\n      border-radius: var(--radius-card); text-decoration: none;\n      font-weight: 600; color: var(--text-strong); font-size: var(--text-sm);\n      min-height: 88px;\n    }\n    .quick__action:hover { text-decoration: none; border-color: var(--brand); }\n    .quick__icon { font-size: 24px; color: var(--brand); }\n\n    .section-title { font-size: var(--text-md); margin-bottom: var(--space-3); }\n\n    .classes { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }\n    .class { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); }\n    .class__body { flex: 1; }\n    .class__name { margin: 0; font-weight: 600; color: var(--text-strong); }\n    .class__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n    .empty { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherHomeComponent, { className: "TeacherHomeComponent", filePath: "frontend/src/app/features/teacher-portal/teacher-home.component.ts", lineNumber: 88 }); })();
//# sourceMappingURL=teacher-home.component.js.map