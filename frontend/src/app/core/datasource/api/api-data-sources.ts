import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageQuery, PageResponse } from '@core/models/common.models';
import {
  AcademicYear, Assessment, AttendanceSheet, Classroom, DashboardData, Enrollment,
  EnrollmentCheckResult, FinancialSummary, GlobalSearchResult, Grade, Payment,
  ReportCard, StudentDetail, StudentSummary, Subject, Teacher, Term
} from '@core/models/domain.models';
import {
  ClassroomBulkCreatePayload, ClassroomCreatePayload, ClassroomUpdatePayload, LevelCapacity
} from '@core/models/classroom.models';
import {
  PaletteEntry, SlotUpsertPayload, TimetableConflict, TimetableGrid, TimetableSlot
} from '@core/models/timetable.models';
import {
  CurriculumApplyPayload, CurriculumSubjectPayload, LevelCurriculum,
  SubjectItem, SubjectUpsertPayload
} from '@core/models/curriculum.models';
import {
  FeeApplyPayload, FeeSchedulePayload, FeeType, FeeTypeUpsertPayload, LevelFees
} from '@core/models/fee.models';
import {
  AttendanceDataSource, ClassroomDataSource, TimetableDataSource, CurriculumDataSource, FeeDataSource, DashboardDataSource, EnrollmentDataSource,
  FinanceDataSource, GradeDataSource, ReferenceDataSource, StudentDataSource, TeacherDataSource
} from '../data-source';

/**
 * Turns a query object into HttpParams, skipping undefined, null and empty
 * values so the backend receives only the filters the user actually set.
 *
 * Accepts any object (not `Record<string, unknown>`) so typed query interfaces
 * such as `PageQuery` can be passed without an index signature.
 */
function toParams(query: object): HttpParams {
  let params = new HttpParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, String(value));
    }
  });
  return params;
}

const API = environment.apiBaseUrl;

@Injectable()
export class ApiStudentDataSource implements StudentDataSource {
  private readonly http = inject(HttpClient);

  search(query: PageQuery & { status?: string; classroomId?: string }):
      Observable<PageResponse<StudentSummary>> {
    return this.http.get<PageResponse<StudentSummary>>(`${API}/students`,
      { params: toParams(query) });
  }

  getById(id: string): Observable<StudentDetail> {
    return this.http.get<StudentDetail>(`${API}/students/${id}`);
  }

  getEnrollments(studentId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${API}/students/${studentId}/enrollments`);
  }

  getFinancialSummary(studentId: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${API}/students/${studentId}/financial-summary`);
  }

  getReportCards(studentId: string): Observable<ReportCard[]> {
    return this.http.get<ReportCard[]>(`${API}/students/${studentId}/report-cards`);
  }
}

@Injectable()
export class ApiEnrollmentDataSource implements EnrollmentDataSource {
  private readonly http = inject(HttpClient);

  search(query: PageQuery & { classroomId?: string; status?: string }):
      Observable<PageResponse<Enrollment>> {
    return this.http.get<PageResponse<Enrollment>>(`${API}/enrollments`,
      { params: toParams(query) });
  }

  check(studentId: string, classroomId: string, academicYearId?: string):
      Observable<EnrollmentCheckResult> {
    return this.http.get<EnrollmentCheckResult>(`${API}/enrollments/check`,
      { params: toParams({ studentId, classroomId, academicYearId }) });
  }

  create(payload: unknown): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${API}/enrollments`, payload);
  }

  validate(id: string): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${API}/enrollments/${id}/validate`, {});
  }
}

@Injectable()
export class ApiClassroomDataSource implements ClassroomDataSource {
  private readonly http = inject(HttpClient);

  list(academicYearId?: string): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${API}/classrooms`, { params: toParams({ academicYearId }) });
  }

  search(query: PageQuery & { levelId?: string }): Observable<PageResponse<Classroom>> {
    return this.http.get<PageResponse<Classroom>>(`${API}/classrooms`, { params: toParams(query) });
  }

  getById(id: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${API}/classrooms/${id}`);
  }

  getStudents(classroomId: string): Observable<StudentSummary[]> {
    return this.http.get<StudentSummary[]>(`${API}/classrooms/${classroomId}/students`);
  }

  levelCapacities(academicYearId?: string): Observable<LevelCapacity[]> {
    return this.http.get<LevelCapacity[]>(`${API}/classrooms/levels`,
      { params: toParams({ academicYearId }) });
  }

  create(payload: ClassroomCreatePayload): Observable<Classroom> {
    return this.http.post<Classroom>(`${API}/classrooms`, payload);
  }

  createMany(payload: ClassroomBulkCreatePayload): Observable<Classroom[]> {
    return this.http.post<Classroom[]>(`${API}/classrooms/batch`, payload);
  }

  update(id: string, payload: ClassroomUpdatePayload): Observable<Classroom> {
    return this.http.put<Classroom>(`${API}/classrooms/${id}`, payload);
  }

  activate(id: string): Observable<Classroom> {
    return this.http.post<Classroom>(`${API}/classrooms/${id}/activate`, {});
  }

  close(id: string, reason?: string): Observable<Classroom> {
    return this.http.post<Classroom>(`${API}/classrooms/${id}/close`, {},
      { params: toParams({ reason }) });
  }
}

@Injectable()
export class ApiTeacherDataSource implements TeacherDataSource {
  private readonly http = inject(HttpClient);

  search(query: PageQuery): Observable<PageResponse<Teacher>> {
    return this.http.get<PageResponse<Teacher>>(`${API}/teachers`, { params: toParams(query) });
  }

  getById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${API}/teachers/${id}`);
  }

  /** The server derives the classes from the authenticated teacher (section 66). */
  myClasses(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${API}/teacher/classes`);
  }
}

@Injectable()
export class ApiAttendanceDataSource implements AttendanceDataSource {
  private readonly http = inject(HttpClient);

  openSheet(classroomId: string, date: string, subjectId?: string): Observable<AttendanceSheet> {
    return this.http.get<AttendanceSheet>(`${API}/attendance/sheet`,
      { params: toParams({ classroomId, date, subjectId }) });
  }

  /** The idempotency key makes an offline replay safe (section 80). */
  submitSheet(sheet: AttendanceSheet, idempotencyKey: string): Observable<AttendanceSheet> {
    return this.http.post<AttendanceSheet>(`${API}/attendance`,
      { ...sheet, idempotencyKey });
  }
}

@Injectable()
export class ApiGradeDataSource implements GradeDataSource {
  private readonly http = inject(HttpClient);

  listAssessments(classroomId?: string, termId?: string): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${API}/assessments`,
      { params: toParams({ classroomId, termId }) });
  }

  getGrades(assessmentId: string): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${API}/grades`, { params: toParams({ assessmentId }) });
  }

  saveGrades(assessmentId: string, grades: Grade[]): Observable<Grade[]> {
    return this.http.post<Grade[]>(`${API}/grades`, { assessmentId, grades });
  }

  submitGrades(assessmentId: string): Observable<void> {
    return this.http.post<void>(`${API}/grades/submit`, { assessmentId });
  }
}

@Injectable()
export class ApiFinanceDataSource implements FinanceDataSource {
  private readonly http = inject(HttpClient);

  searchPayments(query: PageQuery): Observable<PageResponse<Payment>> {
    return this.http.get<PageResponse<Payment>>(`${API}/payments`, { params: toParams(query) });
  }

  recordPayment(payload: unknown): Observable<Payment> {
    return this.http.post<Payment>(`${API}/payments`, payload);
  }

  getStudentSummary(studentId: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${API}/students/${studentId}/financial-summary`);
  }
}

@Injectable()
export class ApiDashboardDataSource implements DashboardDataSource {
  private readonly http = inject(HttpClient);

  load(academicYearId?: string, campusId?: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${API}/dashboard`,
      { params: toParams({ academicYearId, campusId }) });
  }
}

@Injectable()
export class ApiReferenceDataSource implements ReferenceDataSource {
  private readonly http = inject(HttpClient);

  academicYears(): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(`${API}/academic-years`);
  }

  terms(academicYearId: string): Observable<Term[]> {
    return this.http.get<Term[]>(`${API}/academic-years/${academicYearId}/terms`);
  }

  subjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${API}/subjects`);
  }

  globalSearch(term: string): Observable<GlobalSearchResult[]> {
    return this.http.get<GlobalSearchResult[]>(`${API}/search`, { params: toParams({ q: term }) });
  }
}

@Injectable()
export class ApiTimetableDataSource implements TimetableDataSource {
  private readonly http = inject(HttpClient);

  classroomGrid(classroomId: string): Observable<TimetableGrid> {
    return this.http.get<TimetableGrid>(`${API}/timetables/classroom/${classroomId}`);
  }

  teacherGrid(teacherId: string): Observable<TimetableGrid> {
    return this.http.get<TimetableGrid>(`${API}/timetables/teacher/${teacherId}`);
  }

  roomGrid(roomId: string): Observable<TimetableGrid> {
    return this.http.get<TimetableGrid>(`${API}/timetables/room/${roomId}`);
  }

  palette(classroomId: string): Observable<PaletteEntry[]> {
    return this.http.get<PaletteEntry[]>(`${API}/timetables/classroom/${classroomId}/palette`);
  }

  check(payload: SlotUpsertPayload, excludeSlotId?: string): Observable<TimetableConflict[]> {
    return this.http.post<TimetableConflict[]>(`${API}/timetables/slots/check`, payload,
      { params: toParams({ excludeSlotId }) });
  }

  createSlot(payload: SlotUpsertPayload): Observable<TimetableSlot> {
    return this.http.post<TimetableSlot>(`${API}/timetables/slots`, payload);
  }

  updateSlot(slotId: string, payload: SlotUpsertPayload): Observable<TimetableSlot> {
    return this.http.put<TimetableSlot>(`${API}/timetables/slots/${slotId}`, payload);
  }

  deleteSlot(slotId: string): Observable<void> {
    return this.http.delete<void>(`${API}/timetables/slots/${slotId}`);
  }

  publish(classroomId: string): Observable<TimetableGrid> {
    return this.http.post<TimetableGrid>(
      `${API}/timetables/classroom/${classroomId}/publish`, {});
  }
}

@Injectable()
export class ApiCurriculumDataSource implements CurriculumDataSource {
  private readonly http = inject(HttpClient);

  listSubjects(includeArchived = false): Observable<SubjectItem[]> {
    return this.http.get<SubjectItem[]>(`${API}/subjects`,
      { params: toParams({ includeArchived }) });
  }

  createSubject(payload: SubjectUpsertPayload): Observable<SubjectItem> {
    return this.http.post<SubjectItem>(`${API}/subjects`, payload);
  }

  updateSubject(id: string, payload: SubjectUpsertPayload): Observable<SubjectItem> {
    return this.http.put<SubjectItem>(`${API}/subjects/${id}`, payload);
  }

  archiveSubject(id: string): Observable<SubjectItem> {
    return this.http.post<SubjectItem>(`${API}/subjects/${id}/archive`, {});
  }

  restoreSubject(id: string): Observable<SubjectItem> {
    return this.http.post<SubjectItem>(`${API}/subjects/${id}/restore`, {});
  }

  levels(): Observable<LevelCurriculum[]> {
    return this.http.get<LevelCurriculum[]>(`${API}/curriculum/levels`);
  }

  upsertLevelSubject(levelId: string,
                     payload: CurriculumSubjectPayload): Observable<LevelCurriculum> {
    return this.http.put<LevelCurriculum>(
      `${API}/curriculum/levels/${levelId}/subjects`, payload);
  }

  removeLevelSubject(levelId: string, subjectId: string): Observable<LevelCurriculum> {
    return this.http.delete<LevelCurriculum>(
      `${API}/curriculum/levels/${levelId}/subjects/${subjectId}`);
  }

  apply(payload: CurriculumApplyPayload): Observable<LevelCurriculum[]> {
    return this.http.post<LevelCurriculum[]>(`${API}/curriculum/apply`, payload);
  }
}

@Injectable()
export class ApiFeeDataSource implements FeeDataSource {
  private readonly http = inject(HttpClient);

  listTypes(): Observable<FeeType[]> {
    return this.http.get<FeeType[]>(`${API}/fees/types`);
  }

  createType(payload: FeeTypeUpsertPayload): Observable<FeeType> {
    return this.http.post<FeeType>(`${API}/fees/types`, payload);
  }

  updateType(id: string, payload: FeeTypeUpsertPayload): Observable<FeeType> {
    return this.http.put<FeeType>(`${API}/fees/types/${id}`, payload);
  }

  archiveType(id: string): Observable<FeeType> {
    return this.http.post<FeeType>(`${API}/fees/types/${id}/archive`, {});
  }

  levels(): Observable<LevelFees[]> {
    return this.http.get<LevelFees[]>(`${API}/fees/levels`);
  }

  saveSchedule(payload: FeeSchedulePayload): Observable<LevelFees[]> {
    return this.http.put<LevelFees[]>(`${API}/fees/schedules`, payload);
  }

  deleteSchedule(scheduleId: string): Observable<void> {
    return this.http.delete<void>(`${API}/fees/schedules/${scheduleId}`);
  }

  apply(payload: FeeApplyPayload): Observable<LevelFees[]> {
    return this.http.post<LevelFees[]>(`${API}/fees/apply`, payload);
  }
}
