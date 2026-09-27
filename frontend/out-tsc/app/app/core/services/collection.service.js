import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
export class CollectionService {
    http = inject(HttpClient);
    url(id) { return `${environment.apiBaseUrl}/outstanding/${id}/actions`; }
    history(id) { return this.http.get(this.url(id)); }
    create(id, action) {
        return this.http.post(this.url(id), action);
    }
    static ɵfac = function CollectionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CollectionService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CollectionService, factory: CollectionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CollectionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=collection.service.js.map