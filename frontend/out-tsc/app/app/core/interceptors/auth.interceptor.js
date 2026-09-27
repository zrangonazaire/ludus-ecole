import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
/** Attaches the bearer token to every call to our own API. */
export const authInterceptor = (req, next) => {
    const auth = inject(AuthService);
    const token = auth.accessToken();
    if (!token || !req.url.startsWith('/api')) {
        return next(req);
    }
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
//# sourceMappingURL=auth.interceptor.js.map