import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentDetail } from '@core/models/domain.models';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

@Component({
  selector: 'eduops-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="no-print">
      <header class="page-head">
        <div>
          <h1 class="page-head__title">Certificats & Attestations Scolaires</h1>
          <p class="page-head__sub">Génération instantanée de documents officiels avec cachet, signature et QR Code d'authenticité</p>
        </div>

        <div class="actions">
          <button class="btn btn--primary" (click)="printDocument()">
            🖨️ Imprimer / Exporter en PDF
          </button>
        </div>
      </header>

      <!-- CONFIGURATION DU DOCUMENT -->
      <div class="config-card card">
        <div class="grid-form">
          <div class="form-col">
            <label>Type de document :</label>
            <select class="input" [(ngModel)]="docType">
              <option value="SCOLARITE">Certificat de Scolarité</option>
              <option value="INSCRIPTION">Attestation d'Inscription Officielle</option>
              <option value="ASSIDUITE">Attestation d'Assiduité</option>
              <option value="RADIATION">Certificat de Radiation / Sortie (EXEAT)</option>
            </select>
          </div>

          <div class="form-col">
            <label>Élève bénéficiaire :</label>
            <select class="input" [(ngModel)]="selectedStudentId" (change)="onStudentSelect()">
              @for (st of studentsList(); track st.id) {
                <option [value]="st.id">{{ st.fullName }} ({{ st.classroomName }} • {{ st.studentNumber }})</option>
              }
            </select>
          </div>

          <div class="form-col">
            <label>Année académique :</label>
            <input type="text" class="input" [(ngModel)]="academicYear" readonly>
          </div>

          <div class="form-col">
            <label>Motif / Destinataire (facultatif) :</label>
            <input type="text" class="input" [(ngModel)]="purpose" placeholder="Pour faire valoir ce que de droit">
          </div>
        </div>
      </div>
    </div>

    <!-- PREVISUALISATION DU DOCUMENT OFFICIEL A4 -->
    <div class="certificate-container">
      <div class="certificate-sheet">
        <!-- ENTÊTE OFFICIEL -->
        <header class="cert-header">
          <div class="cert-header__left">
            <span class="cert-rep">RÉPUBLIQUE DE CÔTE D'IVOIRE</span>
            <span class="cert-min">MINISTÈRE DE L'ÉDUCATION NATIONALE</span>
            <span class="cert-div">DRENA ABIDJAN 1</span>
            <span class="cert-motto">Union - Discipline - Travail</span>
          </div>

          <div class="cert-header__center">
            <img class="cert-logo" src="assets/branding/ludus-logo.png" alt="LUDUS École" (error)="onLogoError($event)">
          </div>

          <div class="cert-header__right">
            <h2 class="cert-school-name">LUDUS ÉCOLE</h2>
            <p class="cert-school-info">
              Agrément ministériel N° 0418/MENA/DES<br>
              Cocody Riviera Palmeraie, Abidjan<br>
              Tél : +225 27 22 40 50 60<br>
              contact&#64;ludus-ecole.ci
            </p>
          </div>
        </header>

        <div class="cert-ref-bar">
          <span>Réf : <strong>{{ refNumber }}</strong></span>
          <span>Date : <strong>{{ currentDate }}</strong></span>
        </div>

        <!-- TITRE SOLENNEL -->
        <div class="cert-title-box">
          <h1 class="cert-title">{{ documentTitle() }}</h1>
        </div>

        <!-- CORPS DU TEXTE -->
        <div class="cert-body">
          <p class="cert-paragraph">
            Le Directeur Général du complexe d'enseignement <strong>LUDUS ÉCOLE</strong>, soussigné, atteste par la présente que :
          </p>

          <div class="student-box">
            <table class="student-data-table">
              <tr>
                <td class="lbl">Nom et Prénom :</td>
                <td class="val"><strong>{{ currentStudent()?.fullName?.toUpperCase() ?? 'KOUASSI EMMANUEL' }}</strong></td>
              </tr>
              <tr>
                <td class="lbl">Matricule officiel :</td>
                <td class="val"><strong class="mono">{{ currentStudent()?.studentNumber ?? 'ELE-2025-0012' }}</strong></td>
              </tr>
              <tr>
                <td class="lbl">Date et lieu de naissance :</td>
                <td class="val">14 Mars 2011 à Abidjan (Cocody)</td>
              </tr>
              <tr>
                <td class="lbl">Sexe :</td>
                <td class="val">Masculin</td>
              </tr>
              <tr>
                <td class="lbl">Classe fréquentée :</td>
                <td class="val"><strong class="badge-class">{{ currentStudent()?.classroomName ?? '3ème A' }}</strong></td>
              </tr>
              <tr>
                <td class="lbl">Année scolaire :</td>
                <td class="val"><strong>{{ academicYear }}</strong></td>
              </tr>
            </table>
          </div>

          <p class="cert-paragraph cert-statement">
            @if (docType === 'SCOLARITE') {
              est régulièrement inscrit(e) et poursuit assidûment ses études dans notre établissement pour l'année scolaire en cours.
            } @else if (docType === 'INSCRIPTION') {
              a satisfait à toutes les conditions d'admission et est officiellement inscrit(e) sur les registres scolaires de l'établissement.
            } @else if (docType === 'ASSIDUITE') {
              a fait preuve d'une assiduité exemplaire tout au long de la période avec un taux de présence officiel de 97.5%.
            } @else {
              a été régulièrement radié(e) de nos effectifs ce jour, étant en règle de toutes ses obligations académiques et financières.
            }
          </p>

          <p class="cert-conclusion">
            En foi de quoi, la présente attestation lui est délivrée à la demande de l'intéressé(e) pour servir et valoir ce que de droit.
          </p>
        </div>

        <!-- PIED DE DOCUMENT & SIGNATURE -->
        <footer class="cert-footer">
          <div class="cert-qr">
            <div class="qr-mock">
              <span class="qr-label">AUTHENTICITÉ VÉRIFIÉE</span>
              <span class="qr-code-text">CODE : LUD-{{ mathCode }}</span>
            </div>
            <small class="cert-check-text">Vérifiable en ligne sur www.ludus-ecole.ci/verifier</small>
          </div>

          <div class="cert-signature-box">
            <span class="sig-location">Fait à Abidjan, le {{ currentDate }}</span>
            <span class="sig-title">Le Chef d'Établissement</span>
            <div class="stamp-seal">
              <div class="circular-stamp">
                <span>★ LUDUS ÉCOLE ★</span>
                <strong>DIRECTION GÉNÉRALE</strong>
                <span>ABIDJAN CI</span>
              </div>
              <div class="calligraphy-sig">J.P. KOUAKOU</div>
            </div>
            <span class="sig-name">Dr. Jean-Pierre KOUAKOU</span>
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }

    .config-card { padding: var(--space-5); background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); margin-bottom: var(--space-6); }
    .grid-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-4); }
    .form-col label { display: block; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); margin-bottom: 4px; }
    .input {
      width: 100%; padding: 8px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-sm); background: var(--surface); color: var(--text-strong); box-sizing: border-box;
    }

    .btn {
      padding: 10px 20px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn--primary { background: #1b365d; color: #fff; box-shadow: 0 2px 8px rgba(27, 54, 93, 0.25); }
    .btn--primary:hover { background: #12253f; }

    /* FEUILLE OFFICIELLE FORMAT A4 */
    .certificate-container {
      display: flex; justify-content: center; margin-bottom: var(--space-10);
    }
    .certificate-sheet {
      width: 100%; max-width: 800px; min-height: 1050px; background: #fff;
      color: #1e293b; padding: 60px 70px; border: 1px solid #cbd5e1;
      border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      position: relative; box-sizing: border-box; font-family: 'Public Sans', sans-serif;
    }

    .cert-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      border-bottom: 2px solid #1b365d; padding-bottom: 20px; margin-bottom: 24px;
    }
    .cert-header__left { display: flex; flex-direction: column; font-size: 11px; text-transform: uppercase; color: #475569; line-height: 1.4; }
    .cert-rep { font-weight: 800; color: #0f172a; font-size: 12px; }
    .cert-min { font-weight: 700; }
    .cert-motto { font-style: italic; margin-top: 4px; font-weight: 600; }

    .cert-header__center { display: flex; justify-content: center; }
    .cert-logo { width: 85px; height: 85px; object-fit: contain; }

    .cert-header__right { text-align: right; }
    .cert-school-name { margin: 0 0 4px; font-size: 20px; font-weight: 900; color: #1b365d; letter-spacing: 1px; }
    .cert-school-info { margin: 0; font-size: 10px; color: #64748b; line-height: 1.4; }

    .cert-ref-bar {
      display: flex; justify-content: space-between; font-size: 12px; color: #475569;
      margin-bottom: 30px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px;
    }

    .cert-title-box { text-align: center; margin: 30px 0 35px; }
    .cert-title {
      font-size: 24px; font-weight: 900; text-transform: uppercase;
      letter-spacing: 2px; color: #1b365d; margin: 0; text-decoration: underline; text-underline-offset: 8px;
    }

    .cert-body { font-size: 14px; line-height: 1.8; color: #334155; margin-bottom: 50px; }
    .cert-paragraph { margin-bottom: 20px; text-align: justify; }

    .student-box {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
      padding: 16px 24px; margin: 25px 0;
    }
    .student-data-table { width: 100%; border-collapse: collapse; }
    .student-data-table td { padding: 6px 4px; font-size: 13.5px; }
    .student-data-table .lbl { width: 38%; color: #64748b; }
    .student-data-table .val { color: #0f172a; }
    .student-data-table .mono { font-family: monospace; font-size: 14px; }
    .badge-class { background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 13px; }

    .cert-statement { font-size: 15px; font-weight: 500; margin: 25px 0; }
    .cert-conclusion { font-style: italic; margin-top: 30px; }

    .cert-footer {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-top: 60px; padding-top: 20px;
    }

    .cert-qr { display: flex; flex-direction: column; gap: 6px; }
    .qr-mock {
      width: 140px; padding: 8px; border: 1px solid #94a3b8; border-radius: 4px;
      text-align: center; background: #f8fafc;
    }
    .qr-label { display: block; font-size: 9px; font-weight: 800; color: #16a34a; letter-spacing: 0.5px; }
    .qr-code-text { display: block; font-family: monospace; font-size: 10px; color: #0f172a; margin-top: 2px; }
    .cert-check-text { font-size: 9px; color: #94a3b8; }

    .cert-signature-box { display: flex; flex-direction: column; align-items: center; min-width: 250px; text-align: center; }
    .sig-location { font-size: 13px; margin-bottom: 6px; color: #475569; }
    .sig-title { font-weight: 700; font-size: 14px; color: #0f172a; text-transform: uppercase; margin-bottom: 12px; }

    .stamp-seal { position: relative; width: 160px; height: 90px; display: flex; align-items: center; justify-content: center; }
    .circular-stamp {
      width: 85px; height: 85px; border: 2px dashed #dc2626; border-radius: 50%;
      color: #dc2626; display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-size: 8px; font-weight: bold; transform: rotate(-15deg); opacity: 0.85; position: absolute;
    }
    .circular-stamp strong { font-size: 7.5px; }
    .calligraphy-sig {
      font-family: 'Brush Script MT', cursive, sans-serif; font-size: 32px;
      color: #1e3a8a; transform: rotate(-8deg); z-index: 2; position: relative;
    }

    .sig-name { font-weight: 700; font-size: 13px; color: #0f172a; margin-top: 10px; }

    /* IMPRESSION A4 */
    @media print {
      .no-print { display: none !important; }
      body { background: #fff !important; margin: 0; padding: 0; }
      .certificate-container { margin: 0; }
      .certificate-sheet {
        border: none !important; box-shadow: none !important; padding: 20mm 15mm !important;
        max-width: 100% !important; min-height: 100vh !important;
      }
    }
  `]
})
export class CertificatesComponent implements OnInit {
  private readonly studentSource = inject(STUDENT_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly studentsList = signal<StudentDetail[]>([]);
  readonly currentStudent = signal<StudentDetail | null>(null);

  docType = 'SCOLARITE';
  selectedStudentId = 'st-1';
  academicYear = '2025-2026';
  purpose = 'Pour faire valoir ce que de droit';
  refNumber = 'LUD-CERT-2026-' + Math.floor(1000 + Math.random() * 9000);
  mathCode = Math.floor(100000 + Math.random() * 900000);
  currentDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  ngOnInit(): void {
    this.studentSource.getById('st-1').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (student) => {
        const student2: StudentDetail = {
          ...student,
          id: 'st-2',
          studentNumber: 'ELE-2025-0042',
          firstName: 'Sarah',
          lastName: 'Kouassi',
          fullName: 'Sarah Kouassi',
          birthDate: '2012-05-18',
          classroomName: '5ème B'
        };
        this.studentsList.set([student, student2]);
        this.currentStudent.set(student);
      },
      error: () => {}
    });
  }

  onStudentSelect(): void {
    const found = this.studentsList().find((s) => s.id === this.selectedStudentId);
    if (found) this.currentStudent.set(found);
  }

  documentTitle(): string {
    switch (this.docType) {
      case 'SCOLARITE': return 'CERTIFICAT DE SCOLARITÉ';
      case 'INSCRIPTION': return 'ATTESTATION D’INSCRIPTION';
      case 'ASSIDUITE': return 'ATTESTATION D’ASSIDUITÉ SCOLAIRE';
      case 'RADIATION': return 'CERTIFICAT DE RADIATION (EXEAT)';
      default: return 'DOCUMENT OFFICIEL';
    }
  }

  onLogoError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
  }

  printDocument(): void {
    window.print();
  }
}
