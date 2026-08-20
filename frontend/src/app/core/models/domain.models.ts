import {
  AttendanceStatus, CapacityStatus, EnrollmentStatus, GradeStatus,
  PaymentMethod, PaymentStatus, StudentFeeStatus, StudentStatus, AlertSeverity
} from './common.models';

/* ---------------------------------------------------------------- school */

export interface AcademicYear {
  id: string;
  code: string;
  label: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'OPEN' | 'ACTIVE' | 'CLOSING' | 'CLOSED' | 'ARCHIVED';
  enrollmentOpenAt?: string;
  enrollmentCloseAt?: string;
}

export interface Term {
  id: string;
  academicYearId: string;
  name: string;
  code: string;
  sequence: number;
  startDate: string;
  endDate: string;
  status: 'PLANNED' | 'OPEN' | 'GRADE_ENTRY' | 'VALIDATION' | 'CLOSED';
}

export interface Level {
  id: string;
  cycleId: string;
  code: string;
  name: string;
  shortName?: string;
  sequence: number;
}

export interface Classroom {
  id: string;
  code: string;
  name: string;
  levelId: string;
  levelName: string;
  campusId: string;
  academicYearId: string;
  capacityMaximum: number;
  activeEnrollments: number;
  availableSeats: number;
  projectedAvailableSeats?: number;
  occupancyRate: number;
  capacityStatus: CapacityStatus;
  mainTeacherId?: string;
  mainTeacherName?: string;
  status: 'DRAFT' | 'ACTIVE' | 'CLOSED' | 'ARCHIVED';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  shortName?: string;
  category: string;
  colorHex?: string;
  graded: boolean;
}

/* --------------------------------------------------------------- people */

export interface StudentSummary {
  id: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthDate: string;
  age?: number;
  photoUrl?: string;
  status: StudentStatus;
  classroomId?: string;
  classroomName?: string;
  levelName?: string;
}

export interface StudentDetail extends StudentSummary {
  middleName?: string;
  birthPlace?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  bloodGroup?: string;
  medicalNotes?: string;
  hasDisability: boolean;
  admissionDate?: string;
  previousSchool?: string;
  guardians: GuardianLink[];
  currentEnrollment?: Enrollment;
  financialSummary?: FinancialSummary;
  attendanceSummary?: AttendanceSummary;
}

export interface GuardianLink {
  id: string;
  guardianId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email?: string;
  relationship: string;
  primary: boolean;
  financialResponsibility: boolean;
  canPickupStudent: boolean;
  receivesNotifications: boolean;
}

export interface Teacher {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  speciality?: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'RESIGNED' | 'RETIRED' | 'ARCHIVED';
  subjectNames?: string[];
  classCount?: number;
}

/* ----------------------------------------------------------- enrollment */

export interface Enrollment {
  id: string;
  enrollmentNumber: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  academicYearId: string;
  academicYearCode: string;
  classroomId: string;
  classroomName: string;
  levelId: string;
  levelName: string;
  enrollmentKind: 'NEW' | 'RE_ENROLLMENT' | 'TRANSFER_IN';
  status: EnrollmentStatus;
  enrollmentDate: string;
  validatedAt?: string;
  repeating: boolean;
  overCapacityOverride: boolean;
  feeLinesCreated?: number;
  totalFeesDue?: number;
}

/** Answer of GET /enrollments/check - every blocker at once. */
export interface EnrollmentCheckResult {
  allowed: boolean;
  blockers: string[];
  warnings: string[];
  capacityMaximum: number;
  occupiedSeats: number;
  availableSeats: number;
  projectedAvailableSeats: number;
}

/* ----------------------------------------------------------- attendance */

export interface AttendanceSummary {
  totalRecords: number;
  presentCount: number;
  absenceCount: number;
  unjustifiedAbsenceCount: number;
  latenessCount: number;
  attendanceRate: number;
}

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  photoUrl?: string;
  status: AttendanceStatus;
  arrivalTime?: string;
  minutesLate?: number;
  reason?: string;
  justified: boolean;
}

export interface AttendanceSheet {
  id?: string;
  classroomId: string;
  classroomName: string;
  subjectId?: string;
  subjectName?: string;
  sessionDate: string;
  startTime?: string;
  endTime?: string;
  status: 'OPEN' | 'SUBMITTED' | 'VALIDATED' | 'LOCKED';
  expectedCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  records: AttendanceRecord[];
}

/* ---------------------------------------------------------------- grades */

export interface Assessment {
  id: string;
  title: string;
  classroomId: string;
  classroomName: string;
  subjectId: string;
  subjectName: string;
  termId: string;
  assessmentType: string;
  assessmentDate: string;
  maxScore: number;
  coefficient: number;
  status: 'DRAFT' | 'PLANNED' | 'OPEN' | 'GRADING' | 'SUBMITTED' | 'VALIDATED' | 'PUBLISHED' | 'CANCELLED';
  gradedCount?: number;
  studentCount?: number;
}

export interface Grade {
  id?: string;
  assessmentId: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  score?: number;
  maxScore: number;
  normalizedScore?: number;
  absent: boolean;
  status: GradeStatus;
  comment?: string;
}

export interface SubjectAverageLine {
  subjectId: string;
  subjectName: string;
  coefficient: number;
  average?: number;
  weightedAverage?: number;
  classAverage?: number;
  minScore?: number;
  maxScore?: number;
  rankInSubject?: number;
  assessmentCount: number;
  appreciation?: string;
  teacherName?: string;
}

export interface ReportCard {
  id: string;
  reference: string;
  verificationCode: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  classroomName: string;
  academicYearCode: string;
  termName: string;
  generalAverage?: number;
  classAverage?: number;
  classMinAverage?: number;
  classMaxAverage?: number;
  rankInClass?: number;
  classSize?: number;
  totalCoefficient?: number;
  absenceCount: number;
  latenessCount: number;
  generalRemark?: string;
  councilDecision?: string;
  status: 'DRAFT' | 'GENERATED' | 'VALIDATED' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  lines: SubjectAverageLine[];
}

/* --------------------------------------------------------------- finance */

export interface StudentFee {
  id: string;
  label: string;
  feeTypeName: string;
  sequence: number;
  grossAmount: number;
  discountAmount: number;
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  currency: string;
  dueDate: string;
  status: StudentFeeStatus;
}

export interface FinancialSummary {
  studentId: string;
  academicYearId: string;
  totalGross: number;
  totalDiscount: number;
  totalDue: number;
  totalPaid: number;
  outstandingAmount: number;
  nextDueDate?: string;
  overdueCount: number;
  globalStatus: 'PAID' | 'PARTIALLY_PAID' | 'DUE';
  currency: string;
  fees?: StudentFee[];
}

export interface Payment {
  id: string;
  paymentReference: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  amount: number;
  allocatedAmount: number;
  unallocatedAmount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  status: PaymentStatus;
  externalReference?: string;
  payerName?: string;
  receiptNumber?: string;
  receiptId?: string;
  outstandingAfterPayment?: number;
  allocations: PaymentAllocation[];
}

export interface PaymentAllocation {
  id: string;
  studentFeeId: string;
  feeLabel: string;
  amount: number;
  feeRemainingAfter: number;
  feeStatus: string;
}

/* ------------------------------------------------------------- dashboard */

export interface KpiValue {
  key: string;
  label: string;
  value: number | string;
  formatted: string;
  delta?: number;
  deltaLabel?: string;
  trend?: 'up' | 'down' | 'flat';
  live?: boolean;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  suffix?: string;
  icon?: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface ChartData {
  categories: string[];
  series: ChartSeries[];
}

export interface DashboardAlert {
  id: string;
  type: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  studentName?: string;
  classroomName?: string;
  createdAt: string;
}

export interface DashboardData {
  academicYear: AcademicYear;
  campusName: string;
  currentTerm?: Term;
  generatedAt: string;
  kpis: KpiValue[];
  enrollmentByLevel: ChartData;
  attendanceTrend: ChartData;
  academicPerformance: ChartData;
  monthlyCollections: ChartData;
  financialBreakdown: { labels: string[]; values: number[] };
  recentEnrollments: Enrollment[];
  todayAbsences: AttendanceRecord[];
  recentPayments: Payment[];
  alerts: DashboardAlert[];
  upcomingAssessments: Assessment[];
  classesNeedingAttention: Classroom[];
}

/* --------------------------------------------------------- notifications */

export interface AppNotification {
  id: string;
  category: string;
  title: string;
  body: string;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}

export interface GlobalSearchResult {
  type: 'STUDENT' | 'GUARDIAN' | 'TEACHER' | 'CLASSROOM' | 'RECEIPT' | 'INVOICE';
  id: string;
  primaryLabel: string;
  secondaryLabel?: string;
  badge?: string;
  routerLink: string;
}
