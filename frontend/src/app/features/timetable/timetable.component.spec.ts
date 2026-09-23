import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, ROOM_DATA_SOURCE, TEACHER_DATA_SOURCE, TIMETABLE_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { PaletteEntry, TimetableGrid, TimetableSlot } from '@core/models/timetable.models';
import { TimetableComponent } from './timetable.component';

/** Un évènement de glisser minimal : le composant n'utilise que preventDefault. */
function dragEvent(): DragEvent {
  return { preventDefault: () => {}, dataTransfer: { setData: () => {} } } as unknown as DragEvent;
}

const paletteEntry = (): PaletteEntry => ({
  subjectId: 's-mat', subjectName: 'Maths', teacherId: 'teacher-1',
  teacherName: 'M. Koffi', placedMinutes: 0, complete: false
});

const slotFixture = (): TimetableSlot => ({
  id: 'slot-1', dayOfWeek: 'MONDAY', startTime: '08:00:00', endTime: '10:00:00',
  durationMinutes: 120, subjectId: 's-mat', subjectName: 'Maths', teacherId: 'teacher-1',
  teacherName: 'M. Koffi', roomId: 'room-1', roomName: 'Salle A 101',
  classroomId: 'class-1', classroomName: '6eme A', slotType: 'COURSE'
});

describe('Timetable scope selection', () => {
  const grid = (scope: TimetableGrid['scope'], id: string): TimetableGrid => ({
    scope, scopeId: id, scopeLabel: id, editable: scope === 'CLASSROOM',
    days: ['MONDAY'], dayStart: '08:00', dayEnd: '18:00', stepMinutes: 60,
    slots: [], totalMinutes: 0
  });
  let component: TimetableComponent;
  let timetables: jasmine.SpyObj<any>;
  let teachers: jasmine.SpyObj<any>;
  let rooms: jasmine.SpyObj<any>;
  let classrooms: jasmine.SpyObj<any>;

  beforeEach(() => {
    timetables = jasmine.createSpyObj('timetables', ['classroomGrid', 'teacherGrid', 'roomGrid',
      'palette', 'check', 'createSlot', 'updateSlot', 'deleteSlot']);
    timetables.deleteSlot.and.returnValue(of(undefined));
    timetables.check.and.returnValue(of([]));
    timetables.classroomGrid.and.returnValue(of(grid('CLASSROOM', 'class-1')));
    timetables.teacherGrid.and.callFake((id: string) => of(grid('TEACHER', id)));
    timetables.roomGrid.and.callFake((id: string) => of(grid('ROOM', id)));
    timetables.palette.and.returnValue(of([]));
    teachers = jasmine.createSpyObj('teachers', ['search']);
    teachers.search.and.returnValue(of({ content: [{ id: 'teacher-1' }], page: 0, totalPages: 1 }));
    rooms = jasmine.createSpyObj('rooms', ['list']);
    rooms.list.and.returnValue(of([
      { id: 'room-1', name: 'Salle A 101', campusName: 'Campus Principal', status: 'ACTIVE' },
      { id: 'room-2', name: 'Salle B 201', campusName: 'Campus Principal', status: 'ACTIVE' }
    ]));
    classrooms = jasmine.createSpyObj('classrooms', ['list']);
    classrooms.list.and.returnValue(of([{ id: 'class-1' }]));
    TestBed.configureTestingModule({ providers: [
      { provide: AuthService, useValue: { has: jasmine.createSpy('has').and.returnValue(true) } },
      { provide: CLASSROOM_DATA_SOURCE, useValue: classrooms },
      { provide: TEACHER_DATA_SOURCE, useValue: teachers },
      { provide: ROOM_DATA_SOURCE, useValue: rooms },
      { provide: TIMETABLE_DATA_SOURCE, useValue: timetables },
      { provide: NotificationService, useValue: {
        success: jasmine.createSpy('success'), error: jasmine.createSpy('error') } },
      { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({}) } } }
    ] });
    component = TestBed.runInInjectionContext(() => new TimetableComponent());
  });

  it('prints exact lesson boundaries and merges multi-period cells', () => {
    component.grid.set({ ...grid('CLASSROOM', 'class-1'), days: ['MONDAY', 'TUESDAY'],
      slots: [{ ...slotFixture(), startTime: '08:15:00', endTime: '09:45:00' }] });
    const page = component.printPages()[0];
    const start = page.rows.find(row => row.start === '08:15')!;
    expect(start.cells.find(cell => cell.day === 'MONDAY')?.rowspan).toBe(2);
    expect(page.rows.find(row => row.start === '09:00')!.cells.map(cell => cell.day)).toEqual(['TUESDAY']);
    expect(page.rows.find(row => row.start === '09:45')!.cells.length).toBe(2);
  });

  it('starts the printed afternoon at 13:00 and splits lessons crossing the heading', () => {
    component.grid.set({ ...grid('CLASSROOM', 'class-1'),
      dayStart: '07:30',
      slots: [{ ...slotFixture(), startTime: '12:00', endTime: '14:00' }] });
    const rows = component.printPages()[0].rows;
    expect(rows.find(row => row.afternoon)?.start).toBe('13:00');
    const noon = rows.findIndex(row => row.start === '12:00');
    const afternoon = rows.findIndex(row => row.start === '13:00');
    expect(rows[noon].cells[0].rowspan).toBe(afternoon - noon);
    expect(rows[afternoon].cells[0].slots[0].id).toBe('slot-1');
  });

  it('shows existing lessons outside configured hours and days so they can be removed', () => {
    const fixture = TestBed.createComponent(TimetableComponent);
    fixture.detectChanges();
    const early = { ...slotFixture(), startTime: '07:00', endTime: '08:00', durationMinutes: 60 };
    const late = { ...slotFixture(), id: 'late', dayOfWeek: 'SATURDAY', startTime: '18:00', endTime: '19:00' };
    fixture.componentInstance.grid.set({ ...grid('CLASSROOM', 'class-1'), dayStart: '07:30', slots: [early, late] });
    fixture.detectChanges();
    expect(fixture.componentInstance.hours()[0]).toBe('07:00');
    expect(fixture.componentInstance.hours()).toContain('18:00');
    expect(fixture.componentInstance.days()).toContain('SATURDAY');
    expect(fixture.nativeElement.querySelectorAll('.course').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('[data-testid="card-cancel-course"]').length).toBe(2);
    expect(fixture.componentInstance.printPages()[0].days).toContain('SATURDAY');
  });

  it('loads real room IDs and remembers the selected room across tabs', () => {
    component.ngOnInit();
    component.changeScope('ROOM');
    expect(timetables.roomGrid).toHaveBeenCalledWith('room-1');
    component.changeScopeId('room-2');
    component.changeScope('TEACHER');
    component.changeScope('ROOM');
    expect(component.scopeId()).toBe('room-2');
    expect(component.grid()?.scopeId).toBe('room-2');
  });

  it('waits for teachers and loads every page before selecting a teacher', () => {
    const first = new Subject<any>();
    teachers.search.and.callFake(({ page }: { page: number }) => page === 0
      ? first : of({ content: [{ id: 'teacher-2' }], page: 1, totalPages: 2 }));
    component.ngOnInit();
    component.changeScope('TEACHER');
    expect(component.grid()).toBeNull();
    expect(component.loading()).toBeTrue();
    first.next({ content: [{ id: 'teacher-1' }], page: 0, totalPages: 2 });
    first.complete();
    expect(component.teacherList().map(t => t.id)).toEqual(['teacher-1', 'teacher-2']);
    expect(timetables.teacherGrid).toHaveBeenCalledWith('teacher-1');
    expect(component.loading()).toBeFalse();
  });

  it('ignores an old grid and palette response after switching scope', () => {
    const oldGrid = new Subject<TimetableGrid>();
    const oldPalette = new Subject<any[]>();
    timetables.classroomGrid.and.returnValue(oldGrid);
    timetables.palette.and.returnValue(oldPalette);
    component.ngOnInit();
    component.changeScope('TEACHER');
    oldGrid.next(grid('CLASSROOM', 'class-1'));
    oldPalette.next([{ subjectId: 'old' }]);
    expect(component.grid()?.scope).toBe('TEACHER');
    expect(component.palette()).toEqual([]);
  });

  it('does not let delayed classroom options change the selected teacher', () => {
    const options = new Subject<any[]>();
    classrooms.list.and.returnValue(options);
    component.ngOnInit();
    component.changeScope('TEACHER');
    options.next([{ id: 'class-1' }]);
    expect(component.scopeId()).toBe('teacher-1');
    expect(component.grid()?.scope).toBe('TEACHER');
  });

  it('clears the previous grid when no rooms exist', () => {
    rooms.list.and.returnValue(of([]));
    component.ngOnInit();
    component.changeScope('ROOM');
    expect(component.grid()).toBeNull();
    expect(component.scopeId()).toBe('');
    expect(component.loading()).toBeFalse();
    expect(timetables.roomGrid).not.toHaveBeenCalled();
  });

  it('allows retrying a failed teacher list', () => {
    teachers.search.and.returnValue(throwError(() => new Error('Network')));
    component.ngOnInit();
    component.changeScope('TEACHER');
    expect(component.error()).toBeTrue();
    teachers.search.and.returnValue(of({ content: [{ id: 'teacher-1' }], page: 0, totalPages: 1 }));
    component.load();
    expect(component.error()).toBeFalse();
    expect(component.grid()?.scopeId).toBe('teacher-1');
  });

  // ------------------------------------------------------- annulation des cours

  for (const scope of ['CLASSROOM', 'TEACHER', 'ROOM'] as const) {
    it(`cancels a published course from the ${scope} view and reloads it`, () => {
      const slot = slotFixture();
      component.ngOnInit();
      component.scope.set(scope);
      component.grid.set({ ...grid(scope, 'class-1'), status: 'PUBLISHED', slots: [slot] });
      component.select(slot);
      const confirm = spyOn(window, 'confirm').and.returnValue(true);
      const reload = spyOn(component, 'load').and.callThrough();

      component.removeSlot(slot);

      expect(confirm).toHaveBeenCalledWith(jasmine.stringContaining('créneau hebdomadaire'));
      expect(timetables.deleteSlot).toHaveBeenCalledOnceWith('slot-1');
      expect(reload).toHaveBeenCalledTimes(1);
      expect(component.grid()?.slots).toEqual([]);
      expect(component.selectedSlot()).toBeNull();
      expect(component.cancelling()).toBeFalse();
    });
  }

  it('keeps the course when confirmation is declined', () => {
    const slot = slotFixture();
    component.ngOnInit();
    component.grid.set({ ...grid('CLASSROOM', 'class-1'), slots: [slot] });
    spyOn(window, 'confirm').and.returnValue(false);

    component.removeSlot(slot);

    expect(timetables.deleteSlot).not.toHaveBeenCalled();
    expect(component.grid()?.slots).toEqual([slot]);
    expect(component.cancelling()).toBeFalse();
  });

  it('prevents duplicate cancellation and allows retry after failure', () => {
    const slot = slotFixture();
    const request = new Subject<void>();
    timetables.deleteSlot.and.returnValue(request);
    component.ngOnInit();
    component.grid.set({ ...grid('CLASSROOM', 'class-1'), slots: [slot] });
    component.select(slot);
    const confirm = spyOn(window, 'confirm').and.returnValue(true);

    component.removeSlot(slot);
    component.removeSlot(slot);
    expect(component.cancelling()).toBeTrue();
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(timetables.deleteSlot).toHaveBeenCalledTimes(1);

    request.error(new Error('Network'));
    expect(component.cancelling()).toBeFalse();
    expect(component.grid()?.slots).toEqual([slot]);
    expect(component.selectedSlot()).toBe(slot);
    expect(TestBed.inject(NotificationService).success).not.toHaveBeenCalled();

    timetables.deleteSlot.and.returnValue(of(undefined));
    component.removeSlot(slot);
    expect(timetables.deleteSlot).toHaveBeenCalledTimes(2);
    expect(component.grid()?.slots).toEqual([]);
  });

  it('does not cancel without manage permission', () => {
    (TestBed.inject(AuthService).has as jasmine.Spy).and.returnValue(false);
    const slot = slotFixture();
    component.ngOnInit();
    component.grid.set({ ...grid('CLASSROOM', 'class-1'), slots: [slot] });
    const confirm = spyOn(window, 'confirm');

    component.removeSlot(slot);

    expect(confirm).not.toHaveBeenCalled();
    expect(timetables.deleteSlot).not.toHaveBeenCalled();
  });

  for (const scope of ['CLASSROOM', 'TEACHER', 'ROOM'] as const) {
    it(`exposes the cancellation action after selecting a course in ${scope}`, () => {
      const fixture = TestBed.createComponent(TimetableComponent);
      fixture.detectChanges();
      const slot = slotFixture();
      fixture.componentInstance.grid.set({ ...grid(scope, 'class-1'), slots: [slot] });
      fixture.detectChanges();
      const confirm = spyOn(window, 'confirm').and.returnValue(true);
      fixture.nativeElement.querySelector('.course__select').click();
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('[data-testid="cancel-course"]');
      expect(button).not.toBeNull();
      button.click();
      expect(confirm).toHaveBeenCalledTimes(1);
      expect(timetables.deleteSlot).toHaveBeenCalledOnceWith(slot.id);
    });
  }

  it('hides the cancellation action for a read-only account', () => {
    (TestBed.inject(AuthService).has as jasmine.Spy).and.returnValue(false);
    const fixture = TestBed.createComponent(TimetableComponent);
    fixture.detectChanges();
    const slot = slotFixture();
    fixture.componentInstance.grid.set({ ...grid('CLASSROOM', 'class-1'), slots: [slot] });
    fixture.componentInstance.select(slot);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="cancel-course"]')).toBeNull();
  });

  for (const scope of ['CLASSROOM', 'TEACHER', 'ROOM'] as const) {
    it(`shows the assigned room and class in ${scope} course details for a read-only user`, () => {
      (TestBed.inject(AuthService).has as jasmine.Spy).and.returnValue(false);
      const fixture = TestBed.createComponent(TimetableComponent);
      fixture.detectChanges();
      const slot = slotFixture();
      fixture.componentInstance.grid.set({ ...grid(scope, 'class-1'), editable: false, slots: [slot] });
      fixture.componentInstance.select(slot);
      fixture.detectChanges();

      const detail = fixture.nativeElement.querySelector('[data-testid="course-room"]');
      expect(detail.textContent).toContain('Salle : Salle A 101');
      expect(detail.textContent).toContain('Classe : 6eme A');
    });
  }

  it('explicitly identifies a course with no assigned room', () => {
    const fixture = TestBed.createComponent(TimetableComponent);
    fixture.detectChanges();
    const slot = { ...slotFixture(), roomId: undefined, roomName: undefined };
    fixture.componentInstance.grid.set({ ...grid('CLASSROOM', 'class-1'), slots: [slot] });
    fixture.componentInstance.select(slot);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="course-room"]').textContent)
      .toContain('Salle : Non affectée');
  });

  for (const scope of ['CLASSROOM', 'TEACHER', 'ROOM'] as const) {
    it(`keeps room and cancellation accessible by scrolling a compact one-hour card in ${scope}`, () => {
      const fixture = TestBed.createComponent(TimetableComponent);
      fixture.detectChanges();
      const slot = { ...slotFixture(), endTime: '09:00:00', durationMinutes: 60 };
      fixture.componentInstance.grid.set({ ...grid(scope, 'class-1'), slots: [slot] });
      fixture.detectChanges();
      const card: HTMLElement = fixture.nativeElement.querySelector('.course');
      const room: HTMLElement = card.querySelector('[data-testid="card-room"]')!;
      const button: HTMLButtonElement = card.querySelector('[data-testid="card-cancel-course"]')!;
      expect(room.textContent).toContain('Salle : Salle A 101');
      expect(fixture.componentInstance.selectedSlot()).toBeNull();
      const bounds = card.getBoundingClientRect();
      expect(bounds.height).toBeGreaterThan(0);
      expect(bounds.height).toBeLessThanOrEqual(80);
      for (const element of [room, button]) {
        card.scrollTop += element.getBoundingClientRect().bottom - bounds.bottom;
        const rect = element.getBoundingClientRect();
        expect(rect.height).toBeGreaterThan(0);
        expect(rect.top).toBeGreaterThanOrEqual(bounds.top);
        expect(rect.bottom).toBeLessThanOrEqual(bounds.bottom);
      }
      const confirm = spyOn(window, 'confirm').and.returnValue(true);
      button.click();
      expect(confirm).toHaveBeenCalledTimes(1);
      expect(timetables.deleteSlot).toHaveBeenCalledOnceWith(slot.id);
      expect(fixture.componentInstance.selectedSlot()).toBeNull();
    });
  }

  it('keeps short consecutive lessons compact, scrollable and aligned with a half-hour offset', () => {
    const fixture = TestBed.createComponent(TimetableComponent);
    fixture.detectChanges();
    const first = { ...slotFixture(), startTime: '08:30', endTime: '09:00', durationMinutes: 30,
      teacherName: 'GONQUET ASTAIRE NAZAIRE ZRANGO' };
    const second = { ...first, id: 'slot-2', startTime: '09:00', endTime: '09:30' };
    fixture.componentInstance.grid.set({ ...grid('TEACHER', 'teacher-1'), slots: [first, second] });
    fixture.detectChanges();
    const cards: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.course'));
    expect(fixture.componentInstance.spanOf(first)).toBe(0.5);
    expect(cards.length).toBe(2);
    expect(cards[0].getBoundingClientRect().bottom).toBeLessThanOrEqual(cards[1].getBoundingClientRect().top);
    for (const card of cards) {
      expect(getComputedStyle(card).overflowY).toBe('auto');
      expect(card.querySelector('[data-testid="card-room"]')).not.toBeNull();
      card.scrollTop = card.scrollHeight;
      expect(card.scrollTop).toBeGreaterThan(0);
    }
  });

  // ------------------------------------------------------- affectation des salles

  it('shows a manually saved lesson immediately without reloading the grid', () => {
    component.ngOnInit();
    const saved = slotFixture();
    timetables.createSlot.and.returnValue(of(saved));
    component.formSubjectKey.set('s-mat|teacher-1');
    component.formDay.set('MONDAY');
    component.formHour.set('08');
    component.formMinute.set('00');
    component.createSlotManually();
    expect(component.grid()?.slots).toContain(saved);
    expect(component.slotsAt('MONDAY', '08:00')).toContain(saved);
    expect(timetables.classroomGrid).toHaveBeenCalledTimes(1);
    expect(component.loading()).toBeFalse();
  });

  it('ignores conflicts from a different hover cell and shows a dropped lesson immediately', () => {
    component.ngOnInit();
    const saved = slotFixture();
    timetables.createSlot.and.returnValue(of(saved));
    component.startPaletteDrag(paletteEntry(), dragEvent());
    component.hoverCell.set(component.cellKey('TUESDAY', '08:00'));
    component.hoverConflicts.set([{ kind: 'TEACHER_BUSY', message: 'Occupé' }]);
    component.onDrop('MONDAY', '08:00', dragEvent());
    expect(component.grid()?.slots).toContain(saved);
    expect(timetables.classroomGrid).toHaveBeenCalledTimes(1);
  });

  it('places a dropped course in the room chosen in the palette', () => {
    timetables.createSlot.and.callFake((payload: any) => of({ id: 'slot-new', ...payload }));
    component.ngOnInit();
    component.changeRoomChoice('room-2');

    component.startPaletteDrag(paletteEntry(), dragEvent());
    component.onDrop('MONDAY', '10:00', dragEvent());

    expect(timetables.createSlot).toHaveBeenCalledWith(
      jasmine.objectContaining({ roomId: 'room-2', dayOfWeek: 'MONDAY', startTime: '10:00' }));
  });

  it('uses the class usual room when the palette names none', () => {
    classrooms.list.and.returnValue(of([{ id: 'class-1', defaultRoomId: 'room-1' }]));
    timetables.createSlot.and.callFake((payload: any) => of({ id: 'slot-new', ...payload }));
    component.ngOnInit();

    expect(component.roomChoice()).toBe('room-1');
    expect(component.defaultRoom()?.id).toBe('room-1');
    component.startPaletteDrag(paletteEntry(), dragEvent());
    component.onDrop('MONDAY', '10:00', dragEvent());

    expect(timetables.createSlot).toHaveBeenCalledWith(
      jasmine.objectContaining({ roomId: 'room-1' }));
  });

  it('moves a placed course to another room with the whole payload', () => {
    const slot = slotFixture();
    timetables.classroomGrid.and.returnValue(of({ ...grid('CLASSROOM', 'class-1'), slots: [slot] }));
    timetables.updateSlot.and.returnValue(of(slot));
    component.ngOnInit();

    component.changeSlotRoom(slot, 'room-2');

    expect(timetables.updateSlot).toHaveBeenCalledWith('slot-1', jasmine.objectContaining({
      classroomId: 'class-1', subjectId: 's-mat', teacherId: 'teacher-1',
      roomId: 'room-2', startTime: '08:00', endTime: '10:00'
    }));
  });

  it('does nothing when the room of a placed course does not change', () => {
    const slot = slotFixture();
    timetables.classroomGrid.and.returnValue(of({ ...grid('CLASSROOM', 'class-1'), slots: [slot] }));
    component.ngOnInit();

    component.changeSlotRoom(slot, 'room-1');

    expect(timetables.updateSlot).not.toHaveBeenCalled();
  });
});
