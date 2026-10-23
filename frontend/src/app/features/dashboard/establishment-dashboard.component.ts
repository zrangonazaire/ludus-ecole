import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { CAMPUS_DATA_SOURCE, LEVEL_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { AcademicYearService } from '@core/services/academic-year.service';
import { SchoolSettingsService } from '@core/services/school-settings.service';
import { AcademicYear } from '@core/models/academic-year.models';
import { Level, Campus } from '@core/models/domain.models';
import { SchoolSettings } from '@core/models/school-settings.models';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

@Component({
  selector: 'eduops-establishment-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './establishment-dashboard.component.html',
  styleUrl: './establishment-dashboard.component.scss'
})
export class EstablishmentDashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly settingsService = inject(SchoolSettingsService);
  private readonly yearsService = inject(AcademicYearService);
  private readonly levelsSource = inject(LEVEL_DATA_SOURCE);
  private readonly campusesSource = inject(CAMPUS_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly settings = signal<SchoolSettings | null>(null);
  readonly years = signal<AcademicYear[] | null>(null);
  readonly levels = signal<Level[] | null>(null);
  readonly campuses = signal<Campus[] | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);

  readonly canViewSchool = this.auth.has(PERMISSIONS.SCHOOL_VIEW);
  readonly canViewYears = this.auth.has(PERMISSIONS.ACADEMIC_YEAR_VIEW);
  readonly canViewLevels = this.auth.has(PERMISSIONS.LEVEL_VIEW);
  readonly canViewCampuses = this.auth.has(PERMISSIONS.CAMPUS_VIEW);
  readonly canViewRooms = this.auth.has(PERMISSIONS.ROOM_VIEW);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      settings: this.canViewSchool ? this.settingsService.get().pipe(catchError(() => of(null))) : of(null),
      years: this.canViewYears ? this.yearsService.list().pipe(catchError(() => of(null))) : of(null),
      levels: this.canViewLevels ? this.levelsSource.list().pipe(catchError(() => of(null))) : of(null),
      campuses: this.canViewCampuses ? this.campusesSource.list().pipe(catchError(() => of(null))) : of(null)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ settings, years, levels, campuses }) => {
        this.settings.set(settings);
        this.years.set(years);
        this.levels.set(levels);
        this.campuses.set(campuses);
        this.error.set(settings === null && years === null && levels === null && campuses === null);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => { this.loading.set(false); this.error.set(true); }
    });
  }

  get activeYear(): AcademicYear | null {
    return this.years()?.find((year) => year.active) ?? null;
  }

  get activeCampusCount(): number | null {
    const campuses = this.campuses();
    return campuses ? campuses.filter((campus) => campus.status === 'ACTIVE').length : null;
  }

  get activeLevelCount(): number | null {
    const levels = this.levels();
    return levels ? levels.filter((level) => level.status === 'ACTIVE').length : null;
  }

  get contactDetailsComplete(): number | null {
    const settings = this.settings();
    if (!settings) return null;
    return [settings.email, settings.phone, settings.addressLine1 || settings.city]
      .filter((value) => Boolean(value?.trim())).length;
  }

  get checkTotal(): number {
    return [this.canViewSchool, this.canViewYears, this.canViewCampuses, this.canViewLevels]
      .filter(Boolean).length;
  }

  get checksComplete(): number {
    return [this.canViewSchool && Boolean(this.settings()), this.canViewYears && Boolean(this.activeYear),
      this.canViewCampuses && (this.activeCampusCount ?? 0) > 0,
      this.canViewLevels && (this.activeLevelCount ?? 0) > 0].filter(Boolean).length;
  }
}
