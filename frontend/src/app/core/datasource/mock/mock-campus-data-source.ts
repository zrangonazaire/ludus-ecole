import { createUuid } from '../../utils/uuid';
import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Campus } from '@core/models/domain.models';
import { CampusDataSource, CampusUpsertPayload } from '../data-source';

const LATENCY = 250;

let campuses: Campus[] = [
  {
    id: createUuid(),
    code: 'CAMP-US',
    name: 'Campus Principal',
    addressLine1: 'Avenue de la République',
    city: 'Abidjan',
    phone: '+225 0700000000',
    email: 'principal@ecole.ci',
    main: true,
    status: 'ACTIVE',
    roomCount: 12,
    archivable: false
  },
  {
    id: createUuid(),
    code: 'CAMP-ADJ',
    name: 'Campus Adjoint',
    addressLine1: 'Rue des Braves',
    city: 'Abidjan',
    phone: '+225 0500000000',
    email: 'adjoint@ecole.ci',
    main: false,
    status: 'ACTIVE',
    roomCount: 6,
    archivable: true
  }
];

/**
 * Demo implementation of the campuses screen.
 *
 * <p>Same rules as the server: a main campus cannot be archived, and
 * archiving is refused while active rooms still point at it. A demo that
 * accepts what the product refuses teaches the wrong thing.</p>
 */
@Injectable()
export class MockCampusDataSource implements CampusDataSource {
  list(includeArchived = false): Observable<Campus[]> {
    const list = (includeArchived ? campuses : campuses.filter(c => c.status === 'ACTIVE'))
      .map(c => ({ ...c }));
    return of(list).pipe(delay(LATENCY));
  }

    get(id: string): Observable<Campus> {
    const campus = campuses.find(c => c.id === id);
    return campus ? of({ ...campus }).pipe(delay(LATENCY))
      : throwError(() => new Error('CAMPUS_NOT_FOUND'));
  }

  create(payload: CampusUpsertPayload): Observable<Campus> {
    if (campuses.some(c => c.code === payload.code.toUpperCase())) {
      return throwError(() => new Error('CAMPUS_CODE_ALREADY_USED'));
    }
    if (payload.main && campuses.some(c => c.main && c.status === 'ACTIVE')) {
      return throwError(() => new Error('CAMPUS_MAIN_EXISTS'));
    }
    const campus: Campus = {
      id: createUuid(),
      code: payload.code.toUpperCase(),
      name: payload.name.trim(),
      addressLine1: payload.addressLine1?.trim() || undefined,
      city: payload.city?.trim() || undefined,
      phone: payload.phone?.trim() || undefined,
      email: payload.email?.trim() || undefined,
      main: !!payload.main,
      status: 'ACTIVE',
      roomCount: 0,
      archivable: true
    };
    campuses.push(campus);
    return of(campus).pipe(delay(LATENCY));
  }

  update(id: string, payload: CampusUpsertPayload): Observable<Campus> {
    const idx = campuses.findIndex(c => c.id === id);
    if (idx === -1) {
      return throwError(() => new Error('CAMPUS_NOT_FOUND'));
    }
    const existing = campuses[idx];
    if (payload.code.toUpperCase() !== existing.code &&
        campuses.some(c => c.code === payload.code.toUpperCase() && c.id !== id)) {
      return throwError(() => new Error('CAMPUS_CODE_ALREADY_USED'));
    }
    if (payload.main && !existing.main &&
        campuses.some(c => c.main && c.status === 'ACTIVE' && c.id !== id)) {
      return throwError(() => new Error('CAMPUS_MAIN_EXISTS'));
    }
    existing.code = payload.code.toUpperCase();
    existing.name = payload.name.trim();
    existing.addressLine1 = payload.addressLine1?.trim() || undefined;
    existing.city = payload.city?.trim() || undefined;
    existing.phone = payload.phone?.trim() || undefined;
    existing.email = payload.email?.trim() || undefined;
    existing.main = !!payload.main;
    return of({ ...existing }).pipe(delay(LATENCY));
  }

  archive(id: string): Observable<Campus> {
    const campus = campuses.find(c => c.id === id);
    if (!campus) {
      return throwError(() => new Error('CAMPUS_NOT_FOUND'));
    }
    if (campus.main) {
      return throwError(() => new Error('CAMPUS_CANNOT_ARCHIVE_MAIN'));
    }
    campus.status = 'ARCHIVED';
    return of({ ...campus }).pipe(delay(LATENCY));
  }

  restore(id: string): Observable<Campus> {
    const campus = campuses.find(c => c.id === id);
    if (!campus) {
      return throwError(() => new Error('CAMPUS_NOT_FOUND'));
    }
    campus.status = 'ACTIVE';
    return of({ ...campus }).pipe(delay(LATENCY));
  }
}
