import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { RoomCampusOption } from '@core/models/room.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';

export interface Building {
  id: string; campusId: string; campusName: string; code: string; name: string;
  floors: number; roomCount: number;
  levels?: { id: string; number: number; label: string }[];
}

@Component({
  selector: 'eduops-buildings', standalone: true, imports: [ReactiveFormsModule],
  templateUrl: './buildings.component.html',
  styleUrls: ['./rooms.component.scss', './buildings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingsComponent {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notifications = inject(NotificationService);
  readonly auth = inject(AuthService);
  readonly campuses = input<RoomCampusOption[]>([]);
  readonly changed = output<Building[]>();
  readonly buildings = signal<Building[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly opened = signal(false);
  readonly saving = signal(false);
  readonly adding = signal<string | null>(null);
  addLevel(building: Building): void {
    if (this.adding()) return;
    this.adding.set(building.id);
    this.http.post<Building>(`${environment.apiBaseUrl}/buildings/${building.id}/levels`, {})
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => { this.adding.set(null); this.load(); },
        error: () => this.adding.set(null)
      });
  }
  readonly form = this.fb.nonNullable.group({
    campusId: ['', Validators.required],
    code: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
    floors: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]]
  });
  constructor() { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set(false);
    this.http.get<Building[]>(`${environment.apiBaseUrl}/buildings`)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: list => { this.buildings.set(list); this.changed.emit(list); this.loading.set(false); },
        error: () => { this.error.set(true); this.loading.set(false); }
      });
  }
  open(): void {
    this.form.reset({ campusId: this.campuses().find(c => c.status === 'ACTIVE')?.id ?? '', code: '', name: '', floors: 0 });
    this.opened.set(true);
  }
  close(): void { if (!this.saving()) this.opened.set(false); }
  submit(): void {
    if (this.form.invalid || this.saving()) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    this.saving.set(true);
    this.http.post<Building>(`${environment.apiBaseUrl}/buildings`, {
      ...value, code: value.code.trim().toUpperCase(), name: value.name.trim()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: building => {
        this.saving.set(false); this.opened.set(false);
        this.notifications.success(`${building.name} a été créé.`, 'Bâtiment créé');
        this.load();
      },
      error: () => this.saving.set(false)
    });
  }
}
