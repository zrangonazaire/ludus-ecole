import { createUuid } from "../../utils/uuid";
import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { AdmissionDataSource } from '../data-source';
import {
  Admission, AdmissionCreatePayload, AdmissionDocument, AdmissionOptions,
  AdmissionQuery, AdmissionStatus, AdmissionStatusPayload
} from '@core/models/admission.models';
import { PageResponse } from '@core/models/common.models';

const LATENCY = 220;

const OPTIONS: AdmissionOptions = {
  defaultAcademicYearId: 'year-2026',
  academicYears: [{ id: 'year-2026', code: '2026-2027', label: 'Année 2026-2027' }],
  campuses: [{ id: 'campus-main', code: 'PRINCIPAL', label: 'Campus principal' }],
  levels: [
    { id: 'level-6', code: '6E', label: 'Sixième' },
    { id: 'level-5', code: '5E', label: 'Cinquième' },
    { id: 'level-4', code: '4E', label: 'Quatrième' }
  ],
  classrooms: [
    { id: 'class-6a', code: '6A', label: '6e A', levelId: 'level-6', campusId: 'campus-main' },
    { id: 'class-6b', code: '6B', label: '6e B', levelId: 'level-6', campusId: 'campus-main' },
    { id: 'class-5a', code: '5A', label: '5e A', levelId: 'level-5', campusId: 'campus-main' }
  ]
};

let applications: Admission[] = [
  admission('adm-1', 'ADM-2026-000014', 'Awa Koné', 'level-6', 'Sixième',
    'UNDER_REVIEW', false, 'Mariam Koné', '0701020304', 'class-6a', '6e A'),
  admission('adm-2', 'ADM-2026-000013', 'Yann Kouadio', 'level-5', 'Cinquième',
    'ACCEPTED', true, 'Jean Kouadio', '0506070809', 'class-5a', '5e A'),
  admission('adm-3', 'ADM-2026-000012', 'Fatou Traoré', 'level-6', 'Sixième',
    'SUBMITTED', false, 'Aïcha Traoré', '0102030405'),
  admission('adm-4', 'ADM-2026-000011', 'Éric Yao', 'level-4', 'Quatrième',
    'WAITLISTED', true, 'Clarisse Yao', '0708091011')
];

@Injectable()
export class MockAdmissionDataSource implements AdmissionDataSource {
  search(query: AdmissionQuery): Observable<PageResponse<Admission>> {
    const needle = query.search?.trim().toLocaleLowerCase('fr');
    const filtered = applications.filter((item) =>
      (!query.academicYearId || item.academicYearId === query.academicYearId)
      && (!query.status || item.status === query.status)
      && (!query.levelId || item.requestedLevelId === query.levelId)
      && (!needle || `${item.fullName} ${item.applicationNumber}`
        .toLocaleLowerCase('fr').includes(needle)));
    const page = query.page ?? 0;
    const size = query.size ?? 100;
    return of({
      content: filtered.slice(page * size, (page + 1) * size).map(copyAdmission),
      page, size, totalElements: filtered.length,
      totalPages: Math.max(1, Math.ceil(filtered.length / size)),
      first: page === 0, last: (page + 1) * size >= filtered.length
    }).pipe(delay(LATENCY));
  }

  options(): Observable<AdmissionOptions> {
    return of(structuredClone(OPTIONS)).pipe(delay(120));
  }

  get(id: string): Observable<Admission> {
    const item = applications.find((candidate) => candidate.id === id);
    return item ? of(copyAdmission(item)).pipe(delay(LATENCY))
      : throwError(() => new Error('ADMISSION_NOT_FOUND'));
  }

  create(payload: AdmissionCreatePayload): Observable<Admission> {
    const level = OPTIONS.levels.find((item) => item.id === payload.requestedLevelId);
    const campus = OPTIONS.campuses.find((item) => item.id === payload.campusId);
    const classroom = OPTIONS.classrooms.find((item) => item.id === payload.reservedClassroomId);
    const created: Admission = {
      id: createUuid(),
      applicationNumber: `ADM-2026-${String(applications.length + 15).padStart(6, '0')}`,
      academicYearId: payload.academicYearId,
      academicYearLabel: OPTIONS.academicYears[0]?.label ?? 'Année scolaire',
      campusId: payload.campusId,
      campusName: campus?.label ?? 'Campus',
      requestedLevelId: payload.requestedLevelId,
      requestedLevelName: level?.label ?? 'Niveau',
      reservedClassroomId: classroom?.id,
      reservedClassroomName: classroom?.label,
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
      fullName: `${payload.firstName} ${payload.lastName}`,
      gender: payload.gender,
      birthDate: payload.birthDate,
      birthPlace: payload.birthPlace,
      nationality: payload.nationality,
      previousSchool: payload.previousSchool,
      guardianFirstName: payload.guardianFirstName,
      guardianLastName: payload.guardianLastName,
      guardianFullName: `${payload.guardianFirstName ?? ''} ${payload.guardianLastName ?? ''}`.trim(),
      guardianPhone: payload.guardianPhone,
      guardianEmail: payload.guardianEmail,
      status: 'DRAFT', documentsComplete: false, seatReserved: false,
      notes: payload.notes, documents: documents(false), createdAt: new Date().toISOString()
    };
    applications = [created, ...applications];
    return of(copyAdmission(created)).pipe(delay(300));
  }

  changeStatus(id: string, payload: AdmissionStatusPayload): Observable<Admission> {
    const index = applications.findIndex((item) => item.id === id);
    if (index < 0) return throwError(() => new Error('ADMISSION_NOT_FOUND'));
    const current = applications[index];
    if (payload.status === 'ACCEPTED' && !current.documentsComplete) {
      return throwError(() => new Error('ADMISSION_DOCUMENTS_INCOMPLETE'));
    }
    const updated: Admission = {
      ...current,
      status: payload.status,
      reservedClassroomId: payload.reservedClassroomId ?? current.reservedClassroomId,
      reservedClassroomName: OPTIONS.classrooms
        .find((item) => item.id === payload.reservedClassroomId)?.label
        ?? current.reservedClassroomName,
      entranceExamScore: payload.entranceExamScore ?? current.entranceExamScore,
      decisionReason: payload.reason,
      submittedAt: payload.status === 'SUBMITTED' ? new Date().toISOString() : current.submittedAt,
      reviewedAt: payload.status === 'UNDER_REVIEW' ? new Date().toISOString() : current.reviewedAt,
      decisionAt: ['ACCEPTED', 'WAITLISTED', 'REJECTED'].includes(payload.status)
        ? new Date().toISOString() : current.decisionAt,
      seatReserved: ['UNDER_REVIEW', 'ACCEPTED', 'WAITLISTED'].includes(payload.status)
        && !!(payload.reservedClassroomId ?? current.reservedClassroomId)
    };
    applications = applications.map((item, position) => position === index ? updated : item);
    return of(copyAdmission(updated)).pipe(delay(260));
  }

  updateDocument(admissionId: string, documentId: string,
                 received: boolean): Observable<Admission> {
    const current = applications.find((item) => item.id === admissionId);
    if (!current) return throwError(() => new Error('ADMISSION_NOT_FOUND'));
    const updatedDocuments = current.documents.map((item) =>
      item.id === documentId ? { ...item, received } : item);
    const updated = {
      ...current,
      documents: updatedDocuments,
      documentsComplete: updatedDocuments.filter((item) => item.mandatory)
        .every((item) => item.received)
    };
    applications = applications.map((item) => item.id === admissionId ? updated : item);
    return of(copyAdmission(updated)).pipe(delay(180));
  }
}

function admission(id: string, number: string, name: string, levelId: string,
                   levelName: string, status: AdmissionStatus, complete: boolean,
                   guardian: string, phone: string, classroomId?: string,
                   classroomName?: string): Admission {
  const [firstName, ...last] = name.split(' ');
  const [guardianFirstName, ...guardianLast] = guardian.split(' ');
  return {
    id, applicationNumber: number, academicYearId: 'year-2026',
    academicYearLabel: 'Année 2026-2027', campusId: 'campus-main',
    campusName: 'Campus principal', requestedLevelId: levelId,
    requestedLevelName: levelName, reservedClassroomId: classroomId,
    reservedClassroomName: classroomName, firstName, lastName: last.join(' '),
    fullName: name, gender: 'FEMALE', birthDate: '2014-05-10',
    guardianFirstName, guardianLastName: guardianLast.join(' '),
    guardianFullName: guardian, guardianPhone: phone, status,
    documentsComplete: complete,
    seatReserved: ['UNDER_REVIEW', 'ACCEPTED', 'WAITLISTED'].includes(status) && !!classroomId,
    documents: documents(complete), createdAt: new Date().toISOString()
  };
}

function documents(complete: boolean): AdmissionDocument[] {
  return [
    { id: createUuid(), code: 'ACTE_NAISSANCE', label: 'Extrait d’acte de naissance',
      mandatory: true, received: complete },
    { id: createUuid(), code: 'BULLETINS', label: 'Derniers bulletins scolaires',
      mandatory: true, received: complete },
    { id: createUuid(), code: 'PHOTO', label: 'Photo d’identité',
      mandatory: false, received: complete }
  ];
}

function copyAdmission(value: Admission): Admission {
  return { ...value, documents: value.documents.map((item) => ({ ...item })) };
}
