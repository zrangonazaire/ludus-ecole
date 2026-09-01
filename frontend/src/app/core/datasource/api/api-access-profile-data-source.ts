import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AccessProfileDataSource } from '../data-source';
import {
  AccessProfile, AccessProfileOverview, AccessProfilePayload
} from '@core/models/access-profile.models';

@Injectable()
export class ApiAccessProfileDataSource implements AccessProfileDataSource {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/access-profiles`;

  overview(): Observable<AccessProfileOverview> {
    return this.http.get<AccessProfileOverview>(this.endpoint);
  }

  create(payload: AccessProfilePayload): Observable<AccessProfile> {
    return this.http.post<AccessProfile>(this.endpoint, payload);
  }

  update(id: string, payload: AccessProfilePayload): Observable<AccessProfile> {
    return this.http.put<AccessProfile>(`${this.endpoint}/${id}`, payload);
  }
}
