import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PageQuery, PageResponse } from '../models/common.models';
import {
  ClassroomBulkCreatePayload, ClassroomCreatePayload, ClassroomUpdatePayload, LevelCapacity
} from '../models/classroom.models';
import {
  PaletteEntry, SlotUpsertPayload, TimetableConflict, TimetableGrid, TimetableSlot
} from '../models/timetable.models';
import {
  CurriculumApplyPayload, CurriculumSubjectPayload, LevelCurriculum,
  SubjectItem, SubjectUpsertPayload
} from '../models/curriculum.models';
import {
  FeeApplyPayload, FeeSchedulePayload, FeeType, FeeTypeUpsertPayload, LevelFees
} from '../models/fee.models';
import {
  Absence, AbsenceDigest, AbsenceQuery, AttendanceDay, JustifyPayload
} from '../models/attendance.models';
import {
  AssessmentBoard, AssessmentItem, AssessmentQuery, AssessmentStatus,
  AssessmentUpsertPayload, GradeCorrectionPayload, GradeEntryPayload, GradeSheet
} from '../models/assessment.models';
import {
  ReportCardBatch, ReportCardGeneratePayload, ReportCardQuery, ReportCardRemarkPayload
} from '../models/report-card.models';
import {
  OptionChoice, OptionChoiceAssignPayload, OptionChoiceQuery, OptionChoiceStatus,
  OptionOfferingsSavePayload, OptionOverview, OptionUpsertPayload
} from '../models/option.models';
import {
  ClassChange, ClassChangePayload, Departure, DepartureDocumentsPayload,
  DepartureRecordPayload, TransferBoard
} from '../models/transfer.models';
import {
  ExaminationPayload, ExaminationResultPayload, HealthBoard, HealthCondition,
  HealthConditionPayload, HealthRecord, HealthRecordPayload, InfirmaryVisit,
  InfirmaryVisitPayload, MedicalExamination, Vaccination, VaccinationPayload
} from '../models/health.models';
import {
  OfficialDocument, OfficialDocumentIssuePayload, OfficialDocumentLayout,
  OfficialDocumentQuery
} from '../models/official-document.models';
import {
  FamilyRequest, FamilyRequestBoard, FamilyRequestCreatePayload,
  FamilyRequestQuery, FamilyRequestUpdatePayload
} from '../models/family-request.models';
import { OutstandingBoard, OutstandingQuery } from '../models/outstanding.models';
import {
  AcademicYear, Assessment, AttendanceSheet, Classroom, DashboardData, Enrollment,
  EnrollmentCheckResult, FinancialSummary, Grade, GlobalSearchResult, LessonSlot, Payment,
  ReportCard, StudentDetail, StudentSummary, Subject, Teacher, Term
} from '../models/domain.models';
import { StudentDashboard } from '../models/student-portal.models';
import {
  AccessProfile, AccessProfileOverview, AccessProfilePayload
} from '../models/access-profile.models';
import {
  Admission, AdmissionCreatePayload, AdmissionOptions, AdmissionQuery, AdmissionStatusPayload
} from '../models/admission.models';
import { Guardian, GuardianQuery } from '../models/guardian.models';
import {
  Council, CouncilCreatePayload, CouncilDecisionPayload, CouncilParticipantPayload,
  CouncilQuery, CouncilStudentDecision, CouncilSummary, CouncilUpdatePayload
} from '../models/council.models';

/**
 * The contract every screen depends on.
 *
 * Components never inject HttpClient (section 79). They inject these tokens,
 * which resolve to either the mock implementation or the API implementation
 * depending on `environment.useMockData` - swapping one for the other requires
 * no component change (section 78).
 */

export interface StudentDataSource {
  search(query: PageQuery & { status?: string; classroomId?: string }): Observable<PageResponse<StudentSummary>>;
  getById(id: string): Observable<StudentDetail>;
  getEnrollments(studentId: string): Observable<Enrollment[]>;
  getFinancialSummary(studentId: string): Observable<FinancialSummary>;
  getReportCards(studentId: string): Observable<ReportCard[]>;
}

/** Data resolved from the authenticated pupil; no student id comes from the client. */
export interface StudentPortalDataSource {
  dashboard(): Observable<StudentDashboard>;
}

export interface EnrollmentDataSource {
  search(query: PageQuery & { classroomId?: string; status?: string }): Observable<PageResponse<Enrollment>>;
  check(studentId: string, classroomId: string, academicYearId?: string): Observable<EnrollmentCheckResult>;
  create(payload: unknown): Observable<Enrollment>;
  validate(id: string): Observable<Enrollment>;
}

export interface ClassroomDataSource {
  list(academicYearId?: string): Observable<Classroom[]>;
  search(query: PageQuery & { levelId?: string }): Observable<PageResponse<Classroom>>;
  getById(id: string): Observable<Classroom>;
  getStudents(classroomId: string): Observable<StudentSummary[]>;

  /** Remplissage de chaque niveau, avec la proposition de classe suivante. */
  levelCapacities(academicYearId?: string): Observable<LevelCapacity[]>;
  create(payload: ClassroomCreatePayload): Observable<Classroom>;
  createMany(payload: ClassroomBulkCreatePayload): Observable<Classroom[]>;
  update(id: string, payload: ClassroomUpdatePayload): Observable<Classroom>;
  activate(id: string): Observable<Classroom>;
  close(id: string, reason?: string): Observable<Classroom>;
}

export interface TeacherDataSource {
  create(payload: import('../models/teacher.models').TeacherCreatePayload): Observable<Teacher>;
  search(query: PageQuery): Observable<PageResponse<Teacher>>;
  getById(id: string): Observable<Teacher>;
  myClasses(): Observable<Classroom[]>;
}

export interface AttendanceDataSource {
  /** Toutes les classes actives d'une journée, appelées ou non. */
  day(date: string): Observable<AttendanceDay>;
  /**
   * Les cours de cette classe ce jour-là, lus dans l'emploi du temps.
   *
   * Liste vide au primaire, où un maître tient sa classe toute la journée :
   * l'écran propose alors l'appel journalier, sans friction ajoutée.
   */
  lessons(classroomId: string, date: string): Observable<LessonSlot[]>;
  openSheet(classroomId: string, date: string, subjectId?: string): Observable<AttendanceSheet>;
  submitSheet(sheet: AttendanceSheet, idempotencyKey: string): Observable<AttendanceSheet>;

  /** Absences et retards d'une période, avec les compteurs de toute la période. */
  absences(query: AbsenceQuery): Observable<AbsenceDigest>;
  justify(attendanceId: string, payload: JustifyPayload): Observable<Absence>;
  /** Inscrit la relance sur la ligne, pour ne pas appeler deux fois. */
  remind(attendanceId: string): Observable<Absence>;
}

export interface GradeDataSource {
  /** Les devoirs d'une période, avec l'avancement de chaque correction. */
  board(query: AssessmentQuery): Observable<AssessmentBoard>;
  createAssessment(payload: AssessmentUpsertPayload): Observable<AssessmentItem>;
  updateAssessment(id: string, payload: AssessmentUpsertPayload): Observable<AssessmentItem>;
  /** Fait avancer le devoir dans son cycle de vie. */
  changeStatus(id: string, target: AssessmentStatus): Observable<AssessmentItem>;

  gradeSheet(assessmentId: string): Observable<GradeSheet>;
  /** Enregistre en brouillon : enregistrer n'est pas soumettre. */
  saveGrades(assessmentId: string, entries: GradeEntryPayload[]): Observable<GradeSheet>;
  submitGrades(assessmentId: string): Observable<GradeSheet>;
  validateGrades(assessmentId: string): Observable<GradeSheet>;
  publishGrades(assessmentId: string): Observable<GradeSheet>;
  /** Correction d'une note déjà validée : motif écrit obligatoire. */
  correctGrade(gradeId: string, payload: GradeCorrectionPayload): Observable<GradeSheet>;
}

export interface FinanceDataSource {
  searchPayments(query: PageQuery): Observable<PageResponse<Payment>>;
  recordPayment(payload: unknown): Observable<Payment>;
  getStudentSummary(studentId: string): Observable<FinancialSummary>;
  outstanding(query: OutstandingQuery): Observable<OutstandingBoard>;
}

export interface DashboardDataSource {
  load(academicYearId?: string, campusId?: string): Observable<DashboardData>;
}

export interface TimetableDataSource {
  classroomGrid(classroomId: string): Observable<TimetableGrid>;
  teacherGrid(teacherId: string): Observable<TimetableGrid>;
  roomGrid(roomId: string): Observable<TimetableGrid>;
  palette(classroomId: string): Observable<PaletteEntry[]>;
  /** Vérifie un placement sans rien écrire : utilisé pendant le survol. */
  check(payload: SlotUpsertPayload, excludeSlotId?: string): Observable<TimetableConflict[]>;
  createSlot(payload: SlotUpsertPayload): Observable<TimetableSlot>;
  updateSlot(slotId: string, payload: SlotUpsertPayload): Observable<TimetableSlot>;
  deleteSlot(slotId: string): Observable<void>;
  publish(classroomId: string): Observable<TimetableGrid>;
}

export interface CurriculumDataSource {
  /** Catalogue des matières de l'établissement. */
  listSubjects(includeArchived?: boolean): Observable<SubjectItem[]>;
  createSubject(payload: SubjectUpsertPayload): Observable<SubjectItem>;
  updateSubject(id: string, payload: SubjectUpsertPayload): Observable<SubjectItem>;
  archiveSubject(id: string): Observable<SubjectItem>;
  restoreSubject(id: string): Observable<SubjectItem>;

  /** Programme de chaque niveau, y compris les niveaux encore vides. */
  levels(): Observable<LevelCurriculum[]>;
  upsertLevelSubject(levelId: string,
                     payload: CurriculumSubjectPayload): Observable<LevelCurriculum>;
  removeLevelSubject(levelId: string, subjectId: string): Observable<LevelCurriculum>;
  apply(payload: CurriculumApplyPayload): Observable<LevelCurriculum[]>;
}

export interface FeeDataSource {
  /** Catalogue des types de frais. */
  listTypes(): Observable<FeeType[]>;
  createType(payload: FeeTypeUpsertPayload): Observable<FeeType>;
  updateType(id: string, payload: FeeTypeUpsertPayload): Observable<FeeType>;
  archiveType(id: string): Observable<FeeType>;

  /** Coût de chaque niveau, y compris les niveaux sans tarif. */
  levels(): Observable<LevelFees[]>;
  saveSchedule(payload: FeeSchedulePayload): Observable<LevelFees[]>;
  deleteSchedule(scheduleId: string): Observable<void>;
  apply(payload: FeeApplyPayload): Observable<LevelFees[]>;
}

export interface ReportCardDataSource {
  /** L'état d'une classe pour une période, lisible avant toute génération. */
  batch(query: ReportCardQuery): Observable<ReportCardBatch>;
  generate(payload: ReportCardGeneratePayload): Observable<ReportCardBatch>;
  getById(reportCardId: string): Observable<ReportCard>;
  /** Les seules lignes qu'un humain écrit ; jamais régénérées. */
  remark(reportCardId: string, payload: ReportCardRemarkPayload): Observable<ReportCard>;
  publish(reportCardId: string): Observable<ReportCard>;
  publishAll(query: ReportCardQuery): Observable<ReportCardBatch>;
  /** Contrôle d'un bulletin présenté sur papier, par son code. */
  verify(code: string): Observable<ReportCard>;
}

/** Planning, attendance sheet and decisions of the class council. */
export interface CouncilDataSource {
  list(query?: CouncilQuery): Observable<CouncilSummary[]>;
  get(councilId: string): Observable<Council>;
  create(payload: CouncilCreatePayload): Observable<Council>;
  update(councilId: string, payload: CouncilUpdatePayload): Observable<Council>;
  start(councilId: string): Observable<Council>;
  close(councilId: string): Observable<Council>;
  addParticipant(councilId: string, payload: CouncilParticipantPayload): Observable<Council>;
  removeParticipant(councilId: string, participantId: string): Observable<Council>;
  setParticipantPresence(councilId: string, participantId: string,
                         present: boolean): Observable<Council>;
  recordDecision(councilId: string,
                 payload: CouncilDecisionPayload): Observable<CouncilStudentDecision>;
}

export interface OfficialDocumentDataSource {
  search(query: OfficialDocumentQuery): Observable<PageResponse<OfficialDocument>>;
  issue(payload: OfficialDocumentIssuePayload): Observable<OfficialDocument>;
  revoke(documentId: string, reason: string): Observable<OfficialDocument>;
  layout(): Observable<OfficialDocumentLayout>;
  saveLayout(layout: OfficialDocumentLayout): Observable<OfficialDocumentLayout>;
}

export interface FamilyRequestDataSource {
  board(query: FamilyRequestQuery): Observable<FamilyRequestBoard>;
  create(payload: FamilyRequestCreatePayload): Observable<FamilyRequest>;
  update(requestId: string, payload: FamilyRequestUpdatePayload): Observable<FamilyRequest>;
}

export interface OptionDataSource {
  /** Le catalogue et ses offres par niveau, en une lecture. */
  overview(): Observable<OptionOverview>;
  create(payload: OptionUpsertPayload): Observable<OptionOverview>;
  update(optionId: string, payload: OptionUpsertPayload): Observable<OptionOverview>;
  archive(optionId: string): Observable<OptionOverview>;
  /**
   * Ouvre l'option sur les niveaux cochés, avec la même capacité.
   *
   * <p>C'est un remplacement : un niveau retiré de la liste voit son offre
   * fermée. Il n'y a donc pas de suppression séparée.</p>
   */
  saveOfferings(optionId: string, payload: OptionOfferingsSavePayload): Observable<OptionOverview>;

  choices(query: OptionChoiceQuery): Observable<PageResponse<OptionChoice>>;
  assign(payload: OptionChoiceAssignPayload): Observable<OptionChoice>;
  /** Confirmer au-delà de la capacité est refusé ; le serveur le dit. */
  changeChoiceStatus(choiceId: string, status: OptionChoiceStatus): Observable<OptionChoice>;
}

export interface TransferDataSource {
  /** Les mouvements de l'année : changements de classe et départs, séparés. */
  board(search?: string): Observable<TransferBoard>;
  changeClass(payload: ClassChangePayload): Observable<ClassChange>;

  recordDeparture(payload: DepartureRecordPayload): Observable<Departure>;
  /** Coche les pièces une à une, à mesure qu'elles sont remises. */
  updateDocuments(departureId: string,
                  payload: DepartureDocumentsPayload): Observable<Departure>;
  /** Refusé tant qu'une pièce manque. */
  clearDeparture(departureId: string): Observable<Departure>;
  /** Annule une sortie enregistrée par erreur : l'élève revient en classe. */
  cancelDeparture(departureId: string, reason: string): Observable<Departure>;
}

export interface HealthDataSource {
  /**
   * L'écran Santé scolaire.
   *
   * <p>Le serveur décide de la forme renvoyée selon le droit de l'appelant :
   * `board.fullAccess` à faux, seules les alertes sont remplies. Le détail
   * médical n'a pas été envoyé — il n'y a rien à masquer côté écran.</p>
   */
  board(search?: string): Observable<HealthBoard>;
  record(studentId: string): Observable<HealthRecord>;
  saveRecord(payload: HealthRecordPayload): Observable<HealthRecord>;

  /** Refusé si la gravité en fait une alerte sans conduite à tenir. */
  addCondition(payload: HealthConditionPayload): Observable<HealthCondition>;
  updateCondition(conditionId: string,
                  payload: HealthConditionPayload): Observable<HealthCondition>;
  /** Clôt la condition sans l'effacer : elle reste au dossier. */
  resolveCondition(conditionId: string): Observable<HealthCondition>;

  /** Refusé si l'élève part sans que la famille ait été jointe. */
  recordVisit(payload: InfirmaryVisitPayload): Observable<InfirmaryVisit>;
  notifyGuardian(visitId: string): Observable<InfirmaryVisit>;

  saveVaccination(payload: VaccinationPayload): Observable<Vaccination>;
  vaccines(): Observable<{ id: string; code: string; label: string;
                           required: boolean; dosesExpected: number }[]>;

  planExamination(payload: ExaminationPayload): Observable<MedicalExamination>;
  /** « Apte avec réserve » exige d'écrire la réserve. */
  recordExamination(examinationId: string,
                    payload: ExaminationResultPayload): Observable<MedicalExamination>;
}

export interface ReferenceDataSource {
  academicYears(): Observable<AcademicYear[]>;
  terms(academicYearId: string): Observable<Term[]>;
  subjects(): Observable<Subject[]>;
  globalSearch(term: string): Observable<GlobalSearchResult[]>;
}

export interface AccessProfileDataSource {
  overview(): Observable<AccessProfileOverview>;
  create(payload: AccessProfilePayload): Observable<AccessProfile>;
  update(id: string, payload: AccessProfilePayload): Observable<AccessProfile>;
}

export interface AdmissionDataSource {
  search(query: AdmissionQuery): Observable<PageResponse<Admission>>;
  options(academicYearId?: string): Observable<AdmissionOptions>;
  get(id: string): Observable<Admission>;
  create(payload: AdmissionCreatePayload): Observable<Admission>;
  changeStatus(id: string, payload: AdmissionStatusPayload): Observable<Admission>;
  updateDocument(admissionId: string, documentId: string,
                 received: boolean): Observable<Admission>;
}

export interface GuardianDataSource {
  search(query: GuardianQuery): Observable<PageResponse<Guardian>>;
}

export const STUDENT_DATA_SOURCE = new InjectionToken<StudentDataSource>('StudentDataSource');
export const STUDENT_PORTAL_DATA_SOURCE =
  new InjectionToken<StudentPortalDataSource>('StudentPortalDataSource');
export const ENROLLMENT_DATA_SOURCE = new InjectionToken<EnrollmentDataSource>('EnrollmentDataSource');
export const CLASSROOM_DATA_SOURCE = new InjectionToken<ClassroomDataSource>('ClassroomDataSource');
export const TEACHER_DATA_SOURCE = new InjectionToken<TeacherDataSource>('TeacherDataSource');
export const ATTENDANCE_DATA_SOURCE = new InjectionToken<AttendanceDataSource>('AttendanceDataSource');
export const GRADE_DATA_SOURCE = new InjectionToken<GradeDataSource>('GradeDataSource');
export const FINANCE_DATA_SOURCE = new InjectionToken<FinanceDataSource>('FinanceDataSource');
export const DASHBOARD_DATA_SOURCE = new InjectionToken<DashboardDataSource>('DashboardDataSource');
export const TIMETABLE_DATA_SOURCE = new InjectionToken<TimetableDataSource>('TimetableDataSource');
export const CURRICULUM_DATA_SOURCE = new InjectionToken<CurriculumDataSource>('CurriculumDataSource');
export const FEE_DATA_SOURCE = new InjectionToken<FeeDataSource>('FeeDataSource');
export const TRANSFER_DATA_SOURCE = new InjectionToken<TransferDataSource>('TransferDataSource');
export const OPTION_DATA_SOURCE = new InjectionToken<OptionDataSource>('OptionDataSource');
export const HEALTH_DATA_SOURCE = new InjectionToken<HealthDataSource>('HealthDataSource');
export const REPORT_CARD_DATA_SOURCE = new InjectionToken<ReportCardDataSource>('ReportCardDataSource');
export const COUNCIL_DATA_SOURCE = new InjectionToken<CouncilDataSource>('CouncilDataSource');
export const OFFICIAL_DOCUMENT_DATA_SOURCE =
  new InjectionToken<OfficialDocumentDataSource>('OfficialDocumentDataSource');
export const FAMILY_REQUEST_DATA_SOURCE =
  new InjectionToken<FamilyRequestDataSource>('FamilyRequestDataSource');
export const ACCESS_PROFILE_DATA_SOURCE =
  new InjectionToken<AccessProfileDataSource>('AccessProfileDataSource');
export const ADMISSION_DATA_SOURCE =
  new InjectionToken<AdmissionDataSource>('AdmissionDataSource');
export const GUARDIAN_DATA_SOURCE =
  new InjectionToken<GuardianDataSource>('GuardianDataSource');
export const REFERENCE_DATA_SOURCE = new InjectionToken<ReferenceDataSource>('ReferenceDataSource');
