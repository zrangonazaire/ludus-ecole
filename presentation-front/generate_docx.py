# -*- coding: utf-8 -*-
"""Génère Presentation-EduOps-Front.docx depuis les fichiers Markdown du dossier."""
import re
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.shared import Pt, RGBColor, Inches

BASE = Path(r"c:\PROJET\LUDUS-ECOLE\presentation-front")
OUT = BASE / "Presentation-EduOps-Front.docx"

FILES = [
    "README.md",
    "01-ecrans-access-et-authentification.md",
    "02-ecrans-administration.md",
    "03-portail-enseignant.md",
    "04-portail-parent.md",
    "05-portail-eleve.md",
    "06-composants-partages-et-conventions.md",
]

CODE_FONT = "Consolas"
BRAND = RGBColor(0x1F, 0x4E, 0x79)


def add_runs(paragraph, text):
    """Parse **bold** and `code` inline markers into styled runs."""
    pattern = re.compile(r"(\*\*.+?\*\*|`.+?`)")
    for part in pattern.split(text):
        if not part:
            continue
        if part.startswith("**") and part.endswith("**") and len(part) > 4:
            run = paragraph.add_run(part[2:-2])
            run.bold = True
        elif part.startswith("`") and part.endswith("`") and len(part) > 2:
            run = paragraph.add_run(part[1:-1])
            run.font.name = CODE_FONT
            run.font.size = Pt(10)
        else:
            paragraph.add_run(part)


def heading(doc, text, level):
    h = doc.add_heading(level=level)
    clean = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
    clean = re.sub(r"`(.+?)`", r"\1", clean)
    run = h.add_run(clean)
    if level == 1:
        run.font.color.rgb = BRAND
    return h


def is_separator_row(row):
    cells = [c.strip() for c in row.split("|")[1:-1]]
    if not cells:
        return False
    return all(re.fullmatch(r":?-{2,}:?", c) for c in cells)


def parse_docx(doc, text):
    lines = text.splitlines()
    buffer = []      # lignes d'un paragraphe simple en cours
    list_ctx = None  # ("bullet"|"number", level)

    def flush_buffer():
        if buffer:
            para = doc.add_paragraph()
            for ln in buffer:
                if ln != buffer[0]:
                    para.add_run("\n")
                add_runs(para, ln)
            buffer.clear()

    i = 0
    while i < len(lines):
        line = lines[i]

        # --- Tableau ---
        if line.lstrip().startswith("|"):
            flush_buffer()
            list_ctx = None
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                rows.append(lines[i])
                i += 1
            header = [c.strip() for c in rows[0].split("|")[1:-1]]
            data = [r for r in rows[1:] if not is_separator_row(r)]
            ncols = len(header)
            table = doc.add_table(rows=1 + len(data), cols=ncols)
            table.style = "Light Grid Accent 1"
            for j, cell in enumerate(header):
                p = table.cell(0, j).paragraphs[0]
                add_runs(p, cell)
                for r in p.runs:
                    r.bold = True
            for r_idx, row in enumerate(data):
                cells = [c.strip() for c in row.split("|")[1:-1]]
                for c_idx, cell in enumerate(cells):
                    if c_idx < ncols:
                        add_runs(table.cell(r_idx + 1, c_idx).paragraphs[0], cell)
            doc.add_paragraph()
            continue

        # --- Règle horizontale ---
        if re.fullmatch(r"\s*---+\s*", line):
            flush_buffer()
            list_ctx = None
            i += 1
            continue

        # --- Titre ---
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            flush_buffer()
            list_ctx = None
            heading(doc, m.group(2), len(m.group(1)))
            i += 1
            continue

        # --- Citation ---
        if line.lstrip().startswith(">"):
            flush_buffer()
            list_ctx = None
            para = doc.add_paragraph()
            para.paragraph_format.left_indent = Inches(0.35)
            para.paragraph_format.right_indent = Inches(0.35)
            run = para.add_run(line.lstrip()[1:].lstrip())
            run.italic = True
            run.font.color.rgb = RGBColor(0x40, 0x40, 0x40)
            i += 1
            continue

        # --- Liste (puces) ---
        m = re.match(r"^(\s*)[-*]\s+(.*)$", line)
        if m:
            flush_buffer()
            level = min(len(m.group(1)) // 2, 1)
            para = doc.add_paragraph(style="List Bullet")
            if level == 1:
                para.paragraph_format.left_indent = Inches(0.5)
            add_runs(para, m.group(2))
            list_ctx = "bullet"
            i += 1
            continue

        # --- Liste (numérotée) ---
        m = re.match(r"^(\s*)(\d+)[.)]\s+(.*)$", line)
        if m:
            flush_buffer()
            level = min(len(m.group(1)) // 2, 1)
            para = doc.add_paragraph(style="List Number")
            if level == 1:
                para.paragraph_format.left_indent = Inches(0.5)
            add_runs(para, m.group(3))
            list_ctx = "number"
            i += 1
            continue

        # --- Ligne vide ---
        if not line.strip():
            flush_buffer()
            list_ctx = None
            i += 1
            continue

        # --- Texte simple : suite du paragraphe courant ou d'un élément de liste ---
        stripped = line.strip()
        if list_ctx:
            para = doc.paragraphs[-1]
            if para.text:
                para.add_run("\n")
            add_runs(para, stripped)
            i += 1
            continue

        buffer.append(stripped)
        i += 1

    flush_buffer()


def build():
    doc = Document()

    # Page de garde
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    tr = title.add_run("EduOps")
    tr.bold = True
    tr.font.size = Pt(40)
    tr.font.color.rgb = BRAND

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sr = sub.add_run("Dossier de présentation de l'application")
    sr.font.size = Pt(20)

    sub2 = doc.add_paragraph()
    sub2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sr2 = sub2.add_run("Interface front (tous les écrans)")
    sr2.font.size = Pt(14)

    doc.add_paragraph()

    meta = doc.add_paragraph()
    meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    mr = meta.add_run("Généré depuis le dossier « presentation-front » — 7 documents")
    mr.italic = True

    doc.add_page_break()

    first = True
    for f in FILES:
        path = BASE / f
        if not path.exists():
            continue
        content = path.read_text(encoding="utf-8")
        if not first:
            doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
        parse_docx(doc, content)
        first = False

    doc.save(OUT)
    print("OK ->", OUT)


if __name__ == "__main__":
    build()
