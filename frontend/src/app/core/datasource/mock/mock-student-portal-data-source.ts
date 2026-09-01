import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { StudentPortalDataSource } from '../data-source';
import { StudentDashboard } from '@core/models/student-portal.models';
import {
  MOCK_ACADEMIC_YEAR, MOCK_STUDENTS, MOCK_TERMS
} from './mock-data';

const LATENCY = 260;

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
}
