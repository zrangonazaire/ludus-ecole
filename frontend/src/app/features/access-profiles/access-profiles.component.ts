import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ACCESS_PROFILE_DATA_SOURCE } from '@core/datasource/data-source';
import {
  AccessPermission, AccessProfile, AccessProfilePayload
} from '@core/models/access-profile.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

/** Gestion des profils d'accès : un profil est un ensemble nommé de permissions. */
@Component({
  selector: 'eduops-access-profiles',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './access-profiles.component.html',
  styleUrl: './access-profiles.component.scss'
})
export class AccessProfilesComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly dataSource = inject(ACCESS_PROFILE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly profiles = signal<AccessProfile[]>([]);
  readonly permissions = signal<AccessPermission[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly editing = signal<AccessProfile | null>(null);
  readonly panelOpen = signal(false);
  readonly viewing = signal(false);
  readonly selectedPermissions = signal<Set<string>>(new Set());

  readonly profileForm = this.fb.nonNullable.group({
    label: ['', [Validators.required, Validators.maxLength(150)]],
    code: ['', [Validators.required, Validators.maxLength(60),
      Validators.pattern(/^[A-Z0-9_]+$/)]],
    description: ['', [Validators.maxLength(500)]]
  });

  readonly visibleProfiles = computed(() => {
    const needle = this.search().trim().toLocaleLowerCase('fr');
    if (!needle) {
      return this.profiles();
    }
    return this.profiles().filter((profile) =>
      [profile.label, profile.code, profile.description ?? '']
        .some((value) => value.toLocaleLowerCase('fr').includes(needle)));
  });

  readonly customCount = computed(
    () => this.profiles().filter((profile) => !profile.systemProfile).length);

  readonly permissionGroups = computed(() => {
    const groups = new Map<string, AccessPermission[]>();
    this.permissions().forEach((permission) => {
      const items = groups.get(permission.module) ?? [];
      items.push(permission);
      groups.set(permission.module, items);
    });
    return Array.from(groups.entries()).map(([module, items]) => ({ module, items }));
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.overview().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (overview) => {
        this.profiles.set(overview.profiles);
        this.permissions.set(overview.permissions);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  openCreate(): void {
    this.viewing.set(false);
    this.profileForm.enable();
    this.editing.set(null);
    this.profileForm.reset({ label: '', code: '', description: '' });
    this.selectedPermissions.set(new Set());
    this.panelOpen.set(true);
  }

  openEdit(profile: AccessProfile): void {
    this.viewing.set(!profile.editable);
    this.profileForm.enable();
    this.editing.set(profile);
    this.profileForm.reset({
      label: profile.label,
      code: profile.code,
      description: profile.description ?? ''
    });
    this.selectedPermissions.set(new Set(profile.permissionCodes));
    if (!profile.editable) this.profileForm.disable();
    this.panelOpen.set(true);
  }

  duplicate(profile: AccessProfile): void {
    this.openCreate();
    const base = `${profile.code.slice(0, 45)}_COPIE`;
    let code = base;
    let suffix = 2;
    while (this.profiles().some(item => item.code === code)) code = `${base}_${suffix++}`;
    this.profileForm.reset({
      label: `${profile.label.slice(0, 125)} (copie)`, code,
      description: profile.description ?? ''
    });
    this.selectedPermissions.set(new Set(profile.permissionCodes));
  }

  closePanel(): void {
    if (this.saving()) {
      return;
    }
    this.panelOpen.set(false);
    this.editing.set(null);
  }

  onLabelInput(value: string): void {
    if (!this.editing() && !this.profileForm.controls.code.dirty) {
      this.profileForm.controls.code.setValue(this.normaliseCode(value));
    }
  }

  normaliseCodeInput(): void {
    this.profileForm.controls.code.setValue(
      this.normaliseCode(this.profileForm.controls.code.value));
  }

  togglePermission(code: string): void {
    if (this.viewing() || this.saving()) return;
    this.selectedPermissions.update((current) => {
      const next = new Set(current);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  toggleGroup(items: AccessPermission[]): void {
    if (this.viewing() || this.saving()) return;
    const allSelected = items.every((item) => this.selectedPermissions().has(item.code));
    this.selectedPermissions.update((current) => {
      const next = new Set(current);
      items.forEach((item) => allSelected ? next.delete(item.code) : next.add(item.code));
      return next;
    });
  }

  groupSelected(items: AccessPermission[]): boolean {
    return items.length > 0
      && items.every((item) => this.selectedPermissions().has(item.code));
  }

  submit(): void {
    if (this.viewing()) return;
    if (this.profileForm.invalid || this.selectedPermissions().size === 0 || this.saving()) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const value = this.profileForm.getRawValue();
    const payload: AccessProfilePayload = {
      label: value.label.trim(),
      code: this.normaliseCode(value.code),
      description: value.description.trim() || undefined,
      permissionCodes: Array.from(this.selectedPermissions()).sort()
    };
    const current = this.editing();
    const request = current
      ? this.dataSource.update(current.id, payload)
      : this.dataSource.create(payload);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (profile) => {
        this.notifications.success(
          current ? `${profile.label} est à jour.` : `${profile.label} peut maintenant être attribué.`,
          current ? 'Profil modifié' : 'Profil créé');
        this.panelOpen.set(false);
        this.editing.set(null);
        this.saving.set(false);
        this.load();
      },
      error: () => this.saving.set(false)
    });
  }

  private normaliseCode(value: string): string {
    return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }
}
