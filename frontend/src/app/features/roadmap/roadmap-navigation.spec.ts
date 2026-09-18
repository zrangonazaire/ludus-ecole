import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { DemoSetupStore } from '@core/services/demo-setup.store';
import { GuidedTourService } from '@core/services/guided-tour.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { LandingComponent } from '../landing/landing.component';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { RoadmapComponent } from './roadmap.component';

describe('Roadmap navigation links', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingComponent, AdminLayoutComponent],
      providers: [
        provideRouter([{ path: 'roadmap', component: RoadmapComponent }]),
        { provide: AuthService, useValue: {
          isAuthenticated: signal(false), currentUser: signal(null),
          has: () => false, hasAny: () => false
        } },
        { provide: DemoSetupStore, useValue: { draft: signal({ profile: { preset: 'primary' } }) } },
        { provide: SetupStatusService, useValue: {
          badge: signal(null), incomplete: signal(false), refresh: () => {}
        } },
        { provide: WebSocketService, useValue: { state: signal('disconnected') } }
      ]
    });
    spyOn(TestBed.inject(GuidedTourService), 'start');
  });

  it('shows the guide in the home header even before login and closes the mobile menu on click', async () => {
    const fixture = TestBed.createComponent(LandingComponent);
    fixture.componentInstance.menuOpen.set(true);
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('.nav__links a[href="/roadmap"]');
    expect(link).not.toBeNull();
    expect(link.textContent).toContain('Roadmap');
    link.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.menuOpen()).toBeFalse();
    expect(TestBed.inject(Router).url).toBe('/roadmap');
  });

  it('keeps the guide as the last sidebar link outside collapsed sections and closes the drawer', async () => {
    const fixture = TestBed.createComponent(AdminLayoutComponent);
    fixture.componentInstance.collapsed.set(fixture.componentInstance.navigation().map(group => group.section));
    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('.sidebar a');
    const link = links[links.length - 1];
    expect(link.getAttribute('href')).toBe('/roadmap');
    expect(link.closest('.sidebar__help')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.sidebar a[href="/roadmap"]').length).toBe(1);
    link.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.drawerOpen()).toBeFalse();
    expect(TestBed.inject(Router).url).toBe('/roadmap');
    expect(link.getAttribute('aria-current')).toBe('page');
    expect(fixture.nativeElement.querySelector('eduops-roadmap')).not.toBeNull();
  });
});
