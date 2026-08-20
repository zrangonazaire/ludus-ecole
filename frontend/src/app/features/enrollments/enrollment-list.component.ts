import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENROLLMENT_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { Enrollment } from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { PERMISSIONS } from '@core/models/auth.models';

@Component({
  selector: 'eduops-enrollment-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, DataTableComponent, StatusBadgeComponent, HasPermissionDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">Inscriptions</h1>
          @if (page(); as result) {
            <p class="page__meta numeric">{{ result.totalElements }} inscription(s) pour l'annee active</p>
          }
        </div>
        <div class="page__actions">
          <button type="button" class="btn btn--secondary">Exporter</button>
          <a class="btn btn--primary" routerLink="/enrollments/new"
             *eduopsHasPermission="createPermission">
            <span aria-hidden="true">+</span> Nouvelle inscription
          </a>
        </div>
      </header>

      <section class="card">
        <div class="card__header">
          <label class="visually-hidden" for="enrollment-search">Rechercher</label>
          <input id="enrollment-search" class="input" type="search" style="max-width: 380px"
                 placeholder="Eleve, matricule ou numero d'inscription"
                 (input)="onSearch($any($event.target).value)" />
        </div>
        <eduops-data-table
          [columns]="columns" [page]="page()" [loading]="loading()"
          caption="Liste des inscriptions"
          (pageChange)="onPageChange($event)" />
      </section>
    </div>

    <ng-template #kindTpl let-enrollment>
      <span class="badge badge--neutral">
        {{ enrollment.enrollmentKind === 'NEW' ? 'Nouvelle'
           : enrollment.enrollmentKind === 'RE_ENROLLMENT' ? 'Reinscription' : 'Transfert' }}
      </span>
    </ng-template>

    <ng-template #statusTpl let-enrollment>
      <div class="row">
        <eduops-status-badge [status]="enrollment.status" />
        @if (enrollment.overCapacityOverride) {
          <span class="badge badge--warning" title="Inscription en depassement de capacite, justifiee et auditee">
            Derogation
          </span>
        }
      </div>
    </ng-template>
  `
})
export class EnrollmentListComponent implements OnInit {
  private readonly dataSource = inject(ENROLLMENT_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<PageResponse<Enrollment> | null>(null);
  readonly loading = signal(true);
  readonly createPermission = PERMISSIONS.ENROLLMENT_CREATE;

  private search = '';
  private currentPage = 0;

  @ViewChild('kindTpl', { static: true })
  kindTpl!: TemplateRef<{ $implicit: Enrollment }>;
  @ViewChild('statusTpl', { static: true })
  statusTpl!: TemplateRef<{ $implicit: Enrollment }>;

  columns: TableColumn<Enrollment>[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'enrollmentNumber', label: 'N° inscription', numeric: true, width: '16%' },
      { key: 'studentName', label: 'Eleve', width: '22%' },
      { key: 'studentNumber', label: 'Matricule', numeric: true, width: '16%' },
      { key: 'classroomName', label: 'Classe', width: '12%' },
      { key: 'enrollmentDate', label: 'Date', width: '10%' },
      { key: 'enrollmentKind', label: 'Type', template: this.kindTpl, width: '12%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '12%' }
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
