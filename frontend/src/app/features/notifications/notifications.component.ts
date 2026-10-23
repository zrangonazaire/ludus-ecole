import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { StudentSummary } from '@core/models/domain.models';
import { PageResponse } from '@core/models/common.models';
import {
  AnnouncementChannel, AnnouncementPreview, AnnouncementSendResult,
  ReceivedOpinionResponse
} from '@core/models/announcement.models';
import { INBOX_CATEGORIES, InboxMessage } from '@core/models/inbox.models';
import { AnnouncementService } from '@core/services/announcement.service';
import { InboxService } from '@core/services/inbox.service';
import { NotificationService } from '@core/services/notification.service';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';

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
    StepCoachmarkComponent, HasPermissionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  private readonly inbox = inject(InboxService);
  private readonly http = inject(HttpClient);
  private readonly announcements = inject(AnnouncementService);
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

  readonly composerOpen = signal(false);
  readonly studentsLoading = signal(false);
  readonly students = signal<StudentSummary[]>([]);
  readonly studentSearch = signal('');
  readonly classFilter = signal('');
  readonly selectedStudentIds = signal<Set<string>>(new Set());
  readonly channel = signal<AnnouncementChannel>('EMAIL');
  readonly title = signal('Demande d’avis');
  readonly subject = signal('Votre avis compte pour notre école');
  readonly body = signal('Bonjour {tuteur},\n\nNous aimerions connaître votre avis. Votre retour nous aidera à améliorer la vie de l’école.\nCliquez sur le lien sécurisé ci-dessous pour répondre.\n\nCordialement,\n{ecole}');
  readonly collectResponses = signal(true);
  readonly responseQuestion = signal('Quel est votre avis ?');
  readonly composeStep = signal<'compose' | 'preview' | 'result'>('compose');
  readonly preview = signal<AnnouncementPreview | null>(null);
  readonly sendResult = signal<AnnouncementSendResult | null>(null);
  readonly composing = signal(false);
  readonly sendingAnnouncement = signal(false);
  readonly composeError = signal('');
  readonly responsesOpen = signal(false);
  readonly responsesLoading = signal(false);
  readonly receivedResponses = signal<ReceivedOpinionResponse[]>([]);
  readonly responsesFailed = signal(false);
  readonly visibleStudents = computed(() => {
    const query = this.studentSearch().trim().toLocaleLowerCase('fr');
    return this.students().filter((student) => {
      const matchesClass = !this.classFilter() || student.classroomName === this.classFilter();
      const haystack = `${student.fullName} ${student.studentNumber} ${student.classroomName ?? ''}`
        .toLocaleLowerCase('fr');
      return matchesClass && (!query || haystack.includes(query));
    });
  });
  readonly classrooms = computed(() => [...new Set(this.students()
    .map((student) => student.classroomName).filter((name): name is string => Boolean(name)))].sort());
  readonly selectedCount = computed(() => this.selectedStudentIds().size);
  readonly allVisibleSelected = computed(() => this.visibleStudents().length > 0
    && this.visibleStudents().every((student) => this.selectedStudentIds().has(student.id)));

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

  openComposer(): void {
    this.composerOpen.set(true);
    this.composeStep.set('compose');
    this.composeError.set('');
    if (this.students().length || this.studentsLoading()) return;
    this.loadStudents();
  }

  toggleResponses(): void {
    this.responsesOpen.update((open) => !open);
    if (this.responsesOpen() && this.receivedResponses().length === 0) this.loadResponses();
  }

  loadResponses(): void {
    this.responsesLoading.set(true);
    this.responsesFailed.set(false);
    this.announcements.responses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (items) => {
        this.receivedResponses.set(items);
        this.responsesLoading.set(false);
      },
      error: () => {
        this.responsesLoading.set(false);
        this.responsesFailed.set(true);
      }
    });
  }

  closeComposer(): void {
    this.composerOpen.set(false);
    this.preview.set(null);
    this.sendResult.set(null);
    this.composeStep.set('compose');
  }

  private loadStudents(): void {
    this.studentsLoading.set(true);
    const page = (number: number) => {
      const params = new HttpParams().set('page', String(number)).set('size', '200').set('status', 'ACTIVE');
      return this.http.get<PageResponse<StudentSummary>>(`${environment.apiBaseUrl}/students`, { params });
    };
    page(0).pipe(
      switchMap((first) => first.totalPages > 1
        ? forkJoin(Array.from({ length: first.totalPages - 1 }, (_, index) => page(index + 1)))
            .pipe(map((rest) => [first, ...rest]))
        : of([first])),
      map((pages) => pages.flatMap((result) => result.content)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (students) => {
        this.students.set(students.filter((student) => student.enrollmentId));
        this.studentsLoading.set(false);
      },
      error: () => {
        this.studentsLoading.set(false);
        this.composeError.set('La liste des élèves n’a pas pu être chargée. Vérifiez vos droits puis réessayez.');
      }
    });
  }

  toggleStudent(studentId: string, checked: boolean): void {
    this.selectedStudentIds.update((current) => {
      const next = new Set(current);
      if (checked && next.size >= 500 && !next.has(studentId)) {
        this.toasts.error('Une campagne peut cibler au maximum 500 élèves. Envoyez plusieurs avis pour une liste plus large.');
        return current;
      }
      if (checked) next.add(studentId); else next.delete(studentId);
      return next;
    });
  }

  clearSelectedStudents(): void {
    this.selectedStudentIds.set(new Set<string>());
  }

  toggleVisibleStudents(checked: boolean): void {
    this.selectedStudentIds.update((current) => {
      const next = new Set(current);
      for (const student of this.visibleStudents()) {
        if (checked && !next.has(student.id) && next.size >= 500) break;
        if (checked) next.add(student.id); else next.delete(student.id);
      }
      if (checked && next.size === 500 && current.size < 500) {
        this.toasts.error('La sélection est limitée à 500 élèves par envoi. Le reste peut faire l’objet d’un autre avis.');
      }
      return next;
    });
  }

  prepareAnnouncement(): void {
    if (!this.selectedCount() || this.composing()) return;
    this.composing.set(true);
    this.composeError.set('');
    this.announcements.prepare({
      studentIds: [...this.selectedStudentIds()],
      channel: this.channel(), title: this.title(),
      subject: this.channel() === 'EMAIL' ? this.subject() : undefined,
      bodyTemplate: this.body(),
      collectResponses: this.collectResponses(),
      responseQuestion: this.collectResponses() ? this.responseQuestion() : undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (preview) => {
        this.preview.set(preview);
        this.composeStep.set('preview');
        this.composing.set(false);
      },
      error: (error) => {
        this.composing.set(false);
        this.composeError.set(error?.error?.message ?? 'L’aperçu n’a pas pu être préparé. Vérifiez le message et les destinataires.');
      }
    });
  }

  sendAnnouncement(): void {
    const campaignId = this.preview()?.campaignId;
    if (!campaignId || this.sendingAnnouncement()) return;
    this.sendingAnnouncement.set(true);
    this.composeError.set('');
    this.announcements.send(campaignId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        this.sendResult.set(result);
        this.composeStep.set('result');
        this.sendingAnnouncement.set(false);
      },
      error: (error) => {
        this.sendingAnnouncement.set(false);
        this.composeError.set(error?.error?.message ?? 'L’envoi a échoué. Aucun résultat n’a été confirmé.');
      }
    });
  }

  backToCompose(): void {
    this.composeStep.set('compose');
    this.preview.set(null);
  }
}
