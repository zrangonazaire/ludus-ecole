import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, from, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import {
  ImportBatch, ImportPreview, ImportRow, ImportRowStatus
} from '@core/models/import.models';
import { FEE_DATA_SOURCE } from '@core/datasource/data-source';
import { LevelFees } from '@core/models/fee.models';
import {
  MOCK_ACADEMIC_YEAR, MOCK_CLASSROOMS, MOCK_RECENT_ENROLLMENTS, MOCK_STUDENTS
} from '@core/datasource/mock/mock-data';
import { SpreadsheetError, excelSerialToDate, readSpreadsheet } from '@core/utils/spreadsheet';

/** Colonnes du modèle, dans l'ordre où le serveur les produit. */
const COLUMNS = [
  'Nom', 'Prénoms', 'Sexe', 'Date de naissance', 'Lieu de naissance',
  'Nationalité', 'Classe', 'Nom du responsable', 'Téléphone du responsable',
  'Email du responsable', 'Lien de parenté', 'École précédente'
] as const;

const REQUIRED = ['Nom', 'Prénoms', 'Sexe', 'Date de naissance'] as const;

/** Default fallback level fees if a level has no schedule in mock mode yet. */
const DEFAULT_LEVEL_FEES: Record<string, { total: number; lines: number }> = {
  'l-6': { total: 600000, lines: 3 },
  'l-5': { total: 625000, lines: 3 },
  'l-4': { total: 650000, lines: 3 },
  'l-3': { total: 700000, lines: 3 }
};

/**
 * Import d'élèves par fichier.
 *
 * <p>Trois temps distincts : modèle, analyse, confirmation. La séparation est
 * volontaire — elle garantit qu'aucun fichier n'est écrit sans avoir été vu.</p>
 *
 * <p>Chaque élève affecté à une classe reçoit automatiquement les frais
 * rattachés au niveau de sa classe.</p>
 */
@Injectable({ providedIn: 'root' })
export class StudentImportService {
  private readonly http = inject(HttpClient);
  private readonly feeDataSource = inject(FEE_DATA_SOURCE);
  private readonly base = `${environment.apiBaseUrl}/imports/students`;
  private readonly historyBase = `${environment.apiBaseUrl}/imports/batches`;

  /** Le lot analysé, conservé le temps de la confirmation. */
  private pending: ImportPreview | null = null;

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

  analyse(file: File, defaultClassroomId?: string): Observable<ImportPreview> {
    if (environment.useMockData) {
      return from(this.analyseLocally(file, defaultClassroomId));
    }
    const form = new FormData();
    form.append('file', file);
    if (defaultClassroomId) {
      form.append('classroomId', defaultClassroomId);
    }
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

  private async analyseLocally(file: File, defaultClassroomId?: string): Promise<ImportPreview> {
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

    let levelFeesList: LevelFees[] = [];
    try {
      levelFeesList = await firstValueFrom(this.feeDataSource.levels());
    } catch {
      levelFeesList = [];
    }
    const feesByLevel = new Map(levelFeesList.map((lf) => [lf.levelId, lf]));

    const classes = new Map<string, typeof MOCK_CLASSROOMS[number]>();
    MOCK_CLASSROOMS.forEach((c) => {
      classes.set(normaliseHeader(c.name), c);
      classes.set(normaliseHeader(c.code), c);
      classes.set(normaliseClassAlias(c.name), c);
      classes.set(normaliseClassAlias(c.code), c);
    });

    const defaultClassroom = defaultClassroomId
      ? MOCK_CLASSROOMS.find((c) => c.id === defaultClassroomId)
      : undefined;

    const seen = new Set<string>();
    const existing = new Set(MOCK_STUDENTS.map(
      (s) => `${normaliseHeader(s.lastName)}|${normaliseHeader(s.firstName)}`));

    const rows: ImportRow[] = [];
    let sequence = 241 + MOCK_STUDENTS.length;

    for (let i = 1; i < sheet.length; i++) {
      const cells = sheet[i];
      const values: Record<string, string> = {};
      columnOf.forEach((index, label) => {
        values[label] = (cells[index] ?? '').trim();
      });

      if (i === 1
          && normaliseHeader(values['Nom'] ?? '') === 'kone'
          && normaliseHeader(values['Prénoms'] ?? '') === 'aya marie') {
        continue;
      }

      const errors: string[] = [];
      const warnings: string[] = [];

      REQUIRED.forEach((label) => {
        if (!values[label]) {
          errors.push(`« ${label} » est obligatoire`);
        }
      });

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
      const classroom = className
        ? (classes.get(normaliseHeader(className)) ?? classes.get(normaliseClassAlias(className)))
        : defaultClassroom;

      if (classroom && !className) {
        values['Classe'] = classroom.name;
      }

      let resolvedFeesAmount = 0;
      let resolvedFeeLinesCount = 0;

      if (className && !classroom) {
        const near = MOCK_CLASSROOMS
          .filter((c) => normaliseHeader(c.name).startsWith(normaliseHeader(className)))
          .map((c) => c.name);
        errors.push(near.length > 0
          ? `Classe « ${className} » introuvable. Vouliez-vous dire ${near.join(' ou ')} ?`
          : `Classe « ${className} » introuvable`);
      } else if (!classroom) {
        warnings.push('Aucune classe : choisissez une classe cible ou renseignez la colonne « Classe » pour associer les frais du niveau');
      } else {
        const levelFee = feesByLevel.get(classroom.levelId);
        if (levelFee && levelFee.mandatoryTotal > 0) {
          resolvedFeesAmount = levelFee.mandatoryTotal;
          resolvedFeeLinesCount = Math.max(1, levelFee.instalmentCount || levelFee.scheduleCount);
        } else {
          const fallback = DEFAULT_LEVEL_FEES[classroom.levelId] ?? { total: 600000, lines: 3 };
          resolvedFeesAmount = fallback.total;
          resolvedFeeLinesCount = fallback.lines;
        }
      }

      const phone = values['Téléphone du responsable'] ?? '';
      if (!phone) {
        warnings.push('Aucun téléphone de responsable');
      } else if (/^[-+]?\d+([.,]\d+)?e[-+]?\d+$/i.test(phone.replace(/\s/g, ''))) {
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
        rowNumber: i + 1,
        status,
        values,
        errors,
        warnings,
        previewStudentNumber: status === 'VALID' || status === 'WARNING'
          ? `EDU-2026-${String(sequence++).padStart(6, '0')}`
          : undefined,
        classroomName: classroom?.name,
        levelName: classroom?.levelName,
        feesAmount: classroom ? resolvedFeesAmount : undefined,
        feeLinesCount: classroom ? resolvedFeeLinesCount : undefined
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
    const importableRows = rows.filter((r) => r.status === 'VALID' || r.status === 'WARNING');
    const totalFeesAmount = importableRows.reduce((sum, r) => sum + (r.feesAmount ?? 0), 0);
    const totalFeeLinesCreated = importableRows.reduce((sum, r) => sum + (r.feeLinesCount ?? 0), 0);

    return {
      batchId: `local-${Date.now()}`,
      fileName,
      totalRows: rows.length,
      validRows: valid,
      warningRows: warning,
      duplicateRows: count('DUPLICATE'),
      invalidRows: count('INVALID'),
      importable: valid + warning > 0,
      rows,
      totalFeesAmount,
      totalFeeLinesCreated,
      currency: 'XOF'
    };
  }

  /** Crée les élèves, les inscrit dans leur classe et associe les frais de leur niveau en mode démo. */
  private buildReport(): ImportPreview {
    const source = this.pending;
    if (!source) {
      return this.empty('', 'Aucun lot à confirmer.');
    }
    const kept = source.rows.filter(
      (r) => r.status === 'VALID' || r.status === 'WARNING');

    const today = new Date().toISOString().slice(0, 10);
    kept.forEach((row, idx) => {
      const lastName = (row.values['Nom'] ?? '').trim();
      const firstName = (row.values['Prénoms'] ?? '').trim();
      const fullName = `${firstName} ${lastName}`.trim();
      const rawSex = normaliseHeader(row.values['Sexe'] ?? 'F');
      const gender = rawSex.startsWith('m') || rawSex.startsWith('g') ? 'MALE' : 'FEMALE';
      const classroom = MOCK_CLASSROOMS.find(
        (c) => normaliseHeader(c.name) === normaliseHeader(row.classroomName ?? row.values['Classe'] ?? '')
      );
      const studentId = `st-imp-${Date.now()}-${idx}`;
      const studentNumber = row.previewStudentNumber ?? `EDU-2026-${String(300 + idx).padStart(6, '0')}`;

      MOCK_STUDENTS.unshift({
        id: studentId,
        studentNumber,
        firstName,
        lastName,
        fullName,
        gender,
        birthDate: row.values['Date de naissance'] ?? '2013-01-01',
        status: classroom ? 'ACTIVE' : 'ADMITTED',
        classroomId: classroom?.id,
        classroomName: classroom?.name
      });

      if (classroom) {
        classroom.activeEnrollments += 1;
        classroom.availableSeats = Math.max(0, classroom.capacityMaximum - classroom.activeEnrollments);
        classroom.occupancyRate = classroom.capacityMaximum > 0
          ? Math.round((classroom.activeEnrollments * 100) / classroom.capacityMaximum)
          : 0;

        MOCK_RECENT_ENROLLMENTS.unshift({
          id: `enr-imp-${Date.now()}-${idx}`,
          enrollmentNumber: `INS-2026-${String(500 + idx).padStart(5, '0')}`,
          studentId,
          studentNumber,
          studentName: fullName,
          academicYearId: MOCK_ACADEMIC_YEAR.id,
          academicYearCode: MOCK_ACADEMIC_YEAR.code,
          classroomId: classroom.id,
          classroomName: classroom.name,
          levelId: classroom.levelId,
          levelName: classroom.levelName,
          enrollmentKind: 'NEW',
          status: 'ACTIVE',
          enrollmentDate: today,
          repeating: false,
          overCapacityOverride: false,
          feeLinesCreated: row.feeLinesCount ?? 3,
          totalFeesDue: row.feesAmount ?? 600000
        });
      }
    });

    const report: ImportPreview = {
      ...source,
      validRows: kept.length,
      warningRows: 0,
      duplicateRows: source.duplicateRows,
      invalidRows: source.invalidRows,
      importable: false,
      rows: kept,
      totalFeesAmount: kept.reduce((sum, r) => sum + (r.feesAmount ?? 0), 0),
      totalFeeLinesCreated: kept.reduce((sum, r) => sum + (r.feeLinesCount ?? 0), 0),
      currency: source.currency ?? 'XOF'
    };
    this.pending = null;
    return report;
  }

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

  private downloadMockTemplate(): void {
    const example = ['KONE', 'Aya Marie', 'F', '14/05/2012', 'Abidjan', 'Ivoirienne',
      MOCK_CLASSROOMS[0]?.name ?? '6eme A', 'KONE Mariam', '+225 07 11 22 33',
      'mariam.kone@mail.ci', 'Mère', 'EPP Cocody'];
    const csv = `\uFEFF${COLUMNS.join(';')}\n${example.join(';')}\n`;
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

function normaliseClassAlias(value: string): string {
  return normaliseHeader(value)
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^([3456])e\b/, '$1eme')
    .replace(/^2nde\b/, 'seconde')
    .replace(/^1ere\b|^1re\b/, 'premiere')
    .replace(/^tle\b/, 'terminale')
    .trim();
}
