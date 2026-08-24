/** Configuration checklist of the current school. */

/**
 * The ten setup steps, ordered the way a school actually configures itself:
 * nothing below can be done before the line above it exists.
 */
export type SetupStepKey =
  | 'ACADEMIC_YEAR'
  | 'CYCLES'
  | 'LEVELS'
  | 'CLASSES'
  | 'SUBJECTS'
  | 'CURRICULUM'
  | 'FEES'
  | 'TEACHERS'
  | 'ASSIGNMENTS'
  | 'STUDENTS';

export interface SetupStep {
  /** Mirrors the ten steps produced by SetupStatusService, in order. */
  key: SetupStepKey;
  label: string;
  description: string;
  done: boolean;
  required: boolean;
  count: number;
  actionRoute: string;
  actionLabel: string;
}

export interface SetupStatus {
  schoolId: string;
  schoolName: string;
  academicYearCode?: string;
  completedSteps: number;
  totalSteps: number;
  percentComplete: number;
  complete: boolean;
  nextStepKey?: string;
  steps: SetupStep[];
}
