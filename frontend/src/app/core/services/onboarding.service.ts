import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

/**
 * L'assistant de configuration, envoyé au serveur.
 *
 * <p>L'assistant se terminait sur un `setTimeout` de 900 ms suivi d'un message
 * « Établissement configuré » annonçant les chiffres saisis. Rien n'était
 * créé : le composant n'injectait aucune source de données. Annoncer à un
 * directeur que son école est prête alors qu'elle est vide est pire qu'une
 * erreur — il ne s'en aperçoit que des semaines plus tard, devant un écran qui
 * aurait dû contenir ses élèves.</p>
 *
 * <p>Un seul appel, une seule transaction côté serveur. Dix appels successifs
 * depuis le navigateur laisseraient une école à moitié configurée le jour où
 * le huitième échoue, et personne ne saurait dire quelle moitié.</p>
 */

export interface OnboardingLevelPayload {
  code: string;
  name: string;
  /** Les noms de classes, déjà résolus par l'assistant. */
  classNames: string[];
  capacity: number;
  registrationFee: number;
  tuitionTotal: number;
  instalments: number;
}

export interface OnboardingCyclePayload {
  code: string;
  name: string;
  levels: OnboardingLevelPayload[];
}

export interface OnboardingPayload {
  cycles: OnboardingCyclePayload[];
  subjects: { code: string; name: string; coefficient: number }[];
}

/** Ce qui a réellement été créé, compté sur les lignes enregistrées. */
export interface OnboardingResult {
  cycles: number;
  levels: number;
  classrooms: number;
  subjects: number;
  feeSchedules: number;
  /** Ce qui a été ignoré, et pourquoi : un doublon, un nom vide. */
  skipped: string[];
}

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly http = inject(HttpClient);

  apply(payload: OnboardingPayload): Observable<OnboardingResult> {
    return this.http.post<OnboardingResult>(
      `${environment.apiBaseUrl}/school/onboarding`, payload);
  }
}
