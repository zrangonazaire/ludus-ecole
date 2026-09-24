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
    // Guide d'utilisation public : consultable sans compte depuis la page
    // d'accueil (« Roadmap — Guide »). Les liens vers les écrans restent
    // filtrés par les droits via AuthService.has() : un visiteur anonyme
    // voit les étapes et « accès selon votre profil ».
    path: 'roadmap',
    data: { title: 'Roadmap — Guide d’utilisation' },
    loadComponent: () => import('./features/roadmap/roadmap.component')
      .then((m) => m.RoadmapComponent)
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
        data: { permissions: [PERMISSIONS.STUDENT_VIEW], title: 'Historique des élèves' },
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
        path: 'teacher-assignments',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.TEACHER_MANAGE], title: 'Affectation des enseignants' },
        loadComponent: () => import('./features/teachers/teacher-assignments.component')
          .then((m) => m.TeacherAssignmentsComponent)
      },
      {
        path: 'teachers/new',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.TEACHER_MANAGE], title: 'Nouvel enseignant' },
        loadComponent: () => import('./features/teachers/teacher-create.component')
          .then((m) => m.TeacherCreateComponent)
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
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ADMISSION_VIEW], title: 'Admissions' },
        loadComponent: () => import('./features/admissions/admissions.component')
          .then((m) => m.AdmissionsComponent)
      },
      {
        path: 'guardians',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.STUDENT_VIEW], title: 'Responsables légaux' },
        loadComponent: () => import('./features/guardians/guardians.component')
          .then((m) => m.GuardiansComponent)
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
        canActivate: [permissionGuard],
        loadComponent: () => import('./features/discipline/discipline.component')
          .then((m) => m.DisciplineComponent),
        data: { title: 'Discipline', permissions: ['DISCIPLINE_VIEW'] }
      },
      {
        path: 'finance',
        loadComponent: () => import('./features/finance/finance.component')
          .then((m) => m.FinanceComponent),
        data: { title: 'Plan de facturation' }
      },
      {
        path: 'finance-config',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.FINANCE_MANAGE], title: 'Paramètres financiers' },
        loadComponent: () => import('./features/finance/finance-config.component')
          .then((m) => m.FinanceConfigComponent)
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
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ENROLLMENT_CREATE], title: 'Réinscriptions' },
        loadComponent: () => import('./features/promotions/promotions.component')
          .then((m) => m.PromotionsComponent)
      },
      {
        path: 'imports',
        loadComponent: () => import('./features/imports/imports.component')
          .then((m) => m.ImportsComponent),
        data: { title: 'Import de listes' }
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
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.COUNCIL_VIEW], title: 'Conseils de classe' },
        loadComponent: () => import('./features/councils/councils.component')
          .then((m) => m.CouncilsComponent)
      },
      {
        path: 'cash',
        canActivate: [permissionGuard],
        loadComponent: () => import('./features/cash/cash.component')
          .then((m) => m.CashComponent),
        data: { title: 'Caisse', permissions: [PERMISSIONS.CASH_SESSION_MANAGE] }
      },
      {
        path: 'discounts',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.DISCOUNT_REQUEST_VIEW], title: 'Remises et bourses' },
        loadComponent: () => import('./features/discounts/discounts.component')
          .then((m) => m.DiscountsComponent)
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
        loadComponent: () => import('./features/staff/staff.component')
          .then((m) => m.StaffComponent),
        data: { title: 'Personnel' }
      },
      {
        path: 'users',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.USER_MANAGE], title: 'Utilisateurs' },
        loadComponent: () => import('./features/users/users.component')
          .then((m) => m.UsersComponent)
      },
      {
        path: 'access-profiles',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ROLE_MANAGE], title: 'Profils d’accès' },
        loadComponent: () => import('./features/access-profiles/access-profiles.component')
          .then((m) => m.AccessProfilesComponent)
      },
      {
        path: 'audit',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.AUDIT_VIEW], title: "Journal d'audit" },
        loadComponent: () => import('./features/audit/audit.component')
          .then((m) => m.AuditComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/notifications.component')
          .then((m) => m.NotificationsComponent),
        data: { title: 'Messages' }
      },
      {
        path: 'portals',
        canActivate: [permissionGuard],
        loadComponent: () => import('./features/portals/portals.component')
          .then((m) => m.PortalsComponent),
        data: { title: 'Portail des familles', permissions: [PERMISSIONS.SCHOOL_VIEW] }
      },
      {
        path: 'academic-years',
        loadComponent: () => import('./features/academic-years/academic-years.component')
          .then((m) => m.AcademicYearsComponent),
        data: { title: 'Années et périodes' }
      },
      {
        path: 'supplies',
        canActivate: [permissionGuard],
        canDeactivate: [(component: { canLeave(): boolean }) => component.canLeave()],
        data: { permissions: [PERMISSIONS.LEVEL_VIEW], title: 'Fournitures scolaires' },
        loadComponent: () => import('./features/supplies/supplies.component')
          .then((m) => m.SuppliesComponent)
      },
      {
        path: 'levels',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.LEVEL_VIEW], title: 'Cycles et niveaux' },
        loadComponent: () => import('./features/levels/levels.component')
          .then((m) => m.LevelsComponent)
      },
            {
        path: 'campus',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.CAMPUS_VIEW], title: 'Campus et salles' },
        loadComponent: () => import('./features/campus/campus.component')
          .then((m) => m.CampusComponent)
      },
      {
        path: 'rooms',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.ROOM_VIEW], title: 'Bâtiments et salles' },
        loadComponent: () => import('./features/rooms/rooms.component')
          .then((m) => m.RoomsComponent)
      },
      {
        path: 'administration',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.SCHOOL_VIEW], title: 'Paramètres' },
        loadComponent: () => import('./features/administration/administration.component')
          .then((m) => m.AdministrationComponent)
      },
      {
        // Carrefour « Configuration système » en fin de menu : regroupe les
        // réglages sans dupliquer leurs écrans. Garde SCHOOL_VIEW pour que
        // l'entrée reste réservée à l'administration.
        path: 'system-config',
        canActivate: [permissionGuard],
        data: { permissions: [PERMISSIONS.SCHOOL_VIEW], title: 'Configuration système' },
        loadComponent: () => import('./features/system-config/system-config.component')
          .then((m) => m.SystemConfigComponent)
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
