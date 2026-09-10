import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, of, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { CLASSROOM_DATA_SOURCE, CURRICULUM_DATA_SOURCE, REFERENCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';

export interface AssignmentChoice { id: string; name: string; }
export interface AssignmentClass extends AssignmentChoice { subjects: AssignmentChoice[]; }
export interface AssignmentPayload { teacherId: string; classroomId: string; subjectId: string; weeklyHours: number; }
export interface TeacherAssignment extends AssignmentPayload { id: string; teacherName: string; classroomName: string; subjectName: string; }
export interface AssignmentBoard { academicYearCode: string | null; teachers: AssignmentChoice[]; classes: AssignmentClass[]; assignments: TeacherAssignment[]; }

@Injectable({ providedIn: 'root' })
export class TeacherAssignmentService {
  private readonly http = inject(HttpClient);
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly classes = inject(CLASSROOM_DATA_SOURCE);
  private readonly curriculum = inject(CURRICULUM_DATA_SOURCE);
  private readonly reference = inject(REFERENCE_DATA_SOURCE);
  private readonly base = `${environment.apiBaseUrl}/teacher-assignments`;
  private readonly demoRows = new Map<string, TeacherAssignment[]>();
  private demoBoard: AssignmentBoard | null = null;
  private demoYear = '';

  board(): Observable<AssignmentBoard> {
    if (!environment.useMockData) return this.http.get<AssignmentBoard>(this.base);
    return forkJoin({ teachers: this.teachers.search({ page: 0, size: 200 }), classes: this.classes.list(),
      levels: this.curriculum.levels(), years: this.reference.academicYears() }).pipe(map(data => {
        const year = data.years.find(y => y.status === 'ACTIVE');
        this.demoYear = year?.id ?? '';
        this.demoBoard = {
          academicYearCode: year?.code ?? null,
          teachers: data.teachers.content.filter(t => t.status === 'ACTIVE').map(t => ({ id: t.id, name: t.fullName })),
          classes: data.classes.filter(c => c.academicYearId === year?.id && c.status === 'ACTIVE').map(c => ({ id: c.id, name: c.name,
            subjects: (data.levels.find(l => l.levelId === c.levelId)?.subjects ?? []).map(s => ({ id: s.subjectId, name: s.subjectName })) })),
          assignments: this.demoRows.get(this.demoYear) ?? []
        };
        return this.demoBoard;
      }));
  }

  create(payload: AssignmentPayload): Observable<TeacherAssignment> {
    if (!environment.useMockData) return this.http.post<TeacherAssignment>(this.base, payload);
    const board = this.demoBoard;
    const teacher = board?.teachers.find(t => t.id === payload.teacherId);
    const classroom = board?.classes.find(c => c.id === payload.classroomId);
    const subject = classroom?.subjects.find(s => s.id === payload.subjectId);
    if (!board?.academicYearCode || !teacher || !classroom || !subject) return throwError(() => ({ error: { message: 'Sélectionnez un enseignant, une classe et une matière du programme.' } }));
    if (board.assignments.some(a => a.classroomId === payload.classroomId && a.subjectId === payload.subjectId))
      return throwError(() => ({ error: { message: 'Cette matière a déjà un enseignant dans cette classe.' } }));
    const row = { ...payload, id: crypto.randomUUID(), teacherName: teacher.name, classroomName: classroom.name, subjectName: subject.name };
    this.demoRows.set(this.demoYear, [...board.assignments, row]);
    return of(row);
  }

  end(id: string): Observable<void> {
    if (!environment.useMockData) return this.http.post<void>(`${this.base}/${id}/end`, {});
    this.demoRows.set(this.demoYear, (this.demoRows.get(this.demoYear) ?? []).filter(a => a.id !== id));
    return of(undefined);
  }
}
