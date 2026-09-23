import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { COMMON_LOCALES, COMMON_TIMEZONES } from '@core/models/school-settings.models';
import { NotificationService } from '@core/services/notification.service';
import {
  AppearancePreferences, AppearancePreferencesService, FontSizeChoice
} from './appearance-preferences.service';

/** Onglet Apparence et region : couleur, taille de police, devise, langue, fuseau. */
@Component({
  selector: 'eduops-system-config-appearance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './system-config-appearance.component.html',
  styleUrl: './system-config.component.scss'
})
export class SystemConfigAppearanceComponent {
  private readonly appearanceService = inject(AppearancePreferencesService);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  readonly timezones = COMMON_TIMEZONES;
  readonly locales = COMMON_LOCALES;
  readonly fontChoices: readonly { key: FontSizeChoice; label: string }[] = [
    { key: 'small', label: 'Compacte' },
    { key: 'normal', label: 'Normale' },
    { key: 'large', label: 'Large' }
  ];
  readonly canEdit = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));
  readonly saved = signal<AppearancePreferences>(this.appearanceService.load());

  readonly form = this.fb.nonNullable.group({
    brand: [this.saved().brand, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
    fontSize: [this.saved().fontSize, Validators.required],
    currency: [this.saved().currency, [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],
    locale: [this.saved().locale, Validators.required],
    timezone: [this.saved().timezone, Validators.required]
  });

  constructor() {
    this.form.valueChanges.subscribe(() => this.preview());
  }

  private current(): AppearancePreferences {
    const v = this.form.getRawValue();
    return {
      brand: v.brand.trim(), fontSize: v.fontSize,
      currency: v.currency.trim().toUpperCase(),
      locale: v.locale.trim(), timezone: v.timezone.trim()
    };
  }

  preview(): void {
    if (this.form.invalid) {
      return;
    }
    this.appearanceService.apply(this.current());
  }

  save(): void {
    if (!this.canEdit() || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const prefs = this.current();
    this.appearanceService.save(prefs);
    this.saved.set(prefs);
    this.notifications.success(
      'Couleur, taille de police, devise, langue et fuseau appliqués sur ce navigateur.',
      'Apparence enregistrée');
  }

  reset(): void {
    const defaults = this.appearanceService.reset();
    this.saved.set(defaults);
    this.form.patchValue(defaults);
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
}
