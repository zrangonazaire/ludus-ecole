import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { PageResponse } from '@core/models/common.models';
import { InboxMessage, InboxQuery } from '@core/models/inbox.models';

/**
 * Ma boîte de réception.
 *
 * <p>Aucune méthode ne prend d'identifiant de destinataire, et il ne faut pas
 * en ajouter : le serveur déduit le destinataire du compte authentifié. Un
 * paramètre ici laisserait croire qu'on peut lire la boîte d'un autre, et
 * pousserait tôt ou tard à l'ouvrir côté serveur pour « faire marcher »
 * l'écran.</p>
 */
@Injectable({ providedIn: 'root' })
export class InboxService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/notifications`;

  private readonly emptyPage: PageResponse<InboxMessage> = {
    content: [], page: 0, size: 30, totalElements: 0,
    totalPages: 1, first: true, last: true
  };

  inbox(query: InboxQuery): Observable<PageResponse<InboxMessage>> {
    if (environment.useMockData) {
      return of(this.emptyPage).pipe(delay(150));
    }
    let params = new HttpParams();
    if (query.category) {
      params = params.set('category', query.category);
    }
    if (query.unreadOnly) {
      params = params.set('unreadOnly', 'true');
    }
    params = params.set('page', String(query.page ?? 0));
    params = params.set('size', String(query.size ?? 30));
    return this.http.get<PageResponse<InboxMessage>>(this.base, { params });
  }

  unreadCount(): Observable<number> {
    if (environment.useMockData) {
      return of(0).pipe(delay(80));
    }
    return this.http.get<{ unread: number }>(`${this.base}/unread-count`)
      .pipe(map((result) => result?.unread ?? 0));
  }

  categories(): Observable<string[]> {
    if (environment.useMockData) {
      return of([]).pipe(delay(80));
    }
    return this.http.get<string[]>(`${this.base}/categories`);
  }

  markRead(messageId: string): Observable<InboxMessage> {
    if (environment.useMockData) {
      return of({} as InboxMessage).pipe(delay(120));
    }
    return this.http.patch<InboxMessage>(`${this.base}/${messageId}/read`, {});
  }

  markAllRead(): Observable<number> {
    if (environment.useMockData) {
      return of(0).pipe(delay(120));
    }
    return this.http.patch<{ marked: number }>(`${this.base}/read-all`, {})
      .pipe(map((result) => result?.marked ?? 0));
  }
}
