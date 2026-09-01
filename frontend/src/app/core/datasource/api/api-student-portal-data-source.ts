import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StudentPortalDataSource } from '../data-source';
import { StudentDashboard } from '@core/models/student-portal.models';

@Injectable()
export class ApiStudentPortalDataSource implements StudentPortalDataSource {
  private readonly http = inject(HttpClient);

  dashboard(): Observable<StudentDashboard> {
    return this.http.get<StudentDashboard>(`${environment.apiBaseUrl}/student/dashboard`);
  }
}
