export const STUDENT_ROUTES = [
    {
        path: '',
        loadComponent: () => import('./student-list.component').then((m) => m.StudentListComponent)
    },
    {
        path: ':id',
        canDeactivate: [(component) => component.canLeave()],
        loadComponent: () => import('./student-detail.component').then((m) => m.StudentDetailComponent)
    }
];
//# sourceMappingURL=students.routes.js.map