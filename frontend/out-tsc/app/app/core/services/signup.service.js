import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Public signup.
 *
 * <p>Unlike the rest of the application this service talks to HttpClient
 * directly: there is no tenant yet, so the DataSource abstraction — which is
 * organised per business domain — does not apply.</p>
 */
export class SignupService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/public`;
    signup(request) {
        if (environment.useMockData) {
            return of(this.mockResponse(request)).pipe(delay(700));
        }
        return this.http.post(`${this.base}/signup`, request);
    }
    /** Live check so the form warns before submitting. */
    isSchoolCodeAvailable(code) {
        if (environment.useMockData) {
            return of(code.trim().toUpperCase() !== 'DEMO').pipe(delay(250));
        }
        return this.http
            .get(`${this.base}/check-school-code`, { params: { code } })
            .pipe(map((r) => r.available));
    }
    isEmailAvailable(email) {
        if (environment.useMockData) {
            return of(!email.toLowerCase().startsWith('admin@')).pipe(delay(250));
        }
        return this.http
            .get(`${this.base}/check-email`, { params: { email } })
            .pipe(map((r) => r.available));
    }
    mockResponse(request) {
        const year = new Date().getMonth() >= 8
            ? new Date().getFullYear()
            : new Date().getFullYear() - 1;
        return {
            schoolId: 'mock-school',
            schoolCode: request.schoolCode.toUpperCase(),
            schoolName: request.schoolName,
            userId: 'mock-user',
            email: request.email,
            fullName: `${request.firstName} ${request.lastName}`,
            academicYearId: 'mock-year',
            academicYearCode: `${year}-${year + 1}`,
            accessToken: 'mock-access-token.admin',
            refreshToken: 'mock-refresh-token.admin',
            expiresIn: 28800,
            // La démonstration suit la même règle que le serveur : l'assistant n'est
            // proposé que si le parcours n'a rien configuré.
            onboardingRequired: !request.operations
                || request.operations.cycles.length === 0
        };
    }
    static ɵfac = function SignupService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignupService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SignupService, factory: SignupService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignupService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=signup.service.js.map