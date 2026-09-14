import { Routes } from '@angular/router';

/** Student portal (section 47). Read-only: a pupil never edits official data. */
export const STUDENT_PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./student-shell.component').then((m) => m.StudentShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./student-home.component')
          .then((m) => m.StudentHomeComponent),
        data: { title: 'Accueil' }
      },
      {
        path: 'timetable',
        loadComponent: () => import('./student-timetable.component')
          .then((m) => m.StudentTimetableComponent),
        data: { title: 'Emploi du temps' }
      },
      {
        path: 'grades',
        loadComponent: () => import('./student-grades.component')
          .then((m) => m.StudentGradesComponent),
        data: { title: 'Mes notes' }
      },
      {
        path: 'report-cards',
        loadComponent: () => import('./student-report-cards.component')
          .then((m) => m.StudentReportCardsComponent),
        data: { title: 'Mes bulletins' }
      },
      {
        path: 'attendance',
        loadComponent: () => import('./student-attendance.component')
          .then((m) => m.StudentAttendanceComponent),
        data: { title: 'Mes absences' }
      },
      {
        path: 'profile',
        loadComponent: () => import('./student-profile.component')
          .then((m) => m.StudentProfileComponent),
        data: { title: 'Mon profil' }
      }
    ]
  }
];
