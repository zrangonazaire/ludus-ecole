import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentProfile } from '@core/models/student-portal.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/** La fiche lisible de l'élève (lecture seule, résolue du compte connecté). */
@Component({
  selector: 'eduops-student-profile',
  standalone: true,
  imports: [CommonModule, AvatarComponent, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly profile = signal<StudentProfile | null>(null);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);
    this.dataSource.profile().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (profile) => { this.profile.set(profile); this.loading.set(false); },
      error: () => { this.profile.set(null); this.loadFailed.set(true); this.loading.set(false); }
    });
  }

  genderLabel(value: string): string {
    switch (value) {
      case 'MALE': return 'Masculin';
      case 'FEMALE': return 'Féminin';
      default: return 'Non renseigné';
    }
  }

  birthDate(iso?: string): string {
    if (!iso) return '—';
    return new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}