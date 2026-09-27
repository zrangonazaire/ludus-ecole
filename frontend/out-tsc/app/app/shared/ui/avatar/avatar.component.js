import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
function AvatarComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("avatar--" + ctx_r0.size);
    i0.ɵɵproperty("src", ctx_r0.photoUrl, i0.ɵɵsanitizeUrl)("alt", "Photo de " + ctx_r0.name);
} }
function AvatarComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("avatar--" + ctx_r0.size);
    i0.ɵɵstyleProp("background", ctx_r0.background());
    i0.ɵɵattribute("aria-label", ctx_r0.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.initials(), " ");
} }
/** Photo, or coloured initials derived deterministically from the name. */
export class AvatarComponent {
    set name(value) {
        this._name.set(value ?? '');
    }
    get name() {
        return this._name();
    }
    photoUrl;
    size = 'md';
    _name = signal('');
    initials = computed(() => {
        const parts = this._name().trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0)
            return '?';
        if (parts.length === 1)
            return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    });
    /** Stable colour per person: the same name always gets the same hue. */
    background = computed(() => {
        const palette = [
            'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
            'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)'
        ];
        const name = this._name();
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
        }
        return palette[hash % palette.length];
    });
    static ɵfac = function AvatarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AvatarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AvatarComponent, selectors: [["eduops-avatar"]], inputs: { name: "name", photoUrl: "photoUrl", size: "size" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 1, consts: [["loading", "lazy", 1, "avatar", 3, "class", "src", "alt"], ["role", "img", 1, "avatar", "avatar--initials", 3, "class", "background"], ["loading", "lazy", 1, "avatar", 3, "src", "alt"], ["role", "img", 1, "avatar", "avatar--initials"]], template: function AvatarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AvatarComponent_Conditional_0_Template, 1, 4, "img", 0)(1, AvatarComponent_Conditional_1_Template, 2, 6, "span", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.photoUrl ? 0 : 1);
        } }, dependencies: [CommonModule], styles: [".avatar[_ngcontent-%COMP%] {\n      display: inline-grid;\n      place-items: center;\n      border-radius: 50%;\n      object-fit: cover;\n      flex-shrink: 0;\n      font-family: var(--font-display);\n      font-weight: 700;\n      color: #fff;\n      letter-spacing: 0;\n    }\n    .avatar--sm[_ngcontent-%COMP%] { width: 28px; height: 28px; font-size: 11px; }\n    .avatar--md[_ngcontent-%COMP%] { width: 38px; height: 38px; font-size: 13px; }\n    .avatar--lg[_ngcontent-%COMP%] { width: 56px; height: 56px; font-size: 18px; }\n    .avatar--xl[_ngcontent-%COMP%] { width: 88px; height: 88px; font-size: 28px; }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarComponent, [{
        type: Component,
        args: [{ selector: 'eduops-avatar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (photoUrl) {
      <img class="avatar" [class]="'avatar--' + size" [src]="photoUrl"
           [alt]="'Photo de ' + name" loading="lazy" />
    } @else {
      <span class="avatar avatar--initials" [class]="'avatar--' + size"
            [style.background]="background()" [attr.aria-label]="name" role="img">
        {{ initials() }}
      </span>
    }
  `, styles: ["\n    .avatar {\n      display: inline-grid;\n      place-items: center;\n      border-radius: 50%;\n      object-fit: cover;\n      flex-shrink: 0;\n      font-family: var(--font-display);\n      font-weight: 700;\n      color: #fff;\n      letter-spacing: 0;\n    }\n    .avatar--sm { width: 28px; height: 28px; font-size: 11px; }\n    .avatar--md { width: 38px; height: 38px; font-size: 13px; }\n    .avatar--lg { width: 56px; height: 56px; font-size: 18px; }\n    .avatar--xl { width: 88px; height: 88px; font-size: 28px; }\n  "] }]
    }], null, { name: [{
            type: Input,
            args: [{ required: true }]
        }], photoUrl: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AvatarComponent, { className: "AvatarComponent", filePath: "frontend/src/app/shared/ui/avatar/avatar.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=avatar.component.js.map