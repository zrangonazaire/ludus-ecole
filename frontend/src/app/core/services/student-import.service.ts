import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import {
  ImportBatch, ImportPreview, ImportRow, ImportRowStatus
} from '@core/models/import.models';
import { MOCK_CLASSROOMS, MOCK_STUDENTS } from '@core/datasource/mock/mock-data';
import { SpreadsheetError, excelSerialToDate, readSpreadsheet } from '@core/utils/spreadsheet';

/** Colonnes du modèle, dans l'ordre où le serveur les produit. */
const COLUMNS = [
  'Nom', 'Prénoms', 'Sexe', 'Date de naissance', 'Lieu de naissance',
  'Nationalité', 'Classe', 'Nom du responsable', 'Téléphone du responsable',
  'Email du responsable', 'Lien de parenté', 'École précédente'
] as const;

const REQUIRED = ['Nom', 'Prénoms', 'Sexe', 'Date de naissance'] as const;

/**
 * Import d'élèves par fichier.
 *
 * <p>Trois temps distincts : modèle, analyse, confirmation. La séparation est
 * volontaire — elle garantit qu'aucun fichier n'est écrit sans avoir été vu.</p>
 *
 * <p>En démonstration, le fichier déposé est réellement lu et contrôlé. Un
 * aperçu qui afficherait des lignes fictives à la place des vôtres serait pire
 * qu'inutile : il vous ferait confirmer un contenu que vous n'avez pas vu.</p>
 */
@Injectable({ providedIn: 'root' })
export class StudentImportService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/imports/students`;
  private readonly historyBase = `${environment.apiBaseUrl}/imports/batches`;

  /** Le lot analysé, conservé le temps de la confirmation. */
  private pending: ImportPreview | null = null;

  /**
   * L'historique de démonstration.
   *
   * Vide au départ, et volontairement : inventer trois imports passés à une
   * école qui n'en a fait aucun lui montrerait un écran qui ment. Il se
   * remplit de ce que la personne importe vraiment pendant sa session.
   */
  private readonly mockHistory: ImportBatch[] = [];

  /** Déclenche le téléchargement du classeur modèle. */
  downloadTemplate(): void {
    if (environment.useMockData) {
      this.downloadMockTemplate();
      return;
    }
    this.http.get(`${this.base}/template`, { responseType: 'blob' })
      .subscribe((blob) => this.saveBlob(blob, 'modele-import-eleves.xlsx'));
  }

  analyse(file: File): Observable<ImportPreview> {
    if (environment.useMockData) {
      return from(this.analyseLocally(file));
    }
    const form = new FormData();
    form.append('file', file);
    return this.http.post<ImportPreview>(`${this.base}/upload`, form);
  }

  confirm(batchId: string): Observable<ImportPreview> {
    if (environment.useMockData) {
      const report = this.buildReport();
      this.recordMockBatch(report);
      return of(report).pipe(delay(700), map((r) => r));
    }
    return this.http.post<ImportPreview>(`${this.base}/${batchId}/confirm`, {});
  }

  /** Les imports déjà effectués, du plus récent au plus ancien. */
  history(): Observable<ImportBatch[]> {
    if (environment.useMockData) {
      return of([...this.mockHistory]).pipe(delay(250));
    }
    return this.http.get<ImportBatch[]>(`${this.historyBase}`);
  }

  detail(batchId: string): Observable<ImportBatch> {
    if (environment.useMockData) {
      const found = this.mockHistory.find((batch) => batch.id === batchId);
      return of(found ?? this.mockHistory[0]).pipe(delay(200));
    }
    return this.http.get<ImportBatch>(`${this.historyBase}/${batchId}`);
  }

  // ──────────────────────────────────────────────── analyse locale

  /**
   * Lit le fichier déposé et applique les mêmes contrôles que le serveur.
   *
   * <p>Rien n'est enregistré : cette passe ne fait que décrire ce qui se
   * passerait.</p>
   */
  private async analyseLocally(file: File): Promise<ImportPreview> {
    let sheet: string[][];
    try {
      sheet = await readSpreadsheet(file);
    } catch (error) {
      return this.unreadable(file.name, error);
    }

    if (sheet.length === 0) {
      return this.empty(file.name, 'Le fichier ne contient aucune ligne.');
    }

    const header = sheet[0].map((cell) => normaliseHeader(cell));
    const columnOf = new Map<string, number>();
    COLUMNS.forEach((label) => {
      const index = header.indexOf(normaliseHeader(label));
      if (index >= 0) {
        columnOf.set(label, index);
      }
    });

    if (!columnOf.has('Nom') || !columnOf.has('Prénoms')) {
      return this.empty(file.name,
        'Les colonnes « Nom » et « Prénoms » sont introuvables. '
        + 'Utilisez le modèle proposé à l\'étape précédente.');
    }

    const classes = new Map(MOCK_CLASSROOMS.map(
      (c) => [normaliseHeader(c.name), c]));
    const seen = new Set<string>();
    const existing = new Set(MOCK_STUDENTS.map(
      (s) => `${normaliseHeader(s.lastName)}|${normaliseHeader(s.firstName)}`));

    const rows: ImportRow[] = [];
    let sequence = 241;

    for (let i = 1; i < sheet.length; i++) {
      const cells = sheet[i];
      const values: Record<string, string> = {};
      columnOf.forEach((index, label) => {
        values[label] = (cells[index] ?? '').trim();
      });

      const errors: string[] = [];
      const warnings: string[] = [];

      REQUIRED.forEach((label) => {
        if (!values[label]) {
          errors.push(`« ${label} » est obligatoire`);
        }
      });

      // Excel convertit une date saisie à la main en numéro de série.
      const rawDate = values['Date de naissance'] ?? '';
      const converted = excelSerialToDate(rawDate);
      if (converted) {
        values['Date de naissance'] = converted;
      } else if (rawDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
        errors.push('Date de naissance invalide (attendu : JJ/MM/AAAA)');
      }

      const sex = normaliseHeader(values['Sexe'] ?? '');
      if (sex && !['m', 'f', 'masculin', 'feminin', 'garcon', 'fille'].includes(sex)) {
        errors.push(`Sexe « ${values['Sexe']} » non reconnu (attendu : M ou F)`);
      }

      const className = values['Classe'] ?? '';
      const classroom = className ? classes.get(normaliseHeader(className)) : undefined;
      if (className && !classroom) {
        // « 5eme » ne suffit pas quand les classes s'appellent « 5eme A » :
        // on nomme les candidates plutôt que de renvoyer un refus sec.
        const near = MOCK_CLASSROOMS
          .filter((c) => normaliseHeader(c.name).startsWith(normaliseHeader(className)))
          .map((c) => c.name);
        errors.push(near.length > 0
          ? `Classe « ${className} » introuvable. Vouliez-vous dire ${near.join(' ou ')} ?`
          : `Classe « ${className} » introuvable`);
      } else if (!className) {
        warnings.push('Aucune classe : l\'élève sera créé sans inscription');
      } else if (classroom && classroom.availableSeats <= 0) {
        warnings.push(`${classroom.name} est complète : une dérogation sera demandée`);
      }

      const phone = values['Téléphone du responsable'] ?? '';
      if (!phone) {
        warnings.push('Aucun téléphone de responsable');
      } else if (/^[-+]?\d+([.,]\d+)?e[-+]?\d+$/i.test(phone.replace(/\s/g, ''))) {
        // Excel prend « +2250711223 » pour un nombre et le réécrit en notation
        // scientifique. Le numéro d'origine est perdu, pas seulement mal affiché.
        errors.push(`Téléphone « ${phone} » illisible : le tableur l'a converti en `
          + 'nombre. Mettez la colonne au format Texte avant de saisir.');
      }

      const email = values['Email du responsable'] ?? '';
      if (email && !/^[^\s@,;]+@[^\s@,;]+\.[A-Za-z]{2,}$/.test(email)) {
        errors.push(`Email « ${email} » invalide`
          + (email.includes(',') ? ' : une virgule remplace le point.' : '.'));
      }

      const identity = `${normaliseHeader(values['Nom'])}|${normaliseHeader(values['Prénoms'])}`;
      let status: ImportRowStatus;
      if (errors.length > 0) {
        status = 'INVALID';
      } else if (seen.has(identity)) {
        status = 'DUPLICATE';
        warnings.push('Cette ligne est en double dans le fichier');
      } else if (existing.has(identity)) {
        status = 'DUPLICATE';
        warnings.push('Un élève de même nom existe déjà : la ligne sera ignorée');
      } else {
        status = warnings.length > 0 ? 'WARNING' : 'VALID';
      }
      seen.add(identity);

      rows.push({
        // +1 : la première ligne du fichier est l'en-tête, et les tableurs
        // numérotent à partir de 1. La ligne affichée est celle d'Excel.
        rowNumber: i + 1,
        status,
        values,
        errors,
        warnings,
        previewStudentNumber: status === 'VALID' || status === 'WARNING'
          ? `EDU-2026-${String(sequence++).padStart(6, '0')}`
          : undefined
      });
    }

    const preview = this.summarise(file.name, rows);
    this.pending = preview;
    return preview;
  }

  private summarise(fileName: string, rows: ImportRow[]): ImportPreview {
    const count = (status: ImportRowStatus) => rows.filter((r) => r.status === status).length;
    const valid = count('VALID');
    const warning = count('WARNING');
    return {
      batchId: `local-${Date.now()}`,
      fileName,
      totalRows: rows.length,
      validRows: valid,
      warningRows: warning,
      duplicateRows: count('DUPLICATE'),
      invalidRows: count('INVALID'),
      importable: valid + warning > 0,
      rows
    };
  }

  /** Le rapport ne compte que ce qui a réellement été importable. */
  private buildReport(): ImportPreview {
    const source = this.pending;
    if (!source) {
      return this.empty('', 'Aucun lot à confirmer.');
    }
    const kept = source.rows.filter(
      (r) => r.status === 'VALID' || r.status === 'WARNING');
    const report: ImportPreview = {
      ...source,
      validRows: kept.length,
      warningRows: 0,
      duplicateRows: source.duplicateRows,
      invalidRows: source.invalidRows,
      importable: false,
      rows: kept
    };
    this.pending = null;
    return report;
  }

  /** Consigne l'import confirmé, pour que l'historique dise vrai en démonstration. */
  private recordMockBatch(report: ImportPreview): void {
    if (!report.fileName) {
      return;
    }
    const now = new Date().toISOString();
    this.mockHistory.unshift({
      id: report.batchId || `local-${Date.now()}`,
      importType: 'STUDENT',
      importTypeLabel: 'Élèves',
      fileName: report.fileName,
      status: 'IMPORTED',
      statusLabel: 'Importé',
      totalRows: report.totalRows,
      validRows: report.validRows,
      invalidRows: report.invalidRows,
      duplicateRows: report.duplicateRows,
      importedRows: report.rows.filter((row) => row.errors.length === 0).length,
      uploadedByName: 'Vous',
      uploadedAt: now,
      confirmedByName: 'Vous',
      confirmedAt: now,
      refusedRows: report.rows.filter((row) => row.errors.length > 0)
    });
  }

  private unreadable(fileName: string, error: unknown): ImportPreview {
    const code = error instanceof SpreadsheetError ? error.code : 'UNREADABLE';
    const message = code === 'LEGACY_XLS'
      ? 'Le format .xls n\'est pas lisible. Enregistrez le fichier en .xlsx ou en .csv.'
      : 'Le fichier n\'a pas pu être lu. Utilisez le modèle proposé à l\'étape précédente.';
    return this.empty(fileName, message);
  }

  private empty(fileName: string, message: string): ImportPreview {
    return {
      batchId: '',
      fileName,
      totalRows: 0,
      validRows: 0,
      warningRows: 0,
      duplicateRows: 0,
      invalidRows: 1,
      importable: false,
      rows: [{
        rowNumber: 0,
        status: 'INVALID',
        values: {},
        errors: [message],
        warnings: []
      }]
    };
  }

  // ──────────────────────────────────────────────────────── outils

  private saveBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  /** En démonstration, un CSV suffit à montrer les colonnes attendues. */
  private downloadMockTemplate(): void {
    const example = ['KONE', 'Aya Marie', 'F', '14/05/2012', 'Abidjan', 'Ivoirienne',
      MOCK_CLASSROOMS[0]?.name ?? '6eme A', 'KONE Mariam', '+225 07 11 22 33',
      'mariam.kone@mail.ci', 'Mère', 'EPP Cocody'];
    const csv = `﻿${COLUMNS.join(';')}\n${example.join(';')}\n`;
    this.saveBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }),
      'modele-import-eleves.csv');
  }
}

/** Compare sans tenir compte de la casse, des accents ni des espaces. */
function normaliseHeader(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
