import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { PageResponse } from '@core/models/common.models';
import {
  OFFICIAL_DOCUMENT_TEMPLATES, OfficialDocument, OfficialDocumentIssuePayload,
  OfficialDocumentLayout, OfficialDocumentQuery
} from '@core/models/official-document.models';
import { OfficialDocumentDataSource } from '../data-source';
import { MOCK_CLASSROOMS, MOCK_STUDENTS } from './mock-data';

const LATENCY = 220;
const DOCUMENTS_KEY = 'eduops.mock.official-documents.v1';
const LAYOUT_KEY = 'eduops.mock.official-document-layout.v1';

export const DEFAULT_OFFICIAL_DOCUMENT_LAYOUT: OfficialDocumentLayout = {
  schoolName: environment.schoolName,
  legalName: 'Établissement privé d’enseignement général',
  motto: 'Excellence • Discipline • Réussite',
  registrationNumber: 'Autorisation n° MEN-DELC/2026-0142',
  address: 'Cocody Angré, 8e tranche',
  city: 'Abidjan',
  country: "Côte d'Ivoire",
  phone: '+225 27 22 00 00 00',
  email: 'contact@horizon.edu.ci',
  website: 'www.horizon.edu.ci',
  headerLeft: "RÉPUBLIQUE DE CÔTE D'IVOIRE\nUnion • Discipline • Travail",
  headerRight: "MINISTÈRE DE L'ÉDUCATION NATIONALE\nET DE L'ALPHABÉTISATION",
  footerText: "Document officiel délivré par l'établissement. Toute altération le rend nul.",
  signatoryName: 'Mme Aminata Koné',
  signatoryTitle: "Cheffe d'établissement",
  accentColor: '#1f5fd6',
  documentNumberPattern: 'DOC-{year}-{seq:6}',
  showLogo: true,
  showMotto: true,
  showSignatureLine: true,
  showVerificationCode: true
};

/** Browser-persistent demo implementation of the official document registry. */
@Injectable()
export class MockOfficialDocumentDataSource implements OfficialDocumentDataSource {
  private documents = this.restoreDocuments();
  private currentLayout = this.restoreLayout();

  search(query: OfficialDocumentQuery): Observable<PageResponse<OfficialDocument>> {
    const needle = query.search?.trim().toLocaleLowerCase('fr') ?? '';
    const filtered = this.documents
      .filter((document) => !query.type || document.type === query.type)
      .filter((document) => !query.status || document.status === query.status)
      .filter((document) => !query.studentId || document.studentId === query.studentId)
      .filter((document) => !needle || [document.studentName, document.studentNumber,
        document.documentNumber, document.title]
        .some((value) => value.toLocaleLowerCase('fr').includes(needle)))
      .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));

    const page = query.page ?? 0;
    const size = query.size ?? 20;
    const start = page * size;
    const totalPages = Math.max(1, Math.ceil(filtered.length / size));
    return of({
      content: filtered.slice(start, start + size).map((item) => structuredClone(item)),
      page,
      size,
      totalElements: filtered.length,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1
    }).pipe(delay(LATENCY));
  }

  issue(payload: OfficialDocumentIssuePayload): Observable<OfficialDocument> {
    const document = this.buildDocument(payload, new Date().toISOString());
    if (!document) {
      return throwError(() => new Error('STUDENT_NOT_FOUND')).pipe(delay(LATENCY));
    }
    this.documents = [document, ...this.documents];
    this.persist(DOCUMENTS_KEY, this.documents);
    return of(structuredClone(document)).pipe(delay(LATENCY));
  }

  revoke(documentId: string, reason: string): Observable<OfficialDocument> {
    const index = this.documents.findIndex((document) => document.id === documentId);
    if (index < 0) {
      return throwError(() => new Error('DOCUMENT_NOT_FOUND')).pipe(delay(LATENCY));
    }
    const updated: OfficialDocument = {
      ...this.documents[index],
      status: 'REVOKED',
      revokedAt: new Date().toISOString(),
      revokeReason: reason.trim()
    };
    this.documents[index] = updated;
    this.persist(DOCUMENTS_KEY, this.documents);
    return of(structuredClone(updated)).pipe(delay(LATENCY));
  }

  layout(): Observable<OfficialDocumentLayout> {
    return of(structuredClone(this.currentLayout)).pipe(delay(LATENCY));
  }

  saveLayout(layout: OfficialDocumentLayout): Observable<OfficialDocumentLayout> {
    this.currentLayout = structuredClone(layout);
    this.persist(LAYOUT_KEY, this.currentLayout);
    return of(structuredClone(this.currentLayout)).pipe(delay(LATENCY));
  }

  private buildDocument(payload: OfficialDocumentIssuePayload,
                        issuedAt: string): OfficialDocument | null {
    const student = MOCK_STUDENTS.find((item) => item.id === payload.studentId);
    if (!student) {
      return null;
    }
    const classroom = MOCK_CLASSROOMS.find((item) => item.id === student.classroomId);
    const template = OFFICIAL_DOCUMENT_TEMPLATES.find((item) => item.type === payload.type);
    const next = this.documents.length + 1;
    const year = payload.issueDate.slice(0, 4) || String(new Date().getFullYear());
    return {
      id: crypto.randomUUID(),
      type: payload.type,
      typeLabel: template?.label ?? 'Document officiel',
      documentNumber: formatPattern(this.currentLayout.documentNumberPattern, year, next),
      verificationCode: verificationCode(),
      title: template?.label ?? 'Document officiel',
      status: 'ISSUED',
      issuedAt,
      validUntil: payload.validUntil,
      studentId: student.id,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      gender: student.gender,
      birthDate: student.birthDate,
      birthPlace: 'Abidjan',
      nationality: 'Ivoirienne',
      photoUrl: student.photoUrl,
      enrollmentId: `enrollment-${student.id}`,
      enrollmentNumber: `INS-${year}-${student.studentNumber.slice(-6)}`,
      classroomName: classroom?.name ?? student.classroomName,
      levelName: classroom?.levelName ?? student.levelName,
      academicYearId: classroom?.academicYearId ?? 'ay-2026-2027',
      academicYearCode: '2026-2027',
      metadata: {
        purpose: payload.purpose?.trim() || undefined,
        recipient: payload.recipient?.trim() || undefined,
        additionalMention: payload.additionalMention?.trim() || undefined,
        meetingDate: payload.meetingDate || undefined,
        meetingTime: payload.meetingTime || undefined,
        meetingPlace: payload.meetingPlace?.trim() || undefined
      },
      layout: structuredClone(this.currentLayout)
    };
  }

  private restoreLayout(): OfficialDocumentLayout {
    return this.restore<OfficialDocumentLayout>(LAYOUT_KEY) ??
      structuredClone(DEFAULT_OFFICIAL_DOCUMENT_LAYOUT);
  }

  private restoreDocuments(): OfficialDocument[] {
    return this.restore<OfficialDocument[]>(DOCUMENTS_KEY) ?? [];
  }

  private restore<T>(key: string): T | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch {
      return null;
    }
  }

  private persist(key: string, value: unknown): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The in-memory registry remains usable when storage is unavailable.
    }
  }
}

function formatPattern(pattern: string, year: string, sequence: number): string {
  return pattern
    .replaceAll('{year}', year)
    .replaceAll('{yy}', year.slice(-2))
    .replaceAll('{schoolCode}', 'HORIZON')
    .replace(/\{seq(?::(\d+))?}/g, (_match, width: string | undefined) =>
      String(sequence).padStart(Number(width ?? 6), '0'));
}

function verificationCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 12 }, (_, index) => {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    return index > 0 && index % 4 === 0 ? `-${letter}` : letter;
  }).join('');
}

