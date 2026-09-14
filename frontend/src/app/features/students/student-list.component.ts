import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { Classroom, StudentSummary } from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { PERMISSIONS } from '@core/models/auth.models';

/** Students list with server-side search, filters and pagination. */
@Component({
  selector: 'eduops-student-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, DataTableComponent, StatusBadgeComponent,
    AvatarComponent, HasPermissionDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<PageResponse<StudentSummary> | null>(null);
  readonly loading = signal(true);
  readonly search = signal('');
  readonly statusFilter = signal('');
  readonly currentPage = signal(0);

  /**
   * Classe sur laquelle la liste est restreinte, venue de l'adresse.
   *
   * <p>Le bouton « Élèves » d'une fiche de classe amène ici avec son
   * identifiant. Sans cette lecture, il ouvrait l'annuaire complet — la
   * question posée était « qui est en 6e A », la réponse donnée « voici les
   * 1 284 élèves ».</p>
   */
  readonly classroomFilter = signal<string | null>(null);
  readonly classroom = signal<Classroom | null>(null);

  readonly createPermission = PERMISSIONS.STUDENT_CREATE;

  /**
   * Déclencheur de recherche, porteur de sa clé.
   *
   * <p>Un ReplaySubject, et non un Subject : les paramètres d'adresse arrivent
   * dès l'abonnement, donc avant que le flux de recherche ne soit branché. Avec
   * un Subject, cette première demande était perdue et la page tournait
   * indéfiniment.</p>
   *
   * <p>La clé porte les critères plutôt qu'un signal vide : {@code
   * distinctUntilChanged} peut alors écarter deux recherches identiques, au
   * lieu d'écarter <em>toutes</em> les recherches après la première.</p>
   */
  private readonly query$ = new ReplaySubject<string>(1);

  @ViewChild('identityTpl', { static: true })
  identityTpl!: TemplateRef<{ $implicit: StudentSummary }>;
  @ViewChild('statusTpl', { static: true })
  statusTpl!: TemplateRef<{ $implicit: StudentSummary }>;

  columns: TableColumn<StudentSummary>[] = [];

  /** Relance une recherche avec les critères courants. */
  private requery(): void {
    this.query$.next(JSON.stringify({
      page: this.currentPage(),
      search: this.search(),
      status: this.statusFilter(),
      classroomId: this.classroomFilter()
    }));
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'fullName', label: 'Élève', template: this.identityTpl, width: '32%' },
      { key: 'studentNumber', label: 'Matricule', numeric: true, width: '18%' },
      { key: 'classroomName', label: 'Classe', width: '15%' },
      { key: 'levelName', label: 'Niveau', width: '12%' },
      { key: 'age', label: 'Age', numeric: true, width: '8%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '15%' }
    ];

    this.query$
      .pipe(
        debounceTime(280),
        distinctUntilChanged(),
        switchMap(() => {
          this.loading.set(true);
          return this.dataSource.search({
            page: this.currentPage(),
            size: 20,
            search: this.search() || undefined,
            status: this.statusFilter() || undefined,
            classroomId: this.classroomFilter() || undefined
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });

    // Branché en dernier, une fois le flux de recherche prêt à recevoir.
    // L'adresse est la source : revenir en arrière ou partager le lien
    // redonne la même liste.
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const classroomId = params.get('classroomId');
        this.classroomFilter.set(classroomId);
        this.currentPage.set(0);
        this.resolveClassroom(classroomId);
        this.requery();
      });
  }

  /** Récupère le nom de la classe, pour l'annoncer en tête de liste. */
  private resolveClassroom(classroomId: string | null): void {
    if (!classroomId) {
      this.classroom.set(null);
      return;
    }
    this.classrooms.getById(classroomId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (classroom) => this.classroom.set(classroom),
        // Le filtre reste actif même si le nom n'a pas pu être lu.
        error: () => this.classroom.set(null)
      });
  }

  /** Retire la restriction de classe sans quitter l'écran. */
  clearClassroom(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { classroomId: null },
      queryParamsHandling: 'merge'
    });
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.currentPage.set(0);
    this.requery();
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value);
    this.currentPage.set(0);
    this.requery();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.requery();
  }

  /**
   * Ouvre l'assistant d'inscription en mode « Nouvel élève » : la création
   * d'un élève passe toujours par une inscription (élève + responsable + classe).
   */
  openCreateWizard(): void {
    void this.router.navigate(['/enrollments/new'], {
      queryParams: this.classroomFilter() ? { classroomId: this.classroomFilter() } : undefined
    });
  }

  openStudent(student: StudentSummary): void {
    void this.router.navigate(['/students', student.id]);
  }
}
