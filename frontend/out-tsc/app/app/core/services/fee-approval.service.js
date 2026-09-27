import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class FeeApprovalService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/fees`;
    list() { return this.http.get(`${this.base}/requests`); }
    decide(id, decision, comment) {
        return this.http.post(`${this.base}/requests/${id}/decision`, { decision, comment });
    }
    createType(body, circuitId) {
        return this.http.post(`${this.base}/types`, body, { params: { circuitId } });
    }
    updateType(id, body, circuitId) {
        return this.http.put(`${this.base}/types/${id}`, body, { params: { circuitId } });
    }
    archiveType(id, circuitId) {
        return this.http.post(`${this.base}/types/${id}/archive`, {}, { params: { circuitId } });
    }
    saveSchedule(body, circuitId) {
        return this.http.put(`${this.base}/schedules`, body, { params: { circuitId } });
    }
    deleteSchedule(id, circuitId) {
        return this.http.delete(`${this.base}/schedules/${id}`, { params: { circuitId } });
    }
    apply(body, circuitId) {
        return this.http.post(`${this.base}/apply`, body, { params: { circuitId } });
    }
    static ɵfac = function FeeApprovalService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FeeApprovalService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FeeApprovalService, factory: FeeApprovalService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeeApprovalService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=fee-approval.service.js.map