import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
/** Blocks any route when no session is active. */
export const authGuard = (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.isAuthenticated()) {
        return true;
    }
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
//# sourceMappingURL=auth.guard.js.map