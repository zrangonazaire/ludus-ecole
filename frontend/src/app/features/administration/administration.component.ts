import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolLogoComponent } from './school-logo.component';
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
 * Paramètres de l'établissement : identité, coordonnées, préférences et gabarits de numérotation.
 */
@Component({
  selector: 'eduops-administration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent, SchoolLogoComponent],
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

  // État de la séquence
  readonly studentCurrentNumber = signal<number>(0);
  readonly studentSequenceUpdatedAt = signal<string | null>(null);
  readonly previewStudent = signal<string>('');
  readonly previewNextStudent = signal<string>('');
  readonly previewTeacher = signal<string>('');
  readonly previewStaff = signal<string>('');
  readonly patternError = signal<string | null>(null);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));

  readonly form = this.fb.group({
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
    invoiceNumberPattern: ['INV-{year}-{seq:8}', [Validators.required, Validators.maxLength(80)]],
    teacherNumberPattern: ['ENS-{year}-{seq:4}', [Validators.maxLength(80)]],
    staffNumberPattern: ['STF-{year}-{seq:4}', [Validators.maxLength(80)]],
    studentSequenceResetPolicy: ['ANNUAL' as 'ANNUAL' | 'CONTINUOUS', [Validators.required]],
    studentSequenceNextNumber: [1 as number | null, [Validators.required, Validators.min(1)]],
    studentSequenceStartNumber: [1 as number | null, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.load();

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updatePreviews();
      });
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
          this.studentCurrentNumber.set(settings.studentSequenceCurrentNumber ?? 0);
          this.studentSequenceUpdatedAt.set(settings.studentSequenceUpdatedAt ?? null);

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
            studentNumberPattern: settings.studentNumberPattern ?? 'EDU-{year}-{seq:6}',
            receiptNumberPattern: settings.receiptNumberPattern ?? 'REC-{year}-{seq:8}',
            invoiceNumberPattern: settings.invoiceNumberPattern ?? 'INV-{year}-{seq:8}',
            teacherNumberPattern: settings.teacherNumberPattern ?? 'ENS-{year}-{seq:4}',
            staffNumberPattern: settings.staffNumberPattern ?? 'STF-{year}-{seq:4}',
            studentSequenceResetPolicy: settings.studentSequenceResetPolicy ?? 'ANNUAL',
            studentSequenceNextNumber: settings.studentSequenceNextNumber ?? 1,
            studentSequenceStartNumber: settings.studentSequenceStartNumber ?? 1
          }, { emitEvent: false });

          this.updatePreviews();
          this.form.markAsPristine();
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.failed.set(true);
        }
      });
  }

  /** Met à jour la prévisualisation en temps réel des matricules. */
  updatePreviews(): void {
    const raw = this.form.getRawValue();
    const studentPattern = raw.studentNumberPattern?.trim() ?? '';
    const nextNum = Number(raw.studentSequenceNextNumber) || 1;
    const schoolCode = this.code() || 'EDU';

    if (!studentPattern.includes('{seq')) {
      this.patternError.set('Le format doit obligatoirement inclure un compteur {seq} ou {seq:n}.');
      this.previewStudent.set('');
      this.previewNextStudent.set('');
    } else {
      this.patternError.set(null);
      this.previewStudent.set(this.formatPattern(studentPattern, schoolCode, nextNum));
      this.previewNextStudent.set(this.formatPattern(studentPattern, schoolCode, nextNum + 1));
    }

    const teacherPat = raw.teacherNumberPattern?.trim() || 'ENS-{year}-{seq:4}';
    this.previewTeacher.set(this.formatPattern(teacherPat, schoolCode, 1));

    const staffPat = raw.staffNumberPattern?.trim() || 'STF-{year}-{seq:4}';
    this.previewStaff.set(this.formatPattern(staffPat, schoolCode, 1));
  }

  /** Insère un jeton de variable à l'emplacement actuel du champ gabarit élève. */
  insertTag(tag: string, controlName: string = 'studentNumberPattern'): void {
    const ctrl = this.form.get(controlName);
    if (!ctrl) return;
    const current = ctrl.value ?? '';
    ctrl.setValue(current + tag);
    ctrl.markAsDirty();
    this.updatePreviews();
  }

  /** Définit le prochain numéro de séquence à une valeur spécifique (ex: 1). */
  setNextNumberTo(val: number): void {
    const ctrl = this.form.get('studentSequenceNextNumber');
    if (!ctrl) return;
    ctrl.setValue(val);
    ctrl.markAsDirty();
    this.updatePreviews();
  }

  private formatPattern(pattern: string, schoolCode: string, seqValue: number): string {
    if (!pattern) return '';
    const now = new Date();
    const year = String(now.getFullYear());
    const yy = year.substring(year.length - 2);

    let res = pattern
      .replace(/\{year\}/g, year)
      .replace(/\{yy\}/g, yy)
      .replace(/\{schoolCode\}/g, schoolCode)
      .replace(/\{code\}/g, schoolCode);

    res = res.replace(/\{seq(?::(\d+))?\}/g, (_, widthStr) => {
      const width = widthStr ? parseInt(widthStr, 10) : 6;
      const valStr = String(seqValue);
      return valStr.length >= width ? valStr : '0'.repeat(width - valStr.length) + valStr;
    });

    return res;
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
    const blank = (value: string | null | undefined): string | null =>
      value && value.trim() ? value.trim() : null;

    this.saving.set(true);
    this.settingsService.update({
      name: v.name?.trim() ?? '',
      legalName: blank(v.legalName),
      motto: blank(v.motto),
      registrationNumber: blank(v.registrationNumber),
      email: blank(v.email),
      phone: blank(v.phone),
      website: blank(v.website),
      addressLine1: blank(v.addressLine1),
      addressLine2: blank(v.addressLine2),
      city: blank(v.city),
      country: v.country?.trim() ?? "Cote d'Ivoire",
      currency: (v.currency?.trim() ?? 'XOF').toUpperCase(),
      locale: v.locale?.trim() ?? 'fr-CI',
      timezone: v.timezone?.trim() ?? 'Africa/Abidjan',
      gradingScaleMax: Number(v.gradingScaleMax ?? 20),
      rankingEnabled: !!v.rankingEnabled,
      studentNumberPattern: v.studentNumberPattern?.trim() ?? 'EDU-{year}-{seq:6}',
      receiptNumberPattern: v.receiptNumberPattern?.trim() ?? 'REC-{year}-{seq:8}',
      invoiceNumberPattern: v.invoiceNumberPattern?.trim() ?? 'INV-{year}-{seq:8}',
      teacherNumberPattern: blank(v.teacherNumberPattern),
      staffNumberPattern: blank(v.staffNumberPattern),
      studentSequenceResetPolicy: v.studentSequenceResetPolicy ?? 'ANNUAL',
      studentSequenceNextNumber: v.studentSequenceNextNumber != null ? Number(v.studentSequenceNextNumber) : null,
      studentSequenceStartNumber: v.studentSequenceStartNumber != null ? Number(v.studentSequenceStartNumber) : 1
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.studentCurrentNumber.set(updated.studentSequenceCurrentNumber ?? 0);
        this.studentSequenceUpdatedAt.set(updated.studentSequenceUpdatedAt ?? null);
        this.form.markAsPristine();
        this.updatePreviews();
        this.notifications.success(
          'Les paramètres et la numérotation sont enregistrés avec succès.', 'Paramètres mis à jour');
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
