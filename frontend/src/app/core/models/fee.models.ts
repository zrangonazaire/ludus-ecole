/** Types de frais et tarifs par niveau. */

export type FeeCategoryCode =
  | 'REGISTRATION' | 'TUITION' | 'EXAM' | 'ACTIVITY'
  | 'UNIFORM' | 'TRANSPORT' | 'CANTEEN' | 'OTHER';

export type FeeRecurrenceCode = 'ONE_TIME' | 'ANNUAL' | 'TERM' | 'MONTHLY';

export interface FeeType {
  id: string;
  code: string;
  name: string;
  category: FeeCategoryCode;
  categoryLabel: string;
  recurrence: FeeRecurrenceCode;
  recurrenceLabel: string;
  mandatory: boolean;
  refundable: boolean;
  description?: string;
  status: string;
  /** Nombre de niveaux où ce type de frais est tarifé. */
  pricedLevels: number;
  deletable: boolean;
}

export interface FeeTypeUpsertPayload {
  code: string;
  name: string;
  category: FeeCategoryCode;
  recurrence: FeeRecurrenceCode;
  mandatory: boolean;
  refundable: boolean;
  description?: string;
}

export interface Instalment {
  id?: string;
  sequence: number;
  label: string;
  amount: number;
  /** Format ISO aaaa-mm-jj. */
  dueDate: string;
  graceDays: number;
}

export interface FeeSchedule {
  id: string;
  feeTypeId: string;
  feeTypeCode: string;
  feeTypeName: string;
  category: FeeCategoryCode;
  mandatory: boolean;
  levelId?: string;
  levelName?: string;
  label: string;
  totalAmount: number;
  currency: string;
  appliesToNewStudents: boolean;
  appliesToReturningStudents: boolean;
  status: string;
  instalments: Instalment[];
  /** Vrai quand des frais élèves en sont déjà issus : suppression impossible. */
  locked: boolean;
}

export interface LevelFees {
  levelId: string;
  levelName: string;
  levelCode: string;
  cycleId: string;
  cycleName: string;
  sequence: number;
  scheduleCount: number;
  /** Total dû par élève, frais obligatoires seulement. */
  mandatoryTotal: number;
  optionalTotal: number;
  instalmentCount: number;
  ready: boolean;
  currency: string;
  schedules: FeeSchedule[];
}

export interface InstalmentPayload {
  label?: string;
  amount: number;
  dueDate: string;
  graceDays?: number;
}

export interface FeeSchedulePayload {
  feeTypeId: string;
  levelId?: string;
  label?: string;
  totalAmount: number;
  appliesToNewStudents?: boolean;
  appliesToReturningStudents?: boolean;
  instalments?: InstalmentPayload[];
  /** Alternative à `instalments` : N échéances régulières générées par le serveur. */
  instalmentCount?: number;
  firstDueDate?: string;
  monthsBetweenInstalments?: number;
}

export interface FeeApplyPayload {
  levelIds: string[];
  schedule: FeeSchedulePayload;
  replaceExisting: boolean;
}

export const FEE_CATEGORIES: ReadonlyArray<{ code: FeeCategoryCode; label: string }> = [
  { code: 'REGISTRATION', label: 'Inscription' },
  { code: 'TUITION', label: 'Scolarité' },
  { code: 'EXAM', label: 'Examens' },
  { code: 'ACTIVITY', label: 'Activités' },
  { code: 'UNIFORM', label: 'Tenue' },
  { code: 'TRANSPORT', label: 'Transport' },
  { code: 'CANTEEN', label: 'Cantine' },
  { code: 'OTHER', label: 'Autre' }
];

export const FEE_RECURRENCES: ReadonlyArray<{ code: FeeRecurrenceCode; label: string }> = [
  { code: 'ONE_TIME', label: 'Une seule fois' },
  { code: 'ANNUAL', label: 'Chaque année' },
  { code: 'TERM', label: 'Chaque période' },
  { code: 'MONTHLY', label: 'Chaque mois' }
];
