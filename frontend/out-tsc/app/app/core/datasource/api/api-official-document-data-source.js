import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class ApiOfficialDocumentDataSource {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/documents`;
    search(query) {
        let params = new HttpParams();
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, String(value));
            }
        });
        return this.http.get(this.base, { params });
    }
    issue(payload) {
        return this.http.post(this.base, payload);
    }
    revoke(documentId, reason) {
        return this.http.post(`${this.base}/${documentId}/revoke`, { reason });
    }
    layout() {
        return this.http.get(`${this.base}/layout`);
    }
    saveLayout(layout) {
        return this.http.put(`${this.base}/layout`, layout);
    }
    static ɵfac = function ApiOfficialDocumentDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiOfficialDocumentDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiOfficialDocumentDataSource, factory: ApiOfficialDocumentDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiOfficialDocumentDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-official-document-data-source.js.map