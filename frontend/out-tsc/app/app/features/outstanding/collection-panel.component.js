import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionService } from '@core/services/collection.service';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
function CollectionPanelComponent_form_6_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r3.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r3.label);
} }
function CollectionPanelComponent_form_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 4, 0);
    i0.ɵɵlistener("ngSubmit", function CollectionPanelComponent_form_6_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵelementStart(2, "p", 5);
    i0.ɵɵtext(3, "Consignez une d\u00E9marche effectu\u00E9e. Aucun SMS ou email n'est envoy\u00E9 depuis ce formulaire.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Type de d\u00E9marche ");
    i0.ɵɵelementStart(6, "select", 6);
    i0.ɵɵtwoWayListener("ngModelChange", function CollectionPanelComponent_form_6_Template_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.channel, $event) || (ctx_r1.channel = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(7, CollectionPanelComponent_form_6_For_8_Template, 2, 2, "option", 7, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "label");
    i0.ɵɵtext(10, "Compte rendu ");
    i0.ɵɵelementStart(11, "textarea", 8);
    i0.ɵɵtwoWayListener("ngModelChange", function CollectionPanelComponent_form_6_Template_textarea_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.note, $event) || (ctx_r1.note = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 9)(13, "label");
    i0.ɵɵtext(14, "Prochaine relance");
    i0.ɵɵelementStart(15, "input", 10);
    i0.ɵɵtwoWayListener("ngModelChange", function CollectionPanelComponent_form_6_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.nextContactDate, $event) || (ctx_r1.nextContactDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17);
    i0.ɵɵelementStart(18, "input", 11);
    i0.ɵɵtwoWayListener("ngModelChange", function CollectionPanelComponent_form_6_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.promisedAmount, $event) || (ctx_r1.promisedAmount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "label");
    i0.ɵɵtext(20, "Date promise");
    i0.ɵɵelementStart(21, "input", 12);
    i0.ɵɵtwoWayListener("ngModelChange", function CollectionPanelComponent_form_6_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.promisedDate, $event) || (ctx_r1.promisedDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "p", 5);
    i0.ɵɵtext(23, "Une promesse ne vaut pas paiement. Utilisez \u00AB Encaisser \u00BB lorsque le versement est re\u00E7u.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 13);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const form_r4 = i0.ɵɵreference(1);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.channel);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.channels);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.note);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.nextContactDate);
    i0.ɵɵproperty("min", ctx_r1.today);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Montant promis (", ctx_r1.student.currency, ")");
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.promisedAmount);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.promisedDate);
    i0.ɵɵproperty("min", ctx_r1.today);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ctx_r1.loading() || form_r4.invalid || !ctx_r1.note.trim());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : "Enregistrer la d\u00E9marche");
} }
function CollectionPanelComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error());
} }
function CollectionPanelComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1, "Chargement\u2026");
    i0.ɵɵelementEnd();
} }
function CollectionPanelComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1, "Impossible de charger l'historique.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 15);
    i0.ɵɵlistener("click", function CollectionPanelComponent_Conditional_11_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd();
} }
function CollectionPanelComponent_Conditional_12_For_1_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "money");
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Promesse : ", i0.ɵɵpipeBind2(2, 2, action_r6.promisedAmount, ctx_r1.student.currency), " pour le ", i0.ɵɵpipeBind2(3, 5, action_r6.promisedDate, "dd/MM/yyyy"), "");
} }
function CollectionPanelComponent_Conditional_12_For_1_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Relance pr\u00E9vue le ", i0.ɵɵpipeBind2(2, 1, action_r6.nextContactDate, "dd/MM/yyyy"), "");
} }
function CollectionPanelComponent_Conditional_12_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementStart(5, "div", 5);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, CollectionPanelComponent_Conditional_12_For_1_Conditional_9_Template, 4, 8, "p")(10, CollectionPanelComponent_Conditional_12_For_1_Conditional_10_Template, 3, 4, "p");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.label(action_r6.channel));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", i0.ɵɵpipeBind2(4, 6, action_r6.createdAt, "dd/MM/yyyy HH:mm"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r6.authorName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r6.note);
    i0.ɵɵadvance();
    i0.ɵɵconditional(action_r6.promisedAmount ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(action_r6.nextContactDate ? 10 : -1);
} }
function CollectionPanelComponent_Conditional_12_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucune d\u00E9marche enregistr\u00E9e pour l'ann\u00E9e active.");
    i0.ɵɵelementEnd();
} }
function CollectionPanelComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, CollectionPanelComponent_Conditional_12_For_1_Template, 11, 9, "article", null, _forTrack1, false, CollectionPanelComponent_Conditional_12_ForEmpty_2_Template, 2, 0, "p");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.actions());
} }
export class CollectionPanelComponent {
    student;
    saved = new EventEmitter();
    service = inject(CollectionService);
    destroyRef = inject(DestroyRef);
    actions = signal([]);
    loading = signal(true);
    saving = signal(false);
    error = signal('');
    historyError = signal(false);
    today = new Date().toLocaleDateString('en-CA');
    channels = [
        { value: 'PHONE', label: 'Appel téléphonique' }, { value: 'SMS', label: 'SMS effectué' },
        { value: 'EMAIL', label: 'Email effectué' }, { value: 'MEETING', label: 'Rendez-vous' },
        { value: 'NOTE', label: 'Note de suivi' }
    ];
    channel = 'PHONE';
    note = '';
    nextContactDate = '';
    promisedDate = '';
    promisedAmount = null;
    ngOnInit() { this.load(); }
    label(value) { return this.channels.find(c => c.value === value)?.label ?? value; }
    load() {
        this.loading.set(true);
        this.historyError.set(false);
        this.service.history(this.student.studentId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: actions => { this.actions.set(actions); this.loading.set(false); },
            error: () => { this.historyError.set(true); this.loading.set(false); }
        });
    }
    save() {
        if (this.saving() || !this.note.trim())
            return;
        if ((this.promisedAmount != null) !== !!this.promisedDate) {
            this.error.set('Renseignez ensemble le montant promis et la date de paiement.');
            return;
        }
        this.saving.set(true);
        this.error.set('');
        this.service.create(this.student.studentId, {
            channel: this.channel, note: this.note.trim(), nextContactDate: this.nextContactDate || null,
            promisedDate: this.promisedDate || null, promisedAmount: this.promisedAmount
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: action => {
                this.actions.update(items => [action, ...items]);
                this.saved.emit();
                this.saving.set(false);
                this.note = '';
                this.nextContactDate = '';
                this.promisedDate = '';
                this.promisedAmount = null;
            },
            error: () => { this.saving.set(false); this.error.set('Enregistrement impossible. Vérifiez les dates, le montant et vos droits, puis réessayez.'); }
        });
    }
    static ɵfac = function CollectionPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CollectionPanelComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CollectionPanelComponent, selectors: [["eduops-collection-panel"]], inputs: { student: "student" }, outputs: { saved: "saved" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 13, vars: 12, consts: [["form", "ngForm"], [3, "ngSubmit", 4, "eduopsHasPermission"], ["role", "alert", 1, "error"], ["role", "status"], [3, "ngSubmit"], [1, "muted"], ["name", "channel", 1, "input", 3, "ngModelChange", "ngModel"], [3, "value"], ["name", "note", "required", "", "maxlength", "2000", "placeholder", "Personne contact\u00E9e, r\u00E9sultat de l'\u00E9change\u2026", 1, "input", 3, "ngModelChange", "ngModel"], [1, "fields"], ["type", "date", "name", "next", 1, "input", 3, "ngModelChange", "ngModel", "min"], ["type", "number", "name", "amount", "min", "0.01", "step", "0.01", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "date", "name", "date", 1, "input", 3, "ngModelChange", "ngModel", "min"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], ["role", "alert"], ["type", "button", 1, "btn", 3, "click"]], template: function CollectionPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h2");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "p");
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "money");
            i0.ɵɵpipe(5, "money");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, CollectionPanelComponent_form_6_Template, 26, 10, "form", 1)(7, CollectionPanelComponent_Conditional_7_Template, 2, 1, "p", 2);
            i0.ɵɵelementStart(8, "h3");
            i0.ɵɵtext(9, "Historique des d\u00E9marches");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, CollectionPanelComponent_Conditional_10_Template, 2, 0, "p", 3)(11, CollectionPanelComponent_Conditional_11_Template, 4, 0)(12, CollectionPanelComponent_Conditional_12_Template, 3, 1);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Recouvrement \u00B7 ", ctx.student.studentName, "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("Solde : ", i0.ɵɵpipeBind2(4, 6, ctx.student.outstandingAmount, ctx.student.currency), " \u00B7 En retard : ", i0.ɵɵpipeBind2(5, 9, ctx.student.overdueAmount, ctx.student.currency), "");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("eduopsHasPermission", "FINANCE_MANAGE");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 7 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.loading() ? 10 : ctx.historyError() ? 11 : 12);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.MaxLengthValidator, i2.MinValidator, i2.NgModel, i2.NgForm, HasPermissionDirective, MoneyPipe], styles: ["[_nghost-%COMP%] { display:block; padding:1.5rem; }\n    .fields[_ngcontent-%COMP%] { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem; }\n    label[_ngcontent-%COMP%] { display:grid; gap:.4rem; margin-bottom:1rem; }\n    textarea[_ngcontent-%COMP%] { min-height:90px; width:100%; }\n    article[_ngcontent-%COMP%] { padding:1rem 0; border-bottom:1px solid var(--border, #ddd); }\n    article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { white-space:pre-wrap; overflow-wrap:anywhere; }\n    .error[_ngcontent-%COMP%] { color:var(--danger, #a32121); }\n    .muted[_ngcontent-%COMP%] { color:var(--text-muted, #666); }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CollectionPanelComponent, [{
        type: Component,
        args: [{ selector: 'eduops-collection-panel', standalone: true, imports: [CommonModule, FormsModule, HasPermissionDirective, MoneyPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2>Recouvrement · {{ student.studentName }}</h2>
    <p>Solde : {{ student.outstandingAmount | money:student.currency }} · En retard : {{ student.overdueAmount | money:student.currency }}</p>
    <form *eduopsHasPermission="'FINANCE_MANAGE'" (ngSubmit)="save()" #form="ngForm">
      <p class="muted">Consignez une démarche effectuée. Aucun SMS ou email n'est envoyé depuis ce formulaire.</p>
      <label>Type de démarche
        <select class="input" name="channel" [(ngModel)]="channel">
          @for (item of channels; track item.value) { <option [value]="item.value">{{ item.label }}</option> }
        </select>
      </label>
      <label>Compte rendu
        <textarea class="input" name="note" [(ngModel)]="note" required maxlength="2000" placeholder="Personne contactée, résultat de l'échange…"></textarea>
      </label>
      <div class="fields">
        <label>Prochaine relance<input class="input" type="date" name="next" [(ngModel)]="nextContactDate" [min]="today" /></label>
        <label>Montant promis ({{ student.currency }})<input class="input" type="number" name="amount" [(ngModel)]="promisedAmount" min="0.01" step="0.01" /></label>
        <label>Date promise<input class="input" type="date" name="date" [(ngModel)]="promisedDate" [min]="today" /></label>
      </div>
      <p class="muted">Une promesse ne vaut pas paiement. Utilisez « Encaisser » lorsque le versement est reçu.</p>
      <button class="btn btn--primary" type="submit" [disabled]="saving() || loading() || form.invalid || !note.trim()">{{ saving() ? 'Enregistrement…' : 'Enregistrer la démarche' }}</button>
    </form>
    @if (error()) { <p role="alert" class="error">{{ error() }}</p> }
    <h3>Historique des démarches</h3>
    @if (loading()) { <p role="status">Chargement…</p> }
    @else if (historyError()) {
      <p role="alert">Impossible de charger l'historique.</p>
      <button class="btn" type="button" (click)="load()">Réessayer</button>
    } @else {
      @for (action of actions(); track action.id) {
        <article>
          <strong>{{ label(action.channel) }}</strong> · {{ action.createdAt | date:'dd/MM/yyyy HH:mm' }}
          <div class="muted">{{ action.authorName }}</div>
          <p>{{ action.note }}</p>
          @if (action.promisedAmount) { <p>Promesse : {{ action.promisedAmount | money:student.currency }} pour le {{ action.promisedDate | date:'dd/MM/yyyy' }}</p> }
          @if (action.nextContactDate) { <p>Relance prévue le {{ action.nextContactDate | date:'dd/MM/yyyy' }}</p> }
        </article>
      } @empty { <p>Aucune démarche enregistrée pour l'année active.</p> }
    }
  `, styles: ["\n    :host { display:block; padding:1.5rem; }\n    .fields { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem; }\n    label { display:grid; gap:.4rem; margin-bottom:1rem; }\n    textarea { min-height:90px; width:100%; }\n    article { padding:1rem 0; border-bottom:1px solid var(--border, #ddd); }\n    article p { white-space:pre-wrap; overflow-wrap:anywhere; }\n    .error { color:var(--danger, #a32121); }\n    .muted { color:var(--text-muted, #666); }\n  "] }]
    }], null, { student: [{
            type: Input,
            args: [{ required: true }]
        }], saved: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CollectionPanelComponent, { className: "CollectionPanelComponent", filePath: "frontend/src/app/features/outstanding/collection-panel.component.ts", lineNumber: 64 }); })();
//# sourceMappingURL=collection-panel.component.js.map