import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { routes } from '../../app.routes';
import { RoadmapComponent } from './roadmap.component';

describe('RoadmapComponent', () => {
  let auth: { has: jasmine.Spy };

  beforeEach(() => {
    auth = { has: jasmine.createSpy('has').and.returnValue(true) };
    TestBed.configureTestingModule({
      imports: [RoadmapComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }]
    });
  });

  it('renders eight ordered steps and a planning anchor', () => {
    const fixture = TestBed.createComponent(RoadmapComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.roadmap > li').length).toBe(8);
    expect(element.querySelector('#planning')?.textContent).toContain('La classe est obligatoire');
    expect(element.querySelector('a[href="/timetable"]')).not.toBeNull();
    expect(element.querySelector('a[href="/roadmap#planning"]')).not.toBeNull();
  });

  it('keeps instructions visible without offering unauthorized screen links', () => {
    auth.has.and.returnValue(false);
    const fixture = TestBed.createComponent(RoadmapComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.roadmap > li').length).toBe(8);
    expect(element.querySelectorAll('.step__links a').length).toBe(0);
    expect(element.querySelector('.restricted')?.textContent).toContain('accès selon votre profil');
  });

  it('uses existing administration routes for every destination', () => {
    const fixture = TestBed.createComponent(RoadmapComponent);
    const children = routes.find((route) => route.path === '' && route.children)?.children ?? [];
    for (const step of fixture.componentInstance.steps) {
      for (const link of step.links) {
        expect(children.some((route) => '/' + route.path === link.route))
          .withContext(link.route).toBeTrue();
      }
    }
    expect(children.some((route) => route.path === 'roadmap' && !!route.loadComponent)).toBeTrue();
  });
});
