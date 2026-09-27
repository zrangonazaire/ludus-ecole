import { MOCK_CLASSROOMS, MOCK_STUDENTS } from './mock-data';
const KIND_LABELS = {
    ALLERGY: 'Allergie',
    CHRONIC_ILLNESS: 'Maladie chronique',
    TREATMENT: 'Traitement en cours',
    DISABILITY: 'Situation de handicap',
    DIETARY: 'Régime alimentaire',
    OTHER: 'Autre'
};
const SEVERITY_LABELS = {
    LOW: 'Pour information',
    MODERATE: 'À connaître',
    HIGH: 'Alerte',
    CRITICAL: 'Alerte vitale'
};
const OUTCOME_LABELS = {
    BACK_TO_CLASS: 'Reparti en cours',
    RESTED: 'Gardé en observation',
    SENT_HOME: 'Confié à la famille',
    REFERRED: 'Orienté vers un centre de santé',
    EMERGENCY: 'Évacuation en urgence'
};
const EXAM_LABELS = {
    ENTRY: "Visite d'admission",
    ANNUAL: 'Visite annuelle',
    SPORT: 'Aptitude au sport',
    VISION: 'Dépistage visuel',
    HEARING: 'Dépistage auditif',
    DENTAL: 'Dépistage dentaire'
};
const EXAM_OUTCOME_LABELS = {
    PENDING: 'À passer',
    FIT: 'Apte',
    FIT_WITH_RESERVE: 'Apte avec réserve',
    UNFIT: 'Inapte',
    REFERRED: 'Orienté vers un spécialiste',
    MISSED: 'Non présenté'
};
/** L'ordre de gravité, pour trier les alertes du plus urgent au reste. */
const SEVERITY_RANK = {
    LOW: 0, MODERATE: 1, HIGH: 2, CRITICAL: 3
};
const BLOOD_GROUPS = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-'];
/**
 * Le calendrier de départ, repris du programme élargi de vaccination.
 *
 * <p>C'est ce que l'école demande à l'inscription, pas une prescription : la
 * liste est modifiable comme côté serveur.</p>
 */
const VACCINES = [
    { id: 'vac-bcg', code: 'BCG', label: 'BCG', required: true, dosesExpected: 1 },
    { id: 'vac-polio', code: 'POLIO', label: 'Poliomyélite', required: true, dosesExpected: 4 },
    { id: 'vac-penta', code: 'PENTA', label: 'Pentavalent', required: true, dosesExpected: 3 },
    { id: 'vac-rr', code: 'ROUGEOLE', label: 'Rougeole et rubéole', required: true, dosesExpected: 2 },
    { id: 'vac-fj', code: 'FIEVRE_J', label: 'Fièvre jaune', required: true, dosesExpected: 1 },
    { id: 'vac-dtc', code: 'DTC_RAPPEL', label: 'Rappel diphtérie-tétanos', required: false, dosesExpected: 1 }
];
/**
 * Des conditions plausibles pour une école ivoirienne.
 *
 * <p>Chaque alerte porte sa conduite à tenir — c'est la règle que le serveur
 * fait respecter, et une graine qui la violerait produirait des données que
 * l'écran ne pourrait pas enregistrer à nouveau.</p>
 */
const CONDITION_SEEDS = [
    {
        kind: 'ALLERGY', label: 'Allergie aux arachides', severity: 'CRITICAL',
        description: 'Réaction constatée à deux reprises, dont une à la cantine.',
        actionToTake: "Écarter tout aliment contenant de l'arachide. En cas de gêne "
            + "respiratoire ou de gonflement du visage : utiliser le stylo auto-injecteur "
            + "que l'élève porte sur lui, puis appeler le 185 et prévenir l'infirmerie.",
        medication: 'Stylo auto-injecteur', selfCarried: true
    },
    {
        kind: 'CHRONIC_ILLNESS', label: 'Asthme', severity: 'HIGH',
        description: 'Crises déclenchées par l\'effort et la poussière.',
        actionToTake: "Faire asseoir l'élève, le laisser prendre son inhalateur. Si la "
            + "gêne persiste après dix minutes, conduire à l'infirmerie.",
        medication: 'Inhalateur de secours', selfCarried: true
    },
    {
        kind: 'CHRONIC_ILLNESS', label: 'Drépanocytose', severity: 'HIGH',
        description: 'Forme homozygote, suivie au CHU.',
        actionToTake: "Faire boire régulièrement, éviter l'effort prolongé et le froid. "
            + "Douleur intense ou fièvre : prévenir l'infirmerie sans attendre.",
        selfCarried: false
    },
    {
        kind: 'TREATMENT', label: 'Traitement antipaludique en cours', severity: 'MODERATE',
        description: 'Cure de trois jours, prise du midi à l\'infirmerie.',
        medication: 'Prise du midi conservée à l\'infirmerie', selfCarried: false
    },
    {
        kind: 'DIETARY', label: 'Intolérance au lactose', severity: 'LOW',
        description: 'Signalée par la famille pour la cantine.', selfCarried: false
    },
    {
        kind: 'DISABILITY', label: 'Malvoyance corrigée', severity: 'MODERATE',
        description: 'Port de lunettes permanent.', selfCarried: false
    },
    {
        kind: 'ALLERGY', label: 'Allergie aux piqûres de guêpe', severity: 'HIGH',
        actionToTake: "En cas de piqûre : retirer le dard, appliquer du froid, conduire "
            + "immédiatement à l'infirmerie et surveiller la respiration.",
        selfCarried: false
    }
];
const COMPLAINTS = [
    { complaint: 'Céphalées depuis le matin', care: 'Repos trente minutes, hydratation.',
        outcome: 'BACK_TO_CLASS' },
    { complaint: 'Douleur abdominale', care: 'Repos allongé, surveillance.',
        outcome: 'RESTED', temperature: 37.4 },
    { complaint: 'Fièvre et frissons', care: 'Température prise, famille appelée.',
        outcome: 'SENT_HOME', temperature: 38.9 },
    { complaint: 'Chute dans la cour, plaie au genou', care: 'Nettoyage, antiseptique, pansement.',
        outcome: 'BACK_TO_CLASS' },
    { complaint: 'Crise d\'asthme à l\'effort', care: 'Inhalateur pris, mise au repos assis.',
        outcome: 'RESTED' },
    { complaint: 'Entorse de la cheville en EPS', care: 'Immobilisation, glace.',
        outcome: 'REFERRED', referredTo: 'Centre de santé urbain de Cocody' },
    { complaint: 'Saignement de nez', care: 'Compression dix minutes, tête penchée en avant.',
        outcome: 'BACK_TO_CLASS' },
    { complaint: 'Malaise en classe', care: 'Position allongée jambes surélevées, sucre.',
        outcome: 'SENT_HOME' }
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
function at(iso, hour, minute) {
    const date = new Date(`${iso}T00:00:00`);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
}
class HealthStore {
    records = [];
    conditions = [];
    vaccinations = [];
    visits = [];
    examinations = [];
    sequence = 1;
    constructor() {
        this.seed();
    }
    // --------------------------------------------------------------- lecture
    vaccines() {
        return VACCINES.map((vaccine) => ({ ...vaccine }));
    }
    /**
     * L'écran, dans l'une de ses deux formes.
     *
     * <p>Sans accès complet, on ne construit que les alertes : le détail médical
     * n'est pas assemblé, il ne peut donc pas être affiché par erreur.</p>
     */
    board(fullAccess, search) {
        const needle = (search ?? '').trim().toLowerCase();
        const matches = (studentId) => {
            if (!needle) {
                return true;
            }
            const student = MOCK_STUDENTS.find((row) => row.id === studentId);
            return !!student && (student.fullName.toLowerCase().includes(needle)
                || student.studentNumber.toLowerCase().includes(needle));
        };
        const alerts = this.conditions
            .filter((condition) => condition.active && this.isAlert(condition.severity))
            .map((condition) => this.describeAlert(condition))
            .sort((a, b) => {
            const bySeverity = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
            return bySeverity !== 0 ? bySeverity : a.studentName.localeCompare(b.studentName);
        });
        const board = {
            academicYearId: 'ay-2026-2027',
            academicYearCode: '2026-2027',
            fullAccess,
            alertCount: alerts.length,
            visitCountThisWeek: 0,
            awaitingGuardianCount: 0,
            missingConsentCount: 0,
            missingVaccineCount: 0,
            overdueExaminationCount: 0,
            alerts,
            records: [],
            visits: [],
            examinations: []
        };
        if (!fullAccess) {
            // On s'arrête ici, comme le serveur : le reste n'est pas construit.
            return board;
        }
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const visits = this.visits
            .filter((visit) => matches(visit.studentId))
            .filter((visit) => new Date(visit.occurredAt) >= weekAgo)
            .map((visit) => this.describeVisit(visit))
            .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
        const records = this.records
            .filter((record) => matches(record.studentId))
            .map((record) => this.describeRecord(record))
            .sort((a, b) => {
            const byAlert = b.alertCount - a.alertCount;
            return byAlert !== 0 ? byAlert : a.studentName.localeCompare(b.studentName);
        });
        const nowIso = today();
        const examinations = this.examinations
            .filter((examination) => matches(examination.studentId))
            .map((examination) => this.describeExamination(examination, nowIso))
            .sort((a, b) => a.scheduledOn.localeCompare(b.scheduledOn));
        board.visits = visits;
        board.visitCountThisWeek = visits.length;
        board.awaitingGuardianCount = this.visits
            .filter((visit) => this.requiresGuardian(visit.outcome) && !visit.guardianNotifiedAt)
            .length;
        board.records = records;
        board.missingConsentCount = this.records.filter((record) => !record.careConsent).length;
        board.missingVaccineCount = records
            .reduce((sum, record) => sum + record.missingVaccineCount, 0);
        board.examinations = examinations;
        board.overdueExaminationCount = examinations.filter((row) => row.overdue).length;
        return board;
    }
    record(studentId) {
        const record = this.records.find((row) => row.studentId === studentId);
        if (!record) {
            throw new Error('HEALTH_RECORD_NOT_FOUND');
        }
        return this.describeRecord(record);
    }
    /** Les élèves qui n'ont pas encore de fiche : utile pour en ouvrir une. */
    studentsWithoutRecord() {
        const known = new Set(this.records.map((record) => record.studentId));
        return MOCK_STUDENTS.filter((student) => !known.has(student.id));
    }
    // -------------------------------------------------------------- écriture
    saveRecord(payload) {
        this.requireStudent(payload.studentId);
        const record = this.requireOrCreateRecord(payload.studentId);
        record.bloodGroup = blankToUndefined(payload.bloodGroup);
        record.physicianName = blankToUndefined(payload.physicianName);
        record.physicianPhone = blankToUndefined(payload.physicianPhone);
        record.insuranceName = blankToUndefined(payload.insuranceName);
        record.insuranceNumber = blankToUndefined(payload.insuranceNumber);
        record.notes = blankToUndefined(payload.notes);
        // Le consentement et sa date vont ensemble : une autorisation sans date ne
        // pourrait pas être produite si elle était contestée, et une date laissée
        // après un retrait laisserait croire à une permission qui n'existe plus.
        record.careConsent = payload.careConsent;
        record.consentSignedOn = payload.careConsent
            ? (payload.consentSignedOn ?? today()) : undefined;
        record.reviewedOn = today();
        return this.describeRecord(record);
    }
    addCondition(payload) {
        this.requireStudent(payload.studentId);
        this.requireActionForAlert(payload.severity, payload.actionToTake);
        this.requireOrCreateRecord(payload.studentId);
        const condition = {
            id: `cond-${this.sequence++}`,
            studentId: payload.studentId,
            kind: payload.kind,
            label: payload.label.trim(),
            severity: payload.severity,
            description: blankToUndefined(payload.description),
            actionToTake: blankToUndefined(payload.actionToTake),
            medication: blankToUndefined(payload.medication),
            selfCarried: payload.selfCarried,
            declaredOn: payload.declaredOn ?? today(),
            active: true
        };
        this.conditions.push(condition);
        return this.describeCondition(condition);
    }
    updateCondition(conditionId, payload) {
        this.requireActionForAlert(payload.severity, payload.actionToTake);
        const condition = this.requireCondition(conditionId);
        condition.kind = payload.kind;
        condition.label = payload.label.trim();
        condition.severity = payload.severity;
        condition.description = blankToUndefined(payload.description);
        condition.actionToTake = blankToUndefined(payload.actionToTake);
        condition.medication = blankToUndefined(payload.medication);
        condition.selfCarried = payload.selfCarried;
        return this.describeCondition(condition);
    }
    /** Clôt sans effacer : une guérison prononcée trop tôt doit rester lisible. */
    resolveCondition(conditionId) {
        const condition = this.requireCondition(conditionId);
        condition.active = false;
        condition.resolvedOn = today();
        return this.describeCondition(condition);
    }
    recordVisit(payload) {
        this.requireStudent(payload.studentId);
        const occurredAt = payload.occurredAt ?? new Date().toISOString();
        if (new Date(occurredAt) > new Date()) {
            throw new Error('HEALTH_VISIT_IN_FUTURE');
        }
        if (this.requiresGuardian(payload.outcome) && !payload.guardianNotified) {
            throw new Error('HEALTH_GUARDIAN_NOT_NOTIFIED');
        }
        if (this.requiresReferral(payload.outcome) && !payload.referredTo?.trim()) {
            throw new Error('HEALTH_REFERRAL_REQUIRED');
        }
        const visit = {
            id: `visit-${this.sequence++}`,
            studentId: payload.studentId,
            occurredAt,
            complaint: payload.complaint.trim(),
            careGiven: payload.careGiven.trim(),
            temperatureCelsius: payload.temperatureCelsius,
            outcome: payload.outcome,
            notes: blankToUndefined(payload.notes),
            guardianNotifiedAt: payload.guardianNotified ? new Date().toISOString() : undefined,
            referredTo: blankToUndefined(payload.referredTo)
        };
        this.visits.push(visit);
        return this.describeVisit(visit);
    }
    notifyGuardian(visitId) {
        const visit = this.visits.find((row) => row.id === visitId);
        if (!visit) {
            throw new Error('HEALTH_VISIT_NOT_FOUND');
        }
        visit.guardianNotifiedAt = new Date().toISOString();
        return this.describeVisit(visit);
    }
    saveVaccination(payload) {
        this.requireStudent(payload.studentId);
        const vaccine = VACCINES.find((row) => row.id === payload.vaccineId);
        if (!vaccine) {
            throw new Error('VACCINE_NOT_FOUND');
        }
        if (payload.dosesReceived > vaccine.dosesExpected) {
            throw new Error('VACCINATION_DOSES_EXCEEDED');
        }
        this.requireOrCreateRecord(payload.studentId);
        let vaccination = this.vaccinations.find((row) => row.studentId === payload.studentId
            && row.vaccineId === payload.vaccineId);
        if (!vaccination) {
            vaccination = {
                id: `vacc-${this.sequence++}`,
                studentId: payload.studentId,
                vaccineId: payload.vaccineId,
                dosesReceived: 0,
                certificateSeen: false
            };
            this.vaccinations.push(vaccination);
        }
        vaccination.dosesReceived = payload.dosesReceived;
        vaccination.lastDoseOn = payload.lastDoseOn;
        vaccination.nextDoseDueOn = payload.nextDoseDueOn;
        vaccination.certificateSeen = payload.certificateSeen;
        vaccination.notes = blankToUndefined(payload.notes);
        return this.describeVaccination(vaccination);
    }
    planExamination(payload) {
        this.requireStudent(payload.studentId);
        const duplicate = this.examinations.find((row) => row.studentId === payload.studentId
            && row.kind === payload.kind);
        if (duplicate) {
            throw new Error('EXAMINATION_ALREADY_PLANNED');
        }
        const examination = {
            id: `exam-${this.sequence++}`,
            studentId: payload.studentId,
            kind: payload.kind,
            scheduledOn: payload.scheduledOn,
            outcome: 'PENDING',
            practitioner: blankToUndefined(payload.practitioner),
            notes: blankToUndefined(payload.notes)
        };
        this.examinations.push(examination);
        return this.describeExamination(examination, today());
    }
    recordExamination(examinationId, payload) {
        const examination = this.examinations.find((row) => row.id === examinationId);
        if (!examination) {
            throw new Error('EXAMINATION_NOT_FOUND');
        }
        if (payload.outcome === 'FIT_WITH_RESERVE' && !payload.restriction?.trim()) {
            throw new Error('EXAMINATION_RESTRICTION_REQUIRED');
        }
        examination.outcome = payload.outcome;
        // Une visite non passée ne garde pas de date de passage : en écrire une
        // affirmerait une consultation qui n'a pas eu lieu.
        examination.performedOn = this.isSettled(payload.outcome)
            ? (payload.performedOn ?? today()) : undefined;
        examination.restriction = blankToUndefined(payload.restriction);
        if (payload.practitioner?.trim()) {
            examination.practitioner = payload.practitioner.trim();
        }
        examination.notes = blankToUndefined(payload.notes);
        return this.describeExamination(examination, today());
    }
    // ---------------------------------------------------------------- règles
    isAlert(severity) {
        return severity === 'HIGH' || severity === 'CRITICAL';
    }
    requiresGuardian(outcome) {
        return outcome === 'SENT_HOME' || outcome === 'EMERGENCY';
    }
    requiresReferral(outcome) {
        return outcome === 'REFERRED' || outcome === 'EMERGENCY';
    }
    isSettled(outcome) {
        return outcome !== 'PENDING' && outcome !== 'MISSED';
    }
    isOutstandingExam(outcome) {
        return outcome === 'PENDING' || outcome === 'MISSED';
    }
    /**
     * Une alerte sans conduite à tenir prévient d'un danger sans dire quoi
     * faire : c'est le pire des deux mondes pour le professeur qui la lit.
     */
    requireActionForAlert(severity, actionToTake) {
        if (this.isAlert(severity) && !actionToTake?.trim()) {
            throw new Error('HEALTH_ACTION_REQUIRED');
        }
    }
    // -------------------------------------------------------------- rendus
    describeAlert(condition) {
        const student = MOCK_STUDENTS.find((row) => row.id === condition.studentId);
        return {
            studentId: condition.studentId,
            studentNumber: student?.studentNumber ?? '',
            studentName: student?.fullName ?? 'Élève',
            classroomName: this.classroomNameOf(condition.studentId),
            label: condition.label,
            severity: condition.severity,
            severityLabel: SEVERITY_LABELS[condition.severity],
            actionToTake: condition.actionToTake,
            selfCarried: condition.selfCarried
        };
    }
    describeCondition(condition) {
        return {
            id: condition.id,
            kind: condition.kind,
            kindLabel: KIND_LABELS[condition.kind],
            label: condition.label,
            severity: condition.severity,
            severityLabel: SEVERITY_LABELS[condition.severity],
            description: condition.description,
            actionToTake: condition.actionToTake,
            medication: condition.medication,
            selfCarried: condition.selfCarried,
            declaredOn: condition.declaredOn,
            resolvedOn: condition.resolvedOn,
            active: condition.active,
            alert: condition.active && this.isAlert(condition.severity)
        };
    }
    describeRecord(record) {
        const student = MOCK_STUDENTS.find((row) => row.id === record.studentId);
        const conditions = this.conditions
            .filter((condition) => condition.studentId === record.studentId)
            .map((condition) => this.describeCondition(condition))
            .sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity]);
        const vaccinations = this.vaccinations
            .filter((row) => row.studentId === record.studentId)
            .map((row) => this.describeVaccination(row));
        return {
            id: record.id,
            studentId: record.studentId,
            studentNumber: student?.studentNumber ?? '',
            studentName: student?.fullName ?? 'Élève',
            classroomName: this.classroomNameOf(record.studentId),
            bloodGroup: record.bloodGroup,
            physicianName: record.physicianName,
            physicianPhone: record.physicianPhone,
            insuranceName: record.insuranceName,
            insuranceNumber: record.insuranceNumber,
            notes: record.notes,
            careConsent: record.careConsent,
            consentSignedOn: record.consentSignedOn,
            reviewedOn: record.reviewedOn,
            conditions,
            vaccinations,
            alertCount: conditions.filter((condition) => condition.alert).length,
            missingVaccineCount: vaccinations.filter((row) => row.outstanding).length
        };
    }
    describeVaccination(vaccination) {
        const vaccine = VACCINES.find((row) => row.id === vaccination.vaccineId);
        const dosesExpected = vaccine?.dosesExpected ?? 1;
        const required = vaccine?.required ?? false;
        const complete = vaccination.certificateSeen
            && vaccination.dosesReceived >= dosesExpected;
        return {
            id: vaccination.id,
            vaccineId: vaccination.vaccineId,
            vaccineCode: vaccine?.code ?? '',
            vaccineLabel: vaccine?.label ?? '',
            required,
            dosesExpected,
            dosesReceived: vaccination.dosesReceived,
            lastDoseOn: vaccination.lastDoseOn,
            nextDoseDueOn: vaccination.nextDoseDueOn,
            certificateSeen: vaccination.certificateSeen,
            notes: vaccination.notes,
            complete,
            outstanding: required && !complete
        };
    }
    describeVisit(visit) {
        const student = MOCK_STUDENTS.find((row) => row.id === visit.studentId);
        return {
            id: visit.id,
            studentId: visit.studentId,
            studentNumber: student?.studentNumber ?? '',
            studentName: student?.fullName ?? 'Élève',
            classroomName: this.classroomNameOf(visit.studentId),
            occurredAt: visit.occurredAt,
            complaint: visit.complaint,
            careGiven: visit.careGiven,
            temperatureCelsius: visit.temperatureCelsius,
            outcome: visit.outcome,
            outcomeLabel: OUTCOME_LABELS[visit.outcome],
            notes: visit.notes,
            guardianNotifiedAt: visit.guardianNotifiedAt,
            referredTo: visit.referredTo,
            awaitingGuardian: this.requiresGuardian(visit.outcome) && !visit.guardianNotifiedAt
        };
    }
    describeExamination(examination, nowIso) {
        const student = MOCK_STUDENTS.find((row) => row.id === examination.studentId);
        return {
            id: examination.id,
            studentId: examination.studentId,
            studentNumber: student?.studentNumber ?? '',
            studentName: student?.fullName ?? 'Élève',
            classroomName: this.classroomNameOf(examination.studentId),
            kind: examination.kind,
            kindLabel: EXAM_LABELS[examination.kind],
            scheduledOn: examination.scheduledOn,
            performedOn: examination.performedOn,
            outcome: examination.outcome,
            outcomeLabel: EXAM_OUTCOME_LABELS[examination.outcome],
            restriction: examination.restriction,
            practitioner: examination.practitioner,
            notes: examination.notes,
            overdue: this.isOutstandingExam(examination.outcome)
                && examination.scheduledOn < nowIso
        };
    }
    // ------------------------------------------------------------ plomberie
    classroomNameOf(studentId) {
        // Répartition stable, la même à chaque appel.
        const index = Math.floor(hash(`class|${studentId}`) * MOCK_CLASSROOMS.length);
        return MOCK_CLASSROOMS[Math.min(index, MOCK_CLASSROOMS.length - 1)]?.name ?? '';
    }
    requireStudent(studentId) {
        if (!MOCK_STUDENTS.some((student) => student.id === studentId)) {
            throw new Error('STUDENT_NOT_FOUND');
        }
    }
    requireCondition(conditionId) {
        const condition = this.conditions.find((row) => row.id === conditionId);
        if (!condition) {
            throw new Error('HEALTH_CONDITION_NOT_FOUND');
        }
        return condition;
    }
    requireOrCreateRecord(studentId) {
        let record = this.records.find((row) => row.studentId === studentId);
        if (!record) {
            record = {
                id: `hr-${this.sequence++}`,
                studentId,
                careConsent: false
            };
            this.records.push(record);
        }
        return record;
    }
    // ------------------------------------------------------------- amorçage
    seed() {
        const now = today();
        // Une fiche pour un élève sur trois : dans une vraie école, toutes les
        // fiches ne sont pas remplies dès la rentrée, et l'écran doit le montrer.
        const enrolled = MOCK_STUDENTS.filter((_, index) => index % 3 === 0);
        enrolled.forEach((student, index) => {
            const draw = hash(`health|${student.id}`);
            const record = {
                id: `hr-${this.sequence++}`,
                studentId: student.id,
                bloodGroup: BLOOD_GROUPS[index % BLOOD_GROUPS.length],
                physicianName: draw > 0.4 ? 'Dr Kouassi Adou' : undefined,
                physicianPhone: draw > 0.4 ? '+225 27 22 44 55 66' : undefined,
                insuranceName: draw > 0.7 ? 'MUGEFCI' : undefined,
                // Une fiche sur cinq attend encore l'autorisation écrite des parents :
                // c'est exactement ce que le compteur doit faire remonter.
                careConsent: draw > 0.2,
                consentSignedOn: draw > 0.2 ? shift(now, -60 - index) : undefined,
                reviewedOn: shift(now, -30 - (index % 20))
            };
            this.records.push(record);
        });
        // Les conditions, réparties sur les fiches existantes.
        CONDITION_SEEDS.forEach((seed, index) => {
            const record = this.records[(index * 5 + 2) % this.records.length];
            if (!record) {
                return;
            }
            this.conditions.push({
                id: `cond-${this.sequence++}`,
                studentId: record.studentId,
                kind: seed.kind,
                label: seed.label,
                severity: seed.severity,
                description: seed.description,
                actionToTake: seed.actionToTake,
                medication: seed.medication,
                selfCarried: seed.selfCarried,
                declaredOn: shift(now, -120 + index * 7),
                active: true
            });
        });
        // Une condition close, pour que l'écran montre aussi ce cas.
        const closed = this.records[1];
        if (closed) {
            this.conditions.push({
                id: `cond-${this.sequence++}`,
                studentId: closed.studentId,
                kind: 'TREATMENT',
                label: 'Traitement antibiotique',
                severity: 'LOW',
                description: 'Cure de sept jours, terminée.',
                selfCarried: false,
                declaredOn: shift(now, -40),
                resolvedOn: shift(now, -33),
                active: false
            });
        }
        // Les carnets : complets pour la plupart, incomplets pour quelques-uns.
        this.records.forEach((record, index) => {
            VACCINES.forEach((vaccine, position) => {
                const draw = hash(`vac|${record.studentId}|${vaccine.code}`);
                // Deux fiches sur neuf gardent un vaccin exigé sans preuve : sans cela
                // la liste de relance serait vide et l'onglet ne montrerait rien.
                const seen = draw > (index % 9 === 4 ? 0.55 : 0.12);
                const doses = seen ? vaccine.dosesExpected
                    : Math.max(0, vaccine.dosesExpected - 1);
                this.vaccinations.push({
                    id: `vacc-${this.sequence++}`,
                    studentId: record.studentId,
                    vaccineId: vaccine.id,
                    dosesReceived: doses,
                    lastDoseOn: doses > 0 ? shift(now, -400 - position * 30) : undefined,
                    certificateSeen: seen
                });
            });
        });
        // Le registre des dix derniers jours ouvrés.
        let stamp = 0;
        for (let day = 9; day >= 0; day--) {
            const date = shift(now, -day);
            const weekday = new Date(`${date}T00:00:00`).getDay();
            if (weekday === 0 || weekday === 6) {
                continue;
            }
            const count = 1 + Math.floor(hash(`visits|${date}`) * 3);
            for (let n = 0; n < count; n++) {
                const seed = COMPLAINTS[(stamp + n) % COMPLAINTS.length];
                const student = MOCK_STUDENTS[(stamp * 7 + n * 13) % MOCK_STUDENTS.length];
                this.visits.push({
                    id: `visit-${this.sequence++}`,
                    studentId: student.id,
                    occurredAt: at(date, 9 + n * 2, 15 + n * 10),
                    complaint: seed.complaint,
                    careGiven: seed.care,
                    temperatureCelsius: seed.temperature,
                    outcome: seed.outcome,
                    // La règle du serveur : parti sans famille jointe est impossible à
                    // saisir. La graine la respecte, sinon elle produirait des lignes que
                    // l'écran ne pourrait pas ressaisir.
                    guardianNotifiedAt: this.requiresGuardian(seed.outcome)
                        ? at(date, 9 + n * 2, 40 + n * 10) : undefined,
                    referredTo: seed.referredTo
                });
            }
            stamp += count;
        }
        // Un passage du jour laissé en attente d'appel : c'est le compteur qui doit
        // faire réagir l'infirmerie avant la fin de la journée.
        const waiting = MOCK_STUDENTS[41];
        if (waiting) {
            this.visits.push({
                id: `visit-${this.sequence++}`,
                studentId: waiting.id,
                occurredAt: at(now, 11, 5),
                complaint: 'Vomissements répétés',
                careGiven: 'Mise au repos, hydratation par petites gorgées.',
                temperatureCelsius: 38.1,
                outcome: 'RESTED'
            });
        }
        // Les visites médicales : passées, à venir, et une en retard.
        const kinds = ['ENTRY', 'ANNUAL', 'SPORT', 'VISION', 'DENTAL'];
        this.records.slice(0, 24).forEach((record, index) => {
            const kind = kinds[index % kinds.length];
            const offset = -40 + index * 6;
            const draw = hash(`exam|${record.studentId}|${kind}`);
            let outcome = 'PENDING';
            if (offset < 0) {
                // Une visite déjà passée a un résultat, sauf quelques absents.
                outcome = draw > 0.85 ? 'MISSED'
                    : draw > 0.72 ? 'FIT_WITH_RESERVE'
                        : draw > 0.66 ? 'REFERRED' : 'FIT';
            }
            this.examinations.push({
                id: `exam-${this.sequence++}`,
                studentId: record.studentId,
                kind,
                scheduledOn: shift(now, offset),
                performedOn: this.isSettled(outcome) ? shift(now, offset) : undefined,
                outcome,
                restriction: outcome === 'FIT_WITH_RESERVE'
                    ? 'Dispense de course de fond, autres activités autorisées.' : undefined,
                practitioner: 'Dr Aya N’Dri, médecine scolaire'
            });
        });
    }
}
function blankToUndefined(value) {
    return value && value.trim() ? value.trim() : undefined;
}
export const MOCK_HEALTH = new HealthStore();
//# sourceMappingURL=mock-health-store.js.map