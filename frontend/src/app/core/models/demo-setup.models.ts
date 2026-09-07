export const DEMO_SETUP_VERSION = 1 as const;

export type SchoolPreset = 'primary' | 'secondary' | 'group';
export type StudentBand = '1-100' | '101-300' | '301-700' | '700+';
export type DemoPriority = 'organize' | 'collect' | 'engage';
export type DemoModuleId =
  | 'students'
  | 'pedagogy'
  | 'finance'
  | 'communication'
  | 'analytics'
  | 'administration';
export type PeriodScheme = 'trimester' | 'semester';
export type GradingScale = '20' | '100' | 'competency';
export type CurrencyCode = 'XOF' | 'EUR' | 'GNF' | 'CDF' | 'MAD';
export type PaymentModeId = 'cash' | 'mobile-money' | 'transfer' | 'card';

export interface DemoSchoolProfile {
  readonly schoolName: string;
  readonly preset: SchoolPreset;
  readonly country: string;
  readonly city: string;
  readonly studentBand: StudentBand;
  readonly campusCount: number;
}

export interface DemoPriorities {
  readonly mainPriority: DemoPriority;
  readonly modules: readonly DemoModuleId[];
}

export interface DemoRules {
  readonly periodScheme: PeriodScheme;
  readonly gradingScale: GradingScale;
  readonly rankingEnabled: boolean;
  /**
   * Combien de classes ouvrir par niveau.
   *
   * <p>Distinct de la capacité : l'un dit combien d'élèves tiennent dans une
   * classe, l'autre combien de classes accueillent un même niveau. Une école
   * de 300 élèves peut avoir deux classes de 40 par niveau ; une petite école
   * de village en aura une seule.</p>
   */
  readonly classesPerLevel: number;
  readonly classCapacity: number;
  readonly currency: CurrencyCode;
  readonly paymentModes: readonly PaymentModeId[];
}

export interface DemoOperationalConfiguration {
  readonly cycles: readonly {
    readonly code: string;
    readonly levels: readonly string[];
  }[];
  readonly classesPerLevel: number;
  readonly classCapacity: number;
  readonly subjects: readonly {
    readonly code: string;
    readonly coefficient: number;
  }[];
  readonly fees: {
    readonly registration: number;
    readonly tuitionTotal: number;
    readonly instalments: number;
    readonly currency: CurrencyCode;
  };
}

export interface DemoSetupDraft {
  readonly version: typeof DEMO_SETUP_VERSION;
  readonly updatedAt: string;
  readonly completedStep: 0 | 1 | 2 | 3 | 4;
  readonly profile: DemoSchoolProfile;
  readonly priorities: DemoPriorities;
  readonly rules: DemoRules;
  readonly operations?: DemoOperationalConfiguration;
}

export const DEFAULT_DEMO_SETUP_DRAFT: DemoSetupDraft = {
  version: DEMO_SETUP_VERSION,
  updatedAt: '',
  completedStep: 0,
  profile: {
    schoolName: '',
    preset: 'secondary',
    country: 'Côte d’Ivoire',
    city: '',
    studentBand: '101-300',
    campusCount: 1
  },
  priorities: {
    mainPriority: 'organize',
    modules: ['students', 'pedagogy', 'finance']
  },
  rules: {
    periodScheme: 'trimester',
    gradingScale: '20',
    rankingEnabled: true,
    classesPerLevel: 1,
    classCapacity: 40,
    currency: 'XOF',
    paymentModes: ['cash', 'mobile-money']
  }
};
