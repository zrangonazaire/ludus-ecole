import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastHostComponent } from '@shared/ui/toast-host/toast-host.component';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { PageHelpComponent } from '@shared/ui/page-help/page-help.component';
import * as i0 from "@angular/core";
export class AppComponent {
    auth = inject(AuthService);
    ws = inject(WebSocketService);
    constructor() {
        // Open the realtime channel as soon as a session exists, close it on logout.
        effect(() => {
            if (this.auth.isAuthenticated()) {
                // Fire and forget: a realtime failure must never block the UI.
                void this.ws.connect();
            }
            else {
                this.ws.disconnect();
            }
        }, { allowSignalWrites: true });
    }
    static ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["eduops-root"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet")(1, "eduops-page-help")(2, "eduops-toast-host");
        } }, dependencies: [RouterOutlet, ToastHostComponent, PageHelpComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-root',
                standalone: true,
                imports: [RouterOutlet, ToastHostComponent, PageHelpComponent],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <router-outlet />
    <eduops-page-help />
    <eduops-toast-host />
  `
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "frontend/src/app/app.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=app.component.js.map