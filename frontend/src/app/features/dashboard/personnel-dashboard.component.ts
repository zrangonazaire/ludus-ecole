import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of } from 'rxjs';
import { environment } from '@env/environment';
import { AuthService } from '@core/auth/auth.service';
import { ACCESS_PROFILE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { AccessProfileOverview } from '@core/models/access-profile.models';
import { Teacher } from '@core/models/domain.models';
import { PageResponse } from '@core/models/common.models';
import { AuditEntry } from '@core/models/audit.models';
import { AuditService } from '@core/services/audit.service';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

interface ManagedUserSummary {
  id: string; username: string; email: string; firstName: string; lastName: string;
  status: string; profiles: Array<{ id: string; label: string }>;
}

const emptyPage: PageResponse<Teacher> = {
  content: [], page: 0, size: 5, totalElements: 0, totalPages: 0,
  first: true, last: true
};

@Component({
  selector: 'eduops-personnel-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './personnel-dashboard.component.html',
  styleUrl: './personnel-dashboard.component.scss'
})
export class PersonnelDashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly profilesSource = inject(ACCESS_PROFILE_DATA_SOURCE);
  private readonly teacherSource = inject(TEACHER_DATA_SOURCE);
  private readonly audit = inject(AuditService);
  private readonly destroyRef = inject(DestroyRef);

  readonly users = signal<ManagedUserSummary[] | null>(null);
  readonly profileOverview = signal<AccessProfileOverview | null>(null);
  readonly teachers = signal<PageResponse<Teacher> | null>(null);
  readonly auditPage = signal<PageResponse<AuditEntry> | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);

  readonly canManageUsers = this.auth.has(PERMISSIONS.USER_MANAGE);
  readonly canManageProfiles = this.auth.has(PERMISSIONS.ROLE_MANAGE);
  readonly canViewTeachers = this.auth.has(PERMISSIONS.TEACHER_VIEW);
  readonly canViewAudit = this.auth.has(PERMISSIONS.AUDIT_VIEW);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      users: this.canManageUsers
        ? this.http.get<ManagedUserSummary[]>(`${environment.apiBaseUrl}/users`).pipe(catchError(() => of(null)))
        : of(null),
      profiles: this.canManageProfiles
        ? this.profilesSource.overview().pipe(catchError(() => of(null)))
        : of(null),
      teachers: this.canViewTeachers
        ? this.teacherSource.roster({ page: 0, size: 5 }).pipe(catchError(() => of(null)))
        : of(null),
      audit: this.canViewAudit
        ? this.audit.search({ page: 0, size: 5 }).pipe(catchError(() => of(null)))
        : of(null)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ users, profiles, teachers, audit }) => {
        this.users.set(users);
        this.profileOverview.set(profiles);
        this.teachers.set(teachers);
        this.auditPage.set(audit);
        this.error.set(users === null && profiles === null && teachers === null && audit === null);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => { this.loading.set(false); this.error.set(true); }
    });
  }

  get activeUserCount(): number | null {
    const users = this.users();
    return users ? users.filter((user) => user.status === 'ACTIVE').length : null;
  }

  get disabledUserCount(): number | null {
    const users = this.users();
    return users ? users.filter((user) => user.status !== 'ACTIVE').length : null;
  }

  auditTrack(_: number, entry: AuditEntry): number { return entry.id; }
}
