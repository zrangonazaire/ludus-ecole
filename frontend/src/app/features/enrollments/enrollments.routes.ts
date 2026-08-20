import { Routes } from '@angular/router';
import { permissionGuard } from '@core/guards/permission.guard';
import { PERMISSIONS } from '@core/models/auth.models';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./enrollment-list.component')
      .then((m) => m.EnrollmentListComponent)
  },
  {
    path: 'new',
    canActivate: [permissionGuard],
    data: { permissions: [PERMISSIONS.ENROLLMENT_CREATE] },
    loadComponent: () => import('./enrollment-wizard.component')
      .then((m) => m.EnrollmentWizardComponent)
  }
];
