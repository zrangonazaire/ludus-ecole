import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { DashboardData } from '@core/models/domain.models';
import { WebSocketService } from '@core/websocket/websocket.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { WS_EVENTS } from '@core/websocket/websocket-events';
import { KpiCardComponent } from '@shared/ui/kpi-card/kpi-card.component';
import { ChartCardComponent } from '@shared/ui/chart-card/chart-card.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { SetupProgressComponent } from '@shared/ui/setup-progress/setup-progress.component';

/**
 * Direction dashboard (sections 56 to 59).
 *
 * Every figure comes from the backend. The component only renders and
 * refreshes on domain events, so the screen and the reports can never disagree.
 */
@Component({
  selector: 'eduops-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, KpiCardComponent, ChartCardComponent, StatusBadgeComponent,
    LoadingStateComponent, ErrorStateComponent, AvatarComponent, MoneyPipe,
    SetupProgressComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly dataSource = inject(DASHBOARD_DATA_SOURCE);
  private readonly ws = inject(WebSocketService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly destroyRef = inject(DestroyRef);

  /** Drives the reminder banner; disappears once setup is finished. */
  readonly setup = this.setupStatus.status;
  readonly setupIncomplete = this.setupStatus.incomplete;

  readonly data = signal<DashboardData | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);

  ngOnInit(): void {
    this.load();

    // Live refresh without a page reload (section 48).
    this.ws
      .on(
        WS_EVENTS.STUDENT_ENROLLED,
        WS_EVENTS.ATTENDANCE_RECORDED,
        WS_EVENTS.ABSENCE_RECORDED,
        WS_EVENTS.PAYMENT_RECEIVED,
        WS_EVENTS.PAYMENT_CANCELLED,
        WS_EVENTS.ALERT_CREATED
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.load(true));
  }

  load(silent = false): void {
    if (!silent) {
      this.loading.set(true);
    }
    this.error.set(false);
    this.dataSource.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  today(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}
