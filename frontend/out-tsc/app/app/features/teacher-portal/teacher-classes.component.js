import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function TeacherClassesComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state");
} }
function TeacherClassesComponent_Conditional_3_Conditional_0_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 5);
    i0.ɵɵelement(1, "eduops-avatar", 7);
    i0.ɵɵelementStart(2, "div")(3, "p", 8);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 9);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const student_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", student_r3.fullName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r3.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r3.studentNumber);
} }
function TeacherClassesComponent_Conditional_3_Conditional_0_ForEmpty_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 6);
    i0.ɵɵtext(1, "Aucun eleve inscrit dans cette classe.");
    i0.ɵɵelementEnd();
} }
function TeacherClassesComponent_Conditional_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function TeacherClassesComponent_Conditional_3_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selected.set(null)); });
    i0.ɵɵtext(1, " \u2039 Toutes mes classes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "h2", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ul", 4);
    i0.ɵɵrepeaterCreate(5, TeacherClassesComponent_Conditional_3_Conditional_0_For_6_Template, 7, 3, "li", 5, _forTrack0, false, TeacherClassesComponent_Conditional_3_Conditional_0_ForEmpty_7_Template, 2, 0, "li", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx.name);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.students());
} }
function TeacherClassesComponent_Conditional_3_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 10);
    i0.ɵɵlistener("click", function TeacherClassesComponent_Conditional_3_Conditional_1_For_2_Template_button_click_1_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.open(item_r5)); });
    i0.ɵɵelementStart(2, "span", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r5.activeEnrollments, " eleves");
} }
function TeacherClassesComponent_Conditional_3_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 1);
    i0.ɵɵrepeaterCreate(1, TeacherClassesComponent_Conditional_3_Conditional_1_For_2_Template, 6, 2, "li", null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.classes());
} }
function TeacherClassesComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TeacherClassesComponent_Conditional_3_Conditional_0_Template, 8, 2)(1, TeacherClassesComponent_Conditional_3_Conditional_1_Template, 3, 0, "ul", 1);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.selected()) ? 0 : 1, tmp_1_0);
} }
export class TeacherClassesComponent {
    teachers = inject(TEACHER_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    classes = signal([]);
    students = signal([]);
    selected = signal(null);
    loading = signal(true);
    ngOnInit() {
        this.teachers.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (classes) => {
                this.classes.set(classes);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    open(classroom) {
        this.selected.set(classroom);
        this.loading.set(true);
        this.classrooms.getStudents(classroom.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (students) => {
                this.students.set(students);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    static ɵfac = function TeacherClassesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherClassesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherClassesComponent, selectors: [["eduops-teacher-classes"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 4, vars: 1, consts: [[1, "title"], [1, "classes"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "subtitle"], [1, "students"], [1, "student"], [1, "empty"], ["size", "sm", 3, "name"], [1, "student__name"], [1, "student__meta", "numeric"], ["type", "button", 1, "class-row", "card", 3, "click"], [1, "class-row__name"], [1, "class-row__meta", "numeric"]], template: function TeacherClassesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h1", 0);
            i0.ɵɵtext(1, "Mes classes");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, TeacherClassesComponent_Conditional_2_Template, 1, 0, "eduops-loading-state")(3, TeacherClassesComponent_Conditional_3_Template, 2, 1);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 2 : 3);
        } }, dependencies: [CommonModule, AvatarComponent, LoadingStateComponent], styles: [".title[_ngcontent-%COMP%] { font-size: var(--text-xl); margin-bottom: var(--space-4); }\n    .subtitle[_ngcontent-%COMP%] { font-size: var(--text-lg); margin: var(--space-3) 0; }\n    .classes[_ngcontent-%COMP%], .students[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2); }\n    .class-row[_ngcontent-%COMP%] {\n      width: 100%; display: flex; align-items: center; justify-content: space-between;\n      gap: var(--space-3); padding: var(--space-4); background: var(--surface-card);\n      border: 1px solid var(--border); cursor: pointer; font: inherit; text-align: left;\n    }\n    .class-row__name[_ngcontent-%COMP%] { font-weight: 600; color: var(--text-strong); }\n    .class-row__meta[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--text-muted); }\n    .student[_ngcontent-%COMP%] {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      background: var(--surface-card); border: 1px solid var(--border);\n      border-radius: var(--radius-button);\n    }\n    .student__name[_ngcontent-%COMP%] { margin: 0; font-weight: 600; color: var(--text-strong); }\n    .student__meta[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n    .empty[_ngcontent-%COMP%] { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherClassesComponent, [{
        type: Component,
        args: [{ selector: 'eduops-teacher-classes', standalone: true, imports: [CommonModule, AvatarComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h1 class="title">Mes classes</h1>

    @if (loading()) {
      <eduops-loading-state />
    } @else {
      @if (selected(); as classroom) {
      <button type="button" class="btn btn--ghost btn--sm" (click)="selected.set(null)">
        ‹ Toutes mes classes
      </button>
      <h2 class="subtitle">{{ classroom.name }}</h2>
      <ul class="students">
        @for (student of students(); track student.id) {
          <li class="student">
            <eduops-avatar [name]="student.fullName" size="sm" />
            <div>
              <p class="student__name">{{ student.fullName }}</p>
              <p class="student__meta numeric">{{ student.studentNumber }}</p>
            </div>
          </li>
        } @empty {
          <li class="empty">Aucun eleve inscrit dans cette classe.</li>
        }
      </ul>
    } @else {
      <ul class="classes">
        @for (item of classes(); track item.id) {
          <li>
            <button type="button" class="class-row card" (click)="open(item)">
              <span class="class-row__name">{{ item.name }}</span>
              <span class="class-row__meta numeric">{{ item.activeEnrollments }} eleves</span>
            </button>
          </li>
        }
      </ul>
      }
    }
  `, styles: ["\n    .title { font-size: var(--text-xl); margin-bottom: var(--space-4); }\n    .subtitle { font-size: var(--text-lg); margin: var(--space-3) 0; }\n    .classes, .students { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2); }\n    .class-row {\n      width: 100%; display: flex; align-items: center; justify-content: space-between;\n      gap: var(--space-3); padding: var(--space-4); background: var(--surface-card);\n      border: 1px solid var(--border); cursor: pointer; font: inherit; text-align: left;\n    }\n    .class-row__name { font-weight: 600; color: var(--text-strong); }\n    .class-row__meta { font-size: var(--text-sm); color: var(--text-muted); }\n    .student {\n      display: flex; align-items: center; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      background: var(--surface-card); border: 1px solid var(--border);\n      border-radius: var(--radius-button);\n    }\n    .student__name { margin: 0; font-weight: 600; color: var(--text-strong); }\n    .student__meta { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n    .empty { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherClassesComponent, { className: "TeacherClassesComponent", filePath: "frontend/src/app/features/teacher-portal/teacher-classes.component.ts", lineNumber: 74 }); })();
//# sourceMappingURL=teacher-classes.component.js.map