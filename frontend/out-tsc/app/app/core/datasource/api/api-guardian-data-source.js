import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class ApiGuardianDataSource {
    http = inject(HttpClient);
    endpoint = `${environment.apiBaseUrl}/guardians`;
    search(query) {
        let params = new HttpParams();
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, String(value));
            }
        });
        return this.http.get(this.endpoint, { params });
    }
    static ɵfac = function ApiGuardianDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiGuardianDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiGuardianDataSource, factory: ApiGuardianDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiGuardianDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-guardian-data-source.js.map