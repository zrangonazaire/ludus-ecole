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

  /**
   * Renseigné quand ce fichier exact a déjà été importé.
   *
   * Le serveur compare l'empreinte du contenu, pas le nom : redéposer une
   * liste corrigée ne déclenche rien, redéposer la même liste si.
   */
  alreadyImportedAt?: string;
  alreadyImportedRows?: number;
}

export type ImportBatchStatus =
  | 'UPLOADED' | 'PARSED' | 'VALIDATED' | 'PREVIEWED'
  | 'CONFIRMED' | 'IMPORTED' | 'REJECTED';

/** Un import passé, tel que l'historique le montre. */
export interface ImportBatch {
  id: string;
  importType: string;
  importTypeLabel: string;
  fileName: string;
  status: ImportBatchStatus;
  statusLabel: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  importedRows: number;
  uploadedByName?: string;
  uploadedAt: string;
  confirmedByName?: string;
  confirmedAt?: string;
  refusedRows: ImportRow[];
}
