import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { PageResponse } from '@core/models/common.models';
import { AuditEntry, AuditQuery } from '@core/models/audit.models';

/**
 * Le journal d'audit.
 *
 * <p>En démonstration, le journal est vide : inventer des entrées ferait
 * croire à une trace qui n'existe pas, et un journal d'audit qui ment sur son
 * contenu est exactement ce qu'il ne faut pas.</p>
 */
@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/audit`;

  private readonly emptyPage: PageResponse<AuditEntry> = {
    content: [], page: 0, size: 50, totalElements: 0,
    totalPages: 1, first: true, last: true
  };

  search(query: AuditQuery): Observable<PageResponse<AuditEntry>> {
    if (environment.useMockData) {
      return of(this.emptyPage).pipe(delay(150));
    }
    let params = new HttpParams();
    if (query.action) {
      params = params.set('action', query.action);
    }
    if (query.entityType) {
      params = params.set('entityType', query.entityType);
    }
    if (query.from) {
      params = params.set('from', query.from);
    }
    if (query.to) {
      params = params.set('to', query.to);
    }
    params = params.set('page', String(query.page ?? 0));
    params = params.set('size', String(query.size ?? 50));
    return this.http.get<PageResponse<AuditEntry>>(this.base, { params });
  }

  entityTypes(): Observable<string[]> {
    if (environment.useMockData) {
      return of([]).pipe(delay(120));
    }
    return this.http.get<string[]>(`${this.base}/entity-types`);
  }
}
