import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.date;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.label;
const _c0 = a0 => ({ date: a0 });
function StudentTimetableComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function StudentTimetableComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentTimetableComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_For_16_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, "Aujourd'hui");
    i0.ɵɵelementEnd();
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_For_16_For_7_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 ", course_r4.roomName, "");
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_For_16_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20)(1, "div", 22)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "span", 23);
    i0.ɵɵelementStart(7, "div", 24)(8, "h3");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵtemplate(12, StudentTimetableComponent_Conditional_2_Conditional_0_For_16_For_7_Conditional_12_Template, 2, 1, "span");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const course_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.courseTime(course_r4, "start"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.courseTime(course_r4, "end"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(course_r4.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", course_r4.teacherName || "Enseignant \u00E0 confirmer", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r4.roomName ? 12 : -1);
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_For_16_ForEmpty_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1, "Pas de cours ce jour.");
    i0.ɵɵelementEnd();
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 15)(1, "header", 16)(2, "h2", 17);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, StudentTimetableComponent_Conditional_2_Conditional_0_For_16_Conditional_4_Template, 2, 0, "span", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 19);
    i0.ɵɵrepeaterCreate(6, StudentTimetableComponent_Conditional_2_Conditional_0_For_16_For_7_Template, 13, 5, "article", 20, _forTrack1, false, StudentTimetableComponent_Conditional_2_Conditional_0_For_16_ForEmpty_8_Template, 2, 0, "p", 21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const day_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("day--today", ctx_r1.isToday(day_r5));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.dayTitle(day_r5));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isToday(day_r5) ? 4 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(day_r5.courses);
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_ForEmpty_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-empty-state", 14);
} }
function StudentTimetableComponent_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "header", 5)(2, "div")(3, "p", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 7);
    i0.ɵɵtext(6, "Mon emploi du temps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 8);
    i0.ɵɵtext(8, "Ta semaine de cours, jour par jour.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 9)(10, "button", 10);
    i0.ɵɵlistener("click", function StudentTimetableComponent_Conditional_2_Conditional_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.print()); });
    i0.ɵɵelementStart(11, "span", 11);
    i0.ɵɵtext(12, "\u25A8");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, " Imprimer ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 12);
    i0.ɵɵrepeaterCreate(15, StudentTimetableComponent_Conditional_2_Conditional_0_For_16_Template, 9, 5, "section", 13, _forTrack0, false, StudentTimetableComponent_Conditional_2_Conditional_0_ForEmpty_17_Template, 1, 0, "eduops-empty-state", 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const emp_r6 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(emp_r6.termLabel);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(emp_r6.days);
} }
function StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.dayTitle(i0.ɵɵpureFunction1(1, _c0, day_r7.date)), " ");
} }
function StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_22_For_1_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Salle ", course_r8.roomName, "");
} }
function StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_22_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 38)(1, "td", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 40)(4, "div", 41)(5, "span", 42);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 43);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_22_For_1_Conditional_9_Template, 2, 1, "span", 44);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const course_r8 = ctx.$implicit;
    const day_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.courseTime(course_r8, "start"), " \u2013 ", ctx_r1.courseTime(course_r8, "end"), " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("timetable-sheet__cell--highlight", ctx_r1.isToday(i0.ɵɵpureFunction1(8, _c0, day_r9.date)));
    i0.ɵɵattribute("colspan", day_r9.courses.length);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(course_r8.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(course_r8.teacherName || "Enseignant \u00E0 confirmer");
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r8.roomName ? 9 : -1);
} }
function StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_22_For_1_Template, 10, 10, "tr", 38, _forTrack1);
} if (rf & 2) {
    const day_r9 = ctx.$implicit;
    i0.ɵɵrepeater(day_r9.courses);
} }
function StudentTimetableComponent_Conditional_2_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "header", 26)(2, "div")(3, "p", 27);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 28);
    i0.ɵɵtext(6, "Mon emploi du temps");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 29);
    i0.ɵɵtext(8);
    i0.ɵɵelement(9, "br");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "table", 30)(12, "caption", 31);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "thead")(15, "tr", 32)(16, "th", 33);
    i0.ɵɵtext(17, "Heure");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_19_Template, 2, 3, "th", 34, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "tbody");
    i0.ɵɵrepeaterCreate(21, StudentTimetableComponent_Conditional_2_Conditional_1_For_2_For_22_Template, 2, 0, null, null, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "footer", 35)(24, "span", 36)(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(27, " de cours cette semaine ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 37);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const page_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(page_r10.schoolName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", page_r10.termLabel, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", page_r10.label, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Semaine du ", page_r10.label, ", soit ", page_r10.totalHours, " h de cours par semaine. ");
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(page_r10.days);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(page_r10.days);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", page_r10.totalHours, " h");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("G\u00E9n\u00E9r\u00E9 le ", ctx_r1.generatedDate(), "");
} }
function StudentTimetableComponent_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4);
    i0.ɵɵrepeaterCreate(1, StudentTimetableComponent_Conditional_2_Conditional_1_For_2_Template, 30, 7, "div", 25, _forTrack2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx);
} }
function StudentTimetableComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentTimetableComponent_Conditional_2_Conditional_0_Template, 18, 2, "div", 3)(1, StudentTimetableComponent_Conditional_2_Conditional_1_Template, 3, 0, "section", 4);
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.data()) ? 0 : -1, tmp_1_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.printPages()) ? 1 : -1, tmp_2_0);
} }
export class StudentTimetableComponent {
    dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    data = signal(null);
    loading = signal(true);
    loadFailed = signal(false);
    schoolName = signal(environment.schoolName ?? 'Établissement');
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.dataSource.timetable().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => { this.data.set(data); this.loading.set(false); },
            error: () => { this.data.set(null); this.loadFailed.set(true); this.loading.set(false); }
        });
    }
    isToday(day) {
        return new Date(day.date).toDateString() === new Date().toDateString();
    }
    dayTitle(day) {
        const date = new Date(day.date);
        if (date.toDateString() === new Date().toDateString()) {
            return "Aujourd'hui";
        }
        return capitalize(date.toLocaleDateString('fr-FR', { weekday: 'long' }));
    }
    courseTime(course, edge) {
        const date = new Date(edge === 'start' ? course.startsAt : course.endsAt);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    print() {
        setTimeout(() => window.print(), 50);
    }
    printPages = computed(() => {
        const emp = this.data();
        if (!emp)
            return [];
        const days = emp.days || [];
        const allCourses = days.flatMap(d => d.courses || []);
        const totalMinutes = allCourses.reduce((acc, c) => acc + this.durationOf(c), 0);
        return [{
                schoolName: this.schoolName(),
                termLabel: emp.termLabel,
                label: 'Semaine du ' + this.dateRangeLabel(days),
                days,
                totalMinutes,
                totalHours: Math.round(totalMinutes / 60 * 10) / 10
            }];
    });
    generatedDate = computed(() => {
        return new Date().toLocaleString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    });
    durationOf(course) {
        const start = new Date(course.startsAt).getTime();
        const end = new Date(course.endsAt).getTime();
        return Math.round((end - start) / 60000);
    }
    dateRangeLabel(days) {
        if (days.length === 0)
            return '';
        const first = new Date(days[0].date + 'T00:00:00');
        const last = new Date(days[days.length - 1].date + 'T00:00:00');
        const fmt = (d) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
        return fmt(first) + (first.toDateString() === last.toDateString() ? '' : ' au ' + fmt(last));
    }
    static ɵfac = function StudentTimetableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentTimetableComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentTimetableComponent, selectors: [["eduops-student-timetable"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [["message", "Chargement de ton emploi du temps..."], ["title", "Emploi du temps indisponible", "message", "Impossible de r\u00E9cup\u00E9rer ton emploi du temps pour le moment."], ["title", "Emploi du temps indisponible", "message", "Impossible de r\u00E9cup\u00E9rer ton emploi du temps pour le moment.", 3, "retry"], [1, "timetable-page"], ["aria-hidden", "true", 1, "print-only"], [1, "page-header"], [1, "page-header__eyebrow"], ["id", "timetable-title"], [1, "page-header__message"], [1, "page-header__actions", "screen-only"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["aria-hidden", "true"], [1, "week"], [1, "day", 3, "day--today"], ["title", "Aucun cours cette semaine", "icon", "\u25A5", "message", "Rien de programm\u00E9 pour le moment."], [1, "day"], [1, "day__head"], [1, "day__title"], [1, "badge", "badge--info", "badge--pill"], [1, "day__list"], [1, "course"], [1, "day__empty"], [1, "course__time", "numeric"], ["aria-hidden", "true", 1, "course__marker"], [1, "course__body"], [1, "timetable-sheet"], [1, "timetable-sheet__header"], [1, "timetable-sheet__school"], [1, "timetable-sheet__title"], [1, "timetable-sheet__meta", "numeric"], [1, "timetable-sheet__grid"], [1, "timetable-sheet__caption"], [1, "timetable-sheet__row"], ["scope", "col", 1, "timetable-sheet__hour"], ["scope", "col", 1, "timetable-sheet__day"], [1, "timetable-sheet__footer"], [1, "timetable-sheet__total"], [1, "timetable-sheet__generated"], [1, "timetable-sheet__row", "timetable-sheet__course"], [1, "timetable-sheet__hour"], [1, "timetable-sheet__cell"], [1, "timetable-sheet__course-block"], [1, "timetable-sheet__subject"], [1, "timetable-sheet__teacher"], [1, "timetable-sheet__room"]], template: function StudentTimetableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StudentTimetableComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, StudentTimetableComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, StudentTimetableComponent_Conditional_2_Template, 2, 2);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.loadFailed() ? 1 : 2);
        } }, dependencies: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] { display: block; }\n\n.timetable-page[_ngcontent-%COMP%] { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header[_ngcontent-%COMP%] { margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.week[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--space-4); }\n\n.day[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.day--today[_ngcontent-%COMP%] { border-color: var(--brand-tint-border); }\n\n.day__head[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); margin-bottom: var(--space-3); }\n.day__title[_ngcontent-%COMP%] { margin: 0; font-family: var(--font-display); font-size: var(--text-md); font-weight: 700; text-transform: capitalize; }\n\n.day__list[_ngcontent-%COMP%] { display: grid; gap: var(--space-1); }\n.course[_ngcontent-%COMP%] { display: flex; align-items: stretch; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }\n.course[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\n.course__time[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-end; min-width: 54px; }\n.course__time[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-sm); }\n.course__time[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-light); font-size: 11px; }\n.course__marker[_ngcontent-%COMP%] { width: 12px; height: 12px; flex: 0 0 12px; margin-top: 15px; border: 3px solid var(--border); border-radius: 50%; }\n.course__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.course[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-sm); }\n.course__body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { overflow: hidden; margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.day__empty[_ngcontent-%COMP%] { margin: 0; padding: var(--space-4) var(--space-2); color: var(--text-muted); text-align: center; }\n\n@include mobile {\n  .week { grid-template-columns: 1fr; }\n}\n\n\n\n\n.print-only[_ngcontent-%COMP%] { display: none; }\n\n@media print {\n  .screen-only[_ngcontent-%COMP%] { display: none !important; }\n  .print-only[_ngcontent-%COMP%] { display: block; }\n}\n\n.timetable-sheet[_ngcontent-%COMP%] {\n  padding: 14mm 12mm;\n  font-family: var(--font-body, 'Calibri', 'Segoe UI', sans-serif);\n  font-size: 10pt;\n  color: #101828;\n  page-break-after: always;\n\n  &:last-child { page-break-after: auto; }\n\n  &__header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    padding-bottom: 4mm;\n    border-bottom: 1.5pt solid #101828;\n    margin-bottom: 6mm;\n  }\n\n  &__school {\n    margin: 0;\n    font-size: 13pt;\n    font-weight: 600;\n    color: #101828;\n    line-height: 1.25;\n  }\n\n  &__title {\n    margin: 1mm 0 0;\n    font-size: 15pt;\n    font-weight: 700;\n  }\n\n  &__meta {\n    margin: 0;\n    text-align: right;\n    color: #4b5563;\n    font-size: 9pt;\n    line-height: 1.4;\n  }\n\n  &__caption {\n    caption-side: top;\n    text-align: left;\n    padding: 0 0 3mm;\n    font-size: 9pt;\n    color: #4b5563;\n    font-style: italic;\n  }\n\n  &__grid {\n    width: 100%;\n    border-collapse: collapse;\n    table-layout: fixed;\n  }\n\n  &__row {\n    border-bottom: 1px solid #e5e7eb;\n  }\n\n  &__hour {\n    width: 48mm;\n    padding: 2mm 3mm;\n    font-size: 9pt;\n    white-space: nowrap;\n    color: #374151;\n    vertical-align: top;\n    text-align: left;\n    font-family: var(--font-mono, 'Consolas', monospace);\n  }\n\n  &__day {\n    width: auto;\n    padding: 2mm 3mm;\n    font-size: 9pt;\n    font-weight: 600;\n    text-align: center;\n    color: #101828;\n    background: #f9fafb;\n    vertical-align: top;\n  }\n\n  &__cell {\n    padding: 2mm 3mm;\n    vertical-align: top;\n    background: #fbfff8;\n    border-left: 4px solid var(--brand-tint);\n  }\n\n  &__cell--highlight {\n    background: #fef3c7;\n    border-left-color: #d97706;\n  }\n\n  &__course-block {\n    display: flex;\n    flex-direction: column;\n    gap: 1mm;\n  }\n\n  &__subject {\n    font-weight: 600;\n    font-size: 10pt;\n  }\n\n  &__teacher {\n    font-size: 9pt;\n    color: #4b5563;\n  }\n\n  &__room {\n    font-size: 8.5pt;\n    color: #6b7280;\n    font-style: italic;\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 5mm;\n    padding-top: 3mm;\n    border-top: 1pt solid #d1d5db;\n    font-size: 8.5pt;\n    color: #6b7280;\n  }\n\n  &__total { color: #374151; }\n\n  &__generated {\n    font-style: italic;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentTimetableComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-timetable', standalone: true, imports: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement de ton emploi du temps...\" />\n} @else if (loadFailed()) {\n  <eduops-error-state\n    title=\"Emploi du temps indisponible\"\n    message=\"Impossible de r\u00E9cup\u00E9rer ton emploi du temps pour le moment.\"\n    (retry)=\"load()\" />\n} @else {\n  @if (data(); as emp) {\n    <div class=\"timetable-page\">\n      <header class=\"page-header\">\n        <div>\n          <p class=\"page-header__eyebrow\">{{ emp.termLabel }}</p>\n          <h1 id=\"timetable-title\">Mon emploi du temps</h1>\n          <p class=\"page-header__message\">Ta semaine de cours, jour par jour.</p>\n        </div>\n        <div class=\"page-header__actions screen-only\">\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"print()\">\n            <span aria-hidden=\"true\">\u25A8</span>\n            Imprimer\n          </button>\n        </div>\n      </header>\n\n      <div class=\"week\">\n        @for (day of emp.days; track day.date) {\n          <section class=\"day\" [class.day--today]=\"isToday(day)\">\n            <header class=\"day__head\">\n              <h2 class=\"day__title\">{{ dayTitle(day) }}</h2>\n              @if (isToday(day)) {\n                <span class=\"badge badge--info badge--pill\">Aujourd'hui</span>\n              }\n            </header>\n\n            <div class=\"day__list\">\n              @for (course of day.courses; track course.id) {\n                <article class=\"course\">\n                  <div class=\"course__time numeric\">\n                    <strong>{{ courseTime(course, 'start') }}</strong>\n                    <span>{{ courseTime(course, 'end') }}</span>\n                  </div>\n                  <span class=\"course__marker\" aria-hidden=\"true\"></span>\n                  <div class=\"course__body\">\n                    <h3>{{ course.subjectName }}</h3>\n                    <p>\n                      {{ course.teacherName || 'Enseignant \u00E0 confirmer' }}\n                      @if (course.roomName) { <span>\u00B7 {{ course.roomName }}</span> }\n                    </p>\n                  </div>\n                </article>\n              } @empty {\n                <p class=\"day__empty\">Pas de cours ce jour.</p>\n              }\n            </div>\n          </section>\n        } @empty {\n          <eduops-empty-state\n            title=\"Aucun cours cette semaine\"\n            icon=\"\u25A5\"\n            message=\"Rien de programm\u00E9 pour le moment.\" />\n        }\n      </div>\n    </div>\n  }\n\n  <!-- \u2550\u2550\u2550 Section d'impression \u2550\u2550\u2550 -->\n  @if (printPages(); as pages) {\n    <section class=\"print-only\" aria-hidden=\"true\">\n      @for (page of pages; track page.label) {\n        <div class=\"timetable-sheet\">\n          <header class=\"timetable-sheet__header\">\n            <div>\n              <p class=\"timetable-sheet__school\">{{ page.schoolName }}</p>\n              <h1 class=\"timetable-sheet__title\">Mon emploi du temps</h1>\n            </div>\n            <p class=\"timetable-sheet__meta numeric\">\n              {{ page.termLabel }}<br>\n              {{ page.label }}\n            </p>\n          </header>\n\n          <table class=\"timetable-sheet__grid\">\n            <caption class=\"timetable-sheet__caption\">\n              Semaine du {{ page.label }}, soit {{ page.totalHours }} h de cours par semaine.\n            </caption>\n            <thead>\n              <tr class=\"timetable-sheet__row\">\n                <th class=\"timetable-sheet__hour\" scope=\"col\">Heure</th>\n                @for (day of page.days; track day.date) {\n                  <th class=\"timetable-sheet__day\" scope=\"col\">\n                    {{ dayTitle({ date: day.date }) }}\n                  </th>\n                }\n              </tr>\n            </thead>\n            <tbody>\n              @for (day of page.days; track day.date) {\n                @for (course of day.courses; track course.id) {\n                  <tr class=\"timetable-sheet__row timetable-sheet__course\">\n                    <td class=\"timetable-sheet__hour\">\n                      {{ courseTime(course, 'start') }} \u2013 {{ courseTime(course, 'end') }}\n                    </td>\n                    <td\n                      class=\"timetable-sheet__cell\"\n                      [attr.colspan]=\"day.courses.length\"\n                      [class.timetable-sheet__cell--highlight]=\"isToday({ date: day.date })\">\n                      <div class=\"timetable-sheet__course-block\">\n                        <span class=\"timetable-sheet__subject\">{{ course.subjectName }}</span>\n                        <span class=\"timetable-sheet__teacher\">{{ course.teacherName || 'Enseignant \u00E0 confirmer' }}</span>\n                        @if (course.roomName) {\n                          <span class=\"timetable-sheet__room\">Salle {{ course.roomName }}</span>\n                        }\n                      </div>\n                    </td>\n                  </tr>\n                }\n              }\n            </tbody>\n          </table>\n\n          <footer class=\"timetable-sheet__footer\">\n            <span class=\"timetable-sheet__total\">\n              <strong>{{ page.totalHours }} h</strong> de cours cette semaine\n            </span>\n            <span class=\"timetable-sheet__generated\">G\u00E9n\u00E9r\u00E9 le {{ generatedDate() }}</span>\n          </footer>\n        </div>\n      }\n    </section>\n  }\n}\n", styles: ["@import 'styles/tokens';\n\n:host { display: block; }\n\n.timetable-page { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header { margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header h1 { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.week { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--space-4); }\n\n.day {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.day--today { border-color: var(--brand-tint-border); }\n\n.day__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); margin-bottom: var(--space-3); }\n.day__title { margin: 0; font-family: var(--font-display); font-size: var(--text-md); font-weight: 700; text-transform: capitalize; }\n\n.day__list { display: grid; gap: var(--space-1); }\n.course { display: flex; align-items: stretch; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }\n.course:last-child { border-bottom: 0; }\n.course__time { display: flex; flex-direction: column; align-items: flex-end; min-width: 54px; }\n.course__time strong { font-family: var(--font-display); font-size: var(--text-sm); }\n.course__time span { color: var(--text-light); font-size: 11px; }\n.course__marker { width: 12px; height: 12px; flex: 0 0 12px; margin-top: 15px; border: 3px solid var(--border); border-radius: 50%; }\n.course__body { flex: 1; min-width: 0; }\n.course h3 { margin: 0; font-size: var(--text-sm); }\n.course__body p { overflow: hidden; margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.day__empty { margin: 0; padding: var(--space-4) var(--space-2); color: var(--text-muted); text-align: center; }\n\n@include mobile {\n  .week { grid-template-columns: 1fr; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Impression \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.print-only { display: none; }\n\n@media print {\n  .screen-only { display: none !important; }\n  .print-only { display: block; }\n}\n\n.timetable-sheet {\n  padding: 14mm 12mm;\n  font-family: var(--font-body, 'Calibri', 'Segoe UI', sans-serif);\n  font-size: 10pt;\n  color: #101828;\n  page-break-after: always;\n\n  &:last-child { page-break-after: auto; }\n\n  &__header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    padding-bottom: 4mm;\n    border-bottom: 1.5pt solid #101828;\n    margin-bottom: 6mm;\n  }\n\n  &__school {\n    margin: 0;\n    font-size: 13pt;\n    font-weight: 600;\n    color: #101828;\n    line-height: 1.25;\n  }\n\n  &__title {\n    margin: 1mm 0 0;\n    font-size: 15pt;\n    font-weight: 700;\n  }\n\n  &__meta {\n    margin: 0;\n    text-align: right;\n    color: #4b5563;\n    font-size: 9pt;\n    line-height: 1.4;\n  }\n\n  &__caption {\n    caption-side: top;\n    text-align: left;\n    padding: 0 0 3mm;\n    font-size: 9pt;\n    color: #4b5563;\n    font-style: italic;\n  }\n\n  &__grid {\n    width: 100%;\n    border-collapse: collapse;\n    table-layout: fixed;\n  }\n\n  &__row {\n    border-bottom: 1px solid #e5e7eb;\n  }\n\n  &__hour {\n    width: 48mm;\n    padding: 2mm 3mm;\n    font-size: 9pt;\n    white-space: nowrap;\n    color: #374151;\n    vertical-align: top;\n    text-align: left;\n    font-family: var(--font-mono, 'Consolas', monospace);\n  }\n\n  &__day {\n    width: auto;\n    padding: 2mm 3mm;\n    font-size: 9pt;\n    font-weight: 600;\n    text-align: center;\n    color: #101828;\n    background: #f9fafb;\n    vertical-align: top;\n  }\n\n  &__cell {\n    padding: 2mm 3mm;\n    vertical-align: top;\n    background: #fbfff8;\n    border-left: 4px solid var(--brand-tint);\n  }\n\n  &__cell--highlight {\n    background: #fef3c7;\n    border-left-color: #d97706;\n  }\n\n  &__course-block {\n    display: flex;\n    flex-direction: column;\n    gap: 1mm;\n  }\n\n  &__subject {\n    font-weight: 600;\n    font-size: 10pt;\n  }\n\n  &__teacher {\n    font-size: 9pt;\n    color: #4b5563;\n  }\n\n  &__room {\n    font-size: 8.5pt;\n    color: #6b7280;\n    font-style: italic;\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 5mm;\n    padding-top: 3mm;\n    border-top: 1pt solid #d1d5db;\n    font-size: 8.5pt;\n    color: #6b7280;\n  }\n\n  &__total { color: #374151; }\n\n  &__generated {\n    font-style: italic;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentTimetableComponent, { className: "StudentTimetableComponent", filePath: "frontend/src/app/features/student-portal/student-timetable.component.ts", lineNumber: 29 }); })();
function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
//# sourceMappingURL=student-timetable.component.js.map