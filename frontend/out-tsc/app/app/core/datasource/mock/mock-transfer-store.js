import { MOCK_CLASSROOMS, MOCK_STUDENTS } from './mock-data';
const REASON_LABELS = {
    TRANSFER_OUT: 'Transfert vers un autre établissement',
    FAMILY_MOVE: 'Déménagement de la famille',
    FINANCIAL: 'Raisons financières',
    DISCIPLINARY: 'Exclusion définitive',
    ACADEMIC: 'Réorientation',
    HEALTH: 'Raisons de santé',
    ABANDONMENT: 'Abandon sans nouvelles',
    OTHER: 'Autre motif'
};
const STATUS_LABELS = {
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
function hash(seed) {
    let value = 2166136261;
    for (let i = 0; i < seed.length; i++) {
        value ^= seed.charCodeAt(i);
        value = Math.imul(value, 16777619);
    }
    return ((value >>> 0) % 10000) / 10000;
}
function toIso(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        + `-${String(date.getDate()).padStart(2, '0')}`;
}
function today() {
    return toIso(new Date());
}
function shift(iso, days) {
    const date = new Date(`${iso}T00:00:00`);
    date.setDate(date.getDate() + days);
    return toIso(date);
}
class TransferStore {
    changes = [];
    departures = [];
    /** Où se trouve chaque élève, une fois les changements appliqués. */
    classroomOf = new Map();
    /** Les élèves sortis : ils ne comptent plus dans les effectifs. */
    gone = new Set();
    sequence = 1;
    constructor() {
        MOCK_STUDENTS.forEach((student) => {
            if (student.classroomId) {
                this.classroomOf.set(student.id, student.classroomId);
            }
        });
        this.seed();
    }
    // ---------------------------------------------------------------- lecture
    board(search) {
        const term = (search ?? '').trim().toLowerCase();
        const matches = (studentId) => {
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
            outstandingTotal: Math.round(pending.reduce((sum, row) => sum + row.outstandingAmount, 0) * 100) / 100,
            currency: 'XOF',
            classChanges,
            departures
        };
    }
    /** Les élèves encore en classe : une sortie enregistrée les en retire. */
    activeStudents() {
        return MOCK_STUDENTS.filter((student) => !this.gone.has(student.id));
    }
    classroomIdOf(studentId) {
        return this.classroomOf.get(studentId);
    }
    // --------------------------------------------------------------- écriture
    changeClass(payload) {
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
        const change = {
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
    recordDeparture(payload) {
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
        const departure = {
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
    updateDocuments(departureId, payload) {
        const departure = this.requireDeparture(departureId);
        this.requireEditable(departure);
        departure.exeatIssued = payload.exeatIssued;
        departure.certificateIssued = payload.certificateIssued;
        departure.reportCardIssued = payload.reportCardIssued;
        departure.fileReturned = payload.fileReturned;
        return this.describeDeparture(departure);
    }
    clear(departureId) {
        const departure = this.requireDeparture(departureId);
        this.requireEditable(departure);
        if (!this.complete(departure)) {
            throw new Error('DEPARTURE_DOCUMENTS_INCOMPLETE');
        }
        departure.status = 'CLEARED';
        departure.clearedAt = new Date().toISOString();
        return this.describeDeparture(departure);
    }
    cancel(departureId, reason) {
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
    requireDeparture(departureId) {
        const departure = this.departures.find((row) => row.id === departureId);
        if (!departure) {
            throw new Error('DEPARTURE_NOT_FOUND');
        }
        return departure;
    }
    requireEditable(departure) {
        if (departure.status !== 'RECORDED' && departure.status !== 'DRAFT') {
            throw new Error('DEPARTURE_NOT_EDITABLE');
        }
    }
    complete(departure) {
        return departure.exeatIssued && departure.certificateIssued
            && departure.reportCardIssued && departure.fileReturned;
    }
    /** L'inscription porte l'identifiant de l'élève dans la démonstration. */
    studentOfEnrollment(enrollmentId) {
        const studentId = enrollmentId.startsWith('enr-')
            ? enrollmentId.slice(4)
            : enrollmentId;
        return MOCK_STUDENTS.some((row) => row.id === studentId) ? studentId : undefined;
    }
    occupancyOf(classroomId) {
        let count = 0;
        this.classroomOf.forEach((room, studentId) => {
            if (room === classroomId && !this.gone.has(studentId)) {
                count++;
            }
        });
        return count;
    }
    /** Un solde plausible : deux familles sur trois sont à jour. */
    outstandingOf(studentId) {
        const draw = hash(`owed|${studentId}`);
        if (draw > 0.35) {
            return 0;
        }
        return Math.round((50000 + draw * 400000) / 5000) * 5000;
    }
    describeChange(change) {
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
    describeDeparture(departure) {
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
    seed() {
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
            const target = MOCK_CLASSROOMS.find((room) => room.id !== current && room.levelName
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
        const plan = [
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
        const taken = new Set();
        const leavers = new Array(plan.length);
        const draw = (owing) => {
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
            const departure = {
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
//# sourceMappingURL=mock-transfer-store.js.map