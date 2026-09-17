import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BuildingsComponent } from './buildings.component';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';

describe('Building creation', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BuildingsComponent], providers: [
      provideHttpClient(), provideHttpClientTesting(),
      { provide: AuthService, useValue: { has: () => true } },
      { provide: NotificationService, useValue: { success: () => {} } }
    ] });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('opens the form, saves the building and displays it without any room', () => {
    const fixture = TestBed.createComponent(BuildingsComponent);
    fixture.componentRef.setInput('campuses', [{ id: 'campus', name: 'Principal', code: 'MAIN', status: 'ACTIVE' }]);
    http.expectOne('/api/v1/buildings').flush([]);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    fixture.componentInstance.form.patchValue({ code: ' bat-a ', name: ' Bâtiment A ', floors: 2 });
    fixture.componentInstance.submit();
    const request = http.expectOne('/api/v1/buildings');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ campusId: 'campus', code: 'BAT-A', name: 'Bâtiment A', floors: 2 });
    const building = { ...request.request.body, id: 'building', campusName: 'Principal', roomCount: 0 };
    request.flush(building);
    http.expectOne('/api/v1/buildings').flush([building]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.buildings__card').textContent).toContain('Bâtiment A');
    expect(fixture.componentInstance.opened()).toBeFalse();
  });
  it('does not create a building without a campus', () => {
    const fixture = TestBed.createComponent(BuildingsComponent);
    http.expectOne('/api/v1/buildings').flush([]);
    fixture.componentInstance.open();
    fixture.componentInstance.form.patchValue({ code: 'A', name: 'Bâtiment A' });
    fixture.componentInstance.submit();
    http.expectNone('/api/v1/buildings');
  });
});
