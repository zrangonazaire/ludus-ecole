import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import {
  ImportBatch, ImportPreview, ImportRow, ImportRowStatus
} from '@core/models/import.models';
import { NotificationService } from '@core/services/notification.service';
import { StudentImportService } from '@core/services/student-import.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/** Les trois temps de l'import, dans l'ordre où on les traverse. */
export type ImportStep = 'DEPOT' | 'APERCU' | 'HISTORIQUE';

interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
}

/** Ce que le filtre d'aperçu retient. */
type RowFilter = 'TOUT' | 'A_CORRIGER' | ImportRowStatus;

/**
 * Import de listes.
 *
 * <p>L'écran suit la règle du module : un fichier n'écrit rien tant que
 * personne n'a vu ce qu'il contient. Le dépôt produit un aperçu, l'aperçu
 * demande une confirmation, et la confirmation laisse une trace dans
 * l'historique.</p>
 *
 * <p>L'aperçu s'ouvre par défaut sur les lignes à corriger. Sur un fichier de
 * trois cents élèves dont quatre sont fautifs, montrer les trois cents d'abord
 * revient à cacher les quatre qui demandent une décision.</p>
 */
@Component({
  selector: 'eduops-imports',
  standalone: true,
  imports: [CommonModule, LoadingStateComponent, ErrorStateComponent,
    StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './imports.component.html',
  styleUrl: './imports.component.scss'
})
export class ImportsComponent implements OnInit {
  private readonly imports = inject(StudentImportService);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly totalSteps = 3;

  readonly step = signal<ImportStep>('DEPOT');
  readonly preview = signal<ImportPreview | null>(null);
  readonly history = signal<ImportBatch[]>([]);
  readonly openedBatch = signal<ImportBatch | null>(null);

  readonly analysing = signal(false);
  readonly confirming = signal(false);
  readonly loadingHistory = signal(true);
  readonly historyFailed = signal(false);
  readonly dragging = signal(false);
  readonly rowFilter = signal<RowFilter>('A_CORRIGER');

  /** Le résultat d'une confirmation, distinct de l'aperçu qui l'a précédé. */
  readonly report = signal<ImportPreview | null>(null);

  readonly canImport = computed(() => this.auth.has(PERMISSIONS.IMPORT_EXECUTE));

  readonly columns = computed<string[]>(() => {
    const rows = this.preview()?.rows ?? [];
    const seen: string[] = [];
    for (const row of rows) {
      for (const key of Object.keys(row.values)) {
        if (!seen.includes(key)) {
          seen.push(key);
        }
      }
    }
    return seen;
  });

  readonly toFixCount = computed(() => {
    const rows = this.preview()?.rows ?? [];
    return rows.filter((row) => row.status === 'INVALID'
      || row.status === 'DUPLICATE' || row.warnings.length > 0).length;
  });

  readonly visibleRows = computed<ImportRow[]>(() => {
    const rows = this.preview()?.rows ?? [];
    const filter = this.rowFilter();
    if (filter === 'TOUT') {
      return rows;
    }
    if (filter === 'A_CORRIGER') {
      return rows.filter((row) => row.status === 'INVALID'
        || row.status === 'DUPLICATE' || row.warnings.length > 0);
    }
    return rows.filter((row) => row.status === filter);
  });

  /** Combien d'élèves seront réellement créés si l'on confirme. */
  readonly willCreate = computed(() => {
    const preview = this.preview();
    return preview ? preview.validRows + preview.warningRows : 0;
  });

  // --- pagination de l'aperçu : 300 lignes d'un coup rend le tableau illisible ---
  readonly pageSizeOptions = [10, 20, 50, 100];
  readonly previewPageSize = signal(10);
  readonly previewPage = signal(0);
  readonly previewTotalPages = computed(() =>
    Math.max(1, Math.ceil(this.visibleRows().length / this.previewPageSize())));
  readonly pagedVisibleRows = computed(() => {
    const start = this.previewPage() * this.previewPageSize();
    return this.visibleRows().slice(start, start + this.previewPageSize());
  });
  previewFirstRow(): number {
    const total = this.visibleRows().length;
    return total === 0 ? 0 : this.previewPage() * this.previewPageSize() + 1;
  }
  previewLastRow(): number {
    const total = this.visibleRows().length;
    return Math.min(total, (this.previewPage() + 1) * this.previewPageSize());
  }
  previewPrevPage(): void {
    this.previewPage.update((p) => Math.max(0, p - 1));
  }
  previewNextPage(): void {
    this.previewPage.update((p) => Math.min(this.previewTotalPages() - 1, p + 1));
  }
  changePreviewPageSize(event: Event): void {
    const size = Number((event.target as HTMLSelectElement).value);
    if (Number.isFinite(size) && size > 0) {
      this.previewPageSize.set(size);
      this.previewPage.set(0);
    }
  }

  readonly helpCopy = computed<HelpCopy>(() => {
    switch (this.step()) {
      case 'DEPOT':
        return {
          step: 1,
          title: 'Partez du modèle, pas de votre fichier',
          description: 'Le classeur modèle porte les colonnes attendues dans '
            + "l'ordre attendu. Recopiez-y vos listes plutôt que d'adapter le "
            + 'fichier reçu : les erreurs de colonnes sont les plus longues à '
            + 'démêler ensuite.',
          points: [
            'Mettez la colonne « Téléphone du responsable » au format Texte '
              + 'avant de saisir : sinon le tableur transforme +225… en nombre.',
            'La colonne « Classe » doit reprendre le nom exact de vos classes, '
              + '« 6ème A » et non « 6ème ».',
            'Une ligne sans classe reste importable : l\'élève est créé, son '
              + 'inscription viendra plus tard.'
          ]
        };
      case 'APERCU':
        return {
          step: 2,
          title: 'Rien n’est encore enregistré',
          description: 'Ce tableau décrit ce qui se passerait. Les lignes en '
            + 'rouge seront ignorées, celles en orange passeront avec une '
            + 'réserve. Corrigez dans votre fichier et redéposez-le autant de '
            + 'fois qu\'il le faut : tant que vous n\'avez pas confirmé, la '
            + 'base est intacte.',
          points: [
            'Un doublon est détecté sur le nom, le prénom et la date de '
              + 'naissance : deux homonymes nés le même jour demanderont une '
              + 'saisie manuelle.',
            'Le nombre annoncé sur le bouton est exactement le nombre d\'élèves '
              + 'qui seront créés.'
          ]
        };
      default:
        return {
          step: 3,
          title: 'Qui a importé quoi, et quand',
          description: 'Chaque import confirmé laisse une ligne ici, avec son '
            + 'auteur et son résultat. C\'est ce qui permet de répondre quand '
            + 'deux cents élèves apparaissent un mardi.',
          points: [
            'Ouvrez un import pour voir les lignes que le serveur a refusées '
              + 'à l\'écriture et leur motif.',
            'Redéposer un fichier déjà importé déclenche un avertissement '
              + 'avant la confirmation.'
          ]
        };
    }
  });

  ngOnInit(): void {
    this.loadHistory();
  }

  goTo(step: ImportStep): void {
    this.step.set(step);
    if (step === 'HISTORIQUE') {
      this.loadHistory();
    }
  }

  loadHistory(): void {
    this.loadingHistory.set(true);
    this.historyFailed.set(false);
    this.imports.history()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (batches) => {
          this.history.set(batches);
          this.loadingHistory.set(false);
        },
        error: () => {
          this.loadingHistory.set(false);
          this.historyFailed.set(true);
        }
      });
  }

  downloadTemplate(): void {
    this.imports.downloadTemplate();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  onDragLeave(): void {
    this.dragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.analyse(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.analyse(file);
    }
    // Remis à zéro pour que redéposer le même fichier relance l'analyse.
    input.value = '';
  }

  analyse(file: File): void {
    if (this.analysing()) {
      return;
    }
    this.analysing.set(true);
    this.report.set(null);
    this.imports.analyse(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (preview) => {
          this.analysing.set(false);
          this.preview.set(preview);
          this.previewPage.set(0);
          this.rowFilter.set(this.toFixCount() > 0 ? 'A_CORRIGER' : 'TOUT');
          this.step.set('APERCU');
        },
        error: (err) => {
          this.analysing.set(false);
          this.notifications.error(this.messageOf(err),
            'Le fichier n’a pas pu être lu');
        }
      });
  }

  confirm(): void {
    const preview = this.preview();
    if (!preview || !preview.importable || this.confirming()) {
      return;
    }
    this.confirming.set(true);
    this.imports.confirm(preview.batchId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (report) => {
          this.confirming.set(false);
          this.report.set(report);
          this.preview.set(null);
          const created = report.rows.filter((row) => row.errors.length === 0).length;
          this.notifications.success(
            `${created} élève(s) créé(s) depuis ${report.fileName}.`,
            'Import terminé');
          this.loadHistory();
        },
        error: (err) => {
          this.confirming.set(false);
          this.notifications.error(this.messageOf(err), 'Import refusé');
        }
      });
  }

  /** Abandonne l'aperçu sans rien écrire. */
  discard(): void {
    this.preview.set(null);
    this.report.set(null);
    this.step.set('DEPOT');
  }

  openBatch(batch: ImportBatch): void {
    this.openedBatch.set(batch);
    this.imports.detail(batch.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (full) => this.openedBatch.set(full),
        error: () => undefined
      });
  }

  closeBatch(): void {
    this.openedBatch.set(null);
  }

  filterRows(filter: RowFilter): void {
    this.rowFilter.set(filter);
    this.previewPage.set(0);
  }

  statusLabel(status: ImportRowStatus): string {
    return ({
      VALID: 'Prête', WARNING: 'À vérifier',
      DUPLICATE: 'Doublon', INVALID: 'En erreur'
    })[status];
  }

  statusTone(status: ImportRowStatus): string {
    return status.toLowerCase();
  }

  private messageOf(err: unknown): string {
    const failure = (err as { error?: { code?: string; message?: string } })?.error;
    // Le message du serveur d'abord : il nomme la ligne ou la date en cause,
    // là où le code ne rend qu'une phrase générique.
    return failure?.message?.trim()
      || translateErrorCode(failure?.code ?? 'UNKNOWN');
  }
}
