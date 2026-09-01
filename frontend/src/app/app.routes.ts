import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { permissionGuard, roleGuard } from '@core/guards/permission.guard';
import { PERMISSIONS, ROLES } from '@core/models/auth.models';

/**
 * Application routing (section 54).
 *
 * Guards here are a UX convenience. The backend independently enforces every
 * permission and every business relation (rule 4).
 */
export const routes: Routes = [
  /* --------------------------------------------------- Public ---------- */
  {
    // Landing page. pathMatch 'full' so it only claims the empty URL and
    // leaves /dashboard, /students... to the authenticated shell below.
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing.component')
      .then((m) => m.LandingComponent)
  },
  {
    path: 'commencer',
    loadComponent: () => import('./features/demo-setup/demo-setup.component')
      .then((m) => m.DemoSetupComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/signup/signup.component')
      .then((m) => m.SignupComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then((m) => m.LoginComponent)
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./features/auth/forbidden/forbidden.component')
      .then((m) => m.ForbiddenComponent)
  },

  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadComponent: () => import('./features/onboarding/onboarding.component')
      .then((m) => m.OnboardingComponent)
  },

  /* ------------------------------------------------ Administration ---- */
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component')
      .then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.DASHBOARD_VIEW], title: 'Tableau de bord' },
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then((m) => m.DashboardComponent)
      },
      {
        // Reachable at any time: the wizard can be skipped, this cannot be lost.
        path: 'setup',
        data: { title: 'Configuration' },
        loadComponent: () => import('./features/setup/setup.component')
          .then((m) => m.SetupComponent)
      },
      {
        path: 'students',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.STUDENT_VIEW], title: 'Élèves' },
        loadChildren: () => import('./features/students/students.routes')
          .then((m) => m.STUDENT_ROUTES)
      },
      {
        path: 'enrollments',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ENROLLMENT_VIEW], title: 'Inscriptions' },
        loadChildren: () => import('./features/enrollments/enrollments.routes')
          .then((m) => m.ENROLLMENT_ROUTES)
      },
      {
        path: 'classes',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.CLASS_VIEW], title: 'Classes' },
        loadComponent: () => import('./features/classes/class-list.component')
          .then((m) => m.ClassListComponent)
      },
      {
        path: 'teachers',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.TEACHER_VIEW], title: 'Enseignants' },
        loadComponent: () => import('./features/teachers/teacher-list.component')
          .then((m) => m.TeacherListComponent)
      },
      {
        path: 'payments',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.PAYMENT_VIEW], title: 'Paiements' },
        loadComponent: () => import('./features/payments/payment-list.component')
          .then((m) => m.PaymentListComponent)
      },
      // Screens whose routes exist so navigation is complete; each one is a
      // placeholder that documents the endpoints it will consume.
      {
        path: 'admissions',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Admissions', endpoint: 'GET /api/v1/admissions' }
      },
      {
        path: 'guardians',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Responsables legaux', endpoint: 'GET /api/v1/guardians' }
      },
      {
        path: 'subjects',
        loadComponent: () => import('./features/subjects/subjects.component')
          .then((m) => m.SubjectsComponent),
        data: { title: 'Matières et programme' }
      },
      {
        path: 'timetable',
        loadComponent: () => import('./features/timetable/timetable.component')
          .then((m) => m.TimetableComponent),
        data: { title: 'Emploi du temps' }
      },
      {
        path: 'attendance',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ATTENDANCE_VIEW], title: 'Présences' },
        loadComponent: () => import('./features/attendance/attendance.component')
          .then((m) => m.AttendanceComponent)
      },
      {
        path: 'assessments',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ASSESSMENT_VIEW], title: 'Évaluations' },
        loadComponent: () => import('./features/assessments/assessments.component')
          .then((m) => m.AssessmentsComponent)
      },
      {
        path: 'grades',
        canActivate: [permissionGuard],
        data: {
          permissions: [PERMISSIONS.GRADE_VIEW],
          title: 'Notes',
          initialTab: 'CORRECTION'
        },
        loadComponent: () => import('./features/assessments/assessments.component')
          .then((m) => m.AssessmentsComponent)
      },
      {
        path: 'report-cards',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.REPORT_CARD_VIEW], title: 'Bulletins' },
        loadComponent: () => import('./features/report-cards/report-cards.component')
          .then((m) => m.ReportCardsComponent)
      },
      {
        path: 'discipline',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Discipline', endpoint: 'GET /api/v1/discipline/incidents' }
      },
      {
        path: 'finance',
        loadComponent: () => import('./features/finance/finance.component')
          .then((m) => m.FinanceComponent),
        data: { title: 'Frais de scolarité' }
      },
      {
        path: 'reports',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.REPORT_VIEW], title: 'Rapports' },
        loadComponent: () => import('./features/reports/reports.component')
          .then((m) => m.ReportsComponent)
      },
      {
        path: 'alerts',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ALERT_VIEW], title: 'Alertes' },
        loadComponent: () => import('./features/alerts/alerts.component')
          .then((m) => m.AlertsComponent)
      },
      {
        path: 'promotions',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Réinscriptions' }
      },
      {
        path: 'imports',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Imports' }
      },
      {
        path: 'pedagogical-enrollments',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Inscriptions pédagogiques' }
      },
      {
        path: 'student-files',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.DOCUMENT_VIEW], title: 'Documents officiels' },
        loadComponent: () => import('./features/student-files/student-files.component')
          .then((m) => m.StudentFilesComponent)
      },
      {
        path: 'options',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ENROLLMENT_VIEW], title: 'Options et langues' },
        loadComponent: () => import('./features/options/options.component')
          .then((m) => m.OptionsComponent)
      },
      {
        path: 'transfers',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ENROLLMENT_VIEW], title: 'Transferts et départs' },
        loadComponent: () => import('./features/transfers/transfers.component')
          .then((m) => m.TransfersComponent)
      },
      {
        path: 'health',
        canActivate: [permissionGuard],
        data: {
          permissions: [PERMISSIONS.HEALTH_ALERT_VIEW],
          title: 'Santé scolaire'
        },
        loadComponent: () => import('./features/health/health.component')
          .then((m) => m.HealthComponent)
      },
      {
        path: 'certificates',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Certificats et attestations' }
      },
      {
        path: 'requests',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.DOCUMENT_VIEW], title: 'Demandes des familles' },
        loadComponent: () => import('./features/requests/requests.component')
          .then((m) => m.RequestsComponent)
      },
      {
        path: 'documents',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Documents' }
      },
      {
        path: 'councils',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Conseils de classe' }
      },
      {
        path: 'cash',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Caisse' }
      },
      {
        path: 'discounts',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Remises et bourses' }
      },
      {
        path: 'outstanding',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.FINANCE_VIEW], title: 'Impayés' },
        loadComponent: () => import('./features/outstanding/outstanding.component')
          .then((m) => m.OutstandingComponent)
      },
      {
        path: 'staff',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Personnel' }
      },
      {
        path: 'users',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ROLE_MANAGE], title: 'Profils d’accès' },
        loadComponent: () => import('./features/access-profiles/access-profiles.component')
          .then((m) => m.AccessProfilesComponent)
      },
      {
        path: 'audit',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: "Journal d'audit" }
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Messages' }
      },
      {
        path: 'portals',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Portail des familles' }
      },
      {
        path: 'academic-years',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Années et périodes' }
      },
      {
        path: 'levels',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Cycles et niveaux' }
      },
      {
        path: 'campus',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Campus et salles' }
      },
      {
        path: 'administration',
        loadComponent: () => import('./features/placeholder/placeholder.component')
          .then((m) => m.PlaceholderComponent),
        data: { title: 'Paramètres', endpoint: 'GET /api/v1/school' }
      }
    ]
  },

  /* ------------------------------------------------ Teacher portal ---- */
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { roles: [ROLES.TEACHER, ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN] },
    loadChildren: () => import('./features/teacher-portal/teacher-portal.routes')
      .then((m) => m.TEACHER_PORTAL_ROUTES)
  },

  /* ------------------------------------------------- Parent portal ---- */
  {
    path: 'parent',
    canActivate: [authGuard, roleGuard],
    data: { roles: [ROLES.PARENT, ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN] },
    loadChildren: () => import('./features/parent-portal/parent-portal.routes')
      .then((m) => m.PARENT_PORTAL_ROUTES)
  },

  /* ------------------------------------------------ Student portal ---- */
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { roles: [ROLES.STUDENT, ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN] },
    loadChildren: () => import('./features/student-portal/student-portal.routes')
      .then((m) => m.STUDENT_PORTAL_ROUTES)
  },

  // Unknown URL: back to the landing page rather than a guarded route,
  // so an anonymous visitor is never bounced through /login.
  { path: '**', redirectTo: '' }
];
