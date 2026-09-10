import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { defer, of } from 'rxjs';

export interface Incident {
  id: string; reference: string; studentId: string; studentName: string; classroomName: string;
  incidentDate: string; incidentType: string; severity: string; description: string; location: string;
  status: string; guardianInformed: boolean; version: number;
  actions: { id: string; actionType: string; description: string }[];
}
export type IncidentPayload = Pick<Incident, 'studentId' | 'incidentDate' | 'incidentType' | 'severity' | 'description' | 'location'>;
@Injectable({ providedIn: 'root' })
export class DisciplineService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/discipline/incidents`;
  private items: Incident[] = [];
  list() { return environment.useMockData ? of(structuredClone(this.items)) : this.http.get<Incident[]>(this.url); }
  create(payload: IncidentPayload, studentName: string, classroomName: string) {
    if (!environment.useMockData) return this.http.post<void>(this.url, payload);
    return defer(() => {
      this.items.unshift({ ...payload, id: crypto.randomUUID(), reference: `INC-${this.items.length + 1}`,
        studentName, classroomName, status: 'REPORTED', guardianInformed: false, version: 0, actions: [] });
      return of(undefined);
    });
  }
  update(item: Incident, status: string, guardianInformed: boolean) {
    if (!environment.useMockData) return this.http.put<void>(`${this.url}/${item.id}`, { status, guardianInformed, version: item.version });
    return defer(() => { this.items = this.items.map(i => i.id === item.id ? { ...i, status, guardianInformed, version: i.version + 1 } : i); return of(undefined); });
  }
  action(item: Incident, actionType: string, description: string) {
    if (!environment.useMockData) return this.http.post<void>(`${this.url}/${item.id}/actions`, { actionType, description });
    return defer(() => {
      this.items = this.items.map(i => i.id === item.id ? { ...i, status: 'ACTION_TAKEN', version: i.version + 1,
        actions: [...i.actions, { id: crypto.randomUUID(), actionType, description }] } : i);
      return of(undefined);
    });
  }
}
