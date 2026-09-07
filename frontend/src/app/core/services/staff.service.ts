import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { PageResponse } from '@core/models/common.models';
import {
  ALLOWED_TRANSITIONS, CONTRACT_TYPES, STAFF_STATUSES, StaffMember,
  StaffQuery, StaffSavePayload, StaffStatus, StaffStatusPayload
} from '@core/models/staff.models';

/**
 * Le personnel non enseignant.
 *
 * <p>En démonstration, la liste part vide et se remplit de ce que la personne
 * crée : montrer un personnel fictif à une école qui n'en a saisi aucun lui
 * ferait croire que des dossiers existent déjà.</p>
 */
@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/staff`;

  private mockStaff: StaffMember[] = [];
  private mockSequence = 1;

  search(query: StaffQuery): Observable<PageResponse<StaffMember>> {
    if (environment.useMockData) {
      return of(this.searchLocally(query)).pipe(delay(200));
    }
    let params = new HttpParams();
    if (query.search?.trim()) {
      params = params.set('search', query.search.trim());
    }
    if (query.status) {
      params = params.set('status', query.status);
    }
    params = params.set('page', String(query.page ?? 0));
    params = params.set('size', String(query.size ?? 25));
    return this.http.get<PageResponse<StaffMember>>(this.base, { params });
  }

  counts(): Observable<Record<string, number>> {
    if (environment.useMockData) {
      return of(this.countLocally()).pipe(delay(120));
    }
    return this.http.get<Record<string, number>>(`${this.base}/counts`);
  }

  create(payload: StaffSavePayload): Observable<StaffMember> {
    if (environment.useMockData) {
      const created = this.buildMock(payload);
      this.mockStaff = [created, ...this.mockStaff];
      return of(created).pipe(delay(300));
    }
    return this.http.post<StaffMember>(this.base, payload);
  }

  update(staffId: string, payload: StaffSavePayload): Observable<StaffMember> {
    if (environment.useMockData) {
      const updated = this.mockStaff.map((member) => member.id === staffId
        ? { ...member, ...this.decorate(payload), id: member.id,
            employeeNumber: member.employeeNumber, status: member.status,
            statusLabel: member.statusLabel, hasUserAccount: member.hasUserAccount }
        : member);
      this.mockStaff = updated;
      return of(this.mockStaff.find((m) => m.id === staffId)!).pipe(delay(250));
    }
    return this.http.put<StaffMember>(`${this.base}/${staffId}`, payload);
  }

  changeStatus(staffId: string, payload: StaffStatusPayload): Observable<StaffMember> {
    if (environment.useMockData) {
      this.mockStaff = this.mockStaff.map((member) => member.id === staffId
        ? { ...member, status: payload.status, statusLabel: statusLabel(payload.status) }
        : member);
      return of(this.mockStaff.find((m) => m.id === staffId)!).pipe(delay(250));
    }
    return this.http.patch<StaffMember>(`${this.base}/${staffId}/status`, payload);
  }

  /** Les situations atteignables depuis celle-ci. */
  transitionsFrom(status: StaffStatus): StaffStatus[] {
    return ALLOWED_TRANSITIONS[status] ?? [];
  }

  // ─────────────────────────────────────────────── démonstration

  private searchLocally(query: StaffQuery): PageResponse<StaffMember> {
    const needle = query.search?.trim().toLowerCase() ?? '';
    const filtered = this.mockStaff.filter((member) => {
      if (query.status && member.status !== query.status) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return [member.firstName, member.lastName, member.employeeNumber,
        member.jobTitle, member.department ?? '']
        .some((field) => field.toLowerCase().includes(needle));
    });

    const size = query.size ?? 25;
    const page = query.page ?? 0;
    const start = page * size;
    const slice = filtered.slice(start, start + size);
    const totalPages = Math.max(1, Math.ceil(filtered.length / size));
    return {
      content: slice,
      page,
      size,
      totalElements: filtered.length,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1
    };
  }

  private countLocally(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const status of STAFF_STATUSES) {
      counts[status.code] = 0;
    }
    for (const member of this.mockStaff) {
      counts[member.status] = (counts[member.status] ?? 0) + 1;
    }
    return counts;
  }

  private buildMock(payload: StaffSavePayload): StaffMember {
    const year = new Date().getFullYear();
    const number = String(this.mockSequence++).padStart(4, '0');
    return {
      id: `local-${Date.now()}-${number}`,
      employeeNumber: `PERS-${year}-${number}`,
      ...this.decorate(payload),
      status: 'ACTIVE',
      statusLabel: 'En poste',
      hasUserAccount: false
    };
  }

  private decorate(payload: StaffSavePayload) {
    return {
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: `${payload.lastName} ${payload.firstName}`,
      gender: payload.gender,
      email: payload.email,
      phone: payload.phone,
      jobTitle: payload.jobTitle,
      department: payload.department,
      hireDate: payload.hireDate,
      contractType: payload.contractType,
      contractTypeLabel: contractLabel(payload.contractType),
      campusId: payload.campusId
    };
  }
}

function statusLabel(status: StaffStatus): string {
  return STAFF_STATUSES.find((item) => item.code === status)?.label ?? status;
}

function contractLabel(type: StaffSavePayload['contractType']): string {
  return CONTRACT_TYPES.find((item) => item.code === type)?.label ?? type;
}
