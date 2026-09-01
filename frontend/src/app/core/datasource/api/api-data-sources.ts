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
  Absence, AbsenceDigest, AbsenceQuery, AttendanceDay, JustifyPayload
} from '@core/models/attendance.models';
import {
  AssessmentBoard, AssessmentItem, AssessmentQuery, AssessmentStatus,
  AssessmentUpsertPayload, GradeCorrectionPayload, GradeEntryPayload, GradeSheet
} from '@core/models/assessment.models';
import {
  ReportCardBatch, ReportCardGeneratePayload, ReportCardQuery, ReportCardRemarkPayload
} from '@core/models/report-card.models';
import {
  OptionChoice, OptionChoiceAssignPayload, OptionChoiceQuery, OptionChoiceStatus,
  OptionOfferingsSavePayload, OptionOverview, OptionUpsertPayload
} from '@core/models/option.models';
import {
  ClassChange, ClassChangePayload, Departure, DepartureDocumentsPayload,
  DepartureRecordPayload, TransferBoard
} from '@core/models/transfer.models';
import {
  ExaminationPayload, ExaminationResultPayload, HealthBoard, HealthCondition,
  HealthConditionPayload, HealthRecord, HealthRecordPayload, InfirmaryVisit,
  InfirmaryVisitPayload, MedicalExamination, Vaccination, VaccinationPayload
} from '@core/models/health.models';
import {
  FamilyRequest, FamilyRequestBoard, FamilyRequestCreatePayload,
  FamilyRequestQuery, FamilyRequestUpdatePayload
} from '@core/models/family-request.models';
import { OutstandingBoard, OutstandingQuery } from '@core/models/outstanding.models';
import {
  AttendanceDataSource, ClassroomDataSource, TimetableDataSource, CurriculumDataSource, FeeDataSource, DashboardDataSource, EnrollmentDataSource,
  FinanceDataSource, GradeDataSource, ReferenceDataSource, StudentDataSource, TeacherDataSource,
  ReportCardDataSource, OptionDataSource, TransferDataSource, HealthDataSource,
  FamilyRequestDataSource
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

  day(date: string): Observable<AttendanceDay> {
    return this.http.get<AttendanceDay>(`${API}/attendance/day`,
      { params: toParams({ date }) });
  }

  openSheet(classroomId: string, date: string, subjectId?: string): Observable<AttendanceSheet> {
    return this.http.get<AttendanceSheet>(`${API}/attendance/sheet`,
      { params: toParams({ classroomId, date, subjectId }) });
  }

  /** The idempotency key makes an offline replay safe (section 80). */
  submitSheet(sheet: AttendanceSheet, idempotencyKey: string): Observable<AttendanceSheet> {
    return this.http.post<AttendanceSheet>(`${API}/attendance`, {
      classroomId: sheet.classroomId,
      sessionDate: sheet.sessionDate,
      subjectId: sheet.subjectId,
      startTime: sheet.startTime,
      endTime: sheet.endTime,
      idempotencyKey,
      // Only the marks travel: the counters are the server's to compute, and a
      // client that sent its own would let a stale tab rewrite the totals.
      records: sheet.records.map((record) => ({
        studentId: record.studentId,
        status: record.status,
        arrivalTime: record.arrivalTime,
        departureTime: record.departureTime,
        minutesLate: record.minutesLate,
        reason: record.reason
      }))
    });
  }

  absences(query: AbsenceQuery): Observable<AbsenceDigest> {
    return this.http.get<AbsenceDigest>(`${API}/attendance/absences`,
      { params: toParams(query) });
  }

  justify(attendanceId: string, payload: JustifyPayload): Observable<Absence> {
    return this.http.post<Absence>(`${API}/attendance/${attendanceId}/justify`, payload);
  }

  remind(attendanceId: string): Observable<Absence> {
    return this.http.post<Absence>(`${API}/attendance/${attendanceId}/remind`, {});
  }
}

@Injectable()
export class ApiGradeDataSource implements GradeDataSource {
  private readonly http = inject(HttpClient);

  board(query: AssessmentQuery): Observable<AssessmentBoard> {
    return this.http.get<AssessmentBoard>(`${API}/assessments`, { params: toParams(query) });
  }

  createAssessment(payload: AssessmentUpsertPayload): Observable<AssessmentItem> {
    return this.http.post<AssessmentItem>(`${API}/assessments`, payload);
  }

  updateAssessment(id: string, payload: AssessmentUpsertPayload): Observable<AssessmentItem> {
    return this.http.put<AssessmentItem>(`${API}/assessments/${id}`, payload);
  }

  changeStatus(id: string, target: AssessmentStatus): Observable<AssessmentItem> {
    return this.http.post<AssessmentItem>(`${API}/assessments/${id}/status`, {},
      { params: toParams({ target }) });
  }

  gradeSheet(assessmentId: string): Observable<GradeSheet> {
    return this.http.get<GradeSheet>(`${API}/assessments/${assessmentId}/grades`);
  }

  saveGrades(assessmentId: string, entries: GradeEntryPayload[]): Observable<GradeSheet> {
    return this.http.put<GradeSheet>(`${API}/assessments/${assessmentId}/grades`, { entries });
  }

  submitGrades(assessmentId: string): Observable<GradeSheet> {
    return this.http.post<GradeSheet>(`${API}/assessments/${assessmentId}/submit`, {});
  }

  validateGrades(assessmentId: string): Observable<GradeSheet> {
    return this.http.post<GradeSheet>(`${API}/assessments/${assessmentId}/validate`, {});
  }

  publishGrades(assessmentId: string): Observable<GradeSheet> {
    return this.http.post<GradeSheet>(`${API}/assessments/${assessmentId}/publish`, {});
  }

  correctGrade(gradeId: string, payload: GradeCorrectionPayload): Observable<GradeSheet> {
    return this.http.post<GradeSheet>(`${API}/assessments/grades/${gradeId}/correct`, payload);
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

  outstanding(query: OutstandingQuery): Observable<OutstandingBoard> {
    return this.http.get<OutstandingBoard>(`${API}/outstanding`, { params: toParams(query) });
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
export class ApiReportCardDataSource implements ReportCardDataSource {
  private readonly http = inject(HttpClient);

  batch(query: ReportCardQuery): Observable<ReportCardBatch> {
    return this.http.get<ReportCardBatch>(`${API}/report-cards`, { params: toParams(query) });
  }

  generate(payload: ReportCardGeneratePayload): Observable<ReportCardBatch> {
    return this.http.post<ReportCardBatch>(`${API}/report-cards/generate`, payload);
  }

  getById(reportCardId: string): Observable<ReportCard> {
    return this.http.get<ReportCard>(`${API}/report-cards/${reportCardId}`);
  }

  remark(reportCardId: string, payload: ReportCardRemarkPayload): Observable<ReportCard> {
    return this.http.put<ReportCard>(`${API}/report-cards/${reportCardId}/remarks`, payload);
  }

  publish(reportCardId: string): Observable<ReportCard> {
    return this.http.post<ReportCard>(`${API}/report-cards/${reportCardId}/publish`, {});
  }

  publishAll(query: ReportCardQuery): Observable<ReportCardBatch> {
    return this.http.post<ReportCardBatch>(`${API}/report-cards/publish`, {},
      { params: toParams(query) });
  }

  verify(code: string): Observable<ReportCard> {
    return this.http.get<ReportCard>(`${API}/report-cards/verify`, { params: toParams({ code }) });
  }
}

@Injectable()
export class ApiOptionDataSource implements OptionDataSource {
  private readonly http = inject(HttpClient);

  overview(): Observable<OptionOverview> {
    return this.http.get<OptionOverview>(`${API}/options`);
  }

  create(payload: OptionUpsertPayload): Observable<OptionOverview> {
    return this.http.post<OptionOverview>(`${API}/options`, payload);
  }

  update(optionId: string, payload: OptionUpsertPayload): Observable<OptionOverview> {
    return this.http.put<OptionOverview>(`${API}/options/${optionId}`, payload);
  }

  archive(optionId: string): Observable<OptionOverview> {
    return this.http.delete<OptionOverview>(`${API}/options/${optionId}`);
  }

  saveOfferings(optionId: string,
                payload: OptionOfferingsSavePayload): Observable<OptionOverview> {
    return this.http.put<OptionOverview>(`${API}/options/${optionId}/offerings`, payload);
  }

  choices(query: OptionChoiceQuery): Observable<PageResponse<OptionChoice>> {
    return this.http.get<PageResponse<OptionChoice>>(`${API}/options/choices`,
      { params: toParams(query) });
  }

  assign(payload: OptionChoiceAssignPayload): Observable<OptionChoice> {
    return this.http.post<OptionChoice>(`${API}/options/choices`, payload);
  }

  changeChoiceStatus(choiceId: string, status: OptionChoiceStatus): Observable<OptionChoice> {
    return this.http.put<OptionChoice>(`${API}/options/choices/${choiceId}/status`, { status });
  }
}

@Injectable()
export class ApiTransferDataSource implements TransferDataSource {
  private readonly http = inject(HttpClient);

  board(search?: string): Observable<TransferBoard> {
    return this.http.get<TransferBoard>(`${API}/transfers`, { params: toParams({ search }) });
  }

  changeClass(payload: ClassChangePayload): Observable<ClassChange> {
    return this.http.post<ClassChange>(`${API}/transfers/class-change`, payload);
  }

  recordDeparture(payload: DepartureRecordPayload): Observable<Departure> {
    return this.http.post<Departure>(`${API}/transfers/departures`, payload);
  }

  updateDocuments(departureId: string,
                  payload: DepartureDocumentsPayload): Observable<Departure> {
    return this.http.put<Departure>(
      `${API}/transfers/departures/${departureId}/documents`, payload);
  }

  clearDeparture(departureId: string): Observable<Departure> {
    return this.http.post<Departure>(
      `${API}/transfers/departures/${departureId}/clear`, {});
  }

  cancelDeparture(departureId: string, reason: string): Observable<Departure> {
    return this.http.post<Departure>(
      `${API}/transfers/departures/${departureId}/cancel`, { reason });
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

@Injectable()
export class ApiHealthDataSource implements HealthDataSource {
  private readonly http = inject(HttpClient);

  board(search?: string): Observable<HealthBoard> {
    return this.http.get<HealthBoard>(`${API}/health`, { params: toParams({ search }) });
  }

  record(studentId: string): Observable<HealthRecord> {
    return this.http.get<HealthRecord>(`${API}/health/records/${studentId}`);
  }

  saveRecord(payload: HealthRecordPayload): Observable<HealthRecord> {
    return this.http.put<HealthRecord>(`${API}/health/records`, payload);
  }

  addCondition(payload: HealthConditionPayload): Observable<HealthCondition> {
    return this.http.post<HealthCondition>(`${API}/health/conditions`, payload);
  }

  updateCondition(conditionId: string,
                  payload: HealthConditionPayload): Observable<HealthCondition> {
    return this.http.put<HealthCondition>(`${API}/health/conditions/${conditionId}`, payload);
  }

  resolveCondition(conditionId: string): Observable<HealthCondition> {
    return this.http.put<HealthCondition>(
      `${API}/health/conditions/${conditionId}/resolve`, {});
  }

  recordVisit(payload: InfirmaryVisitPayload): Observable<InfirmaryVisit> {
    return this.http.post<InfirmaryVisit>(`${API}/health/visits`, payload);
  }

  notifyGuardian(visitId: string): Observable<InfirmaryVisit> {
    return this.http.put<InfirmaryVisit>(`${API}/health/visits/${visitId}/notify`, {});
  }

  saveVaccination(payload: VaccinationPayload): Observable<Vaccination> {
    return this.http.put<Vaccination>(`${API}/health/vaccinations`, payload);
  }

  vaccines(): Observable<{ id: string; code: string; label: string;
                           required: boolean; dosesExpected: number }[]> {
    return this.http.get<{ id: string; code: string; label: string;
                           required: boolean; dosesExpected: number }[]>(
      `${API}/health/vaccines`);
  }

  planExamination(payload: ExaminationPayload): Observable<MedicalExamination> {
    return this.http.post<MedicalExamination>(`${API}/health/examinations`, payload);
  }

  recordExamination(examinationId: string,
                    payload: ExaminationResultPayload): Observable<MedicalExamination> {
    return this.http.put<MedicalExamination>(
      `${API}/health/examinations/${examinationId}`, payload);
  }
}

@Injectable()
export class ApiFamilyRequestDataSource implements FamilyRequestDataSource {
  private readonly http = inject(HttpClient);

  board(query: FamilyRequestQuery): Observable<FamilyRequestBoard> {
    return this.http.get<FamilyRequestBoard>(`${API}/family-requests`,
      { params: toParams(query) });
  }

  create(payload: FamilyRequestCreatePayload): Observable<FamilyRequest> {
    return this.http.post<FamilyRequest>(`${API}/family-requests`, payload);
  }

  update(requestId: string, payload: FamilyRequestUpdatePayload): Observable<FamilyRequest> {
    return this.http.patch<FamilyRequest>(`${API}/family-requests/${requestId}`, payload);
  }
}
