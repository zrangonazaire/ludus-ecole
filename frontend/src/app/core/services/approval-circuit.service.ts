import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import {
  ApprovalCircuit, ApprovalCircuitLevel, ApprovalCircuitPayload
} from '@core/models/approval-circuit.models';

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
@Injectable({ providedIn: 'root' })
export class ApprovalCircuitService {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/approval-circuits`;

  private mock: ApprovalCircuit[] | null = null;

  list(): Observable<ApprovalCircuit[]> {
    if (environment.useMockData) {
      return of(this.mockList()).pipe(delay(150));
    }
    return this.http.get<ApprovalCircuit[]>(this.base);
  }

  create(payload: ApprovalCircuitPayload): Observable<ApprovalCircuit> {
    if (environment.useMockData) {
      return of(this.mockSave(null, payload)).pipe(delay(200));
    }
    return this.http.post<ApprovalCircuit>(this.base, payload);
  }

  update(id: string, payload: ApprovalCircuitPayload): Observable<ApprovalCircuit> {
    if (environment.useMockData) {
      return of(this.mockSave(id, payload)).pipe(delay(200));
    }
    return this.http.put<ApprovalCircuit>(`${this.base}/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    if (environment.useMockData) {
      this.mock = this.mockList().filter((c) => c.id !== id);
      return of(undefined).pipe(delay(150));
    }
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // ─────────────────────────────────────────────── démonstration

  /** Seed qui reprend l'exemple de référence : VAL-ADM, deux niveaux. */
  private seed(): ApprovalCircuit[] {
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

  private mockList(): ApprovalCircuit[] {
    if (!this.mock) {
      this.mock = this.seed();
    }
    return this.mock;
  }

  private mockSave(id: string | null, payload: ApprovalCircuitPayload): ApprovalCircuit {
    const levels: ApprovalCircuitLevel[] = payload.levels.map((level, i, all) => ({
      id: `circuit-level-${i + 1}`,
      levelNumber: i + 1,
      code: level.code.trim().toUpperCase(),
      mode: level.mode,
      last: i === all.length - 1,
      members: level.memberIds.map((memberId) => ({ id: memberId }))
    }));
    const circuit: ApprovalCircuit = {
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
}
