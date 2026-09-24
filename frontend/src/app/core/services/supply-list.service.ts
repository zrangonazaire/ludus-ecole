import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';

export interface SupplyItem { name: string; quantity: number; details: string; }
export interface SupplyListPayload { version: number | null; title: string; notes: string; items: SupplyItem[]; }
export interface SupplyList extends SupplyListPayload {
  id: string | null; schoolName: string; levelName: string; yearLabel: string;
}
export interface SupplyYear { id: string; label: string; status: string; }

@Injectable({ providedIn: 'root' })
export class SupplyListService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/supply-lists`;
  years() { return this.http.get<SupplyYear[]>(`${this.base}/years`); }
  get(levelId: string, yearId: string) {
    return this.http.get<SupplyList>(`${this.base}/${levelId}/${yearId}`);
  }
  save(levelId: string, yearId: string, payload: SupplyListPayload) {
    return this.http.put<SupplyList>(`${this.base}/${levelId}/${yearId}`, payload);
  }
}
