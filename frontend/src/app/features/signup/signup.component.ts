import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SignupService } from '@core/services/signup.service';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@core/auth/auth.service';
import { DemoSetupStore } from '@core/services/demo-setup.store';

/**
 * Public signup: the school, then its administrator.
 *
 * <p>Split in two steps because asking for eleven fields at once is the surest
 * way to lose someone. Availability of the school code and the email is checked
 * live, so a conflict never surfaces only at submit time.</p>
 */
@Component({
  selector: 'eduops-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly signupService = inject(SignupService);
  private readonly notifications = inject(NotificationService);
  private readonly auth = inject(AuthService);
  private readonly demoSetup = inject(DemoSetupStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly demoDraft = this.demoSetup.draft();

  readonly step = signal<1 | 2>(1);
  readonly submitting = signal(false);

  /**
   * Le mot de passe est-il lisible à l'écran ?
   *
   * <p>Utile surtout ici : il faut satisfaire quatre règles de robustesse, et
   * corriger à l'aveugle une majuscule manquante fait recommencer la saisie
   * entière. Il redevient masqué à la soumission — un bureau d'école est un
   * poste partagé.</p>
   */
  readonly passwordVisible = signal(false);
  readonly codeAvailable = signal<boolean | null>(null);
  readonly emailAvailable = signal<boolean | null>(null);
  readonly checkingCode = signal(false);
  readonly checkingEmail = signal(false);
  readonly hasDemoDraft = this.demoSetup.hasDraft;

  readonly demoSummary = computed(() => {
    const draft = this.demoSetup.draft();
    const profileLabels = {
      primary: 'Maternelle & primaire',
      secondary: 'Collège & lycée',
      group: 'Groupe scolaire'
    } as const;
    const period = draft.rules.periodScheme === 'trimester' ? '3 trimestres' : '2 semestres';
    const scale = draft.rules.gradingScale === 'competency'
      ? 'évaluation par compétences'
      : `notes sur ${draft.rules.gradingScale}`;
    return `${profileLabels[draft.profile.preset]} · ${period} · ${scale}`;
  });

  readonly schoolForm = this.fb.nonNullable.group({
    schoolName: [this.demoDraft.profile.schoolName, [Validators.required, Validators.maxLength(200)]],
    schoolCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),
                      Validators.pattern(/^[A-Za-z0-9-]+$/)]],
    city: [this.demoDraft.profile.city],
    country: [this.demoDraft.profile.country || 'Côte d’Ivoire'],
    schoolPhone: [''],
    currency: [this.demoDraft.rules.currency, [Validators.required]]
  });

  readonly adminForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(120)]],
    lastName: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(10)]],
    acceptedTerms: [false, [Validators.requiredTrue]]
  });

  /** Mirrors the server-side rule so the user is never surprised on submit. */
  readonly passwordStrength = computed(() => {
    const value = this.passwordValue();
    const checks = {
      length: value.length >= 10,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      digit: /\d/.test(value)
    };
    const score = Object.values(checks).filter(Boolean).length;
    return {
      checks,
      score,
      label: score <= 1 ? 'Faible' : score === 2 ? 'Moyen' : score === 3 ? 'Bon' : 'Solide',
      valid: score === 4
    };
  });

  private readonly passwordValue = signal('');

  constructor() {
    // Live availability of the school code.
    this.schoolForm.controls.schoolCode.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((code) => {
          const normalised = code.trim();
          if (normalised.length < 2) {
            this.codeAvailable.set(null);
            return [];
          }
          this.checkingCode.set(true);
          return this.signupService.isSchoolCodeAvailable(normalised);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((available) => {
        this.checkingCode.set(false);
        this.codeAvailable.set(available);
      });

    this.adminForm.controls.email.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((email) => {
          if (!email.includes('@')) {
            this.emailAvailable.set(null);
            return [];
          }
          this.checkingEmail.set(true);
          return this.signupService.isEmailAvailable(email.trim());
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((available) => {
        this.checkingEmail.set(false);
        this.emailAvailable.set(available);
      });

    this.adminForm.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.passwordValue.set(value));
  }

  goToStep2(): void {
    if (this.schoolForm.invalid || this.codeAvailable() === false) {
      this.schoolForm.markAllAsTouched();
      return;
    }
    this.step.set(2);
  }

  back(): void {
    this.step.set(1);
  }

  togglePassword(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  submit(): void {
    if (this.adminForm.invalid || !this.passwordStrength().valid
        || this.emailAvailable() === false || this.submitting()) {
      this.adminForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.passwordVisible.set(false);
    this.signupService
      .signup({
        ...this.schoolForm.getRawValue(),
        ...this.adminForm.getRawValue(),
        // Ce que le visiteur a composé dans « Composer ma démo » part enfin
        // avec l'inscription. Sans cette ligne, les quatre étapes de saisie ne
        // servaient qu'à pré-remplir le nom de l'école : le serveur créait un
        // établissement vide, et le tableau de bord annonçait « 1 étape sur
        // 10 » à quelqu'un qui venait d'en remplir quatre.
        operations: this.demoSetup.operationsForSignup()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.notifications.success(
            `${response.schoolName} est cree. Annee scolaire ${response.academicYearCode} ouverte.`,
            'Bienvenue sur Soocloo');
          // The API already returns a usable session; go straight to the wizard.
          this.auth.applyExternalSession({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            userId: response.userId,
            username: response.email,
            email: response.email,
            fullName: response.fullName,
            schoolId: response.schoolId,
            roles: ['SCHOOL_ADMIN']
          });
          // Le serveur dit si l'assistant a encore quelque chose à poser.
          // Y envoyer quelqu'un dont l'école vient d'être configurée par le
          // parcours le ferait buter sur le refus de l'assistant, qui
          // s'interdit de tourner deux fois pour ne pas doubler les classes.
          // Il arrive donc directement sur son tableau de bord, déjà rempli.
          void this.router.navigate(
            [response.onboardingRequired ? '/onboarding' : '/dashboard']);
        },
        error: () => this.submitting.set(false)
      });
  }
}
