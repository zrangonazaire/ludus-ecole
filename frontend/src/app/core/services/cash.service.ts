import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { defer, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';

export interface CashSession {
  id: string; reference: string; status: 'OPEN' | 'CLOSED' | 'RECONCILED'; openedAt: string; closedAt: string | null;
  openingBalance: number; cashReceived: number; expectedBalance: number; actualBalance: number | null;
  difference: number | null; notes: string;
}
export interface CashMovement { id: string; reference: string; studentName: string; amount: number; method: string; date: string; }
@Injectable({ providedIn: 'root' })
export class CashService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly url = `${environment.apiBaseUrl}/cash/sessions`;
  private readonly demo = new Map<string, CashSession[]>();
  private key() { const u = this.auth.currentUser(); return `${u?.schoolId}:${u?.userId}`; }
  private items() { return this.demo.get(this.key()) ?? []; }
  private save(items: CashSession[]) { this.demo.set(this.key(), items); }
  list() { return environment.useMockData ? of(structuredClone(this.items())) : this.http.get<CashSession[]>(this.url); }
  movements(id: string) { return environment.useMockData ? of([] as CashMovement[]) : this.http.get<CashMovement[]>(`${this.url}/${id}/movements`); }
  open(openingBalance: number, notes: string) {
    if (!environment.useMockData) return this.http.post<CashSession>(this.url, { openingBalance, notes });
    return defer(() => {
      if (this.items().some(s => s.status === 'OPEN')) throw new Error('Une session est déjà ouverte.');
      const s: CashSession = { id: crypto.randomUUID(), reference: `CSH-DEMO-${this.items().length + 1}`, status: 'OPEN',
        openedAt: new Date().toISOString(), closedAt: null, openingBalance, cashReceived: 0, expectedBalance: openingBalance,
        actualBalance: null, difference: null, notes };
      this.save([s, ...this.items()]); return of(s);
    });
  }
  close(session: CashSession, actualBalance: number, notes: string) {
    if (!environment.useMockData) return this.http.post<CashSession>(`${this.url}/${session.id}/close`, { actualBalance, expectedBalance: session.expectedBalance, notes });
    return defer(() => {
      const current = this.items().find(i => i.id === session.id);
      if (!current || current.status !== 'OPEN') throw new Error('Cette session est clôturée.');
      const s: CashSession = { ...current, actualBalance, difference: actualBalance - current.expectedBalance,
        notes, status: 'CLOSED', closedAt: new Date().toISOString() };
      this.save(this.items().map(i => i.id === s.id ? s : i)); return of(s);
    });
  }
}
