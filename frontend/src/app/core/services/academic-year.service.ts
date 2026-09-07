import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import {
  AcademicYear, AcademicYearCreatePayload, Term, TermType
} from '@core/models/academic-year.models';

/**
 * Les années scolaires de l'établissement.
 *
 * <p>Le découpage en périodes est calculé ici aussi, à l'identique du serveur.
 * Ce n'est pas une duplication gratuite : l'écran montre les dates avant
 * d'enregistrer, et un aperçu qui différerait d'un jour de ce que le serveur
 * créera ferait mentir la seule chose que l'utilisateur peut vérifier.</p>
 */
@Injectable({ providedIn: 'root' })
export class AcademicYearService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/school/academic-years`;

  /** L'état de démonstration, alimenté par ce que la personne crée. */
  private mockYears: AcademicYear[] = [];

  list(): Observable<AcademicYear[]> {
    if (environment.useMockData) {
      return of([...this.mockYears]).pipe(delay(200));
    }
    return this.http.get<AcademicYear[]>(this.base);
  }

  create(payload: AcademicYearCreatePayload): Observable<AcademicYear> {
    if (environment.useMockData) {
      const created = this.buildMockYear(payload);
      this.mockYears = [created, ...this.mockYears];
      return of(created).pipe(delay(400));
    }
    return this.http.post<AcademicYear>(this.base, payload);
  }

  activate(yearId: string): Observable<AcademicYear> {
    if (environment.useMockData) {
      // Le simulacre applique la même règle que le serveur : l'ancienne année
      // active passe en clôture, elle n'est pas fermée.
      this.mockYears = this.mockYears.map((year) => year.active
        ? { ...year, active: false, status: 'CLOSING', statusLabel: 'Clôture en cours' }
        : year);
      this.mockYears = this.mockYears.map((year) => year.id === yearId
        ? { ...year, active: true, status: 'ACTIVE', statusLabel: 'Année de travail' }
        : year);
      const found = this.mockYears.find((year) => year.id === yearId);
      return of(found ?? this.mockYears[0]).pipe(delay(300));
    }
    return this.http.post<AcademicYear>(`${this.base}/${yearId}/activate`, {});
  }

  // ──────────────────────────────────────────── aperçu du découpage

  /**
   * Les périodes que produirait ce découpage.
   *
   * <p>Même règle que le serveur : le reste de la division va aux premières
   * périodes, et la dernière finit exactement le dernier jour de l'année. Un
   * jour orphelin entre les deux laisserait des absences et des notes qu'aucune
   * période ne pourrait porter.</p>
   */
  previewTerms(startDate: string, endDate: string,
               termType: TermType, count: number): Term[] {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    if (!start || !end || end <= start || count < 1) {
      return [];
    }
    const totalDays = daysBetween(start, end) + 1;
    if (totalDays < count) {
      return [];
    }
    const base = Math.floor(totalDays / count);
    const remainder = totalDays % count;

    const terms: Term[] = [];
    let cursor = start;
    for (let index = 1; index <= count; index++) {
      const length = base + (index <= remainder ? 1 : 0);
      const last = index === count;
      const termEnd = last ? end : addDays(cursor, length - 1);
      terms.push({
        id: `preview-${index}`,
        name: termName(termType, index),
        code: termCode(termType, index),
        termType,
        termTypeLabel: typeLabel(termType),
        sequence: index,
        startDate: toIso(cursor),
        endDate: toIso(termEnd),
        status: 'PLANNED',
        statusLabel: 'Prévue',
        weight: '1.000'
      });
      cursor = addDays(termEnd, 1);
    }
    return terms;
  }

  private buildMockYear(payload: AcademicYearCreatePayload): AcademicYear {
    return {
      id: `local-${Date.now()}`,
      code: payload.code,
      label: payload.label?.trim() || payload.code,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: 'DRAFT',
      statusLabel: 'Brouillon',
      active: false,
      editable: true,
      classroomCount: 0,
      enrollmentCount: 0,
      terms: this.previewTerms(payload.startDate, payload.endDate,
        payload.termType, payload.termCount)
    };
  }
}

// ───────────────────────────────────────────────────────── dates

/** Les dates circulent en AAAA-MM-JJ ; on reste en UTC pour éviter les décalages. */
function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) {
    return null;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86400000);
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86400000);
}

function termName(type: TermType, index: number): string {
  const ordinal = index === 1 ? '1er' : `${index}e`;
  switch (type) {
    case 'TRIMESTER': return `${ordinal} trimestre`;
    case 'SEMESTER': return `${ordinal} semestre`;
    case 'TERM': return `${ordinal} période`;
    default: return `Période ${index}`;
  }
}

function termCode(type: TermType, index: number): string {
  const prefix = { TRIMESTER: 'T', SEMESTER: 'S', TERM: 'P', CUSTOM: 'C' }[type];
  return `${prefix}${index}`;
}

function typeLabel(type: TermType): string {
  return ({
    TRIMESTER: 'Trimestre', SEMESTER: 'Semestre',
    TERM: 'Période', CUSTOM: 'Découpage libre'
  })[type];
}
