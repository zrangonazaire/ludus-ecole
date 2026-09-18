import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { createUuid } from '../../utils/uuid';
import { RoomDataSource } from '../data-source';
import {
  ROOM_TYPE_ORDER, Room, RoomCampusOption, RoomOptions, RoomQuery, RoomType, RoomUpsertPayload
} from '@core/models/room.models';

const LATENCY = 250;

const CAMPUSES: RoomCampusOption[] = [
  { id: 'campus-us', code: 'CAMP-US', name: 'Campus Principal', status: 'ACTIVE' },
  { id: 'campus-adj', code: 'CAMP-ADJ', name: 'Campus Adjoint', status: 'ACTIVE' }
];

/**
 * Salles de démonstration.
 *
 * <p>Mêmes règles que le serveur : code unique dans le campus, type pris dans
 * la liste, et archivage refusé tant qu'un cours de l'emploi du temps ou une
 * classe s'appuie sur la salle. Les compteurs d'occupation sont figés ici,
 * faute d'emploi du temps de démonstration cohérent — mais ils bloquent
 * réellement, ce qui est le point.</p>
 */
let rooms: Room[] = [
  room('A-101', 'Salle A 101', 'Bâtiment A', '1er étage', 45, 'CLASSROOM', 3, 0),
  room('A-102', 'Salle A 102', 'Bâtiment A', '1er étage', 45, 'CLASSROOM', 0, 0),
  room('A-SCI', 'Laboratoire de sciences', 'Bâtiment A', '2e étage', 30, 'SCIENCE_LAB', 2, 0),
  room('B-201', 'Salle B 201', 'Bâtiment B', '2e étage', 40, 'CLASSROOM', 0, 1),
  room('B-INFO', 'Salle informatique', 'Bâtiment B', 'Rez-de-chaussée', 24, 'COMPUTER_LAB', 0, 0),
  room('GYM', 'Gymnase', undefined, undefined, 120, 'SPORTS_HALL', 0, 0),
  room('C-101', 'Salle C 101', 'Bâtiment C', 'Rez-de-chaussée', 35, 'CLASSROOM', 0, 0,
    'campus-adj', 'CAMP-ADJ', 'Campus Adjoint'),
  room('BIB', 'Bibliothèque', 'Bâtiment C', undefined, 60, 'LIBRARY', 0, 0,
    'campus-adj', 'CAMP-ADJ', 'Campus Adjoint')
];

function room(code: string, name: string, building: string | undefined,
              floor: string | undefined, capacity: number, roomType: RoomType,
              timetableSlotCount: number, defaultClassroomCount: number,
              campusId = 'campus-us', campusCode = 'CAMP-US',
              campusName = 'Campus Principal'): Room {
  return {
    id: mockRoomId(code),
    campusId,
    campusCode,
    campusName,
    code,
    name,
    building,
    floor,
    capacity,
    roomType,
    status: 'ACTIVE',
    timetableSlotCount,
    defaultClassroomCount,
    archivable: timetableSlotCount === 0 && defaultClassroomCount === 0
  };
}

/**
 * Identifiant stable d'une salle de démonstration, dérivé de son code.
 *
 * <p>Un identifiant aléatoire obligerait l'emploi du temps de démonstration à
 * deviner où sont les salles. Dérivé du code, il est prévisible des deux côtés
 * et identique d'un rechargement à l'autre.</p>
 */
export function mockRoomId(code: string): string {
  return 'room-' + code.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/** Nom affichable d'une salle de démonstration, par identifiant. */
export function mockRoomName(roomId: string): string | undefined {
  return rooms.find((item) => item.id === roomId)?.name;
}

@Injectable()
export class MockRoomDataSource implements RoomDataSource {

  list(query: RoomQuery = {}): Observable<Room[]> {
    const needle = (query.search ?? '').trim().toLowerCase();
    const list = rooms
      .filter((item) => query.includeArchived || item.status === 'ACTIVE')
      .filter((item) => !query.campusId || item.campusId === query.campusId)
      .filter((item) => !query.roomType || item.roomType === query.roomType)
      .filter((item) => !query.building
        || (item.building ?? '').toLowerCase().includes(query.building.toLowerCase()))
      .filter((item) => !needle
        || [item.name, item.code, item.building ?? ''].some((value) =>
          value.toLowerCase().includes(needle)))
      .map((item) => ({ ...item }));
    return of(list).pipe(delay(LATENCY));
  }

  options(): Observable<RoomOptions> {
    return of({
      campuses: CAMPUSES.map((campus) => ({ ...campus })),
      roomTypes: [...ROOM_TYPE_ORDER]
    }).pipe(delay(LATENCY));
  }

  get(id: string): Observable<Room> {
    const found = rooms.find((item) => item.id === id);
    return found ? of({ ...found }).pipe(delay(LATENCY))
      : throwError(() => ({ status: 404, error: { code: 'ROOM_NOT_FOUND' } }));
  }

  create(payload: RoomUpsertPayload): Observable<Room> {
    const code = normalise(payload.code);
    if (rooms.some((item) => item.campusId === payload.campusId && item.code === code)) {
      return throwError(() => ({ status: 409, error: { code: 'ROOM_CODE_ALREADY_USED' } }));
    }
    const campus = CAMPUSES.find((item) => item.id === payload.campusId);
    if (!campus) {
      return throwError(() => ({ status: 404, error: { code: 'CAMPUS_NOT_FOUND' } }));
    }
    const created: Room = {
      id: createUuid(),
      campusId: campus.id,
      campusCode: campus.code,
      campusName: campus.name,
      code,
      name: payload.name.trim(),
      building: payload.building?.trim() || undefined,
      floor: payload.floor?.trim() || undefined,
      capacity: payload.capacity,
      roomType: payload.roomType,
      status: 'ACTIVE',
      timetableSlotCount: 0,
      defaultClassroomCount: 0,
      archivable: true
    };
    rooms = [...rooms, created];
    return of({ ...created }).pipe(delay(LATENCY));
  }

  update(id: string, payload: RoomUpsertPayload): Observable<Room> {
    const index = rooms.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => ({ status: 404, error: { code: 'ROOM_NOT_FOUND' } }));
    }
    const existing = rooms[index];
    const code = normalise(payload.code);
    if (rooms.some((item) => item.id !== id
      && item.campusId === payload.campusId && item.code === code)) {
      return throwError(() => ({ status: 409, error: { code: 'ROOM_CODE_ALREADY_USED' } }));
    }
    // Le serveur refuse de changer une salle occupee de campus : le mock doit
    // refuser pareil, sinon la demonstration apprend un geste que le produit
    // rejette.
    if (payload.campusId !== existing.campusId
      && (existing.timetableSlotCount > 0 || existing.defaultClassroomCount > 0)) {
      return throwError(() => ({ status: 409, error: { code: 'ROOM_IN_USE' } }));
    }
    const campus = CAMPUSES.find((item) => item.id === payload.campusId);
    if (!campus) {
      return throwError(() => ({ status: 404, error: { code: 'CAMPUS_NOT_FOUND' } }));
    }
    const updated: Room = {
      ...existing,
      campusId: campus.id,
      campusCode: campus.code,
      campusName: campus.name,
      code,
      name: payload.name.trim(),
      building: payload.building?.trim() || undefined,
      floor: payload.floor?.trim() || undefined,
      capacity: payload.capacity,
      roomType: payload.roomType
    };
    rooms = rooms.map((item) => item.id === id ? updated : item);
    return of({ ...updated }).pipe(delay(LATENCY));
  }

  archive(id: string): Observable<Room> {
    const existing = rooms.find((item) => item.id === id);
    if (!existing) {
      return throwError(() => ({ status: 404, error: { code: 'ROOM_NOT_FOUND' } }));
    }
    if (existing.timetableSlotCount > 0 || existing.defaultClassroomCount > 0) {
      return throwError(() => ({ status: 409, error: { code: 'ROOM_IN_USE' } }));
    }
    const archived: Room = { ...existing, status: 'ARCHIVED', archivable: false };
    rooms = rooms.map((item) => item.id === id ? archived : item);
    return of({ ...archived }).pipe(delay(LATENCY));
  }

  restore(id: string): Observable<Room> {
    const existing = rooms.find((item) => item.id === id);
    if (!existing) {
      return throwError(() => ({ status: 404, error: { code: 'ROOM_NOT_FOUND' } }));
    }
    const restored: Room = {
      ...existing,
      status: 'ACTIVE',
      archivable: existing.timetableSlotCount === 0 && existing.defaultClassroomCount === 0
    };
    rooms = rooms.map((item) => item.id === id ? restored : item);
    return of({ ...restored }).pipe(delay(LATENCY));
  }
}

function normalise(value: string): string {
  return value.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
}