import { createUuid } from "../utils/uuid";
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { defer, of } from 'rxjs';
import * as i0 from "@angular/core";
export class DisciplineService {
    http = inject(HttpClient);
    url = `${environment.apiBaseUrl}/discipline/incidents`;
    items = [];
    list() { return environment.useMockData ? of(structuredClone(this.items)) : this.http.get(this.url); }
    create(payload, studentName, classroomName) {
        if (!environment.useMockData)
            return this.http.post(this.url, payload);
        return defer(() => {
            this.items.unshift({ ...payload, id: createUuid(), reference: `INC-${this.items.length + 1}`,
                studentName, classroomName, status: 'REPORTED', guardianInformed: false, version: 0, actions: [] });
            return of(undefined);
        });
    }
    update(item, status, guardianInformed) {
        if (!environment.useMockData)
            return this.http.put(`${this.url}/${item.id}`, { status, guardianInformed, version: item.version });
        return defer(() => { this.items = this.items.map(i => i.id === item.id ? { ...i, status, guardianInformed, version: i.version + 1 } : i); return of(undefined); });
    }
    action(item, actionType, description) {
        if (!environment.useMockData)
            return this.http.post(`${this.url}/${item.id}/actions`, { actionType, description });
        return defer(() => {
            this.items = this.items.map(i => i.id === item.id ? { ...i, status: 'ACTION_TAKEN', version: i.version + 1,
                actions: [...i.actions, { id: createUuid(), actionType, description }] } : i);
            return of(undefined);
        });
    }
    static ɵfac = function DisciplineService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DisciplineService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DisciplineService, factory: DisciplineService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DisciplineService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=discipline.service.js.map