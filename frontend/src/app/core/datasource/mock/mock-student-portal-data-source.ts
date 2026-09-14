import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { StudentPortalDataSource } from '../data-source';
import {
  StudentAttendanceData, StudentDashboard, StudentGradesData, StudentProfile,
  StudentReportCard, StudentTimetableData
} from '@core/models/student-portal.models';
import {
  MOCK_ACADEMIC_YEAR, MOCK_STUDENTS, MOCK_SUBJECTS, MOCK_TEACHERS, MOCK_TERMS
} from './mock-data';

const LATENCY = 260;

const ROOMS = ['Salle A04', 'Salle B12', 'Laboratoire 2', 'Salle C08', 'CDI'];

/** Date ISO (yyyy-MM-dd) à un nombre de jours de décalage. */
function dayKey(dayOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

function at(dayOffset: number, hours: number, minutes = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

@Injectable()
export class MockStudentPortalDataSource implements StudentPortalDataSource {
  private readonly auth = inject(AuthService);

  dashboard(): Observable<StudentDashboard> {
    const accountFirstName = this.auth.currentUser()?.firstName.toLocaleLowerCase('fr-FR');
    const student = MOCK_STUDENTS.find((item) =>
      item.firstName.toLocaleLowerCase('fr-FR') === accountFirstName) ?? MOCK_STUDENTS[3];

    return of({
      student: {
        id: student.id,
        studentNumber: student.studentNumber,
        firstName: student.firstName,
        fullName: student.fullName,
        classroomName: student.classroomName,
        levelName: student.levelName,
        photoUrl: student.photoUrl
      },
      academicYearLabel: MOCK_ACADEMIC_YEAR.label,
      termLabel: MOCK_TERMS[1].name,
      summary: {
        academicAverage: 14.62,
        averageScale: 20,
        attendanceRate: 96.1,
        publishedReportCards: 1,
        unjustifiedAbsences: 1
      },
      upcomingCourses: [
        {
          id: 'student-course-1',
          subjectName: 'Mathématiques',
          teacherName: 'Kouassi N\'Guessan',
          roomName: 'Salle B12',
          startsAt: at(0, 8),
          endsAt: at(0, 10)
        },
        {
          id: 'student-course-2',
          subjectName: 'Français',
          teacherName: 'Adjoua Bamba',
          roomName: 'Salle A04',
          startsAt: at(0, 10, 15),
          endsAt: at(0, 12, 15)
        },
        {
          id: 'student-course-3',
          subjectName: 'Physique-Chimie',
          teacherName: 'Ibrahim Cissé',
          roomName: 'Laboratoire 2',
          startsAt: at(1, 8),
          endsAt: at(1, 10)
        }
      ],
      recentGrades: [
        {
          id: 'student-grade-1',
          subjectName: 'Mathématiques',
          assessmentName: 'Devoir surveillé n° 3',
          score: 16.5,
          maxScore: 20,
          coefficient: 2,
          publishedAt: at(-1, 16, 30)
        },
        {
          id: 'student-grade-2',
          subjectName: 'Anglais',
          assessmentName: 'Expression écrite',
          score: 14,
          maxScore: 20,
          coefficient: 1,
          publishedAt: at(-3, 15)
        },
        {
          id: 'student-grade-3',
          subjectName: 'SVT',
          assessmentName: 'Interrogation',
          score: 8.5,
          maxScore: 10,
          coefficient: 1,
          publishedAt: at(-5, 14, 45)
        }
      ],
      announcements: [
        {
          id: 'student-announcement-1',
          category: 'ACADEMIC' as const,
          title: 'Composition du trimestre',
          message: 'Les compositions débuteront lundi prochain. Consulte ton emploi du temps.',
          publishedAt: at(-1, 9)
        },
        {
          id: 'student-announcement-2',
          category: 'EVENT' as const,
          title: 'Journée culturelle',
          message: 'La journée culturelle aura lieu vendredi à partir de 13 h dans la cour principale.',
          publishedAt: at(-2, 11)
        }
      ]
    } satisfies StudentDashboard).pipe(delay(LATENCY));
  }
private currentStudent() {
    const accountFirstName = this.auth.currentUser()?.firstName.toLocaleLowerCase('fr-FR');
    return MOCK_STUDENTS.find((item) =>
      item.firstName.toLocaleLowerCase('fr-FR') === accountFirstName) ?? MOCK_STUDENTS[3];
  }

  timetable(): Observable<StudentTimetableData> {
    const mondayOffset = (today: Date): number => {
      const day = today.getDay(); // 0 = dimanche
      return day === 0 ? -6 : 1 - day;
    };
    const monday = mondayOffset(new Date());
    const subjects = MOCK_SUBJECTS.slice(0, 4);
    const teachers = MOCK_TEACHERS;
    const days = Array.from({ length: 5 }, (_, weekIndex) => ({
      date: dayKey(monday + weekIndex),
      courses: Array.from({ length: 4 }, (_, slot) => {
        const subject = subjects[(weekIndex + slot) % subjects.length];
        const teacher = teachers[(weekIndex + slot) % teachers.length];
        const start = 8 + slot * 2;
        return {
          id: `tt-${weekIndex + 1}-${slot + 1}`,
          subjectName: subject.shortName || subject.name,
          teacherName: teacher.fullName,
          roomName: ROOMS[(weekIndex + slot) % ROOMS.length],
          startsAt: at(monday + weekIndex, start),
          endsAt: at(monday + weekIndex, start + 1, 55)
        };
      })
    }));
    return of({
      termLabel: MOCK_TERMS[1].name,
      days
    } satisfies StudentTimetableData).pipe(delay(LATENCY));
  }

  grades(): Observable<StudentGradesData> {
    const records = [
      { id: 'grade-1', subjectName: 'Mathématiques', assessmentName: 'Devoir surveillé n° 3', score: 16.5, maxScore: 20, coefficient: 2, publishedAt: at(-1, 16, 30) },
      { id: 'grade-2', subjectName: 'Français', assessmentName: 'Rédaction', score: 13, maxScore: 20, coefficient: 2, publishedAt: at(-2, 15) },
      { id: 'grade-3', subjectName: 'Anglais', assessmentName: 'Expression écrite', score: 14, maxScore: 20, coefficient: 1, publishedAt: at(-3, 15) },
      { id: 'grade-4', subjectName: 'Physique-Chimie', assessmentName: 'Devoir surveillé n° 2', score: 15.5, maxScore: 20, coefficient: 3, publishedAt: at(-4, 11) },
      { id: 'grade-5', subjectName: 'SVT', assessmentName: 'Interrogation', score: 8.5, maxScore: 10, coefficient: 1, publishedAt: at(-5, 14, 45) },
      { id: 'grade-6', subjectName: 'Histoire-Géographie', assessmentName: 'Devoir surveillé', score: 11, maxScore: 20, coefficient: 2, publishedAt: at(-7, 12) }
    ];
    return of({
      termLabel: MOCK_TERMS[1].name,
      average: 14.62,
      scaleMax: 20,
      bySubject: [
        { subjectName: 'Mathématiques', average: 16.5, count: 1 },
        { subjectName: 'Français', average: 13, count: 1 },
        { subjectName: 'Anglais', average: 14, count: 1 },
        { subjectName: 'Physique-Chimie', average: 15.5, count: 1 },
        { subjectName: 'SVT', average: 17, count: 1 },
        { subjectName: 'Histoire-Géographie', average: 11, count: 1 }
      ],
      records
    } satisfies StudentGradesData).pipe(delay(LATENCY));
  }

  reportCards(): Observable<StudentReportCard[]> {
    const lines = MOCK_SUBJECTS.slice(0, 5).map((subject, index) => ({
      subjectName: subject.name,
      subjectAverage: [15.5, 13, 12.5, 14, 9.5][index],
      coefficient: [3, 3, 2, 2, 2][index]
    }));
    return of([{
      id: 'rc-t1',
      termName: MOCK_TERMS[0].name,
      academicYearCode: MOCK_ACADEMIC_YEAR.code,
      statusLabel: 'Remis aux familles',
      publishedAt: at(-20, 10),
      generalAverage: 13.8,
      scaleMax: 20,
      rankLabel: '12e sur 38',
      passing: true,
      lines
    } satisfies StudentReportCard]).pipe(delay(LATENCY));
  }

  attendance(): Observable<StudentAttendanceData> {
    const labels: Record<string, string> = {
      PRESENT: 'Présent', ABSENT: 'Absent', LATE: 'En retard', EXCUSED_ABSENCE: 'Absence justifiée'
    };
    const records = [
      { id: 'att-1', date: at(-11, 8).slice(0, 10), status: 'ABSENT', justified: false, subjectName: 'Mathématiques' },
      { id: 'att-2', date: at(-9, 8).slice(0, 10), status: 'LATE', justified: false, reason: 'Retard de bus', subjectName: 'Français' },
      { id: 'att-3', date: at(-7, 8).slice(0, 10), status: 'EXCUSED_ABSENCE', justified: true, reason: 'Rendez-vous médical', subjectName: 'Physique-Chimie' },
      { id: 'att-4', date: at(-5, 8).slice(0, 10), status: 'PRESENT', justified: true, subjectName: 'Anglais' },
      { id: 'att-5', date: at(-3, 8).slice(0, 10), status: 'PRESENT', justified: true, subjectName: 'SVT' }
    ].map((record) => ({ ...record, statusLabel: labels[record.status] ?? record.status }));
    return of({
      attendanceRate: 96.1,
      unjustifiedAbsences: 1,
      records
    } satisfies StudentAttendanceData).pipe(delay(LATENCY));
  }

  profile(): Observable<StudentProfile> {
    const student = this.currentStudent();
    return of({
      firstName: student.firstName,
      lastName: student.lastName,
      fullName: student.fullName,
      studentNumber: student.studentNumber,
      classroomName: student.classroomName,
      levelName: student.levelName,
      photoUrl: student.photoUrl,
      gender: student.gender,
      birthDate: student.birthDate,
      email: `${student.firstName.toLowerCase().replace(/[^a-z]/g, '')}.${student.lastName.toLowerCase().replace(/[^a-z]/g, '')}@eleve.soocloo.com`,
      phone: '+225 07 12 34 56',
      addressLine1: 'Quartier Cocody, rue des Manguiers',
      city: 'Abidjan',
      nationality: 'Ivoirienne'
    } satisfies StudentProfile).pipe(delay(LATENCY));
  }
}
