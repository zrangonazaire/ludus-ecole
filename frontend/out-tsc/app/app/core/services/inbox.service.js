import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Ma boîte de réception.
 *
 * <p>Aucune méthode ne prend d'identifiant de destinataire, et il ne faut pas
 * en ajouter : le serveur déduit le destinataire du compte authentifié. Un
 * paramètre ici laisserait croire qu'on peut lire la boîte d'un autre, et
 * pousserait tôt ou tard à l'ouvrir côté serveur pour « faire marcher »
 * l'écran.</p>
 */
export class InboxService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/notifications`;
    emptyPage = {
        content: [], page: 0, size: 30, totalElements: 0,
        totalPages: 1, first: true, last: true
    };
    inbox(query) {
        if (environment.useMockData) {
            return of(this.emptyPage).pipe(delay(150));
        }
        let params = new HttpParams();
        if (query.category) {
            params = params.set('category', query.category);
        }
        if (query.unreadOnly) {
            params = params.set('unreadOnly', 'true');
        }
        params = params.set('page', String(query.page ?? 0));
        params = params.set('size', String(query.size ?? 30));
        return this.http.get(this.base, { params });
    }
    unreadCount() {
        if (environment.useMockData) {
            return of(0).pipe(delay(80));
        }
        return this.http.get(`${this.base}/unread-count`)
            .pipe(map((result) => result?.unread ?? 0));
    }
    categories() {
        if (environment.useMockData) {
            return of([]).pipe(delay(80));
        }
        return this.http.get(`${this.base}/categories`);
    }
    markRead(messageId) {
        if (environment.useMockData) {
            return of({}).pipe(delay(120));
        }
        return this.http.patch(`${this.base}/${messageId}/read`, {});
    }
    markAllRead() {
        if (environment.useMockData) {
            return of(0).pipe(delay(120));
        }
        return this.http.patch(`${this.base}/read-all`, {})
            .pipe(map((result) => result?.marked ?? 0));
    }
    static ɵfac = function InboxService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InboxService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: InboxService, factory: InboxService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InboxService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=inbox.service.js.map