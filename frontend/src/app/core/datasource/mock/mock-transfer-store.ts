import {
  ClassChange, ClassChangePayload, Departure, DepartureDocumentsPayload,
  DepartureRecordPayload, DepartureReason, DepartureStatus, TransferBoard
} from '@core/models/transfer.models';
import { MOCK_CLASSROOMS, MOCK_STUDENTS } from './mock-data';

/**
 * Movements, in memory, for the demonstration.
 *
 * <p>A departure closes an enrollment; the store therefore keeps its own idea
 * of who is still in class, and honours it. A demo where a pupil struck off on
 * Monday still appears in the class list on Tuesday teaches the opposite of
 * what the screen exists to say.</p>
 */

interface StoredChange {
  id: string;
  enrollmentId: string;
  studentId: string;
  fromClassroomId: string;
  toClassroomId: string;
  reason: string;
  transferredAt: string;
}

interface StoredDeparture {
  id: string;
  studentId: string;
  enrollmentId: string;
  classroomId: string;
  reason: DepartureReason;
  departureDate: string;
  destinationSchool?: string;
  destinationCity?: string;
  notes?: string;
  outstandingAmount: number;
  currency: string;
  exeatIssued: boolean;
  certificateIssued: boolean;
  reportCardIssued: boolean;
  fileReturned: boolean;
  status: DepartureStatus;
  recordedAt: string;
  clearedAt?: string;
  cancelledReason?: string;
}

const REASON_LABELS: Record<DepartureReason, string> = {
  TRANSFER_OUT: 'Transfert vers un autre établissement',
  FAMILY_MOVE: 'Déménagement de la famille',
  FINANCIAL: 'Raisons financières',
  DISCIPLINARY: 'Exclusion définitive',
  ACADEMIC: 'Réorientation',
  HEALTH: 'Raisons de santé',
  ABANDONMENT: 'Abandon sans nouvelles',
  OTHER: 'Autre motif'
};

const STATUS_LABELS: Record<DepartureStatus, string> = {
  DRAFT: 'Brouillon',
  RECORDED: 'Sortie enregistrée',
  CLEARED: 'Dossier soldé',
  CANCELLED: 'Annulée'
};

/** Les écoles voisines, pour les transferts de la démonstration. */
const NEARBY_SCHOOLS = [
  ['Collège Moderne de Cocody', 'Abidjan'],
  ['Lycée Municipal de Yopougon', 'Abidjan'],
  ['Collège Sainte-Marie', 'Bouaké'],
  ['Lycée Classique de Daloa', 'Daloa']
];

function hash(seed: string): number {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return ((value >>> 0) % 10000) / 10000;
}

function toIso(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    + `-${String(date.getDate()).padStart(2, '0')}`;
}

function today(): string {
  return toIso(new Date());
}

function shift(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

class TransferStore {
  private readonly changes: StoredChange[] = [];
  private readonly departures: StoredDeparture[] = [];
  /** Où se trouve chaque élève, une fois les changements appliqués. */
  private readonly classroomOf = new Map<string, string>();
  /** Les élèves sortis : ils ne comptent plus dans les effectifs. */
  private readonly gone = new Set<string>();
  private sequence = 1;

  constructor() {
    MOCK_STUDENTS.forEach((student) => {
      if (student.classroomId) {
        this.classroomOf.set(student.id, student.classroomId);
      }
    });
    this.seed();
  }

  // ---------------------------------------------------------------- lecture

  board(search?: string): TransferBoard {
    const term = (search ?? '').trim().toLowerCase();
    const matches = (studentId: string) => {
      if (!term) {
        return true;
      }
      const student = MOCK_STUDENTS.find((row) => row.id === studentId);
      return (student?.fullName.toLowerCase().includes(term) ?? false)
        || (student?.studentNumber.toLowerCase().includes(term) ?? false);
    };

    const classChanges = this.changes
      .filter((change) => matches(change.studentId))
      .map((change) => this.describeChange(change))
      .sort((a, b) => b.transferredAt.localeCompare(a.transferredAt));

    const departures = this.departures
      .filter((departure) => matches(departure.studentId))
      .map((departure) => this.describeDeparture(departure))
      .sort((a, b) => b.departureDate.localeCompare(a.departureDate));

    const pending = departures.filter((row) => row.status === 'RECORDED');
    return {
      academicYearId: 'ay-2026-2027',
      academicYearCode: '2026-2027',
      classChangeCount: classChanges.length,
      pendingDepartureCount: pending.length,
      clearedDepartureCount: departures.filter((row) => row.status === 'CLEARED').length,
      upcomingDepartureCount: departures.filter((row) => row.upcoming).length,
      // Ce que doivent les familles qui partent : affiché, jamais bloquant.
      outstandingTotal: Math.round(
        pending.reduce((sum, row) => sum + row.outstandingAmount, 0) * 100) / 100,
      currency: 'XOF',
      classChanges,
      departures
    };
  }

  /** Les élèves encore en classe : une sortie enregistrée les en retire. */
  activeStudents(): typeof MOCK_STUDENTS {
    return MOCK_STUDENTS.filter((student) => !this.gone.has(student.id));
  }

  classroomIdOf(studentId: string): string | undefined {
    return this.classroomOf.get(studentId);
  }

  // --------------------------------------------------------------- écriture

  changeClass(payload: ClassChangePayload): ClassChange {
    const studentId = this.studentOfEnrollment(payload.enrollmentId);
    if (!studentId) {
      throw new Error('ENROLLMENT_NOT_FOUND');
    }
    if (this.gone.has(studentId)) {
      throw new Error('ENROLLMENT_NOT_ALLOWED');
    }
    const from = this.classroomOf.get(studentId);
    const to = MOCK_CLASSROOMS.find((room) => room.id === payload.toClassroomId);
    if (!to) {
      throw new Error('CLASS_NOT_FOUND');
    }
    if (from === to.id) {
      throw new Error('TRANSFER_SAME_CLASSROOM');
    }
    if (to.status !== 'ACTIVE') {
      throw new Error('CLASS_NOT_ACTIVE');
    }
    // Le même contrôle que l'inscription : un changement qui l'ignorerait
    // surchargerait une classe sans que personne l'ait décidé.
    const occupied = this.occupancyOf(to.id);
    if (!payload.overrideCapacity && occupied >= to.capacityMaximum) {
      throw new Error('CLASS_CAPACITY_EXCEEDED');
    }

    const change: StoredChange = {
      id: `chg-${this.sequence++}`,
      enrollmentId: payload.enrollmentId,
      studentId,
      fromClassroomId: from ?? '',
      toClassroomId: to.id,
      reason: payload.reason.trim(),
      transferredAt: new Date().toISOString()
    };
    this.changes.push(change);
    this.classroomOf.set(studentId, to.id);
    return this.describeChange(change);
  }

  recordDeparture(payload: DepartureRecordPayload): Departure {
    const studentId = this.studentOfEnrollment(payload.enrollmentId);
    if (!studentId) {
      throw new Error('ENROLLMENT_NOT_FOUND');
    }
    if (this.gone.has(studentId)) {
      throw new Error('ENROLLMENT_NOT_ALLOWED');
    }
    if (this.departures.some((row) => row.enrollmentId === payload.enrollmentId
      && row.status !== 'CANCELLED')) {
      throw new Error('DEPARTURE_ALREADY_RECORDED');
    }
    if (payload.reason === 'TRANSFER_OUT' && !payload.destinationSchool?.trim()) {
      throw new Error('VALIDATION_ERROR');
    }

    const departure: StoredDeparture = {
      id: `dep-${this.sequence++}`,
      studentId,
      enrollmentId: payload.enrollmentId,
      classroomId: this.classroomOf.get(studentId) ?? '',
      reason: payload.reason,
      departureDate: payload.departureDate,
      destinationSchool: payload.destinationSchool?.trim() || undefined,
      destinationCity: payload.destinationCity?.trim() || undefined,
      notes: payload.notes?.trim() || undefined,
      // Le solde est lu maintenant et figé : recalculé plus tard il donnerait
      // un autre chiffre que celui annoncé à la famille.
      outstandingAmount: this.outstandingOf(studentId),
      currency: 'XOF',
      exeatIssued: false,
      certificateIssued: false,
      reportCardIssued: false,
      fileReturned: false,
      status: 'RECORDED',
      recordedAt: new Date().toISOString()
    };
    this.departures.push(departure);
    this.gone.add(studentId);
    return this.describeDeparture(departure);
  }

  updateDocuments(departureId: string, payload: DepartureDocumentsPayload): Departure {
    const departure = this.requireDeparture(departureId);
    this.requireEditable(departure);
    departure.exeatIssued = payload.exeatIssued;
    departure.certificateIssued = payload.certificateIssued;
    departure.reportCardIssued = payload.reportCardIssued;
    departure.fileReturned = payload.fileReturned;
    return this.describeDeparture(departure);
  }

  clear(departureId: string): Departure {
    const departure = this.requireDeparture(departureId);
    this.requireEditable(departure);
    if (!this.complete(departure)) {
      throw new Error('DEPARTURE_DOCUMENTS_INCOMPLETE');
    }
    departure.status = 'CLEARED';
    departure.clearedAt = new Date().toISOString();
    return this.describeDeparture(departure);
  }

  cancel(departureId: string, reason: string): Departure {
    const departure = this.requireDeparture(departureId);
    if (departure.status === 'CANCELLED') {
      throw new Error('DEPARTURE_NOT_EDITABLE');
    }
    departure.status = 'CANCELLED';
    departure.cancelledReason = reason.trim();
    // L'élève revient : sans cela, il resterait hors des effectifs et
    // l'annulation n'aurait corrigé qu'une ligne d'écran.
    this.gone.delete(departure.studentId);
    return this.describeDeparture(departure);
  }

  // ------------------------------------------------------------- internals

  private requireDeparture(departureId: string): StoredDeparture {
    const departure = this.departures.find((row) => row.id === departureId);
    if (!departure) {
      throw new Error('DEPARTURE_NOT_FOUND');
    }
    return departure;
  }

  private requireEditable(departure: StoredDeparture): void {
    if (departure.status !== 'RECORDED' && departure.status !== 'DRAFT') {
      throw new Error('DEPARTURE_NOT_EDITABLE');
    }
  }

  private complete(departure: StoredDeparture): boolean {
    return departure.exeatIssued && departure.certificateIssued
      && departure.reportCardIssued && departure.fileReturned;
  }

  /** L'inscription porte l'identifiant de l'élève dans la démonstration. */
  private studentOfEnrollment(enrollmentId: string): string | undefined {
    const studentId = enrollmentId.startsWith('enr-')
      ? enrollmentId.slice(4)
      : enrollmentId;
    return MOCK_STUDENTS.some((row) => row.id === studentId) ? studentId : undefined;
  }

  private occupancyOf(classroomId: string): number {
    let count = 0;
    this.classroomOf.forEach((room, studentId) => {
      if (room === classroomId && !this.gone.has(studentId)) {
        count++;
      }
    });
    return count;
  }

  /** Un solde plausible : deux familles sur trois sont à jour. */
  private outstandingOf(studentId: string): number {
    const draw = hash(`owed|${studentId}`);
    if (draw > 0.35) {
      return 0;
    }
    return Math.round((50000 + draw * 400000) / 5000) * 5000;
  }

  private describeChange(change: StoredChange): ClassChange {
    const student = MOCK_STUDENTS.find((row) => row.id === change.studentId);
    const from = MOCK_CLASSROOMS.find((row) => row.id === change.fromClassroomId);
    const to = MOCK_CLASSROOMS.find((row) => row.id === change.toClassroomId);
    return {
      id: change.id,
      enrollmentId: change.enrollmentId,
      studentId: change.studentId,
      studentNumber: student?.studentNumber ?? '',
      studentName: student?.fullName ?? 'Élève',
      fromClassroomId: change.fromClassroomId,
      fromClassroomName: from?.name ?? '',
      toClassroomId: change.toClassroomId,
      toClassroomName: to?.name ?? '',
      crossesLevel: from !== undefined && to !== undefined
        && from.levelId !== to.levelId,
      reason: change.reason,
      transferredAt: change.transferredAt
    };
  }

  private describeDeparture(departure: StoredDeparture): Departure {
    const student = MOCK_STUDENTS.find((row) => row.id === departure.studentId);
    const classroom = MOCK_CLASSROOMS.find((row) => row.id === departure.classroomId);
    const issued = [departure.exeatIssued, departure.certificateIssued,
      departure.reportCardIssued, departure.fileReturned].filter(Boolean).length;

    return {
      id: departure.id,
      studentId: departure.studentId,
      studentNumber: student?.studentNumber ?? '',
      studentName: student?.fullName ?? 'Élève',
      enrollmentId: departure.enrollmentId,
      classroomId: departure.classroomId,
      classroomName: classroom?.name ?? '',
      levelName: classroom?.levelName,
      reason: departure.reason,
      reasonLabel: REASON_LABELS[departure.reason],
      departureDate: departure.departureDate,
      upcoming: departure.status !== 'CANCELLED' && departure.departureDate > today(),
      destinationSchool: departure.destinationSchool,
      destinationCity: departure.destinationCity,
      notes: departure.notes,
      outstandingAmount: departure.outstandingAmount,
      currency: departure.currency,
      exeatIssued: departure.exeatIssued,
      certificateIssued: departure.certificateIssued,
      reportCardIssued: departure.reportCardIssued,
      fileReturned: departure.fileReturned,
      documentsIssued: issued,
      documentsComplete: this.complete(departure),
      status: departure.status,
      statusLabel: STATUS_LABELS[departure.status],
      editable: departure.status === 'RECORDED' || departure.status === 'DRAFT',
      allowsReturn: departure.reason !== 'DISCIPLINARY',
      recordedAt: departure.recordedAt,
      clearedAt: departure.clearedAt,
      cancelledReason: departure.cancelledReason
    };
  }

  /**
   * A term's worth of movements.
   *
   * <p>Every state is laid out: a departure still owing papers, one settled,
   * one announced for next month, one cancelled because the family changed its
   * mind. Opening the screen on a single state would leave three quarters of it
   * undemonstrable.</p>
   */
  private seed(): void {
    const now = today();

    // Quelques changements de classe : c'est le mouvement le plus courant.
    const movers = MOCK_STUDENTS.filter((_, index) => index % 17 === 3).slice(0, 5);
    const reasons = [
      'Rééquilibrage des effectifs après trois arrivées',
      'Rapprochement du groupe de langue vivante',
      'Demande de la famille, accord du chef d’établissement',
      'Incompatibilité signalée par le conseil de classe',
      'Passage en groupe allégé sur avis du professeur principal'
    ];
    movers.forEach((student, index) => {
      const current = this.classroomOf.get(student.id);
      const target = MOCK_CLASSROOMS.find(
        (room) => room.id !== current && room.levelName
          === MOCK_CLASSROOMS.find((r) => r.id === current)?.levelName);
      if (!target) {
        return;
      }
      this.changes.push({
        id: `chg-${this.sequence++}`,
        enrollmentId: `enr-${student.id}`,
        studentId: student.id,
        fromClassroomId: current ?? '',
        toClassroomId: target.id,
        reason: reasons[index % reasons.length],
        transferredAt: new Date(`${shift(now, -30 + index * 5)}T09:00:00`).toISOString()
      });
      this.classroomOf.set(student.id, target.id);
    });

    // Quatre sorties, une par état.
    const plan: Array<{
      reason: DepartureReason; offset: number; status: DepartureStatus;
      issued: number; owing: boolean;
    }> = [
      { reason: 'TRANSFER_OUT', offset: -18, status: 'CLEARED', issued: 4, owing: false },
      { reason: 'FAMILY_MOVE', offset: -6, status: 'RECORDED', issued: 2, owing: true },
      { reason: 'TRANSFER_OUT', offset: 12, status: 'RECORDED', issued: 0, owing: false },
      { reason: 'ACADEMIC', offset: -24, status: 'CANCELLED', issued: 1, owing: false }
    ];

    /*
     * Le solde dû est tiré du dossier de l'élève, pas de la ligne de sortie. Si
     * les quatre partants tirés étaient à jour, l'écran s'ouvrirait sur un total
     * d'impayés à zéro : la colonne qui doit retenir le secrétariat au moment de
     * délivrer l'exeat ne montrerait jamais rien. On choisit donc pour la sortie
     * marquée « owing » un élève qui doit effectivement de l'argent.
     */
    const pool = MOCK_STUDENTS.filter((_, index) => index % 23 === 7);
    const taken = new Set<string>();
    const leavers: Array<(typeof MOCK_STUDENTS)[number] | undefined> = new Array(plan.length);
    const draw = (owing: boolean): (typeof MOCK_STUDENTS)[number] | undefined => {
      const pick = pool.find((student) => !taken.has(student.id)
        && (!owing || this.outstandingOf(student.id) > 0));
      if (pick) {
        taken.add(pick.id);
      }
      return pick;
    };
    // Les sorties qui doivent montrer un impayé servent d'abord : servies après,
    // elles risqueraient de ne trouver que des élèves à jour.
    plan.forEach((step, index) => {
      if (step.owing) {
        leavers[index] = draw(true);
      }
    });
    plan.forEach((step, index) => {
      leavers[index] ??= draw(false);
    });

    plan.forEach((step, index) => {
      const student = leavers[index];
      if (!student) {
        return;
      }
      const [school, city] = NEARBY_SCHOOLS[index % NEARBY_SCHOOLS.length];
      const departure: StoredDeparture = {
        id: `dep-${this.sequence++}`,
        studentId: student.id,
        enrollmentId: `enr-${student.id}`,
        classroomId: this.classroomOf.get(student.id) ?? '',
        reason: step.reason,
        departureDate: shift(now, step.offset),
        destinationSchool: step.reason === 'TRANSFER_OUT' ? school : undefined,
        destinationCity: step.reason === 'TRANSFER_OUT' ? city : undefined,
        notes: step.status === 'CANCELLED'
          ? undefined
          : 'Famille reçue au secrétariat, pièces annoncées.',
        outstandingAmount: this.outstandingOf(student.id),
        currency: 'XOF',
        exeatIssued: step.issued > 0,
        certificateIssued: step.issued > 1,
        reportCardIssued: step.issued > 2,
        fileReturned: step.issued > 3,
        status: step.status,
        recordedAt: new Date(`${shift(now, step.offset - 2)}T10:30:00`).toISOString(),
        clearedAt: step.status === 'CLEARED'
          ? new Date(`${shift(now, step.offset + 1)}T15:00:00`).toISOString()
          : undefined,
        cancelledReason: step.status === 'CANCELLED'
          ? 'La famille est revenue sur sa décision, l’élève reprend sa place.'
          : undefined
      };
      this.departures.push(departure);
      if (departure.status !== 'CANCELLED') {
        this.gone.add(student.id);
      }
    });
  }
}

/** One register of movements for the whole demonstration session. */
export const MOCK_TRANSFERS = new TransferStore();
