import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Les années scolaires de l'établissement.
 *
 * <p>Le découpage en périodes est calculé ici aussi, à l'identique du serveur.
 * Ce n'est pas une duplication gratuite : l'écran montre les dates avant
 * d'enregistrer, et un aperçu qui différerait d'un jour de ce que le serveur
 * créera ferait mentir la seule chose que l'utilisateur peut vérifier.</p>
 */
export class AcademicYearService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/school/academic-years`;
    /** L'état de démonstration, alimenté par ce que la personne crée. */
    mockYears = [];
    list() {
        if (environment.useMockData) {
            return of([...this.mockYears]).pipe(delay(200));
        }
        return this.http.get(this.base);
    }
    create(payload) {
        if (environment.useMockData) {
            const created = this.buildMockYear(payload);
            this.mockYears = [created, ...this.mockYears];
            return of(created).pipe(delay(400));
        }
        return this.http.post(this.base, payload);
    }
    activate(yearId) {
        if (environment.useMockData) {
            // Le simulacre applique la même règle que le serveur : l'ancienne année
            // active passe en clôture, elle n'est pas fermée.
            this.mockYears = this.mockYears.map((year) => year.active
                ? { ...year, active: false, status: 'CLOSING', statusLabel: 'Clôture en cours' }
                : year);
            this.mockYears = this.mockYears.map((year) => year.id === yearId
                ? { ...year, active: true, status: 'ACTIVE', statusLabel: 'Année de travail' }
                : year);
            const found = this.mockYears.find((year) => year.id === yearId);
            return of(found ?? this.mockYears[0]).pipe(delay(300));
        }
        return this.http.post(`${this.base}/${yearId}/activate`, {});
    }
    // ──────────────────────────────────────────── aperçu du découpage
    /**
     * Les périodes que produirait ce découpage.
     *
     * <p>Même règle que le serveur : le reste de la division va aux premières
     * périodes, et la dernière finit exactement le dernier jour de l'année. Un
     * jour orphelin entre les deux laisserait des absences et des notes qu'aucune
     * période ne pourrait porter.</p>
     */
    previewTerms(startDate, endDate, termType, count) {
        const start = parseDate(startDate);
        const end = parseDate(endDate);
        if (!start || !end || end <= start || count < 1) {
            return [];
        }
        const totalDays = daysBetween(start, end) + 1;
        if (totalDays < count) {
            return [];
        }
        const base = Math.floor(totalDays / count);
        const remainder = totalDays % count;
        const terms = [];
        let cursor = start;
        for (let index = 1; index <= count; index++) {
            const length = base + (index <= remainder ? 1 : 0);
            const last = index === count;
            const termEnd = last ? end : addDays(cursor, length - 1);
            terms.push({
                id: `preview-${index}`,
                name: termName(termType, index),
                code: termCode(termType, index),
                termType,
                termTypeLabel: typeLabel(termType),
                sequence: index,
                startDate: toIso(cursor),
                endDate: toIso(termEnd),
                status: 'PLANNED',
                statusLabel: 'Prévue',
                weight: '1.000'
            });
            cursor = addDays(termEnd, 1);
        }
        return terms;
    }
    buildMockYear(payload) {
        return {
            id: `local-${Date.now()}`,
            code: payload.code,
            label: payload.label?.trim() || payload.code,
            startDate: payload.startDate,
            endDate: payload.endDate,
            status: 'DRAFT',
            statusLabel: 'Brouillon',
            active: false,
            editable: true,
            classroomCount: 0,
            enrollmentCount: 0,
            terms: this.previewTerms(payload.startDate, payload.endDate, payload.termType, payload.termCount)
        };
    }
    static ɵfac = function AcademicYearService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AcademicYearService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AcademicYearService, factory: AcademicYearService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AcademicYearService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
// ───────────────────────────────────────────────────────── dates
/** Les dates circulent en AAAA-MM-JJ ; on reste en UTC pour éviter les décalages. */
function parseDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) {
        return null;
    }
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
}
function toIso(date) {
    return date.toISOString().slice(0, 10);
}
function addDays(date, days) {
    return new Date(date.getTime() + days * 86400000);
}
function daysBetween(from, to) {
    return Math.round((to.getTime() - from.getTime()) / 86400000);
}
function termName(type, index) {
    const ordinal = index === 1 ? '1er' : `${index}e`;
    switch (type) {
        case 'TRIMESTER': return `${ordinal} trimestre`;
        case 'SEMESTER': return `${ordinal} semestre`;
        case 'TERM': return `${ordinal} période`;
        default: return `Période ${index}`;
    }
}
function termCode(type, index) {
    const prefix = { TRIMESTER: 'T', SEMESTER: 'S', TERM: 'P', CUSTOM: 'C' }[type];
    return `${prefix}${index}`;
}
function typeLabel(type) {
    return ({
        TRIMESTER: 'Trimestre', SEMESTER: 'Semestre',
        TERM: 'Période', CUSTOM: 'Découpage libre'
    })[type];
}
//# sourceMappingURL=academic-year.service.js.map