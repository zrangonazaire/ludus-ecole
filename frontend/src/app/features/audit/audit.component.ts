import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AUDIT_ACTIONS, AuditAction, AuditEntry } from '@core/models/audit.models';
import { AuditService } from '@core/services/audit.service';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/**
 * Journal d'audit.
 *
 * <p>L'écran nomme les champs modifiés sans montrer leur contenu, parce que
 * le serveur ne l'envoie pas. Ce n'est pas une limitation à contourner :
 * c'est ce qui empêche le journal de devenir un moyen de lire, en passant par
 * la trace, des données qu'on ne peut pas ouvrir directement.</p>
 */
@Component({
  selector: 'eduops-audit',
  standalone: true,
  imports: [CommonModule, LoadingStateComponent, ErrorStateComponent,
    StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent implements OnInit {
  private readonly audit = inject(AuditService);
  private readonly destroyRef = inject(DestroyRef);

  readonly actions = AUDIT_ACTIONS;

  readonly entries = signal<AuditEntry[]>([]);
  readonly entityTypes = signal<string[]>([]);
  readonly total = signal(0);
  readonly page = signal(0);
  readonly totalPages = signal(1);
  readonly loading = signal(true);
  readonly failed = signal(false);

  readonly actionFilter = signal<AuditAction | ''>('');
  readonly typeFilter = signal('');
  readonly from = signal('');
  readonly to = signal('');

  readonly hasFilters = computed(() => Boolean(
    this.actionFilter() || this.typeFilter() || this.from() || this.to()));

  readonly canGoBack = computed(() => this.page() > 0);
  readonly canGoForward = computed(() => this.page() + 1 < this.totalPages());

  /** Les échecs de connexion méritent d'être vus en premier. */
  readonly failedLogins = computed(() =>
    this.entries().filter((entry) => entry.action === 'LOGIN_FAILED').length);

  readonly helpCopy = {
    title: 'Ce que le journal dit, et ce qu’il tait',
    description: 'Chaque opération sensible laisse une ligne : qui, quoi, '
      + 'quand, depuis quelle adresse. Les champs modifiés sont nommés — '
      + '« téléphone, adresse » — mais leur contenu n’est pas affiché.',
    points: [
      'Le journal ne peut pas être modifié : la base refuse toute écriture '
        + 'autre qu’un ajout.',
      'Montrer le contenu des champs ferait du journal un moyen de lire des '
        + 'dossiers qu’on n’a pas le droit d’ouvrir — un dossier médical, par '
        + 'exemple.',
      'Les échecs de connexion répétés sur un même compte sont le signal le '
        + 'plus utile de cet écran.'
    ]
  };

  ngOnInit(): void {
    this.load();
    this.audit.entityTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (types) => this.entityTypes.set(types),
        error: () => undefined
      });
  }

  load(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.audit.search({
      action: this.actionFilter() || undefined,
      entityType: this.typeFilter() || undefined,
      from: this.from() || undefined,
      to: this.to() || undefined,
      page: this.page(),
      size: 50
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        this.entries.set(result.content);
        this.total.set(result.totalElements);
        this.totalPages.set(Math.max(1, result.totalPages));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.failed.set(true);
      }
    });
  }

  /** Tout changement de filtre ramène à la première page. */
  private reload(): void {
    this.page.set(0);
    this.load();
  }

  filterAction(action: AuditAction | ''): void {
    this.actionFilter.set(action);
    this.reload();
  }

  filterType(type: string): void {
    this.typeFilter.set(type);
    this.reload();
  }

  setFrom(value: string): void {
    this.from.set(value);
    this.reload();
  }

  setTo(value: string): void {
    this.to.set(value);
    this.reload();
  }

  clearFilters(): void {
    this.actionFilter.set('');
    this.typeFilter.set('');
    this.from.set('');
    this.to.set('');
    this.reload();
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

  toneOf(action: AuditAction): string {
    return this.actions.find((item) => item.code === action)?.tone ?? 'update';
  }

  /** Une phrase lisible, plutôt qu'une ligne de colonnes techniques. */
  summaryOf(entry: AuditEntry): string {
    const who = entry.username ?? 'Un compte supprimé';
    const what = entry.entityLabel
      ? `${entry.entityTypeLabel} « ${entry.entityLabel} »`
      : entry.entityTypeLabel;
    if (entry.action === 'LOGIN') {
      return `${who} s’est connecté.`;
    }
    if (entry.action === 'LOGIN_FAILED') {
      return `Échec de connexion pour ${who}.`;
    }
    return `${who} — ${entry.actionLabel.toLowerCase()} : ${what}`;
  }
}
