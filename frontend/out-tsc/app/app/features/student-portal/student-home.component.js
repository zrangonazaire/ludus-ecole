import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { GradePipe } from '@shared/pipes/grade.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function StudentHomeComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function StudentHomeComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentHomeComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentHomeComponent_Conditional_2_Conditional_0_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "number");
} if (rf & 2) {
    const data_r3 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind3(1, 1, data_r3.summary.attendanceRate, "1.0-1", "fr-FR"), " % ");
} }
function StudentHomeComponent_Conditional_2_Conditional_0_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " - ");
} }
function StudentHomeComponent_Conditional_2_Conditional_0_Conditional_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 30)(1, "span", 49);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7, "Consulter mes absences");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 50);
    i0.ɵɵtext(9, "\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const data_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", data_r3.summary.unjustifiedAbsences, " absence non justifi\u00E9e");
} }
function StudentHomeComponent_Conditional_2_Conditional_0_For_70_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵtext(1, "Prochain");
    i0.ɵɵelementEnd();
} }
function StudentHomeComponent_Conditional_2_Conditional_0_For_70_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", course_r4.roomName, "");
} }
function StudentHomeComponent_Conditional_2_Conditional_0_For_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 51)(1, "div", 52)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "span", 53);
    i0.ɵɵelementStart(9, "div", 54)(10, "div", 55)(11, "p", 56);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, StudentHomeComponent_Conditional_2_Conditional_0_For_70_Conditional_13_Template, 2, 0, "span", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "h3");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17);
    i0.ɵɵtemplate(18, StudentHomeComponent_Conditional_2_Conditional_0_For_70_Conditional_18_Template, 2, 1, "span");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const course_r4 = ctx.$implicit;
    const ɵ$index_146_r5 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("course--next", ɵ$index_146_r5 === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 9, course_r4.startsAt, "HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 12, course_r4.endsAt, "HH:mm"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.courseDay(course_r4));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ɵ$index_146_r5 === 0 ? 13 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(course_r4.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", course_r4.teacherName || "Enseignant \u00E0 confirmer", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r4.roomName ? 18 : -1);
} }
function StudentHomeComponent_Conditional_2_Conditional_0_ForEmpty_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1, "Aucun cours \u00E0 venir.");
    i0.ɵɵelementEnd();
} }
function StudentHomeComponent_Conditional_2_Conditional_0_For_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 44)(1, "span", 58);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 59)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 60)(9, "strong", 61);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "grade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const grade_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", grade_r6.subjectName.slice(0, 2).toUpperCase(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(grade_r6.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(grade_r6.assessmentName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 5, grade_r6.score, grade_r6.maxScore));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(14, 8, grade_r6.publishedAt, "dd MMM", "", "fr-FR"));
} }
function StudentHomeComponent_Conditional_2_Conditional_0_ForEmpty_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1, "Aucune note publi\u00E9e r\u00E9cemment.");
    i0.ɵɵelementEnd();
} }
function StudentHomeComponent_Conditional_2_Conditional_0_For_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 48);
    i0.ɵɵelement(1, "span", 62);
    i0.ɵɵelementStart(2, "div", 63)(3, "div", 64)(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "time");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "h3");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const announcement_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("announcement__dot announcement__dot--" + announcement_r7.category.toLowerCase());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.announcementLabel(announcement_r7.category));
    i0.ɵɵadvance();
    i0.ɵɵattribute("datetime", announcement_r7.publishedAt);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(8, 7, announcement_r7.publishedAt, "dd MMM", "", "fr-FR"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(announcement_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(announcement_r7.message);
} }
function StudentHomeComponent_Conditional_2_Conditional_0_ForEmpty_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1, "Aucune annonce pour le moment.");
    i0.ɵɵelementEnd();
} }
function StudentHomeComponent_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "section", 4)(2, "div")(3, "p", 5);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 6);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 7);
    i0.ɵɵtext(8, "Voici l'essentiel de ta journ\u00E9e.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "eduops-avatar", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "section", 9)(11, "div", 10)(12, "span", 11);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(13, "svg", 12);
    i0.ɵɵelement(14, "path", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(15, "div")(16, "p", 14);
    i0.ɵɵtext(17, "Ma classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 15);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 16)(21, "span");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 17);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "section", 18)(26, "h2", 19);
    i0.ɵɵtext(27, "Ma situation scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "article", 20)(29, "span", 21);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(30, "svg", 12);
    i0.ɵɵelement(31, "path", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(32, "div")(33, "p", 23);
    i0.ɵɵtext(34, "Ma moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p", 24);
    i0.ɵɵtext(36);
    i0.ɵɵpipe(37, "grade");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "article", 20)(39, "span", 25);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(40, "svg", 12);
    i0.ɵɵelement(41, "path", 26);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(42, "div")(43, "p", 23);
    i0.ɵɵtext(44, "Pr\u00E9sence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "p", 24);
    i0.ɵɵtemplate(46, StudentHomeComponent_Conditional_2_Conditional_0_Conditional_46_Template, 2, 5)(47, StudentHomeComponent_Conditional_2_Conditional_0_Conditional_47_Template, 1, 0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "a", 27)(49, "span", 28);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(50, "svg", 12);
    i0.ɵɵelement(51, "path", 29);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(52, "div")(53, "p", 23);
    i0.ɵɵtext(54, "Bulletins");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "p", 24);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(57, StudentHomeComponent_Conditional_2_Conditional_0_Conditional_57_Template, 10, 1, "a", 30);
    i0.ɵɵelementStart(58, "div", 31)(59, "section", 32)(60, "header", 33)(61, "div")(62, "p", 34);
    i0.ɵɵtext(63, "\u00C0 venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "h2", 35);
    i0.ɵɵtext(65, "Mes prochains cours");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "a", 36);
    i0.ɵɵtext(67, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(68, "div", 37);
    i0.ɵɵrepeaterCreate(69, StudentHomeComponent_Conditional_2_Conditional_0_For_70_Template, 19, 15, "article", 38, _forTrack0, false, StudentHomeComponent_Conditional_2_Conditional_0_ForEmpty_71_Template, 2, 0, "p", 39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(72, "section", 40)(73, "header", 33)(74, "div")(75, "p", 34);
    i0.ɵɵtext(76, "R\u00E9sultats");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "h2", 41);
    i0.ɵɵtext(78, "Mes derni\u00E8res notes");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(79, "a", 42);
    i0.ɵɵtext(80, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(81, "div", 43);
    i0.ɵɵrepeaterCreate(82, StudentHomeComponent_Conditional_2_Conditional_0_For_83_Template, 15, 13, "article", 44, _forTrack0, false, StudentHomeComponent_Conditional_2_Conditional_0_ForEmpty_84_Template, 2, 0, "p", 39);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(85, "section", 45)(86, "header", 33)(87, "div")(88, "p", 34);
    i0.ɵɵtext(89, "\u00C0 retenir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "h2", 46);
    i0.ɵɵtext(91, "Annonces");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(92, "div", 47);
    i0.ɵɵrepeaterCreate(93, StudentHomeComponent_Conditional_2_Conditional_0_For_94_Template, 13, 12, "article", 48, _forTrack0, false, StudentHomeComponent_Conditional_2_Conditional_0_ForEmpty_95_Template, 2, 0, "p", 39);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const data_r3 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.today());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Bonjour, ", data_r3.student.firstName, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("name", data_r3.student.fullName)("photoUrl", data_r3.student.photoUrl);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(data_r3.student.classroomName || "Non affect\u00E9e");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(data_r3.termLabel || data_r3.academicYearLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(data_r3.student.studentNumber);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(37, 14, data_r3.summary.academicAverage, data_r3.summary.averageScale), " ");
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(data_r3.summary.attendanceRate !== undefined ? 46 : 47);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(data_r3.summary.publishedReportCards);
    i0.ɵɵadvance();
    i0.ɵɵconditional(data_r3.summary.unjustifiedAbsences > 0 ? 57 : -1);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(data_r3.upcomingCourses);
    i0.ɵɵadvance(13);
    i0.ɵɵrepeater(data_r3.recentGrades);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(data_r3.announcements);
} }
function StudentHomeComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentHomeComponent_Conditional_2_Conditional_0_Template, 96, 17, "div", 3);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.dashboard()) ? 0 : -1, tmp_1_0);
} }
export class StudentHomeComponent {
    dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    dashboard = signal(null);
    loading = signal(true);
    loadFailed = signal(false);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.dataSource.dashboard().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (dashboard) => {
                this.dashboard.set(dashboard);
                this.loading.set(false);
            },
            error: () => {
                this.dashboard.set(null);
                this.loadFailed.set(true);
                this.loading.set(false);
            }
        });
    }
    today() {
        return new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long'
        });
    }
    courseDay(course) {
        const date = new Date(course.startsAt);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return "Aujourd'hui";
        }
        return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
    }
    announcementLabel(category) {
        const labels = {
            GENERAL: 'Information',
            ACADEMIC: 'Scolarité',
            EVENT: 'Événement'
        };
        return labels[category];
    }
    static ɵfac = function StudentHomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentHomeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentHomeComponent, selectors: [["eduops-student-home"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [["message", "Chargement de ton espace..."], ["title", "Ton accueil est indisponible", "message", "Impossible de r\u00E9cup\u00E9rer tes informations pour le moment."], ["title", "Ton accueil est indisponible", "message", "Impossible de r\u00E9cup\u00E9rer tes informations pour le moment.", 3, "retry"], [1, "student-home"], ["aria-labelledby", "student-greeting", 1, "greeting"], [1, "greeting__eyebrow"], ["id", "student-greeting"], [1, "greeting__message"], ["size", "lg", 3, "name", "photoUrl"], ["aria-label", "Informations scolaires", 1, "identity-card"], [1, "identity-card__main"], ["aria-hidden", "true", 1, "identity-card__icon"], ["viewBox", "0 0 24 24", "focusable", "false"], ["d", "m3 10 9-5 9 5-9 5-9-5Zm3 2.4V17c3.4 2.7 8.6 2.7 12 0v-4.6"], [1, "identity-card__label"], [1, "identity-card__class"], [1, "identity-card__details"], [1, "identity-card__number", "numeric"], ["aria-labelledby", "summary-title", 1, "summary"], ["id", "summary-title", 1, "visually-hidden"], [1, "summary-card"], ["aria-hidden", "true", 1, "summary-card__icon", "summary-card__icon--average"], ["d", "M5 19V9m7 10V5m7 14v-7"], [1, "summary-card__label"], [1, "summary-card__value", "numeric"], ["aria-hidden", "true", 1, "summary-card__icon", "summary-card__icon--attendance"], ["d", "m5 12 4 4L19 6"], ["routerLink", "/student/report-cards", 1, "summary-card", "summary-card--link"], ["aria-hidden", "true", 1, "summary-card__icon", "summary-card__icon--reports"], ["d", "M7 3h8l4 4v14H7V3Zm8 0v5h4M10 12h6m-6 4h6"], ["routerLink", "/student/attendance", 1, "absence-alert"], [1, "dashboard-grid"], ["aria-labelledby", "schedule-title", 1, "panel", "schedule"], [1, "section-heading"], [1, "section-heading__eyebrow"], ["id", "schedule-title"], ["routerLink", "/student/timetable"], [1, "course-list"], [1, "course", 3, "course--next"], [1, "panel-empty"], ["aria-labelledby", "grades-title", 1, "panel", "grades"], ["id", "grades-title"], ["routerLink", "/student/grades"], [1, "grade-list"], [1, "grade-row"], ["aria-labelledby", "announcements-title", 1, "announcements"], ["id", "announcements-title"], [1, "announcement-list"], [1, "announcement"], ["aria-hidden", "true", 1, "absence-alert__icon"], ["aria-hidden", "true", 1, "arrow"], [1, "course"], [1, "course__time", "numeric"], ["aria-hidden", "true", 1, "course__marker"], [1, "course__body"], [1, "course__topline"], [1, "course__day"], [1, "badge", "badge--info", "badge--pill"], ["aria-hidden", "true", 1, "grade-row__subject"], [1, "grade-row__body"], [1, "grade-row__result"], [1, "numeric"], ["aria-hidden", "true", 1, "announcement__dot"], [1, "announcement__body"], [1, "announcement__meta"]], template: function StudentHomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StudentHomeComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, StudentHomeComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, StudentHomeComponent_Conditional_2_Template, 1, 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.loadFailed() ? 1 : 2);
        } }, dependencies: [CommonModule, i1.DecimalPipe, i1.DatePipe, RouterLink, AvatarComponent, ErrorStateComponent,
            LoadingStateComponent, GradePipe], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] { display: block; }\n\n.student-home[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 920px;\n  margin: 0 auto;\n}\n\n.greeting[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  margin: var(--space-1) 0 var(--space-5);\n}\n\n.greeting[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.greeting__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: capitalize;\n}\n.greeting__message[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.identity-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-5);\n  margin-bottom: var(--space-4);\n  border-radius: var(--radius-card);\n  color: var(--text-on-brand);\n  background: linear-gradient(125deg, var(--brand), var(--chart-4));\n  box-shadow: var(--shadow-md);\n}\n\n.identity-card[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  right: -55px;\n  bottom: -95px;\n  border: 26px solid rgb(255 255 255 / 10%);\n  border-radius: 50%;\n}\n\n.identity-card__main[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n.identity-card__icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  flex: 0 0 44px;\n  border-radius: 12px;\n  background: rgb(255 255 255 / 16%);\n}\n.identity-card__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 25px; height: 25px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }\n.identity-card__label[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xs); opacity: .78; }\n.identity-card__class[_ngcontent-%COMP%] { margin: 2px 0 0; font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; }\n.identity-card__details[_ngcontent-%COMP%] { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-end; gap: var(--space-1); font-size: var(--text-xs); }\n.identity-card__number[_ngcontent-%COMP%] { opacity: .78; }\n\n.summary[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-4); }\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-width: 0;\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  color: var(--text-normal);\n  box-shadow: var(--shadow-xs);\n}\n.summary-card--link[_ngcontent-%COMP%]:hover { border-color: var(--brand-tint-border); text-decoration: none; }\n.summary-card__icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 38px;\n  height: 38px;\n  flex: 0 0 38px;\n  border-radius: 11px;\n}\n.summary-card__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }\n.summary-card__icon--average[_ngcontent-%COMP%] { background: var(--brand-tint); color: var(--brand); }\n.summary-card__icon--attendance[_ngcontent-%COMP%] { background: var(--success-bg); color: var(--success); }\n.summary-card__icon--reports[_ngcontent-%COMP%] { background: var(--warning-bg); color: var(--warning); }\n.summary-card__label[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.summary-card__value[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; white-space: nowrap; }\n\n.absence-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  margin-bottom: var(--space-5);\n  color: var(--warning);\n  background: var(--warning-bg);\n  border: 1px solid color-mix(in srgb, var(--warning) 20%, transparent);\n  border-radius: var(--radius-button);\n}\n.absence-alert[_ngcontent-%COMP%]:hover { color: var(--warning); text-decoration: none; }\n.absence-alert__icon[_ngcontent-%COMP%] { display: grid; place-items: center; width: 26px; height: 26px; flex: 0 0 26px; border: 2px solid currentColor; border-radius: 50%; font-weight: 800; }\n.absence-alert[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:nth-child(2) { display: flex; flex: 1; flex-direction: column; }\n.absence-alert[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); font-size: var(--text-sm); }\n.absence-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: var(--text-xs); }\n.arrow[_ngcontent-%COMP%] { font-size: 24px; }\n\n.dashboard-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1.12fr .88fr; gap: var(--space-4); align-items: start; }\n.panel[_ngcontent-%COMP%], .announcements[_ngcontent-%COMP%] { padding: var(--space-5); background: var(--surface-card); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-xs); }\n.section-heading[_ngcontent-%COMP%] { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--space-3); margin-bottom: var(--space-4); }\n.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { font-size: var(--text-lg); }\n.section-heading[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; }\n.section-heading__eyebrow[_ngcontent-%COMP%] { margin: 0 0 2px; color: var(--text-muted); font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }\n\n.course-list[_ngcontent-%COMP%] { display: grid; }\n.course[_ngcontent-%COMP%] { display: grid; grid-template-columns: 45px 12px 1fr; gap: var(--space-3); min-height: 86px; }\n.course__time[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-end; padding-top: 3px; }\n.course__time[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); font-size: var(--text-sm); }\n.course__time[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-light); font-size: 11px; }\n.course__marker[_ngcontent-%COMP%] { position: relative; width: 10px; height: 10px; margin-top: 7px; border: 2px solid var(--border-strong); border-radius: 50%; background: var(--surface-card); }\n.course__marker[_ngcontent-%COMP%]::after { content: ''; position: absolute; top: 10px; left: 2px; width: 2px; height: 65px; background: var(--border-light); }\n.course[_ngcontent-%COMP%]:last-child   .course__marker[_ngcontent-%COMP%]::after { display: none; }\n.course--next[_ngcontent-%COMP%]   .course__marker[_ngcontent-%COMP%] { border-color: var(--brand); box-shadow: 0 0 0 4px var(--brand-tint); }\n.course__body[_ngcontent-%COMP%] { min-width: 0; padding-bottom: var(--space-4); }\n.course__topline[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }\n.course__day[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: capitalize; }\n.course[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin-top: 2px; font-size: var(--text-md); }\n.course__body[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { overflow: hidden; margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n\n.grade-list[_ngcontent-%COMP%] { display: grid; gap: var(--space-1); }\n.grade-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }\n.grade-row[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\n.grade-row__subject[_ngcontent-%COMP%] { display: grid; place-items: center; width: 36px; height: 36px; flex: 0 0 36px; color: var(--brand); background: var(--brand-tint); border-radius: 10px; font-size: 10px; font-weight: 800; }\n.grade-row__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.grade-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { overflow: hidden; font-size: var(--text-sm); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { overflow: hidden; margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__result[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-end; }\n.grade-row__result[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); }\n.grade-row__result[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-light); font-size: 10px; text-transform: capitalize; }\n\n.announcements[_ngcontent-%COMP%] { margin-top: var(--space-4); }\n.announcement-list[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }\n.announcement[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); padding: var(--space-4); background: var(--surface-sunken); border-radius: var(--radius-button); }\n.announcement__dot[_ngcontent-%COMP%] { width: 9px; height: 9px; flex: 0 0 9px; margin-top: 5px; border-radius: 50%; background: var(--text-muted); }\n.announcement__dot--academic[_ngcontent-%COMP%] { background: var(--brand); }\n.announcement__dot--event[_ngcontent-%COMP%] { background: var(--chart-4); }\n.announcement__body[_ngcontent-%COMP%] { min-width: 0; }\n.announcement__meta[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: var(--space-2); color: var(--text-muted); font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }\n.announcement[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin-top: var(--space-1); font-size: var(--text-sm); }\n.announcement[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-xs); line-height: var(--leading-normal); }\n.panel-empty[_ngcontent-%COMP%] { margin: 0; padding: var(--space-6) var(--space-2); color: var(--text-muted); text-align: center; }\n\n@include mobile {\n  .greeting eduops-avatar { display: none; }\n  .identity-card { align-items: flex-start; flex-direction: column; }\n  .identity-card__details { align-items: flex-start; padding-left: 56px; }\n  .summary { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-2); }\n  .summary-card { align-items: flex-start; flex-direction: column; gap: var(--space-2); padding: var(--space-3); }\n  .summary-card__icon { width: 32px; height: 32px; flex-basis: 32px; }\n  .summary-card__icon svg { width: 18px; height: 18px; }\n  .summary-card__value { font-size: var(--text-md); }\n  .dashboard-grid { grid-template-columns: 1fr; }\n  .panel, .announcements { padding: var(--space-4); }\n  .announcement-list { grid-template-columns: 1fr; }\n}\n\n@media (max-width: 380px) {\n  .summary-card__label[_ngcontent-%COMP%] { font-size: 10px; }\n  .summary-card__value[_ngcontent-%COMP%] { font-size: var(--text-sm); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentHomeComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-home', standalone: true, imports: [
                    CommonModule, RouterLink, AvatarComponent, ErrorStateComponent,
                    LoadingStateComponent, GradePipe
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement de ton espace...\" />\n} @else if (loadFailed()) {\n  <eduops-error-state\n    title=\"Ton accueil est indisponible\"\n    message=\"Impossible de r\u00E9cup\u00E9rer tes informations pour le moment.\"\n    (retry)=\"load()\" />\n} @else {\n  @if (dashboard(); as data) {\n    <div class=\"student-home\">\n    <section class=\"greeting\" aria-labelledby=\"student-greeting\">\n      <div>\n        <p class=\"greeting__eyebrow\">{{ today() }}</p>\n        <h1 id=\"student-greeting\">Bonjour, {{ data.student.firstName }}</h1>\n        <p class=\"greeting__message\">Voici l'essentiel de ta journ\u00E9e.</p>\n      </div>\n      <eduops-avatar\n        [name]=\"data.student.fullName\"\n        [photoUrl]=\"data.student.photoUrl\"\n        size=\"lg\" />\n    </section>\n\n    <section class=\"identity-card\" aria-label=\"Informations scolaires\">\n      <div class=\"identity-card__main\">\n        <span class=\"identity-card__icon\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" focusable=\"false\">\n            <path d=\"m3 10 9-5 9 5-9 5-9-5Zm3 2.4V17c3.4 2.7 8.6 2.7 12 0v-4.6\" />\n          </svg>\n        </span>\n        <div>\n          <p class=\"identity-card__label\">Ma classe</p>\n          <p class=\"identity-card__class\">{{ data.student.classroomName || 'Non affect\u00E9e' }}</p>\n        </div>\n      </div>\n      <div class=\"identity-card__details\">\n        <span>{{ data.termLabel || data.academicYearLabel }}</span>\n        <span class=\"identity-card__number numeric\">{{ data.student.studentNumber }}</span>\n      </div>\n    </section>\n\n    <section class=\"summary\" aria-labelledby=\"summary-title\">\n      <h2 id=\"summary-title\" class=\"visually-hidden\">Ma situation scolaire</h2>\n      <article class=\"summary-card\">\n        <span class=\"summary-card__icon summary-card__icon--average\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" focusable=\"false\">\n            <path d=\"M5 19V9m7 10V5m7 14v-7\" />\n          </svg>\n        </span>\n        <div>\n          <p class=\"summary-card__label\">Ma moyenne</p>\n          <p class=\"summary-card__value numeric\">\n            {{ data.summary.academicAverage | grade:data.summary.averageScale }}\n          </p>\n        </div>\n      </article>\n      <article class=\"summary-card\">\n        <span class=\"summary-card__icon summary-card__icon--attendance\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" focusable=\"false\">\n            <path d=\"m5 12 4 4L19 6\" />\n          </svg>\n        </span>\n        <div>\n          <p class=\"summary-card__label\">Pr\u00E9sence</p>\n          <p class=\"summary-card__value numeric\">\n            @if (data.summary.attendanceRate !== undefined) {\n              {{ data.summary.attendanceRate | number:'1.0-1':'fr-FR' }} %\n            } @else { - }\n          </p>\n        </div>\n      </article>\n      <a class=\"summary-card summary-card--link\" routerLink=\"/student/report-cards\">\n        <span class=\"summary-card__icon summary-card__icon--reports\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" focusable=\"false\">\n            <path d=\"M7 3h8l4 4v14H7V3Zm8 0v5h4M10 12h6m-6 4h6\" />\n          </svg>\n        </span>\n        <div>\n          <p class=\"summary-card__label\">Bulletins</p>\n          <p class=\"summary-card__value numeric\">{{ data.summary.publishedReportCards }}</p>\n        </div>\n      </a>\n    </section>\n\n    @if (data.summary.unjustifiedAbsences > 0) {\n      <a class=\"absence-alert\" routerLink=\"/student/attendance\">\n        <span class=\"absence-alert__icon\" aria-hidden=\"true\">!</span>\n        <span>\n          <strong>{{ data.summary.unjustifiedAbsences }} absence non justifi\u00E9e</strong>\n          <small>Consulter mes absences</small>\n        </span>\n        <span class=\"arrow\" aria-hidden=\"true\">\u203A</span>\n      </a>\n    }\n\n    <div class=\"dashboard-grid\">\n      <section class=\"panel schedule\" aria-labelledby=\"schedule-title\">\n        <header class=\"section-heading\">\n          <div>\n            <p class=\"section-heading__eyebrow\">\u00C0 venir</p>\n            <h2 id=\"schedule-title\">Mes prochains cours</h2>\n          </div>\n          <a routerLink=\"/student/timetable\">Tout voir</a>\n        </header>\n\n        <div class=\"course-list\">\n          @for (course of data.upcomingCourses; track course.id; let first = $first) {\n            <article class=\"course\" [class.course--next]=\"first\">\n              <div class=\"course__time numeric\">\n                <strong>{{ course.startsAt | date:'HH:mm' }}</strong>\n                <span>{{ course.endsAt | date:'HH:mm' }}</span>\n              </div>\n              <span class=\"course__marker\" aria-hidden=\"true\"></span>\n              <div class=\"course__body\">\n                <div class=\"course__topline\">\n                  <p class=\"course__day\">{{ courseDay(course) }}</p>\n                  @if (first) { <span class=\"badge badge--info badge--pill\">Prochain</span> }\n                </div>\n                <h3>{{ course.subjectName }}</h3>\n                <p>\n                  {{ course.teacherName || 'Enseignant \u00E0 confirmer' }}\n                  @if (course.roomName) { <span> \u00B7 {{ course.roomName }}</span> }\n                </p>\n              </div>\n            </article>\n          } @empty {\n            <p class=\"panel-empty\">Aucun cours \u00E0 venir.</p>\n          }\n        </div>\n      </section>\n\n      <section class=\"panel grades\" aria-labelledby=\"grades-title\">\n        <header class=\"section-heading\">\n          <div>\n            <p class=\"section-heading__eyebrow\">R\u00E9sultats</p>\n            <h2 id=\"grades-title\">Mes derni\u00E8res notes</h2>\n          </div>\n          <a routerLink=\"/student/grades\">Tout voir</a>\n        </header>\n\n        <div class=\"grade-list\">\n          @for (grade of data.recentGrades; track grade.id) {\n            <article class=\"grade-row\">\n              <span class=\"grade-row__subject\" aria-hidden=\"true\">\n                {{ grade.subjectName.slice(0, 2).toUpperCase() }}\n              </span>\n              <div class=\"grade-row__body\">\n                <h3>{{ grade.subjectName }}</h3>\n                <p>{{ grade.assessmentName }}</p>\n              </div>\n              <div class=\"grade-row__result\">\n                <strong class=\"numeric\">{{ grade.score | grade:grade.maxScore }}</strong>\n                <span>{{ grade.publishedAt | date:'dd MMM':'':'fr-FR' }}</span>\n              </div>\n            </article>\n          } @empty {\n            <p class=\"panel-empty\">Aucune note publi\u00E9e r\u00E9cemment.</p>\n          }\n        </div>\n      </section>\n    </div>\n\n    <section class=\"announcements\" aria-labelledby=\"announcements-title\">\n      <header class=\"section-heading\">\n        <div>\n          <p class=\"section-heading__eyebrow\">\u00C0 retenir</p>\n          <h2 id=\"announcements-title\">Annonces</h2>\n        </div>\n      </header>\n\n      <div class=\"announcement-list\">\n        @for (announcement of data.announcements; track announcement.id) {\n          <article class=\"announcement\">\n            <span class=\"announcement__dot\" [class]=\"'announcement__dot announcement__dot--' + announcement.category.toLowerCase()\" aria-hidden=\"true\"></span>\n            <div class=\"announcement__body\">\n              <div class=\"announcement__meta\">\n                <span>{{ announcementLabel(announcement.category) }}</span>\n                <time [attr.datetime]=\"announcement.publishedAt\">\n                  {{ announcement.publishedAt | date:'dd MMM':'':'fr-FR' }}\n                </time>\n              </div>\n              <h3>{{ announcement.title }}</h3>\n              <p>{{ announcement.message }}</p>\n            </div>\n          </article>\n        } @empty {\n          <p class=\"panel-empty\">Aucune annonce pour le moment.</p>\n        }\n      </div>\n    </section>\n    </div>\n  }\n}\n", styles: ["@import 'styles/tokens';\n\n:host { display: block; }\n\n.student-home {\n  width: 100%;\n  max-width: 920px;\n  margin: 0 auto;\n}\n\n.greeting {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  margin: var(--space-1) 0 var(--space-5);\n}\n\n.greeting h1 { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.greeting__eyebrow {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: capitalize;\n}\n.greeting__message { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.identity-card {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-5);\n  margin-bottom: var(--space-4);\n  border-radius: var(--radius-card);\n  color: var(--text-on-brand);\n  background: linear-gradient(125deg, var(--brand), var(--chart-4));\n  box-shadow: var(--shadow-md);\n}\n\n.identity-card::after {\n  content: '';\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  right: -55px;\n  bottom: -95px;\n  border: 26px solid rgb(255 255 255 / 10%);\n  border-radius: 50%;\n}\n\n.identity-card__main { display: flex; align-items: center; gap: var(--space-3); }\n.identity-card__icon {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  flex: 0 0 44px;\n  border-radius: 12px;\n  background: rgb(255 255 255 / 16%);\n}\n.identity-card__icon svg { width: 25px; height: 25px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }\n.identity-card__label { margin: 0; font-size: var(--text-xs); opacity: .78; }\n.identity-card__class { margin: 2px 0 0; font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; }\n.identity-card__details { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-end; gap: var(--space-1); font-size: var(--text-xs); }\n.identity-card__number { opacity: .78; }\n\n.summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-4); }\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-width: 0;\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  color: var(--text-normal);\n  box-shadow: var(--shadow-xs);\n}\n.summary-card--link:hover { border-color: var(--brand-tint-border); text-decoration: none; }\n.summary-card__icon {\n  display: grid;\n  place-items: center;\n  width: 38px;\n  height: 38px;\n  flex: 0 0 38px;\n  border-radius: 11px;\n}\n.summary-card__icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }\n.summary-card__icon--average { background: var(--brand-tint); color: var(--brand); }\n.summary-card__icon--attendance { background: var(--success-bg); color: var(--success); }\n.summary-card__icon--reports { background: var(--warning-bg); color: var(--warning); }\n.summary-card__label { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.summary-card__value { margin: 2px 0 0; color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; white-space: nowrap; }\n\n.absence-alert {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  margin-bottom: var(--space-5);\n  color: var(--warning);\n  background: var(--warning-bg);\n  border: 1px solid color-mix(in srgb, var(--warning) 20%, transparent);\n  border-radius: var(--radius-button);\n}\n.absence-alert:hover { color: var(--warning); text-decoration: none; }\n.absence-alert__icon { display: grid; place-items: center; width: 26px; height: 26px; flex: 0 0 26px; border: 2px solid currentColor; border-radius: 50%; font-weight: 800; }\n.absence-alert > span:nth-child(2) { display: flex; flex: 1; flex-direction: column; }\n.absence-alert strong { color: var(--text-strong); font-size: var(--text-sm); }\n.absence-alert small { font-size: var(--text-xs); }\n.arrow { font-size: 24px; }\n\n.dashboard-grid { display: grid; grid-template-columns: 1.12fr .88fr; gap: var(--space-4); align-items: start; }\n.panel, .announcements { padding: var(--space-5); background: var(--surface-card); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-xs); }\n.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--space-3); margin-bottom: var(--space-4); }\n.section-heading h2 { font-size: var(--text-lg); }\n.section-heading a { font-size: var(--text-sm); font-weight: 600; }\n.section-heading__eyebrow { margin: 0 0 2px; color: var(--text-muted); font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }\n\n.course-list { display: grid; }\n.course { display: grid; grid-template-columns: 45px 12px 1fr; gap: var(--space-3); min-height: 86px; }\n.course__time { display: flex; flex-direction: column; align-items: flex-end; padding-top: 3px; }\n.course__time strong { color: var(--text-strong); font-size: var(--text-sm); }\n.course__time span { color: var(--text-light); font-size: 11px; }\n.course__marker { position: relative; width: 10px; height: 10px; margin-top: 7px; border: 2px solid var(--border-strong); border-radius: 50%; background: var(--surface-card); }\n.course__marker::after { content: ''; position: absolute; top: 10px; left: 2px; width: 2px; height: 65px; background: var(--border-light); }\n.course:last-child .course__marker::after { display: none; }\n.course--next .course__marker { border-color: var(--brand); box-shadow: 0 0 0 4px var(--brand-tint); }\n.course__body { min-width: 0; padding-bottom: var(--space-4); }\n.course__topline { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }\n.course__day { margin: 0; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: capitalize; }\n.course h3 { margin-top: 2px; font-size: var(--text-md); }\n.course__body > p { overflow: hidden; margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n\n.grade-list { display: grid; gap: var(--space-1); }\n.grade-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }\n.grade-row:last-child { border-bottom: 0; }\n.grade-row__subject { display: grid; place-items: center; width: 36px; height: 36px; flex: 0 0 36px; color: var(--brand); background: var(--brand-tint); border-radius: 10px; font-size: 10px; font-weight: 800; }\n.grade-row__body { flex: 1; min-width: 0; }\n.grade-row h3 { overflow: hidden; font-size: var(--text-sm); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__body p { overflow: hidden; margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__result { display: flex; flex-direction: column; align-items: flex-end; }\n.grade-row__result strong { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); }\n.grade-row__result span { color: var(--text-light); font-size: 10px; text-transform: capitalize; }\n\n.announcements { margin-top: var(--space-4); }\n.announcement-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }\n.announcement { display: flex; gap: var(--space-3); padding: var(--space-4); background: var(--surface-sunken); border-radius: var(--radius-button); }\n.announcement__dot { width: 9px; height: 9px; flex: 0 0 9px; margin-top: 5px; border-radius: 50%; background: var(--text-muted); }\n.announcement__dot--academic { background: var(--brand); }\n.announcement__dot--event { background: var(--chart-4); }\n.announcement__body { min-width: 0; }\n.announcement__meta { display: flex; justify-content: space-between; gap: var(--space-2); color: var(--text-muted); font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }\n.announcement h3 { margin-top: var(--space-1); font-size: var(--text-sm); }\n.announcement p { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-xs); line-height: var(--leading-normal); }\n.panel-empty { margin: 0; padding: var(--space-6) var(--space-2); color: var(--text-muted); text-align: center; }\n\n@include mobile {\n  .greeting eduops-avatar { display: none; }\n  .identity-card { align-items: flex-start; flex-direction: column; }\n  .identity-card__details { align-items: flex-start; padding-left: 56px; }\n  .summary { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-2); }\n  .summary-card { align-items: flex-start; flex-direction: column; gap: var(--space-2); padding: var(--space-3); }\n  .summary-card__icon { width: 32px; height: 32px; flex-basis: 32px; }\n  .summary-card__icon svg { width: 18px; height: 18px; }\n  .summary-card__value { font-size: var(--text-md); }\n  .dashboard-grid { grid-template-columns: 1fr; }\n  .panel, .announcements { padding: var(--space-4); }\n  .announcement-list { grid-template-columns: 1fr; }\n}\n\n@media (max-width: 380px) {\n  .summary-card__label { font-size: 10px; }\n  .summary-card__value { font-size: var(--text-sm); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentHomeComponent, { className: "StudentHomeComponent", filePath: "frontend/src/app/features/student-portal/student-home.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=student-home.component.js.map