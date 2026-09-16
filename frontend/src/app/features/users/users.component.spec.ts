import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';

describe('UsersComponent account', () => {
  const user = { id: 'self', username: 'admin', email: 'admin@example.com', firstName: 'Aminata', lastName: 'Koné', status: 'ACTIVE', profiles: [{ id: 'admin-role', label: 'Administration' }] };
  let http: HttpTestingController;
  let logout: jasmine.Spy;
  beforeEach(() => {
    logout = jasmine.createSpy('logout');
    TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]),
        { provide: AuthService, useValue: { currentUser: () => ({ userId: 'self' }), has: () => true, logout } },
        { provide: NotificationService, useValue: { success: jasmine.createSpy('success') } }]
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  function setup() {
    const fixture = TestBed.createComponent(UsersComponent);
    http.expectOne('/api/v1/users').flush([user]);
    http.expectOne('/api/v1/users/profiles').flush(user.profiles);
    fixture.detectChanges();
    return fixture;
  }
  it('opens your account from the card without offering self role changes', () => {
    const fixture = setup();
    const button = [...fixture.nativeElement.querySelectorAll('button')] as HTMLButtonElement[];
    button.find(b => b.textContent?.trim() === 'Votre compte')!.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]').textContent).toContain('Changer le mot de passe');
    expect(fixture.componentInstance.canEdit(user)).toBeFalse();
    expect(fixture.componentInstance.panelOpen()).toBeFalse();
  });
  it('does not submit mismatched passwords', () => {
    const fixture = setup();
    fixture.componentInstance.passwordForm.setValue({ currentPassword: 'old', newPassword: 'NewPassword123', confirmation: 'different' });
    fixture.componentInstance.changePassword();
    http.expectNone('/api/v1/auth/change-password');
    expect(logout).not.toHaveBeenCalled();
  });
  it('changes password, clears the form and signs out only after success', () => {
    const fixture = setup();
    fixture.componentInstance.openAccount(user);
    fixture.componentInstance.passwordForm.setValue({ currentPassword: 'old', newPassword: 'NewPassword123', confirmation: 'NewPassword123' });
    fixture.componentInstance.changePassword();
    const request = http.expectOne('/api/v1/auth/change-password');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ currentPassword: 'old', newPassword: 'NewPassword123' });
    expect(logout).not.toHaveBeenCalled();
    request.flush(null);
    expect(logout).toHaveBeenCalled();
    expect(fixture.componentInstance.passwordForm.controls.newPassword.value).toBe('');
  });
});
