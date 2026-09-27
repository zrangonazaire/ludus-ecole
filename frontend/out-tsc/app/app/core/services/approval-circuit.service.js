import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Circuits de validation nommés, persistés par établissement.
 *
 * <p>Le serveur porte la vérité (`/api/v1/approval-circuits`) : les circuits
 * sont partagés par tous les postes du même établissement, chaque écriture est
 * journalisée. En mode démonstration seulement, un magasin en mémoire prend le
 * relais — il ne survit pas au rechargement, et c'est volontaire : rien ici ne
 * doit laisser croire qu'une configuration a été enregistrée alors qu'aucun
 * serveur ne l'a reçue.</p>
 */
export class ApprovalCircuitService {
    http = inject(HttpClient);
    base = `${environment.apiBaseUrl}/approval-circuits`;
    mock = null;
    list() {
        if (environment.useMockData) {
            return of(this.mockList()).pipe(delay(150));
        }
        return this.http.get(this.base);
    }
    create(payload) {
        if (environment.useMockData) {
            return of(this.mockSave(null, payload)).pipe(delay(200));
        }
        return this.http.post(this.base, payload);
    }
    update(id, payload) {
        if (environment.useMockData) {
            return of(this.mockSave(id, payload)).pipe(delay(200));
        }
        return this.http.put(`${this.base}/${id}`, payload);
    }
    remove(id) {
        if (environment.useMockData) {
            this.mock = this.mockList().filter((c) => c.id !== id);
            return of(undefined).pipe(delay(150));
        }
        return this.http.delete(`${this.base}/${id}`);
    }
    // ─────────────────────────────────────────────── démonstration
    /** Seed qui reprend l'exemple de référence : VAL-ADM, deux niveaux. */
    seed() {
        return [{
                id: 'seed-val-adm',
                code: 'VAL-ADM',
                name: 'VALIDATION DOSSIER ADMISSION',
                usage: 'DISCOUNT',
                levels: [
                    { id: 'seed-val-adm-1', levelNumber: 1, code: 'DOPI', mode: 'ALL', last: false, members: [] },
                    { id: 'seed-val-adm-2', levelNumber: 2, code: 'DIR', mode: 'ONE', last: true, members: [] }
                ]
            }];
    }
    mockList() {
        if (!this.mock) {
            this.mock = this.seed();
        }
        return this.mock;
    }
    mockSave(id, payload) {
        const levels = payload.levels.map((level, i, all) => ({
            id: `circuit-level-${i + 1}`,
            levelNumber: i + 1,
            code: level.code.trim().toUpperCase(),
            mode: level.mode,
            last: i === all.length - 1,
            members: level.memberIds.map((memberId) => ({ id: memberId }))
        }));
        const circuit = {
            id: id ?? `circuit-${Date.now()}`,
            code: payload.code.trim().toUpperCase(),
            name: payload.name.trim(),
            usage: payload.usage ?? 'DISCOUNT',
            updatedAt: new Date().toISOString(),
            levels
        };
        const others = this.mockList().filter((c) => c.id !== circuit.id);
        this.mock = [...others, circuit].sort((a, b) => a.code.localeCompare(b.code));
        return circuit;
    }
    static ɵfac = function ApprovalCircuitService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApprovalCircuitService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApprovalCircuitService, factory: ApprovalCircuitService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApprovalCircuitService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=approval-circuit.service.js.map