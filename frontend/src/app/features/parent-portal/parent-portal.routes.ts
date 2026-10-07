import { Routes } from '@angular/router';

/** Parent portal (section 45): Accueil, Enfants, Scolarité, Paiements, Notifications, Profil. */
export const PARENT_PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./parent-shell.component').then((m) => m.ParentShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./parent-home.component').then((m) => m.ParentHomeComponent)
      },
      {
        path: 'children',
        loadComponent: () => import('./parent-children.component').then((m) => m.ParentChildrenComponent),
        data: { title: 'Mes enfants' }
      },
      {
        path: 'academics',
        loadComponent: () => import('./parent-academics.component').then((m) => m.ParentAcademicsComponent),
        data: { title: 'Scolarité & Bulletins' }
      },
      {
        path: 'payments',
        loadComponent: () => import('./parent-payments.component').then((m) => m.ParentPaymentsComponent),
        data: { title: 'Paiements & Encaissements' }
      },
      {
        path: 'notifications',
        loadComponent: () => import('./parent-notifications.component').then((m) => m.ParentNotificationsComponent),
        data: { title: 'Notifications' }
      },
      {
        path: 'profile',
        loadComponent: () => import('./parent-profile.component').then((m) => m.ParentProfileComponent),
        data: { title: 'Mon profil' }
      }
    ]
  }
];
