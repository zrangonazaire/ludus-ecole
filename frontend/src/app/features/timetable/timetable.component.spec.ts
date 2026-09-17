import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, ROOM_DATA_SOURCE, TEACHER_DATA_SOURCE, TIMETABLE_DATA_SOURCE } from '@core/datasource/data-source';
import { NotificationService } from '@core/services/notification.service';
import { TimetableGrid } from '@core/models/timetable.models';
import { TimetableComponent } from './timetable.component';

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
    timetables = jasmine.createSpyObj('timetables', ['classroomGrid', 'teacherGrid', 'roomGrid', 'palette']);
    timetables.classroomGrid.and.returnValue(of(grid('CLASSROOM', 'class-1')));
    timetables.teacherGrid.and.callFake((id: string) => of(grid('TEACHER', id)));
    timetables.roomGrid.and.callFake((id: string) => of(grid('ROOM', id)));
    timetables.palette.and.returnValue(of([]));
    teachers = jasmine.createSpyObj('teachers', ['search']);
    teachers.search.and.returnValue(of({ content: [{ id: 'teacher-1' }], page: 0, totalPages: 1 }));
    rooms = jasmine.createSpyObj('rooms', ['list']);
    rooms.list.and.returnValue(of([{ id: 'room-1' }, { id: 'room-2' }]));
    classrooms = jasmine.createSpyObj('classrooms', ['list']);
    classrooms.list.and.returnValue(of([{ id: 'class-1' }]));
    TestBed.configureTestingModule({ providers: [
      { provide: CLASSROOM_DATA_SOURCE, useValue: classrooms },
      { provide: TEACHER_DATA_SOURCE, useValue: teachers },
      { provide: ROOM_DATA_SOURCE, useValue: rooms },
      { provide: TIMETABLE_DATA_SOURCE, useValue: timetables },
      { provide: NotificationService, useValue: {} },
      { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({}) } } }
    ] });
    component = TestBed.runInInjectionContext(() => new TimetableComponent());
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
});
