import { createUuid } from "../utils/uuid";
import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
/** In-memory toast queue. No browser storage is used. */
export class NotificationService {
    _toasts = signal([]);
    toasts = this._toasts.asReadonly();
    success(message, title) {
        this.push('success', message, title, 4000);
    }
    error(message, title) {
        this.push('error', message, title, 7000);
    }
    warning(message, title) {
        this.push('warning', message, title, 5500);
    }
    info(message, title) {
        this.push('info', message, title, 4000);
    }
    dismiss(id) {
        this._toasts.update((list) => list.filter((t) => t.id !== id));
    }
    push(tone, message, title, timeout) {
        const toast = { id: createUuid(), tone, message, title, timeout };
        this._toasts.update((list) => [...list, toast]);
        setTimeout(() => this.dismiss(toast.id), timeout);
    }
    static ɵfac = function NotificationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=notification.service.js.map