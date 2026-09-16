import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { environment } from '@env/environment';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

interface Profile { id: string; label: string; }
interface ManagedUser {
  id: string; username: string; email: string; firstName: string; lastName: string;
  status: string; profiles: Profile[];
}

@Component({
  selector: 'eduops-users', standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  templateUrl: './users.component.html',
  styleUrls: ['../access-profiles/access-profiles.component.scss', './users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notifications = inject(NotificationService);
  readonly auth = inject(AuthService);
  private readonly endpoint = `${environment.apiBaseUrl}/users`;
  readonly users = signal<ManagedUser[]>([]);
  readonly profiles = signal<Profile[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly panelOpen = signal(false);
  readonly editing = signal<ManagedUser | null>(null);
  readonly account = signal<ManagedUser | null>(null);
  readonly passwordSaving = signal(false);
  readonly passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(72)]],
    confirmation: ['', Validators.required]
  });
  readonly selected = signal<Set<string>>(new Set());
  readonly search = signal('');
  readonly created = signal<string | null>(null);
  readonly loginUrl = `${window.location.origin}/login`;
  readonly visibleUsers = computed(() => {
    const query = this.search().trim().toLocaleLowerCase('fr');
    return this.users().filter(u => [u.firstName, u.lastName, u.username, u.email,
      ...u.profiles.map(p => p.label)].join(' ').toLocaleLowerCase('fr').includes(query));
  });
  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
    lastName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
    username: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(/^[A-Za-z0-9._-]+$/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(72)]]
  });

  constructor() { this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({ users: this.http.get<ManagedUser[]>(this.endpoint),
      profiles: this.http.get<Profile[]>(`${this.endpoint}/profiles`) })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: result => { this.users.set(result.users); this.profiles.set(result.profiles); this.loading.set(false); },
        error: () => { this.error.set(true); this.loading.set(false); }
      });
  }

  canEdit(user: ManagedUser): boolean {
    return user.id !== this.auth.currentUser()?.userId
      && user.profiles.every(p => this.profiles().some(available => available.id === p.id));
  }

  openAccount(user: ManagedUser): void {
    this.passwordForm.reset();
    this.account.set(user);
  }

  closeAccount(): void {
    if (this.passwordSaving()) return;
    this.account.set(null);
    this.passwordForm.reset();
  }

  changePassword(): void {
    const value = this.passwordForm.getRawValue();
    if (this.passwordSaving() || this.passwordForm.invalid || value.newPassword !== value.confirmation) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.passwordSaving.set(true);
    this.http.post<void>(`${environment.apiBaseUrl}/auth/change-password`, {
      currentPassword: value.currentPassword, newPassword: value.newPassword
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.passwordSaving.set(false);
        this.closeAccount();
        this.notifications.success('Votre mot de passe a été modifié. Reconnectez-vous avec le nouveau mot de passe.');
        this.auth.logout();
      },
      error: () => this.passwordSaving.set(false)
    });
  }

  open(user: ManagedUser | null = null): void {
    this.editing.set(user);
    this.form.reset();
    this.selected.set(new Set(user?.profiles.map(p => p.id) ?? []));
    this.panelOpen.set(true);
  }

  close(): void {
    if (this.saving()) return;
    this.panelOpen.set(false);
    this.form.reset();
  }

  toggle(id: string): void {
    this.selected.update(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  submit(): void {
    if (this.saving() || !this.selected().size || (!this.editing() && this.form.invalid)) {
      this.form.markAllAsTouched(); return;
    }
    const user = this.editing();
    const profileIds = [...this.selected()];
    const values = this.form.getRawValue();
    this.saving.set(true);
    const request = user
      ? this.http.put<ManagedUser>(`${this.endpoint}/${user.id}/profiles`, { profileIds })
      : this.http.post<ManagedUser>(this.endpoint, { ...values,
          firstName: values.firstName.trim(), lastName: values.lastName.trim(),
          email: values.email.trim(), profileIds });
    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: result => {
        this.saving.set(false);
        this.close();
        if (!user) this.created.set(result.username);
        this.notifications.success(user ? 'Les profils du compte ont été enregistrés.' : 'Le compte est actif et peut se connecter.');
        this.load();
      },
      error: () => this.saving.set(false)
    });
  }
}
