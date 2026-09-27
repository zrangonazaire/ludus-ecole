import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
const STORAGE_KEY = 'eduops.step-guidance.v1';
/**
 * Remembers which contextual coachmarks were acknowledged on this device.
 * No school or account data is stored here: only opaque flow/step identifiers.
 */
export class StepGuidanceService {
    seenKeys = signal(this.restore());
    isSeen(flow, step) {
        return this.seenKeys().has(this.key(flow, step));
    }
    markSeen(flow, step) {
        const next = new Set(this.seenKeys());
        next.add(this.key(flow, step));
        this.seenKeys.set(next);
        this.persist(next);
    }
    key(flow, step) {
        return `${flow}:${step}`;
    }
    restore() {
        if (typeof localStorage === 'undefined') {
            return new Set();
        }
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
            return new Set(Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []);
        }
        catch {
            return new Set();
        }
    }
    persist(values) {
        if (typeof localStorage === 'undefined') {
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...values]));
        }
        catch {
            // The guide remains usable in memory when browser storage is unavailable.
        }
    }
    static ɵfac = function StepGuidanceService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StepGuidanceService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StepGuidanceService, factory: StepGuidanceService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StepGuidanceService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=step-guidance.service.js.map