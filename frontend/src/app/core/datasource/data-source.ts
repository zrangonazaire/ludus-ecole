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
  AcademicYear, Assessment, AttendanceSheet, Classroom, DashboardData, Enrollment,
  EnrollmentCheckResult, FinancialSummary, Grade, GlobalSearchResult, Payment,
  ReportCard, StudentDetail, StudentSummary, Subject, Teacher, Term
} from '../models/domain.models';

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
  search(query: PageQuery): Observable<PageResponse<Teacher>>;
  getById(id: string): Observable<Teacher>;
  myClasses(): Observable<Classroom[]>;
}

export interface AttendanceDataSource {
  openSheet(classroomId: string, date: string, subjectId?: string): Observable<AttendanceSheet>;
  submitSheet(sheet: AttendanceSheet, idempotencyKey: string): Observable<AttendanceSheet>;
}

export interface GradeDataSource {
  listAssessments(classroomId?: string, termId?: string): Observable<Assessment[]>;
  getGrades(assessmentId: string): Observable<Grade[]>;
  saveGrades(assessmentId: string, grades: Grade[]): Observable<Grade[]>;
  submitGrades(assessmentId: string): Observable<void>;
}

export interface FinanceDataSource {
  searchPayments(query: PageQuery): Observable<PageResponse<Payment>>;
  recordPayment(payload: unknown): Observable<Payment>;
  getStudentSummary(studentId: string): Observable<FinancialSummary>;
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

export interface ReferenceDataSource {
  academicYears(): Observable<AcademicYear[]>;
  terms(academicYearId: string): Observable<Term[]>;
  subjects(): Observable<Subject[]>;
  globalSearch(term: string): Observable<GlobalSearchResult[]>;
}

export const STUDENT_DATA_SOURCE = new InjectionToken<StudentDataSource>('StudentDataSource');
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
export const REFERENCE_DATA_SOURCE = new InjectionToken<ReferenceDataSource>('ReferenceDataSource');
