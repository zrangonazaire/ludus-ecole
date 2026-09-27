import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolLogoComponent } from './school-logo.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { COMMON_LOCALES, COMMON_TIMEZONES } from '@core/models/school-settings.models';
import { NotificationService } from '@core/services/notification.service';
import { SchoolSettingsService } from '@core/services/school-settings.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AdministrationComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function AdministrationComponent_Conditional_7_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.reset()); });
    i0.ɵɵtext(1, " Annuler les modifications ");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, AdministrationComponent_Conditional_7_Conditional_1_Template, 2, 0, "button", 5);
    i0.ɵɵelementStart(2, "button", 6);
    i0.ɵɵlistener("click", function AdministrationComponent_Conditional_7_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.dirty() ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.form.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Enregistrer", " ");
} }
function AdministrationComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 3);
} }
function AdministrationComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 8);
    i0.ɵɵlistener("retry", function AdministrationComponent_Conditional_9_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Le nom est obligatoire.");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Adresse e-mail invalide.");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Le pays est obligatoire.");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Trois majuscules, ex. XOF.");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_For_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const locale_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", locale_r6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(locale_r6);
} }
function AdministrationComponent_Conditional_10_For_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "option", 36);
} if (rf & 2) {
    const zone_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", zone_r7);
} }
function AdministrationComponent_Conditional_10_Conditional_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Entre 0 et 1000.");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_Conditional_133_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function AdministrationComponent_Conditional_10_Conditional_133_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.reset()); });
    i0.ɵɵtext(1, " Annuler les modifications ");
    i0.ɵɵelementEnd();
} }
function AdministrationComponent_Conditional_10_Conditional_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtemplate(1, AdministrationComponent_Conditional_10_Conditional_133_Conditional_1_Template, 2, 0, "button", 5);
    i0.ɵɵelementStart(2, "button", 46);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.dirty() ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.form.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Enregistrer", " ");
} }
function AdministrationComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "div")(4, "span", 12);
    i0.ɵɵtext(5, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 13);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div")(9, "span", 12);
    i0.ɵɵtext(10, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 14);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "p", 15);
    i0.ɵɵtext(14, " Le code et le statut identifient l'\u00E9tablissement dans les documents officiels et dans la num\u00E9rotation : ils ne se modifient pas ici. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(15, "eduops-school-logo");
    i0.ɵɵelementStart(16, "form", 16);
    i0.ɵɵlistener("ngSubmit", function AdministrationComponent_Conditional_10_Template_form_ngSubmit_16_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵelementStart(17, "fieldset", 17)(18, "div", 10)(19, "h2", 18);
    i0.ɵɵtext(20, "Identit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 19)(22, "label", 20)(23, "span");
    i0.ɵɵtext(24, "Nom de l'\u00E9tablissement *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 21);
    i0.ɵɵtemplate(26, AdministrationComponent_Conditional_10_Conditional_26_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "label", 20)(28, "span");
    i0.ɵɵtext(29, "Raison sociale");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "label", 20)(32, "span");
    i0.ɵɵtext(33, "Devise");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "label", 20)(36, "span");
    i0.ɵɵtext(37, "Num\u00E9ro d'enregistrement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 25);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(39, "fieldset", 17)(40, "div", 10)(41, "h2", 18);
    i0.ɵɵtext(42, "Coordonn\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 19)(44, "label", 20)(45, "span");
    i0.ɵɵtext(46, "E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(47, "input", 26);
    i0.ɵɵtemplate(48, AdministrationComponent_Conditional_10_Conditional_48_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "label", 20)(50, "span");
    i0.ɵɵtext(51, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(52, "input", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "label", 20)(54, "span");
    i0.ɵɵtext(55, "Site web");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(56, "input", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "label", 20)(58, "span");
    i0.ɵɵtext(59, "Adresse");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(60, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "label", 20)(62, "span");
    i0.ɵɵtext(63, "Compl\u00E9ment d'adresse");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(64, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "label", 20)(66, "span");
    i0.ɵɵtext(67, "Ville");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(68, "input", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "label", 20)(70, "span");
    i0.ɵɵtext(71, "Pays *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(72, "input", 32);
    i0.ɵɵtemplate(73, AdministrationComponent_Conditional_10_Conditional_73_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(74, "fieldset", 17)(75, "div", 10)(76, "h2", 18);
    i0.ɵɵtext(77, "Pr\u00E9f\u00E9rences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "p", 33);
    i0.ɵɵtext(79, " La devise et l'\u00E9chelle de notation se r\u00E9percutent sur tout ce qui est \u00E9mis ensuite : re\u00E7us, moyennes, bulletins. Ce qui est d\u00E9j\u00E0 imprim\u00E9 ne bouge pas. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "div", 19)(81, "label", 20)(82, "span");
    i0.ɵɵtext(83, "Devise (3 lettres) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(84, "input", 34);
    i0.ɵɵtemplate(85, AdministrationComponent_Conditional_10_Conditional_85_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "label", 20)(87, "span");
    i0.ɵɵtext(88, "Langue *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "select", 35);
    i0.ɵɵrepeaterCreate(90, AdministrationComponent_Conditional_10_For_91_Template, 2, 2, "option", 36, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(92, "label", 20)(93, "span");
    i0.ɵɵtext(94, "Fuseau horaire *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(95, "input", 37);
    i0.ɵɵelementStart(96, "datalist", 38);
    i0.ɵɵrepeaterCreate(97, AdministrationComponent_Conditional_10_For_98_Template, 1, 1, "option", 36, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(99, "label", 20)(100, "span");
    i0.ɵɵtext(101, "Note maximale (\u00E9chelle) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(102, "input", 39);
    i0.ɵɵtemplate(103, AdministrationComponent_Conditional_10_Conditional_103_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(104, "label", 40);
    i0.ɵɵelement(105, "input", 41);
    i0.ɵɵelementStart(106, "span");
    i0.ɵɵtext(107, "Afficher le classement des \u00E9l\u00E8ves dans les bulletins");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(108, "fieldset", 17)(109, "div", 10)(110, "h2", 18);
    i0.ɵɵtext(111, "Num\u00E9rotation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "p", 33);
    i0.ɵɵtext(113, " Gabarits des num\u00E9ros attribu\u00E9s automatiquement. Variables disponibles : ");
    i0.ɵɵelementStart(114, "code");
    i0.ɵɵtext(115);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(116, " (ann\u00E9e en cours) et ");
    i0.ɵɵelementStart(117, "code");
    i0.ɵɵtext(118);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(119, " (s\u00E9quence sur n chiffres). ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(120, "div", 19)(121, "label", 20)(122, "span");
    i0.ɵɵtext(123, "Matricule \u00E9l\u00E8ve *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(124, "input", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(125, "label", 20)(126, "span");
    i0.ɵɵtext(127, "Num\u00E9ro de re\u00E7u *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(128, "input", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(129, "label", 20)(130, "span");
    i0.ɵɵtext(131, "Num\u00E9ro de facture *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(132, "input", 44);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(133, AdministrationComponent_Conditional_10_Conditional_133_Template, 4, 3, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.code());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.status());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r2.form);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.canManage() || ctx_r2.saving());
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r2.invalid("name") ? 26 : -1);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage() || ctx_r2.saving());
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r2.invalid("email") ? 48 : -1);
    i0.ɵɵadvance(25);
    i0.ɵɵconditional(ctx_r2.invalid("country") ? 73 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.canManage() || ctx_r2.saving());
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r2.invalid("currency") ? 85 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.locales);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.timezones);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r2.invalid("gradingScaleMax") ? 103 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage() || ctx_r2.saving());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate("{year}");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate("{seq:n}");
    i0.ɵɵadvance(15);
    i0.ɵɵconditional(ctx_r2.canManage() ? 133 : -1);
} }
/**
 * Paramètres de l'établissement.
 *
 * <p>La plupart des champs ici sont des réglages silencieux : ils n'ouvrent
 * aucune route et ne créent aucune ligne, mais ils se répercutent partout —
 * la devise des reçus, l'échelle des moyennes, le classement des bulletins,
 * la numérotation des élèves et des reçus. C'est ce qui les rend dangereux :
 * changer l'échelle de notation n'invalide rien de déjà imprimé, mais il faut
 * le savoir avant de le faire, pas après.</p>
 *
 * <p>Deux valeurs ne se changent nulle part : le code, qui identifie
 * l'établissement, et le statut, qui décide de ce que le système accepte
 * encore. L'écran les montre, sans proposer de les éditer.</p>
 */
export class AdministrationComponent {
    settingsService = inject(SchoolSettingsService);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    timezones = COMMON_TIMEZONES;
    locales = COMMON_LOCALES;
    loading = signal(true);
    failed = signal(false);
    saving = signal(false);
    code = signal('');
    status = signal(null);
    canManage = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));
    form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.maxLength(200)]],
        legalName: ['', Validators.maxLength(255)],
        motto: ['', Validators.maxLength(255)],
        registrationNumber: ['', Validators.maxLength(80)],
        email: ['', [Validators.email, Validators.maxLength(180)]],
        phone: ['', Validators.maxLength(40)],
        website: ['', Validators.maxLength(200)],
        addressLine1: ['', Validators.maxLength(200)],
        addressLine2: ['', Validators.maxLength(200)],
        city: ['', Validators.maxLength(120)],
        country: ["Cote d'Ivoire", [Validators.required, Validators.maxLength(120)]],
        currency: ['XOF', [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],
        locale: ['fr-CI', [Validators.required, Validators.maxLength(10)]],
        timezone: ['Africa/Abidjan', [Validators.required, Validators.maxLength(60)]],
        gradingScaleMax: [20, [Validators.required, Validators.min(0.001), Validators.max(1000)]],
        rankingEnabled: [true],
        studentNumberPattern: ['EDU-{year}-{seq:6}', [Validators.required, Validators.maxLength(80)]],
        receiptNumberPattern: ['REC-{year}-{seq:8}', [Validators.required, Validators.maxLength(80)]],
        invoiceNumberPattern: ['INV-{year}-{seq:8}', [Validators.required, Validators.maxLength(80)]]
    });
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.failed.set(false);
        this.settingsService.get()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (settings) => {
                this.code.set(settings.code);
                this.status.set(settings.status);
                this.form.patchValue({
                    name: settings.name ?? '',
                    legalName: settings.legalName ?? '',
                    motto: settings.motto ?? '',
                    registrationNumber: settings.registrationNumber ?? '',
                    email: settings.email ?? '',
                    phone: settings.phone ?? '',
                    website: settings.website ?? '',
                    addressLine1: settings.addressLine1 ?? '',
                    addressLine2: settings.addressLine2 ?? '',
                    city: settings.city ?? '',
                    country: settings.country ?? '',
                    currency: settings.currency ?? 'XOF',
                    locale: settings.locale ?? 'fr-CI',
                    timezone: settings.timezone ?? 'Africa/Abidjan',
                    gradingScaleMax: Number(settings.gradingScaleMax ?? 20),
                    rankingEnabled: settings.rankingEnabled,
                    studentNumberPattern: settings.studentNumberPattern ?? '',
                    receiptNumberPattern: settings.receiptNumberPattern ?? '',
                    invoiceNumberPattern: settings.invoiceNumberPattern ?? ''
                }, { emitEvent: false });
                this.form.markAsPristine();
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.failed.set(true);
            }
        });
    }
    /** Le formulaire s'écarte-t-il de ce que le serveur a réellement ? */
    dirty() {
        return this.form.dirty;
    }
    reset() {
        this.load();
    }
    submit() {
        if (!this.canManage() || this.form.invalid || this.saving()) {
            this.form.markAllAsTouched();
            return;
        }
        const v = this.form.getRawValue();
        const blank = (value) => value.trim() || null;
        this.saving.set(true);
        this.settingsService.update({
            name: v.name.trim(),
            legalName: blank(v.legalName),
            motto: blank(v.motto),
            registrationNumber: blank(v.registrationNumber),
            email: blank(v.email),
            phone: blank(v.phone),
            website: blank(v.website),
            addressLine1: blank(v.addressLine1),
            addressLine2: blank(v.addressLine2),
            city: blank(v.city),
            country: v.country.trim(),
            currency: v.currency.trim().toUpperCase(),
            locale: v.locale.trim(),
            timezone: v.timezone.trim(),
            gradingScaleMax: Number(v.gradingScaleMax),
            rankingEnabled: v.rankingEnabled,
            studentNumberPattern: v.studentNumberPattern.trim(),
            receiptNumberPattern: v.receiptNumberPattern.trim(),
            invoiceNumberPattern: v.invoiceNumberPattern.trim()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.form.markAsPristine();
                this.notifications.success('Les paramètres de l’établissement sont enregistrés.', 'Paramètres mis à jour');
            },
            error: (err) => {
                this.saving.set(false);
                this.notifications.error(this.messageOf(err), 'Enregistrement refusé');
            }
        });
    }
    invalid(controlName) {
        const control = this.form.get(controlName);
        return !!control && control.invalid && (control.touched || control.dirty);
    }
    messageOf(err) {
        const failure = err?.error;
        return failure?.message?.trim()
            || translateErrorCode(failure?.code ?? 'UNKNOWN');
    }
    static ɵfac = function AdministrationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdministrationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdministrationComponent, selectors: [["eduops-administration"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 11, vars: 2, consts: [[1, "administration"], [1, "page-head"], [1, "actions"], ["message", "Chargement des param\u00E8tres\u2026"], ["title", "Param\u00E8tres indisponibles", "message", "Les param\u00E8tres de l\u2019\u00E9tablissement n\u2019ont pas pu \u00EAtre charg\u00E9s."], ["type", "button", 1, "btn", "btn--ghost"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["title", "Param\u00E8tres indisponibles", "message", "Les param\u00E8tres de l\u2019\u00E9tablissement n\u2019ont pas pu \u00EAtre charg\u00E9s.", 3, "retry"], [1, "card", "identity-card"], [1, "card__body"], [1, "pinned"], [1, "pinned__label"], [1, "pinned__value", "mono"], [1, "pinned__value"], [1, "pinned__note"], [3, "ngSubmit", "formGroup"], [1, "card", 3, "disabled"], [1, "section-title"], [1, "grid"], [1, "field"], ["formControlName", "name", "maxlength", "200", 1, "input"], [1, "field__error"], ["formControlName", "legalName", "maxlength", "255", 1, "input"], ["formControlName", "motto", "maxlength", "255", 1, "input"], ["formControlName", "registrationNumber", "maxlength", "80", 1, "input"], ["type", "email", "formControlName", "email", "maxlength", "180", 1, "input"], ["formControlName", "phone", "maxlength", "40", 1, "input"], ["formControlName", "website", "maxlength", "200", 1, "input"], ["formControlName", "addressLine1", "maxlength", "200", 1, "input"], ["formControlName", "addressLine2", "maxlength", "200", 1, "input"], ["formControlName", "city", "maxlength", "120", 1, "input"], ["formControlName", "country", "maxlength", "120", 1, "input"], [1, "section-note"], ["formControlName", "currency", "maxlength", "3", 1, "input", "mono"], ["formControlName", "locale", 1, "input"], [3, "value"], ["list", "timezone-options", "formControlName", "timezone", "maxlength", "60", 1, "input"], ["id", "timezone-options"], ["type", "number", "step", "0.5", "min", "1", "max", "1000", "formControlName", "gradingScaleMax", 1, "input"], [1, "toggle"], ["type", "checkbox", "formControlName", "rankingEnabled"], ["formControlName", "studentNumberPattern", "maxlength", "80", 1, "input", "mono"], ["formControlName", "receiptNumberPattern", "maxlength", "80", 1, "input", "mono"], ["formControlName", "invoiceNumberPattern", "maxlength", "80", 1, "input", "mono"], [1, "foot-actions"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"]], template: function AdministrationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Param\u00E8tres");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Identit\u00E9, coordonn\u00E9es et r\u00E9glages qui s'appliquent \u00E0 tout l'\u00E9tablissement.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, AdministrationComponent_Conditional_7_Template, 4, 3, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, AdministrationComponent_Conditional_8_Template, 1, 0, "eduops-loading-state", 3)(9, AdministrationComponent_Conditional_9_Template, 1, 0, "eduops-error-state", 4)(10, AdministrationComponent_Conditional_10_Template, 134, 15);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.canManage() ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 8 : ctx.failed() ? 9 : 10);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent, SchoolLogoComponent], styles: ["\n\n\n\n.administration[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-4);\n  flex-wrap: wrap;\n\n  h1 {\n    margin: 0 0 var(--space-1);\n    font-size: var(--text-xl);\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-light);\n    font-size: var(--text-sm);\n    max-width: 56ch;\n  }\n}\n\n.actions[_ngcontent-%COMP%], \n.foot-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  align-items: center;\n}\n\n.foot-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n\n.identity-card[_ngcontent-%COMP%]   .pinned[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-6);\n  flex-wrap: wrap;\n\n  & > div {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__label {\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    color: var(--text-light);\n  }\n\n  &__value {\n    font-size: var(--text-md);\n    font-weight: 600;\n  }\n\n  &__note {\n    margin: var(--space-3) 0 0;\n    font-size: var(--text-sm);\n    color: var(--text-light);\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-3);\n  font-size: var(--text-md);\n}\n\n.section-note[_ngcontent-%COMP%] {\n  margin: calc(-1 * var(--space-2)) 0 var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-light);\n  max-width: 68ch;\n\n  code {\n    font-size: var(--text-sm);\n    background: var(--surface-muted, rgba(0, 0, 0, 0.04));\n    padding: 0 4px;\n    border-radius: 4px;\n  }\n}\n\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: var(--space-3) var(--space-4);\n}\n\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n\n  & > span {\n    font-size: var(--text-sm);\n    color: var(--text-light);\n  }\n\n  &__error {\n    font-size: var(--text-xs);\n    color: var(--danger, #b3261e);\n  }\n}\n\n.toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  margin-top: var(--space-3);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input {\n    width: 16px;\n    height: 16px;\n    accent-color: var(--primary, #1f6feb);\n  }\n}\n\n.mono[_ngcontent-%COMP%] {\n  font-family: var(--font-mono, ui-monospace, monospace);\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdministrationComponent, [{
        type: Component,
        args: [{ selector: 'eduops-administration', standalone: true, imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent, SchoolLogoComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"administration\">\n\n  <header class=\"page-head\">\n    <div>\n      <h1>Param\u00E8tres</h1>\n      <p>Identit\u00E9, coordonn\u00E9es et r\u00E9glages qui s'appliquent \u00E0 tout\n        l'\u00E9tablissement.</p>\n    </div>\n    @if (canManage()) {\n      <div class=\"actions\">\n        @if (dirty()) {\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"reset()\">\n            Annuler les modifications\n          </button>\n        }\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving() || form.invalid\"\n                (click)=\"submit()\">\n          {{ saving() ? 'Enregistrement\u2026' : 'Enregistrer' }}\n        </button>\n      </div>\n    }\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des param\u00E8tres\u2026\" />\n  } @else if (failed()) {\n    <eduops-error-state\n      title=\"Param\u00E8tres indisponibles\"\n      message=\"Les param\u00E8tres de l\u2019\u00E9tablissement n\u2019ont pas pu \u00EAtre charg\u00E9s.\"\n      (retry)=\"load()\" />\n  } @else {\n\n    <div class=\"card identity-card\">\n      <div class=\"card__body\">\n        <div class=\"pinned\">\n          <div>\n            <span class=\"pinned__label\">Code</span>\n            <span class=\"pinned__value mono\">{{ code() }}</span>\n          </div>\n          <div>\n            <span class=\"pinned__label\">Statut</span>\n            <span class=\"pinned__value\">{{ status() }}</span>\n          </div>\n        </div>\n        <p class=\"pinned__note\">\n          Le code et le statut identifient l'\u00E9tablissement dans les documents\n          officiels et dans la num\u00E9rotation : ils ne se modifient pas ici.\n        </p>\n      </div>\n    </div>\n\n    <eduops-school-logo />\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n\n      <fieldset class=\"card\" [disabled]=\"!canManage() || saving()\">\n        <div class=\"card__body\">\n          <h2 class=\"section-title\">Identit\u00E9</h2>\n          <div class=\"grid\">\n            <label class=\"field\">\n              <span>Nom de l'\u00E9tablissement *</span>\n              <input class=\"input\" formControlName=\"name\" maxlength=\"200\" />\n              @if (invalid('name')) { <span class=\"field__error\">Le nom est obligatoire.</span> }\n            </label>\n            <label class=\"field\">\n              <span>Raison sociale</span>\n              <input class=\"input\" formControlName=\"legalName\" maxlength=\"255\" />\n            </label>\n            <label class=\"field\">\n              <span>Devise</span>\n              <input class=\"input\" formControlName=\"motto\" maxlength=\"255\" />\n            </label>\n            <label class=\"field\">\n              <span>Num\u00E9ro d'enregistrement</span>\n              <input class=\"input\" formControlName=\"registrationNumber\" maxlength=\"80\" />\n            </label>\n          </div>\n        </div>\n      </fieldset>\n\n      <fieldset class=\"card\" [disabled]=\"!canManage() || saving()\">\n        <div class=\"card__body\">\n          <h2 class=\"section-title\">Coordonn\u00E9es</h2>\n          <div class=\"grid\">\n            <label class=\"field\">\n              <span>E-mail</span>\n              <input class=\"input\" type=\"email\" formControlName=\"email\" maxlength=\"180\" />\n              @if (invalid('email')) { <span class=\"field__error\">Adresse e-mail invalide.</span> }\n            </label>\n            <label class=\"field\">\n              <span>T\u00E9l\u00E9phone</span>\n              <input class=\"input\" formControlName=\"phone\" maxlength=\"40\" />\n            </label>\n            <label class=\"field\">\n              <span>Site web</span>\n              <input class=\"input\" formControlName=\"website\" maxlength=\"200\" />\n            </label>\n            <label class=\"field\">\n              <span>Adresse</span>\n              <input class=\"input\" formControlName=\"addressLine1\" maxlength=\"200\" />\n            </label>\n            <label class=\"field\">\n              <span>Compl\u00E9ment d'adresse</span>\n              <input class=\"input\" formControlName=\"addressLine2\" maxlength=\"200\" />\n            </label>\n            <label class=\"field\">\n              <span>Ville</span>\n              <input class=\"input\" formControlName=\"city\" maxlength=\"120\" />\n            </label>\n            <label class=\"field\">\n              <span>Pays *</span>\n              <input class=\"input\" formControlName=\"country\" maxlength=\"120\" />\n              @if (invalid('country')) { <span class=\"field__error\">Le pays est obligatoire.</span> }\n            </label>\n          </div>\n        </div>\n      </fieldset>\n\n      <fieldset class=\"card\" [disabled]=\"!canManage() || saving()\">\n        <div class=\"card__body\">\n          <h2 class=\"section-title\">Pr\u00E9f\u00E9rences</h2>\n          <p class=\"section-note\">\n            La devise et l'\u00E9chelle de notation se r\u00E9percutent sur tout ce qui\n            est \u00E9mis ensuite : re\u00E7us, moyennes, bulletins. Ce qui est d\u00E9j\u00E0\n            imprim\u00E9 ne bouge pas.\n          </p>\n          <div class=\"grid\">\n            <label class=\"field\">\n              <span>Devise (3 lettres) *</span>\n              <input class=\"input mono\" formControlName=\"currency\" maxlength=\"3\" />\n              @if (invalid('currency')) {\n                <span class=\"field__error\">Trois majuscules, ex. XOF.</span>\n              }\n            </label>\n            <label class=\"field\">\n              <span>Langue *</span>\n              <select class=\"input\" formControlName=\"locale\">\n                @for (locale of locales; track locale) {\n                  <option [value]=\"locale\">{{ locale }}</option>\n                }\n              </select>\n            </label>\n            <label class=\"field\">\n              <span>Fuseau horaire *</span>\n              <input class=\"input\" list=\"timezone-options\" formControlName=\"timezone\"\n                     maxlength=\"60\" />\n              <datalist id=\"timezone-options\">\n                @for (zone of timezones; track zone) {\n                  <option [value]=\"zone\"></option>\n                }\n              </datalist>\n            </label>\n            <label class=\"field\">\n              <span>Note maximale (\u00E9chelle) *</span>\n              <input class=\"input\" type=\"number\" step=\"0.5\" min=\"1\" max=\"1000\"\n                     formControlName=\"gradingScaleMax\" />\n              @if (invalid('gradingScaleMax')) {\n                <span class=\"field__error\">Entre 0 et 1000.</span>\n              }\n            </label>\n          </div>\n          <label class=\"toggle\">\n            <input type=\"checkbox\" formControlName=\"rankingEnabled\" />\n            <span>Afficher le classement des \u00E9l\u00E8ves dans les bulletins</span>\n          </label>\n        </div>\n      </fieldset>\n\n      <fieldset class=\"card\" [disabled]=\"!canManage() || saving()\">\n        <div class=\"card__body\">\n          <h2 class=\"section-title\">Num\u00E9rotation</h2>\n          <p class=\"section-note\">\n            Gabarits des num\u00E9ros attribu\u00E9s automatiquement. Variables\n            disponibles : <code>{{ '{year}' }}</code> (ann\u00E9e en cours) et\n            <code>{{ '{seq:n}' }}</code> (s\u00E9quence sur n chiffres).\n          </p>\n          <div class=\"grid\">\n            <label class=\"field\">\n              <span>Matricule \u00E9l\u00E8ve *</span>\n              <input class=\"input mono\" formControlName=\"studentNumberPattern\" maxlength=\"80\" />\n            </label>\n            <label class=\"field\">\n              <span>Num\u00E9ro de re\u00E7u *</span>\n              <input class=\"input mono\" formControlName=\"receiptNumberPattern\" maxlength=\"80\" />\n            </label>\n            <label class=\"field\">\n              <span>Num\u00E9ro de facture *</span>\n              <input class=\"input mono\" formControlName=\"invoiceNumberPattern\" maxlength=\"80\" />\n            </label>\n          </div>\n        </div>\n      </fieldset>\n\n      @if (canManage()) {\n        <div class=\"foot-actions\">\n          @if (dirty()) {\n            <button type=\"button\" class=\"btn btn--ghost\" (click)=\"reset()\">\n              Annuler les modifications\n            </button>\n          }\n          <button type=\"submit\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || form.invalid\">\n            {{ saving() ? 'Enregistrement\u2026' : 'Enregistrer' }}\n          </button>\n        </div>\n      }\n    </form>\n  }\n</section>\n", styles: ["/* Param\u00E8tres de l'\u00E9tablissement \u2014 sections empil\u00E9es, grille \u00E0 deux colonnes\n   qui retombe sur une seule d\u00E8s que la place manque. */\n\n.administration {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.page-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-4);\n  flex-wrap: wrap;\n\n  h1 {\n    margin: 0 0 var(--space-1);\n    font-size: var(--text-xl);\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-light);\n    font-size: var(--text-sm);\n    max-width: 56ch;\n  }\n}\n\n.actions,\n.foot-actions {\n  display: flex;\n  gap: var(--space-2);\n  align-items: center;\n}\n\n.foot-actions {\n  justify-content: flex-end;\n}\n\n.identity-card .pinned {\n  display: flex;\n  gap: var(--space-6);\n  flex-wrap: wrap;\n\n  & > div {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__label {\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    color: var(--text-light);\n  }\n\n  &__value {\n    font-size: var(--text-md);\n    font-weight: 600;\n  }\n\n  &__note {\n    margin: var(--space-3) 0 0;\n    font-size: var(--text-sm);\n    color: var(--text-light);\n  }\n}\n\n.section-title {\n  margin: 0 0 var(--space-3);\n  font-size: var(--text-md);\n}\n\n.section-note {\n  margin: calc(-1 * var(--space-2)) 0 var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-light);\n  max-width: 68ch;\n\n  code {\n    font-size: var(--text-sm);\n    background: var(--surface-muted, rgba(0, 0, 0, 0.04));\n    padding: 0 4px;\n    border-radius: 4px;\n  }\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: var(--space-3) var(--space-4);\n}\n\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n\n  & > span {\n    font-size: var(--text-sm);\n    color: var(--text-light);\n  }\n\n  &__error {\n    font-size: var(--text-xs);\n    color: var(--danger, #b3261e);\n  }\n}\n\n.toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  margin-top: var(--space-3);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input {\n    width: 16px;\n    height: 16px;\n    accent-color: var(--primary, #1f6feb);\n  }\n}\n\n.mono {\n  font-family: var(--font-mono, ui-monospace, monospace);\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdministrationComponent, { className: "AdministrationComponent", filePath: "frontend/src/app/features/administration/administration.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=administration.component.js.map