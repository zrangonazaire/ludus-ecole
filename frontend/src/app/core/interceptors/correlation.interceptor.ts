import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Propagates a correlation id so a user-visible incident can be traced through
 * the backend logs, the audit trail and the domain events (section 83).
 */
export const correlationInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }
  return next(
    req.clone({ setHeaders: { 'X-Correlation-Id': crypto.randomUUID() } })
  );
};
