import { createUuid } from "../../utils/uuid";
import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Level } from '@core/models/domain.models';
import { LevelDataSource, LevelUpsertPayload } from '../data-source';

const LATENCY = 220;

/** Cycle d'accueil des niveaux témoins. */
export interface MockLevelCycle {
  id: string;
  code: string;
  name: string;
  sequence: number;
}

export const MOCK_LEVEL_CYCLES: MockLevelCycle[] = [
  { id: 'cycle-primaire', code: 'PRIMAIRE', name: 'Primaire', sequence: 1 },
  { id: 'cycle-college', code: 'COLLEGE', name: 'Collège', sequence: 2 }
];

let levels: Level[] = [
  level('level-cp', 'cycle-primaire', 'Primaire', 'CP', 'Cours préparatoire', 'CP', 1, 'level-ce', 'Cours élémentaire', false),
  level('level-ce', 'cycle-primaire', 'Primaire', 'CE', 'Cours élémentaire', 'CE', 2, undefined, undefined, true),
  level('level-6', 'cycle-college', 'Collège', '6E', 'Sixième', '6e', 1, 'level-5', 'Cinquième', false),
  level('level-5', 'cycle-college', 'Collège', '5E', 'Cinquième', '5e', 2, 'level-4', 'Quatrième', false),
  level('level-4', 'cycle-college', 'Collège', '4E', 'Quatrième', '4e', 3, undefined, undefined, false, 'ARCHIVED')
];

function level(id: string, cycleId: string, cycleName: string, code: string, name: string,
               shortName: string, sequence: number,
               nextLevelId?: string, nextLevelName?: string,
               terminal = false, status: Level['status'] = 'ACTIVE'): Level {
  return {
    id, cycleId, cycleName, code, name, shortName, sequence,
    nextLevelId, nextLevelName, terminal, status,
    classroomCount: 0, archivable: status === 'ACTIVE'
  };
}

/**
 * Demo implementation of the levels screen.
 *
 * <p>Same rules as the server: code unique per cycle, no archiving while a
 * class or another level's promotion path points at it. A demo that accepts
 * what the product refuses teaches the wrong thing.</p>
 */
@Injectable()
export class MockLevelDataSource implements LevelDataSource {
  list(includeArchived = false): Observable<Level[]> {
    const list = (includeArchived ? levels : levels.filter((item) => item.status === 'ACTIVE'))
      .map((item) => ({ ...item }));
    return of(list).pipe(delay(LATENCY));
  }

  get(id: string): Observable<Level> {
    const item = levels.find((candidate) => candidate.id === id);
    return item ? of({ ...item }).pipe(delay(LATENCY))
      : throwError(() => new Error('LEVEL_NOT_FOUND'));
  }

  create(payload: LevelUpsertPayload): Observable<Level> {
    const code = payload.code.trim().toUpperCase();
    if (levels.some((item) => item.cycleId === payload.cycleId && item.code === code)) {
      return throwError(() => ({ status: 409, error: { code: 'LEVEL_CODE_ALREADY_USED' } }));
    }
    const next = this.resolveNext(undefined, payload.nextLevelId, payload.terminal);
    if (next === null) {
      return throwError(() => ({ status: 409, error: { code: 'LEVEL_INVALID_NEXT_LEVEL' } }));
    }
    const created: Level = {
      id: createUuid(),
      cycleId: payload.cycleId,
      cycleName: MOCK_LEVEL_CYCLES.find((c) => c.id === payload.cycleId)?.name ?? 'Cycle',
      code,
      name: payload.name.trim(),
      shortName: payload.shortName?.trim() || undefined,
      sequence: payload.sequence,
      nextLevelId: next?.id,
      nextLevelName: next?.name,
      terminal: payload.terminal ?? !next,
      status: 'ACTIVE',
      classroomCount: 0,
      archivable: true
    };
    levels = [...levels, created].sort(compareLevels);
    return of({ ...created }).pipe(delay(LATENCY));
  }

  update(id: string, payload: LevelUpsertPayload): Observable<Level> {
    const index = levels.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('LEVEL_NOT_FOUND'));
    }
    const current = levels[index];
    if (payload.cycleId !== current.cycleId) {
      return throwError(() => ({ status: 400, error: { code: 'VALIDATION_ERROR' } }));
    }
    const code = payload.code.trim().toUpperCase();
    if (levels.some((item) => item.id !== id && item.cycleId === current.cycleId && item.code === code)) {
      return throwError(() => ({ status: 409, error: { code: 'LEVEL_CODE_ALREADY_USED' } }));
    }
    const next = this.resolveNext(id, payload.nextLevelId, payload.terminal);
    if (next === null) {
      return throwError(() => ({ status: 409, error: { code: 'LEVEL_INVALID_NEXT_LEVEL' } }));
    }
    const updated: Level = {
      ...current,
      code,
      name: payload.name.trim(),
      shortName: payload.shortName?.trim() || undefined,
      sequence: payload.sequence,
      nextLevelId: next?.id,
      nextLevelName: next?.name,
      terminal: payload.terminal ?? !next
    };
    levels[index] = updated;
    levels = [...levels].sort(compareLevels);
    return of({ ...updated }).pipe(delay(LATENCY));
  }

  archive(id: string): Observable<Level> {
    const index = levels.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('LEVEL_NOT_FOUND'));
    }
    if (levels.some((item) => item.nextLevelId === id)) {
      return throwError(() => ({ status: 409, error: { code: 'LEVEL_IN_USE' } }));
    }
    levels[index] = { ...levels[index], status: 'ARCHIVED' };
    return of({ ...levels[index] }).pipe(delay(LATENCY));
  }

  restore(id: string): Observable<Level> {
    const index = levels.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('LEVEL_NOT_FOUND'));
    }
    levels[index] = { ...levels[index], status: 'ACTIVE' };
    return of({ ...levels[index] }).pipe(delay(LATENCY));
  }

  /** Cycles témoins, pour regrouper l'écran. */
  cycles(): Observable<MockLevelCycle[]> {
    return of(MOCK_LEVEL_CYCLES.map((item) => ({ ...item }))).pipe(delay(LATENCY));
  }

  /**
   * Promotion target, or undefined when terminal. Null means refused:
   * unknown target, or a chain that walks back onto the level itself.
   */
  private resolveNext(selfId: string | undefined, nextLevelId: string | undefined,
                      terminal: boolean | undefined): Level | undefined | null {
    if (terminal || !nextLevelId) {
      return undefined;
    }
    const next = levels.find((item) => item.id === nextLevelId);
    if (!next) {
      return null;
    }
    let cursor: Level | undefined = next;
    while (cursor) {
      if (selfId && cursor.id === selfId) {
        return null;
      }
      cursor = cursor.nextLevelId
        ? levels.find((item) => item.id === cursor?.nextLevelId)
        : undefined;
    }
    return next;
  }
}

const CYCLE_ORDER = new Map(MOCK_LEVEL_CYCLES.map((item) => [item.id, item.sequence]));

function compareLevels(a: Level, b: Level): number {
  const byCycle = (CYCLE_ORDER.get(a.cycleId) ?? 99) - (CYCLE_ORDER.get(b.cycleId) ?? 99);
  return byCycle !== 0 ? byCycle : a.sequence - b.sequence;
}
