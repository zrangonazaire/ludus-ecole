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
