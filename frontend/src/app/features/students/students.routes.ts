import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./student-list.component').then((m) => m.StudentListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./student-detail.component').then((m) => m.StudentDetailComponent)
  }
];
