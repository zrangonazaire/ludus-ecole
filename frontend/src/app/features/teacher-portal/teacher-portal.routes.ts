import { Routes } from '@angular/router';

/** Teacher portal navigation (section 29): Accueil, Classes, Presences, Notes, Profil. */
export const TEACHER_PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./teacher-shell.component').then((m) => m.TeacherShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./teacher-home.component').then((m) => m.TeacherHomeComponent)
      },
      {
        path: 'classes',
        loadComponent: () => import('./teacher-classes.component')
          .then((m) => m.TeacherClassesComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./teacher-attendance.component')
          .then((m) => m.TeacherAttendanceComponent)
      },
      {
        path: 'grades',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Saisie des notes', endpoint: 'POST /api/v1/teacher/grades' }
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
