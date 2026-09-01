import {
  FAMILY_REQUEST_STATUSES, FAMILY_REQUEST_TYPES, FamilyRequest, FamilyRequestBoard,
  FamilyRequestChannel, FamilyRequestCreatePayload, FamilyRequestPriority,
  FamilyRequestQuery, FamilyRequestStatus, FamilyRequestUpdatePayload
} from '@core/models/family-request.models';
import { MOCK_STUDENTS } from './mock-data';

const CHANNEL_LABELS: Record<FamilyRequestChannel, string> = {
  PORTAL: 'Portail parent', EMAIL: 'E-mail', PHONE: 'Téléphone', IN_PERSON: 'Accueil'
};

const PRIORITY_LABELS: Record<FamilyRequestPriority, string> = {
  NORMAL: 'Normale', HIGH: 'Haute', URGENT: 'Urgente'
};

class FamilyRequestStore {
  private sequence = 19;
  private readonly requests: FamilyRequest[] = [];

  constructor() {
    this.seed();
  }

  board(query: FamilyRequestQuery): FamilyRequestBoard {
    const now = Date.now();
    this.requests.forEach((request) => {
      request.overdue = !this.closed(request.status) && Date.parse(request.dueAt) < now;
    });

    const search = query.search?.trim().toLocaleLowerCase('fr') ?? '';
    const visible = this.requests
      .filter((request) => !query.status
        || (query.status === 'OPEN' ? !this.closed(request.status) : request.status === query.status))
      .filter((request) => !query.type || request.type === query.type)
      .filter((request) => !search || [
        request.reference, request.subject, request.studentName, request.studentNumber,
        request.classroomName, request.guardianName, request.typeLabel
      ].some((value) => value?.toLocaleLowerCase('fr').includes(search)))
      .sort((left, right) => Number(right.overdue) - Number(left.overdue)
        || this.priorityRank(left.priority) - this.priorityRank(right.priority)
        || right.submittedAt.localeCompare(left.submittedAt));

    return {
      total: this.requests.length,
      newCount: this.count('NEW'),
      inProgressCount: this.count('IN_PROGRESS'),
      waitingFamilyCount: this.count('WAITING_FAMILY'),
      readyCount: this.count('READY'),
      completedCount: this.count('COMPLETED'),
      overdueCount: this.requests.filter((request) => request.overdue).length,
      requests: visible.map((request) => ({ ...request }))
    };
  }

  create(payload: FamilyRequestCreatePayload): FamilyRequest {
    const student = MOCK_STUDENTS.find((item) => item.id === payload.studentId);
    if (!student) {
      throw new Error('STUDENT_NOT_FOUND');
    }
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + (payload.priority === 'URGENT' ? 1 : payload.priority === 'HIGH' ? 2 : 4));
    const request = this.make({
      id: `family-request-${this.sequence}`,
      sequence: this.sequence++,
      studentId: student.id,
      studentNumber: student.studentNumber,
      studentName: student.fullName,
      classroomName: student.classroomName,
      guardianName: payload.guardianName.trim(),
      guardianPhone: payload.guardianPhone?.trim() || undefined,
      type: payload.type,
      subject: payload.subject.trim(),
      description: payload.description?.trim() || undefined,
      priority: payload.priority,
      channel: payload.channel,
      status: 'NEW',
      submittedAt: now.toISOString(),
      dueAt: due.toISOString()
    });
    this.requests.push(request);
    return { ...request };
  }

  update(id: string, payload: FamilyRequestUpdatePayload): FamilyRequest {
    const request = this.requests.find((item) => item.id === id);
    if (!request) {
      throw new Error('FAMILY_REQUEST_NOT_FOUND');
    }
    request.status = payload.status;
    request.statusLabel = this.statusLabel(payload.status);
    request.assignedTo = payload.assignedTo?.trim() || undefined;
    request.internalNote = payload.internalNote?.trim() || undefined;
    request.completedAt = payload.status === 'COMPLETED' ? new Date().toISOString() : undefined;
    request.overdue = !this.closed(request.status) && Date.parse(request.dueAt) < Date.now();
    return { ...request };
  }

  private seed(): void {
    const plans: Array<{
      student: number; guardian: string; type: FamilyRequest['type']; subject: string;
      description?: string; status: FamilyRequestStatus; priority: FamilyRequestPriority;
      channel: FamilyRequestChannel; ageHours: number; dueHours: number; assigned?: string;
      note?: string;
    }> = [
      { student: 2, guardian: 'Mme Koné', type: 'SCHOOL_CERTIFICATE',
        subject: 'Certificat pour allocation familiale', status: 'NEW', priority: 'HIGH',
        channel: 'PORTAL', ageHours: 3, dueHours: 21 },
      { student: 11, guardian: 'M. Yao', type: 'REPORT_CARD_COPY',
        subject: 'Duplicata du bulletin du 1er trimestre', status: 'IN_PROGRESS',
        priority: 'NORMAL', channel: 'EMAIL', ageHours: 28, dueHours: 36,
        assigned: 'Awa Traoré' },
      { student: 18, guardian: 'Mme Bamba', type: 'DATA_CORRECTION',
        subject: 'Correction du lieu de naissance',
        description: "Le lieu indiqué sur le dossier ne correspond pas à l'extrait de naissance.",
        status: 'WAITING_FAMILY', priority: 'NORMAL', channel: 'IN_PERSON',
        ageHours: 70, dueHours: -4, assigned: 'Awa Traoré',
        note: "Attente d'une copie lisible de l'extrait de naissance." },
      { student: 25, guardian: 'M. N’Guessan', type: 'PAYMENT_STATEMENT',
        subject: 'Situation des frais de scolarité', status: 'READY', priority: 'HIGH',
        channel: 'PHONE', ageHours: 22, dueHours: 3, assigned: 'Mariam Coulibaly',
        note: "Document vérifié, famille à prévenir." },
      { student: 33, guardian: 'Mme Diallo', type: 'APPOINTMENT',
        subject: 'Rendez-vous avec le professeur principal',
        description: "La famille souhaite faire le point avant le conseil de classe.",
        status: 'NEW', priority: 'NORMAL', channel: 'PORTAL', ageHours: 6, dueHours: 66 },
      { student: 40, guardian: 'M. Kouamé', type: 'TRANSFER_DOCUMENTS',
        subject: 'Dossier demandé par le nouvel établissement', status: 'IN_PROGRESS',
        priority: 'URGENT', channel: 'IN_PERSON', ageHours: 30, dueHours: -6,
        assigned: 'Awa Traoré' },
      { student: 47, guardian: 'Mme Touré', type: 'ENROLLMENT_CERTIFICATE',
        subject: "Attestation d'inscription", status: 'COMPLETED', priority: 'NORMAL',
        channel: 'EMAIL', ageHours: 120, dueHours: -60, assigned: 'Awa Traoré' }
    ];

    plans.forEach((plan, index) => {
      const student = MOCK_STUDENTS[plan.student];
      if (!student) return;
      const submitted = new Date(Date.now() - plan.ageHours * 3600000);
      const due = new Date(Date.now() + plan.dueHours * 3600000);
      this.requests.push(this.make({
        id: `family-request-${index + 1}`,
        sequence: index + 1,
        studentId: student.id,
        studentNumber: student.studentNumber,
        studentName: student.fullName,
        classroomName: student.classroomName,
        guardianName: plan.guardian,
        type: plan.type,
        subject: plan.subject,
        description: plan.description,
        status: plan.status,
        priority: plan.priority,
        channel: plan.channel,
        submittedAt: submitted.toISOString(),
        dueAt: due.toISOString(),
        assignedTo: plan.assigned,
        internalNote: plan.note,
        completedAt: plan.status === 'COMPLETED'
          ? new Date(submitted.getTime() + 48 * 3600000).toISOString() : undefined
      }));
    });
  }

  private make(value: Omit<FamilyRequest, 'reference' | 'typeLabel' | 'statusLabel'
    | 'priorityLabel' | 'channelLabel' | 'overdue'> & { sequence: number }): FamilyRequest {
    const { sequence, ...request } = value;
    return {
      ...request,
      reference: `DEM-${new Date().getFullYear()}-${String(sequence).padStart(5, '0')}`,
      typeLabel: FAMILY_REQUEST_TYPES.find((type) => type.code === value.type)?.label ?? 'Autre',
      statusLabel: this.statusLabel(value.status),
      priorityLabel: PRIORITY_LABELS[value.priority],
      channelLabel: CHANNEL_LABELS[value.channel],
      overdue: !this.closed(value.status) && Date.parse(value.dueAt) < Date.now()
    };
  }

  private statusLabel(status: FamilyRequestStatus): string {
    return FAMILY_REQUEST_STATUSES.find((item) => item.code === status)?.label ?? status;
  }

  private closed(status: FamilyRequestStatus): boolean {
    return status === 'COMPLETED' || status === 'REJECTED';
  }

  private count(status: FamilyRequestStatus): number {
    return this.requests.filter((request) => request.status === status).length;
  }

  private priorityRank(priority: FamilyRequestPriority): number {
    return ({ URGENT: 0, HIGH: 1, NORMAL: 2 })[priority];
  }
}

export const MOCK_FAMILY_REQUESTS = new FamilyRequestStore();
