import { Routes } from '@angular/router';

/** Parent portal (section 45): Accueil, Enfants, Scolarite, Paiements, Notifications, Profil. */
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
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Mes enfants', endpoint: 'GET /api/v1/parent/children' }
      },
      {
        path: 'academics',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Scolarite', endpoint: 'GET /api/v1/parent/children/{id}/grades' }
      },
      {
        path: 'payments',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Paiements', endpoint: 'GET /api/v1/parent/children/{id}/financial-summary' }
      },
      {
        path: 'notifications',
        loadComponent: () => import('../placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Notifications', endpoint: 'GET /api/v1/parent/notifications' }
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
