import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageResponse } from '@core/models/common.models';
import { Guardian, GuardianQuery } from '@core/models/guardian.models';
import { GuardianDataSource } from '../data-source';

@Injectable()
export class ApiGuardianDataSource implements GuardianDataSource {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/guardians`;

  search(query: GuardianQuery): Observable<PageResponse<Guardian>> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<PageResponse<Guardian>>(this.endpoint, { params });
  }
}
