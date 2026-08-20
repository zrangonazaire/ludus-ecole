/** Configuration checklist of the current school. */

export interface SetupStep {
  key: 'CYCLES' | 'CLASSES' | 'SUBJECTS' | 'FEES' | 'TEACHERS' | 'STUDENTS';
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
