import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageResponse } from '@core/models/common.models';
import {
  OfficialDocument, OfficialDocumentIssuePayload, OfficialDocumentLayout,
  OfficialDocumentQuery
} from '@core/models/official-document.models';
import { OfficialDocumentDataSource } from '../data-source';

@Injectable()
export class ApiOfficialDocumentDataSource implements OfficialDocumentDataSource {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/documents`;

  search(query: OfficialDocumentQuery): Observable<PageResponse<OfficialDocument>> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<PageResponse<OfficialDocument>>(this.base, { params });
  }

  issue(payload: OfficialDocumentIssuePayload): Observable<OfficialDocument> {
    return this.http.post<OfficialDocument>(this.base, payload);
  }

  revoke(documentId: string, reason: string): Observable<OfficialDocument> {
    return this.http.post<OfficialDocument>(`${this.base}/${documentId}/revoke`, { reason });
  }

  layout(): Observable<OfficialDocumentLayout> {
    return this.http.get<OfficialDocumentLayout>(`${this.base}/layout`);
  }

  saveLayout(layout: OfficialDocumentLayout): Observable<OfficialDocumentLayout> {
    return this.http.put<OfficialDocumentLayout>(`${this.base}/layout`, layout);
  }
}

