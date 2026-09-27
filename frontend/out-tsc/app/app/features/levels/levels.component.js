import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { LEVEL_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function LevelsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵelementStart(1, "span", 11);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouveau niveau ");
    i0.ɵɵelementEnd();
} }
function LevelsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function LevelsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 12);
    i0.ɵɵlistener("retry", function LevelsComponent_Conditional_14_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function LevelsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 13)(2, "h2", 14);
    i0.ɵɵtext(3, "Aucun niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 15);
    i0.ɵɵtext(5, "Cr\u00E9ez le premier niveau depuis l'assistant d'accueil, puis revenez ici pour l'ordonner.");
    i0.ɵɵelementEnd()()();
} }
function LevelsComponent_Conditional_16_For_1_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_16_For_1_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const cycle_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openCreate(cycle_r5.id)); });
    i0.ɵɵtext(1, "+ Niveau dans ce cycle");
    i0.ɵɵelementEnd();
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const level_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", level_r6.shortName, " \u00B7 ");
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Terminal \u2014 sortie. ");
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const level_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" Passage vers ", level_r6.nextLevelName, ". ");
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sans destination de passage. ");
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const level_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", level_r6.classroomCount, " classe(s) ");
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1, "Archiv\u00E9");
    i0.ɵɵelementEnd();
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const level_r6 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.archive(level_r6)); });
    i0.ɵɵtext(1, "Archiver");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("disabled", level_r6.archivable === false);
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Conditional_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const level_r6 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.restore(level_r6)); });
    i0.ɵɵtext(1, "Restaurer");
    i0.ɵɵelementEnd();
} }
function LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const level_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openEdit(level_r6)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Conditional_2_Template, 2, 1, "button", 34)(3, LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Conditional_3_Template, 2, 0, "button", 35);
} if (rf & 2) {
    const level_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r6.status === "ACTIVE" ? 2 : 3);
} }
function LevelsComponent_Conditional_16_For_1_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 24)(1, "div", 25)(2, "span", 26);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 27)(5, "h3", 28);
    i0.ɵɵtext(6);
    i0.ɵɵelementStart(7, "span", 29);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 30);
    i0.ɵɵtemplate(10, LevelsComponent_Conditional_16_For_1_For_10_Conditional_10_Template, 1, 1)(11, LevelsComponent_Conditional_16_For_1_For_10_Conditional_11_Template, 1, 0)(12, LevelsComponent_Conditional_16_For_1_For_10_Conditional_12_Template, 1, 1)(13, LevelsComponent_Conditional_16_For_1_For_10_Conditional_13_Template, 1, 0)(14, LevelsComponent_Conditional_16_For_1_For_10_Conditional_14_Template, 1, 1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 31);
    i0.ɵɵtemplate(16, LevelsComponent_Conditional_16_For_1_For_10_Conditional_16_Template, 2, 0, "span", 32)(17, LevelsComponent_Conditional_16_For_1_For_10_Conditional_17_Template, 4, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("level--archived", level_r6.status !== "ACTIVE");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(level_r6.sequence);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", level_r6.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r6.code);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r6.shortName ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r6.terminal ? 11 : level_r6.nextLevelName ? 12 : 13);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(level_r6.classroomCount !== undefined ? 14 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r6.status !== "ACTIVE" ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canManage() ? 17 : -1);
} }
function LevelsComponent_Conditional_16_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 16)(1, "header", 17)(2, "div")(3, "h2", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 19);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, LevelsComponent_Conditional_16_For_1_Conditional_7_Template, 2, 0, "button", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "ol", 21);
    i0.ɵɵrepeaterCreate(9, LevelsComponent_Conditional_16_For_1_For_10_Template, 18, 10, "li", 22, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cycle_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(cycle_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cycle_r5.levels.length, " niveau(x)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canManage() ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(cycle_r5.levels);
} }
function LevelsComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, LevelsComponent_Conditional_16_For_1_Template, 11, 3, "section", 16, _forTrack0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.cycles());
} }
function LevelsComponent_Conditional_17_Conditional_8_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cycle_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", cycle_r12.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cycle_r12.name);
} }
function LevelsComponent_Conditional_17_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 41)(1, "span", 44);
    i0.ɵɵtext(2, "Cycle d'accueil \u2014 fig\u00E9 apr\u00E8s cr\u00E9ation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 53);
    i0.ɵɵlistener("change", function LevelsComponent_Conditional_17_Conditional_8_Template_select_change_3_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onCycleChange($event.target.value)); });
    i0.ɵɵrepeaterCreate(4, LevelsComponent_Conditional_17_Conditional_8_For_5_Template, 2, 2, "option", 54, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.cycles());
} }
function LevelsComponent_Conditional_17_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1, "Cycle : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " \u2014 un niveau ne change jamais de cycle.");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((tmp_2_0 = ctx_r1.editing().cycleName) !== null && tmp_2_0 !== undefined ? tmp_2_0 : "Cycle");
} }
function LevelsComponent_Conditional_17_Conditional_31_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const candidate_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", candidate_r13.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", candidate_r13.name, " (", candidate_r13.code, ")");
} }
function LevelsComponent_Conditional_17_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 41)(1, "span", 44);
    i0.ɵɵtext(2, "Destination de passage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 55)(4, "option", 56);
    i0.ɵɵtext(5, "\u2014 Aucune \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, LevelsComponent_Conditional_17_Conditional_31_For_7_Template, 2, 3, "option", 54, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.candidatesFor(ctx_r1.editingId()));
} }
function LevelsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_17_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 38)(2, "header", 39)(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 33);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_17_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 40);
    i0.ɵɵlistener("ngSubmit", function LevelsComponent_Conditional_17_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtemplate(8, LevelsComponent_Conditional_17_Conditional_8_Template, 6, 0, "label", 41)(9, LevelsComponent_Conditional_17_Conditional_9_Template, 5, 1, "p", 42);
    i0.ɵɵelementStart(10, "div", 43)(11, "label", 41)(12, "span", 44);
    i0.ɵɵtext(13, "Code (unique dans le cycle)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "label", 41)(16, "span", 44);
    i0.ɵɵtext(17, "Rang dans le cycle");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "label", 41)(20, "span", 44);
    i0.ɵɵtext(21, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 41)(24, "span", 44);
    i0.ɵɵtext(25, "Abr\u00E9viation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "label", 49);
    i0.ɵɵelement(28, "input", 50);
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "Niveau terminal (le passage m\u00E8ne \u00E0 la sortie)");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(31, LevelsComponent_Conditional_17_Conditional_31_Template, 8, 0, "label", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "footer", 51)(33, "button", 5);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_17_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(34, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "button", 52);
    i0.ɵɵlistener("click", function LevelsComponent_Conditional_17_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.editing() ? "Modifier " + ctx_r1.editing().name : "Nouveau niveau");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.editing() ? 8 : 9);
    i0.ɵɵadvance(23);
    i0.ɵɵconditional(!ctx_r1.form.controls.terminal.value ? 31 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.form.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement..." : ctx_r1.editing() ? "Enregistrer" : "Cr\u00E9er", " ");
} }
/**
 * Cycles et niveaux — l'ossature pédagogique de l'établissement.
 *
 * <p>Un niveau reste dans son cycle à vie : le cycle se choisit à la
 * création et ne change plus. L'écran regroupe les niveaux par cycle dans
 * l'ordre du parcours, avec classes actives, passage et archivage.</p>
 */
export class LevelsComponent {
    dataSource = inject(LEVEL_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    levels = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    showArchived = signal(false);
    editing = signal(null);
    creating = signal(false);
    canManage = computed(() => this.auth.has(PERMISSIONS.LEVEL_MANAGE));
    form = this.fb.nonNullable.group({
        cycleId: ['', [Validators.required]],
        code: ['', [Validators.required, Validators.maxLength(30)]],
        name: ['', [Validators.required, Validators.maxLength(120)]],
        shortName: ['', [Validators.maxLength(30)]],
        sequence: [1, [Validators.required, Validators.min(1)]],
        nextLevelId: [''],
        terminal: [false]
    });
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.list(this.showArchived())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => {
                this.levels.set(list);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    toggleArchived() {
        this.showArchived.update((v) => !v);
        this.load();
    }
    activeCount = computed(() => this.levels().filter((l) => l.status === 'ACTIVE').length);
    editingId = computed(() => this.editing()?.id ?? null);
    cycles = computed(() => {
        const groups = new Map();
        this.levels().forEach((level) => {
            const group = groups.get(level.cycleId);
            if (group) {
                group.levels.push(level);
            }
            else {
                groups.set(level.cycleId, {
                    id: level.cycleId,
                    name: level.cycleName ?? 'Cycle',
                    levels: [level]
                });
            }
        });
        return Array.from(groups.values());
    });
    candidatesFor(currentId) {
        return this.levels().filter((l) => l.status === 'ACTIVE' && l.id !== currentId);
    }
    nextSequence(cycleId) {
        const inCycle = this.levels().filter((l) => l.cycleId === cycleId);
        return inCycle.length === 0 ? 1 : Math.max(...inCycle.map((l) => l.sequence)) + 1;
    }
    openCreate(cycleId) {
        const target = cycleId ?? this.cycles()[0]?.id ?? '';
        this.editing.set(null);
        this.creating.set(true);
        this.form.reset({
            cycleId: target,
            code: '',
            name: '',
            shortName: '',
            sequence: target ? this.nextSequence(target) : 1,
            nextLevelId: '',
            terminal: false
        });
    }
    openEdit(level) {
        this.editing.set(level);
        this.creating.set(false);
        this.form.reset({
            cycleId: level.cycleId,
            code: level.code,
            name: level.name,
            shortName: level.shortName ?? '',
            sequence: level.sequence,
            nextLevelId: level.nextLevelId ?? '',
            terminal: level.terminal
        });
    }
    closePanel() {
        this.editing.set(null);
        this.creating.set(false);
    }
    onCycleChange(cycleId) {
        if (!this.editing()) {
            this.form.patchValue({ sequence: this.nextSequence(cycleId) });
        }
    }
    submit() {
        if (this.form.invalid || this.saving()) {
            this.form.markAllAsTouched();
            return;
        }
        const editing = this.editing();
        const value = this.form.getRawValue();
        const payload = {
            cycleId: editing ? editing.cycleId : value.cycleId,
            code: value.code.trim(),
            name: value.name.trim(),
            shortName: value.shortName.trim() || undefined,
            sequence: value.sequence,
            nextLevelId: value.terminal || !value.nextLevelId ? undefined : value.nextLevelId,
            terminal: value.terminal
        };
        this.saving.set(true);
        const request = editing
            ? this.dataSource.update(editing.id, payload)
            : this.dataSource.create(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (level) => {
                this.notifications.success(editing ? `${level.name} est à jour.` : `${level.name} a été créé.`, editing ? 'Niveau modifié' : 'Niveau créé');
                this.afterWrite();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    archive(level) {
        this.dataSource.archive(level.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.notifications.success(`${level.name} n'apparaît plus dans les listes de choix.`, 'Niveau archivé');
                this.afterWrite();
            },
            error: (err) => this.explain(err)
        });
    }
    restore(level) {
        this.dataSource.restore(level.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: () => this.afterWrite(), error: (err) => this.explain(err) });
    }
    afterWrite() {
        this.saving.set(false);
        this.closePanel();
        this.load();
        this.setupStatus.refresh();
    }
    explain(err) {
        const code = err?.error?.code;
        if (code) {
            this.notifications.error(translateErrorCode(code), 'Action refusée');
        }
    }
    static ɵfac = function LevelsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LevelsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LevelsComponent, selectors: [["eduops-levels"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 18, vars: 6, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary"], [1, "lead"], ["message", "Chargement des niveaux..."], [1, "card"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [3, "retry"], [1, "card__body"], [1, "empty__title"], [1, "empty__text"], [1, "cycle", "card"], [1, "cycle__head"], [1, "cycle__name"], [1, "cycle__meta", "numeric"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], [1, "levels"], [1, "level", 3, "level--archived"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], [1, "level"], [1, "level__main"], [1, "level__seq", "numeric"], [1, "level__identity"], [1, "level__name"], [1, "muted", "numeric"], [1, "level__sub", "numeric"], [1, "level__side"], [1, "pill", "pill--archived"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-label", "Niveau", 1, "drawer"], [1, "drawer__head"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "hint-block"], [1, "grid2"], [1, "field__label"], ["formControlName", "code", "maxlength", "30", "placeholder", "6EME", "autocomplete", "off", 1, "input"], ["type", "number", "formControlName", "sequence", "min", "1", 1, "input"], ["formControlName", "name", "maxlength", "120", "placeholder", "Sixi\u00E8me", "autocomplete", "off", 1, "input"], ["formControlName", "shortName", "maxlength", "30", "placeholder", "6e", "autocomplete", "off", 1, "input"], [1, "switch"], ["type", "checkbox", "formControlName", "terminal"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["formControlName", "cycleId", 1, "input", 3, "change"], [3, "value"], ["formControlName", "nextLevelId", 1, "input"], ["value", ""]], template: function LevelsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Cycles et niveaux");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵlistener("click", function LevelsComponent_Template_button_click_8_listener() { return ctx.toggleArchived(); });
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, LevelsComponent_Conditional_10_Template, 4, 0, "button", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "p", 7);
            i0.ɵɵtext(12, " Un niveau reste dans son cycle \u00E0 vie : d\u00E9placer une 6e du coll\u00E8ge vers le primaire orphelinerait ses classes, ses programmes et ses tarifs. Le cycle se choisit donc \u00E0 la cr\u00E9ation et ne change plus ensuite. ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, LevelsComponent_Conditional_13_Template, 1, 0, "eduops-loading-state", 8)(14, LevelsComponent_Conditional_14_Template, 1, 0, "eduops-error-state")(15, LevelsComponent_Conditional_15_Template, 6, 0, "div", 9)(16, LevelsComponent_Conditional_16_Template, 2, 0)(17, LevelsComponent_Conditional_17_Template, 37, 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2(" ", ctx.activeCount(), " niveau(x) actif(s) \u2014 ", ctx.cycles().length, " cycle(s) ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.showArchived() ? "Masquer les archiv\u00E9s" : "Voir les archiv\u00E9s", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.canManage() ? 10 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.loading() ? 13 : ctx.error() ? 14 : ctx.cycles().length === 0 ? 15 : 16);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.editing() || ctx.creating() ? 17 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.cycle[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-4);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.levels[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: 0 var(--space-4) var(--space-4); }\n\n.level[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) 0;\n  border-top: 1px solid var(--border);\n\n  &--archived { opacity: 0.62; }\n\n  &__main { display: flex; align-items: center; gap: var(--space-3); min-width: 0; }\n  &__seq {\n    display: grid; place-items: center;\n    width: 30px; height: 30px; flex: none;\n    font-weight: 700; font-size: var(--text-sm);\n    color: var(--brand); background: var(--brand-tint);\n    border-radius: var(--radius-pill);\n  }\n  &__name { margin: 0; font-size: var(--text-sm); }\n  &__sub { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__side { display: flex; align-items: center; gap: var(--space-1); flex: none; }\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n  &--archived { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.muted[_ngcontent-%COMP%] { margin-left: var(--space-2); font-size: var(--text-xs); color: var(--text-light); }\n\n.empty[_ngcontent-%COMP%] {\n  &__title { margin: 0; font-size: var(--text-md); }\n  &__text { font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed; inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: 40;\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed; top: 0; right: 0; bottom: 0;\n  width: min(440px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: 41;\n  display: flex; flex-direction: column;\n\n  &__head {\n    display: flex; align-items: center; justify-content: space-between;\n    gap: var(--space-3); padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1; overflow-y: auto;\n    display: flex; flex-direction: column; gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex; justify-content: flex-end; gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LevelsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-levels', standalone: true, imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Cycles et niveaux</h1>\n      <p class=\"page__meta numeric\">\n        {{ activeCount() }} niveau(x) actif(s) \u2014 {{ cycles().length }} cycle(s)\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"toggleArchived()\">\n        {{ showArchived() ? 'Masquer les archiv\u00E9s' : 'Voir les archiv\u00E9s' }}\n      </button>\n      @if (canManage()) {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n          <span aria-hidden=\"true\">+</span> Nouveau niveau\n        </button>\n      }\n    </div>\n  </header>\n\n  <p class=\"lead\">\n    Un niveau reste dans son cycle \u00E0 vie : d\u00E9placer une 6e du coll\u00E8ge vers le\n    primaire orphelinerait ses classes, ses programmes et ses tarifs. Le cycle\n    se choisit donc \u00E0 la cr\u00E9ation et ne change plus ensuite.\n  </p>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des niveaux...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else if (cycles().length === 0) {\n    <div class=\"card\"><div class=\"card__body\">\n      <h2 class=\"empty__title\">Aucun niveau</h2>\n      <p class=\"empty__text\">Cr\u00E9ez le premier niveau depuis l'assistant\n        d'accueil, puis revenez ici pour l'ordonner.</p>\n    </div></div>\n  } @else {\n    @for (cycle of cycles(); track cycle.id) {\n      <section class=\"cycle card\">\n        <header class=\"cycle__head\">\n          <div>\n            <h2 class=\"cycle__name\">{{ cycle.name }}</h2>\n            <p class=\"cycle__meta numeric\">{{ cycle.levels.length }} niveau(x)</p>\n          </div>\n          @if (canManage()) {\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    (click)=\"openCreate(cycle.id)\">+ Niveau dans ce cycle</button>\n          }\n        </header>\n        <ol class=\"levels\">\n          @for (level of cycle.levels; track level.id) {\n            <li class=\"level\" [class.level--archived]=\"level.status !== 'ACTIVE'\">\n              <div class=\"level__main\">\n                <span class=\"level__seq numeric\">{{ level.sequence }}</span>\n                <div class=\"level__identity\">\n                  <h3 class=\"level__name\">{{ level.name }}\n                    <span class=\"muted numeric\">{{ level.code }}</span>\n                  </h3>\n                  <p class=\"level__sub numeric\">\n                    @if (level.shortName) { {{ level.shortName }} \u00B7 }\n                    @if (level.terminal) { Terminal \u2014 sortie. }\n                    @else if (level.nextLevelName) { Passage vers {{ level.nextLevelName }}. }\n                    @else { Sans destination de passage. }\n                    @if (level.classroomCount !== undefined) {\n                      \u00B7 {{ level.classroomCount }} classe(s)\n                    }\n                  </p>\n                </div>\n              </div>\n              <div class=\"level__side\">\n                @if (level.status !== 'ACTIVE') {\n                  <span class=\"pill pill--archived\">Archiv\u00E9</span>\n                }\n                @if (canManage()) {\n                  <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                          (click)=\"openEdit(level)\">Modifier</button>\n                  @if (level.status === 'ACTIVE') {\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            [disabled]=\"level.archivable === false\"\n                            (click)=\"archive(level)\">Archiver</button>\n                  } @else {\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            (click)=\"restore(level)\">Restaurer</button>\n                  }\n                }\n              </div>\n            </li>\n          }\n        </ol>\n      </section>\n    }\n  }\n\n  @if (editing() || creating()) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Niveau\">\n      <header class=\"drawer__head\">\n        <h2>{{ editing() ? 'Modifier ' + editing()!.name : 'Nouveau niveau' }}</h2>\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"closePanel()\">\u2715</button>\n      </header>\n      <form class=\"drawer__body\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        @if (!editing()) {\n          <label class=\"field\">\n            <span class=\"field__label\">Cycle d'accueil \u2014 fig\u00E9 apr\u00E8s cr\u00E9ation</span>\n            <select class=\"input\" formControlName=\"cycleId\"\n                    (change)=\"onCycleChange($any($event.target).value)\">\n              @for (cycle of cycles(); track cycle.id) {\n                <option [value]=\"cycle.id\">{{ cycle.name }}</option>\n              }\n            </select>\n          </label>\n        } @else {\n          <p class=\"hint-block\">Cycle : <strong>{{ editing()!.cycleName ?? 'Cycle' }}</strong>\n            \u2014 un niveau ne change jamais de cycle.</p>\n        }\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Code (unique dans le cycle)</span>\n            <input class=\"input\" formControlName=\"code\" maxlength=\"30\"\n                   placeholder=\"6EME\" autocomplete=\"off\" />\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">Rang dans le cycle</span>\n            <input class=\"input\" type=\"number\" formControlName=\"sequence\" min=\"1\" />\n          </label>\n        </div>\n        <label class=\"field\">\n          <span class=\"field__label\">Nom</span>\n          <input class=\"input\" formControlName=\"name\" maxlength=\"120\"\n                 placeholder=\"Sixi\u00E8me\" autocomplete=\"off\" />\n        </label>\n        <label class=\"field\">\n          <span class=\"field__label\">Abr\u00E9viation</span>\n          <input class=\"input\" formControlName=\"shortName\" maxlength=\"30\"\n                 placeholder=\"6e\" autocomplete=\"off\" />\n        </label>\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"terminal\" />\n          <span>Niveau terminal (le passage m\u00E8ne \u00E0 la sortie)</span>\n        </label>\n        @if (!form.controls.terminal.value) {\n          <label class=\"field\">\n            <span class=\"field__label\">Destination de passage</span>\n            <select class=\"input\" formControlName=\"nextLevelId\">\n              <option value=\"\">\u2014 Aucune \u2014</option>\n              @for (candidate of candidatesFor(editingId()); track candidate.id) {\n                <option [value]=\"candidate.id\">{{ candidate.name }} ({{ candidate.code }})</option>\n              }\n            </select>\n          </label>\n        }\n      </form>\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"form.invalid || saving()\" (click)=\"submit()\">\n          {{ saving() ? 'Enregistrement...' : (editing() ? 'Enregistrer' : 'Cr\u00E9er') }}\n        </button>\n      </footer>\n    </aside>\n  }\n</div>", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.cycle {\n  margin-bottom: var(--space-4);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.levels { list-style: none; margin: 0; padding: 0 var(--space-4) var(--space-4); }\n\n.level {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) 0;\n  border-top: 1px solid var(--border);\n\n  &--archived { opacity: 0.62; }\n\n  &__main { display: flex; align-items: center; gap: var(--space-3); min-width: 0; }\n  &__seq {\n    display: grid; place-items: center;\n    width: 30px; height: 30px; flex: none;\n    font-weight: 700; font-size: var(--text-sm);\n    color: var(--brand); background: var(--brand-tint);\n    border-radius: var(--radius-pill);\n  }\n  &__name { margin: 0; font-size: var(--text-sm); }\n  &__sub { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__side { display: flex; align-items: center; gap: var(--space-1); flex: none; }\n}\n\n.pill {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n  &--archived { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.muted { margin-left: var(--space-2); font-size: var(--text-xs); color: var(--text-light); }\n\n.empty {\n  &__title { margin: 0; font-size: var(--text-md); }\n  &__text { font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.drawer-backdrop {\n  position: fixed; inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: 40;\n}\n\n.drawer {\n  position: fixed; top: 0; right: 0; bottom: 0;\n  width: min(440px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: 41;\n  display: flex; flex-direction: column;\n\n  &__head {\n    display: flex; align-items: center; justify-content: space-between;\n    gap: var(--space-3); padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1; overflow-y: auto;\n    display: flex; flex-direction: column; gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex; justify-content: flex-end; gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LevelsComponent, { className: "LevelsComponent", filePath: "frontend/src/app/features/levels/levels.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=levels.component.js.map