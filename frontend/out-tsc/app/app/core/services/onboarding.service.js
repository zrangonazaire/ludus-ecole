import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class OnboardingService {
    http = inject(HttpClient);
    apply(payload) {
        return this.http.post(`${environment.apiBaseUrl}/school/onboarding`, payload);
    }
    static ɵfac = function OnboardingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OnboardingService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OnboardingService, factory: OnboardingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OnboardingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=onboarding.service.js.map