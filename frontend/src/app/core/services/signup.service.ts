import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AvailabilityResponse, SignupRequest, SignupResponse } from '@core/models/signup.models';

/**
 * Public signup.
 *
 * <p>Unlike the rest of the application this service talks to HttpClient
 * directly: there is no tenant yet, so the DataSource abstraction — which is
 * organised per business domain — does not apply.</p>
 */
@Injectable({ providedIn: 'root' })
export class SignupService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/public`;

  signup(request: SignupRequest): Observable<SignupResponse> {
    if (environment.useMockData) {
      return of(this.mockResponse(request)).pipe(delay(700));
    }
    return this.http.post<SignupResponse>(`${this.base}/signup`, request);
  }

  /** Live check so the form warns before submitting. */
  isSchoolCodeAvailable(code: string): Observable<boolean> {
    if (environment.useMockData) {
      return of(code.trim().toUpperCase() !== 'DEMO').pipe(delay(250));
    }
    return this.http
      .get<AvailabilityResponse>(`${this.base}/check-school-code`, { params: { code } })
      .pipe(map((r) => r.available));
  }

  isEmailAvailable(email: string): Observable<boolean> {
    if (environment.useMockData) {
      return of(!email.toLowerCase().startsWith('admin@')).pipe(delay(250));
    }
    return this.http
      .get<AvailabilityResponse>(`${this.base}/check-email`, { params: { email } })
      .pipe(map((r) => r.available));
  }

  private mockResponse(request: SignupRequest): SignupResponse {
    const year = new Date().getMonth() >= 8
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;
    return {
      schoolId: 'mock-school',
      schoolCode: request.schoolCode.toUpperCase(),
      schoolName: request.schoolName,
      userId: 'mock-user',
      email: request.email,
      fullName: `${request.firstName} ${request.lastName}`,
      academicYearId: 'mock-year',
      academicYearCode: `${year}-${year + 1}`,
      accessToken: 'mock-access-token.admin',
      refreshToken: 'mock-refresh-token.admin',
      expiresIn: 28800,
      onboardingRequired: true
    };
  }
}
