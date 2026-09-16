import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomDataSource } from '../data-source';
import { Room, RoomOptions, RoomQuery, RoomUpsertPayload } from '@core/models/room.models';
import { environment } from '@env/environment';

const API = environment.apiBaseUrl + '/rooms';

@Injectable()
export class ApiRoomDataSource implements RoomDataSource {
  private readonly http = inject(HttpClient);
  private readonly base = API;

  list(query: RoomQuery = {}): Observable<Room[]> {
    let params = new HttpParams();
    if (query.campusId) { params = params.set('campusId', query.campusId); }
    if (query.building) { params = params.set('building', query.building); }
    if (query.roomType) { params = params.set('roomType', query.roomType); }
    if (query.search) { params = params.set('search', query.search); }
    if (query.includeArchived) { params = params.set('includeArchived', 'true'); }
    return this.http.get<Room[]>(this.base, { params });
  }

  options(): Observable<RoomOptions> {
    return this.http.get<RoomOptions>(this.base + '/options');
  }

  get(id: string): Observable<Room> {
    return this.http.get<Room>(this.base + '/' + id);
  }

  create(payload: RoomUpsertPayload): Observable<Room> {
    return this.http.post<Room>(this.base, payload);
  }

  update(id: string, payload: RoomUpsertPayload): Observable<Room> {
    return this.http.put<Room>(this.base + '/' + id, payload);
  }

  archive(id: string): Observable<Room> {
    return this.http.post<Room>(this.base + '/' + id + '/archive', {});
  }

  restore(id: string): Observable<Room> {
    return this.http.post<Room>(this.base + '/' + id + '/restore', {});
  }
}