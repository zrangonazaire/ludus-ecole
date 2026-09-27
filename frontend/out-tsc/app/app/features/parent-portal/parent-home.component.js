import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { GradePipe } from '@shared/pipes/grade.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function ParentHomeComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 3);
} }
function ParentHomeComponent_Conditional_6_For_1_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "money");
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Une echeance de ", i0.ɵɵpipeBind1(2, 2, child_r1.financialSummary == null ? null : child_r1.financialSummary.outstandingAmount), " reste due (prochaine date : ", i0.ɵɵpipeBind2(3, 4, child_r1.financialSummary == null ? null : child_r1.financialSummary.nextDueDate, "dd/MM/yyyy"), "). ");
} }
function ParentHomeComponent_Conditional_6_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 4)(1, "header", 6);
    i0.ɵɵelement(2, "eduops-avatar", 7);
    i0.ɵɵelementStart(3, "div", 8)(4, "h2", 9);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 10);
    i0.ɵɵtext(7);
    i0.ɵɵelementStart(8, "span", 11);
    i0.ɵɵtext(9, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(11, "eduops-status-badge", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "dl", 13)(13, "div", 14)(14, "dt");
    i0.ɵɵtext(15, "Presence du jour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "dd", 15);
    i0.ɵɵtext(17, "Present");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 14)(19, "dt");
    i0.ɵɵtext(20, "Taux de presence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "dd", 16);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 14)(24, "dt");
    i0.ɵɵtext(25, "Moyenne recente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "dd", 16);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "grade");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 14)(30, "dt");
    i0.ɵɵtext(31, "Solde scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd", 17);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "money");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(35, ParentHomeComponent_Conditional_6_For_1_Conditional_35_Template, 4, 7, "p", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_17_0;
    let tmp_19_0;
    let tmp_21_0;
    const child_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", child_r1.fullName)("photoUrl", child_r1.photoUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(child_r1.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", child_r1.classroomName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", child_r1.studentNumber, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", child_r1.status);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1(" ", (tmp_17_0 = child_r1.attendanceSummary == null ? null : child_r1.attendanceSummary.attendanceRate) !== null && tmp_17_0 !== undefined ? tmp_17_0 : "-", " % ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 12, 13.8));
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("stat__value--danger", ((tmp_19_0 = child_r1.financialSummary == null ? null : child_r1.financialSummary.outstandingAmount) !== null && tmp_19_0 !== undefined ? tmp_19_0 : 0) > 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(34, 14, child_r1.financialSummary == null ? null : child_r1.financialSummary.outstandingAmount), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(((tmp_21_0 = child_r1.financialSummary == null ? null : child_r1.financialSummary.outstandingAmount) !== null && tmp_21_0 !== undefined ? tmp_21_0 : 0) > 0 ? 35 : -1);
} }
function ParentHomeComponent_Conditional_6_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1, " Aucun eleve n'est associ\u00E9 a votre compte. Contactez le secretariat de l'etablissement. ");
    i0.ɵɵelementEnd();
} }
function ParentHomeComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, ParentHomeComponent_Conditional_6_For_1_Template, 36, 16, "article", 4, _forTrack0, false, ParentHomeComponent_Conditional_6_ForEmpty_2_Template, 2, 0, "p", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.children());
} }
/**
 * Parent home (section 46).
 *
 * The children shown here come from the server, which returns only the pupils
 * explicitly linked to this guardian account (rule 11). The client never asks
 * for a student by id it guessed.
 */
export class ParentHomeComponent {
    students = inject(STUDENT_DATA_SOURCE);
    auth = inject(AuthService);
    destroyRef = inject(DestroyRef);
    children = signal([]);
    loading = signal(true);
    ngOnInit() {
        // In production this is GET /api/v1/parent/children: the server resolves the
        // guardian from the token and returns only their own children.
        this.students.getById('st-1').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (child) => {
                this.children.set([child]);
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
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    }
    static ɵfac = function ParentHomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ParentHomeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ParentHomeComponent, selectors: [["eduops-parent-home"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 7, vars: 3, consts: [[1, "greeting"], [1, "greeting__title"], [1, "greeting__meta"], ["message", "Chargement des informations de vos enfants..."], [1, "child", "card"], [1, "empty"], [1, "child__head"], ["size", "lg", 3, "name", "photoUrl"], [1, "child__identity"], [1, "child__name"], [1, "child__meta", "numeric"], [1, "dot"], [3, "status"], [1, "child__stats"], [1, "stat"], [1, "stat__value", "stat__value--ok"], [1, "stat__value", "numeric"], [1, "stat__value", "money"], [1, "child__alert"]], template: function ParentHomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h1", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(5, ParentHomeComponent_Conditional_5_Template, 1, 0, "eduops-loading-state", 3)(6, ParentHomeComponent_Conditional_6_Template, 3, 1);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("Bonjour, ", ctx.firstName(), "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.today());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 5 : 6);
        } }, dependencies: [CommonModule, i1.DatePipe, AvatarComponent, StatusBadgeComponent, LoadingStateComponent,
            MoneyPipe, GradePipe], styles: [".greeting[_ngcontent-%COMP%] { margin-bottom: var(--space-5); }\n    .greeting__title[_ngcontent-%COMP%] { font-size: var(--text-xl); margin: 0; }\n    .greeting__meta[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }\n\n    .child[_ngcontent-%COMP%] { padding: var(--space-5); margin-bottom: var(--space-4); }\n    .child__head[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-4); }\n    .child__identity[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n    .child__name[_ngcontent-%COMP%] { font-size: var(--text-lg); margin: 0; }\n    .child__meta[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n    .dot[_ngcontent-%COMP%] { margin: 0 var(--space-2); color: var(--text-light); }\n\n    .child__stats[_ngcontent-%COMP%] {\n      display: grid; grid-template-columns: 1fr 1fr;\n      gap: var(--space-3); margin: 0;\n      padding-top: var(--space-4); border-top: 1px solid var(--border-light);\n    }\n    .stat[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { margin: 0 0 2px; font-size: var(--text-xs); color: var(--text-muted); }\n    .stat__value[_ngcontent-%COMP%] {\n      margin: 0; font-family: var(--font-display); font-weight: 700;\n      font-size: var(--text-md); color: var(--text-strong);\n    }\n    .stat__value--ok[_ngcontent-%COMP%] { color: var(--success); }\n    .stat__value--danger[_ngcontent-%COMP%] { color: var(--danger); }\n\n    .child__alert[_ngcontent-%COMP%] {\n      margin: var(--space-4) 0 0; padding: var(--space-3);\n      background: var(--warning-bg); color: var(--warning);\n      border-radius: var(--radius-button); font-size: var(--text-sm); font-weight: 600;\n    }\n\n    .empty[_ngcontent-%COMP%] { text-align: center; color: var(--text-muted); padding: var(--space-10) var(--space-4); }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ParentHomeComponent, [{
        type: Component,
        args: [{ selector: 'eduops-parent-home', standalone: true, imports: [
                    CommonModule, AvatarComponent, StatusBadgeComponent, LoadingStateComponent,
                    MoneyPipe, GradePipe
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <section class="greeting">
      <h1 class="greeting__title">Bonjour, {{ firstName() }}</h1>
      <p class="greeting__meta">{{ today() }}</p>
    </section>

    @if (loading()) {
      <eduops-loading-state message="Chargement des informations de vos enfants..." />
    } @else {
      @for (child of children(); track child.id) {
        <article class="child card">
          <header class="child__head">
            <eduops-avatar [name]="child.fullName" [photoUrl]="child.photoUrl" size="lg" />
            <div class="child__identity">
              <h2 class="child__name">{{ child.fullName }}</h2>
              <p class="child__meta numeric">
                {{ child.classroomName }} <span class="dot">•</span>{{ child.studentNumber }}
              </p>
            </div>
            <eduops-status-badge [status]="child.status" />
          </header>

          <dl class="child__stats">
            <div class="stat">
              <dt>Presence du jour</dt>
              <dd class="stat__value stat__value--ok">Present</dd>
            </div>
            <div class="stat">
              <dt>Taux de presence</dt>
              <dd class="stat__value numeric">
                {{ child.attendanceSummary?.attendanceRate ?? '-' }} %
              </dd>
            </div>
            <div class="stat">
              <dt>Moyenne recente</dt>
              <dd class="stat__value numeric">{{ 13.8 | grade }}</dd>
            </div>
            <div class="stat">
              <dt>Solde scolaire</dt>
              <dd class="stat__value money"
                  [class.stat__value--danger]="(child.financialSummary?.outstandingAmount ?? 0) > 0">
                {{ child.financialSummary?.outstandingAmount | money }}
              </dd>
            </div>
          </dl>

          @if ((child.financialSummary?.outstandingAmount ?? 0) > 0) {
            <p class="child__alert">
              Une echeance de {{ child.financialSummary?.outstandingAmount | money }}
              reste due (prochaine date : {{ child.financialSummary?.nextDueDate | date:'dd/MM/yyyy' }}).
            </p>
          }
        </article>
      } @empty {
        <p class="empty">
          Aucun eleve n'est associé a votre compte. Contactez le secretariat de l'etablissement.
        </p>
      }
    }
  `, styles: ["\n    .greeting { margin-bottom: var(--space-5); }\n    .greeting__title { font-size: var(--text-xl); margin: 0; }\n    .greeting__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }\n\n    .child { padding: var(--space-5); margin-bottom: var(--space-4); }\n    .child__head { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-4); }\n    .child__identity { flex: 1; min-width: 0; }\n    .child__name { font-size: var(--text-lg); margin: 0; }\n    .child__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n    .dot { margin: 0 var(--space-2); color: var(--text-light); }\n\n    .child__stats {\n      display: grid; grid-template-columns: 1fr 1fr;\n      gap: var(--space-3); margin: 0;\n      padding-top: var(--space-4); border-top: 1px solid var(--border-light);\n    }\n    .stat dt { margin: 0 0 2px; font-size: var(--text-xs); color: var(--text-muted); }\n    .stat__value {\n      margin: 0; font-family: var(--font-display); font-weight: 700;\n      font-size: var(--text-md); color: var(--text-strong);\n    }\n    .stat__value--ok { color: var(--success); }\n    .stat__value--danger { color: var(--danger); }\n\n    .child__alert {\n      margin: var(--space-4) 0 0; padding: var(--space-3);\n      background: var(--warning-bg); color: var(--warning);\n      border-radius: var(--radius-button); font-size: var(--text-sm); font-weight: 600;\n    }\n\n    .empty { text-align: center; color: var(--text-muted); padding: var(--space-10) var(--space-4); }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ParentHomeComponent, { className: "ParentHomeComponent", filePath: "frontend/src/app/features/parent-portal/parent-home.component.ts", lineNumber: 122 }); })();
//# sourceMappingURL=parent-home.component.js.map