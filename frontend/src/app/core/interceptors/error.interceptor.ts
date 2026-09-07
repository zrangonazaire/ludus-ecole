import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';
import { ApiError } from '../models/common.models';
import { translateErrorCode } from '../services/error-messages';

/**
 * Les appels dont l'écran affiche lui-même l'échec.
 *
 * Ouvrir une session est le cas type : le formulaire montre le motif sous les
 * champs, à l'endroit où on regarde. Y ajouter une bulle revenait à dire deux
 * fois la même chose, dont une fois moins bien.
 *
 * <p>N'inscrire ici qu'un appel dont l'écran affiche <em>vraiment</em>
 * l'erreur. L'inscription, par exemple, n'en montre aucune : l'y ajouter la
 * rendrait muette en cas d'échec, ce qui est pire que redondant.</p>
 */
const SCREEN_OWNS_THE_ERROR = ['/auth/login'];

/**
 * Traduit l'enveloppe `ApiError` du serveur en bulle lisible, puis relance
 * l'erreur pour que l'écran appelant puisse réagir à son tour.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiError | undefined;
      const ownedByScreen = SCREEN_OWNS_THE_ERROR.some((path) => req.url.includes(path));

      // Un 401 pendant la connexion n'est pas une session expirée : il n'y
      // avait pas de session. Déconnecter et annoncer « reconnectez-vous » à
      // quelqu'un qui est justement en train de se connecter n'explique rien
      // et efface le vrai motif.
      if (error.status === 401 && !ownedByScreen) {
        notifications.error('Votre session a expiré. Veuillez vous reconnecter.');
        auth.logout();
        return throwError(() => error);
      }

      if (ownedByScreen) {
        return throwError(() => error);
      }

      notifications.error(describe(error, apiError));
      return throwError(() => error);
    })
  );
};

/**
 * Ce qu'on peut dire de vrai sur cet échec.
 *
 * Le code du serveur d'abord. À défaut — serveur éteint, passerelle qui rend
 * du HTML, réponse hors enveloppe — le statut HTTP reste une information :
 * « le serveur ne répond pas » et « le serveur a échoué » envoient chercher à
 * deux endroits différents, là où « une erreur inattendue est survenue »
 * n'envoie nulle part.
 */
export function describe(error: HttpErrorResponse, apiError?: ApiError): string {
  if (apiError?.code) {
    return translateErrorCode(apiError.code, apiError);
  }

  // Le corps peut ne pas être une enveloppe du tout : quand rien n'écoute
  // derrière le proxy de développement, celui-ci renvoie un texte brut de
  // connexion refusée. Sans ce cas, l'écran annonçait « le serveur a
  // rencontré une erreur interne » et envoyait lire des journaux qui
  // n'existent pas, faute de serveur pour les écrire.
  if (looksUnreachable(error)) {
    return 'Le serveur ne répond pas : rien n’écoute à l’adresse appelée. '
      + 'Vérifiez qu’il est démarré, et sur le port attendu.';
  }

  if (typeof apiError?.message === 'string' && apiError.message.trim().length > 0) {
    return apiError.message.trim();
  }

  switch (error.status) {
    case 0:
      return 'Serveur injoignable. Vérifiez votre connexion, '
        + 'puis réessayez.';
    case 401:
      return 'Identifiant ou mot de passe incorrect.';
    case 403:
      return "Vous n'avez pas les droits nécessaires pour cette opération.";
    case 404:
      return 'Cette adresse n’existe pas sur le serveur en cours d’exécution. '
        + 'Il est peut-être antérieur à cet écran.';
    case 413:
      return 'Le fichier envoyé est trop volumineux.';
    case 502:
    case 503:
    case 504:
      return 'Le serveur ne répond pas. S’il vient d’être relancé, '
        + 'patientez quelques secondes et réessayez.';
    default:
      break;
  }
  if (error.status >= 500) {
    return 'Le serveur a rencontré une erreur interne'
      + reference(apiError) + '.';
  }
  return `La requête a échoué (code ${error.status})${reference(apiError)}.`;
}

/**
 * Le corps trahit-il une connexion jamais établie ?
 *
 * <p>Signatures des intermédiaires, pas du serveur : refus de connexion,
 * message de proxy, page d'erreur HTML. Aucune ne peut venir de notre API,
 * qui répond toujours en JSON.</p>
 */
function looksUnreachable(error: HttpErrorResponse): boolean {
  const body = error?.error;
  if (typeof body !== 'string' || body.length === 0) {
    return false;
  }
  return /ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ETIMEDOUT|socket hang up/i.test(body)
    || (/proxy/i.test(body) && error.status >= 500);
}

/** L'identifiant de corrélation, quand il existe : c'est lui qu'on cite au support. */
function reference(apiError?: ApiError): string {
  return apiError?.correlationId ? ` (référence ${apiError.correlationId})` : '';
}
