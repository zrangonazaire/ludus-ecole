import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AccessProfilesComponent } from './access-profiles.component';
import { ACCESS_PROFILE_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';

describe('Access profile card actions', () => {
  const system = { id: 'system', code: 'TEACHER', label: 'Enseignant', systemProfile: true,
    editable: false, permissionCodes: ['STUDENT_VIEW'], permissionCount: 1, userCount: 2 };
  const custom = { ...system, id: 'custom', code: 'CUSTOM', label: 'Personnalisé', systemProfile: false, editable: true };
  let source: { overview: jasmine.Spy; create: jasmine.Spy; update: jasmine.Spy };
  beforeEach(() => {
    source = { overview: jasmine.createSpy().and.returnValue(of({ profiles: [system, custom], permissions: [
      { id: 'p', code: 'STUDENT_VIEW', label: 'Voir les élèves', module: 'Élèves' }
    ] })), create: jasmine.createSpy().and.returnValue(of(custom)), update: jasmine.createSpy().and.returnValue(of(custom)) };
    TestBed.configureTestingModule({ imports: [AccessProfilesComponent], providers: [provideRouter([]),
      { provide: ACCESS_PROFILE_DATA_SOURCE, useValue: source },
      { provide: AuthService, useValue: { has: () => true } },
      { provide: NotificationService, useValue: { success: () => {} } }
    ] });
  });
  function setup() {
    const fixture = TestBed.createComponent(AccessProfilesComponent);
    fixture.detectChanges();
    return fixture;
  }
  function click(fixture: ReturnType<typeof setup>, text: string) {
    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    buttons.find(button => button.textContent?.trim() === text)!.click();
    fixture.detectChanges();
  }
  it('opens system rights read-only and creates an editable copy', () => {
    const fixture = setup();
    click(fixture, 'Voir les droits');
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    expect(fixture.componentInstance.profileForm.disabled).toBeTrue();
    fixture.componentInstance.submit();
    expect(source.update).not.toHaveBeenCalled();
    click(fixture, 'Créer une copie personnalisée');
    expect(fixture.componentInstance.viewing()).toBeFalse();
    expect(fixture.componentInstance.selectedPermissions().has('STUDENT_VIEW')).toBeTrue();
    fixture.componentInstance.submit();
    expect(source.create).toHaveBeenCalled();
    expect(source.update).not.toHaveBeenCalled();
  });
  it('opens and saves the selected custom profile', () => {
    const fixture = setup();
    click(fixture, 'Modifier les droits');
    fixture.componentInstance.profileForm.controls.label.setValue('Surveillance');
    click(fixture, 'Enregistrer');
    expect(source.update).toHaveBeenCalledWith('custom', jasmine.objectContaining({ label: 'Surveillance', permissionCodes: ['STUDENT_VIEW'] }));
  });
});
