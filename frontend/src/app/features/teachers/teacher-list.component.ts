import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherAccountService } from '@core/services/teacher-account.service';
import { TeacherAccount } from '@core/models/teacher.models';
import { NotificationService } from '@core/services/notification.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { Teacher } from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';

@Component({
  selector: 'eduops-teacher-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DataTableComponent, StatusBadgeComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">Enseignants</h1>
          @if (page(); as result) {
            <p class="page__meta numeric">{{ result.totalElements }} enseignant(s)</p>
          }
          <p class="page__meta">Comptes portant le profil Enseignant, avec leur fiche pédagogique ; une
            fiche restée sans compte reste visible pour être rattachée.</p>
        </div>
        <div class="page__actions">
          @if (auth.has(permissions.TEACHER_MANAGE)) {
          <a routerLink="/teacher-assignments" class="btn btn--secondary">Affecter aux classes</a>
          <a routerLink="/teachers/new" class="btn btn--primary">
            <span aria-hidden="true">+</span> Nouvel enseignant
          </a>
          }
        </div>
      </header>

      @if (linking(); as teacher) {
        <section class="card" style="padding: 1rem; margin-bottom: 1rem" aria-label="Rattacher le compte enseignant">
          <h2>Rattacher {{ teacher.fullName }}</h2>
          <p>Choisissez son compte actif portant le profil Enseignant. Le contrat et les affectations seront conservés.</p>
          <label for="link-teacher-user">Compte utilisateur</label>
          <select class="input" id="link-teacher-user" [(ngModel)]="accountId" [disabled]="linkSaving()">
            <option value="">Sélectionner un utilisateur…</option>
            @for (account of accounts(); track account.id) {
              <option [value]="account.id">{{ account.firstName }} {{ account.lastName }} — {{ account.email }}</option>
            }
          </select>
          @if (linkError()) { <p role="alert">{{ linkError() }}</p> }
          <button class="btn btn--primary" type="button" (click)="confirmLink()" [disabled]="!accountId || linkSaving()">Rattacher ce compte</button>
          <button class="btn btn--secondary" type="button" (click)="linking.set(null)" [disabled]="linkSaving()">Annuler</button>
        </section>
      }
      <section class="card">
        <div class="card__header">
          <label class="visually-hidden" for="teacher-search">Rechercher un enseignant</label>
          <input id="teacher-search" class="input" type="search" style="max-width: 340px"
                 placeholder="Nom, e-mail ou matricule"
                 (input)="onSearch($any($event.target).value)" />
        </div>
        <eduops-data-table
          [columns]="columns" [page]="page()" [loading]="loading()"
          caption="Liste des enseignants"
          (pageChange)="onPageChange($event)" />
      </section>
    </div>

    <ng-template #identityTpl let-teacher>
      <div class="row">
        <eduops-avatar [name]="teacher.fullName" [photoUrl]="teacher.photoUrl" size="sm" />
        <div>
          <p style="margin:0;font-weight:600;color:var(--text-strong)">{{ teacher.fullName }}</p>
          <p style="margin:0;font-size:var(--text-xs);color:var(--text-muted)">{{ teacher.email }}</p>
        </div>
      </div>
    </ng-template>

    <ng-template #accountTpl let-teacher>
      @if (teacher.hasTeacherRecord === false) {
        @if (auth.has(permissions.TEACHER_MANAGE)) {
          <a class="btn btn--secondary" [routerLink]="['/teachers/new']"
             [queryParams]="{ accountId: teacher.userAccountId }">Créer la fiche enseignant</a>
        } @else { <span>Fiche à créer</span> }
      }
      @else if (teacher.userAccountId) { <span>Compte Enseignant lié</span> }
      @else if (auth.has(permissions.TEACHER_MANAGE)) {
        <button type="button" class="btn btn--secondary" (click)="openLink(teacher)">Rattacher un utilisateur</button>
      } @else { <span>Compte à rattacher</span> }
    </ng-template>

    <ng-template #statusTpl let-teacher>
      <eduops-status-badge [status]="teacher.status" />
    </ng-template>
  `
})
export class TeacherListComponent implements OnInit {
  readonly auth = inject(AuthService);
  readonly permissions = PERMISSIONS;
  private readonly dataSource = inject(TEACHER_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);
  private readonly accountService = inject(TeacherAccountService);
  private readonly notifications = inject(NotificationService);
  readonly linking = signal<Teacher | null>(null);
  readonly accounts = signal<TeacherAccount[]>([]);
  readonly linkSaving = signal(false);
  readonly linkError = signal('');
  accountId = '';
  @ViewChild('accountTpl', { static: true }) accountTpl!: TemplateRef<{ $implicit: Teacher }>;

  openLink(teacher: Teacher): void {
    this.linking.set(teacher); this.accountId = ''; this.accounts.set([]); this.linkError.set('');
    this.accountService.available().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: accounts => {
        this.accounts.set(accounts);
        if (!accounts.length) this.linkError.set('Aucun compte Enseignant disponible. Créez-le ou attribuez ce profil dans Utilisateurs.');
      },
      error: () => this.linkError.set('Chargement impossible. Fermez puis réessayez.')
    });
  }

  confirmLink(): void {
    const teacher = this.linking();
    if (!teacher || !this.accountId || this.linkSaving()) return;
    this.linkSaving.set(true); this.linkError.set('');
    this.accountService.link(teacher.id, this.accountId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.linkSaving.set(false); this.linking.set(null); this.load(); this.notifications.success('Compte utilisateur rattaché.'); },
      error: err => { this.linkSaving.set(false); this.linkError.set(err?.error?.message ?? 'Rattachement impossible.'); }
    });
  }


  readonly page = signal<PageResponse<Teacher> | null>(null);
  readonly loading = signal(true);

  private search = '';
  private currentPage = 0;

  @ViewChild('identityTpl', { static: true })
  identityTpl!: TemplateRef<{ $implicit: Teacher }>;
  @ViewChild('statusTpl', { static: true })
  statusTpl!: TemplateRef<{ $implicit: Teacher }>;

  columns: TableColumn<Teacher>[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'fullName', label: 'Enseignant', template: this.identityTpl, width: '34%' },
      { key: 'employeeNumber', label: 'Matricule', numeric: true, width: '14%' },
      { key: 'speciality', label: 'Spécialité', width: '20%' },
      { key: 'classCount', label: 'Classes', numeric: true, width: '10%' },
      { key: 'userAccountId', label: 'Utilisateur', template: this.accountTpl, width: '20%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '10%' }
    ];
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.dataSource
      .roster({ page: this.currentPage, size: 20, search: this.search || undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  onSearch(value: string): void {
    this.search = value;
    this.currentPage = 0;
    this.load();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.load();
  }
}
