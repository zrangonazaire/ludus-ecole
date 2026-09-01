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
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Emploi du temps', endpoint: 'GET /api/v1/student/timetable' }
      },
      {
        path: 'grades',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Mes notes', endpoint: 'GET /api/v1/student/grades' }
      },
      {
        path: 'report-cards',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Mes bulletins', endpoint: 'GET /api/v1/student/report-cards' }
      },
      {
        path: 'attendance',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Mes absences', endpoint: 'GET /api/v1/student/attendance' }
      },
      {
        path: 'profile',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Mon profil', endpoint: 'GET /api/v1/auth/me' }
      }
    ]
  }
];
