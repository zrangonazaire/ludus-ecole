/**
 * Lecture d'un tableur déposé par l'utilisateur, sans dépendance.
 *
 * <p>Deux formats : le CSV, et le XLSX que produit le serveur. Un XLSX est une
 * archive ZIP contenant du XML — on l'ouvre donc à la main plutôt que d'ajouter
 * une bibliothèque de plusieurs centaines de kilo-octets pour lire une liste
 * d'élèves.</p>
 */

const decoder = new TextDecoder('utf-8');

/** Lit le fichier et renvoie ses lignes, cellule par cellule. */
export async function readSpreadsheet(file: File): Promise<string[][]> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.xlsx') || name.endsWith('.xlsm')) {
    return readXlsx(await file.arrayBuffer());
  }
  if (name.endsWith('.xls')) {
    // Le format binaire d'avant 2007 n'est pas lisible sans bibliothèque.
    throw new SpreadsheetError('LEGACY_XLS');
  }
  return readDelimited(decodeText(await file.arrayBuffer()));
}

/**
 * Décode le texte en devinant son encodage.
 *
 * <p>Excel francophone enregistre le CSV en Windows-1252, pas en UTF-8 : un
 * fichier repassé par « Enregistrer sous » revient avec un octet unique par
 * accent. Décodé en UTF-8, « Prénoms » devient « Pr�noms » et la colonne n'est
 * plus reconnue. On tente donc l'UTF-8 en mode strict, et on retombe sur
 * Windows-1252 dès qu'il refuse.</p>
 */
export function decodeText(buffer: ArrayBuffer): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder('windows-1252').decode(buffer);
  }
}

/** Erreur de lecture, avec un code que l'écran sait traduire. */
export class SpreadsheetError extends Error {
  constructor(readonly code: 'LEGACY_XLS' | 'ZIP_INVALID' | 'SHEET_MISSING' | 'UNREADABLE') {
    super(code);
    this.name = 'SpreadsheetError';
  }
}

// ─────────────────────────────────────────────────────────── CSV / TSV

/**
 * Découpe un texte délimité.
 *
 * <p>Le séparateur est deviné sur la première ligne : Excel francophone
 * exporte en point-virgule, la plupart des autres outils en virgule.</p>
 */
export function readDelimited(text: string): string[][] {
  const clean = text.replace(/^﻿/, '');
  const firstLine = clean.split(/\r?\n/, 1)[0] ?? '';
  const separator = pickSeparator(firstLine);

  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];

    if (quoted) {
      if (ch === '"') {
        if (clean[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"' && field === '') {
      quoted = true;
    } else if (ch === separator) {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch !== '\r') {
      field += ch;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

function pickSeparator(line: string): string {
  const counts = [';', ',', '\t'].map((sep) => ({
    sep,
    n: line.split(sep).length - 1
  }));
  counts.sort((a, b) => b.n - a.n);
  return counts[0].n > 0 ? counts[0].sep : ';';
}

// ─────────────────────────────────────────────────────────────── XLSX

interface ZipEntry {
  method: number;
  data: Uint8Array;
}

/** Lit les entrées d'une archive ZIP à partir de son répertoire central. */
async function unzip(buffer: ArrayBuffer): Promise<Map<string, ZipEntry>> {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // End of central directory, cherché depuis la fin : sa position dépend
  // du commentaire d'archive, qui peut faire jusqu'à 64 Ko.
  let eocd = -1;
  for (let i = bytes.length - 22; i >= 0 && i > bytes.length - 65558; i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) {
    throw new SpreadsheetError('ZIP_INVALID');
  }

  const count = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const entries = new Map<string, ZipEntry>();

  for (let i = 0; i < count; i++) {
    if (view.getUint32(offset, true) !== 0x02014b50) {
      throw new SpreadsheetError('ZIP_INVALID');
    }
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.subarray(offset + 46, offset + 46 + nameLength));

    // Les longueurs de l'en-tête local diffèrent de celles du répertoire
    // central : il faut les relire sur place pour trouver le début des données.
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const start = localOffset + 30 + localNameLength + localExtraLength;

    entries.set(name, { method, data: bytes.subarray(start, start + compressedSize) });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

async function inflate(entry: ZipEntry): Promise<string> {
  if (entry.method === 0) {
    return decoder.decode(entry.data);
  }
  if (entry.method !== 8) {
    throw new SpreadsheetError('ZIP_INVALID');
  }
  const stream = new Blob([entry.data as BlobPart]).stream()
    .pipeThrough(new DecompressionStream('deflate-raw'));
  return decoder.decode(await new Response(stream).arrayBuffer());
}

function unescapeXml(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&');
}

/** Concatène les fragments de texte d'une cellule ou d'une chaîne partagée. */
function textOf(xml: string): string {
  const parts: string[] = [];
  const pattern = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>|<t\s*\/>/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml)) !== null) {
    parts.push(unescapeXml(match[1] ?? ''));
  }
  return parts.join('');
}

/** Convertit une référence A1 en indice de colonne. */
function columnIndex(reference: string): number {
  const letters = reference.replace(/\d+/g, '');
  let index = 0;
  for (const letter of letters) {
    index = index * 26 + (letter.charCodeAt(0) - 64);
  }
  return index - 1;
}

export async function readXlsx(buffer: ArrayBuffer): Promise<string[][]> {
  const entries = await unzip(buffer);

  // Les chaînes sont soit partagées dans un fichier à part — ce que produit
  // Apache POI — soit inscrites dans la cellule. Les deux existent en pratique.
  let shared: string[] = [];
  const sharedEntry = entries.get('xl/sharedStrings.xml');
  if (sharedEntry) {
    const xml = await inflate(sharedEntry);
    shared = [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => textOf(m[1]));
  }

  const sheetEntry = entries.get('xl/worksheets/sheet1.xml');
  if (!sheetEntry) {
    throw new SpreadsheetError('SHEET_MISSING');
  }
  const sheet = await inflate(sheetEntry);

  const rows: string[][] = [];
  for (const rowMatch of sheet.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells: string[] = [];
    const cellPattern = /<c([^>]*)>([\s\S]*?)<\/c>|<c([^>]*)\/>/g;
    for (const cellMatch of rowMatch[1].matchAll(cellPattern)) {
      const attributes = cellMatch[1] ?? cellMatch[3] ?? '';
      const body = cellMatch[2] ?? '';
      const reference = /r="([A-Z]+\d+)"/.exec(attributes)?.[1];
      const type = /t="([^"]+)"/.exec(attributes)?.[1] ?? 'n';
      const index = reference ? columnIndex(reference) : cells.length;

      let value: string;
      if (type === 's') {
        const position = Number(/<v>([\s\S]*?)<\/v>/.exec(body)?.[1] ?? -1);
        value = shared[position] ?? '';
      } else if (type === 'inlineStr') {
        value = textOf(body);
      } else {
        value = unescapeXml(/<v>([\s\S]*?)<\/v>/.exec(body)?.[1] ?? '');
      }

      // Une cellule vide au milieu d'une ligne n'est pas écrite : on comble.
      while (cells.length < index) {
        cells.push('');
      }
      cells[index] = value;
    }
    rows.push(cells);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

// ──────────────────────────────────────────────────────────────── dates

/**
 * Convertit un numéro de série Excel en date lisible.
 *
 * <p>Excel range les dates en nombre de jours depuis le 30 décembre 1899 — un
 * décalage qui vient d'un bug historique de 1900, conservé par compatibilité.
 * Une date saisie à la main dans Excel arrive donc sous la forme « 44695 » et
 * non « 14/05/2022 ».</p>
 */
export function excelSerialToDate(value: string): string | null {
  const serial = Number(value);
  if (!Number.isFinite(serial) || serial < 20000 || serial > 60000) {
    return null;
  }
  const epoch = Date.UTC(1899, 11, 30);
  const date = new Date(epoch + Math.floor(serial) * 86400000);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getUTCFullYear()}`;
}
