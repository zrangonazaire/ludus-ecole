import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Le journal d'audit.
 *
 * <p>En démonstration, le journal est vide : inventer des entrées ferait
 * croire à une trace qui n'existe pas, et un journal d'audit qui ment sur son
 * contenu est exactement ce qu'il ne faut pas.</p>
 */
export class AuditService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/audit`;
    emptyPage = {
        content: [], page: 0, size: 50, totalElements: 0,
        totalPages: 1, first: true, last: true
    };
    search(query) {
        if (environment.useMockData) {
            return of(this.emptyPage).pipe(delay(150));
        }
        let params = new HttpParams();
        if (query.action) {
            params = params.set('action', query.action);
        }
        if (query.entityType) {
            params = params.set('entityType', query.entityType);
        }
        if (query.from) {
            params = params.set('from', query.from);
        }
        if (query.to) {
            params = params.set('to', query.to);
        }
        params = params.set('page', String(query.page ?? 0));
        params = params.set('size', String(query.size ?? 50));
        return this.http.get(this.base, { params });
    }
    entityTypes() {
        if (environment.useMockData) {
            return of([]).pipe(delay(120));
        }
        return this.http.get(`${this.base}/entity-types`);
    }
    static ɵfac = function AuditService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuditService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuditService, factory: AuditService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=audit.service.js.map