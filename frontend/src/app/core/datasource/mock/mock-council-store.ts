import {
  Council, CouncilCreatePayload, CouncilDecisionPayload, CouncilParticipant,
  CouncilParticipantPayload, CouncilQuery, CouncilStudentDecision, CouncilSummary,
  CouncilUpdatePayload, PromotionDecision
} from '@core/models/council.models';
import { MOCK_ACADEMIC_YEAR, MOCK_CLASSROOMS, MOCK_STUDENTS, MOCK_TEACHERS, MOCK_TERMS } from './mock-data';

const STATUS_LABELS: Record<Council['status'], string> = {
  PLANNED: 'Prévu',
  IN_PROGRESS: 'En cours',
  CLOSED: 'Clos',
  ARCHIVED: 'Archivé'
};

function decimal(value: number): number {
  return Math.round(value * 100) / 100;
}

/** A small, mutable in-memory counterpart of the council API for demo mode. */
class CouncilStore {
  private readonly councils: Council[] = [];
  private sequence = 10;

  constructor() {
    this.seed();
  }

  list(query: CouncilQuery = {}): CouncilSummary[] {
    return this.councils
      .filter((council) => (!query.academicYearId || council.academicYearId === query.academicYearId)
        && (!query.classroomId || council.classroomId === query.classroomId)
        && (!query.status || council.status === query.status))
      .sort((a, b) => b.meetingDate.localeCompare(a.meetingDate))
      .map((council) => this.summary(council));
  }

  get(councilId: string): Council {
    return this.copy(this.require(councilId));
  }

  create(payload: CouncilCreatePayload): Council {
    const classroom = MOCK_CLASSROOMS.find((item) => item.id === payload.classroomId);
    const term = MOCK_TERMS.find((item) => item.id === payload.termId);
    if (!classroom || !term) {
      throw new Error('CLASS_NOT_FOUND');
    }
    if (this.councils.some((item) => item.classroomId === classroom.id && item.termId === term.id)) {
      throw new Error('COUNCIL_ALREADY_EXISTS');
    }
    const council: Council = {
      id: `council-${this.sequence++}`,
      classroomId: classroom.id,
      classroomName: classroom.name,
      levelId: classroom.levelId,
      levelName: classroom.levelName,
      termId: term.id,
      termName: term.name,
      academicYearId: classroom.academicYearId,
      meetingDate: payload.meetingDate,
      startTime: payload.startTime || undefined,
      endTime: payload.endTime || undefined,
      chairedBy: payload.chairedBy || undefined,
      location: clean(payload.location),
      status: 'PLANNED',
      statusLabel: STATUS_LABELS.PLANNED,
      editable: true,
      participants: [],
      students: this.studentsOf(classroom.id)
    };
    this.councils.unshift(council);
    return this.copy(council);
  }

  update(councilId: string, payload: CouncilUpdatePayload): Council {
    const council = this.editable(councilId);
    Object.assign(council, {
      meetingDate: payload.meetingDate ?? council.meetingDate,
      startTime: payload.startTime || undefined,
      endTime: payload.endTime || undefined,
      chairedBy: payload.chairedBy || undefined,
      location: clean(payload.location),
      remarks: clean(payload.remarks),
      minutesUrl: clean(payload.minutesUrl)
    });
    return this.copy(council);
  }

  start(councilId: string): Council {
    const council = this.require(councilId);
    if (council.status !== 'PLANNED') {
      throw new Error('COUNCIL_INVALID_TRANSITION');
    }
    council.status = 'IN_PROGRESS';
    council.statusLabel = STATUS_LABELS.IN_PROGRESS;
    return this.copy(council);
  }

  close(councilId: string): Council {
    const council = this.editable(councilId);
    council.status = 'CLOSED';
    council.statusLabel = STATUS_LABELS.CLOSED;
    council.editable = false;
    council.closedAt = new Date().toISOString();

    const averages = council.students
      .map((student) => student.annualAverage)
      .filter((value): value is number => value !== undefined);
    council.classAverage = averages.length
      ? decimal(averages.reduce((sum, value) => sum + value, 0) / averages.length)
      : undefined;
    const final = council.students.filter((student) => student.decided);
    if (final.length) {
      const successful = final.filter((student) => student.decision === 'PASS'
        || student.decision === 'PROMOTED' || student.decision === 'GRADUATED');
      council.successRate = decimal((successful.length * 100) / final.length);
    }
    return this.copy(council);
  }

  addParticipant(councilId: string, payload: CouncilParticipantPayload): Council {
    const council = this.editable(councilId);
    const identities = [payload.teacherId, payload.staffId, payload.guardianId]
      .filter((value): value is string => !!value);
    if (identities.length !== 1 || !clean(payload.roleLabel)) {
      throw new Error('VALIDATION_ERROR');
    }
    const personId = identities[0];
    if (council.participants.some((person) => person.personId === personId)) {
      throw new Error('COUNCIL_PARTICIPANT_ALREADY_ADDED');
    }
    const teacher = payload.teacherId
      ? MOCK_TEACHERS.find((item) => item.id === payload.teacherId) : undefined;
    council.participants.push({
      id: `participant-${this.sequence++}`,
      councilId,
      type: payload.teacherId ? 'TEACHER' : payload.staffId ? 'STAFF' : 'GUARDIAN',
      personId,
      name: teacher?.fullName ?? 'Participant externe',
      roleLabel: clean(payload.roleLabel)!,
      present: payload.present
    });
    return this.copy(council);
  }

  removeParticipant(councilId: string, participantId: string): Council {
    const council = this.editable(councilId);
    const next = council.participants.filter((person) => person.id !== participantId);
    if (next.length === council.participants.length) {
      throw new Error('COUNCIL_PARTICIPANT_NOT_FOUND');
    }
    council.participants = next;
    return this.copy(council);
  }

  setPresence(councilId: string, participantId: string, present: boolean): Council {
    const council = this.editable(councilId);
    const participant = council.participants.find((person) => person.id === participantId);
    if (!participant) {
      throw new Error('COUNCIL_PARTICIPANT_NOT_FOUND');
    }
    participant.present = present;
    return this.copy(council);
  }

  recordDecision(councilId: string, payload: CouncilDecisionPayload): CouncilStudentDecision {
    const council = this.editable(councilId);
    const student = council.students.find((item) => item.enrollmentId === payload.enrollmentId);
    if (!student) {
      throw new Error('STUDENT_NOT_FOUND');
    }
    student.decisionId ??= `decision-${this.sequence++}`;
    student.decision = payload.decision;
    student.annualAverage = payload.annualAverage;
    student.justification = clean(payload.justification);
    student.orientationAdvice = clean(payload.orientationAdvice);
    student.toLevelId = payload.toLevelId ?? student.toLevelId;
    student.toLevelName = student.toLevelId ? 'Niveau retenu' : undefined;
    student.decided = payload.decision !== 'PENDING_DECISION';
    student.decidedAt = student.decided ? new Date().toISOString() : undefined;
    return { ...student };
  }

  private seed(): void {
    const closed = this.newCouncil('c-6a', 't1', '2026-12-18', 'CLOSED');
    closed.location = 'Salle des professeurs';
    closed.startTime = '14:30';
    closed.endTime = '16:00';
    closed.remarks = 'Bilan du premier trimestre consigné et transmis à la direction.';
    closed.participants = this.teacherParticipants(closed.id, 3);
    closed.students.forEach((student) => this.seedDecision(student, true));
    this.computeCloseFigures(closed);

    const current = this.newCouncil('c-3a', 't2', '2027-03-29', 'IN_PROGRESS');
    current.location = 'Salle polyvalente';
    current.startTime = '15:00';
    current.endTime = '17:30';
    current.participants = this.teacherParticipants(current.id, 4);
    current.students.slice(0, 8).forEach((student) => this.seedDecision(student, true));

    const planned = this.newCouncil('c-4a', 't2', '2027-03-30', 'PLANNED');
    planned.location = 'Bâtiment B · salle 4';
    planned.startTime = '14:00';
    planned.participants = this.teacherParticipants(planned.id, 2);

    this.councils.push(closed, current, planned);
  }

  private newCouncil(classroomId: string, termId: string, meetingDate: string,
                     status: Council['status']): Council {
    const classroom = MOCK_CLASSROOMS.find((item) => item.id === classroomId)!;
    const term = MOCK_TERMS.find((item) => item.id === termId)!;
    return {
      id: `council-${this.sequence++}`,
      classroomId: classroom.id,
      classroomName: classroom.name,
      levelId: classroom.levelId,
      levelName: classroom.levelName,
      termId: term.id,
      termName: term.name,
      academicYearId: MOCK_ACADEMIC_YEAR.id,
      meetingDate,
      status,
      statusLabel: STATUS_LABELS[status],
      editable: status === 'PLANNED' || status === 'IN_PROGRESS',
      closedAt: status === 'CLOSED' ? `${meetingDate}T16:18:00.000Z` : undefined,
      participants: [],
      students: this.studentsOf(classroom.id)
    };
  }

  private studentsOf(classroomId: string): CouncilStudentDecision[] {
    const classroom = MOCK_CLASSROOMS.find((item) => item.id === classroomId)!;
    return MOCK_STUDENTS.filter((student) => student.classroomId === classroomId
      && student.status === 'ACTIVE')
      .map((student) => ({
        studentId: student.id,
        studentNumber: student.studentNumber,
        studentName: student.fullName,
        enrollmentId: `enr-${student.id}`,
        fromLevelId: classroom.levelId,
        fromLevelName: classroom.levelName,
        decision: 'PENDING_DECISION' as PromotionDecision,
        decided: false
      }))
      .sort((a, b) => a.studentName.localeCompare(b.studentName));
  }

  private teacherParticipants(councilId: string, count: number): CouncilParticipant[] {
    return MOCK_TEACHERS.slice(0, count).map((teacher, index) => ({
      id: `participant-${this.sequence++}`,
      councilId,
      type: 'TEACHER',
      personId: teacher.id,
      name: teacher.fullName,
      roleLabel: index === 0 ? 'Président' : index === 1 ? 'Secrétaire' : 'Enseignant',
      present: index !== count - 1
    }));
  }

  private seedDecision(student: CouncilStudentDecision, final: boolean): void {
    const average = decimal(7.5 + hash(student.studentId) * 9);
    const decision: PromotionDecision = average >= 10 ? 'PASS'
      : average >= 8.5 ? 'ORIENTATION_REQUIRED' : 'REPEAT';
    student.decisionId = `decision-${this.sequence++}`;
    student.annualAverage = average;
    student.decision = decision;
    student.decided = final;
    student.decidedAt = final ? '2027-03-29T15:45:00.000Z' : undefined;
    if (decision === 'ORIENTATION_REQUIRED') {
      student.orientationAdvice = 'Entretien avec la famille avant la réinscription.';
    }
  }

  private computeCloseFigures(council: Council): void {
    const values = council.students
      .map((student) => student.annualAverage)
      .filter((value): value is number => value !== undefined);
    council.classAverage = decimal(values.reduce((sum, value) => sum + value, 0) / values.length);
    const successful = council.students.filter((student) => student.decision === 'PASS').length;
    council.successRate = decimal((successful * 100) / council.students.length);
  }

  private require(councilId: string): Council {
    const council = this.councils.find((item) => item.id === councilId);
    if (!council) {
      throw new Error('COUNCIL_NOT_FOUND');
    }
    return council;
  }

  private editable(councilId: string): Council {
    const council = this.require(councilId);
    if (!council.editable) {
      throw new Error('COUNCIL_CLOSED');
    }
    return council;
  }

  private summary(council: Council): CouncilSummary {
    const { levelId, levelName, startTime, endTime, chairedBy, location, statusLabel,
      remarks, minutesUrl, closedAt, editable, participants, students, ...summary } = council;
    return { ...summary };
  }

  private copy(council: Council): Council {
    return {
      ...council,
      participants: council.participants.map((participant) => ({ ...participant })),
      students: council.students.map((student) => ({ ...student }))
    };
  }
}

function clean(value?: string): string | undefined {
  return value?.trim() || undefined;
}

function hash(value: string): number {
  let result = 0;
  for (let index = 0; index < value.length; index++) {
    result = ((result << 5) - result) + value.charCodeAt(index);
    result |= 0;
  }
  return Math.abs(result % 100) / 100;
}

export const MOCK_COUNCILS = new CouncilStore();
