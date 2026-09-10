import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INBOX_CATEGORIES, InboxMessage } from '@core/models/inbox.models';
import { InboxService } from '@core/services/inbox.service';
import { NotificationService } from '@core/services/notification.service';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/**
 * Ma boîte de réception.
 *
 * <p>Ce que le système m'adresse à moi : absence de mon enfant, bulletin
 * publié, paiement enregistré. Chacun voit les siens — le serveur déduit le
 * destinataire du compte connecté, et aucune requête d'ici ne lui donne le
 * choix.</p>
 */
@Component({
  selector: 'eduops-notifications',
  standalone: true,
  imports: [CommonModule, LoadingStateComponent, ErrorStateComponent,
    StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  private readonly inbox = inject(InboxService);
  private readonly toasts = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly knownCategories = INBOX_CATEGORIES;

  readonly messages = signal<InboxMessage[]>([]);
  readonly categories = signal<string[]>([]);
  readonly unread = signal(0);
  readonly total = signal(0);
  readonly page = signal(0);
  readonly totalPages = signal(1);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly working = signal(false);

  readonly categoryFilter = signal('');
  readonly unreadOnly = signal(false);

  readonly hasFilters = computed(() =>
    Boolean(this.categoryFilter()) || this.unreadOnly());
  readonly canGoBack = computed(() => this.page() > 0);
  readonly canGoForward = computed(() => this.page() + 1 < this.totalPages());

  readonly helpCopy = {
    title: 'Ce que l’école vous adresse',
    description: 'Une absence signalée, un bulletin publié, un règlement '
      + 'enregistré : ces messages vous sont personnels. Personne d’autre ne '
      + 'les voit, et vous ne voyez pas ceux des autres.',
    points: [
      'Les non lus apparaissent en premier : ouvrir sa boîte sert d’abord à '
        + 'voir ce qui reste à traiter.',
      'Un message renvoie vers la fiche concernée quand il y a quelque chose '
        + 'à y faire.',
      'Les responsables qui ont décliné un type d’avis ne le reçoivent pas — '
        + 'ce réglage se trouve sur la fiche du responsable.'
    ]
  };

  ngOnInit(): void {
    this.load();
    this.inbox.categories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => this.categories.set(list),
        error: () => undefined
      });
  }

  load(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.inbox.inbox({
      category: this.categoryFilter() || undefined,
      unreadOnly: this.unreadOnly(),
      page: this.page(),
      size: 30
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        this.messages.set(result.content);
        this.total.set(result.totalElements);
        this.totalPages.set(Math.max(1, result.totalPages));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.failed.set(true);
      }
    });

    this.inbox.unreadCount()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (count) => this.unread.set(count), error: () => undefined });
  }

  private reload(): void {
    this.page.set(0);
    this.load();
  }

  filterCategory(category: string): void {
    this.categoryFilter.set(category);
    this.reload();
  }

  toggleUnreadOnly(): void {
    this.unreadOnly.update((value) => !value);
    this.reload();
  }

  clearFilters(): void {
    this.categoryFilter.set('');
    this.unreadOnly.set(false);
    this.reload();
  }

  labelOf(category: string): string {
    return this.knownCategories.find((item) => item.code === category)?.label
      ?? category;
  }

  toneOf(category: string): string {
    return this.knownCategories.find((item) => item.code === category)?.tone
      ?? 'announcement';
  }

  /**
   * Ouvrir un message le marque lu, puis mène à la fiche concernée.
   *
   * <p>Marquer lu avant de naviguer, et sans attendre la réponse pour partir :
   * si le marquage échoue, on affiche l'erreur mais on ne bloque pas la
   * consultation — le message est déjà sous les yeux.</p>
   */
  open(message: InboxMessage): void {
    if (message.unread) {
      this.markRead(message);
    }
    if (message.actionUrl) {
      void this.router.navigateByUrl(message.actionUrl);
    }
  }

  markRead(message: InboxMessage): void {
    if (!message.unread || this.working()) {
      return;
    }
    this.working.set(true);
    this.inbox.markRead(message.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.working.set(false);
          this.messages.update((list) => list.map((item) =>
            item.id === message.id ? { ...item, unread: false } : item));
          this.unread.update((count) => Math.max(0, count - 1));
        },
        error: () => {
          this.working.set(false);
          this.toasts.error('Ce message n’a pas pu être marqué comme lu.');
        }
      });
  }

  markAllRead(): void {
    if (this.unread() === 0 || this.working()) {
      return;
    }
    this.working.set(true);
    this.inbox.markAllRead()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (count) => {
          this.working.set(false);
          this.toasts.success(`${count} message(s) marqué(s) comme lu(s).`);
          this.reload();
        },
        error: () => {
          this.working.set(false);
          this.toasts.error('Les messages n’ont pas pu être marqués comme lus.');
        }
      });
  }

  previousPage(): void {
    if (this.canGoBack()) {
      this.page.update((value) => value - 1);
      this.load();
    }
  }

  nextPage(): void {
    if (this.canGoForward()) {
      this.page.update((value) => value + 1);
      this.load();
    }
  }
}
