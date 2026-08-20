import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

/**
 * Route-level permission check.
 *
 * This is a UX convenience only: the backend re-checks every permission and
 * every business relation on each call (rule 4 - the frontend can never bypass
 * a server rule).
 *
 * Usage: `data: { permissions: ['STUDENT_VIEW'] }`
 */
export const permissionGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const required = (route.data?.['permissions'] as string[] | undefined) ?? [];
  if (required.length === 0 || auth.hasAny(...required)) {
    return true;
  }
  return router.createUrlTree(['/forbidden']);
};

/** Usage: `data: { roles: ['TEACHER'] }`. */
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const required = (route.data?.['roles'] as string[] | undefined) ?? [];
  if (required.length === 0 || required.some((role) => auth.hasRole(role))) {
    return true;
  }
  return router.createUrlTree(['/forbidden']);
};
