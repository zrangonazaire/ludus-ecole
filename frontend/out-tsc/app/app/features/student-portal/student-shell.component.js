import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileLayoutComponent } from '@layouts/mobile-layout/mobile-layout.component';
import * as i0 from "@angular/core";
export class StudentShellComponent {
    tabs = [
        { label: 'Accueil', route: '/student/home', icon: '▤' },
        { label: 'Emploi', route: '/student/timetable', icon: '▥' },
        { label: 'Notes', route: '/student/grades', icon: '◉' },
        { label: 'Bulletins', route: '/student/report-cards', icon: '▣' },
        { label: 'Profil', route: '/student/profile', icon: '◌' }
    ];
    static ɵfac = function StudentShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentShellComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentShellComponent, selectors: [["eduops-student-shell"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 1, consts: [["title", "Espace \u00E9l\u00E8ve", "subtitle", "Soocloo", 3, "tabs"]], template: function StudentShellComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "eduops-mobile-layout", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("tabs", ctx.tabs);
        } }, dependencies: [MobileLayoutComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentShellComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-student-shell',
                standalone: true,
                imports: [MobileLayoutComponent],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <eduops-mobile-layout title="Espace élève" subtitle="Soocloo" [tabs]="tabs" />
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentShellComponent, { className: "StudentShellComponent", filePath: "frontend/src/app/features/student-portal/student-shell.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=student-shell.component.js.map