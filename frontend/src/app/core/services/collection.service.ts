import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
export interface CollectionActionInput {
  channel: string;
  note: string;
  nextContactDate: string | null;
  promisedDate: string | null;
  promisedAmount: number | null;
}
export interface CollectionAction extends CollectionActionInput {
  id: string;
  authorName: string;
  createdAt: string;
}
@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly http = inject(HttpClient);
  private url(id: string) { return `${environment.apiBaseUrl}/outstanding/${id}/actions`; }
  history(id: string) { return this.http.get<CollectionAction[]>(this.url(id)); }
  create(id: string, action: CollectionActionInput) {
    return this.http.post<CollectionAction>(this.url(id), action);
  }
}
