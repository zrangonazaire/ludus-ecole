import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent } from '@layouts/mobile-layout/mobile-layout.component';
import * as i0 from "@angular/core";
export class TeacherShellComponent {
    tabs = [
        { label: 'Accueil', route: '/teacher/home', icon: '▤' },
        { label: 'Classes', route: '/teacher/classes', icon: '▦' },
        { label: 'Présences', route: '/teacher/attendance', icon: '◇' },
        { label: 'Notes', route: '/teacher/grades', icon: '◉' },
        { label: 'Profil', route: '/teacher/profile', icon: '◍' }
    ];
    static ɵfac = function TeacherShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherShellComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherShellComponent, selectors: [["eduops-teacher-shell"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 1, consts: [["title", "Espace enseignant", "subtitle", "Soocloo", 3, "tabs"]], template: function TeacherShellComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "eduops-mobile-layout", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("tabs", ctx.tabs);
        } }, dependencies: [MobileLayoutComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherShellComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-teacher-shell',
                standalone: true,
                imports: [MobileLayoutComponent],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <eduops-mobile-layout title="Espace enseignant" subtitle="Soocloo" [tabs]="tabs" />
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherShellComponent, { className: "TeacherShellComponent", filePath: "frontend/src/app/features/teacher-portal/teacher-shell.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=teacher-shell.component.js.map