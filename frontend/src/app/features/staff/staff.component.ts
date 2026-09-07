import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import {
  CONTRACT_TYPES, ContractType, Gender, STAFF_STATUSES, StaffMember, StaffStatus
} from '@core/models/staff.models';
import { NotificationService } from '@core/services/notification.service';
import { StaffService } from '@core/services/staff.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/**
 * Le personnel non enseignant : économe, secrétaire, gardien, infirmière.
 *
 * <p>Deux choses ne se modifient pas au clavier. Le matricule, attribué une
 * fois et repris sur les bulletins de paie. Et la situation, qui change par
 * une action nommée avec son motif — un départ ou une suspension méritent
 * d'être décidés, pas glissés au milieu d'une correction de numéro.</p>
 */
@Component({
  selector: 'eduops-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent,
    ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {
  private readonly staff = inject(StaffService);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly statuses = STAFF_STATUSES;
  readonly contractTypes = CONTRACT_TYPES;
  readonly genders: ReadonlyArray<{ code: Gender; label: string }> = [
    { code: 'FEMALE', label: 'Féminin' },
    { code: 'MALE', label: 'Masculin' },
    { code: 'OTHER', label: 'Autre' }
  ];

  readonly members = signal<StaffMember[]>([]);
  readonly counts = signal<Record<string, number>>({});
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly saving = signal(false);

  readonly search = signal('');
  readonly statusFilter = signal<StaffStatus | ''>('');

  readonly editing = signal<StaffMember | null>(null);
  readonly formOpen = signal(false);
  readonly statusTarget = signal<StaffMember | null>(null);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.STAFF_MANAGE));

  /** Un compte de connexion resté ouvert après un départ : personne n'y pense. */
  readonly danglingAccounts = computed(() => this.members().filter(
    (member) => member.hasUserAccount
      && (member.status === 'RESIGNED' || member.status === 'ARCHIVED')));

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(120)]],
    lastName: ['', [Validators.required, Validators.maxLength(120)]],
    gender: ['' as Gender | '', []],
    email: ['', [Validators.email, Validators.maxLength(180)]],
    phone: ['', Validators.maxLength(40)],
    jobTitle: ['', [Validators.required, Validators.maxLength(150)]],
    department: ['', Validators.maxLength(120)],
    hireDate: ['', Validators.required],
    contractType: ['PERMANENT' as ContractType, Validators.required]
  });

  readonly statusForm = this.fb.nonNullable.group({
    status: ['ON_LEAVE' as StaffStatus, Validators.required],
    reason: ['', Validators.maxLength(500)]
  });

  readonly helpCopy = {
    title: 'Les dossiers du personnel, pas les accès',
    description: 'Cet écran tient les fiches : poste, contrat, coordonnées, '
      + 'situation. Il ne crée aucun compte de connexion — les accès ont leur '
      + 'propre écran, avec leurs propres garde-fous.',
    points: [
      'Le matricule est attribué à la création et ne change plus : c’est la '
        + 'référence qu’on retrouve sur les bulletins de paie.',
      'Un départ acté ne se réactive pas. Pour un retour, on crée une '
        + 'nouvelle fiche, et l’historique reste lisible.',
      'Chaque changement de situation demande un motif : six mois plus tard, '
        + '« suspendu » sans raison ne sert plus à personne.'
    ]
  };

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.staff.search({
      search: this.search().trim() || undefined,
      status: this.statusFilter() || undefined,
      page: 0,
      size: 100
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (page) => {
        this.members.set(page.content);
        this.total.set(page.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.failed.set(true);
      }
    });

    this.staff.counts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (counts) => this.counts.set(counts), error: () => undefined });
  }

  applySearch(value: string): void {
    this.search.set(value);
    this.load();
  }

  filterStatus(status: StaffStatus | ''): void {
    this.statusFilter.set(status);
    this.load();
  }

  countOf(status: StaffStatus): number {
    return this.counts()[status] ?? 0;
  }

  openCreate(): void {
    this.editing.set(null);
    this.form.reset({
      firstName: '', lastName: '', gender: '', email: '', phone: '',
      jobTitle: '', department: '',
      hireDate: new Date().toISOString().slice(0, 10),
      contractType: 'PERMANENT'
    });
    this.formOpen.set(true);
  }

  openEdit(member: StaffMember): void {
    this.editing.set(member);
    this.form.reset({
      firstName: member.firstName,
      lastName: member.lastName,
      gender: member.gender ?? '',
      email: member.email ?? '',
      phone: member.phone ?? '',
      jobTitle: member.jobTitle,
      department: member.department ?? '',
      hireDate: member.hireDate,
      contractType: member.contractType
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const payload = {
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      gender: value.gender || undefined,
      email: value.email.trim() || undefined,
      phone: value.phone.trim() || undefined,
      jobTitle: value.jobTitle.trim(),
      department: value.department.trim() || undefined,
      hireDate: value.hireDate,
      contractType: value.contractType
    };

    this.saving.set(true);
    const existing = this.editing();
    const request = existing
      ? this.staff.update(existing.id, payload)
      : this.staff.create(payload);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (member) => {
        this.saving.set(false);
        this.formOpen.set(false);
        this.notifications.success(
          existing
            ? `Le dossier de ${member.fullName} est à jour.`
            : `${member.fullName} est enregistré sous ${member.employeeNumber}.`,
          existing ? 'Dossier modifié' : 'Dossier créé');
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(this.messageOf(err), 'Enregistrement refusé');
      }
    });
  }

  openStatus(member: StaffMember): void {
    const options = this.transitionsFor(member);
    if (options.length === 0) {
      return;
    }
    this.statusTarget.set(member);
    this.statusForm.reset({ status: options[0], reason: '' });
  }

  closeStatus(): void {
    this.statusTarget.set(null);
  }

  transitionsFor(member: StaffMember): StaffStatus[] {
    return this.staff.transitionsFrom(member.status);
  }

  labelOf(status: StaffStatus): string {
    return this.statuses.find((item) => item.code === status)?.label ?? status;
  }

  submitStatus(): void {
    const member = this.statusTarget();
    if (!member || this.statusForm.invalid || this.saving()) {
      return;
    }
    const value = this.statusForm.getRawValue();
    this.saving.set(true);
    this.staff.changeStatus(member.id, {
      status: value.status,
      reason: value.reason.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.statusTarget.set(null);
        this.notifications.success(
          `${updated.fullName} : ${updated.statusLabel}.`, 'Situation mise à jour');
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(this.messageOf(err), 'Changement refusé');
      }
    });
  }

  /** Un départ pour lequel le compte de connexion reste ouvert. */
  accountLeftOpen(member: StaffMember): boolean {
    return member.hasUserAccount
      && (member.status === 'RESIGNED' || member.status === 'ARCHIVED');
  }

  private messageOf(err: unknown): string {
    const failure = (err as { error?: { code?: string; message?: string } })?.error;
    // Le serveur explique pourquoi une transition est refusée et vers quoi
    // se tourner ; le code seul ne rendrait qu'une phrase générique.
    return failure?.message?.trim()
      || translateErrorCode(failure?.code ?? 'UNKNOWN');
  }
}
