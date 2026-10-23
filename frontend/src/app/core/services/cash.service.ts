import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { defer, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';

export interface CashSession {
  id: string; reference: string; status: 'OPEN' | 'CLOSED' | 'RECONCILED'; openedAt: string; closedAt: string | null;
  openingBalance: number; cashReceived: number; expectedBalance: number; actualBalance: number | null;
  difference: number | null; notes: string; cashRegisterId: string | null; cashRegisterName: string | null;
  openedByUserId: string | null;
}
export interface CashMovement { id: string; reference: string; studentName: string; amount: number; method: string; date: string; }
export interface CashierOption { id: string; name: string; username: string; }
export interface CashRegister {
  id: string; name: string; cashierUserId: string; cashierName: string; cashierUsername: string; openSession: boolean;
}
export interface CashRegisterOverview { registers: CashRegister[]; cashiers: CashierOption[]; }
@Injectable({ providedIn: 'root' })
export class CashService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly url = `${environment.apiBaseUrl}/cash/sessions`;
  private readonly registersUrl = `${environment.apiBaseUrl}/cash/registers`;
  private readonly demo = new Map<string, CashSession[]>();
  private key() { const u = this.auth.currentUser(); return `${u?.schoolId}:${u?.userId}`; }
  private items() { return this.demo.get(this.key()) ?? []; }
  private save(items: CashSession[]) { this.demo.set(this.key(), items); }
  list() { return environment.useMockData ? of(structuredClone(this.items())) : this.http.get<CashSession[]>(this.url); }
  listRegisters() { return environment.useMockData
    ? of({ registers: [] as CashRegister[], cashiers: [] as CashierOption[] })
    : this.http.get<CashRegisterOverview>(this.registersUrl); }
  createRegister(name: string, cashierUserId: string) {
    return this.http.post<CashRegister>(this.registersUrl, { name, cashierUserId });
  }
  openRegister(id: string, openingBalance: number, notes: string) {
    return this.http.post<CashSession>(`${this.registersUrl}/${id}/open`, { openingBalance, notes });
  }
  updateRegister(id: string, name: string, cashierUserId: string) {
    return this.http.put<CashRegister>(`${this.registersUrl}/${id}`, { name, cashierUserId });
  }
  movements(id: string) { return environment.useMockData ? of([] as CashMovement[]) : this.http.get<CashMovement[]>(`${this.url}/${id}/movements`); }
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
