import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdministrationComponent } from '../administration/administration.component';
import * as i0 from "@angular/core";
/**
 * Onglet Identite : reutilise l'ecran Paramètres tel quel.
 *
 * Aucune duplication : le contenu (identite, coordonnees, preferences,
 * numerotation, logo, code/statut) est celui de `AdministrationComponent`
 * (`GET`/`PUT /api/v1/school`). Toute evolution de l'ecran se repercute ici.
 */
export class SystemConfigIdentityComponent {
    static ɵfac = function SystemConfigIdentityComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SystemConfigIdentityComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SystemConfigIdentityComponent, selectors: [["eduops-system-config-identity"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 0, template: function SystemConfigIdentityComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "eduops-administration");
        } }, dependencies: [AdministrationComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SystemConfigIdentityComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-system-config-identity',
                standalone: true,
                imports: [AdministrationComponent],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `<eduops-administration />`
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SystemConfigIdentityComponent, { className: "SystemConfigIdentityComponent", filePath: "frontend/src/app/features/system-config/system-config-identity.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=system-config-identity.component.js.map