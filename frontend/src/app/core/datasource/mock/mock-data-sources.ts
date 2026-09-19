import { createUuid } from "../../utils/uuid";
import { Injectable, inject } from '@angular/core';
import { Observable, defer, delay, of, throwError } from 'rxjs';
import { PageQuery, PageResponse } from '@core/models/common.models';
import {
  AcademicYear, Assessment, AttendanceSheet, Classroom, DashboardData, Enrollment,
  EnrollmentCheckResult, FinancialSummary, GlobalSearchResult, Grade, Payment,
  StudentDetail, StudentSummary, Subject, Teacher, Term, LessonSlot
} from '@core/models/domain.models';
import {
  ClassroomBulkCreatePayload, ClassroomCreatePayload, ClassroomUpdatePayload, LevelCapacity
} from '@core/models/classroom.models';
import {
  PaletteEntry, SlotUpsertPayload, TimetableConflict, TimetableGrid, TimetableSlot,
  TimetableSettings, TimetableSettingsPayload
} from '@core/models/timetable.models';
import {
  CurriculumApplyPayload, CurriculumSubjectItem, CurriculumSubjectPayload,
  LevelCurriculum, SubjectItem, SubjectUpsertPayload
} from '@core/models/curriculum.models';
import {
  FeeApplyPayload, FeeSchedule, FeeSchedulePayload, FeeType, FeeTypeUpsertPayload,
  Instalment, LevelFees
} from '@core/models/fee.models';
import {
  Absence, AbsenceDigest, AbsenceQuery, AttendanceDay, JustifyPayload
} from '@core/models/attendance.models';
import { MOCK_ATTENDANCE } from './mock-attendance-store';
import { MOCK_ASSESSMENTS } from './mock-assessment-store';
import { MOCK_REPORT_CARDS } from './mock-report-card-store';
import { MOCK_OPTIONS } from './mock-option-store';
import { MOCK_TRANSFERS } from './mock-transfer-store';
import { MOCK_HEALTH } from './mock-health-store';
import { MOCK_FAMILY_REQUESTS } from './mock-family-request-store';
import { MOCK_COUNCILS } from './mock-council-store';
import { mockRoomId, mockRoomName } from './mock-room-data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import {
  ExaminationPayload, ExaminationResultPayload, HealthBoard, HealthCondition,
  HealthConditionPayload, HealthRecord, HealthRecordPayload, InfirmaryVisit,
  InfirmaryVisitPayload, MedicalExamination, Vaccination, VaccinationPayload
} from '@core/models/health.models';
import {
  FamilyRequest, FamilyRequestBoard, FamilyRequestCreatePayload,
  FamilyRequestQuery, FamilyRequestUpdatePayload
} from '@core/models/family-request.models';
import {
  ClassChange, ClassChangePayload, Departure, DepartureDocumentsPayload,
  DepartureRecordPayload, TransferBoard
} from '@core/models/transfer.models';
import {
  OptionChoice, OptionChoiceAssignPayload, OptionChoiceQuery, OptionChoiceStatus,
  OptionOfferingsSavePayload, OptionOverview, OptionUpsertPayload
} from '@core/models/option.models';
import {
  ReportCard, ReportCardBatch, ReportCardGeneratePayload, ReportCardQuery,
  ReportCardRemarkPayload
} from '@core/models/report-card.models';
import {
  Council, CouncilCreatePayload, CouncilDecisionPayload, CouncilParticipantPayload,
  CouncilQuery, CouncilStudentDecision, CouncilSummary, CouncilUpdatePayload
} from '@core/models/council.models';
import {
  AssessmentBoard, AssessmentItem, AssessmentQuery, AssessmentStatus,
  AssessmentUpsertPayload, GradeCorrectionPayload, GradeEntryPayload, GradeSheet
} from '@core/models/assessment.models';
import {
  OutstandingBoard, OutstandingQuery, OutstandingStudent
} from '@core/models/outstanding.models';
import {
  DiscountRequest, DiscountRequestPayload, DiscountDecisionPayload, DiscountLevel
} from '@core/models/discount-request.models';
import {
  ClassroomDataSource, DashboardDataSource, EnrollmentDataSource, FinanceDataSource,
  GradeDataSource, AttendanceDataSource, ReferenceDataSource, StudentDataSource, TeacherDataSource,
  TimetableDataSource, CurriculumDataSource, FeeDataSource, ReportCardDataSource,
  OptionDataSource, TransferDataSource, HealthDataSource, FamilyRequestDataSource,
  CouncilDataSource
} from '../data-source';
import {
  MOCK_ACADEMIC_YEAR, MOCK_CLASSROOMS, MOCK_DASHBOARD, MOCK_RECENT_ENROLLMENTS,
  MOCK_RECENT_PAYMENTS, MOCK_STUDENTS, MOCK_SUBJECTS, MOCK_TEACHERS, MOCK_TERMS,
  MOCK_UPCOMING_ASSESSMENTS
} from './mock-data';

/** Simulated network latency so loading states are actually exercised. */
const LATENCY = 220;

function paginate<T>(items: T[], query: PageQuery): PageResponse<T> {
  const page = query.page ?? 0;
  const size = query.size ?? 20;
  const start = page * size;
  const content = items.slice(start, start + size);
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  return {
    content,
    page,
    size,
    totalElements: items.length,
    totalPages,
    first: page === 0,
    last: page >= totalPages - 1
  };
}

function matches(haystack: string[], term?: string): boolean {
  if (!term) return true;
  const needle = term.toLowerCase();
  return haystack.some((value) => value?.toLowerCase().includes(needle));
}

function dateFromToday(dayOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

@Injectable()
export class MockStudentDataSource implements StudentDataSource {
  search(query: PageQuery & { status?: string; classroomId?: string }):
      Observable<PageResponse<StudentSummary>> {
    const filtered = MOCK_STUDENTS.filter((s) =>
      matches([s.fullName, s.studentNumber, s.classroomName ?? ''], query.search) &&
      (!query.status || s.status === query.status) &&
      (!query.classroomId || s.classroomId === query.classroomId));
    return of(paginate(filtered, query)).pipe(delay(LATENCY));
  }

  getById(id: string): Observable<StudentDetail> {
    const summary = MOCK_STUDENTS.find((s) => s.id === id) ?? MOCK_STUDENTS[0];
    const detail: StudentDetail = {
      ...summary,
      nationality: 'Ivoirienne',
      birthPlace: 'Abidjan',
      hasDisability: false,
      admissionDate: '2026-09-01',
      guardians: [
        { id: 'sg-1', guardianId: 'g-1', firstName: 'Mariam', lastName: 'Traore',
          fullName: 'Mariam Traore', phone: '+225 07 11 22 33', email: 'mariam.traore@mail.ci',
          relationship: 'MOTHER', primary: true, financialResponsibility: true,
          canPickupStudent: true, receivesNotifications: true },
        { id: 'sg-2', guardianId: 'g-2', firstName: 'Sekou', lastName: 'Traore',
          fullName: 'Sekou Traore', phone: '+225 07 44 55 66',
          relationship: 'FATHER', primary: false, financialResponsibility: false,
          canPickupStudent: true, receivesNotifications: true }
      ],
      financialSummary: this.buildFinancialSummary(summary.id),
      attendanceSummary: {
        totalRecords: 128, presentCount: 121, absenceCount: 5,
        unjustifiedAbsenceCount: 2, latenessCount: 2, attendanceRate: 96.1
      }
    };
    return of(detail).pipe(delay(LATENCY));
  }

  getEnrollments(studentId: string): Observable<Enrollment[]> {
    return of(MOCK_RECENT_ENROLLMENTS.filter((e) => e.studentId === studentId)
      .concat(MOCK_RECENT_ENROLLMENTS[0])).pipe(delay(LATENCY));
  }

  getFinancialSummary(studentId: string): Observable<FinancialSummary> {
    return of(this.buildFinancialSummary(studentId)).pipe(delay(LATENCY));
  }

  getReportCards(_studentId: string): Observable<ReportCard[]> {
    return of([]).pipe(delay(LATENCY));
  }

  private buildFinancialSummary(studentId: string): FinancialSummary {
    return {
      studentId,
      academicYearId: MOCK_ACADEMIC_YEAR.id,
      totalGross: 600000,
      totalDiscount: 0,
      totalDue: 600000,
      totalPaid: 400000,
      outstandingAmount: 200000,
      nextDueDate: '2027-04-15',
      overdueCount: 0,
      globalStatus: 'PARTIALLY_PAID',
      currency: 'XOF',
      fees: [
        { id: 'f-1', label: 'Scolarité - Échéance 1', feeTypeName: 'Scolarité', sequence: 1,
          grossAmount: 200000, discountAmount: 0, amountDue: 200000, amountPaid: 200000,
          amountRemaining: 0, currency: 'XOF', dueDate: '2026-10-15', status: 'PAID' },
        { id: 'f-2', label: 'Scolarité - Échéance 2', feeTypeName: 'Scolarité', sequence: 2,
          grossAmount: 200000, discountAmount: 0, amountDue: 200000, amountPaid: 200000,
          amountRemaining: 0, currency: 'XOF', dueDate: '2027-01-15', status: 'PAID' },
        { id: 'f-3', label: 'Scolarité - Échéance 3', feeTypeName: 'Scolarité', sequence: 3,
          grossAmount: 200000, discountAmount: 0, amountDue: 200000, amountPaid: 0,
          amountRemaining: 200000, currency: 'XOF', dueDate: '2027-04-15', status: 'DUE' }
      ]
    };
  }
}

@Injectable()
export class MockEnrollmentDataSource implements EnrollmentDataSource {
  search(query: PageQuery & { classroomId?: string; status?: string }):
      Observable<PageResponse<Enrollment>> {
    const filtered = MOCK_RECENT_ENROLLMENTS.filter((e) =>
      matches([e.studentName, e.studentNumber, e.enrollmentNumber], query.search) &&
      (!query.classroomId || e.classroomId === query.classroomId) &&
      (!query.status || e.status === query.status));
    return of(paginate(filtered, query)).pipe(delay(LATENCY));
  }

  /** Mirrors the backend preview: reports every blocker at once. */
  check(_studentId: string, classroomId: string): Observable<EnrollmentCheckResult> {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === classroomId) ?? MOCK_CLASSROOMS[0];
    const blockers: string[] = [];
    const warnings: string[] = [];
    if (classroom.capacityStatus === 'FULL' || classroom.capacityStatus === 'OVER_CAPACITY') {
      blockers.push('CLASS_CAPACITY_EXCEEDED');
    } else if (classroom.capacityStatus === 'WARNING') {
      warnings.push('CLASS_CAPACITY_WARNING');
    }
    return of({
      allowed: blockers.length === 0,
      blockers,
      warnings,
      capacityMaximum: classroom.capacityMaximum,
      occupiedSeats: classroom.activeEnrollments,
      availableSeats: classroom.availableSeats,
      projectedAvailableSeats: classroom.projectedAvailableSeats ?? classroom.availableSeats
    }).pipe(delay(LATENCY));
  }

  create(_payload: unknown): Observable<Enrollment> {
    return of(MOCK_RECENT_ENROLLMENTS[0]).pipe(delay(400));
  }

  validate(_id: string): Observable<Enrollment> {
    return of({ ...MOCK_RECENT_ENROLLMENTS[0], status: 'ACTIVE' as const }).pipe(delay(300));
  }
}

@Injectable()
export class MockClassroomDataSource implements ClassroomDataSource {
  /**
   * Demo mode writes to this array rather than to MOCK_CLASSROOMS.
   *
   * A class created during a demonstration has to appear in the list right
   * away, otherwise the button looks broken — which is exactly the complaint
   * this screen was rebuilt to fix.
   */
  private readonly store: Classroom[] = [...MOCK_CLASSROOMS];

  list(): Observable<Classroom[]> {
    return of([...this.store]).pipe(delay(LATENCY));
  }

  search(query: PageQuery & { levelId?: string }): Observable<PageResponse<Classroom>> {
    const filtered = MOCK_CLASSROOMS.filter((c) =>
      matches([c.name, c.code, c.levelName], query.search) &&
      (!query.levelId || c.levelId === query.levelId));
    return of(paginate(filtered, query)).pipe(delay(LATENCY));
  }

  getById(id: string): Observable<Classroom> {
    return of(MOCK_CLASSROOMS.find((c) => c.id === id) ?? MOCK_CLASSROOMS[0]).pipe(delay(LATENCY));
  }

  getStudents(classroomId: string): Observable<StudentSummary[]> {
    return of(MOCK_STUDENTS.filter((s) => s.classroomId === classroomId)).pipe(delay(LATENCY));
  }

  levelCapacities(): Observable<LevelCapacity[]> {
    const byLevel = new Map<string, Classroom[]>();
    this.store.forEach((c) => {
      const bucket = byLevel.get(c.levelId);
      if (bucket) {
        bucket.push(c);
      } else {
        byLevel.set(c.levelId, [c]);
      }
    });

    const levels: LevelCapacity[] = [];
    let sequence = 1;
    byLevel.forEach((classes, levelId) => {
      const totalCapacity = classes.reduce((sum, c) => sum + c.capacityMaximum, 0);
      const totalEnrolled = classes.reduce((sum, c) => sum + c.activeEnrollments, 0);
      const rate = totalCapacity === 0 ? 0 : Math.round((totalEnrolled * 100) / totalCapacity);
      levels.push({
        levelId,
        levelName: classes[0].levelName,
        levelCode: classes[0].levelName.toUpperCase(),
        cycleName: 'College',
        sequence: sequence++,
        classroomCount: classes.length,
        totalCapacity,
        totalEnrolled,
        availableSeats: totalCapacity - totalEnrolled,
        occupancyRate: rate,
        needsMoreClasses: rate >= 85,
        suggestedName: `${classes[0].levelName} ${this.nextLetter(classes)}`,
        suggestedCode: `${classes[0].levelName.toUpperCase()}-${this.nextLetter(classes)}`,
        suggestedCapacity: classes[0].capacityMaximum
      });
    });
    return of(levels).pipe(delay(LATENCY));
  }

  create(payload: ClassroomCreatePayload): Observable<Classroom> {
    return of(this.build(payload)).pipe(delay(LATENCY));
  }

  createMany(payload: ClassroomBulkCreatePayload): Observable<Classroom[]> {
    const created: Classroom[] = [];
    for (let i = 0; i < payload.count; i++) {
      // Sequential on purpose: each build reads the classes added just before,
      // so the letters continue instead of colliding.
      created.push(this.build({
        levelId: payload.levelId,
        capacityMaximum: payload.capacityMaximum,
        activateImmediately: payload.activateImmediately
      }));
    }
    return of(created).pipe(delay(LATENCY));
  }

  /** Creates the class and stores it, synchronously. */
  private build(payload: ClassroomCreatePayload): Classroom {
    const siblings = this.store.filter((c) => c.levelId === payload.levelId);
    const reference = siblings[0];
    const letter = this.nextLetter(siblings);
    const levelName = reference?.levelName ?? 'Niveau';
    const created: Classroom = {
      id: `c-${createUuid().slice(0, 8)}`,
      code: payload.code || `${levelName.toUpperCase()}-${letter}`,
      name: payload.name || `${levelName} ${letter}`,
      levelId: payload.levelId,
      levelName,
      campusId: reference?.campusId ?? 'cp-1',
      academicYearId: reference?.academicYearId ?? 'ay-2026-2027',
      capacityMaximum: payload.capacityMaximum,
      activeEnrollments: 0,
      availableSeats: payload.capacityMaximum,
      projectedAvailableSeats: payload.capacityMaximum,
      occupancyRate: 0,
      capacityStatus: 'AVAILABLE',
      status: payload.activateImmediately === false ? 'DRAFT' : 'ACTIVE'
    };
    this.store.push(created);
    return created;
  }

  update(id: string, payload: ClassroomUpdatePayload): Observable<Classroom> {
    const index = this.store.findIndex((c) => c.id === id);
    const current = this.store[index];
    const updated: Classroom = {
      ...current,
      name: payload.name,
      capacityMaximum: payload.capacityMaximum,
      availableSeats: payload.capacityMaximum - current.activeEnrollments,
      occupancyRate: payload.capacityMaximum === 0
        ? 0
        : Math.round((current.activeEnrollments * 100) / payload.capacityMaximum)
    };
    this.store[index] = updated;
    return of(updated).pipe(delay(LATENCY));
  }

  activate(id: string): Observable<Classroom> {
    const index = this.store.findIndex((c) => c.id === id);
    this.store[index] = { ...this.store[index], status: 'ACTIVE' };
    return of(this.store[index]).pipe(delay(LATENCY));
  }

  close(id: string): Observable<Classroom> {
    const index = this.store.findIndex((c) => c.id === id);
    this.store[index] = { ...this.store[index], status: 'CLOSED' };
    return of(this.store[index]).pipe(delay(LATENCY));
  }

  /** Same rule as the server: read the names, never count them. */
  private nextLetter(siblings: Classroom[]): string {
    let highest = '';
    siblings.forEach((c) => {
      const last = c.name.trim().slice(-1).toUpperCase();
      if (last >= 'A' && last <= 'Z' && last > highest) {
        highest = last;
      }
    });
    if (!highest) {
      return 'A';
    }
    return highest >= 'Z' ? 'Z' : String.fromCharCode(highest.charCodeAt(0) + 1);
  }
}

@Injectable()
export class MockTeacherDataSource implements TeacherDataSource {
  create(payload: import('../../models/teacher.models').TeacherCreatePayload): Observable<Teacher> {
    if (MOCK_TEACHERS.some(t => t.email.toLowerCase() === payload.email.toLowerCase())) {
      return throwError(() => ({ status: 409 }));
    }
    const teacher: Teacher = {
      ...payload, id: createUuid(), employeeNumber: `ENS-DEMO-${MOCK_TEACHERS.length + 1}`,
      fullName: `${payload.firstName} ${payload.lastName}`, status: 'ACTIVE', classCount: 0
    };
    MOCK_TEACHERS.unshift(teacher);
    return of(teacher).pipe(delay(LATENCY));
  }
  search(query: PageQuery): Observable<PageResponse<Teacher>> {
    const filtered = MOCK_TEACHERS.filter((t) =>
      matches([t.fullName, t.employeeNumber, t.speciality ?? ''], query.search));
    return of(paginate(filtered, query)).pipe(delay(LATENCY));
  }

  getById(id: string): Observable<Teacher> {
    return of(MOCK_TEACHERS.find((t) => t.id === id) ?? MOCK_TEACHERS[0]).pipe(delay(LATENCY));
  }

  myClasses(): Observable<Classroom[]> {
    return of(MOCK_CLASSROOMS.slice(0, 4)).pipe(delay(LATENCY));
  }
}

/**
 * Attendance in demonstration mode, backed by a register that remembers.
 *
 * <p>The state lives in {@link MOCK_ATTENDANCE} rather than in this class: a
 * sheet validated here has to still be validated when the follow-up tab asks,
 * and an absence justified at the office has to leave the list. Answering each
 * call from a fresh snapshot would produce a screen nobody can work with.</p>
 */
@Injectable()
export class MockAttendanceDataSource implements AttendanceDataSource {
  day(date: string): Observable<AttendanceDay> {
    return of(MOCK_ATTENDANCE.day(date)).pipe(delay(LATENCY));
  }

  /**
   * Aucun cours en démonstration : les données factices n'ont pas d'emploi du
   * temps rattaché aux classes. Rendre une liste inventée ferait ouvrir des
   * appels pour des cours qui n'existent pas.
   */
  lessons(classroomId: string, date: string): Observable<LessonSlot[]> {
    return of([]).pipe(delay(120));
  }

  openSheet(classroomId: string, date: string, subjectId?: string): Observable<AttendanceSheet> {
    const sheet = MOCK_ATTENDANCE.sheet(classroomId, date);
    return of(subjectId
      ? { ...sheet, subjectId, subjectName: MOCK_SUBJECTS.find((s) => s.id === subjectId)?.name }
      : sheet).pipe(delay(LATENCY));
  }

  submitSheet(sheet: AttendanceSheet): Observable<AttendanceSheet> {
    return of(MOCK_ATTENDANCE.submit(sheet)).pipe(delay(350));
  }

  absences(query: AbsenceQuery): Observable<AbsenceDigest> {
    return of(MOCK_ATTENDANCE.absences(query)).pipe(delay(LATENCY));
  }

  justify(attendanceId: string, payload: JustifyPayload): Observable<Absence> {
    return of(MOCK_ATTENDANCE.justify(attendanceId, payload)).pipe(delay(300));
  }

  remind(attendanceId: string): Observable<Absence> {
    return of(MOCK_ATTENDANCE.remind(attendanceId)).pipe(delay(300));
  }
}

/**
 * Assessments in demonstration mode, backed by a board that remembers.
 *
 * <p>The state lives in {@link MOCK_ASSESSMENTS}: a paper validated here has to
 * leave the office's queue and stay out of it. Answering each call from a fresh
 * snapshot would produce a workflow that never advances.</p>
 */
@Injectable()
export class MockGradeDataSource implements GradeDataSource {
  board(query: AssessmentQuery): Observable<AssessmentBoard> {
    return of(MOCK_ASSESSMENTS.board(query)).pipe(delay(LATENCY));
  }

  createAssessment(payload: AssessmentUpsertPayload): Observable<AssessmentItem> {
    return of(MOCK_ASSESSMENTS.create(payload)).pipe(delay(350));
  }

  updateAssessment(id: string, payload: AssessmentUpsertPayload): Observable<AssessmentItem> {
    return of(MOCK_ASSESSMENTS.update(id, payload)).pipe(delay(350));
  }

  changeStatus(id: string, target: AssessmentStatus): Observable<AssessmentItem> {
    return of(MOCK_ASSESSMENTS.changeStatus(id, target)).pipe(delay(300));
  }

  gradeSheet(assessmentId: string): Observable<GradeSheet> {
    return of(MOCK_ASSESSMENTS.sheet(assessmentId)).pipe(delay(LATENCY));
  }

  saveGrades(assessmentId: string, entries: GradeEntryPayload[]): Observable<GradeSheet> {
    return of(MOCK_ASSESSMENTS.saveGrades(assessmentId, entries)).pipe(delay(350));
  }

  submitGrades(assessmentId: string): Observable<GradeSheet> {
    return of(MOCK_ASSESSMENTS.submit(assessmentId)).pipe(delay(350));
  }

  validateGrades(assessmentId: string): Observable<GradeSheet> {
    return of(MOCK_ASSESSMENTS.validate(assessmentId)).pipe(delay(350));
  }

  publishGrades(assessmentId: string): Observable<GradeSheet> {
    return of(MOCK_ASSESSMENTS.publish(assessmentId)).pipe(delay(350));
  }

  correctGrade(gradeId: string, payload: GradeCorrectionPayload): Observable<GradeSheet> {
    return of(MOCK_ASSESSMENTS.correct(gradeId, payload)).pipe(delay(350));
  }
}

@Injectable()
export class MockFinanceDataSource implements FinanceDataSource {
  private readonly paymentsByOperation = new Map<string, Payment>();

  getPayment(id: string): Observable<Payment> {
    const payment = MOCK_RECENT_PAYMENTS.find((item) => item.id === id);
    return payment ? of({ ...payment }).pipe(delay(LATENCY))
      : throwError(() => new Error('Paiement introuvable.'));
  }

  cancelPayment(id: string, reason: string): Observable<Payment> {
    return defer(() => {
      const payment = MOCK_RECENT_PAYMENTS.find((item) => item.id === id);
      if (!payment || payment.status !== 'VALIDATED' || !reason.trim()) {
        return throwError(() => new Error('Annulation impossible.'));
      }
      payment.status = 'CANCELLED';
      payment.allocatedAmount = 0;
      payment.unallocatedAmount = 0;
      payment.allocations = [];
      return of({ ...payment });
    }).pipe(delay(LATENCY));
  }

  searchPayments(query: PageQuery): Observable<PageResponse<Payment>> {
    const filtered = MOCK_RECENT_PAYMENTS.filter((p) =>
      matches([p.studentName, p.studentNumber, p.paymentReference, p.receiptNumber ?? ''],
        query.search));
    return of(paginate(filtered, query)).pipe(delay(LATENCY));
  }

  recordPayment(rawPayload: unknown): Observable<Payment> {
    const payload = rawPayload as {
      studentId: string;
      amount: number;
      paymentMethod: Payment['paymentMethod'];
      paymentDate: string;
      externalReference?: string;
      payerName?: string;
      operationId: string;
    };
    const replay = this.paymentsByOperation.get(payload.operationId);
    if (replay) {
      return of(replay).pipe(delay(250));
    }

    const student = MOCK_STUDENTS.find((item) => item.id === payload.studentId)
      ?? MOCK_STUDENTS[0];
    const sequence = MOCK_RECENT_PAYMENTS.length + 1;
    const amount = Number(payload.amount);
    const outstandingBefore = 200000;
    const payment: Payment = {
      id: createUuid(),
      paymentReference: `PAY-2026-${String(sequence).padStart(8, '0')}`,
      studentId: student.id,
      studentNumber: student.studentNumber,
      studentName: student.fullName,
      amount,
      allocatedAmount: Math.min(amount, outstandingBefore),
      unallocatedAmount: Math.max(0, amount - outstandingBefore),
      currency: 'XOF',
      paymentMethod: payload.paymentMethod,
      paymentDate: payload.paymentDate,
      status: 'VALIDATED',
      externalReference: payload.externalReference,
      payerName: payload.payerName,
      receiptNumber: `REC-2026-${String(1234 + sequence).padStart(8, '0')}`,
      outstandingAfterPayment: Math.max(0, outstandingBefore - amount),
      allocations: []
    };
    this.paymentsByOperation.set(payload.operationId, payment);
    MOCK_RECENT_PAYMENTS.unshift(payment);
    return of(payment).pipe(delay(450));
  }

  getStudentSummary(studentId: string): Observable<FinancialSummary> {
    return new MockStudentDataSource().getFinancialSummary(studentId);
  }

  outstanding(query: OutstandingQuery): Observable<OutstandingBoard> {
    const delays = [74, 51, 36, 28, 20, 14, 9, 5, 2, 0, 0, 0, 43, 17, 7, 0, 31, 12];
    const amounts = [385000, 240000, 175000, 325000, 96000, 210000, 150000, 75000,
      120000, 200000, 85000, 300000, 165000, 110000, 60000, 190000, 275000, 135000];
    const allRows: OutstandingStudent[] = MOCK_STUDENTS.slice(0, delays.length)
      .map((student, index) => {
        const daysOverdue = delays[index];
        const outstandingAmount = amounts[index];
        return {
          studentId: student.id,
          studentNumber: student.studentNumber,
          studentName: student.fullName,
          photoUrl: student.photoUrl,
          classroomName: student.classroomName,
          guardianName: index % 2 === 0 ? `Mariam ${student.lastName}` : `Yacouba ${student.lastName}`,
          guardianPhone: `+225 07 0${index % 10} 2${index % 10} 4${index % 10} 6${index % 10}`,
          outstandingAmount,
          overdueAmount: daysOverdue > 0 ? outstandingAmount : 0,
          currency: 'XOF',
          oldestDueDate: dateFromToday(daysOverdue > 0 ? -daysOverdue : index % 12 + 2),
          daysOverdue,
          instalmentCount: 1 + index % 3
        };
      });

    const bucket = query.bucket ?? 'ALL';
    const filtered = allRows
      .filter((row) => matches([
        row.studentName, row.studentNumber, row.classroomName ?? '', row.guardianName ?? ''
      ], query.search))
      .filter((row) => bucket === 'ALL'
        || (bucket === 'OVERDUE' && row.daysOverdue > 0)
        || (bucket === 'CRITICAL' && row.daysOverdue >= 30)
        || (bucket === 'DUE_SOON' && row.daysOverdue === 0))
      .sort((left, right) => right.daysOverdue - left.daysOverdue
        || right.outstandingAmount - left.outstandingAmount);

    const board: OutstandingBoard = {
      totalOutstanding: allRows.reduce((sum, row) => sum + row.outstandingAmount, 0),
      overdueAmount: allRows.reduce((sum, row) => sum + row.overdueAmount, 0),
      studentCount: allRows.length,
      criticalCount: allRows.filter((row) => row.daysOverdue >= 30).length,
      currency: 'XOF',
      students: paginate(filtered, query)
    };
    return of(board).pipe(delay(LATENCY));
  }

  // ------------------------------------------- réductions de scolarité

  /**
   * Demandes de réduction de la démo, avec un circuit à deux niveaux : une
   * demande au premier palier, une au second, et une déjà appliquée.
   */
  private discountStore: DiscountRequest[] = [
    {
      id: 'dr-1',
      reference: 'RED-2026-0001',
      studentId: MOCK_STUDENTS[0].id,
      studentNumber: MOCK_STUDENTS[0].studentNumber,
      studentName: MOCK_STUDENTS[0].fullName,
      label: 'Réduction fratrie (3 enfants inscrits)',
      reason: 'Politique familiale : trois enfants dans l’établissement.',
      discountType: 'PERCENTAGE',
      value: 15,
      computedAmount: 90000,
      status: 'SUBMITTED',
      currentLevel: 1,
      totalLevels: 2,
      createdAt: new Date().toISOString(),
      awaitingMyDecision: true,
      levels: [
        { levelNumber: 1, name: 'Intendance', roleCode: 'ACCOUNTANT', roleLabel: 'Comptable',
          status: 'PENDING' },
        { levelNumber: 2, name: 'Direction', roleCode: 'DIRECTOR', roleLabel: 'Directeur',
          status: 'PENDING' }
      ]
    },
    {
      id: 'dr-2',
      reference: 'RED-2026-0002',
      studentId: MOCK_STUDENTS[1].id,
      studentNumber: MOCK_STUDENTS[1].studentNumber,
      studentName: MOCK_STUDENTS[1].fullName,
      label: 'Bourse d’excellence 2026',
      reason: 'Premier de sa classe au trimestre précédent.',
      discountType: 'FIXED_AMOUNT',
      value: 150000,
      computedAmount: 150000,
      status: 'SUBMITTED',
      currentLevel: 2,
      totalLevels: 2,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      awaitingMyDecision: true,
      levels: [
        { levelNumber: 1, name: 'Intendance', roleCode: 'ACCOUNTANT', roleLabel: 'Comptable',
          status: 'APPROVED', approverName: 'Awa Traoré',
          comment: 'Situation financière vérifiée.', decidedAt: new Date().toISOString() },
        { levelNumber: 2, name: 'Direction', roleCode: 'DIRECTOR', roleLabel: 'Directeur',
          status: 'PENDING' }
      ]
    },
    {
      id: 'dr-3',
      reference: 'RED-2026-0003',
      studentId: MOCK_STUDENTS[2].id,
      studentNumber: MOCK_STUDENTS[2].studentNumber,
      studentName: MOCK_STUDENTS[2].fullName,
      label: 'Réduction sportive',
      reason: 'Sélection régionale d’athlétisme.',
      discountType: 'PERCENTAGE',
      value: 25,
      computedAmount: 150000,
      status: 'EFFECTIVE',
      currentLevel: 2,
      totalLevels: 2,
      createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
      effectiveAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      awaitingMyDecision: false,
      levels: [
        { levelNumber: 1, name: 'Intendance', roleCode: 'ACCOUNTANT', roleLabel: 'Comptable',
          status: 'APPROVED', approverName: 'Awa Traoré', decidedAt: new Date().toISOString() },
        { levelNumber: 2, name: 'Direction', roleCode: 'DIRECTOR', roleLabel: 'Directeur',
          status: 'APPROVED', approverName: 'Dr Konan', decidedAt: new Date().toISOString() }
      ]
    }
  ];

  private discountSequence = 3;

  discountRequests(query: { status?: string; studentId?: string } = {}): Observable<DiscountRequest[]> {
    const rows = this.discountStore
      .filter((row) => !query.status || row.status === query.status)
      .filter((row) => !query.studentId || row.studentId === query.studentId);
        return of(rows.map((row) => ({ ...row, levels: row.levels.map((l: DiscountLevel) => ({ ...l })) })))
      .pipe(delay(LATENCY));
  }

  discountRequest(id: string): Observable<DiscountRequest> {
    const found = this.discountStore.find((row) => row.id === id);
        return found
      ? of({ ...found, levels: found.levels.map((l: DiscountLevel) => ({ ...l })) }).pipe(delay(LATENCY))
      : throwError(() => new Error('Demande de réduction introuvable.'));
  }

  createDiscountRequest(payload: DiscountRequestPayload): Observable<DiscountRequest> {
    const student = MOCK_STUDENTS.find((item) => item.id === payload.studentId)
      ?? MOCK_STUDENTS[0];
    const due = 600000;
    const computed = payload.discountType === 'PERCENTAGE'
      ? Math.round(due * payload.value / 100)
      : Math.min(payload.value, due);
    const created: DiscountRequest = {
      id: `dr-${++this.discountSequence}`,
      reference: `RED-2026-${String(this.discountSequence).padStart(4, '0')}`,
      studentId: student.id,
      studentNumber: student.studentNumber,
      studentName: student.fullName,
      label: payload.label,
      reason: payload.reason,
      discountType: payload.discountType,
      value: payload.value,
      computedAmount: computed,
      status: 'SUBMITTED',
      currentLevel: 1,
      totalLevels: payload.levels.length,
      createdAt: new Date().toISOString(),
      awaitingMyDecision: true,
      levels: payload.levels.map((level, index) => ({
        levelNumber: index + 1,
        name: level.name,
        roleCode: level.roleCode,
        roleLabel: level.roleCode,
        status: 'PENDING' as const
      }))
    };
    this.discountStore = [created, ...this.discountStore];
    return of(created).pipe(delay(LATENCY));
  }

  decideDiscountRequest(id: string,
                        payload: DiscountDecisionPayload): Observable<DiscountRequest> {
    return defer(() => {
      const row = this.discountStore.find((item) => item.id === id);
      if (!row || row.status !== 'SUBMITTED') {
        return throwError(() => new Error('Cette demande n’est plus en attente de décision.'));
      }
      const level = row.levels.find((l) => l.levelNumber === row.currentLevel);
      if (!level) {
        return throwError(() => new Error('Palier introuvable.'));
      }
      const approved = payload.decision === 'APPROVE';
      level.status = approved ? 'APPROVED' : 'REJECTED';
      level.comment = payload.comment;
      level.approverName = 'Vous';
      level.decidedAt = new Date().toISOString();
      if (!approved) {
        row.status = 'REJECTED';
        row.rejectionReason = payload.comment;
      } else if (level.levelNumber < row.totalLevels) {
        row.currentLevel = level.levelNumber + 1;
      } else {
        row.status = 'APPROVED';
      }
      row.awaitingMyDecision = row.status === 'SUBMITTED';
            return of({ ...row, levels: row.levels.map((l: DiscountLevel) => ({ ...l })) });
    }).pipe(delay(LATENCY));
  }

  applyDiscountRequest(id: string): Observable<DiscountRequest> {
    return defer(() => {
      const row = this.discountStore.find((item) => item.id === id);
      if (!row || row.status !== 'APPROVED') {
        return throwError(() => new Error('La réduction doit être approuvée avant application.'));
      }
      row.status = 'EFFECTIVE';
      row.effectiveAt = new Date().toISOString();
      row.awaitingMyDecision = false;
      return of({ ...row, levels: row.levels.map((l: DiscountLevel) => ({ ...l })) });
    }).pipe(delay(LATENCY));
  }
}

@Injectable()
export class MockDashboardDataSource implements DashboardDataSource {
  load(): Observable<DashboardData> {
    return of({ ...MOCK_DASHBOARD, generatedAt: new Date().toISOString() }).pipe(delay(320));
  }
}

/**
 * Report cards in demonstration mode, computed from the marks and remembered.
 *
 * <p>The averages come from {@link MOCK_ASSESSMENTS} and from nowhere else: a
 * bulletin that disagreed with the grade sheet two clicks away would never be
 * trusted again.</p>
 */
@Injectable()
export class MockReportCardDataSource implements ReportCardDataSource {
  batch(query: ReportCardQuery): Observable<ReportCardBatch> {
    return of(MOCK_REPORT_CARDS.batch(query)).pipe(delay(LATENCY));
  }

  generate(payload: ReportCardGeneratePayload): Observable<ReportCardBatch> {
    // Une classe entière : plus long qu'un enregistrement ordinaire, et l'écran
    // doit le montrer.
    return of(MOCK_REPORT_CARDS.generate(payload)).pipe(delay(700));
  }

  getById(reportCardId: string): Observable<ReportCard> {
    return of(MOCK_REPORT_CARDS.getById(reportCardId)).pipe(delay(LATENCY));
  }

  remark(reportCardId: string, payload: ReportCardRemarkPayload): Observable<ReportCard> {
    return of(MOCK_REPORT_CARDS.remark(reportCardId, payload)).pipe(delay(300));
  }

  publish(reportCardId: string): Observable<ReportCard> {
    return of(MOCK_REPORT_CARDS.publish(reportCardId)).pipe(delay(350));
  }

  publishAll(query: ReportCardQuery): Observable<ReportCardBatch> {
    return of(MOCK_REPORT_CARDS.publishAll(query)).pipe(delay(600));
  }

  verify(code: string): Observable<ReportCard> {
    return of(MOCK_REPORT_CARDS.verify(code)).pipe(delay(LATENCY));
  }
}

/** Councils in demonstration mode retain the same lifecycle as the API. */
@Injectable()
export class MockCouncilDataSource implements CouncilDataSource {
  list(query: CouncilQuery = {}): Observable<CouncilSummary[]> {
    return defer(() => of(MOCK_COUNCILS.list(query))).pipe(delay(LATENCY));
  }

  get(councilId: string): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.get(councilId))).pipe(delay(LATENCY));
  }

  create(payload: CouncilCreatePayload): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.create(payload))).pipe(delay(350));
  }

  update(councilId: string, payload: CouncilUpdatePayload): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.update(councilId, payload))).pipe(delay(300));
  }

  start(councilId: string): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.start(councilId))).pipe(delay(300));
  }

  close(councilId: string): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.close(councilId))).pipe(delay(400));
  }

  addParticipant(councilId: string, payload: CouncilParticipantPayload): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.addParticipant(councilId, payload))).pipe(delay(300));
  }

  removeParticipant(councilId: string, participantId: string): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.removeParticipant(councilId, participantId))).pipe(delay(250));
  }

  setParticipantPresence(councilId: string, participantId: string,
                         present: boolean): Observable<Council> {
    return defer(() => of(MOCK_COUNCILS.setPresence(councilId, participantId, present)))
      .pipe(delay(250));
  }

  recordDecision(councilId: string,
                 payload: CouncilDecisionPayload): Observable<CouncilStudentDecision> {
    return defer(() => of(MOCK_COUNCILS.recordDecision(councilId, payload))).pipe(delay(300));
  }
}

/**
 * Options in demonstration mode, with the capacity rules of the server.
 *
 * <p>A wish beyond capacity is waitlisted rather than refused, and cancelling
 * a confirmed place frees a seat. A demo that only ever confirmed would make
 * the waiting list look like decoration.</p>
 */
@Injectable()
export class MockOptionDataSource implements OptionDataSource {
  overview(): Observable<OptionOverview> {
    return of(MOCK_OPTIONS.overview()).pipe(delay(LATENCY));
  }

  create(payload: OptionUpsertPayload): Observable<OptionOverview> {
    return of(MOCK_OPTIONS.create(payload)).pipe(delay(350));
  }

  update(optionId: string, payload: OptionUpsertPayload): Observable<OptionOverview> {
    return of(MOCK_OPTIONS.update(optionId, payload)).pipe(delay(350));
  }

  archive(optionId: string): Observable<OptionOverview> {
    return of(MOCK_OPTIONS.archive(optionId)).pipe(delay(300));
  }

  saveOfferings(optionId: string,
                payload: OptionOfferingsSavePayload): Observable<OptionOverview> {
    return of(MOCK_OPTIONS.saveOfferings(optionId, payload)).pipe(delay(400));
  }

  choices(query: OptionChoiceQuery): Observable<PageResponse<OptionChoice>> {
    return of(MOCK_OPTIONS.choicesPage(query)).pipe(delay(LATENCY));
  }

  assign(payload: OptionChoiceAssignPayload): Observable<OptionChoice> {
    return of(MOCK_OPTIONS.assign(payload)).pipe(delay(350));
  }

  changeChoiceStatus(choiceId: string, status: OptionChoiceStatus): Observable<OptionChoice> {
    return of(MOCK_OPTIONS.changeStatus(choiceId, status)).pipe(delay(300));
  }
}

/**
 * Movements in demonstration mode, with the register the screen changes.
 *
 * <p>A pupil struck off leaves the class lists, and a cancelled departure puts
 * them back. Without that the cancellation would only have corrected a line on
 * screen.</p>
 */
@Injectable()
export class MockTransferDataSource implements TransferDataSource {
  board(search?: string): Observable<TransferBoard> {
    return of(MOCK_TRANSFERS.board(search)).pipe(delay(LATENCY));
  }

  changeClass(payload: ClassChangePayload): Observable<ClassChange> {
    return of(MOCK_TRANSFERS.changeClass(payload)).pipe(delay(350));
  }

  recordDeparture(payload: DepartureRecordPayload): Observable<Departure> {
    return of(MOCK_TRANSFERS.recordDeparture(payload)).pipe(delay(400));
  }

  updateDocuments(departureId: string,
                  payload: DepartureDocumentsPayload): Observable<Departure> {
    return of(MOCK_TRANSFERS.updateDocuments(departureId, payload)).pipe(delay(300));
  }

  clearDeparture(departureId: string): Observable<Departure> {
    return of(MOCK_TRANSFERS.clear(departureId)).pipe(delay(350));
  }

  cancelDeparture(departureId: string, reason: string): Observable<Departure> {
    return of(MOCK_TRANSFERS.cancel(departureId, reason)).pipe(delay(350));
  }
}

@Injectable()
export class MockReferenceDataSource implements ReferenceDataSource {
  academicYears(): Observable<AcademicYear[]> {
    return of([MOCK_ACADEMIC_YEAR]).pipe(delay(LATENCY));
  }

  terms(): Observable<Term[]> {
    return of(MOCK_TERMS).pipe(delay(LATENCY));
  }

  subjects(): Observable<Subject[]> {
    return of(MOCK_SUBJECTS).pipe(delay(LATENCY));
  }

  globalSearch(term: string): Observable<GlobalSearchResult[]> {
    const needle = term.toLowerCase();
    const students: GlobalSearchResult[] = MOCK_STUDENTS
      .filter((s) => s.fullName.toLowerCase().includes(needle)
        || s.studentNumber.toLowerCase().includes(needle))
      .slice(0, 5)
      .map((s) => ({
        type: 'STUDENT', id: s.id, primaryLabel: s.fullName,
        secondaryLabel: `${s.studentNumber} — ${s.classroomName}`,
        routerLink: `/students/${s.id}`
      }));

    const classes: GlobalSearchResult[] = MOCK_CLASSROOMS
      .filter((c) => c.name.toLowerCase().includes(needle))
      .slice(0, 3)
      .map((c) => ({
        type: 'CLASSROOM', id: c.id, primaryLabel: c.name,
        secondaryLabel: `${c.activeEnrollments}/${c.capacityMaximum} eleves`,
        routerLink: `/classes/${c.id}`
      }));

    return of([...students, ...classes]).pipe(delay(180));
  }
}

/**
 * Demo timetable.
 *
 * <p>Conflict detection is reproduced here rather than stubbed out. A demo that
 * accepts two courses on the same slot teaches the wrong thing about the
 * product, and the rule is three lines.</p>
 */
@Injectable()
export class MockTimetableDataSource implements TimetableDataSource {
  private readonly days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  /**
   * Salles de la démo, reprises de l'écran Salles par leur code.
   *
   * <p>La classe suit ses cours dans sa salle habituelle, sauf les sciences :
   * c'est ce qui rend la vue « par salle » démonstrative plutôt que vide.</p>
   */
  private readonly usualRoomId = mockRoomId('B-201');
  private readonly labRoomId = mockRoomId('A-SCI');
  private slots: TimetableSlot[] = this.seed();
  private sequence = 100;

  classroomGrid(classroomId: string): Observable<TimetableGrid> {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === classroomId) ?? MOCK_CLASSROOMS[0];
    return of(this.grid('CLASSROOM', classroom.id, classroom.name, true,
      this.slots.filter((s) => s.classroomId === classroom.id))).pipe(delay(LATENCY));
  }

  teacherGrid(teacherId: string): Observable<TimetableGrid> {
    const teacher = MOCK_TEACHERS.find((t) => t.id === teacherId) ?? MOCK_TEACHERS[0];
    return of(this.grid('TEACHER', teacher.id, teacher.fullName, false,
      this.slots.filter((s) => s.teacherId === teacher.id))).pipe(delay(LATENCY));
  }

  roomGrid(roomId: string): Observable<TimetableGrid> {
    return of(this.grid('ROOM', roomId, mockRoomName(roomId) ?? 'Salle inconnue', false,
      this.slots.filter((s) => s.roomId === roomId))).pipe(delay(LATENCY));
  }

  palette(classroomId: string): Observable<PaletteEntry[]> {
    const entries = MOCK_SUBJECTS.map((subject, index) => {
      const teacher = MOCK_TEACHERS[index % MOCK_TEACHERS.length];
      const placed = this.slots
        .filter((s) => s.classroomId === classroomId && s.subjectId === subject.id)
        .reduce((sum, s) => sum + s.durationMinutes, 0);
      const weeklyHours = subject.code === 'MAT' || subject.code === 'FRA' ? 5 : 2;
      return {
        subjectId: subject.id,
        subjectName: subject.name,
        subjectShortName: subject.shortName,
        subjectColor: subject.colorHex,
        teacherId: teacher.id,
        teacherName: teacher.fullName,
        weeklyHours,
        placedMinutes: placed,
        complete: placed >= weeklyHours * 60,
        // La salle habituelle part avec la matière : le glisser ne laisse plus
        // le cours sans lieu, et le contrôle de conflit de salle s'applique.
        roomId: this.usualRoomId,
        roomName: mockRoomName(this.usualRoomId)
      };
    });
    return of(entries).pipe(delay(LATENCY));
  }

  check(payload: SlotUpsertPayload, excludeSlotId?: string): Observable<TimetableConflict[]> {
    return of(this.conflicts(payload, excludeSlotId)).pipe(delay(150));
  }

  createSlot(payload: SlotUpsertPayload): Observable<TimetableSlot> {
    const created = this.build(payload, `slot-${this.sequence++}`);
    this.slots.push(created);
    return of(created).pipe(delay(LATENCY));
  }

  updateSlot(slotId: string, payload: SlotUpsertPayload): Observable<TimetableSlot> {
    const index = this.slots.findIndex((s) => s.id === slotId);
    const updated = this.build(payload, slotId);
    this.slots[index] = updated;
    return of(updated).pipe(delay(LATENCY));
  }

  deleteSlot(slotId: string): Observable<void> {
    this.slots = this.slots.filter((s) => s.id !== slotId);
    return of(undefined).pipe(delay(LATENCY));
  }

  publish(classroomId: string): Observable<TimetableGrid> {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === classroomId) ?? MOCK_CLASSROOMS[0];
    const grid = this.grid('CLASSROOM', classroom.id, classroom.name, true,
      this.slots.filter((s) => s.classroomId === classroom.id));
    grid.status = 'PUBLISHED';
    return of(grid).pipe(delay(LATENCY));
  }

  settings(): Observable<TimetableSettings> {
    return of({
      days: [...this.days],
      dayStart: '07:00',
      dayEnd: '18:00',
      stepMinutes: 60
    }).pipe(delay(LATENCY));
  }

  updateSettings(payload: TimetableSettingsPayload): Observable<TimetableSettings> {
    if (payload.dayStart >= payload.dayEnd) {
      return throwError(() => ({
        error: { message: "L'heure de fin de journée doit être postérieure à l'heure de début." }
      })).pipe(delay(LATENCY));
    }
    this.days.splice(0, this.days.length, ...payload.days);
    return of({ ...payload }).pipe(delay(LATENCY));
  }

  // ------------------------------------------------------------- internals

  /** Same three overlap rules as the server. */
  private conflicts(payload: SlotUpsertPayload, excludeSlotId?: string): TimetableConflict[] {
    const found: TimetableConflict[] = [];
    if (payload.startTime >= payload.endTime) {
      return [{ kind: 'INVALID_TIME_RANGE',
        message: "L'heure de fin doit être postérieure à l'heure de début." }];
    }
    const overlaps = (slot: TimetableSlot): boolean =>
      slot.id !== excludeSlotId
      && slot.dayOfWeek === payload.dayOfWeek
      && slot.startTime < payload.endTime
      && payload.startTime < slot.endTime;

    this.slots.filter((s) => overlaps(s) && s.teacherId === payload.teacherId).forEach((s) => {
      found.push({ kind: 'TEACHER_BUSY', conflictingSlotId: s.id,
        message: `${s.teacherName} enseigne déjà en ${s.classroomName} de ${s.startTime} à ${s.endTime}.` });
    });
    this.slots.filter((s) => overlaps(s) && s.classroomId === payload.classroomId).forEach((s) => {
      found.push({ kind: 'CLASS_BUSY', conflictingSlotId: s.id,
        message: `${s.classroomName} suit déjà ${s.subjectName} de ${s.startTime} à ${s.endTime}.` });
    });
    if (payload.roomId) {
      this.slots.filter((s) => overlaps(s) && s.roomId === payload.roomId).forEach((s) => {
        found.push({ kind: 'ROOM_BUSY', conflictingSlotId: s.id,
          message: `La salle accueille déjà ${s.classroomName} de ${s.startTime} à ${s.endTime}.` });
      });
    }
    return found;
  }

  private build(payload: SlotUpsertPayload, id: string): TimetableSlot {
    const subject = MOCK_SUBJECTS.find((s) => s.id === payload.subjectId) ?? MOCK_SUBJECTS[0];
    const teacher = MOCK_TEACHERS.find((t) => t.id === payload.teacherId) ?? MOCK_TEACHERS[0];
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === payload.classroomId)
      ?? MOCK_CLASSROOMS[0];
    return {
      id,
      dayOfWeek: payload.dayOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime,
      durationMinutes: this.minutes(payload.startTime, payload.endTime),
      subjectId: subject.id,
      subjectName: subject.name,
      subjectShortName: subject.shortName,
      subjectColor: subject.colorHex,
      teacherId: teacher.id,
      teacherName: teacher.fullName,
      roomId: payload.roomId,
      roomName: payload.roomId ? mockRoomName(payload.roomId) : undefined,
      classroomId: classroom.id,
      classroomName: classroom.name,
      slotType: payload.slotType ?? 'COURSE',
      note: payload.note
    };
  }

  private grid(scope: 'CLASSROOM' | 'TEACHER' | 'ROOM', scopeId: string, scopeLabel: string,
               editable: boolean, slots: TimetableSlot[]): TimetableGrid {
    return {
      scope, scopeId, scopeLabel, editable,
      status: scope === 'CLASSROOM' ? 'DRAFT' : undefined,
      days: this.days,
      dayStart: '07:00',
      dayEnd: '18:00',
      stepMinutes: 60,
      slots: [...slots],
      totalMinutes: slots.reduce((sum, s) => sum + s.durationMinutes, 0)
    };
  }

  private minutes(start: string, end: string): number {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return (eh * 60 + em) - (sh * 60 + sm);
  }

  private seed(): TimetableSlot[] {
    const classroom = MOCK_CLASSROOMS[0];
    const plan: Array<[string, string, string, number, number]> = [
      ['MONDAY', '08:00', '10:00', 0, 0],
      ['MONDAY', '10:00', '12:00', 1, 1],
      ['TUESDAY', '08:00', '10:00', 2, 2],
      ['TUESDAY', '14:00', '16:00', 3, 0],
      ['WEDNESDAY', '08:00', '10:00', 0, 0],
      ['THURSDAY', '10:00', '12:00', 4, 1],
      ['FRIDAY', '08:00', '10:00', 5, 2]
    ];
    return plan.map(([day, start, end, subjectIndex, teacherIndex], i) => {
      const subject = MOCK_SUBJECTS[subjectIndex];
      const teacher = MOCK_TEACHERS[teacherIndex];
      // Les sciences quittent la salle habituelle : une salle n'accueille qu'un
      // cours à la fois, et la vue « par salle » doit le montrer.
      const roomId = subject.code === 'SVT' ? this.labRoomId : this.usualRoomId;
      return {
        id: `slot-${i + 1}`,
        dayOfWeek: day,
        startTime: start,
        endTime: end,
        durationMinutes: this.minutes(start, end),
        subjectId: subject.id,
        subjectName: subject.name,
        subjectShortName: subject.shortName,
        subjectColor: subject.colorHex,
        teacherId: teacher.id,
        teacherName: teacher.fullName,
        roomId,
        roomName: mockRoomName(roomId),
        classroomId: classroom.id,
        classroomName: classroom.name,
        slotType: 'COURSE'
      };
    });
  }
}

/**
 * Demo catalogue and programme.
 *
 * <p>The refusals are reproduced, not stubbed out: a subject already used by a
 * level cannot be archived, and a coefficient of zero is rejected. A demo that
 * accepts what the product refuses teaches the wrong thing.</p>
 */
@Injectable()
export class MockCurriculumDataSource implements CurriculumDataSource {
  private subjects: SubjectItem[] = MOCK_SUBJECTS.map((s) => ({
    id: s.id,
    code: s.code,
    name: s.name,
    shortName: s.shortName,
    category: (s.category ?? 'OTHER') as SubjectItem['category'],
    categoryLabel: this.categoryLabel(s.category ?? 'OTHER'),
    colorHex: s.colorHex,
    graded: s.graded !== false,
    status: 'ACTIVE',
    levelCount: 0,
    deletable: true
  }));

  private levelData: LevelCurriculum[] = this.seedLevels();
  private sequence = 500;

  listSubjects(includeArchived = false): Observable<SubjectItem[]> {
    // Recompté à chaque lecture, comme le fait le serveur : une matière
    // rattachée puis retirée redevient archivable sans rechargement.
    const counted = this.subjects.map((s) => {
      const levelCount = this.levelData
        .filter((l) => l.subjects.some((row) => row.subjectId === s.id)).length;
      return { ...s, levelCount, deletable: levelCount === 0 };
    });
    const list = includeArchived
      ? counted
      : counted.filter((s) => s.status === 'ACTIVE');
    return of(list).pipe(delay(LATENCY));
  }

  createSubject(payload: SubjectUpsertPayload): Observable<SubjectItem> {
    const created: SubjectItem = {
      id: `s-${this.sequence++}`,
      code: payload.code.toUpperCase(),
      name: payload.name,
      shortName: payload.shortName,
      category: payload.category,
      categoryLabel: this.categoryLabel(payload.category),
      colorHex: payload.colorHex,
      description: payload.description,
      graded: payload.graded,
      status: 'ACTIVE',
      levelCount: 0,
      deletable: true
    };
    this.subjects = [...this.subjects, created]
      .sort((a, b) => a.name.localeCompare(b.name));
    return of(created).pipe(delay(LATENCY));
  }

  updateSubject(id: string, payload: SubjectUpsertPayload): Observable<SubjectItem> {
    const index = this.subjects.findIndex((s) => s.id === id);
    const updated: SubjectItem = {
      ...this.subjects[index],
      code: payload.code.toUpperCase(),
      name: payload.name,
      shortName: payload.shortName,
      category: payload.category,
      categoryLabel: this.categoryLabel(payload.category),
      colorHex: payload.colorHex,
      description: payload.description,
      graded: payload.graded
    };
    this.subjects[index] = updated;
    return of(updated).pipe(delay(LATENCY));
  }

  archiveSubject(id: string): Observable<SubjectItem> {
    const index = this.subjects.findIndex((s) => s.id === id);
    const used = this.levelData
      .some((l) => l.subjects.some((row) => row.subjectId === id));
    if (used) {
      return throwError(() => ({
        status: 409,
        error: { code: 'SUBJECT_IN_USE' }
      }));
    }
    this.subjects[index] = { ...this.subjects[index], status: 'ARCHIVED' };
    return of(this.subjects[index]).pipe(delay(LATENCY));
  }

  restoreSubject(id: string): Observable<SubjectItem> {
    const index = this.subjects.findIndex((s) => s.id === id);
    this.subjects[index] = { ...this.subjects[index], status: 'ACTIVE' };
    return of(this.subjects[index]).pipe(delay(LATENCY));
  }

  levels(): Observable<LevelCurriculum[]> {
    return of(this.levelData.map((l) => ({ ...l, subjects: [...l.subjects] })))
      .pipe(delay(LATENCY));
  }

  upsertLevelSubject(levelId: string,
                     payload: CurriculumSubjectPayload): Observable<LevelCurriculum> {
    if (payload.coefficient <= 0) {
      return throwError(() => ({
        status: 400,
        error: { code: 'COEFFICIENT_OUT_OF_RANGE' }
      }));
    }
    this.write(levelId, payload);
    return of(this.recompute(levelId)).pipe(delay(LATENCY));
  }

  removeLevelSubject(levelId: string, subjectId: string): Observable<LevelCurriculum> {
    const level = this.levelData.find((l) => l.levelId === levelId);
    if (!level) {
      return throwError(() => ({ status: 404, error: { code: 'CURRICULUM_NOT_FOUND' } }));
    }
    const row = level.subjects.find((s) => s.subjectId === subjectId);
    if (row?.locked) {
      return throwError(() => ({
        status: 409,
        error: { code: 'CURRICULUM_SUBJECT_HAS_GRADES' }
      }));
    }
    level.subjects = level.subjects.filter((s) => s.subjectId !== subjectId);
    return of(this.recompute(levelId)).pipe(delay(LATENCY));
  }

  apply(payload: CurriculumApplyPayload): Observable<LevelCurriculum[]> {
    const touched: LevelCurriculum[] = [];
    payload.levelIds.forEach((levelId) => {
      const level = this.levelData.find((l) => l.levelId === levelId);
      if (!level) {
        return;
      }
      if (payload.replaceExisting) {
        // Une matière verrouillée survit au remplacement, comme sur le serveur.
        level.subjects = level.subjects.filter((s) => s.locked
          || payload.subjects.some((n) => n.subjectId === s.subjectId));
      }
      payload.subjects.forEach((row, index) => {
        const present = level.subjects.some((s) => s.subjectId === row.subjectId);
        if (present && !payload.replaceExisting) {
          return;
        }
        this.write(levelId, { ...row, displayOrder: index + 1 });
      });
      touched.push(this.recompute(levelId));
    });
    return of(touched).pipe(delay(LATENCY));
  }

  // ------------------------------------------------------------- internals

  private write(levelId: string, payload: CurriculumSubjectPayload): void {
    const level = this.levelData.find((l) => l.levelId === levelId);
    const subject = this.subjects.find((s) => s.id === payload.subjectId);
    if (!level || !subject) {
      return;
    }
    const existing = level.subjects.find((s) => s.subjectId === payload.subjectId);
    const row: CurriculumSubjectItem = {
      id: existing?.id ?? `cs-${this.sequence++}`,
      subjectId: subject.id,
      subjectCode: subject.code,
      subjectName: subject.name,
      subjectShortName: subject.shortName,
      subjectColor: subject.colorHex,
      graded: subject.graded,
      coefficient: payload.coefficient,
      weeklyHours: payload.weeklyHours ?? 2,
      mandatory: payload.mandatory,
      passingMark: payload.passingMark,
      displayOrder: payload.displayOrder ?? level.subjects.length + 1,
      locked: existing?.locked ?? false
    };
    level.subjects = existing
      ? level.subjects.map((s) => (s.subjectId === row.subjectId ? row : s))
      : [...level.subjects, row];
    level.subjects.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  private recompute(levelId: string): LevelCurriculum {
    const level = this.levelData.find((l) => l.levelId === levelId)!;
    const graded = level.subjects.filter((s) => s.graded);
    level.subjectCount = level.subjects.length;
    level.totalCoefficient = graded.reduce((sum, s) => sum + s.coefficient, 0);
    level.totalWeeklyHours = level.subjects.reduce((sum, s) => sum + s.weeklyHours, 0);
    level.ready = graded.length > 0;
    level.curriculumId = level.subjects.length > 0
      ? (level.curriculumId ?? `cur-${level.levelId}`)
      : level.curriculumId;
    return { ...level, subjects: [...level.subjects] };
  }

  private categoryLabel(code: string): string {
    const labels: Record<string, string> = {
      SCIENCE: 'Sciences', LITERATURE: 'Lettres', LANGUAGE: 'Langues',
      ARTS: 'Arts', SPORT: 'Sport', TECHNICAL: 'Technique',
      RELIGION: 'Religion', CIVICS: 'Éducation civique', OTHER: 'Autre'
    };
    return labels[code] ?? 'Autre';
  }

  private seedLevels(): LevelCurriculum[] {
    // Aucun niveau n'a de programme au départ : c'est l'état d'un établissement
    // qui vient de finir l'assistant, et c'est ce qui permet de voir l'étape
    // « Programme et coefficients » se cocher quand on la traite.
    const plan: Array<[string, string, number, number]> = [
      ['l-6', '6eme', 1, 0],
      ['l-5', '5eme', 2, 0],
      ['l-4', '4eme', 3, 0],
      ['l-3', '3eme', 4, 0]
    ];
    return plan.map(([levelId, levelName, sequence, count]) => {
      const subjects: CurriculumSubjectItem[] = MOCK_SUBJECTS.slice(0, count)
        .map((s, i) => ({
          id: `cs-${levelId}-${i}`,
          subjectId: s.id,
          subjectCode: s.code,
          subjectName: s.name,
          subjectShortName: s.shortName,
          subjectColor: s.colorHex,
          graded: s.graded !== false,
          coefficient: i === 0 ? 5 : i === 1 ? 4 : 2,
          weeklyHours: i < 2 ? 5 : 2,
          mandatory: true,
          displayOrder: i + 1,
          locked: false
        }));
      const graded = subjects.filter((s) => s.graded);
      return {
        levelId, levelName, levelCode: levelName.toUpperCase(),
        cycleId: 'cy-college', cycleName: 'Collège', sequence,
        curriculumId: count > 0 ? `cur-${levelId}` : undefined,
        subjectCount: subjects.length,
        totalCoefficient: graded.reduce((sum, s) => sum + s.coefficient, 0),
        totalWeeklyHours: subjects.reduce((sum, s) => sum + s.weeklyHours, 0),
        ready: graded.length > 0,
        subjects
      };
    });
  }
}

/**
 * Demo price list.
 *
 * <p>The instalment check is reproduced, not stubbed: a plan that does not add
 * up to the announced total is refused here too. It is the one rule of this
 * screen that costs a school real money when it is skipped.</p>
 */
@Injectable()
export class MockFeeDataSource implements FeeDataSource {
  private types: FeeType[] = [
    this.type('t-insc', 'INSC', 'Frais d\'inscription', 'REGISTRATION', 'ONE_TIME', true),
    this.type('t-scol', 'SCOL', 'Scolarité annuelle', 'TUITION', 'ANNUAL', true),
    this.type('t-cant', 'CANT', 'Cantine', 'CANTEEN', 'MONTHLY', false),
    this.type('t-tran', 'TRAN', 'Transport', 'TRANSPORT', 'MONTHLY', false)
  ];

  private levelData: LevelFees[] = this.seed();
  private sequence = 900;

  listTypes(): Observable<FeeType[]> {
    // Recompté à chaque lecture, comme le serveur.
    const counted = this.types
      .filter((t) => t.status === 'ACTIVE')
      .map((t) => {
        const pricedLevels = this.levelData
          .filter((l) => l.schedules.some((s) => s.feeTypeId === t.id)).length;
        return { ...t, pricedLevels, deletable: pricedLevels === 0 };
      });
    return of(counted).pipe(delay(LATENCY));
  }

  createType(payload: FeeTypeUpsertPayload): Observable<FeeType> {
    const created = this.type(`t-${this.sequence++}`, payload.code.toUpperCase(),
      payload.name, payload.category, payload.recurrence, payload.mandatory);
    created.refundable = payload.refundable;
    created.description = payload.description;
    this.types = [...this.types, created];
    return of(created).pipe(delay(LATENCY));
  }

  updateType(id: string, payload: FeeTypeUpsertPayload): Observable<FeeType> {
    const index = this.types.findIndex((t) => t.id === id);
    const updated: FeeType = {
      ...this.types[index],
      code: payload.code.toUpperCase(),
      name: payload.name,
      category: payload.category,
      categoryLabel: this.categoryLabel(payload.category),
      recurrence: payload.recurrence,
      recurrenceLabel: this.recurrenceLabel(payload.recurrence),
      mandatory: payload.mandatory,
      refundable: payload.refundable,
      description: payload.description
    };
    this.types[index] = updated;
    return of(updated).pipe(delay(LATENCY));
  }

  archiveType(id: string): Observable<FeeType> {
    const used = this.levelData.some((l) => l.schedules.some((s) => s.feeTypeId === id));
    if (used) {
      return throwError(() => ({ status: 409, error: { code: 'FEE_TYPE_IN_USE' } }));
    }
    const index = this.types.findIndex((t) => t.id === id);
    this.types[index] = { ...this.types[index], status: 'ARCHIVED' };
    return of(this.types[index]).pipe(delay(LATENCY));
  }

  levels(): Observable<LevelFees[]> {
    return of(this.levelData.map((l) => ({ ...l, schedules: [...l.schedules] })))
      .pipe(delay(LATENCY));
  }

  saveSchedule(payload: FeeSchedulePayload): Observable<LevelFees[]> {
    const error = this.validate(payload);
    if (error) {
      return throwError(() => error);
    }
    const targets = payload.levelId
      ? this.levelData.filter((l) => l.levelId === payload.levelId)
      : this.levelData;
    targets.forEach((level) => this.write(level, payload));
    return this.levels();
  }

  deleteSchedule(scheduleId: string): Observable<void> {
    const owner = this.levelData
      .find((l) => l.schedules.some((s) => s.id === scheduleId));
    const row = owner?.schedules.find((s) => s.id === scheduleId);
    if (row?.locked) {
      return throwError(() => ({ status: 409, error: { code: 'FEE_SCHEDULE_IN_USE' } }));
    }
    if (owner) {
      owner.schedules = owner.schedules.filter((s) => s.id !== scheduleId);
      this.recompute(owner);
    }
    return of(undefined).pipe(delay(LATENCY));
  }

  apply(payload: FeeApplyPayload): Observable<LevelFees[]> {
    const error = this.validate(payload.schedule);
    if (error) {
      return throwError(() => error);
    }
    payload.levelIds.forEach((levelId) => {
      const level = this.levelData.find((l) => l.levelId === levelId);
      if (!level) {
        return;
      }
      const exists = level.schedules.some((s) => s.feeTypeId === payload.schedule.feeTypeId);
      if (exists && !payload.replaceExisting) {
        return;
      }
      this.write(level, payload.schedule);
    });
    return this.levels();
  }

  // ------------------------------------------------------------- internals

  /** Même contrôle que le serveur : le plan doit tomber sur le montant annoncé. */
  private validate(payload: FeeSchedulePayload): unknown {
    if (payload.totalAmount < 0) {
      return { status: 400, error: { code: 'FEE_AMOUNT_INVALID' } };
    }
    const rows = payload.instalments ?? [];
    if (rows.length === 0) {
      return null;
    }
    if (rows.some((r) => r.amount <= 0)) {
      return { status: 400, error: { code: 'FEE_AMOUNT_INVALID' } };
    }
    const sum = rows.reduce((total, r) => total + r.amount, 0);
    if (Math.abs(sum - payload.totalAmount) > 0.001) {
      return { status: 400, error: { code: 'FEE_INSTALMENTS_MISMATCH' } };
    }
    return null;
  }

  private write(level: LevelFees, payload: FeeSchedulePayload): void {
    const type = this.types.find((t) => t.id === payload.feeTypeId);
    if (!type) {
      return;
    }
    const existing = level.schedules.find((s) => s.feeTypeId === type.id);
    const row: FeeSchedule = {
      id: existing?.id ?? `fs-${this.sequence++}`,
      feeTypeId: type.id,
      feeTypeCode: type.code,
      feeTypeName: type.name,
      category: type.category,
      mandatory: type.mandatory,
      levelId: level.levelId,
      levelName: level.levelName,
      label: payload.label ?? `${type.name} ${level.levelName}`,
      totalAmount: payload.totalAmount,
      currency: 'XOF',
      appliesToNewStudents: payload.appliesToNewStudents ?? true,
      appliesToReturningStudents: payload.appliesToReturningStudents ?? true,
      status: 'ACTIVE',
      instalments: this.buildInstalments(payload),
      locked: existing?.locked ?? false
    };
    level.schedules = existing
      ? level.schedules.map((s) => (s.feeTypeId === row.feeTypeId ? row : s))
      : [...level.schedules, row];
    this.recompute(level);
  }

  /** Répartit le montant et met la différence d'arrondi sur la première échéance. */
  private buildInstalments(payload: FeeSchedulePayload): Instalment[] {
    if (payload.instalments?.length) {
      return payload.instalments.map((r, i) => ({
        sequence: i + 1,
        label: r.label ?? this.ordinal(i + 1),
        amount: r.amount,
        dueDate: r.dueDate,
        graceDays: r.graceDays ?? 0
      }));
    }
    const count = payload.instalmentCount ?? 0;
    if (count <= 0 || payload.totalAmount === 0) {
      return [];
    }
    const share = Math.round((payload.totalAmount / count) * 100) / 100;
    const first = Math.round((payload.totalAmount - share * (count - 1)) * 100) / 100;
    const step = payload.monthsBetweenInstalments ?? 3;
    const start = payload.firstDueDate ? new Date(payload.firstDueDate) : new Date(2026, 9, 5);

    return Array.from({ length: count }, (_, i) => {
      const due = new Date(start);
      due.setMonth(due.getMonth() + i * step);
      return {
        sequence: i + 1,
        label: this.ordinal(i + 1),
        amount: i === 0 ? first : share,
        dueDate: due.toISOString().slice(0, 10),
        graceDays: 0
      };
    });
  }

  private recompute(level: LevelFees): void {
    const mandatory = level.schedules.filter((s) => s.mandatory);
    level.scheduleCount = level.schedules.length;
    level.mandatoryTotal = mandatory.reduce((sum, s) => sum + s.totalAmount, 0);
    level.optionalTotal = level.schedules
      .filter((s) => !s.mandatory)
      .reduce((sum, s) => sum + s.totalAmount, 0);
    level.instalmentCount = mandatory
      .reduce((max, s) => Math.max(max, s.instalments.length), 0);
    level.ready = level.mandatoryTotal > 0;
  }

  private ordinal(sequence: number): string {
    return sequence === 1 ? '1re tranche' : `${sequence}e tranche`;
  }

  private type(id: string, code: string, name: string, category: FeeType['category'],
               recurrence: FeeType['recurrence'], mandatory: boolean): FeeType {
    return {
      id, code, name, category,
      categoryLabel: this.categoryLabel(category),
      recurrence,
      recurrenceLabel: this.recurrenceLabel(recurrence),
      mandatory, refundable: false, status: 'ACTIVE',
      pricedLevels: 0, deletable: true
    };
  }

  private categoryLabel(code: string): string {
    const labels: Record<string, string> = {
      REGISTRATION: 'Inscription', TUITION: 'Scolarité', EXAM: 'Examens',
      ACTIVITY: 'Activités', UNIFORM: 'Tenue', TRANSPORT: 'Transport',
      CANTEEN: 'Cantine', OTHER: 'Autre'
    };
    return labels[code] ?? 'Autre';
  }

  private recurrenceLabel(code: string): string {
    const labels: Record<string, string> = {
      ONE_TIME: 'Une seule fois', ANNUAL: 'Chaque année',
      TERM: 'Chaque période', MONTHLY: 'Chaque mois'
    };
    return labels[code] ?? 'Chaque année';
  }

  /** Aucun niveau n'est tarifé au départ : l'étape reste à faire, et se coche. */
  private seed(): LevelFees[] {
    const plan: Array<[string, string, number]> = [
      ['l-6', '6eme', 1], ['l-5', '5eme', 2], ['l-4', '4eme', 3], ['l-3', '3eme', 4]
    ];
    return plan.map(([levelId, levelName, sequence]) => ({
      levelId, levelName, levelCode: levelName.toUpperCase(),
      cycleId: 'cy-college', cycleName: 'Collège', sequence,
      scheduleCount: 0, mandatoryTotal: 0, optionalTotal: 0,
      instalmentCount: 0, ready: false, currency: 'XOF', schedules: []
    }));
  }
}

@Injectable()
export class MockHealthDataSource implements HealthDataSource {
  private readonly auth = inject(AuthService);

  /**
   * En démonstration comme sur le serveur, le droit décide de la forme.
   *
   * <p>Le magasin ne construit pas le détail médical pour un appelant sans
   * HEALTH_RECORD_VIEW : se connecter en « prof » montre exactement ce que la
   * salle des professeurs voit, et rien d'autre n'a été assemblé.</p>
   */
  board(search?: string): Observable<HealthBoard> {
    const fullAccess = this.auth.has(PERMISSIONS.HEALTH_RECORD_VIEW);
    return of(MOCK_HEALTH.board(fullAccess, search)).pipe(delay(LATENCY));
  }

  record(studentId: string): Observable<HealthRecord> {
    return of(MOCK_HEALTH.record(studentId)).pipe(delay(LATENCY));
  }

  saveRecord(payload: HealthRecordPayload): Observable<HealthRecord> {
    return of(MOCK_HEALTH.saveRecord(payload)).pipe(delay(350));
  }

  addCondition(payload: HealthConditionPayload): Observable<HealthCondition> {
    return of(MOCK_HEALTH.addCondition(payload)).pipe(delay(350));
  }

  updateCondition(conditionId: string,
                  payload: HealthConditionPayload): Observable<HealthCondition> {
    return of(MOCK_HEALTH.updateCondition(conditionId, payload)).pipe(delay(300));
  }

  resolveCondition(conditionId: string): Observable<HealthCondition> {
    return of(MOCK_HEALTH.resolveCondition(conditionId)).pipe(delay(300));
  }

  recordVisit(payload: InfirmaryVisitPayload): Observable<InfirmaryVisit> {
    return of(MOCK_HEALTH.recordVisit(payload)).pipe(delay(400));
  }

  notifyGuardian(visitId: string): Observable<InfirmaryVisit> {
    return of(MOCK_HEALTH.notifyGuardian(visitId)).pipe(delay(300));
  }

  saveVaccination(payload: VaccinationPayload): Observable<Vaccination> {
    return of(MOCK_HEALTH.saveVaccination(payload)).pipe(delay(300));
  }

  vaccines(): Observable<{ id: string; code: string; label: string;
                           required: boolean; dosesExpected: number }[]> {
    return of(MOCK_HEALTH.vaccines()).pipe(delay(LATENCY));
  }

  planExamination(payload: ExaminationPayload): Observable<MedicalExamination> {
    return of(MOCK_HEALTH.planExamination(payload)).pipe(delay(350));
  }

  recordExamination(examinationId: string,
                    payload: ExaminationResultPayload): Observable<MedicalExamination> {
    return of(MOCK_HEALTH.recordExamination(examinationId, payload)).pipe(delay(350));
  }
}

@Injectable()
export class MockFamilyRequestDataSource implements FamilyRequestDataSource {
  board(query: FamilyRequestQuery): Observable<FamilyRequestBoard> {
    return of(MOCK_FAMILY_REQUESTS.board(query)).pipe(delay(LATENCY));
  }

  create(payload: FamilyRequestCreatePayload): Observable<FamilyRequest> {
    return of(MOCK_FAMILY_REQUESTS.create(payload)).pipe(delay(350));
  }

  update(requestId: string, payload: FamilyRequestUpdatePayload): Observable<FamilyRequest> {
    return of(MOCK_FAMILY_REQUESTS.update(requestId, payload)).pipe(delay(300));
  }
}
