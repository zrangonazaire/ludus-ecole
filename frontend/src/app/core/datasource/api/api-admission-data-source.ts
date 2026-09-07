import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AdmissionDataSource } from '../data-source';
import {
  Admission, AdmissionCreatePayload, AdmissionOptions, AdmissionQuery,
  AdmissionStatusPayload
} from '@core/models/admission.models';
import { PageResponse } from '@core/models/common.models';

@Injectable()
export class ApiAdmissionDataSource implements AdmissionDataSource {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/admissions`;

  search(query: AdmissionQuery): Observable<PageResponse<Admission>> {
    return this.http.get<PageResponse<Admission>>(this.endpoint, { params: toParams(query) });
  }

  options(academicYearId?: string): Observable<AdmissionOptions> {
    return this.http.get<AdmissionOptions>(`${this.endpoint}/options`,
      { params: toParams({ academicYearId }) });
  }

  get(id: string): Observable<Admission> {
    return this.http.get<Admission>(`${this.endpoint}/${id}`);
  }

  create(payload: AdmissionCreatePayload): Observable<Admission> {
    return this.http.post<Admission>(this.endpoint, payload);
  }

  changeStatus(id: string, payload: AdmissionStatusPayload): Observable<Admission> {
    return this.http.post<Admission>(`${this.endpoint}/${id}/status`, payload);
  }

  updateDocument(admissionId: string, documentId: string,
                 received: boolean): Observable<Admission> {
    return this.http.put<Admission>(
      `${this.endpoint}/${admissionId}/documents/${documentId}`, { received });
  }
}

function toParams(query: object): HttpParams {
  let params = new HttpParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, String(value));
    }
  });
  return params;
}
