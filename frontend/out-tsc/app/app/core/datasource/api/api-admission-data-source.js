import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class ApiAdmissionDataSource {
    http = inject(HttpClient);
    endpoint = `${environment.apiBaseUrl}/admissions`;
    search(query) {
        return this.http.get(this.endpoint, { params: toParams(query) });
    }
    options(academicYearId) {
        return this.http.get(`${this.endpoint}/options`, { params: toParams({ academicYearId }) });
    }
    get(id) {
        return this.http.get(`${this.endpoint}/${id}`);
    }
    create(payload) {
        return this.http.post(this.endpoint, payload);
    }
    changeStatus(id, payload) {
        return this.http.post(`${this.endpoint}/${id}/status`, payload);
    }
    updateDocument(admissionId, documentId, received) {
        return this.http.put(`${this.endpoint}/${admissionId}/documents/${documentId}`, { received });
    }
    static ɵfac = function ApiAdmissionDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiAdmissionDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiAdmissionDataSource, factory: ApiAdmissionDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiAdmissionDataSource, [{
        type: Injectable
    }], null, null); })();
function toParams(query) {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params = params.set(key, String(value));
        }
    });
    return params;
}
//# sourceMappingURL=api-admission-data-source.js.map