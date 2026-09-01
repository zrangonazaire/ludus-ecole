/**
 * Writing an .xlsx workbook, without a dependency.
 *
 * <p>The mirror of {@code spreadsheet.ts}, which reads them. A workbook is a ZIP
 * of XML files, so it is built by hand rather than by pulling in several hundred
 * kilobytes of library to produce a grade sheet of thirty rows.</p>
 *
 * <p>Entries are stored uncompressed. Deflate would need a compressor; a grade
 * sheet weighs a few kilobytes either way, and « stored » is a documented, fully
 * supported ZIP method that Excel and LibreOffice both open without complaint.</p>
 */

/** One column of the sheet, with how Excel should treat it. */
export interface SheetColumn {
  header: string;
  /** Largeur en caractères, pour que rien ne soit tronqué à l'ouverture. */
  width: number;
  /**
   * Texte force le format « Texte ».
   *
   * <p>Indispensable pour les matricules : « EDU-2026-000012 » passe, mais un
   * identifiant purement numérique serait converti en nombre et perdrait ses
   * zéros de tête, ce qui casse le rapprochement à la relecture.</p>
   */
  kind: 'text' | 'number';
}

export interface SheetSpec {
  sheetName: string;
  columns: SheetColumn[];
  rows: Array<Array<string | number | null | undefined>>;
  /** Lignes de contexte placées au-dessus de l'en-tête (barème, classe, consignes). */
  preamble?: string[];
}

/* ------------------------------------------------------------------- XML */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    // Excel refuse d'ouvrir un classeur contenant un caractère de contrôle.
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

/** Converts a zero-based column index into its A1 letters. */
export function columnLetter(index: number): string {
  let letters = '';
  let value = index + 1;
  while (value > 0) {
    const remainder = (value - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    value = Math.floor((value - 1) / 26);
  }
  return letters;
}

/**
 * Builds the worksheet XML.
 *
 * <p>Text cells are written as inline strings rather than through a shared
 * string table. It costs a few bytes and removes a whole class of mistake: an
 * index pointing at the wrong entry silently swaps two pupils' names.</p>
 */
function sheetXml(spec: SheetSpec): string {
  const rows: string[] = [];
  let rowIndex = 1;

  const push = (cells: string[]) => {
    rows.push(`<row r="${rowIndex}">${cells.join('')}</row>`);
    rowIndex++;
  };

  (spec.preamble ?? []).forEach((line) => {
    push([`<c r="A${rowIndex}" t="inlineStr" s="2"><is><t>${escapeXml(line)}</t></is></c>`]);
  });

  const headerRow = rowIndex;
  push(spec.columns.map((column, index) =>
    `<c r="${columnLetter(index)}${rowIndex}" t="inlineStr" s="1">`
    + `<is><t>${escapeXml(column.header)}</t></is></c>`));

  spec.rows.forEach((row) => {
    const cells = spec.columns.map((column, index) => {
      const reference = `${columnLetter(index)}${rowIndex}`;
      const value = row[index];
      if (value === null || value === undefined || value === '') {
        return '';
      }
      if (column.kind === 'number' && typeof value === 'number' && Number.isFinite(value)) {
        return `<c r="${reference}"><v>${value}</v></c>`;
      }
      return `<c r="${reference}" t="inlineStr" s="3">`
        + `<is><t>${escapeXml(String(value))}</t></is></c>`;
    });
    push(cells);
  });

  const cols = spec.columns.map((column, index) =>
    `<col min="${index + 1}" max="${index + 1}" width="${column.width}" customWidth="1"`
    + `${column.kind === 'text' ? ' style="3"' : ''}/>`).join('');

  const lastColumn = columnLetter(spec.columns.length - 1);
  const lastRow = rowIndex - 1;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
    + `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">`
    + `<dimension ref="A1:${lastColumn}${lastRow}"/>`
    // Les en-têtes restent visibles quand on descend dans une classe de quarante.
    + `<sheetViews><sheetView workbookViewId="0">`
    + `<pane ySplit="${headerRow}" topLeftCell="A${headerRow + 1}" activePane="bottomLeft" state="frozen"/>`
    + `</sheetView></sheetViews>`
    + `<sheetFormatPr defaultRowHeight="15"/>`
    + `<cols>${cols}</cols>`
    + `<sheetData>${rows.join('')}</sheetData>`
    + `</worksheet>`;
}

/**
 * Four styles: default, header, preamble, forced text.
 *
 * <p>Style 3 carries the « @ » number format, which is Excel's way of saying
 * « leave this alone ». Without it a mark of 08 comes back as 8 and a phone-like
 * identifier turns into scientific notation.</p>
 */
const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
  + `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">`
  + `<numFmts count="1"><numFmt numFmtId="164" formatCode="@"/></numFmts>`
  + `<fonts count="3">`
  + `<font><sz val="11"/><name val="Calibri"/></font>`
  + `<font><b/><sz val="11"/><name val="Calibri"/></font>`
  + `<font><i/><sz val="10"/><color rgb="FF6B7280"/><name val="Calibri"/></font>`
  + `</fonts>`
  + `<fills count="3">`
  + `<fill><patternFill patternType="none"/></fill>`
  + `<fill><patternFill patternType="gray125"/></fill>`
  + `<fill><patternFill patternType="solid"><fgColor rgb="FFEAF1FE"/>`
  + `<bgColor indexed="64"/></patternFill></fill>`
  + `</fills>`
  + `<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>`
  + `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>`
  + `<cellXfs count="4">`
  + `<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>`
  + `<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>`
  + `<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>`
  + `<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>`
  + `</cellXfs>`
  + `<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>`
  + `</styleSheet>`;

/* ------------------------------------------------------------------- ZIP */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let value = i;
    for (let bit = 0; bit < 8; bit++) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[i] = value >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

interface ZipFile {
  name: string;
  data: Uint8Array;
}

/**
 * Assembles the archive: local headers, then the central directory.
 *
 * <p>The two must agree on every size and offset. A reader that trusts the
 * central directory — ours does, and so does Excel — opens a corrupt file
 * without a word if they disagree, and shows nothing.</p>
 */
function zip(files: ZipFile[]): Blob {
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  const encoder = new TextEncoder();

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.data);
    const size = file.data.length;

    const local = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);           // version needed
    localView.setUint16(6, 0x0800, true);       // UTF-8 file names
    localView.setUint16(8, 0, true);            // stored
    localView.setUint16(10, 0, true);           // time
    localView.setUint16(12, 0, true);           // date
    localView.setUint32(14, crc, true);
    localView.setUint32(18, size, true);
    localView.setUint32(22, size, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);           // extra
    local.set(nameBytes, 30);

    chunks.push(local, file.data);

    const entry = new Uint8Array(46 + nameBytes.length);
    const entryView = new DataView(entry.buffer);
    entryView.setUint32(0, 0x02014b50, true);
    entryView.setUint16(4, 20, true);           // version made by
    entryView.setUint16(6, 20, true);           // version needed
    entryView.setUint16(8, 0x0800, true);
    entryView.setUint16(10, 0, true);
    entryView.setUint16(12, 0, true);
    entryView.setUint16(14, 0, true);
    entryView.setUint32(16, crc, true);
    entryView.setUint32(20, size, true);
    entryView.setUint32(24, size, true);
    entryView.setUint16(28, nameBytes.length, true);
    entryView.setUint16(30, 0, true);           // extra
    entryView.setUint16(32, 0, true);           // comment
    entryView.setUint16(34, 0, true);           // disk
    entryView.setUint16(36, 0, true);           // internal attrs
    entryView.setUint32(38, 0, true);           // external attrs
    entryView.setUint32(42, offset, true);
    entry.set(nameBytes, 46);
    central.push(entry);

    offset += local.length + size;
  });

  const centralSize = central.reduce((sum, entry) => sum + entry.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);

  return new Blob([...chunks, ...central, end] as BlobPart[],
    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

/* ---------------------------------------------------------------- workbook */

/** Builds a single-sheet .xlsx workbook. */
export function buildXlsx(spec: SheetSpec): Blob {
  const encoder = new TextEncoder();
  const name = escapeXml(spec.sheetName.slice(0, 31));

  const files: ZipFile[] = [
    {
      name: '[Content_Types].xml',
      data: encoder.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
        + `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">`
        + `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>`
        + `<Default Extension="xml" ContentType="application/xml"/>`
        + `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>`
        + `<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
        + `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>`
        + `</Types>`)
    },
    {
      name: '_rels/.rels',
      data: encoder.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
        + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`
        + `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>`
        + `</Relationships>`)
    },
    {
      name: 'xl/workbook.xml',
      data: encoder.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
        + `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" `
        + `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">`
        + `<sheets><sheet name="${name}" sheetId="1" r:id="rId1"/></sheets>`
        + `</workbook>`)
    },
    {
      name: 'xl/_rels/workbook.xml.rels',
      data: encoder.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
        + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`
        + `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>`
        + `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>`
        + `</Relationships>`)
    },
    { name: 'xl/styles.xml', data: encoder.encode(STYLES_XML) },
    { name: 'xl/worksheets/sheet1.xml', data: encoder.encode(sheetXml(spec)) }
  ];

  return zip(files);
}

/** Triggers the download in the browser. */
export function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/** Turns a title into a filename that survives every operating system. */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}
