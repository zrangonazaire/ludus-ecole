import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { LEVEL_DATA_SOURCE } from '@core/datasource/data-source';
import { NotificationService } from '@core/services/notification.service';
import { SupplyList, SupplyListService } from '@core/services/supply-list.service';
import { SuppliesComponent } from './supplies.component';

describe('Fournitures scolaires', () => {
  let component: SuppliesComponent;
  let api: jasmine.SpyObj<SupplyListService>;
  const saved: SupplyList = {
    id: 'list-1', version: 3, schoolName: 'École témoin', levelName: 'CM2', yearLabel: '2026–2027',
    title: 'Fournitures', notes: 'Étiqueter chaque cahier.',
    items: [{ name: 'Cahier', quantity: 4, details: '96 pages' }]
  };
  beforeEach(() => {
    api = jasmine.createSpyObj('api', ['years', 'get', 'save']);
    api.years.and.returnValue(of([{ id: 'year-1', label: '2026–2027', status: 'ACTIVE' }]));
    api.get.and.returnValue(of(saved)); api.save.and.returnValue(of({ ...saved, version: 4 }));
    TestBed.configureTestingModule({ providers: [
      { provide: SupplyListService, useValue: api },
      { provide: LEVEL_DATA_SOURCE, useValue: { list: () => of([{ id: 'level-1', name: 'CM2', status: 'ACTIVE' }]) } },
      { provide: AuthService, useValue: { has: () => true } },
      { provide: NotificationService, useValue: { success: jasmine.createSpy(), error: jasmine.createSpy() } }
    ] });
    component = TestBed.runInInjectionContext(() => new SuppliesComponent());
    component.ngOnInit();
  });

  it('saves against the selected level and year using the loaded version', () => {
    component.edit(); component.save();
    expect(api.save).toHaveBeenCalledWith('level-1', 'year-1', {
      version: 3, title: saved.title, notes: saved.notes, items: saved.items
    });
    expect(component.current()?.version).toBe(4);
    expect(component.editing()).toBeFalse();
  });

  it('rejects blank supplies, fractional quantities and empty lists', () => {
    component.edit(); component.items.at(0).patchValue({ name: ' ', quantity: 1.5 });
    component.save(); expect(api.save).not.toHaveBeenCalled();
    component.remove(0); component.save(); expect(api.save).not.toHaveBeenCalled();
  });

  it('preserves the draft after a save failure', () => {
    api.save.and.returnValue(throwError(() => ({ error: { code: 'CONCURRENT_MODIFICATION' } })));
    component.edit(); component.form.controls.title.setValue('Ma liste'); component.save();
    expect(component.editing()).toBeTrue(); expect(component.saving()).toBeFalse();
    expect(component.form.controls.title.value).toBe('Ma liste');
  });

  it('keeps closed years read-only', () => {
    component.years.set([{ id: 'year-1', label: '2026–2027', status: 'CLOSED' }]);
    component.edit(); expect(component.editing()).toBeFalse();
    component.save(); expect(api.save).not.toHaveBeenCalled();
  });

  it('does not lose unsaved edits on a rejected level change', () => {
    component.edit(); component.form.markAsDirty(); spyOn(window, 'confirm').and.returnValue(false);
    component.select('level', 'level-2');
    expect(component.selectedLevel()).toBe('level-1'); expect(component.editing()).toBeTrue();
  });

  it('prints all saved rows and treats markup as text', () => {
    const doc = document.implementation.createHTMLDocument();
    const preview = { document: doc, focus: jasmine.createSpy(), print: jasmine.createSpy(), setTimeout: jasmine.createSpy() };
    spyOn(window, 'open').and.returnValue(preview as unknown as Window);
    component.current.set({ ...saved, notes: '<script>alert(1)</script>',
      items: [{ name: '<img src=x onerror=alert(1)>', quantity: 2, details: '<b>Bleu</b>' }, ...saved.items] });
    component.print();
    expect(doc.querySelectorAll('tbody tr').length).toBe(2);
    expect(doc.querySelectorAll('script,img,b').length).toBe(0);
    expect(doc.body.textContent).toContain(saved.schoolName);
    expect(doc.body.textContent).toContain(saved.yearLabel);
    expect(doc.body.textContent).toContain('<b>Bleu</b>');
    expect(doc.head.textContent).toContain('size:A4');
  });
});
