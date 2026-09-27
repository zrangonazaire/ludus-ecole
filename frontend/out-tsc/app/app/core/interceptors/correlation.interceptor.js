import { createUuid } from "../utils/uuid";
/**
 * Propagates a correlation id so a user-visible incident can be traced through
 * the backend logs, the audit trail and the domain events (section 83).
 */
export const correlationInterceptor = (req, next) => {
    if (!req.url.startsWith('/api')) {
        return next(req);
    }
    return next(req.clone({ setHeaders: { 'X-Correlation-Id': createUuid() } }));
};
//# sourceMappingURL=correlation.interceptor.js.map