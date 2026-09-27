import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class TeacherAccountService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/teachers`;
    available() { return this.http.get(`${this.base}/accounts`); }
    link(teacherId, userAccountId) {
        return this.http.put(`${this.base}/${teacherId}/account`, { userAccountId });
    }
    static ɵfac = function TeacherAccountService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherAccountService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TeacherAccountService, factory: TeacherAccountService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherAccountService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=teacher-account.service.js.map