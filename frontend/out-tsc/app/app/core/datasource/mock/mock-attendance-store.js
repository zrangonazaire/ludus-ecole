import { MOCK_CLASSROOMS, MOCK_STUDENTS } from './mock-data';
/** Two days: a note written in the evening arrives the next morning. */
const FOLLOW_UP_AFTER_DAYS = 2;
const REPEATED_ABSENCE_THRESHOLD = 3;
const LABELS = {
    PRESENT: 'Présent',
    ABSENT: 'Absent',
    LATE: 'En retard',
    EXCUSED_ABSENCE: 'Absence justifiée',
    EXCUSED_LATE: 'Retard justifié',
    LEFT_EARLY: 'Parti avant la fin'
};
const SESSION_LABELS = {
    OPEN: 'Appel en cours',
    SUBMITTED: 'Appel fait',
    VALIDATED: 'Appel validé',
    LOCKED: 'Verrouillé'
};
const REASONS = ['Maladie', 'Rendez-vous médical', 'Deuil familial',
    'Transport', 'Motif non communiqué'];
/** Deterministic 0..1 from a string, so the demo is identical on every reload. */
function hash(seed) {
    let value = 2166136261;
    for (let i = 0; i < seed.length; i++) {
        value ^= seed.charCodeAt(i);
        value = Math.imul(value, 16777619);
    }
    return ((value >>> 0) % 10000) / 10000;
}
export function isoDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
}
export function today() {
    return isoDate(new Date());
}
/** School days going back from a date, weekends excluded. */
function schoolDaysBefore(count) {
    const days = [];
    const cursor = new Date();
    while (days.length < count) {
        cursor.setDate(cursor.getDate() - 1);
        const weekday = cursor.getDay();
        if (weekday !== 0 && weekday !== 6) {
            days.push(isoDate(cursor));
        }
    }
    return days;
}
function daysBetween(from, to) {
    const start = Date.parse(`${from}T00:00:00`);
    const end = Date.parse(`${to}T00:00:00`);
    return Math.round((end - start) / 86400000);
}
class AttendanceStore {
    sheets = new Map();
    records = [];
    sequence = 1;
    constructor() {
        this.seed();
    }
    // ------------------------------------------------------------- the day
    day(date) {
        const classrooms = MOCK_CLASSROOMS.map((classroom) => {
            const sheet = this.sheets.get(this.key(classroom.id, date));
            const expected = this.studentsOf(classroom.id).length;
            return {
                classroomId: classroom.id,
                classroomName: classroom.name,
                levelName: classroom.levelName,
                mainTeacherName: classroom.mainTeacherName,
                expectedCount: expected,
                sheetId: sheet?.id,
                status: sheet?.status,
                statusLabel: sheet ? SESSION_LABELS[sheet.status] : undefined,
                presentCount: sheet?.presentCount ?? 0,
                absentCount: sheet?.absentCount ?? 0,
                lateCount: sheet?.lateCount ?? 0,
                done: sheet !== undefined && sheet.status !== 'OPEN',
                submittedAt: sheet?.submittedAt
            };
        });
        const called = classrooms.filter((c) => c.done);
        const expected = called.reduce((sum, c) => sum + c.expectedCount, 0);
        const present = called.reduce((sum, c) => sum + c.presentCount, 0);
        const late = called.reduce((sum, c) => sum + c.lateCount, 0);
        return {
            date,
            academicYearId: 'ay-2026-2027',
            termName: '2e trimestre',
            classroomCount: classrooms.length,
            sheetsDone: called.length,
            expectedCount: expected,
            presentCount: present,
            absentCount: called.reduce((sum, c) => sum + c.absentCount, 0),
            lateCount: late,
            // Un taux sans appel n'est pas zéro : il n'existe pas.
            attendanceRate: expected > 0
                ? Math.round(((present + late) * 10000) / expected) / 100
                : undefined,
            classrooms
        };
    }
    // ----------------------------------------------------------- the sheet
    sheet(classroomId, date) {
        const classroom = MOCK_CLASSROOMS.find((c) => c.id === classroomId) ?? MOCK_CLASSROOMS[0];
        const students = this.studentsOf(classroom.id);
        const stored = this.sheets.get(this.key(classroom.id, date));
        const marks = new Map(this.recordsOf(classroom.id, date).map((r) => [r.studentId, r]));
        const records = students.map((student) => {
            const mark = marks.get(student.id);
            const status = mark?.status ?? 'PRESENT';
            return {
                id: mark?.id,
                studentId: student.id,
                studentNumber: student.studentNumber,
                studentName: student.fullName,
                status,
                statusLabel: LABELS[status],
                arrivalTime: mark?.arrivalTime,
                minutesLate: mark?.minutesLate,
                reason: mark?.reason,
                justified: mark?.justified ?? false
            };
        });
        return {
            id: stored?.id,
            classroomId: classroom.id,
            classroomName: classroom.name,
            levelName: classroom.levelName,
            teacherName: classroom.mainTeacherName,
            sessionDate: date,
            status: stored?.status ?? 'OPEN',
            statusLabel: SESSION_LABELS[stored?.status ?? 'OPEN'],
            expectedCount: students.length,
            presentCount: stored?.presentCount ?? students.length,
            absentCount: stored?.absentCount ?? 0,
            lateCount: stored?.lateCount ?? 0,
            submittedAt: stored?.submittedAt,
            editable: (stored?.status ?? 'OPEN') !== 'LOCKED',
            records
        };
    }
    submit(sheet) {
        const date = sheet.sessionDate;
        const classroomId = sheet.classroomId;
        const existing = new Map(this.recordsOf(classroomId, date).map((r) => [r.studentId, r]));
        let absent = 0;
        let late = 0;
        sheet.records.forEach((record) => {
            if (record.status === 'ABSENT' || record.status === 'EXCUSED_ABSENCE') {
                absent++;
            }
            else if (record.status === 'LATE' || record.status === 'EXCUSED_LATE') {
                late++;
            }
            const stored = existing.get(record.studentId);
            if (stored) {
                stored.status = record.status;
                stored.arrivalTime = record.arrivalTime;
                stored.minutesLate = record.minutesLate;
                // Un justificatif déjà reçu survit à une correction de l'appel.
                if (!stored.justified) {
                    stored.reason = record.reason;
                }
                return;
            }
            this.records.push({
                id: `att-${this.sequence++}`,
                studentId: record.studentId,
                classroomId,
                date,
                status: record.status,
                arrivalTime: record.arrivalTime,
                minutesLate: record.minutesLate,
                reason: record.reason,
                justified: record.status === 'EXCUSED_ABSENCE' || record.status === 'EXCUSED_LATE',
                guardianNotified: false
            });
        });
        const expected = sheet.records.length;
        this.sheets.set(this.key(classroomId, date), {
            id: this.sheets.get(this.key(classroomId, date))?.id ?? `sheet-${this.sequence++}`,
            classroomId,
            date,
            status: 'SUBMITTED',
            submittedAt: new Date().toISOString(),
            expectedCount: expected,
            // Les présents sont ce qui reste : le compte tombe toujours juste.
            presentCount: Math.max(0, expected - absent - late),
            absentCount: absent,
            lateCount: late
        });
        return this.sheet(classroomId, date);
    }
    // -------------------------------------------------------- the follow-up
    absences(query) {
        const to = query.to ?? today();
        const from = query.from ?? isoDate(new Date(Date.parse(`${to}T00:00:00`) - 30 * 86400000));
        const inWindow = this.records.filter((record) => record.status !== 'PRESENT' && record.status !== 'LEFT_EARLY'
            && record.date >= from && record.date <= to
            && (!query.classroomId || record.classroomId === query.classroomId));
        const all = inWindow
            .map((record) => this.toAbsence(record))
            .sort((a, b) => b.date.localeCompare(a.date)
            || a.classroomName.localeCompare(b.classroomName)
            || a.studentName.localeCompare(b.studentName));
        const absenceCount = all.filter((a) => a.status === 'ABSENT'
            || a.status === 'EXCUSED_ABSENCE').length;
        const unjustified = all.filter((a) => !a.justified);
        const perStudent = new Map();
        unjustified.filter((a) => a.status === 'ABSENT').forEach((a) => {
            perStudent.set(a.studentId, (perStudent.get(a.studentId) ?? 0) + 1);
        });
        const attended = this.records.filter((r) => r.date >= from && r.date <= to);
        const presentLike = attended.filter((r) => r.status !== 'ABSENT'
            && r.status !== 'EXCUSED_ABSENCE').length;
        const filter = query.filter ?? 'ALL';
        return {
            from,
            to,
            absenceCount,
            latenessCount: all.length - absenceCount,
            justifiedCount: all.length - unjustified.length,
            unjustifiedCount: unjustified.length,
            followUpCount: all.filter((a) => a.needsFollowUp).length,
            studentCount: new Set(all.map((a) => a.studentId)).size,
            repeatedCount: [...perStudent.values()]
                .filter((n) => n >= REPEATED_ABSENCE_THRESHOLD).length,
            attendanceRate: attended.length > 0
                ? Math.round((presentLike * 10000) / attended.length) / 100
                : undefined,
            entries: all.filter((entry) => this.matches(entry, filter))
        };
    }
    justify(attendanceId, payload) {
        const record = this.records.find((r) => r.id === attendanceId);
        if (!record) {
            throw new Error('ATTENDANCE_SESSION_NOT_FOUND');
        }
        record.justified = true;
        record.reason = payload.reason;
        record.justificationDocumentUrl = payload.documentUrl;
        if (record.status === 'ABSENT') {
            record.status = 'EXCUSED_ABSENCE';
        }
        else if (record.status === 'LATE') {
            record.status = 'EXCUSED_LATE';
        }
        return this.toAbsence(record);
    }
    remind(attendanceId) {
        const record = this.records.find((r) => r.id === attendanceId);
        if (!record) {
            throw new Error('ATTENDANCE_SESSION_NOT_FOUND');
        }
        record.guardianNotified = true;
        return this.toAbsence(record);
    }
    // ------------------------------------------------------------ internals
    matches(entry, filter) {
        switch (filter) {
            case 'UNJUSTIFIED': return !entry.justified;
            case 'FOLLOW_UP': return entry.needsFollowUp;
            case 'JUSTIFIED': return entry.justified;
            case 'LATENESS': return entry.status === 'LATE' || entry.status === 'EXCUSED_LATE';
            default: return true;
        }
    }
    toAbsence(record) {
        const student = MOCK_STUDENTS.find((s) => s.id === record.studentId);
        const classroom = MOCK_CLASSROOMS.find((c) => c.id === record.classroomId);
        const waiting = Math.max(0, daysBetween(record.date, today()));
        return {
            id: record.id,
            studentId: record.studentId,
            studentNumber: student?.studentNumber ?? '',
            studentName: student?.fullName ?? 'Élève',
            classroomId: record.classroomId,
            classroomName: classroom?.name ?? '',
            date: record.date,
            status: record.status,
            statusLabel: LABELS[record.status],
            arrivalTime: record.arrivalTime,
            minutesLate: record.minutesLate,
            reason: record.reason,
            justified: record.justified,
            justificationDocumentUrl: record.justificationDocumentUrl,
            daysWaiting: waiting,
            needsFollowUp: !record.justified && record.status === 'ABSENT'
                && waiting >= FOLLOW_UP_AFTER_DAYS,
            guardianNotified: record.guardianNotified
        };
    }
    studentsOf(classroomId) {
        return MOCK_STUDENTS.filter((s) => s.classroomId === classroomId);
    }
    recordsOf(classroomId, date) {
        return this.records.filter((r) => r.classroomId === classroomId && r.date === date);
    }
    key(classroomId, date) {
        return `${classroomId}|${date}`;
    }
    /**
     * Twelve school days of history, today excluded.
     *
     * <p>Roughly one pupil in twenty-five is away and one in thirty is late —
     * close enough to a real Ivorian collège that the follow-up list has a
     * handful of names rather than a wall of them or nothing at all.</p>
     */
    seed() {
        const days = schoolDaysBefore(12);
        days.forEach((date) => {
            MOCK_CLASSROOMS.forEach((classroom) => {
                const students = this.studentsOf(classroom.id);
                let absent = 0;
                let late = 0;
                students.forEach((student) => {
                    const draw = hash(`${student.id}|${date}`);
                    if (draw < 0.04) {
                        absent++;
                        // Une absence sur trois arrive avec son justificatif.
                        const justified = hash(`j|${student.id}|${date}`) < 0.34;
                        this.records.push({
                            id: `att-${this.sequence++}`,
                            studentId: student.id,
                            classroomId: classroom.id,
                            date,
                            status: justified ? 'EXCUSED_ABSENCE' : 'ABSENT',
                            reason: justified
                                ? REASONS[Math.floor(hash(`r|${student.id}|${date}`) * REASONS.length)]
                                : undefined,
                            justified,
                            guardianNotified: false
                        });
                    }
                    else if (draw < 0.075) {
                        late++;
                        const minutes = 5 + Math.floor(hash(`m|${student.id}|${date}`) * 25);
                        this.records.push({
                            id: `att-${this.sequence++}`,
                            studentId: student.id,
                            classroomId: classroom.id,
                            date,
                            status: 'LATE',
                            arrivalTime: `07:${String(30 + (minutes % 29)).padStart(2, '0')}`,
                            minutesLate: minutes,
                            justified: false,
                            guardianNotified: false
                        });
                    }
                });
                this.sheets.set(this.key(classroom.id, date), {
                    id: `sheet-${this.sequence++}`,
                    classroomId: classroom.id,
                    date,
                    status: 'SUBMITTED',
                    submittedAt: `${date}T07:45:00.000Z`,
                    expectedCount: students.length,
                    presentCount: students.length - absent - late,
                    absentCount: absent,
                    lateCount: late
                });
            });
        });
    }
}
/** One register for the whole demonstration session. */
export const MOCK_ATTENDANCE = new AttendanceStore();
//# sourceMappingURL=mock-attendance-store.js.map