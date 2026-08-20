import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PageQuery, PageResponse } from '../models/common.models';
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
export const REFERENCE_DATA_SOURCE = new InjectionToken<ReferenceDataSource>('ReferenceDataSource');
