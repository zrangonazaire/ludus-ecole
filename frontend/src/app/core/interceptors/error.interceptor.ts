import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';
import { ApiError } from '../models/common.models';
import { translateErrorCode } from '../services/error-messages';

/**
 * Turns the backend's `ApiError` envelope into a localised toast and
 * re-throws so the calling component can still react.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiError | undefined;

      if (error.status === 401) {
        notifications.error('Votre session a expire. Veuillez vous reconnecter.');
        auth.logout();
        return throwError(() => error);
      }

      if (error.status === 0) {
        notifications.error('Serveur injoignable. Verifiez votre connexion.');
        return throwError(() => error);
      }

      const message = apiError?.code
        ? translateErrorCode(apiError.code, apiError)
        : (apiError?.message ?? 'Une erreur inattendue est survenue.');

      notifications.error(message);
      return throwError(() => error);
    })
  );
};
