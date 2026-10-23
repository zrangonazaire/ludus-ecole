import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of } from 'rxjs';
import { environment } from '@env/environment';
import { AuthService } from '@core/auth/auth.service';
import { InboxService } from '@core/services/inbox.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { PageResponse } from '@core/models/common.models';
import { InboxMessage } from '@core/models/inbox.models';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

interface PortalPerson {
  id: string; kind: 'GUARDIAN' | 'STUDENT'; reference: string; fullName: string;
  hasAccount: boolean; accountActive: boolean; locked: boolean; portalAllowed: boolean;
  lastLoginAt: string | null;
}

const EMPTY_INBOX: PageResponse<InboxMessage> = {
  content: [], page: 0, size: 5, totalElements: 0, totalPages: 1,
  first: true, last: true
};

@Component({
  selector: 'eduops-communication-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './communication-dashboard.component.html',
  styleUrl: './communication-dashboard.component.scss'
})
export class CommunicationDashboardComponent implements OnInit {
  private readonly inbox = inject(InboxService);
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly unread = signal(0);
  readonly messages = signal<InboxMessage[]>([]);
  readonly inboxTotal = signal(0);
  readonly portals = signal<PortalPerson[] | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);
  readonly canManagePortals = this.auth.has(PERMISSIONS.SCHOOL_VIEW);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      unread: this.inbox.unreadCount().pipe(catchError(() => of(0))),
      inbox: this.inbox.inbox({ page: 0, size: 5 }).pipe(catchError(() => of(EMPTY_INBOX))),
      portals: this.canManagePortals
        ? this.http.get<PortalPerson[]>(`${environment.apiBaseUrl}/portals`).pipe(catchError(() => of(null)))
        : of(null)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ unread, inbox, portals }) => {
        this.unread.set(unread);
        this.messages.set(inbox.content ?? []);
        this.inboxTotal.set(inbox.totalElements ?? 0);
        this.portals.set(portals);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => { this.loading.set(false); this.error.set(true); }
    });
  }

  get readyPortalCount(): number {
    return this.portals()?.filter((person) => person.hasAccount && person.accountActive
      && person.portalAllowed && !person.locked).length ?? 0;
  }

  get blockedPortalCount(): number {
    const people = this.portals();
    return people ? people.length - this.readyPortalCount : 0;
  }

  messageTrack(_: number, message: InboxMessage): string { return message.id; }
}
