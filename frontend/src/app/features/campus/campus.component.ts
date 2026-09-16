import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { CAMPUS_DATA_SOURCE, CampusUpsertPayload } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { Campus } from '@core/models/domain.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/**
 * Campus et salles physiques de l'établissement.
 *
 * <p>Un campus représente un site physique. Un seul campus peut être marqué
 * comme principal. L'archivage est refusé si des salles actives sont encore
 * rattachées au campus.</p>
 */
@Component({
  selector: 'eduops-campus',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './campus.component.html',
  styleUrl: './campus.component.scss'
})
export class CampusComponent implements OnInit {
  private readonly dataSource = inject(CAMPUS_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly campuses = signal<Campus[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly showArchived = signal(false);
  readonly editing = signal<Campus | null>(null);
  readonly creating = signal(false);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.CAMPUS_MANAGE));
  readonly canViewRooms = computed(() => this.auth.has(PERMISSIONS.ROOM_VIEW));

  readonly form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    addressLine1: [''],
    city: [''],
    phone: [''],
    email: [''],
    main: [false]
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.list(this.showArchived())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          this.campuses.set(list);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        }
      });
  }

  toggleArchived(): void {
    this.showArchived.update(v => !v);
    this.load();
  }

  readonly activeCount = computed(() =>
    this.campuses().filter(c => c.status === 'ACTIVE').length);

  openCreate(): void {
    this.editing.set(null);
    this.creating.set(true);
    this.form.reset({
      code: '',
      name: '',
      addressLine1: '',
      city: '',
      phone: '',
      email: '',
      main: false
    });
  }

  openEdit(campus: Campus): void {
    this.editing.set(campus);
    this.creating.set(false);
    this.form.reset({
      code: campus.code,
      name: campus.name,
      addressLine1: campus.addressLine1 ?? '',
      city: campus.city ?? '',
      phone: campus.phone ?? '',
      email: campus.email ?? '',
      main: campus.main
    });
  }

  closePanel(): void {
    this.editing.set(null);
    this.creating.set(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    const editing = this.editing();
    const value = this.form.getRawValue();
    const payload: CampusUpsertPayload = {
      code: value.code.toUpperCase().trim(),
      name: value.name.trim(),
      addressLine1: value.addressLine1.trim() || undefined,
      city: value.city.trim() || undefined,
      phone: value.phone.trim() || undefined,
      email: value.email.trim() || undefined,
      main: !!value.main
    };
    this.saving.set(true);
    const request = editing
      ? this.dataSource.update(editing.id, payload)
      : this.dataSource.create(payload);
    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (campus) => {
        this.notifications.success(
          editing ? `${campus.name} est à jour.` : `${campus.name} a été créé.`,
          editing ? 'Campus modifié' : 'Campus créé');
        this.afterWrite();
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  archive(campus: Campus): void {
    this.dataSource.archive(campus.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(
            `${campus.name} ne figure plus dans les listes de choix.`,
            'Campus archivé');
          this.afterWrite();
        },
        error: (err) => this.explain(err)
      });
  }

  restore(campus: Campus): void {
    this.dataSource.restore(campus.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.afterWrite(),
        error: (err) => this.explain(err)
      });
  }

  private afterWrite(): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
    this.setupStatus.refresh();
  }

  private explain(err: unknown): void {
    const code = (err as { error?: { code?: string } } | null | undefined)?.error?.code;
    if (code) {
      this.notifications.error(translateErrorCode(code), 'Action refusée');
    }
  }
}
