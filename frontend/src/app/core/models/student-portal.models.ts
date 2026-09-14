/** Read-only synthesis returned by GET /api/v1/student/dashboard. */
export interface StudentDashboard {
  student: StudentDashboardIdentity;
  academicYearLabel: string;
  termLabel?: string;
  summary: StudentDashboardSummary;
  upcomingCourses: StudentDashboardCourse[];
  recentGrades: StudentDashboardGrade[];
  announcements: StudentDashboardAnnouncement[];
}

export interface StudentDashboardIdentity {
  id: string;
  studentNumber: string;
  firstName: string;
  fullName: string;
  classroomName?: string;
  levelName?: string;
  photoUrl?: string;
}

export interface StudentDashboardSummary {
  academicAverage?: number;
  averageScale: number;
  attendanceRate?: number;
  publishedReportCards: number;
  unjustifiedAbsences: number;
}

export interface StudentDashboardCourse {
  id: string;
  subjectName: string;
  teacherName?: string;
  roomName?: string;
  startsAt: string;
  endsAt: string;
}

export interface StudentDashboardGrade {
  id: string;
  subjectName: string;
  assessmentName: string;
  score: number;
  maxScore: number;
  coefficient?: number;
  publishedAt: string;
}

export type StudentAnnouncementCategory = 'GENERAL' | 'ACADEMIC' | 'EVENT';

export interface StudentDashboardAnnouncement {
  id: string;
  category: StudentAnnouncementCategory;
  title: string;
  message: string;
  publishedAt: string;
}
/* ------------------------------------------------------------- Emploi du temps */
/** Un créneau de cours tel qu'un élève le voit. */
export interface StudentTimetableCourse {
  id: string;
  subjectName: string;
  teacherName?: string;
  roomName?: string;
  startsAt: string;
  endsAt: string;
}

export interface StudentTimetableDay {
  /** Date ISO (yyyy-MM-dd), pour pouvoir afficher « Aujourd'hui ». */
  date: string;
  courses: StudentTimetableCourse[];
}

/** Semaine chargée par GET /api/v1/student/timetable. */
export interface StudentTimetableData {
  termLabel: string;
  days: StudentTimetableDay[];
}

/* ------------------------------------------------------------------ Notes */
/** Une note publiée, telle que la voit l'élève. */
export interface StudentGradeRecord {
  id: string;
  subjectName: string;
  assessmentName: string;
  score: number;
  maxScore: number;
  coefficient?: number;
  publishedAt: string;
}

/** La moyenne d'une matière sur la période en cours. */
export interface StudentSubjectAverage {
  subjectName: string;
  average?: number;
  count: number;
}

/** Synthèse chargée par GET /api/v1/student/grades. */
export interface StudentGradesData {
  termLabel: string;
  average?: number;
  scaleMax: number;
  bySubject: StudentSubjectAverage[];
  records: StudentGradeRecord[];
}

/* --------------------------------------------------------------- Bulletins */
export interface StudentReportCardLine {
  subjectName: string;
  subjectAverage?: number;
  coefficient: number;
}

/** Un bulletin publié, consultable dès sa remise aux familles. */
export interface StudentReportCard {
  id: string;
  termName: string;
  academicYearCode: string;
  statusLabel: string;
  publishedAt?: string;
  generalAverage?: number;
  scaleMax?: number;
  rankLabel?: string;
  passing: boolean;
  lines: StudentReportCardLine[];
}

/* --------------------------------------------------------------- Absences */
export interface StudentAttendanceRecord {
  id: string;
  date: string;
  status: string;
  statusLabel: string;
  justified: boolean;
  reason?: string;
  subjectName?: string;
}

/** Synthèse chargée par GET /api/v1/student/attendance. */
export interface StudentAttendanceData {
  attendanceRate?: number;
  unjustifiedAbsences: number;
  records: StudentAttendanceRecord[];
}

/* ----------------------------------------------------------------- Profil */
/** Fiche lisible par l'élève, résolue par GET /api/v1/auth/me. */
export interface StudentProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  studentNumber: string;
  classroomName?: string;
  levelName?: string;
  photoUrl?: string;
  gender: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  nationality?: string;
}
