import { Injectable } from '@angular/core';
import {
  GradeEntryPayload, GradeImportPreview, GradeImportRow, GradeImportRowStatus, GradeSheet
} from '@core/models/assessment.models';
import { SpreadsheetError, readSpreadsheet } from '@core/utils/spreadsheet';
import { SheetSpec, buildXlsx, saveBlob, slugify } from '@core/utils/spreadsheet-writer';

/** Colonnes de la feuille, dans l'ordre où elle est produite. */
const COLUMNS = {
  number: 'Matricule',
  name: 'Élève',
  score: 'Note',
  absent: 'Absent',
  comment: 'Observation'
} as const;

/** Ce qui vaut « oui » dans la colonne Absent, quelle que soit la main. */
const YES = ['oui', 'o', 'x', '1', 'vrai', 'true', 'absent', 'abs'];
const NO = ['', 'non', 'n', '0', 'faux', 'false', 'present', 'présent'];

/**
 * Exporting and re-importing the marks of one assessment.
 *
 * <p>Teachers correct on paper, in a staff room, often without a connection.
 * The workbook goes with them and comes back filled; this is the only part of
 * the chain that has to work offline.</p>
 *
 * <p>The import never writes anything on its own. It reads the file, matches it
 * against the class, and describes what <em>would</em> change — line by line,
 * with the current mark beside the new one. Someone about to overwrite thirty
 * marks needs to see the thirty, not a green tick saying « fichier valide ».</p>
 *
 * <p>Matching is on the matricule, never on the row order. A teacher who sorts
 * the sheet by mark before handing it back is doing something reasonable, and
 * an import that trusted position would silently give every pupil someone
 * else's grade.</p>
 */
@Injectable({ providedIn: 'root' })
export class GradeSheetFileService {

  // --------------------------------------------------------------- export

  /** Builds and downloads the workbook for one assessment. */
  export(sheet: GradeSheet): void {
    const assessment = sheet.assessment;
    const spec: SheetSpec = {
      sheetName: assessment.classroomName || 'Notes',
      preamble: [
        `${assessment.title} — ${assessment.classroomName} — ${assessment.subjectName}`,
        `Barème : sur ${assessment.maxScore} · coefficient ${assessment.coefficient}`
          + ` · ${assessment.assessmentTypeLabel} du ${assessment.assessmentDate}`,
        'Ne remplissez que les colonnes Note, Absent et Observation.',
        'Ne modifiez ni les matricules, ni les intitulés de colonnes. '
          + "L'ordre des lignes, lui, peut changer : le rapprochement se fait sur le "
          + 'matricule.',
        'Une case Note vide veut dire « pas encore corrigé ». Un zéro se saisit.',
        ''
      ],
      columns: [
        { header: COLUMNS.number, width: 20, kind: 'text' },
        { header: COLUMNS.name, width: 30, kind: 'text' },
        { header: COLUMNS.score, width: 10, kind: 'number' },
        { header: COLUMNS.absent, width: 10, kind: 'text' },
        { header: COLUMNS.comment, width: 40, kind: 'text' }
      ],
      rows: sheet.rows.map((row) => [
        row.studentNumber,
        row.studentName,
        row.absent || row.exempted ? null : row.score ?? null,
        row.absent ? 'Oui' : '',
        row.comment ?? ''
      ])
    };

    const name = `notes-${slugify(assessment.classroomName)}`
      + `-${slugify(assessment.subjectName)}-${assessment.assessmentDate}.xlsx`;
    saveBlob(buildXlsx(spec), name);
  }

  // --------------------------------------------------------------- import

  /**
   * Reads the returned file and describes what it would change.
   *
   * <p>Nothing is written here. The caller shows the result and asks.</p>
   */
  async analyse(file: File, sheet: GradeSheet): Promise<GradeImportPreview> {
    let grid: string[][];
    try {
      grid = await readSpreadsheet(file);
    } catch (error) {
      return this.unreadable(file.name, error);
    }
    if (grid.length === 0) {
      return this.rejected(file.name, 'Le fichier ne contient aucune ligne.');
    }

    // L'en-tête n'est pas en première ligne : le classeur exporté commence par
    // un rappel du barème et des consignes.
    const headerIndex = grid.findIndex((row) =>
      row.some((cell) => normalise(cell) === normalise(COLUMNS.number)));
    if (headerIndex < 0) {
      return this.rejected(file.name,
        'La colonne « Matricule » est introuvable. Utilisez le fichier exporté depuis '
        + 'ce devoir plutôt qu\'un tableau reconstitué à la main.');
    }

    const header = grid[headerIndex].map(normalise);
    const columnOf = new Map<string, number>();
    Object.values(COLUMNS).forEach((label) => {
      const index = header.indexOf(normalise(label));
      if (index >= 0) {
        columnOf.set(label, index);
      }
    });
    if (!columnOf.has(COLUMNS.score) && !columnOf.has(COLUMNS.absent)) {
      return this.rejected(file.name,
        'Ni la colonne « Note » ni la colonne « Absent » n\'ont été trouvées : '
        + "il n'y a rien à importer.");
    }

    const byNumber = new Map(sheet.rows.map((row) => [normalise(row.studentNumber), row]));
    const byName = new Map(sheet.rows.map((row) => [normalise(row.studentName), row]));
    const maxScore = sheet.assessment.maxScore;
    const seen = new Set<string>();
    const rows: GradeImportRow[] = [];

    for (let i = headerIndex + 1; i < grid.length; i++) {
      const cells = grid[i];
      const read = (label: string) => {
        const index = columnOf.get(label);
        return index === undefined ? '' : (cells[index] ?? '').trim();
      };

      const numberCell = read(COLUMNS.number);
      const nameCell = read(COLUMNS.name);
      if (!numberCell && !nameCell) {
        continue;
      }

      const errors: string[] = [];
      const warnings: string[] = [];
      // +1 : les tableurs numérotent à partir de 1, la ligne affichée est celle
      // qu'on voit dans Excel.
      const rowNumber = i + 1;

      const current = byNumber.get(normalise(numberCell))
        ?? (numberCell ? undefined : byName.get(normalise(nameCell)));

      if (!current) {
        rows.push({
          rowNumber,
          studentNumber: numberCell,
          studentName: nameCell || '—',
          currentAbsent: false,
          newAbsent: false,
          status: 'UNKNOWN',
          errors: [numberCell
            ? `Le matricule « ${numberCell} » n'appartient à aucun élève de cette classe.`
            : "Ni matricule ni nom reconnu : la ligne ne peut être rapprochée d'aucun élève."],
          warnings: []
        });
        continue;
      }

      const identity = normalise(current.studentNumber);
      if (seen.has(identity)) {
        rows.push({
          rowNumber,
          studentId: current.studentId,
          studentNumber: current.studentNumber,
          studentName: current.studentName,
          currentScore: current.score,
          currentAbsent: current.absent,
          newAbsent: false,
          status: 'DUPLICATE',
          errors: ['Ce matricule apparaît déjà plus haut dans le fichier.'],
          warnings: []
        });
        continue;
      }
      seen.add(identity);

      const absent = this.readAbsent(read(COLUMNS.absent), errors);
      const scoreCell = read(COLUMNS.score);
      let score = this.readScore(scoreCell, maxScore, errors);

      if (absent && score !== undefined) {
        // Les deux ne peuvent pas être vrais. L'absence gagne, et on le dit :
        // une note silencieusement effacée serait pire qu'un refus.
        warnings.push(`La note ${scoreCell} est ignorée : l'élève est marqué absent.`);
        score = undefined;
      }

      const comment = read(COLUMNS.comment) || undefined;
      let status: GradeImportRowStatus;

      if (errors.length > 0) {
        status = 'INVALID';
      } else if (current.requiresJustifiedCorrection) {
        status = 'LOCKED';
        errors.push('Cette note est déjà validée. Elle ne se corrige que ligne par '
          + 'ligne, avec un motif écrit.');
      } else if (score === current.score && absent === current.absent
          && (comment ?? '') === (current.comment ?? '')) {
        status = 'UNCHANGED';
      } else {
        status = 'CHANGED';
      }

      rows.push({
        rowNumber,
        studentId: current.studentId,
        studentNumber: current.studentNumber,
        studentName: current.studentName,
        currentScore: current.score,
        currentAbsent: current.absent,
        newScore: score,
        newAbsent: absent,
        comment,
        status,
        errors,
        warnings
      });
    }

    const duplicated = new Set(rows
      .filter((row) => row.status === 'DUPLICATE')
      .map((row) => normalise(row.studentNumber)));
    rows.forEach((row) => {
      if (row.status !== 'DUPLICATE' && duplicated.has(normalise(row.studentNumber))) {
        row.status = 'DUPLICATE';
        row.errors.push('Ce matricule apparaît plusieurs fois dans le fichier. '
          + 'Appliquer la première ligne et refuser la seconde reviendrait à tirer '
          + 'au sort : aucune des deux n\'est appliquée.');
      }
    });

    const count = (status: GradeImportRowStatus) =>
      rows.filter((row) => row.status === status).length;
    const changed = count('CHANGED');

    return {
      fileName: file.name,
      totalRows: rows.length,
      changedRows: changed,
      unchangedRows: count('UNCHANGED'),
      invalidRows: count('INVALID') + count('DUPLICATE'),
      unknownRows: count('UNKNOWN'),
      lockedRows: count('LOCKED'),
      // Un élève de la classe absent du fichier garde sa note : ce n'est pas une
      // erreur, mais il faut le dire avant d'appliquer.
      missingStudents: sheet.rows.filter(
        (row) => !seen.has(normalise(row.studentNumber))).length,
      importable: changed > 0,
      rows
    };
  }

  /**
   * Turns the accepted lines into the payload to send.
   *
   * <p>Untouched pupils travel with their current mark rather than being left
   * out: the server saves a whole sheet, and a partial payload would read as
   * « these ones have no mark ».</p>
   */
  toEntries(preview: GradeImportPreview, sheet: GradeSheet): GradeEntryPayload[] {
    const changes = new Map(preview.rows
      .filter((row) => row.status === 'CHANGED' && row.studentId)
      .map((row) => [row.studentId as string, row]));

    return sheet.rows.map((row) => {
      const change = changes.get(row.studentId);
      if (!change) {
        return {
          studentId: row.studentId,
          score: row.score,
          absent: row.absent,
          exempted: row.exempted,
          comment: row.comment
        };
      }
      return {
        studentId: row.studentId,
        score: change.newScore,
        absent: change.newAbsent,
        // Une dispense est une décision administrative : un fichier de notes
        // ne la donne ni ne l'enlève.
        exempted: row.exempted,
        comment: change.comment ?? row.comment
      };
    });
  }

  // ------------------------------------------------------------- internals

  private readScore(raw: string, maxScore: number, errors: string[]): number | undefined {
    if (raw === '') {
      return undefined;
    }
    // La virgule décimale est la norme francophone ; Excel la produit tel quel
    // dans un CSV enregistré en local.
    const value = Number(raw.replace(',', '.').replace(/\s/g, ''));
    if (!Number.isFinite(value)) {
      errors.push(`« ${raw} » n'est pas une note lisible.`);
      return undefined;
    }
    if (value < 0 || value > maxScore) {
      errors.push(`La note ${raw} sort du barème (0 à ${maxScore}).`);
      return undefined;
    }
    return value;
  }

  private readAbsent(raw: string, errors: string[]): boolean {
    const value = normalise(raw);
    if (YES.includes(value)) {
      return true;
    }
    if (NO.includes(value)) {
      return false;
    }
    errors.push(`« ${raw} » n'est pas compris dans la colonne Absent. `
      + 'Écrivez « Oui », ou laissez la case vide.');
    return false;
  }

  private unreadable(fileName: string, error: unknown): GradeImportPreview {
    const code = error instanceof SpreadsheetError ? error.code : 'UNREADABLE';
    return this.rejected(fileName, code === 'LEGACY_XLS'
      ? "Le format .xls n'est pas lisible. Enregistrez le fichier en .xlsx ou en .csv."
      : "Le fichier n'a pas pu être lu. Réexportez la feuille depuis ce devoir.");
  }

  private rejected(fileName: string, message: string): GradeImportPreview {
    return {
      fileName,
      totalRows: 0,
      changedRows: 0,
      unchangedRows: 0,
      invalidRows: 1,
      unknownRows: 0,
      lockedRows: 0,
      missingStudents: 0,
      importable: false,
      rows: [{
        rowNumber: 0,
        studentNumber: '',
        studentName: '—',
        currentAbsent: false,
        newAbsent: false,
        status: 'INVALID',
        errors: [message],
        warnings: []
      }]
    };
  }
}

/** Compare sans tenir compte de la casse, des accents ni des espaces. */
function normalise(value: string): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
