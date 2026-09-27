import { createUuid } from "../utils/uuid";
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { defer, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import * as i0 from "@angular/core";
export class CashService {
    http = inject(HttpClient);
    auth = inject(AuthService);
    url = `${environment.apiBaseUrl}/cash/sessions`;
    demo = new Map();
    key() { const u = this.auth.currentUser(); return `${u?.schoolId}:${u?.userId}`; }
    items() { return this.demo.get(this.key()) ?? []; }
    save(items) { this.demo.set(this.key(), items); }
    list() { return environment.useMockData ? of(structuredClone(this.items())) : this.http.get(this.url); }
    movements(id) { return environment.useMockData ? of([]) : this.http.get(`${this.url}/${id}/movements`); }
    open(openingBalance, notes) {
        if (!environment.useMockData)
            return this.http.post(this.url, { openingBalance, notes });
        return defer(() => {
            if (this.items().some(s => s.status === 'OPEN'))
                throw new Error('Une session est déjà ouverte.');
            const s = { id: createUuid(), reference: `CSH-DEMO-${this.items().length + 1}`, status: 'OPEN',
                openedAt: new Date().toISOString(), closedAt: null, openingBalance, cashReceived: 0, expectedBalance: openingBalance,
                actualBalance: null, difference: null, notes };
            this.save([s, ...this.items()]);
            return of(s);
        });
    }
    close(session, actualBalance, notes) {
        if (!environment.useMockData)
            return this.http.post(`${this.url}/${session.id}/close`, { actualBalance, expectedBalance: session.expectedBalance, notes });
        return defer(() => {
            const current = this.items().find(i => i.id === session.id);
            if (!current || current.status !== 'OPEN')
                throw new Error('Cette session est clôturée.');
            const s = { ...current, actualBalance, difference: actualBalance - current.expectedBalance,
                notes, status: 'CLOSED', closedAt: new Date().toISOString() };
            this.save(this.items().map(i => i.id === s.id ? s : i));
            return of(s);
        });
    }
    static ɵfac = function CashService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CashService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CashService, factory: CashService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CashService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=cash.service.js.map