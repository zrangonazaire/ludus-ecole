import { Routes } from '@angular/router';

/** Teacher portal navigation (section 29): Accueil, Classes, Présences, Notes, Profil. */
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
        loadComponent: () => import('./teacher-grades.component')
          .then((m) => m.TeacherGradesComponent),
        data: { title: 'Saisie des notes' }
      },
      {
        path: 'profile',
        loadComponent: () => import('./teacher-profile.component')
          .then((m) => m.TeacherProfileComponent),
        data: { title: 'Mon profil' }
      }
    ]
  }
];
