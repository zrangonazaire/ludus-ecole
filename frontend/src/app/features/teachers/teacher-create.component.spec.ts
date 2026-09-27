import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TeacherCreateComponent } from './teacher-create.component';
import { CURRICULUM_DATA_SOURCE, REFERENCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { TeacherAccountService } from '@core/services/teacher-account.service';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';

describe('Teacher creation', () => {
  const account = { id: 'account', firstName: 'Awa', lastName: 'Koné', email: 'awa@example.test' };
  let data: { create: jasmine.Spy };
  let curriculum: { createSubject: jasmine.Spy };
  let reference: { subjects: jasmine.Spy };
  let allowed: boolean;

  beforeEach(() => {
    allowed = true;
    data = { create: jasmine.createSpy().and.returnValue(throwError(() => ({ error: { message: 'Conflit' } }))) };
    curriculum = { createSubject: jasmine.createSpy() };
    reference = { subjects: jasmine.createSpy().and.returnValue(of([{ name: 'Mathématiques' }])) };
    TestBed.configureTestingModule({
      imports: [TeacherCreateComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({}) } } },
        { provide: TEACHER_DATA_SOURCE, useValue: data },
        { provide: REFERENCE_DATA_SOURCE, useValue: reference },
        { provide: CURRICULUM_DATA_SOURCE, useValue: curriculum },
        { provide: TeacherAccountService, useValue: { available: () => of([account]) } },
        { provide: AuthService, useValue: { has: () => allowed } },
        { provide: NotificationService, useValue: { success: () => {} } }
      ]
    });
  });

  it('shows custom speciality after changing the selection and clears its validation when leaving it', () => {
    const fixture = TestBed.createComponent(TeacherCreateComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#specialityCustom')).toBeNull();
    const select = fixture.nativeElement.querySelector('#speciality');
    select.value = '__other';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#specialityCustom')).toBeTruthy();
    component.form.patchValue({ userAccountId: account.id, hireDate: '2026-09-25', specialityCustom: '   ' });
    component.save();
    expect(data.create).not.toHaveBeenCalled();
    component.form.controls.speciality.setValue('Mathématiques');
    expect(component.form.valid).toBeTrue();
  });

  it('sends the selected account and trimmed custom speciality and exposes save failures', () => {
    const component = TestBed.createComponent(TeacherCreateComponent).componentInstance;
    component.form.patchValue({ userAccountId: account.id, hireDate: '2026-09-25', speciality: '__other', specialityCustom: ' Informatique ' });
    component.save();
    expect(data.create).toHaveBeenCalledWith({
      userAccountId: account.id, hireDate: '2026-09-25', speciality: 'Informatique',
      qualification: '', contractType: 'PERMANENT', weeklyHoursMax: 24
    });
    expect(component.error()).toBe('Conflit');
    expect(component.saving()).toBeFalse();
  });

  it('does not offer or execute subject creation without permission', () => {
    allowed = false;
    const fixture = TestBed.createComponent(TeacherCreateComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('option[value="__new"]')).toBeNull();
    fixture.componentInstance.subjectForm.patchValue({ name: 'Informatique', code: 'INFO' });
    fixture.componentInstance.createSubject();
    expect(curriculum.createSubject).not.toHaveBeenCalled();
  });

  it('allows retrying a failed catalogue load', () => {
    reference.subjects.and.returnValue(throwError(() => new Error('offline')));
    const component = TestBed.createComponent(TeacherCreateComponent).componentInstance;
    expect(component.subjectsError()).toBeTrue();
    reference.subjects.and.returnValue(of([{ name: 'Informatique' }]));
    component.loadSubjects();
    expect(component.subjectsError()).toBeFalse();
    expect(component.subjectOptions()).toEqual(['Informatique']);
  });

  it('rejects an unavailable account', () => {
    const component = TestBed.createComponent(TeacherCreateComponent).componentInstance;
    component.form.patchValue({ userAccountId: 'missing', hireDate: '2026-09-25' });
    component.save();
    expect(data.create).not.toHaveBeenCalled();
  });

  it('preselects the account handed over by the users page', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { queryParamMap: convertToParamMap({ accountId: account.id }) } }
    });
    const component = TestBed.createComponent(TeacherCreateComponent).componentInstance;
    expect(component.form.controls.userAccountId.value).toBe(account.id);
  });

  it('ignores an account that is no longer available', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { queryParamMap: convertToParamMap({ accountId: 'gone' }) } }
    });
    const component = TestBed.createComponent(TeacherCreateComponent).componentInstance;
    expect(component.form.controls.userAccountId.value).toBe('');
  });
});
