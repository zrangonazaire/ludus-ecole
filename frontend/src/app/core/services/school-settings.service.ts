import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { SchoolSettings, SchoolSettingsPayload, AppearanceSettings,
  AppearanceSettingsPayload } from '@core/models/school-settings.models';

/**
 * Les paramètres de l'établissement : une lecture, une écriture.
 *
 * <p>En démonstration, un établissement fictif est servi depuis
 * l'environnement : montrer un formulaire vide à une école qui n'a rien
 * configuré ferait croire que rien n'existe, alors que la plateforme a déjà
 * une devise, une langue et une échelle de notation par défaut.</p>
 */
@Injectable({ providedIn: 'root' })
export class SchoolSettingsService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/school`;

  private mockSettings: SchoolSettings | null = null;
  private mockAppearance: AppearanceSettings | null = null;

  get(): Observable<SchoolSettings> {
    if (environment.useMockData) {
      return of(this.mock ?? this.seed()).pipe(delay(200));
    }
    return this.http.get<SchoolSettings>(this.base);
  }

  update(payload: SchoolSettingsPayload): Observable<SchoolSettings> {
    if (environment.useMockData) {
      this.mockSettings = { ...this.mock ?? this.seed(), ...payload };
      return of(this.mockSettings).pipe(delay(250));
    }
    return this.http.put<SchoolSettings>(this.base, payload);
  }

  /**
   * Apparence et région enregistrées pour l'établissement.
   *
   * <p>Lecture séparée de {@link get} : l'écran « Apparence et région » peut
   * s'ouvrir sans embarquer toute l'identité, et la réponse reste petite.</p>
   */
  getAppearance(): Observable<AppearanceSettings> {
    if (environment.useMockData) {
      return of(this.mockAppearance ?? this.seedAppearance()).pipe(delay(200));
    }
    return this.http.get<AppearanceSettings>(`${this.base}/appearance`);
  }

  updateAppearance(payload: AppearanceSettingsPayload): Observable<AppearanceSettings> {
    if (environment.useMockData) {
      this.mockAppearance = { ...payload };
      return of(this.mockAppearance).pipe(delay(250));
    }
    return this.http.put<AppearanceSettings>(`${this.base}/appearance`, payload);
  }

  // ─────────────────────────────────────────────── démonstration

  private get mock(): SchoolSettings | null {
    return this.mockSettings;
  }

  private seed(): SchoolSettings {
    return {
      id: 'local-school',
      code: 'HORIZON',
      status: 'ACTIVE',
      name: environment.schoolName,
      legalName: null,
      motto: null,
      registrationNumber: null,
      email: null,
      phone: null,
      website: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      country: "Cote d'Ivoire",
      currency: environment.currency,
      locale: environment.locale,
      timezone: 'Africa/Abidjan',
      gradingScaleMax: environment.gradingScaleMax,
      rankingEnabled: true,
      studentNumberPattern: 'EDU-{year}-{seq:6}',
      receiptNumberPattern: 'REC-{year}-{seq:8}',
      invoiceNumberPattern: 'INV-{year}-{seq:8}'
    };
  }

  private seedAppearance(): AppearanceSettings {
    return {
      brand: '#1f5fd6',
      fontSize: 'normal',
      currency: environment.currency,
      locale: environment.locale,
      timezone: 'Africa/Abidjan'
    };
  }
}
