import { PageResponse } from '@core/models/common.models';
import {
  AcademicOption, OptionCategory, OptionChoice, OptionChoiceAssignPayload,
  OptionChoiceQuery, OptionChoiceStatus, OptionLevel, OptionOffering,
  OptionOfferingsSavePayload, OptionOverview, OptionUpsertPayload
} from '@core/models/option.models';
import { MOCK_CLASSROOMS, MOCK_STUDENTS } from './mock-data';

/**
 * Options and languages, in memory, for the demonstration.
 *
 * <p>The capacity rules are the ones the server enforces, not a simplified
 * echo of them. A wish beyond capacity is waitlisted rather than refused, and
 * cancelling a confirmed place frees a seat — that last part is what makes a
 * waiting list worth having, and it is exactly what a demo usually forgets.</p>
 */

interface StoredOption {
  id: string;
  code: string;
  name: string;
  category: OptionCategory;
  languageCode?: string;
  description?: string;
  colorHex?: string;
  archived: boolean;
}

interface StoredOffering {
  id: string;
  optionId: string;
  levelId: string;
  capacity: number;
  weeklyHours: number;
  choiceStartDate?: string;
  choiceEndDate?: string;
}

interface StoredChoice {
  id: string;
  offeringId: string;
  studentId: string;
  enrollmentId: string;
  priority: number;
  status: OptionChoiceStatus;
  notes?: string;
  chosenAt: string;
  confirmedAt?: string;
}

const CATEGORY_LABELS: Record<OptionCategory, string> = {
  LANGUAGE: 'Langue vivante',
  ACADEMIC: 'Enseignement optionnel',
  ARTS: 'Arts',
  SPORT: 'Sport',
  TECHNICAL: 'Technique',
  OTHER: 'Autre'
};

const STATUS_LABELS: Record<OptionChoiceStatus, string> = {
  REQUESTED: 'Demandé',
  CONFIRMED: 'Confirmé',
  WAITLISTED: "Sur liste d'attente",
  CANCELLED: 'Annulé'
};

/** Les niveaux de la démonstration, déduits des classes existantes. */
function levelsOf(): OptionLevel[] {
  const seen = new Map<string, OptionLevel>();
  MOCK_CLASSROOMS.forEach((classroom, index) => {
    if (!seen.has(classroom.levelId)) {
      seen.set(classroom.levelId, {
        id: classroom.levelId,
        code: classroom.levelName.toUpperCase().replace(/\s+/g, '-'),
        name: classroom.levelName,
        cycleName: 'Collège',
        sequence: index + 1
      });
    }
  });
  return [...seen.values()].sort((a, b) => a.sequence - b.sequence);
}

function hash(seed: string): number {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return ((value >>> 0) % 10000) / 10000;
}

function isoToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    + `-${String(now.getDate()).padStart(2, '0')}`;
}

function shift(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    + `-${String(date.getDate()).padStart(2, '0')}`;
}

class OptionStore {
  private readonly options: StoredOption[] = [];
  private readonly offerings: StoredOffering[] = [];
  private readonly choices: StoredChoice[] = [];
  private readonly levels = levelsOf();
  private sequence = 1;

  constructor() {
    this.seed();
  }

  // ---------------------------------------------------------------- lecture

  overview(): OptionOverview {
    const options = this.options
      .filter((option) => !option.archived)
      .map((option) => this.describeOption(option))
      .sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel)
        || a.name.localeCompare(b.name));

    return {
      academicYearId: 'ay-2026-2027',
      academicYearCode: '2026-2027',
      levels: this.levels,
      options,
      activeOptionCount: options.length,
      offeringCount: options.reduce((sum, option) => sum + option.offerings.length, 0),
      totalCapacity: options.reduce((sum, option) => sum + option.totalCapacity, 0),
      confirmedCount: options.reduce((sum, option) => sum + option.confirmedCount, 0),
      waitlistedCount: options.reduce((sum, option) => sum + option.waitlistedCount, 0)
    };
  }

  choicesPage(query: OptionChoiceQuery): PageResponse<OptionChoice> {
    const term = (query.search ?? '').trim().toLowerCase();
    const matching = this.choices
      .map((choice) => this.describeChoice(choice))
      .filter((choice) =>
        (!query.offeringId || choice.offeringId === query.offeringId)
        && (!query.levelId || choice.levelId === query.levelId)
        && (!query.status || choice.status === query.status)
        && (!term || choice.studentName.toLowerCase().includes(term)
          || choice.studentNumber.toLowerCase().includes(term)))
      // Les vœux à traiter d'abord : demandés, puis liste d'attente, puis le reste.
      .sort((a, b) => weight(a.status) - weight(b.status)
        || a.priority - b.priority
        || a.studentName.localeCompare(b.studentName));

    const page = query.page ?? 0;
    const size = query.size ?? 20;
    const content = matching.slice(page * size, page * size + size);
    const totalPages = Math.max(1, Math.ceil(matching.length / size));
    return {
      content,
      page,
      size,
      totalElements: matching.length,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1
    };
  }

  // --------------------------------------------------------------- écriture

  create(payload: OptionUpsertPayload): OptionOverview {
    if (this.options.some((option) => !option.archived
      && option.code.toLowerCase() === payload.code.trim().toLowerCase())) {
      throw new Error('OPTION_CODE_ALREADY_USED');
    }
    this.options.push({
      id: `opt-${this.sequence++}`,
      code: payload.code.trim(),
      name: payload.name.trim(),
      category: payload.category,
      languageCode: payload.languageCode,
      description: payload.description,
      colorHex: payload.colorHex,
      archived: false
    });
    return this.overview();
  }

  update(optionId: string, payload: OptionUpsertPayload): OptionOverview {
    const option = this.requireOption(optionId);
    if (this.options.some((other) => other.id !== optionId && !other.archived
      && other.code.toLowerCase() === payload.code.trim().toLowerCase())) {
      throw new Error('OPTION_CODE_ALREADY_USED');
    }
    Object.assign(option, {
      code: payload.code.trim(),
      name: payload.name.trim(),
      category: payload.category,
      languageCode: payload.languageCode,
      description: payload.description,
      colorHex: payload.colorHex
    });
    return this.overview();
  }

  archive(optionId: string): OptionOverview {
    const option = this.requireOption(optionId);
    // Une option choisie par des élèves ne disparaît pas : ils se retrouveraient
    // sans enseignement, sans que rien ne le signale.
    const live = this.offerings
      .filter((offering) => offering.optionId === optionId)
      .some((offering) => this.choicesOf(offering.id)
        .some((choice) => choice.status !== 'CANCELLED'));
    if (live) {
      throw new Error('OPTION_IN_USE');
    }
    option.archived = true;
    return this.overview();
  }

  saveOfferings(optionId: string, payload: OptionOfferingsSavePayload): OptionOverview {
    this.requireOption(optionId);
    if (payload.choiceStartDate && payload.choiceEndDate
      && payload.choiceEndDate < payload.choiceStartDate) {
      throw new Error('VALIDATION_ERROR');
    }

    // Le serveur remplace l'ensemble : un niveau décoché ferme son offre. Ne pas
    // le refléter ici ferait diverger la démonstration du produit dès le premier
    // décochage.
    this.offerings
      .filter((offering) => offering.optionId === optionId
        && !payload.levelIds.includes(offering.levelId))
      .forEach((offering) => {
        if (this.choicesOf(offering.id).some((choice) => choice.status !== 'CANCELLED')) {
          throw new Error('OPTION_IN_USE');
        }
        this.offerings.splice(this.offerings.indexOf(offering), 1);
      });

    payload.levelIds.forEach((levelId) => {
      if (!this.levels.some((level) => level.id === levelId)) {
        throw new Error('LEVEL_NOT_FOUND');
      }
      const existing = this.offerings.find(
        (offering) => offering.optionId === optionId && offering.levelId === levelId);
      if (existing) {
        // Réduire la capacité en dessous des places déjà confirmées laisserait
        // des élèves inscrits à une option qui ne peut pas les accueillir.
        const confirmed = this.choicesOf(existing.id)
          .filter((choice) => choice.status === 'CONFIRMED').length;
        if (payload.capacity < confirmed) {
          throw new Error('OPTION_CAPACITY_REACHED');
        }
        Object.assign(existing, {
          capacity: payload.capacity,
          weeklyHours: payload.weeklyHours,
          choiceStartDate: payload.choiceStartDate,
          choiceEndDate: payload.choiceEndDate
        });
        return;
      }
      this.offerings.push({
        id: `off-${this.sequence++}`,
        optionId,
        levelId,
        capacity: payload.capacity,
        weeklyHours: payload.weeklyHours,
        choiceStartDate: payload.choiceStartDate,
        choiceEndDate: payload.choiceEndDate
      });
    });
    return this.overview();
  }

  assign(payload: OptionChoiceAssignPayload): OptionChoice {
    const offering = this.offerings.find((row) => row.id === payload.offeringId);
    if (!offering) {
      throw new Error('OPTION_OFFERING_NOT_FOUND');
    }
    const student = MOCK_STUDENTS.find((row) => row.id === payload.studentId);
    if (!student) {
      throw new Error('STUDENT_NOT_FOUND');
    }
    const classroom = MOCK_CLASSROOMS.find((row) => row.id === student.classroomId);
    // Un élève ne peut choisir qu'une option ouverte à son propre niveau :
    // ailleurs, elle ne tomberait sur aucune heure de son emploi du temps.
    if (!classroom || classroom.levelId !== offering.levelId) {
      throw new Error('OPTION_LEVEL_MISMATCH');
    }
    if (this.choicesOf(offering.id).some((choice) => choice.studentId === student.id
      && choice.status !== 'CANCELLED')) {
      throw new Error('OPTION_CHOICE_ALREADY_EXISTS');
    }

    const status: OptionChoiceStatus = payload.confirmImmediately
      ? this.confirmationStatus(offering.id)
      : 'REQUESTED';
    const choice: StoredChoice = {
      id: `cho-${this.sequence++}`,
      offeringId: offering.id,
      studentId: student.id,
      enrollmentId: `enr-${student.id}`,
      priority: payload.priority > 0 ? payload.priority : 1,
      status,
      notes: payload.notes?.trim() || undefined,
      chosenAt: new Date().toISOString(),
      confirmedAt: status === 'CONFIRMED' ? new Date().toISOString() : undefined
    };
    this.choices.push(choice);
    return this.describeChoice(choice);
  }

  changeStatus(choiceId: string, status: OptionChoiceStatus): OptionChoice {
    const choice = this.choices.find((row) => row.id === choiceId);
    if (!choice) {
      throw new Error('OPTION_CHOICE_NOT_FOUND');
    }
    if (status === 'CONFIRMED' && choice.status !== 'CONFIRMED'
      && this.confirmationStatus(choice.offeringId) !== 'CONFIRMED') {
      throw new Error('OPTION_CAPACITY_REACHED');
    }
    choice.status = status;
    choice.confirmedAt = status === 'CONFIRMED' ? new Date().toISOString() : undefined;
    return this.describeChoice(choice);
  }

  // ------------------------------------------------------------- internals

  /** Confirmable tant qu'il reste une place ; sinon liste d'attente. */
  private confirmationStatus(offeringId: string): OptionChoiceStatus {
    const offering = this.offerings.find((row) => row.id === offeringId);
    if (!offering) {
      return 'WAITLISTED';
    }
    const confirmed = this.choicesOf(offeringId)
      .filter((choice) => choice.status === 'CONFIRMED').length;
    return confirmed < offering.capacity ? 'CONFIRMED' : 'WAITLISTED';
  }

  private describeOption(option: StoredOption): AcademicOption {
    const offerings = this.offerings
      .filter((offering) => offering.optionId === option.id)
      .map((offering) => this.describeOffering(offering))
      .sort((a, b) => a.levelName.localeCompare(b.levelName));

    return {
      id: option.id,
      code: option.code,
      name: option.name,
      category: option.category,
      categoryLabel: CATEGORY_LABELS[option.category],
      languageCode: option.languageCode,
      description: option.description,
      colorHex: option.colorHex,
      offerings,
      levelCount: offerings.length,
      totalCapacity: offerings.reduce((sum, row) => sum + row.capacity, 0),
      requestedCount: offerings.reduce((sum, row) => sum + row.requestedCount, 0),
      confirmedCount: offerings.reduce((sum, row) => sum + row.confirmedCount, 0),
      waitlistedCount: offerings.reduce((sum, row) => sum + row.waitlistedCount, 0)
    };
  }

  private describeOffering(offering: StoredOffering): OptionOffering {
    const level = this.levels.find((row) => row.id === offering.levelId);
    const rows = this.choicesOf(offering.id);
    const confirmed = rows.filter((choice) => choice.status === 'CONFIRMED').length;
    return {
      id: offering.id,
      optionId: offering.optionId,
      levelId: offering.levelId,
      levelCode: level?.code ?? '',
      levelName: level?.name ?? '',
      capacity: offering.capacity,
      requestedCount: rows.filter((choice) => choice.status === 'REQUESTED').length,
      confirmedCount: confirmed,
      waitlistedCount: rows.filter((choice) => choice.status === 'WAITLISTED').length,
      availableSeats: Math.max(0, offering.capacity - confirmed),
      weeklyHours: offering.weeklyHours,
      choiceStartDate: offering.choiceStartDate,
      choiceEndDate: offering.choiceEndDate
    };
  }

  private describeChoice(choice: StoredChoice): OptionChoice {
    const offering = this.offerings.find((row) => row.id === choice.offeringId);
    const option = this.options.find((row) => row.id === offering?.optionId);
    const student = MOCK_STUDENTS.find((row) => row.id === choice.studentId);
    const classroom = MOCK_CLASSROOMS.find((row) => row.id === student?.classroomId);
    const level = this.levels.find((row) => row.id === offering?.levelId);

    return {
      id: choice.id,
      offeringId: choice.offeringId,
      optionId: option?.id ?? '',
      optionCode: option?.code ?? '',
      optionName: option?.name ?? '',
      optionColor: option?.colorHex,
      studentId: choice.studentId,
      studentNumber: student?.studentNumber ?? '',
      studentName: student?.fullName ?? 'Élève',
      enrollmentId: choice.enrollmentId,
      classroomName: classroom?.name ?? '',
      levelId: level?.id ?? '',
      levelName: level?.name ?? '',
      priority: choice.priority,
      status: choice.status,
      statusLabel: STATUS_LABELS[choice.status],
      notes: choice.notes,
      chosenAt: choice.chosenAt,
      confirmedAt: choice.confirmedAt
    };
  }

  private choicesOf(offeringId: string): StoredChoice[] {
    return this.choices.filter((choice) => choice.offeringId === offeringId);
  }

  private requireOption(optionId: string): StoredOption {
    const option = this.options.find((row) => row.id === optionId);
    if (!option) {
      throw new Error('OPTION_NOT_FOUND');
    }
    return option;
  }

  /**
   * A catalogue that looks like a real Ivorian collège.
   *
   * <p>One option is deliberately over-subscribed: without a full class the
   * waiting list is a column of zeroes, and the rule it exists for cannot be
   * seen at all.</p>
   */
  private seed(): void {
    const today = isoToday();
    const catalogue: Array<Omit<StoredOption, 'id' | 'archived'>
      & { capacity: number; hours: number; levels: number }> = [
      { code: 'ANG-LV1', name: 'Anglais LV1', category: 'LANGUAGE', languageCode: 'en',
        colorHex: '#0f9bb3', capacity: 60, hours: 4,
        description: 'Première langue vivante, obligatoire dès la 6e.', levels: 6 },
      { code: 'ESP-LV2', name: 'Espagnol LV2', category: 'LANGUAGE', languageCode: 'es',
        colorHex: '#d97a16', capacity: 40, hours: 3,
        description: 'Deuxième langue vivante, à partir de la 4e.', levels: 3 },
      { code: 'ALL-LV2', name: 'Allemand LV2', category: 'LANGUAGE', languageCode: 'de',
        colorHex: '#7c5cd6', capacity: 25, hours: 3,
        description: 'Deuxième langue vivante, effectif limité.', levels: 3 },
      { code: 'LATIN', name: 'Latin', category: 'ACADEMIC', colorHex: '#dc3545',
        capacity: 20, hours: 2,
        description: 'Enseignement optionnel, à partir de la 5e.', levels: 4 },
      { code: 'MUSIQUE', name: 'Éducation musicale', category: 'ARTS', colorHex: '#16915a',
        capacity: 30, hours: 2, description: 'Chorale et pratique instrumentale.', levels: 6 },
      { code: 'INFO', name: 'Initiation à l’informatique', category: 'TECHNICAL',
        colorHex: '#1f5fd6', capacity: 24, hours: 2,
        description: 'Bureautique et algorithmique, en salle informatique.', levels: 4 }
    ];

    catalogue.forEach((entry) => {
      const option: StoredOption = {
        id: `opt-${this.sequence++}`,
        code: entry.code,
        name: entry.name,
        category: entry.category,
        languageCode: entry.languageCode,
        description: entry.description,
        colorHex: entry.colorHex,
        archived: false
      };
      this.options.push(option);

      // Les options des grands niveaux ne sont pas ouvertes en 6e : une LV2
      // proposée dès la première année ne ressemble à aucun établissement.
      this.levels.slice(this.levels.length - entry.levels).forEach((level) => {
        this.offerings.push({
          id: `off-${this.sequence++}`,
          optionId: option.id,
          levelId: level.id,
          capacity: entry.capacity,
          weeklyHours: entry.hours,
          choiceStartDate: shift(today, -20),
          choiceEndDate: shift(today, 10)
        });
      });
    });

    this.seedChoices();
  }

  /** Des vœux réels, dont un groupe complet pour montrer la liste d'attente. */
  private seedChoices(): void {
    // L'allemand est volontairement saturé : capacité 25, davantage de vœux.
    const scarce = this.options.find((option) => option.code === 'ALL-LV2');

    this.offerings.forEach((offering) => {
      const option = this.options.find((row) => row.id === offering.optionId);
      const candidates = MOCK_STUDENTS.filter((student) => {
        const classroom = MOCK_CLASSROOMS.find((row) => row.id === student.classroomId);
        return classroom?.levelId === offering.levelId;
      });

      // 0,85 sur l'option saturée : assez pour dépasser les 25 places et créer
      // une vraie file, pas assez pour que la classe entière demande l'allemand —
      // ce que ne fait aucun établissement.
      const rate = option?.id === scarce?.id ? 0.85 : 0.35;
      candidates.forEach((student, index) => {
        if (hash(`${student.id}|${offering.id}`) > rate) {
          return;
        }
        const status = this.confirmationStatus(offering.id);
        this.choices.push({
          id: `cho-${this.sequence++}`,
          offeringId: offering.id,
          studentId: student.id,
          enrollmentId: `enr-${student.id}`,
          priority: (index % 2) + 1,
          // Une poignée de vœux restent en attente de décision : c'est l'état
          // dans lequel se trouve une école pendant la campagne de choix.
          status: index % 7 === 0 ? 'REQUESTED' : status,
          chosenAt: new Date().toISOString(),
          confirmedAt: status === 'CONFIRMED' && index % 7 !== 0
            ? new Date().toISOString()
            : undefined
        });
      });
    });
  }
}

/** Les vœux à traiter remontent : demandés, puis attente, puis le reste. */
function weight(status: OptionChoiceStatus): number {
  switch (status) {
    case 'REQUESTED': return 0;
    case 'WAITLISTED': return 1;
    case 'CONFIRMED': return 2;
    default: return 3;
  }
}

/** One catalogue for the whole demonstration session. */
export const MOCK_OPTIONS = new OptionStore();
