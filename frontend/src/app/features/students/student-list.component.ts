import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { StudentSummary } from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { PERMISSIONS } from '@core/models/auth.models';

/** Students list with server-side search, filters and pagination. */
@Component({
  selector: 'eduops-student-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DataTableComponent, StatusBadgeComponent,
    AvatarComponent, HasPermissionDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_DATA_SOURCE);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<PageResponse<StudentSummary> | null>(null);
  readonly loading = signal(true);
  readonly search = signal('');
  readonly statusFilter = signal('');
  readonly currentPage = signal(0);

  readonly createPermission = PERMISSIONS.STUDENT_CREATE;

  private readonly query$ = new Subject<void>();

  @ViewChild('identityTpl', { static: true })
  identityTpl!: TemplateRef<{ $implicit: StudentSummary }>;
  @ViewChild('statusTpl', { static: true })
  statusTpl!: TemplateRef<{ $implicit: StudentSummary }>;

  columns: TableColumn<StudentSummary>[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'fullName', label: 'Élève', template: this.identityTpl, width: '32%' },
      { key: 'studentNumber', label: 'Matricule', numeric: true, width: '18%' },
      { key: 'classroomName', label: 'Classe', width: '15%' },
      { key: 'levelName', label: 'Niveau', width: '12%' },
      { key: 'age', label: 'Age', numeric: true, width: '8%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '15%' }
    ];

    this.query$
      .pipe(
        debounceTime(280),
        distinctUntilChanged(),
        switchMap(() => {
          this.loading.set(true);
          return this.dataSource.search({
            page: this.currentPage(),
            size: 20,
            search: this.search() || undefined,
            status: this.statusFilter() || undefined
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });

    this.query$.next();
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.currentPage.set(0);
    this.query$.next();
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value);
    this.currentPage.set(0);
    this.query$.next();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.query$.next();
  }

  openStudent(student: StudentSummary): void {
    void this.router.navigate(['/students', student.id]);
  }
}
