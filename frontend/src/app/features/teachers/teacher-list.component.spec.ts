import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { Teacher } from '@core/models/domain.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { TeacherAccountService } from '@core/services/teacher-account.service';
import { TeacherListComponent } from './teacher-list.component';

describe('Liste des enseignants', () => {
  /** Un compte au profil Enseignant dont la fiche reste à créer. */
  const pending: Teacher = {
    id: 'account-1', userAccountId: 'account-1', hasTeacherRecord: false,
    employeeNumber: '', firstName: 'Awa', lastName: 'Koné', fullName: 'Awa Koné',
    email: 'awa@example.test', status: 'ACTIVE'
  };
  /** Un compte rattaché à sa fiche. */
  const filed: Teacher = {
    id: 'teacher-1', userAccountId: 'account-2', hasTeacherRecord: true,
    employeeNumber: 'ENS-2026-0001', firstName: 'Yao', lastName: 'Bamba', fullName: 'Yao Bamba',
    email: 'yao@example.test', speciality: 'Mathématiques', status: 'ACTIVE', classCount: 2
  };
  /** Une fiche restée sans compte, à rattacher. */
  const orphan: Teacher = {
    id: 'teacher-2', hasTeacherRecord: true, employeeNumber: 'ENS-OLD',
    firstName: 'Ada', lastName: 'Koffi', fullName: 'Ada Koffi',
    email: 'ada@example.test', status: 'ACTIVE'
  };

  let roster: jasmine.Spy;
  let canManage: boolean;

  beforeEach(() => {
    canManage = true;
    roster = jasmine.createSpy('roster').and.returnValue(of(page([pending, filed, orphan])));
    TestBed.configureTestingModule({
      imports: [TeacherListComponent],
      providers: [
        provideRouter([]),
        { provide: TEACHER_DATA_SOURCE, useValue: { roster, search: jasmine.createSpy('search') } },
        { provide: TeacherAccountService, useValue: { available: () => of([]), link: () => of(pending) } },
        { provide: AuthService, useValue: { has: () => canManage } },
        { provide: NotificationService, useValue: { success: jasmine.createSpy('success') } }
      ]
    });
  });

  function page(content: Teacher[]): PageResponse<Teacher> {
    return { content, page: 0, size: 20, totalElements: content.length,
      totalPages: 1, first: true, last: true };
  }

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(TeacherListComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('lists the accounts with the teacher profile, not only the files', () => {
    const el = render();
    expect(roster).toHaveBeenCalledWith({ page: 0, size: 20, search: undefined });
    expect(el.textContent).toContain('3 enseignant(s)');
    // Le compte sans fiche est bien une ligne du tableau, avec l'action qui la crée.
    expect(el.textContent).toContain('Awa Koné');
    const create = Array.from(el.querySelectorAll('a')).find(a => a.textContent?.includes('Créer la fiche enseignant'));
    expect(create?.getAttribute('href')).toBe('/teachers/new?accountId=account-1');
    expect(el.textContent).toContain('Compte Enseignant lié');
    // La fiche orpheline ne disparaît pas : elle reste rattachable.
    expect(Array.from(el.querySelectorAll('button')).some(b => b.textContent?.includes('Rattacher un utilisateur'))).toBeTrue();
  });

  it('shows plain states instead of the actions without the manage permission', () => {
    canManage = false;
    const el = render();
    expect(el.textContent).toContain('Fiche à créer');
    expect(el.textContent).toContain('Compte à rattacher');
    expect(Array.from(el.querySelectorAll('a')).some(a => a.textContent?.includes('Créer la fiche enseignant'))).toBeFalse();
  });

  it('searches again from the first page', () => {
    const fixture = TestBed.createComponent(TeacherListComponent);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#teacher-search') as HTMLInputElement;
    input.value = 'Koffi';
    input.dispatchEvent(new Event('input'));
    expect(roster).toHaveBeenCalledWith({ page: 0, size: 20, search: 'Koffi' });
  });
});
