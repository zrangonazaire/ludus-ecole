import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { COMMON_LOCALES, COMMON_TIMEZONES } from '@core/models/school-settings.models';
import { NotificationService } from '@core/services/notification.service';
import { SchoolSettingsService } from '@core/services/school-settings.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/**
 * Paramètres de l'établissement.
 *
 * <p>La plupart des champs ici sont des réglages silencieux : ils n'ouvrent
 * aucune route et ne créent aucune ligne, mais ils se répercutent partout —
 * la devise des reçus, l'échelle des moyennes, le classement des bulletins,
 * la numérotation des élèves et des reçus. C'est ce qui les rend dangereux :
 * changer l'échelle de notation n'invalide rien de déjà imprimé, mais il faut
 * le savoir avant de le faire, pas après.</p>
 *
 * <p>Deux valeurs ne se changent nulle part : le code, qui identifie
 * l'établissement, et le statut, qui décide de ce que le système accepte
 * encore. L'écran les montre, sans proposer de les éditer.</p>
 */
@Component({
  selector: 'eduops-administration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements OnInit {
  private readonly settingsService = inject(SchoolSettingsService);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly timezones = COMMON_TIMEZONES;
  readonly locales = COMMON_LOCALES;

  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly saving = signal(false);

  readonly code = signal('');
  readonly status = signal<string | null>(null);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    legalName: ['', Validators.maxLength(255)],
    motto: ['', Validators.maxLength(255)],
    registrationNumber: ['', Validators.maxLength(80)],
    email: ['', [Validators.email, Validators.maxLength(180)]],
    phone: ['', Validators.maxLength(40)],
    website: ['', Validators.maxLength(200)],
    addressLine1: ['', Validators.maxLength(200)],
    addressLine2: ['', Validators.maxLength(200)],
    city: ['', Validators.maxLength(120)],
    country: ["Cote d'Ivoire", [Validators.required, Validators.maxLength(120)]],
    currency: ['XOF', [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],
    locale: ['fr-CI', [Validators.required, Validators.maxLength(10)]],
    timezone: ['Africa/Abidjan', [Validators.required, Validators.maxLength(60)]],
    gradingScaleMax: [20, [Validators.required, Validators.min(0.001), Validators.max(1000)]],
    rankingEnabled: [true],
    studentNumberPattern: ['EDU-{year}-{seq:6}', [Validators.required, Validators.maxLength(80)]],
    receiptNumberPattern: ['REC-{year}-{seq:8}', [Validators.required, Validators.maxLength(80)]],
    invoiceNumberPattern: ['INV-{year}-{seq:8}', [Validators.required, Validators.maxLength(80)]]
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.settingsService.get()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (settings) => {
          this.code.set(settings.code);
          this.status.set(settings.status);
          this.form.patchValue({
            name: settings.name ?? '',
            legalName: settings.legalName ?? '',
            motto: settings.motto ?? '',
            registrationNumber: settings.registrationNumber ?? '',
            email: settings.email ?? '',
            phone: settings.phone ?? '',
            website: settings.website ?? '',
            addressLine1: settings.addressLine1 ?? '',
            addressLine2: settings.addressLine2 ?? '',
            city: settings.city ?? '',
            country: settings.country ?? '',
            currency: settings.currency ?? 'XOF',
            locale: settings.locale ?? 'fr-CI',
            timezone: settings.timezone ?? 'Africa/Abidjan',
            gradingScaleMax: Number(settings.gradingScaleMax ?? 20),
            rankingEnabled: settings.rankingEnabled,
            studentNumberPattern: settings.studentNumberPattern ?? '',
            receiptNumberPattern: settings.receiptNumberPattern ?? '',
            invoiceNumberPattern: settings.invoiceNumberPattern ?? ''
          }, { emitEvent: false });
          this.form.markAsPristine();
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.failed.set(true);
        }
      });
  }

  /** Le formulaire s'écarte-t-il de ce que le serveur a réellement ? */
  dirty(): boolean {
    return this.form.dirty;
  }

  reset(): void {
    this.load();
  }

  submit(): void {
    if (!this.canManage() || this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const blank = (value: string): string | null => value.trim() || null;
    this.saving.set(true);
    this.settingsService.update({
      name: v.name.trim(),
      legalName: blank(v.legalName),
      motto: blank(v.motto),
      registrationNumber: blank(v.registrationNumber),
      email: blank(v.email),
      phone: blank(v.phone),
      website: blank(v.website),
      addressLine1: blank(v.addressLine1),
      addressLine2: blank(v.addressLine2),
      city: blank(v.city),
      country: v.country.trim(),
      currency: v.currency.trim().toUpperCase(),
      locale: v.locale.trim(),
      timezone: v.timezone.trim(),
      gradingScaleMax: Number(v.gradingScaleMax),
      rankingEnabled: v.rankingEnabled,
      studentNumberPattern: v.studentNumberPattern.trim(),
      receiptNumberPattern: v.receiptNumberPattern.trim(),
      invoiceNumberPattern: v.invoiceNumberPattern.trim()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.form.markAsPristine();
        this.notifications.success(
          'Les paramètres de l’établissement sont enregistrés.', 'Paramètres mis à jour');
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(this.messageOf(err), 'Enregistrement refusé');
      }
    });
  }

  invalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  private messageOf(err: unknown): string {
    const failure = (err as { error?: { code?: string; message?: string } })?.error;
    return failure?.message?.trim()
      || translateErrorCode(failure?.code ?? 'UNKNOWN');
  }
}
