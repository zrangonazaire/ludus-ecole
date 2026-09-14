import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StudentPortalDataSource } from '../data-source';
import {
  StudentAttendanceData, StudentDashboard, StudentGradesData, StudentProfile,
  StudentReportCard, StudentTimetableData
} from '@core/models/student-portal.models';

@Injectable()
export class ApiStudentPortalDataSource implements StudentPortalDataSource {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/student`;

  dashboard(): Observable<StudentDashboard> {
    return this.http.get<StudentDashboard>(`${this.base}/dashboard`);
  }

  timetable(): Observable<StudentTimetableData> {
    return this.http.get<StudentTimetableData>(`${this.base}/timetable`);
  }

  grades(): Observable<StudentGradesData> {
    return this.http.get<StudentGradesData>(`${this.base}/grades`);
  }

  reportCards(): Observable<StudentReportCard[]> {
    return this.http.get<StudentReportCard[]>(`${this.base}/report-cards`);
  }

  attendance(): Observable<StudentAttendanceData> {
    return this.http.get<StudentAttendanceData>(`${this.base}/attendance`);
  }

  profile(): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(`${environment.apiBaseUrl}/auth/me`);
  }
}
