import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SchoolDoc {
  id: string;
  title: string;
  category: 'REGLEMENT' | 'INSCRIPTION' | 'SANTE' | 'STAGE' | 'EXAMEN';
  fileName: string;
  fileSize: string;
  updatedAt: string;
  visibility: 'PUBLIC' | 'PARENTS' | 'TEACHERS' | 'ADMIN';
  downloadCount: number;
}

@Component({
  selector: 'eduops-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Gestion Documentaire & GED</h1>
        <p class="page-head__sub">Modèles officiels, règlements intérieurs, formulaires et documents d'établissement</p>
      </div>

      <div class="actions">
        <button class="btn btn--primary" (click)="openUploadModal()">
          📤 Ajouter un document officiel
        </button>
      </div>
    </header>

    @if (statusMessage()) {
      <div class="alert alert--success">
        {{ statusMessage() }}
      </div>
    }

    <!-- FILTRES PAR CATÉGORIE -->
    <div class="filter-bar">
      <div class="pills">
        <button class="pill" [class.pill--active]="selectedCat() === 'ALL'" (click)="selectedCat.set('ALL')">
          Tous les documents ({{ docs().length }})
        </button>
        <button class="pill" [class.pill--active]="selectedCat() === 'REGLEMENT'" (click)="selectedCat.set('REGLEMENT')">
          Règlements & Chartes
        </button>
        <button class="pill" [class.pill--active]="selectedCat() === 'INSCRIPTION'" (click)="selectedCat.set('INSCRIPTION')">
          Formulaires & Inscription
        </button>
        <button class="pill" [class.pill--active]="selectedCat() === 'SANTE'" (click)="selectedCat.set('SANTE')">
          Santé & Médical
        </button>
        <button class="pill" [class.pill--active]="selectedCat() === 'STAGE'" (click)="selectedCat.set('STAGE')">
          Conventions & Stages
        </button>
        <button class="pill" [class.pill--active]="selectedCat() === 'EXAMEN'" (click)="selectedCat.set('EXAMEN')">
          Examens & Calendriers
        </button>
      </div>

      <div class="search-wrap">
        <input type="text" class="search-input" placeholder="Rechercher un document..." [(ngModel)]="searchQuery">
      </div>
    </div>

    <!-- GRILLE DES DOCUMENTS -->
    <div class="docs-grid">
      @for (doc of filteredDocs(); track doc.id) {
        <article class="doc-card card">
          <div class="doc-card__head">
            <span class="file-icon">📄</span>
            <span class="vis-badge" [ngClass]="'vis--' + doc.visibility.toLowerCase()">
              {{ getVisLabel(doc.visibility) }}
            </span>
          </div>

          <h3 class="doc-card__title">{{ doc.title }}</h3>
          <p class="doc-card__meta">
            {{ doc.fileName }} • {{ doc.fileSize }}<br>
            Mis à jour le {{ doc.updatedAt }}
          </p>

          <div class="doc-card__footer">
            <span class="download-info">📥 {{ doc.downloadCount }} téléchargements</span>
            <button class="btn btn--download" (click)="downloadDoc(doc)">
              Télécharger
            </button>
          </div>
        </article>
      } @empty {
        <div class="empty-state card">
          <p>Aucun document trouvé pour cette sélection.</p>
        </div>
      }
    </div>

    <!-- MODAL D'AJOUT DE DOCUMENT -->
    @if (showModal()) {
      <div class="modal-overlay" (click)="showModal.set(false)">
        <div class="modal card" (click)="$event.stopPropagation()">
          <div class="modal__header">
            <h3>Nouveau document officiel</h3>
            <button class="modal__close" (click)="showModal.set(false)">✕</button>
          </div>

          <div class="modal__body">
            <div class="form-group">
              <label>Titre officiel du document :</label>
              <input type="text" class="input" [(ngModel)]="newTitle" placeholder="Ex: Règlement intérieur 2026">
            </div>

            <div class="form-group">
              <label>Catégorie :</label>
              <select class="input" [(ngModel)]="newCategory">
                <option value="REGLEMENT">Règlements & Chartes</option>
                <option value="INSCRIPTION">Formulaires & Inscription</option>
                <option value="SANTE">Santé & Médical</option>
                <option value="STAGE">Conventions & Stages</option>
                <option value="EXAMEN">Examens & Calendriers</option>
              </select>
            </div>

            <div class="form-group">
              <label>Visibilité d'accès :</label>
              <select class="input" [(ngModel)]="newVisibility">
                <option value="PUBLIC">Public (Visiteurs & Grand Public)</option>
                <option value="PARENTS">Familles & Parents d'élèves</option>
                <option value="TEACHERS">Corps Enseignant uniquement</option>
                <option value="ADMIN">Direction & Administration uniquement</option>
              </select>
            </div>

            <div class="upload-dropzone">
              <span class="dropzone-icon">📁</span>
              <p>Glissez-déposez le fichier PDF ici ou <strong>parcourez vos fichiers</strong></p>
              <small>Formats acceptés : PDF, DOCX, XLSX (max 25 Mo)</small>
            </div>
          </div>

          <div class="modal__footer">
            <button class="btn btn--outline" (click)="showModal.set(false)">Annuler</button>
            <button class="btn btn--primary" (click)="saveNewDoc()">Enregistrer et publier</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }

    .alert--success {
      background: #dcfce7; color: #15803d; padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-button); margin-bottom: var(--space-5); font-size: var(--text-sm); font-weight: 600;
    }

    .filter-bar {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .pills { display: flex; gap: var(--space-2); overflow-x: auto; }
    .pill {
      padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border-medium);
      background: var(--surface); color: var(--text-muted); font-size: var(--text-xs);
      font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s;
    }
    .pill:hover { background: var(--surface-subtle); color: var(--text-strong); }
    .pill--active { background: #1b365d; color: #fff; border-color: #1b365d; }

    .search-input {
      padding: 8px 14px; border-radius: var(--radius-button); border: 1px solid var(--border-medium);
      font-size: var(--text-sm); background: var(--surface); color: var(--text-strong); width: 220px;
    }

    .docs-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-4); margin-bottom: var(--space-8);
    }
    .doc-card {
      padding: var(--space-5); background: var(--surface); border: 1px solid var(--border-light);
      border-radius: var(--radius-card); display: flex; flex-direction: column; justify-content: space-between;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .doc-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
    .doc-card__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); }
    .file-icon { font-size: 28px; }

    .vis-badge { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
    .vis--public { background: #dcfce7; color: #166534; }
    .vis--parents { background: #dbeafe; color: #1e40af; }
    .vis--teachers { background: #fef3c7; color: #92400e; }
    .vis--admin { background: #f3e8ff; color: #6b21a8; }

    .doc-card__title { margin: 0 0 var(--space-2); font-size: var(--text-md); font-family: var(--font-display); color: var(--text-strong); line-height: 1.3; }
    .doc-card__meta { font-size: var(--text-xs); color: var(--text-muted); margin: 0 0 var(--space-4); line-height: 1.4; }

    .doc-card__footer {
      display: flex; justify-content: space-between; align-items: center;
      border-top: 1px solid var(--border-light); padding-top: var(--space-3);
    }
    .download-info { font-size: 11px; color: var(--text-light); }

    .btn {
      padding: 8px 14px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn--primary { background: #1b365d; color: #fff; }
    .btn--download { background: var(--surface-subtle); border: 1px solid var(--border-medium); font-size: var(--text-xs); }
    .btn--download:hover { background: #1b365d; color: #fff; }
    .btn--outline { border: 1px solid var(--border-medium); background: var(--surface); }

    .empty-state { padding: var(--space-8); text-align: center; color: var(--text-muted); grid-column: 1 / -1; }

    /* MODAL */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center; z-index: 1000; padding: var(--space-4);
    }
    .modal { width: 100%; max-width: 520px; background: var(--surface); border-radius: var(--radius-card); overflow: hidden; }
    .modal__header {
      display: flex; justify-content: space-between; align-items: center;
      padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-light);
    }
    .modal__header h3 { margin: 0; font-size: var(--text-lg); font-family: var(--font-display); }
    .modal__close { background: none; border: none; font-size: var(--text-lg); cursor: pointer; color: var(--text-muted); }
    .modal__body { padding: var(--space-5); }
    .form-group { margin-bottom: var(--space-4); }
    .form-group label { display: block; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); margin-bottom: 4px; }
    .input {
      width: 100%; padding: 10px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-sm); background: var(--surface); box-sizing: border-box;
    }
    .upload-dropzone {
      border: 2px dashed var(--border-medium); border-radius: var(--radius-card); padding: var(--space-6);
      text-align: center; background: var(--surface-subtle); margin: var(--space-4) 0;
    }
    .dropzone-icon { font-size: 32px; display: block; margin-bottom: var(--space-2); }
    .upload-dropzone p { margin: 0 0 4px; font-size: var(--text-sm); color: var(--text-strong); }
    .upload-dropzone small { color: var(--text-muted); font-size: 11px; }
    .modal__footer { display: flex; justify-content: flex-end; gap: var(--space-3); }
  `]
})
export class DocumentsComponent {
  readonly selectedCat = signal<'ALL' | 'REGLEMENT' | 'INSCRIPTION' | 'SANTE' | 'STAGE' | 'EXAMEN'>('ALL');
  readonly showModal = signal(false);
  readonly statusMessage = signal<string | null>(null);

  searchQuery = '';
  newTitle = '';
  newCategory: 'REGLEMENT' | 'INSCRIPTION' | 'SANTE' | 'STAGE' | 'EXAMEN' = 'REGLEMENT';
  newVisibility: 'PUBLIC' | 'PARENTS' | 'TEACHERS' | 'ADMIN' = 'PUBLIC';

  readonly docs = signal<SchoolDoc[]>([
    {
      id: 'd1',
      title: 'Règlement Intérieur de l’Établissement (2025-2026)',
      category: 'REGLEMENT',
      fileName: 'reglement-interieur-ludus-2025-2026.pdf',
      fileSize: '420 Ko',
      updatedAt: '01/09/2026',
      visibility: 'PUBLIC',
      downloadCount: 384
    },
    {
      id: 'd2',
      title: 'Dossier de Candidature & Fiche d’Inscription Officielle',
      category: 'INSCRIPTION',
      fileName: 'dossier-inscription-officiel.pdf',
      fileSize: '315 Ko',
      updatedAt: '15/08/2026',
      visibility: 'PUBLIC',
      downloadCount: 512
    },
    {
      id: 'd3',
      title: 'Fiche Médicale de Liaison et d’Urgence Infirmerie',
      category: 'SANTE',
      fileName: 'fiche-medicale-urgence-infirmerie.pdf',
      fileSize: '190 Ko',
      updatedAt: '02/09/2026',
      visibility: 'PARENTS',
      downloadCount: 247
    },
    {
      id: 'd4',
      title: 'Convention de Stage en Entreprise (Collège & Lycée)',
      category: 'STAGE',
      fileName: 'convention-stage-ludus.docx',
      fileSize: '145 Ko',
      updatedAt: '10/09/2026',
      visibility: 'PARENTS',
      downloadCount: 89
    },
    {
      id: 'd5',
      title: 'Calendrier Officiel des Évaluations & Examens Blancs',
      category: 'EXAMEN',
      fileName: 'calendrier-examens-t1-2026.pdf',
      fileSize: '280 Ko',
      updatedAt: '25/09/2026',
      visibility: 'PARENTS',
      downloadCount: 165
    },
    {
      id: 'd6',
      title: 'Charte Informatique et Utilisation des Ordinateurs & Wi-Fi',
      category: 'REGLEMENT',
      fileName: 'charte-informatique-eleves.pdf',
      fileSize: '175 Ko',
      updatedAt: '01/09/2026',
      visibility: 'PUBLIC',
      downloadCount: 204
    }
  ]);

  filteredDocs() {
    return this.docs().filter((d) => {
      const matchCat = this.selectedCat() === 'ALL' || d.category === this.selectedCat();
      const matchQuery = !this.searchQuery || d.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || d.fileName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }

  getVisLabel(v: string): string {
    switch (v) {
      case 'PUBLIC': return 'Tout public';
      case 'PARENTS': return 'Familles';
      case 'TEACHERS': return 'Enseignants';
      default: return 'Direction';
    }
  }

  openUploadModal(): void {
    this.newTitle = '';
    this.showModal.set(true);
  }

  saveNewDoc(): void {
    if (!this.newTitle) return;
    const newDoc: SchoolDoc = {
      id: 'd-' + Date.now(),
      title: this.newTitle,
      category: this.newCategory,
      fileName: this.newTitle.toLowerCase().replace(/\s+/g, '-') + '.pdf',
      fileSize: '240 Ko',
      updatedAt: new Date().toLocaleDateString('fr-FR'),
      visibility: this.newVisibility,
      downloadCount: 0
    };
    this.docs.update((list) => [newDoc, ...list]);
    this.showModal.set(false);
    this.statusMessage.set(`Le document « ${this.newTitle} » a été ajouté à la GED.`);
    setTimeout(() => this.statusMessage.set(null), 4000);
  }

  downloadDoc(doc: SchoolDoc): void {
    window.print();
  }
}
