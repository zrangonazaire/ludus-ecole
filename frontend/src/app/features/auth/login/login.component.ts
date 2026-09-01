import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'eduops-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly demoMode = environment.useMockData;
  readonly schoolName = environment.schoolName;

  readonly form = this.fb.nonNullable.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        void this.router.navigateByUrl(returnUrl ?? this.auth.homeRoute());
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set('Identifiant ou mot de passe incorrect.');
      }
    });
  }

  /** One-click demo profiles, available only while mock data is on. */
  useDemoProfile(login: string): void {
    this.form.patchValue({ login, password: 'demo1234' });
    this.submit();
  }
}
