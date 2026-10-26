import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { DashboardData, KpiValue } from '@core/models/domain.models';
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

interface PoleNav {
  label: string;
  route: string;
  icon: string;
}

interface DailyHeroAction {
  title: string;
  description: string;
  route: string;
  queryParams?: Record<string, string>;
  badge: string;
  tone: 'brand' | 'emerald' | 'amber' | 'indigo';
  icon: string;
}

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
    CommonModule, RouterLink, RouterLinkActive, KpiCardComponent, ChartCardComponent,
    StatusBadgeComponent, LoadingStateComponent, ErrorStateComponent, AvatarComponent,
    MoneyPipe, SetupProgressComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
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

  readonly firstName = computed(() => {
    const fullName = this.auth.currentUser()?.fullName?.trim();
    if (!fullName) return '';
    return fullName.split(/\s+/)[0] ?? '';
  });

  readonly poles: readonly PoleNav[] = [
    { label: 'Vue générale', route: '/dashboard', icon: '◈' },
    { label: 'Scolarité & Élèves', route: '/scolarite-dashboard', icon: '🎓' },
    { label: 'Pédagogie & Notes', route: '/pedagogy-dashboard', icon: '📚' },
    { label: 'Finances & Caisse', route: '/finance-dashboard', icon: '💳' },
    { label: 'Équipe & Accès', route: '/personnel-dashboard', icon: '👥' },
    { label: 'Communication', route: '/communication-dashboard', icon: '💬' },
    { label: 'Établissement', route: '/establishment-dashboard', icon: '🏛' }
  ];

  readonly heroActions: readonly DailyHeroAction[] = [
    {
      title: 'Inscrire ou Importer (Excel)',
      description: 'Nouvelle inscription ou import Excel par classe avec frais du niveau automatiques.',
      route: '/enrollments/new',
      queryParams: { mode: 'IMPORT' },
      badge: 'Admission & Excel',
      tone: 'brand',
      icon: '📥'
    },
    {
      title: 'Caisse, Brouillard & Reçus',
      description: 'Encaissements, sorties de caisse, PV d’arrêté et partage du reçu sur WhatsApp.',
      route: '/payments',
      queryParams: { action: 'collect' },
      badge: 'Caisse & Dépenses',
      tone: 'emerald',
      icon: '💳'
    },
    {
      title: 'Impayés & Relances WhatsApp',
      description: 'Identifier les retards de scolarité et relancer les parents sur WhatsApp en 1 clic.',
      route: '/outstanding',
      badge: 'Recouvrement',
      tone: 'amber',
      icon: '💬'
    },
    {
      title: 'Cartes scolaires (QR) & Certificats',
      description: 'Imprimer les badges élèves avec QR Code en lot ou délivrer un certificat officiel.',
      route: '/student-files',
      queryParams: { type: 'STUDENT_CARD', bulk: 'true' },
      badge: 'Badges QR & Docs',
      tone: 'indigo',
      icon: '🪪'
    },
    {
      title: 'Cahier de textes & Devoirs',
      description: 'Publier les devoirs du soir et suivre leur avancement côté Enseignant, Parent et Élève.',
      route: '/teacher/home',
      badge: 'Devoirs du soir',
      tone: 'brand',
      icon: '📖'
    },
    {
      title: 'Présences, Notes & Bulletins',
      description: 'Faire l’appel du jour, saisir les notes et éditer les bulletins scolaires.',
      route: '/attendance',
      badge: 'Vie scolaire',
      tone: 'amber',
      icon: '📋'
    }
  ];

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

  kpiRoute(kpi: KpiValue): string {
    const key = (kpi.key || '').toLowerCase();
    if (key.includes('student') || key.includes('effectif') || key.includes('enroll')) return '/students';
    if (key.includes('attend') || key.includes('presen') || key.includes('absen')) return '/attendance';
    if (key.includes('grade') || key.includes('acad') || key.includes('moyen') || key.includes('assess')) return '/assessments';
    if (key.includes('outstand') || key.includes('impay') || key.includes('arrear') || key.includes('overdue')) return '/outstanding';
    if (key.includes('collect') || key.includes('pay') || key.includes('encais') || key.includes('recet')) return '/payments';
    if (key.includes('class') || key.includes('capac')) return '/classes';
    return '/reports';
  }

  today(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}
