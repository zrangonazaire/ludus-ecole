import { createUuid } from "../../utils/uuid";
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { AccessProfileDataSource } from '../data-source';
import {
  AccessPermission, AccessProfile, AccessProfileOverview, AccessProfilePayload
} from '@core/models/access-profile.models';

const LATENCY = 220;

const PERMISSIONS: AccessPermission[] = [
  permission('DASHBOARD_VIEW', 'Consulter le tableau de bord', 'Pilotage'),
  permission('STUDENT_VIEW', 'Consulter les élèves', 'Élèves'),
  permission('STUDENT_CREATE', 'Créer des élèves', 'Élèves'),
  permission('STUDENT_UPDATE', 'Modifier les élèves', 'Élèves'),
  permission('ENROLLMENT_VIEW', 'Consulter les inscriptions', 'Inscriptions'),
  permission('ENROLLMENT_CREATE', 'Créer des inscriptions', 'Inscriptions'),
  permission('ENROLLMENT_VALIDATE', 'Valider les inscriptions', 'Inscriptions'),
  permission('TEACHER_VIEW', 'Consulter les enseignants', 'Personnel'),
  permission('TEACHER_MANAGE', 'Gérer les enseignants', 'Personnel'),
  permission('CLASS_VIEW', 'Consulter les classes', 'Pédagogie'),
  permission('CLASS_MANAGE', 'Gérer les classes', 'Pédagogie'),
  permission('TIMETABLE_VIEW', 'Consulter les emplois du temps', 'Pédagogie'),
  permission('TIMETABLE_MANAGE', 'Gérer les emplois du temps', 'Pédagogie'),
  permission('ATTENDANCE_VIEW', 'Consulter les présences', 'Pédagogie'),
  permission('ATTENDANCE_CREATE', 'Faire l’appel', 'Pédagogie'),
  permission('ASSESSMENT_VIEW', 'Consulter les évaluations', 'Notes et bulletins'),
  permission('ASSESSMENT_CREATE', 'Créer des évaluations', 'Notes et bulletins'),
  permission('GRADE_VIEW', 'Consulter les notes', 'Notes et bulletins'),
  permission('GRADE_CREATE', 'Saisir des notes', 'Notes et bulletins'),
  permission('GRADE_VALIDATE', 'Valider les notes', 'Notes et bulletins'),
  permission('REPORT_CARD_VIEW', 'Consulter les bulletins', 'Notes et bulletins'),
  permission('REPORT_CARD_GENERATE', 'Générer les bulletins', 'Notes et bulletins'),
  permission('FINANCE_VIEW', 'Consulter les finances', 'Finance'),
  permission('FINANCE_MANAGE', 'Gérer les frais et échéanciers', 'Finance'),
  permission('PAYMENT_VIEW', 'Consulter les paiements', 'Finance'),
  permission('PAYMENT_CREATE', 'Encaisser des paiements', 'Finance'),
  permission('DOCUMENT_VIEW', 'Consulter les documents', 'Documents'),
  permission('DOCUMENT_GENERATE', 'Générer des documents officiels', 'Documents'),
  permission('REPORT_VIEW', 'Consulter les rapports', 'Pilotage'),
  permission('REPORT_EXPORT', 'Exporter les rapports', 'Pilotage'),
  permission('USER_MANAGE', 'Gérer les comptes utilisateurs', 'Sécurité'),
  permission('ROLE_MANAGE', 'Gérer les profils et permissions', 'Sécurité'),
  permission('PORTAL_TEACHER', 'Accéder au portail enseignant', 'Portails'),
  permission('PORTAL_PARENT', 'Accéder au portail parent', 'Portails'),
  permission('PORTAL_STUDENT', 'Accéder au portail élève', 'Portails')
];

const ALL = PERMISSIONS.map((item) => item.code);

let profiles: AccessProfile[] = [
  profile('role-admin', 'SCHOOL_ADMIN', 'Administrateur',
    'Accès fonctionnel complet à l’établissement.', ALL, 2),
  profile('role-director', 'DIRECTOR', 'Direction',
    'Pilotage de l’établissement et décisions.', without('USER_MANAGE', 'ROLE_MANAGE'), 3),
  profile('role-registrar', 'REGISTRAR', 'Secrétariat scolarité',
    'Admissions, inscriptions et dossiers élèves.', [
      'DASHBOARD_VIEW', 'STUDENT_VIEW', 'STUDENT_CREATE', 'STUDENT_UPDATE',
      'ENROLLMENT_VIEW', 'ENROLLMENT_CREATE', 'ENROLLMENT_VALIDATE',
      'CLASS_VIEW', 'DOCUMENT_VIEW', 'DOCUMENT_GENERATE', 'REPORT_VIEW'
    ], 4),
  profile('role-teacher', 'TEACHER', 'Enseignant',
    'Ses classes : présences, évaluations et notes.', [
      'PORTAL_TEACHER', 'DASHBOARD_VIEW', 'STUDENT_VIEW', 'CLASS_VIEW',
      'TIMETABLE_VIEW', 'ATTENDANCE_VIEW', 'ATTENDANCE_CREATE',
      'ASSESSMENT_VIEW', 'ASSESSMENT_CREATE', 'GRADE_VIEW', 'GRADE_CREATE',
      'REPORT_CARD_VIEW'
    ], 18),
  profile('role-accountant', 'ACCOUNTANT', 'Comptable',
    'Frais, paiements et suivi financier.', [
      'DASHBOARD_VIEW', 'STUDENT_VIEW', 'FINANCE_VIEW', 'FINANCE_MANAGE',
      'PAYMENT_VIEW', 'REPORT_VIEW', 'REPORT_EXPORT', 'DOCUMENT_VIEW'
    ], 2),
  profile('role-parent', 'PARENT', 'Parent',
    'Portail parent, ses enfants uniquement.', ['PORTAL_PARENT'], 326),
  profile('role-student', 'STUDENT', 'Élève',
    'Portail élève, son dossier uniquement.', ['PORTAL_STUDENT'], 842)
];

@Injectable()
export class MockAccessProfileDataSource implements AccessProfileDataSource {
  overview(): Observable<AccessProfileOverview> {
    return of({
      profiles: profiles.map(copyProfile),
      permissions: PERMISSIONS.map((item) => ({ ...item }))
    }).pipe(delay(LATENCY));
  }

  create(payload: AccessProfilePayload): Observable<AccessProfile> {
    const created: AccessProfile = {
      id: createUuid(),
      code: normaliseCode(payload.code),
      label: payload.label.trim(),
      description: payload.description?.trim() || undefined,
      systemProfile: false,
      editable: true,
      permissionCodes: [...new Set(payload.permissionCodes)],
      permissionCount: new Set(payload.permissionCodes).size,
      userCount: 0
    };
    profiles = [...profiles, created];
    return of(copyProfile(created)).pipe(delay(320));
  }

  update(id: string, payload: AccessProfilePayload): Observable<AccessProfile> {
    const current = profiles.find((item) => item.id === id);
    if (!current || !current.editable) {
      throw new Error('Profil non modifiable');
    }
    const updated: AccessProfile = {
      ...current,
      code: normaliseCode(payload.code),
      label: payload.label.trim(),
      description: payload.description?.trim() || undefined,
      permissionCodes: [...new Set(payload.permissionCodes)],
      permissionCount: new Set(payload.permissionCodes).size
    };
    profiles = profiles.map((item) => item.id === id ? updated : item);
    return of(copyProfile(updated)).pipe(delay(320));
  }
}

function permission(code: string, label: string, module: string): AccessPermission {
  return { id: `permission-${code.toLowerCase()}`, code, label, module };
}

function profile(id: string, code: string, label: string, description: string,
                 permissionCodes: string[], userCount: number): AccessProfile {
  return {
    id, code, label, description, systemProfile: true, editable: false,
    permissionCodes, permissionCount: permissionCodes.length, userCount
  };
}

function without(...codes: string[]): string[] {
  const excluded = new Set(codes);
  return ALL.filter((code) => !excluded.has(code));
}

function copyProfile(item: AccessProfile): AccessProfile {
  return { ...item, permissionCodes: [...item.permissionCodes] };
}

function normaliseCode(value: string): string {
  return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}
