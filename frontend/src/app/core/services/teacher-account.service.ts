import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { TeacherAccount } from '@core/models/teacher.models';
import { Teacher } from '@core/models/domain.models';

@Injectable({ providedIn: 'root' })
export class TeacherAccountService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/teachers`;
  available() { return this.http.get<TeacherAccount[]>(`${this.base}/accounts`); }
  link(teacherId: string, userAccountId: string) {
    return this.http.put<Teacher>(`${this.base}/${teacherId}/account`, { userAccountId });
  }
}
