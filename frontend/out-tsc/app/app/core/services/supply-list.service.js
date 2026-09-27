import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class SupplyListService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/supply-lists`;
    years() { return this.http.get(`${this.base}/years`); }
    get(levelId, yearId) {
        return this.http.get(`${this.base}/${levelId}/${yearId}`);
    }
    save(levelId, yearId, payload) {
        return this.http.put(`${this.base}/${levelId}/${yearId}`, payload);
    }
    static ɵfac = function SupplyListService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SupplyListService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SupplyListService, factory: SupplyListService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupplyListService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=supply-list.service.js.map