import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent } from '@layouts/mobile-layout/mobile-layout.component';
import * as i0 from "@angular/core";
export class ParentShellComponent {
    tabs = [
        { label: 'Accueil', route: '/parent/home', icon: '▤' },
        { label: 'Enfants', route: '/parent/children', icon: '◍' },
        { label: 'Scolarité', route: '/parent/academics', icon: '◉' },
        { label: 'Encaissements', route: '/parent/payments', icon: '◧' },
        { label: 'Profil', route: '/parent/profile', icon: '◌' }
    ];
    static ɵfac = function ParentShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ParentShellComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ParentShellComponent, selectors: [["eduops-parent-shell"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 1, consts: [["title", "Espace parent", "subtitle", "Soocloo", 3, "tabs"]], template: function ParentShellComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "eduops-mobile-layout", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("tabs", ctx.tabs);
        } }, dependencies: [MobileLayoutComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ParentShellComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-parent-shell',
                standalone: true,
                imports: [MobileLayoutComponent],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <eduops-mobile-layout title="Espace parent" subtitle="Soocloo" [tabs]="tabs" />
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ParentShellComponent, { className: "ParentShellComponent", filePath: "frontend/src/app/features/parent-portal/parent-shell.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=parent-shell.component.js.map