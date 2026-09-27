import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class StudentStatementService {
    http = inject(HttpClient);
    get(studentId) {
        return this.http.get(`${environment.apiBaseUrl}/students/${studentId}/statement`);
    }
    static ɵfac = function StudentStatementService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentStatementService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StudentStatementService, factory: StudentStatementService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentStatementService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=student-statement.service.js.map