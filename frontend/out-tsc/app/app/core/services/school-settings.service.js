import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Les paramètres de l'établissement : une lecture, une écriture.
 *
 * <p>En démonstration, un établissement fictif est servi depuis
 * l'environnement : montrer un formulaire vide à une école qui n'a rien
 * configuré ferait croire que rien n'existe, alors que la plateforme a déjà
 * une devise, une langue et une échelle de notation par défaut.</p>
 */
export class SchoolSettingsService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/school`;
    mockSettings = null;
    mockAppearance = null;
    get() {
        if (environment.useMockData) {
            return of(this.mock ?? this.seed()).pipe(delay(200));
        }
        return this.http.get(this.base);
    }
    update(payload) {
        if (environment.useMockData) {
            this.mockSettings = { ...this.mock ?? this.seed(), ...payload };
            return of(this.mockSettings).pipe(delay(250));
        }
        return this.http.put(this.base, payload);
    }
    /**
     * Apparence et région enregistrées pour l'établissement.
     *
     * <p>Lecture séparée de {@link get} : l'écran « Apparence et région » peut
     * s'ouvrir sans embarquer toute l'identité, et la réponse reste petite.</p>
     */
    getAppearance() {
        if (environment.useMockData) {
            return of(this.mockAppearance ?? this.seedAppearance()).pipe(delay(200));
        }
        return this.http.get(`${this.base}/appearance`);
    }
    updateAppearance(payload) {
        if (environment.useMockData) {
            this.mockAppearance = { ...payload };
            return of(this.mockAppearance).pipe(delay(250));
        }
        return this.http.put(`${this.base}/appearance`, payload);
    }
    // ─────────────────────────────────────────────── démonstration
    get mock() {
        return this.mockSettings;
    }
    seed() {
        return {
            id: 'local-school',
            code: 'HORIZON',
            status: 'ACTIVE',
            name: environment.schoolName,
            legalName: null,
            motto: null,
            registrationNumber: null,
            email: null,
            phone: null,
            website: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            country: "Cote d'Ivoire",
            currency: environment.currency,
            locale: environment.locale,
            timezone: 'Africa/Abidjan',
            gradingScaleMax: environment.gradingScaleMax,
            rankingEnabled: true,
            studentNumberPattern: 'EDU-{year}-{seq:6}',
            receiptNumberPattern: 'REC-{year}-{seq:8}',
            invoiceNumberPattern: 'INV-{year}-{seq:8}'
        };
    }
    seedAppearance() {
        return {
            brand: '#1f5fd6',
            fontSize: 'normal',
            currency: environment.currency,
            locale: environment.locale,
            timezone: 'Africa/Abidjan'
        };
    }
    static ɵfac = function SchoolSettingsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SchoolSettingsService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SchoolSettingsService, factory: SchoolSettingsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SchoolSettingsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=school-settings.service.js.map