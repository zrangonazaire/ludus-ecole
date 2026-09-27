import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class ApiAccessProfileDataSource {
    http = inject(HttpClient);
    endpoint = `${environment.apiBaseUrl}/access-profiles`;
    overview() {
        return this.http.get(this.endpoint);
    }
    create(payload) {
        return this.http.post(this.endpoint, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.endpoint}/${id}`, payload);
    }
    static ɵfac = function ApiAccessProfileDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiAccessProfileDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiAccessProfileDataSource, factory: ApiAccessProfileDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiAccessProfileDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-access-profile-data-source.js.map