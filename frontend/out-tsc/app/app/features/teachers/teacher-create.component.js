import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CURRICULUM_DATA_SOURCE, REFERENCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { CONTRACT_TYPES } from '@core/models/teacher.models';
import { SUBJECT_CATEGORIES, SUBJECT_COLORS } from '@core/models/curriculum.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { TeacherAccountService } from '@core/services/teacher-account.service';
import { PERMISSIONS } from '@core/models/auth.models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
function TeacherCreateComponent_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const account_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", account_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", account_r1.firstName, " ", account_r1.lastName, " \u2014 ", account_r1.email, "");
} }
function TeacherCreateComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "S\u00E9lectionnez le compte de l\u2019enseignant.");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Chargement des utilisateurs\u2026");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1, "Impossible de charger les utilisateurs.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 34);
    i0.ɵɵlistener("click", function TeacherCreateComponent_Conditional_22_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.loadAccounts()); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucun utilisateur Enseignant disponible. Cr\u00E9ez un utilisateur ou attribuez ce profil \u00E0 un compte existant dans Utilisateurs.");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵtext(1, "G\u00E9rer les utilisateurs et leurs profils");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", subject_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(subject_r4);
} }
function TeacherCreateComponent_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1, "+ Cr\u00E9er une nouvelle mati\u00E8re\u2026");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_44_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Saisissez une sp\u00E9cialit\u00E9 (150 caract\u00E8res maximum).");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 35);
    i0.ɵɵtext(1, "Sp\u00E9cialit\u00E9 personnalis\u00E9e *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "input", 36);
    i0.ɵɵtemplate(3, TeacherCreateComponent_Conditional_44_Conditional_3_Template, 2, 0, "small", 11);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-invalid", ctx_r2.invalid("specialityCustom"));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.invalid("specialityCustom") ? 3 : -1);
} }
function TeacherCreateComponent_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Chargement du catalogue\u2026");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small", 29);
    i0.ɵɵtext(1, "Impossible de charger le catalogue.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 34);
    i0.ɵɵlistener("click", function TeacherCreateComponent_Conditional_46_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.loadSubjects()); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Choisissez une sp\u00E9cialit\u00E9 du catalogue ou \u00AB Autre \u00BB.");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function TeacherCreateComponent_Conditional_48_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openSubjectDialog()); });
    i0.ɵɵtext(1, " La mati\u00E8re n\u2019existe pas ? La cr\u00E9er dans le catalogue ");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "Mati\u00E8re manquante ? Demandez \u00E0 un administrateur de l\u2019ajouter via ");
    i0.ɵɵelementStart(2, "a", 38);
    i0.ɵɵtext(3, "Mati\u00E8res et programme");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ".");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Choisissez une date d\u2019embauche.");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_For_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contract_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", contract_r7.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(contract_r7.label);
} }
function TeacherCreateComponent_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Saisissez un nombre entier entre 1 et 60.");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error());
} }
function TeacherCreateComponent_Conditional_76_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Saisissez le nom de la mati\u00E8re.");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_76_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Saisissez un code court (lettres, chiffres).");
    i0.ɵɵelementEnd();
} }
function TeacherCreateComponent_Conditional_76_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r9.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r9.label);
} }
function TeacherCreateComponent_Conditional_76_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.subjectError());
} }
function TeacherCreateComponent_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵlistener("click", function TeacherCreateComponent_Conditional_76_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeSubjectDialog()); });
    i0.ɵɵelementStart(1, "div", 40);
    i0.ɵɵlistener("click", function TeacherCreateComponent_Conditional_76_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Cr\u00E9er une mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 41);
    i0.ɵɵtext(5, "Elle sera ajout\u00E9e au catalogue puis s\u00E9lectionn\u00E9e comme sp\u00E9cialit\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "form", 5);
    i0.ɵɵlistener("ngSubmit", function TeacherCreateComponent_Conditional_76_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.createSubject()); });
    i0.ɵɵelementStart(7, "div", 14)(8, "label", 42);
    i0.ɵɵtext(9, "Nom *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 43);
    i0.ɵɵtemplate(11, TeacherCreateComponent_Conditional_76_Conditional_11_Template, 2, 0, "small", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 14)(13, "label", 44);
    i0.ɵɵtext(14, "Code *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 45);
    i0.ɵɵtemplate(16, TeacherCreateComponent_Conditional_76_Conditional_16_Template, 2, 0, "small", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 14)(18, "label", 46);
    i0.ɵɵtext(19, "Cat\u00E9gorie *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "select", 47);
    i0.ɵɵrepeaterCreate(21, TeacherCreateComponent_Conditional_76_For_22_Template, 2, 2, "option", 10, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "label", 48);
    i0.ɵɵelement(24, "input", 49);
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26, "Mati\u00E8re not\u00E9e (entre dans les moyennes)");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(27, TeacherCreateComponent_Conditional_76_Conditional_27_Template, 2, 1, "p", 29);
    i0.ɵɵelementStart(28, "div", 50)(29, "button", 31);
    i0.ɵɵlistener("click", function TeacherCreateComponent_Conditional_76_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeSubjectDialog()); });
    i0.ɵɵtext(30, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "button", 32);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r2.subjectForm);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r2.subjectForm.controls.name.touched && ctx_r2.subjectForm.controls.name.invalid ? 11 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r2.subjectForm.controls.code.touched && ctx_r2.subjectForm.controls.code.invalid ? 16 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.categories);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r2.subjectError() ? 27 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.savingSubject());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.savingSubject());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.savingSubject() ? "Cr\u00E9ation\u2026" : "Cr\u00E9er la mati\u00E8re");
} }
export class TeacherCreateComponent {
    data = inject(TEACHER_DATA_SOURCE);
    accountService = inject(TeacherAccountService);
    accounts = signal([]);
    loadingAccounts = signal(true);
    accountsError = signal(false);
    reference = inject(REFERENCE_DATA_SOURCE);
    curriculum = inject(CURRICULUM_DATA_SOURCE);
    auth = inject(AuthService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    fb = inject(FormBuilder);
    saving = signal(false);
    error = signal('');
    loadingSubjects = signal(true);
    subjectsError = signal(false);
    subjectOptions = signal([]);
    categories = SUBJECT_CATEGORIES;
    contracts = CONTRACT_TYPES;
    form = this.fb.nonNullable.group({
        userAccountId: ['', Validators.required],
        speciality: ['', Validators.maxLength(150)],
        specialityCustom: ['', Validators.maxLength(150)],
        qualification: ['', Validators.maxLength(150)],
        hireDate: ['', Validators.required],
        contractType: ['PERMANENT', Validators.required],
        weeklyHoursMax: [24, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern(/^\d+$/)]]
    });
    subjectForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_-]+$/)]],
        name: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(/\S/)]],
        category: ['SCIENCE', [Validators.required]],
        graded: [true]
    });
    subjectDialogOpen = signal(false);
    savingSubject = signal(false);
    subjectError = signal('');
    showCustomSpeciality() { return this.form.controls.speciality.value === '__other'; }
    constructor() {
        this.loadAccounts();
        this.loadSubjects();
        this.form.controls.speciality.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(value => {
            const custom = this.form.controls.specialityCustom;
            custom.setValidators(value === '__other'
                ? [Validators.required, Validators.pattern(/\S/), Validators.maxLength(150)]
                : [Validators.maxLength(150)]);
            if (value !== '__other')
                custom.reset('', { emitEvent: false });
            custom.updateValueAndValidity({ emitEvent: false });
            if (value === '__new')
                this.openSubjectDialog();
        });
    }
    loadSubjects() {
        this.loadingSubjects.set(true);
        this.subjectsError.set(false);
        this.reference.subjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: list => {
                this.subjectOptions.set([...new Set(list.map(s => s.name.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr')));
                this.loadingSubjects.set(false);
            },
            error: () => { this.loadingSubjects.set(false); this.subjectsError.set(true); }
        });
    }
    canManageUsers() { return this.auth.has(PERMISSIONS.USER_MANAGE); }
    loadAccounts() {
        this.loadingAccounts.set(true);
        this.accountsError.set(false);
        this.accountService.available().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: accounts => {
                this.accounts.set(accounts);
                this.loadingAccounts.set(false);
                this.preselectAccount(accounts);
            },
            error: () => { this.accountsError.set(true); this.loadingAccounts.set(false); }
        });
    }
    /**
     * Un compte peut arriver ici depuis la liste des utilisateurs. On ne
     * présélectionne que s'il est réellement disponible : le proposer alors
     * qu'il a déjà une fiche ferait échouer l'enregistrement pour rien.
     */
    preselectAccount(accounts) {
        const requested = this.route.snapshot.queryParamMap.get('accountId');
        if (requested && accounts.some(account => account.id === requested)) {
            this.form.controls.userAccountId.setValue(requested);
        }
    }
    canManageSubjects() {
        return this.auth.has(PERMISSIONS.SUBJECT_MANAGE);
    }
    openSubjectDialog() {
        if (!this.canManageSubjects())
            return;
        const current = this.form.controls.specialityCustom.value.trim()
            || (this.form.controls.speciality.value.startsWith('__') ? '' : this.form.controls.speciality.value.trim());
        this.subjectForm.reset({ code: '', name: current, category: 'SCIENCE', graded: true });
        this.subjectError.set('');
        this.subjectDialogOpen.set(true);
    }
    closeSubjectDialog() {
        if (this.savingSubject())
            return;
        this.subjectDialogOpen.set(false);
        if (this.form.controls.speciality.value === '__new')
            this.form.controls.speciality.setValue('');
    }
    createSubject() {
        if (this.savingSubject() || !this.canManageSubjects())
            return;
        this.subjectForm.markAllAsTouched();
        if (this.subjectForm.invalid)
            return;
        const value = this.subjectForm.getRawValue();
        this.savingSubject.set(true);
        this.subjectError.set('');
        this.curriculum.createSubject({
            code: value.code.trim().toUpperCase(), name: value.name.trim(), category: value.category,
            colorHex: SUBJECT_COLORS[0], graded: value.graded
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (subject) => {
                this.savingSubject.set(false);
                this.subjectDialogOpen.set(false);
                this.reloadSubjects(subject.name);
                this.notifications.success(`${subject.name} a été ajoutée au catalogue.`, 'Matière créée');
            },
            error: (err) => {
                this.savingSubject.set(false);
                this.subjectError.set(err.status === 409
                    ? 'Ce code est déjà utilisé par une autre matière.'
                    : 'Impossible de créer la matière. Vérifiez les informations et réessayez.');
            }
        });
    }
    reloadSubjects(selectName) {
        this.loadingSubjects.set(true);
        this.curriculum.listSubjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (list) => {
                const names = [...new Set(list.filter((s) => s.status === 'ACTIVE').map((s) => s.name.trim()).filter(Boolean))]
                    .sort((a, b) => a.localeCompare(b, 'fr'));
                this.subjectOptions.set(names);
                this.loadingSubjects.set(false);
                this.form.controls.speciality.setValue(selectName.trim());
            },
            error: () => {
                this.loadingSubjects.set(false);
                this.form.controls.speciality.setValue(selectName.trim());
                this.subjectOptions.update(names => names.includes(selectName.trim()) ? names : [...names, selectName.trim()]);
            }
        });
    }
    invalid(key) {
        const control = this.form.get(key);
        return !!control && control.touched && control.invalid;
    }
    cancel() { void this.router.navigate(['/teachers']); }
    save() {
        if (this.saving() || this.loadingAccounts() || this.accountsError() || this.subjectDialogOpen())
            return;
        if (!this.accounts().some(account => account.id === this.form.controls.userAccountId.value)) {
            this.form.controls.userAccountId.setErrors({ unavailable: true });
        }
        let rawSpeciality = this.form.controls.speciality.value;
        const custom = this.form.controls.specialityCustom;
        if (rawSpeciality === '__new') {
            this.form.controls.speciality.setValue('');
            rawSpeciality = '';
        }
        if (rawSpeciality === '__other' && !custom.value.trim()) {
            custom.setErrors({ required: true });
        }
        this.form.markAllAsTouched();
        if (this.form.invalid)
            return;
        const value = this.form.getRawValue();
        const { specialityCustom: _ignored, ...rest } = value;
        const speciality = rawSpeciality === '__other' ? custom.value.trim() : (rawSpeciality || '').trim();
        this.saving.set(true);
        this.error.set('');
        this.data.create({ ...rest, speciality, qualification: value.qualification.trim() })
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: teacher => {
                this.notifications.success(`L’enseignant ${teacher.fullName} a été créé (${teacher.employeeNumber}).`);
                void this.router.navigate(['/teachers']);
            },
            error: err => {
                this.saving.set(false);
                this.error.set(err?.error?.message ?? 'Impossible de créer la fiche enseignant. Vérifiez le compte sélectionné.');
            }
        });
    }
    static ɵfac = function TeacherCreateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherCreateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherCreateComponent, selectors: [["eduops-teacher-create"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 77, vars: 23, consts: [[1, "page"], [1, "page__header"], ["routerLink", "/teachers"], [1, "page__title"], [1, "page__meta"], [3, "ngSubmit", "formGroup"], [1, "card", 3, "disabled"], ["for", "userAccountId"], ["id", "userAccountId", "formControlName", "userAccountId", 1, "input"], ["value", ""], [3, "value"], [1, "field-error"], ["routerLink", "/users"], [1, "form-grid"], [1, "field"], ["for", "speciality"], ["id", "speciality", "formControlName", "speciality", 1, "input"], ["value", "__other"], ["value", "__new"], ["type", "button", 1, "link", 2, "margin-top", "6px"], [1, "field-hint"], ["for", "qualification"], ["id", "qualification", "formControlName", "qualification", "maxlength", "150", 1, "input"], ["for", "hireDate"], ["id", "hireDate", "type", "date", "formControlName", "hireDate", 1, "input"], ["for", "contractType"], ["id", "contractType", "formControlName", "contractType", 1, "input"], ["for", "weeklyHoursMax"], ["id", "weeklyHoursMax", "type", "number", "min", "1", "max", "60", "step", "1", "formControlName", "weeklyHoursMax", 1, "input"], ["role", "alert", 1, "field-error"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], [1, "dialog-backdrop"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["for", "specialityCustom"], ["id", "specialityCustom", "formControlName", "specialityCustom", "maxlength", "150", "placeholder", "Pr\u00E9cisez la sp\u00E9cialit\u00E9", 1, "input"], ["type", "button", 1, "link", 2, "margin-top", "6px", 3, "click"], ["routerLink", "/subjects"], [1, "dialog-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-label", "Cr\u00E9er une mati\u00E8re", 1, "dialog", 3, "click"], [1, "dialog__hint"], ["for", "newSubjectName"], ["id", "newSubjectName", "formControlName", "name", "maxlength", "150", "placeholder", "Ex. : Informatique", 1, "input"], ["for", "newSubjectCode"], ["id", "newSubjectCode", "formControlName", "code", "maxlength", "20", "placeholder", "Ex. : INFO", 1, "input", 2, "text-transform", "uppercase"], ["for", "newSubjectCategory"], ["id", "newSubjectCategory", "formControlName", "category", 1, "input"], [1, "check"], ["type", "checkbox", "formControlName", "graded"], [1, "dialog__actions"]], template: function TeacherCreateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "a", 2);
            i0.ɵɵtext(4, "\u2190 Enseignants");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Nouvel enseignant");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "S\u00E9lectionnez un utilisateur ayant le profil Enseignant et compl\u00E9tez sa fiche p\u00E9dagogique.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "form", 5);
            i0.ɵɵlistener("ngSubmit", function TeacherCreateComponent_Template_form_ngSubmit_9_listener() { return ctx.save(); });
            i0.ɵɵelementStart(10, "fieldset", 6)(11, "legend");
            i0.ɵɵtext(12, "Compte utilisateur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "label", 7);
            i0.ɵɵtext(14, "Utilisateur avec le profil Enseignant *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "select", 8)(16, "option", 9);
            i0.ɵɵtext(17, "S\u00E9lectionner un utilisateur\u2026");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(18, TeacherCreateComponent_For_19_Template, 2, 4, "option", 10, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, TeacherCreateComponent_Conditional_20_Template, 2, 0, "small", 11)(21, TeacherCreateComponent_Conditional_21_Template, 2, 0, "p")(22, TeacherCreateComponent_Conditional_22_Template, 4, 0)(23, TeacherCreateComponent_Conditional_23_Template, 2, 0, "p")(24, TeacherCreateComponent_Conditional_24_Template, 2, 0, "a", 12);
            i0.ɵɵelementStart(25, "p");
            i0.ɵɵtext(26, "Le nom et les coordonn\u00E9es proviennent du compte utilisateur. Un compte poss\u00E8de une seule fiche enseignant.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "fieldset", 6)(28, "legend");
            i0.ɵɵtext(29, "Informations professionnelles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "p");
            i0.ɵɵtext(31, "Le matricule sera attribu\u00E9 automatiquement. Le dossier sera cr\u00E9\u00E9 avec le statut actif.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 13)(33, "div", 14)(34, "label", 15);
            i0.ɵɵtext(35, "Sp\u00E9cialit\u00E9 (mati\u00E8re)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "select", 16)(37, "option", 9);
            i0.ɵɵtext(38, "Choisir dans le catalogue\u2026");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(39, TeacherCreateComponent_For_40_Template, 2, 2, "option", 10, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementStart(41, "option", 17);
            i0.ɵɵtext(42, "Autre (saisie libre)\u2026");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(43, TeacherCreateComponent_Conditional_43_Template, 2, 0, "option", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(44, TeacherCreateComponent_Conditional_44_Template, 4, 2)(45, TeacherCreateComponent_Conditional_45_Template, 2, 0, "small")(46, TeacherCreateComponent_Conditional_46_Template, 4, 0)(47, TeacherCreateComponent_Conditional_47_Template, 2, 0, "small", 11)(48, TeacherCreateComponent_Conditional_48_Template, 2, 0, "button", 19)(49, TeacherCreateComponent_Conditional_49_Template, 5, 0, "small", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 14)(51, "label", 21);
            i0.ɵɵtext(52, "Dipl\u00F4me / qualification");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(53, "input", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 14)(55, "label", 23);
            i0.ɵɵtext(56, "Date d\u2019embauche *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(57, "input", 24);
            i0.ɵɵtemplate(58, TeacherCreateComponent_Conditional_58_Template, 2, 0, "small", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div", 14)(60, "label", 25);
            i0.ɵɵtext(61, "Type de contrat *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "select", 26);
            i0.ɵɵrepeaterCreate(63, TeacherCreateComponent_For_64_Template, 2, 2, "option", 10, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "div", 14)(66, "label", 27);
            i0.ɵɵtext(67, "Maximum d\u2019heures par semaine *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(68, "input", 28);
            i0.ɵɵtemplate(69, TeacherCreateComponent_Conditional_69_Template, 2, 0, "small", 11);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(70, TeacherCreateComponent_Conditional_70_Template, 2, 1, "p", 29);
            i0.ɵɵelementStart(71, "div", 30)(72, "button", 31);
            i0.ɵɵlistener("click", function TeacherCreateComponent_Template_button_click_72_listener() { return ctx.cancel(); });
            i0.ɵɵtext(73, "Annuler");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "button", 32);
            i0.ɵɵtext(75);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(76, TeacherCreateComponent_Conditional_76_Template, 33, 7, "div", 33);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.accounts());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.invalid("userAccountId") ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loadingAccounts() ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.accountsError() ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.loadingAccounts() && !ctx.accountsError() && !ctx.accounts().length ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.canManageUsers() ? 24 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance(12);
            i0.ɵɵrepeater(ctx.subjectOptions());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.canManageSubjects() ? 43 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showCustomSpeciality() ? 44 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loadingSubjects() ? 45 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.subjectsError() ? 46 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.invalid("speciality") ? 47 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.canManageSubjects() ? 48 : 49);
            i0.ɵɵadvance(9);
            i0.ɵɵattribute("aria-invalid", ctx.invalid("hireDate"));
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.invalid("hireDate") ? 58 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.contracts);
            i0.ɵɵadvance(5);
            i0.ɵɵattribute("aria-invalid", ctx.invalid("weeklyHoursMax"));
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.invalid("weeklyHoursMax") ? 69 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 70 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.saving() || ctx.loadingAccounts() || ctx.accountsError() || !ctx.accounts().length || ctx.subjectDialogOpen());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.saving() ? "Enregistrement\u2026" : "Cr\u00E9er l\u2019enseignant");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.subjectDialogOpen() ? 76 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] { display: block; }\n    form[_ngcontent-%COMP%] { max-width: 960px; }\n    fieldset[_ngcontent-%COMP%] { min-width: 0; padding: 24px; margin: 0 0 24px; }\n    legend[_ngcontent-%COMP%] { font-weight: 600; padding: 0 8px; color: var(--text-strong); }\n    fieldset[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin-top: 0; color: var(--text-muted); }\n    .form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 8px; }\n    label[_ngcontent-%COMP%] { font-weight: 500; }\n    .field-error[_ngcontent-%COMP%] { color: var(--danger, #b42318); }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 12px; }\n    .dialog-backdrop[_ngcontent-%COMP%] { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55);\n      display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 60; }\n    .dialog[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; padding: 24px; width: min(480px, 100%);\n      box-shadow: 0 24px 64px rgba(15, 23, 42, 0.28); }\n    .dialog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0 0 4px; font-size: 1.25rem; }\n    .dialog__hint[_ngcontent-%COMP%] { margin: 0 0 16px; color: var(--text-muted); }\n    .dialog[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] { margin-bottom: 12px; }\n    .dialog[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] { display: flex; gap: 8px; align-items: center; margin: 12px 0 4px; }\n    .dialog__actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }\n    @media (max-width: 640px) { .form-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } fieldset[_ngcontent-%COMP%] { padding: 16px; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherCreateComponent, [{
        type: Component,
        args: [{ selector: 'eduops-teacher-create', standalone: true, imports: [ReactiveFormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <header class="page__header">
        <div>
          <a routerLink="/teachers">← Enseignants</a>
          <h1 class="page__title">Nouvel enseignant</h1>
          <p class="page__meta">Sélectionnez un utilisateur ayant le profil Enseignant et complétez sa fiche pédagogique.</p>
        </div>
      </header>
      <form [formGroup]="form" (ngSubmit)="save()">
        <fieldset class="card" [disabled]="saving()">
          <legend>Compte utilisateur</legend>
          <label for="userAccountId">Utilisateur avec le profil Enseignant *</label>
          <select class="input" id="userAccountId" formControlName="userAccountId">
            <option value="">Sélectionner un utilisateur…</option>
            @for (account of accounts(); track account.id) {
              <option [value]="account.id">{{ account.firstName }} {{ account.lastName }} — {{ account.email }}</option>
            }
          </select>
          @if (invalid('userAccountId')) { <small class="field-error">Sélectionnez le compte de l’enseignant.</small> }
          @if (loadingAccounts()) { <p>Chargement des utilisateurs…</p> }
          @if (accountsError()) { <p class="field-error">Impossible de charger les utilisateurs.</p><button type="button" class="btn btn--secondary" (click)="loadAccounts()">Réessayer</button> }
          @if (!loadingAccounts() && !accountsError() && !accounts().length) {
            <p>Aucun utilisateur Enseignant disponible. Créez un utilisateur ou attribuez ce profil à un compte existant dans Utilisateurs.</p>
          }
          @if (canManageUsers()) { <a routerLink="/users">Gérer les utilisateurs et leurs profils</a> }
          <p>Le nom et les coordonnées proviennent du compte utilisateur. Un compte possède une seule fiche enseignant.</p>
        </fieldset>
        <fieldset class="card" [disabled]="saving()">
          <legend>Informations professionnelles</legend>
          <p>Le matricule sera attribué automatiquement. Le dossier sera créé avec le statut actif.</p>
          <div class="form-grid">
            <div class="field"><label for="speciality">Spécialité (matière)</label>
              <select id="speciality" class="input" formControlName="speciality">
                <option value="">Choisir dans le catalogue…</option>
                @for (subject of subjectOptions(); track subject) { <option [value]="subject">{{ subject }}</option> }
                <option value="__other">Autre (saisie libre)…</option>
                @if (canManageSubjects()) { <option value="__new">+ Créer une nouvelle matière…</option> }
              </select>
              @if (showCustomSpeciality()) {
                <label for="specialityCustom">Spécialité personnalisée *</label>
                <input id="specialityCustom" class="input" formControlName="specialityCustom" maxlength="150"
                  placeholder="Précisez la spécialité" [attr.aria-invalid]="invalid('specialityCustom')" />
                @if (invalid('specialityCustom')) { <small class="field-error">Saisissez une spécialité (150 caractères maximum).</small> }
              }
              @if (loadingSubjects()) { <small>Chargement du catalogue…</small> }
              @if (subjectsError()) { <small class="field-error" role="alert">Impossible de charger le catalogue.</small><button type="button" class="btn btn--secondary" (click)="loadSubjects()">Réessayer</button> }
              @if (invalid('speciality')) { <small class="field-error">Choisissez une spécialité du catalogue ou « Autre ».</small> }
              @if (canManageSubjects()) {
                <button type="button" class="link" (click)="openSubjectDialog()" style="margin-top: 6px">
                  La matière n’existe pas ? La créer dans le catalogue
                </button>
              } @else {
                <small class="field-hint">Matière manquante ? Demandez à un administrateur de l’ajouter via <a routerLink="/subjects">Matières et programme</a>.</small>
              }
            </div>
            <div class="field"><label for="qualification">Diplôme / qualification</label><input id="qualification" class="input" formControlName="qualification" maxlength="150" /></div>
            <div class="field"><label for="hireDate">Date d’embauche *</label><input id="hireDate" class="input" type="date" formControlName="hireDate" [attr.aria-invalid]="invalid('hireDate')" />
              @if (invalid('hireDate')) { <small class="field-error">Choisissez une date d’embauche.</small> }
            </div>
            <div class="field"><label for="contractType">Type de contrat *</label><select id="contractType" class="input" formControlName="contractType">
              @for (contract of contracts; track contract.code) { <option [value]="contract.code">{{ contract.label }}</option> }
            </select></div>
            <div class="field"><label for="weeklyHoursMax">Maximum d’heures par semaine *</label><input id="weeklyHoursMax" class="input" type="number" min="1" max="60" step="1" formControlName="weeklyHoursMax" [attr.aria-invalid]="invalid('weeklyHoursMax')" />
              @if (invalid('weeklyHoursMax')) { <small class="field-error">Saisissez un nombre entier entre 1 et 60.</small> }
            </div>
          </div>
        </fieldset>
        @if (error()) { <p class="field-error" role="alert">{{ error() }}</p> }
        <div class="form-actions">
          <button type="button" class="btn btn--secondary" [disabled]="saving()" (click)="cancel()">Annuler</button>
          <button type="submit" class="btn btn--primary" [disabled]="saving() || loadingAccounts() || accountsError() || !accounts().length || subjectDialogOpen()">{{ saving() ? 'Enregistrement…' : 'Créer l’enseignant' }}</button>
        </div>
      </form>
      @if (subjectDialogOpen()) {
        <div class="dialog-backdrop" (click)="closeSubjectDialog()">
          <div class="dialog" role="dialog" aria-modal="true" aria-label="Créer une matière" (click)="$event.stopPropagation()">
            <h2>Créer une matière</h2>
            <p class="dialog__hint">Elle sera ajoutée au catalogue puis sélectionnée comme spécialité.</p>
            <form [formGroup]="subjectForm" (ngSubmit)="createSubject()">
              <div class="field">
                <label for="newSubjectName">Nom *</label>
                <input id="newSubjectName" class="input" formControlName="name" maxlength="150" placeholder="Ex. : Informatique" />
                @if (subjectForm.controls.name.touched && subjectForm.controls.name.invalid) {
                  <small class="field-error">Saisissez le nom de la matière.</small>
                }
              </div>
              <div class="field">
                <label for="newSubjectCode">Code *</label>
                <input id="newSubjectCode" class="input" formControlName="code" maxlength="20" placeholder="Ex. : INFO" style="text-transform: uppercase" />
                @if (subjectForm.controls.code.touched && subjectForm.controls.code.invalid) {
                  <small class="field-error">Saisissez un code court (lettres, chiffres).</small>
                }
              </div>
              <div class="field">
                <label for="newSubjectCategory">Catégorie *</label>
                <select id="newSubjectCategory" class="input" formControlName="category">
                  @for (category of categories; track category.code) {
                    <option [value]="category.code">{{ category.label }}</option>
                  }
                </select>
              </div>
              <label class="check">
                <input type="checkbox" formControlName="graded" />
                <span>Matière notée (entre dans les moyennes)</span>
              </label>
              @if (subjectError()) { <p class="field-error" role="alert">{{ subjectError() }}</p> }
              <div class="dialog__actions">
                <button type="button" class="btn btn--secondary" [disabled]="savingSubject()" (click)="closeSubjectDialog()">Annuler</button>
                <button type="submit" class="btn btn--primary" [disabled]="savingSubject()">{{ savingSubject() ? 'Création…' : 'Créer la matière' }}</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `, styles: ["\n    :host { display: block; }\n    form { max-width: 960px; }\n    fieldset { min-width: 0; padding: 24px; margin: 0 0 24px; }\n    legend { font-weight: 600; padding: 0 8px; color: var(--text-strong); }\n    fieldset p { margin-top: 0; color: var(--text-muted); }\n    .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }\n    .field { display: flex; flex-direction: column; gap: 8px; }\n    label { font-weight: 500; }\n    .field-error { color: var(--danger, #b42318); }\n    .form-actions { display: flex; justify-content: flex-end; gap: 12px; }\n    .dialog-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55);\n      display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 60; }\n    .dialog { background: #fff; border-radius: 12px; padding: 24px; width: min(480px, 100%);\n      box-shadow: 0 24px 64px rgba(15, 23, 42, 0.28); }\n    .dialog h2 { margin: 0 0 4px; font-size: 1.25rem; }\n    .dialog__hint { margin: 0 0 16px; color: var(--text-muted); }\n    .dialog .field { margin-bottom: 12px; }\n    .dialog .check { display: flex; gap: 8px; align-items: center; margin: 12px 0 4px; }\n    .dialog__actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }\n    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } fieldset { padding: 16px; } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherCreateComponent, { className: "TeacherCreateComponent", filePath: "frontend/src/app/features/teachers/teacher-create.component.ts", lineNumber: 158 }); })();
//# sourceMappingURL=teacher-create.component.js.map