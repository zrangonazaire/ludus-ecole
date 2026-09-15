import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CampusDataSource, CampusUpsertPayload } from '../data-source';
import { Campus } from '../../models/domain.models';
import { environment } from '@env/environment';

const API = environment.apiBaseUrl + '/campuses';

@Injectable()
export class ApiCampusDataSource implements CampusDataSource {
  private readonly http = inject(HttpClient);
  private readonly base = API;

  list(includeArchived = false): Observable<Campus[]> {
    let params = new HttpParams();
    if (includeArchived) { params = params.set('includeArchived', 'true'); }
    return this.http.get<Campus[]>(this.base, { params });
  }

  get(id: string): Observable<Campus> {
    return this.http.get<Campus>(this.base + '/' + id);
  }

  create(payload: CampusUpsertPayload): Observable<Campus> {
    return this.http.post<Campus>(this.base, payload);
  }

  update(id: string, payload: CampusUpsertPayload): Observable<Campus> {
    return this.http.put<Campus>(this.base + '/' + id, payload);
  }

  archive(id: string): Observable<Campus> {
    return this.http.post<Campus>(this.base + '/' + id + '/archive', {});
  }

  restore(id: string): Observable<Campus> {
    return this.http.post<Campus>(this.base + '/' + id + '/restore', {});
  }
}
