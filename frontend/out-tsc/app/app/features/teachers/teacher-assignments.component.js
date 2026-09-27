import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeacherAssignmentService } from '@core/services/teacher-assignment.service';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function TeacherAssignmentsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Ann\u00E9e scolaire : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx);
} }
function TeacherAssignmentsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function TeacherAssignmentsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, "Chargement des affectations\u2026");
    i0.ɵɵelementEnd();
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 9)(1, "h2");
    i0.ɵɵtext(2, "Aucune ann\u00E9e scolaire active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Activez une ann\u00E9e avant d\u2019affecter les enseignants.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 10);
    i0.ɵɵtext(6, "G\u00E9rer les ann\u00E9es scolaires");
    i0.ɵɵelementEnd()();
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Ajoutez au moins un enseignant actif et une classe active pour commencer.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 14)(3, "a", 15);
    i0.ɵɵtext(4, "Ajouter un enseignant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 16);
    i0.ɵɵtext(6, "G\u00E9rer les classes");
    i0.ɵɵelementEnd()();
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", c_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(c_r3.name);
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r4.name);
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_For_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const t_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", t_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r5.name);
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucune mati\u00E8re au programme de cette classe. ");
    i0.ɵɵelementStart(2, "a", 31);
    i0.ɵɵtext(3, "D\u00E9finir le programme");
    i0.ɵɵelementEnd()();
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1, "Renseignez les trois s\u00E9lections et un volume horaire entre 0,01 et 60 (deux d\u00E9cimales maximum).");
    i0.ɵɵelementEnd();
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 17);
    i0.ɵɵlistener("ngSubmit", function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.save()); });
    i0.ɵɵelementStart(1, "fieldset", 18)(2, "div", 19)(3, "div")(4, "label", 20);
    i0.ɵɵtext(5, "Classe *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "select", 21);
    i0.ɵɵlistener("change", function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Template_select_change_6_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.form.controls.subjectId.setValue("")); });
    i0.ɵɵelementStart(7, "option", 22);
    i0.ɵɵtext(8, "Choisir une classe");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(9, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_For_10_Template, 2, 2, "option", 23, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div")(12, "label", 24);
    i0.ɵɵtext(13, "Mati\u00E8re *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 25)(15, "option", 22);
    i0.ɵɵtext(16, "Choisir une mati\u00E8re du programme");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(17, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_For_18_Template, 2, 2, "option", 23, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div")(20, "label", 26);
    i0.ɵɵtext(21, "Enseignant *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "select", 27)(23, "option", 22);
    i0.ɵɵtext(24, "Choisir un enseignant");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(25, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_For_26_Template, 2, 2, "option", 23, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div")(28, "label", 28);
    i0.ɵɵtext(29, "Heures par semaine *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 29);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(31, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Conditional_31_Template, 4, 0, "p")(32, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Conditional_32_Template, 2, 0, "p", 6);
    i0.ɵɵelementStart(33, "div", 14)(34, "button", 30);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const data_r6 = i0.ɵɵnextContext(2);
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(data_r6.classes);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r0.subjects());
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(data_r6.teachers);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r0.form.controls.classroomId.value && !ctx_r0.subjects().length ? 31 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.form.touched && ctx_r0.form.invalid ? 32 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.busy() ? "Enregistrement\u2026" : "Affecter l\u2019enseignant");
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucune affectation pour le moment. Choisissez une classe, une mati\u00E8re et un enseignant ci-dessus.");
    i0.ɵɵelementEnd();
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_9_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "button", 33);
    i0.ɵɵlistener("click", function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_9_For_18_Template_button_click_10_listener() { const a_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.ending.set(a_r8)); });
    i0.ɵɵtext(11, "Terminer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const a_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r8.teacherName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r8.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r8.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r8.weeklyHours);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "table")(2, "caption", 32);
    i0.ɵɵtext(3, "Affectations des enseignants pour l\u2019ann\u00E9e active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th");
    i0.ɵɵtext(7, "Enseignant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Heures / semaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵrepeaterCreate(17, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_9_For_18_Template, 12, 5, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const data_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(17);
    i0.ɵɵrepeater(data_r6.assignments);
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "p");
    i0.ɵɵtext(2, "Terminer l\u2019affectation de ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 14)(7, "button", 34);
    i0.ɵɵlistener("click", function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_10_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.ending.set(null)); });
    i0.ɵɵtext(8, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 35);
    i0.ɵɵlistener("click", function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_10_Template_button_click_9_listener() { const a_r10 = i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.end(a_r10)); });
    i0.ɵɵtext(10, "Confirmer la fin");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const a_r10 = ctx;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(a_r10.teacherName);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" en ", a_r10.subjectName, " pour ", a_r10.classroomName, " ? Son autorisation de saisie pour cette mati\u00E8re et cette classe sera retir\u00E9e.");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 9)(1, "h2");
    i0.ɵɵtext(2, "Nouvelle affectation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_3_Template, 7, 0)(4, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_4_Template, 36, 6, "form", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "section", 9)(6, "h2");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_8_Template, 2, 0, "p")(9, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_9_Template, 19, 0, "div", 12)(10, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Conditional_10_Template, 11, 5, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const data_r6 = i0.ɵɵnextContext();
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!data_r6.teachers.length || !data_r6.classes.length ? 3 : 4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Affectations actives (", data_r6.assignments.length, ")");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!data_r6.assignments.length ? 8 : 9);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_7_0 = ctx_r0.ending()) ? 10 : -1, tmp_7_0);
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_0_Template, 7, 0, "section", 9)(1, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Conditional_1_Template, 11, 4);
} if (rf & 2) {
    i0.ɵɵconditional(!ctx.academicYearCode ? 0 : 1);
} }
function TeacherAssignmentsComponent_Conditional_14_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function TeacherAssignmentsComponent_Conditional_14_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.load()); });
    i0.ɵɵtext(1, "R\u00E9essayer");
    i0.ɵɵelementEnd();
} }
function TeacherAssignmentsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TeacherAssignmentsComponent_Conditional_14_Conditional_0_Template, 2, 1)(1, TeacherAssignmentsComponent_Conditional_14_Conditional_1_Template, 2, 0, "button", 8);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r0.board()) ? 0 : 1, tmp_1_0);
} }
export class TeacherAssignmentsComponent {
    service = inject(TeacherAssignmentService);
    notifications = inject(NotificationService);
    setup = inject(SetupStatusService);
    destroyRef = inject(DestroyRef);
    board = signal(null);
    loading = signal(true);
    busy = signal(false);
    error = signal('');
    ending = signal(null);
    form = inject(FormBuilder).nonNullable.group({
        teacherId: ['', Validators.required], classroomId: ['', Validators.required], subjectId: ['', Validators.required],
        weeklyHours: [2, [Validators.required, Validators.min(0.01), Validators.max(60), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
    constructor() { this.load(); }
    subjects() { return this.board()?.classes.find(c => c.id === this.form.controls.classroomId.value)?.subjects ?? []; }
    load() {
        this.loading.set(true);
        this.error.set('');
        this.service.board().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: data => { this.board.set(data); this.loading.set(false); },
            error: () => { this.board.set(null); this.loading.set(false); this.error.set('Impossible de charger les affectations. Réessayez.'); }
        });
    }
    save() {
        if (this.busy())
            return;
        this.form.markAllAsTouched();
        if (this.form.invalid)
            return;
        this.busy.set(true);
        this.error.set('');
        this.service.create(this.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.busy.set(false); this.form.reset(); this.notifications.success('Enseignant affecté à la classe et à la matière.'); this.load(); this.setup.refresh(); },
            error: err => this.failure(err)
        });
    }
    end(row) {
        if (this.busy())
            return;
        this.busy.set(true);
        this.error.set('');
        this.service.end(row.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.busy.set(false); this.ending.set(null); this.notifications.success('Affectation terminée.'); this.load(); this.setup.refresh(); },
            error: err => this.failure(err)
        });
    }
    failure(err) {
        this.busy.set(false);
        this.error.set(err.error?.message || 'Impossible d’enregistrer cette affectation. Réessayez.');
    }
    static ɵfac = function TeacherAssignmentsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherAssignmentsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherAssignmentsComponent, selectors: [["eduops-teacher-assignments"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 15, vars: 3, consts: [[1, "page"], [1, "page__header"], ["routerLink", "/setup"], [1, "page__title"], [1, "page__meta"], ["routerLink", "/teachers", 1, "btn", "btn--secondary"], ["role", "alert", 1, "error"], ["role", "status"], [1, "btn", "btn--secondary"], [1, "card"], ["routerLink", "/academic-years"], [3, "formGroup"], [1, "table-wrap"], ["role", "group", "aria-label", "Confirmation de fin d\u2019affectation", 1, "confirmation"], [1, "actions"], ["routerLink", "/teachers/new"], ["routerLink", "/classes"], [3, "ngSubmit", "formGroup"], [3, "disabled"], [1, "grid"], ["for", "assignment-class"], ["id", "assignment-class", "formControlName", "classroomId", 1, "input", 3, "change"], ["value", ""], [3, "value"], ["for", "assignment-subject"], ["id", "assignment-subject", "formControlName", "subjectId", 1, "input"], ["for", "assignment-teacher"], ["id", "assignment-teacher", "formControlName", "teacherId", 1, "input"], ["for", "assignment-hours"], ["id", "assignment-hours", "type", "number", "min", "0.01", "max", "60", "step", "0.01", "formControlName", "weeklyHours", 1, "input"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], ["routerLink", "/subjects"], [1, "visually-hidden"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], [1, "btn", "btn--secondary", 3, "click", "disabled"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "btn", "btn--secondary", 3, "click"]], template: function TeacherAssignmentsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "a", 2);
            i0.ɵɵtext(4, "\u2190 Configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Affectation des enseignants");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Associez chaque enseignant \u00E0 une classe et une mati\u00E8re pour d\u00E9finir son p\u00E9rim\u00E8tre de saisie.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, TeacherAssignmentsComponent_Conditional_9_Template, 4, 1, "p");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "a", 5);
            i0.ɵɵtext(11, "G\u00E9rer les enseignants");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(12, TeacherAssignmentsComponent_Conditional_12_Template, 2, 1, "p", 6)(13, TeacherAssignmentsComponent_Conditional_13_Template, 2, 0, "p", 7)(14, TeacherAssignmentsComponent_Conditional_14_Template, 2, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional((tmp_0_0 = (tmp_0_0 = ctx.board()) == null ? null : tmp_0_0.academicYearCode) ? 9 : -1, tmp_0_0);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.error() ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 13 : 14);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: [".card[_ngcontent-%COMP%] { padding: 24px; margin-bottom: 24px; } h2[_ngcontent-%COMP%] { margin-top: 0; }\n    .grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }\n    label[_ngcontent-%COMP%] { display: block; font-weight: 600; margin-bottom: 8px; } fieldset[_ngcontent-%COMP%] { border: 0; padding: 0; min-width: 0; }\n    .actions[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }\n    .error[_ngcontent-%COMP%] { color: var(--danger, #b42318); } .table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\n    table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; } th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { text-align: left; padding: 12px; border-bottom: 1px solid var(--border, #e5e7eb); }\n    .confirmation[_ngcontent-%COMP%] { padding: 16px; margin-top: 16px; border: 1px solid var(--border, #e5e7eb); border-radius: 8px; }\n    @media (max-width: 640px) { .grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } .card[_ngcontent-%COMP%] { padding: 16px; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherAssignmentsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-teacher-assignments', standalone: true, imports: [ReactiveFormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <header class="page__header"><div>
        <a routerLink="/setup">← Configuration</a>
        <h1 class="page__title">Affectation des enseignants</h1>
        <p class="page__meta">Associez chaque enseignant à une classe et une matière pour définir son périmètre de saisie.</p>
        @if (board()?.academicYearCode; as year) { <p>Année scolaire : <strong>{{ year }}</strong></p> }
      </div><a class="btn btn--secondary" routerLink="/teachers">Gérer les enseignants</a></header>
      @if (error()) { <p role="alert" class="error">{{ error() }}</p> }
      @if (loading()) { <p role="status">Chargement des affectations…</p> }
      @else { @if (board(); as data) {
        @if (!data.academicYearCode) {
          <section class="card"><h2>Aucune année scolaire active</h2><p>Activez une année avant d’affecter les enseignants.</p><a routerLink="/academic-years">Gérer les années scolaires</a></section>
        } @else {
          <section class="card">
            <h2>Nouvelle affectation</h2>
            @if (!data.teachers.length || !data.classes.length) {
              <p>Ajoutez au moins un enseignant actif et une classe active pour commencer.</p>
              <div class="actions"><a routerLink="/teachers/new">Ajouter un enseignant</a><a routerLink="/classes">Gérer les classes</a></div>
            } @else {
              <form [formGroup]="form" (ngSubmit)="save()">
                <fieldset [disabled]="busy()"><div class="grid">
                  <div><label for="assignment-class">Classe *</label><select id="assignment-class" class="input" formControlName="classroomId" (change)="form.controls.subjectId.setValue('')">
                    <option value="">Choisir une classe</option>@for (c of data.classes; track c.id) { <option [value]="c.id">{{ c.name }}</option> }
                  </select></div>
                  <div><label for="assignment-subject">Matière *</label><select id="assignment-subject" class="input" formControlName="subjectId">
                    <option value="">Choisir une matière du programme</option>@for (s of subjects(); track s.id) { <option [value]="s.id">{{ s.name }}</option> }
                  </select></div>
                  <div><label for="assignment-teacher">Enseignant *</label><select id="assignment-teacher" class="input" formControlName="teacherId">
                    <option value="">Choisir un enseignant</option>@for (t of data.teachers; track t.id) { <option [value]="t.id">{{ t.name }}</option> }
                  </select></div>
                  <div><label for="assignment-hours">Heures par semaine *</label><input id="assignment-hours" class="input" type="number" min="0.01" max="60" step="0.01" formControlName="weeklyHours" /></div>
                </div></fieldset>
                @if (form.controls.classroomId.value && !subjects().length) { <p>Aucune matière au programme de cette classe. <a routerLink="/subjects">Définir le programme</a></p> }
                @if (form.touched && form.invalid) { <p class="error" role="alert">Renseignez les trois sélections et un volume horaire entre 0,01 et 60 (deux décimales maximum).</p> }
                <div class="actions"><button class="btn btn--primary" type="submit" [disabled]="busy()">{{ busy() ? 'Enregistrement…' : 'Affecter l’enseignant' }}</button></div>
              </form>
            }
          </section>
          <section class="card"><h2>Affectations actives ({{ data.assignments.length }})</h2>
            @if (!data.assignments.length) { <p>Aucune affectation pour le moment. Choisissez une classe, une matière et un enseignant ci-dessus.</p> }
            @else {
              <div class="table-wrap"><table><caption class="visually-hidden">Affectations des enseignants pour l’année active</caption><thead><tr><th>Enseignant</th><th>Classe</th><th>Matière</th><th>Heures / semaine</th><th>Action</th></tr></thead><tbody>
                @for (a of data.assignments; track a.id) { <tr><td>{{ a.teacherName }}</td><td>{{ a.classroomName }}</td><td>{{ a.subjectName }}</td><td>{{ a.weeklyHours }}</td><td><button type="button" class="btn btn--secondary" [disabled]="busy()" (click)="ending.set(a)">Terminer</button></td></tr> }
              </tbody></table></div>
            }
            @if (ending(); as a) { <div class="confirmation" role="group" aria-label="Confirmation de fin d’affectation"><p>Terminer l’affectation de <strong>{{ a.teacherName }}</strong> en {{ a.subjectName }} pour {{ a.classroomName }} ? Son autorisation de saisie pour cette matière et cette classe sera retirée.</p>
              <div class="actions"><button class="btn btn--secondary" [disabled]="busy()" (click)="ending.set(null)">Annuler</button><button class="btn btn--primary" [disabled]="busy()" (click)="end(a)">Confirmer la fin</button></div></div> }
          </section>
        }
      } @else { <button class="btn btn--secondary" (click)="load()">Réessayer</button> } }
    </div>
  `, styles: ["\n    .card { padding: 24px; margin-bottom: 24px; } h2 { margin-top: 0; }\n    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }\n    label { display: block; font-weight: 600; margin-bottom: 8px; } fieldset { border: 0; padding: 0; min-width: 0; }\n    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }\n    .error { color: var(--danger, #b42318); } .table-wrap { overflow-x: auto; }\n    table { width: 100%; border-collapse: collapse; } th, td { text-align: left; padding: 12px; border-bottom: 1px solid var(--border, #e5e7eb); }\n    .confirmation { padding: 16px; margin-top: 16px; border: 1px solid var(--border, #e5e7eb); border-radius: 8px; }\n    @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } .card { padding: 16px; } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherAssignmentsComponent, { className: "TeacherAssignmentsComponent", filePath: "frontend/src/app/features/teachers/teacher-assignments.component.ts", lineNumber: 76 }); })();
//# sourceMappingURL=teacher-assignments.component.js.map