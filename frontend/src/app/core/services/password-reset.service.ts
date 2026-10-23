import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class PasswordResetService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/auth/password-reset`;

  request(email: string): Observable<{ message: string }> {
    if (environment.useMockData) {
      return of({
        message: 'Si un compte correspond à cette adresse, un lien de réinitialisation a été envoyé.'
      }).pipe(delay(500));
    }
    return this.http.post<{ message: string }>(`${this.base}/request`, { email });
  }

  confirm(token: string, newPassword: string): Observable<void> {
    if (environment.useMockData) {
      return of(void 0).pipe(delay(500));
    }
    return this.http.post<void>(`${this.base}/confirm`, { token, newPassword });
  }
}
