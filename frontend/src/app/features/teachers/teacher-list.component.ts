import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { Teacher } from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';

@Component({
  selector: 'eduops-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DataTableComponent, StatusBadgeComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">Enseignants</h1>
          @if (page(); as result) {
            <p class="page__meta numeric">{{ result.totalElements }} enseignant(s)</p>
          }
        </div>
        <div class="page__actions">
          @if (auth.has(permissions.TEACHER_MANAGE)) {
          <a routerLink="/teacher-assignments" class="btn btn--secondary">Affecter aux classes</a>
          <a routerLink="/teachers/new" class="btn btn--primary">
            <span aria-hidden="true">+</span> Nouvel enseignant
          </a>
          }
        </div>
      </header>

      <section class="card">
        <div class="card__header">
          <label class="visually-hidden" for="teacher-search">Rechercher un enseignant</label>
          <input id="teacher-search" class="input" type="search" style="max-width: 340px"
                 placeholder="Nom ou matricule employe"
                 (input)="onSearch($any($event.target).value)" />
        </div>
        <eduops-data-table
          [columns]="columns" [page]="page()" [loading]="loading()"
          caption="Liste des enseignants"
          (pageChange)="onPageChange($event)" />
      </section>
    </div>

    <ng-template #identityTpl let-teacher>
      <div class="row">
        <eduops-avatar [name]="teacher.fullName" [photoUrl]="teacher.photoUrl" size="sm" />
        <div>
          <p style="margin:0;font-weight:600;color:var(--text-strong)">{{ teacher.fullName }}</p>
          <p style="margin:0;font-size:var(--text-xs);color:var(--text-muted)">{{ teacher.email }}</p>
        </div>
      </div>
    </ng-template>

    <ng-template #statusTpl let-teacher>
      <eduops-status-badge [status]="teacher.status" />
    </ng-template>
  `
})
export class TeacherListComponent implements OnInit {
  readonly auth = inject(AuthService);
  readonly permissions = PERMISSIONS;
  private readonly dataSource = inject(TEACHER_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<PageResponse<Teacher> | null>(null);
  readonly loading = signal(true);

  private search = '';
  private currentPage = 0;

  @ViewChild('identityTpl', { static: true })
  identityTpl!: TemplateRef<{ $implicit: Teacher }>;
  @ViewChild('statusTpl', { static: true })
  statusTpl!: TemplateRef<{ $implicit: Teacher }>;

  columns: TableColumn<Teacher>[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'fullName', label: 'Enseignant', template: this.identityTpl, width: '34%' },
      { key: 'employeeNumber', label: 'Matricule', numeric: true, width: '14%' },
      { key: 'speciality', label: 'Spécialité', width: '20%' },
      { key: 'classCount', label: 'Classes', numeric: true, width: '10%' },
      { key: 'phone', label: 'Téléphone', width: '12%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '10%' }
    ];
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.dataSource
      .search({ page: this.currentPage, size: 20, search: this.search || undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  onSearch(value: string): void {
    this.search = value;
    this.currentPage = 0;
    this.load();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.load();
  }
}
