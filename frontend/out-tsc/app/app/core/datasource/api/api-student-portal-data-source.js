import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class ApiStudentPortalDataSource {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/student`;
    dashboard() {
        return this.http.get(`${this.base}/dashboard`);
    }
    timetable() {
        return this.http.get(`${this.base}/timetable`);
    }
    grades() {
        return this.http.get(`${this.base}/grades`);
    }
    reportCards() {
        return this.http.get(`${this.base}/report-cards`);
    }
    attendance() {
        return this.http.get(`${this.base}/attendance`);
    }
    profile() {
        return this.http.get(`${environment.apiBaseUrl}/auth/me`);
    }
    static ɵfac = function ApiStudentPortalDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiStudentPortalDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiStudentPortalDataSource, factory: ApiStudentPortalDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiStudentPortalDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-student-portal-data-source.js.map