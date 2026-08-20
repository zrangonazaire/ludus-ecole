import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { PageQuery, PageResponse } from '@core/models/common.models';
import {
  AcademicYear, Assessment, AttendanceSheet, Classroom, DashboardData, Enrollment,
  EnrollmentCheckResult, FinancialSummary, GlobalSearchResult, Grade, Payment,
  ReportCard, StudentDetail, StudentSummary, Subject, Teacher, Term
} from '@core/models/domain.models';
import {
  ClassroomDataSource, DashboardDataSource, EnrollmentDataSource, FinanceDataSource,
  GradeDataSource, AttendanceDataSource, ReferenceDataSource, StudentDataSource, TeacherDataSource
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
        { id: 'f-1', label: 'Scolarite - Echeance 1', feeTypeName: 'Scolarite', sequence: 1,
          grossAmount: 200000, discountAmount: 0, amountDue: 200000, amountPaid: 200000,
          amountRemaining: 0, currency: 'XOF', dueDate: '2026-10-15', status: 'PAID' },
        { id: 'f-2', label: 'Scolarite - Echeance 2', feeTypeName: 'Scolarite', sequence: 2,
          grossAmount: 200000, discountAmount: 0, amountDue: 200000, amountPaid: 200000,
          amountRemaining: 0, currency: 'XOF', dueDate: '2027-01-15', status: 'PAID' },
        { id: 'f-3', label: 'Scolarite - Echeance 3', feeTypeName: 'Scolarite', sequence: 3,
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
  list(): Observable<Classroom[]> {
    return of(MOCK_CLASSROOMS).pipe(delay(LATENCY));
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
}

@Injectable()
export class MockTeacherDataSource implements TeacherDataSource {
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

@Injectable()
export class MockAttendanceDataSource implements AttendanceDataSource {
  openSheet(classroomId: string, date: string, subjectId?: string): Observable<AttendanceSheet> {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === classroomId) ?? MOCK_CLASSROOMS[0];
    const students = MOCK_STUDENTS.filter((s) => s.classroomId === classroom.id);
    return of({
      classroomId: classroom.id,
      classroomName: classroom.name,
      subjectId,
      subjectName: MOCK_SUBJECTS.find((s) => s.id === subjectId)?.name,
      sessionDate: date,
      status: 'OPEN' as const,
      expectedCount: students.length,
      presentCount: students.length,
      absentCount: 0,
      lateCount: 0,
      records: students.map((student) => ({
        studentId: student.id,
        studentNumber: student.studentNumber,
        studentName: student.fullName,
        status: 'PRESENT' as const,
        justified: false
      }))
    }).pipe(delay(LATENCY));
  }

  submitSheet(sheet: AttendanceSheet): Observable<AttendanceSheet> {
    return of({ ...sheet, status: 'SUBMITTED' as const }).pipe(delay(350));
  }
}

@Injectable()
export class MockGradeDataSource implements GradeDataSource {
  listAssessments(classroomId?: string): Observable<Assessment[]> {
    const list = classroomId
      ? MOCK_UPCOMING_ASSESSMENTS.filter((a) => a.classroomId === classroomId)
      : MOCK_UPCOMING_ASSESSMENTS;
    return of(list).pipe(delay(LATENCY));
  }

  getGrades(assessmentId: string): Observable<Grade[]> {
    const assessment = MOCK_UPCOMING_ASSESSMENTS.find((a) => a.id === assessmentId);
    const students = MOCK_STUDENTS
      .filter((s) => s.classroomId === assessment?.classroomId)
      .slice(0, 30);
    return of(students.map((student) => ({
      assessmentId,
      studentId: student.id,
      studentNumber: student.studentNumber,
      studentName: student.fullName,
      maxScore: assessment?.maxScore ?? 20,
      absent: false,
      status: 'DRAFT' as const
    }))).pipe(delay(LATENCY));
  }

  saveGrades(_assessmentId: string, grades: Grade[]): Observable<Grade[]> {
    return of(grades).pipe(delay(300));
  }

  submitGrades(_assessmentId: string): Observable<void> {
    return of(undefined).pipe(delay(300));
  }
}

@Injectable()
export class MockFinanceDataSource implements FinanceDataSource {
  searchPayments(query: PageQuery): Observable<PageResponse<Payment>> {
    const filtered = MOCK_RECENT_PAYMENTS.filter((p) =>
      matches([p.studentName, p.studentNumber, p.paymentReference, p.receiptNumber ?? ''],
        query.search));
    return of(paginate(filtered, query)).pipe(delay(LATENCY));
  }

  recordPayment(_payload: unknown): Observable<Payment> {
    return of(MOCK_RECENT_PAYMENTS[0]).pipe(delay(450));
  }

  getStudentSummary(studentId: string): Observable<FinancialSummary> {
    return new MockStudentDataSource().getFinancialSummary(studentId);
  }
}

@Injectable()
export class MockDashboardDataSource implements DashboardDataSource {
  load(): Observable<DashboardData> {
    return of({ ...MOCK_DASHBOARD, generatedAt: new Date().toISOString() }).pipe(delay(320));
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
