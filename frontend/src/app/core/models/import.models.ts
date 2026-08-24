/** Import d'élèves depuis un classeur Excel. */

export type ImportRowStatus = 'VALID' | 'WARNING' | 'DUPLICATE' | 'INVALID';

export interface ImportRow {
  rowNumber: number;
  status: ImportRowStatus;
  values: Record<string, string>;
  errors: string[];
  warnings: string[];
  previewStudentNumber?: string;
}

export interface ImportPreview {
  batchId: string;
  fileName: string;
  totalRows: number;
  validRows: number;
  warningRows: number;
  duplicateRows: number;
  invalidRows: number;
  importable: boolean;
  rows: ImportRow[];
}
