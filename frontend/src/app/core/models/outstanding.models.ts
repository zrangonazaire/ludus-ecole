import { PageResponse } from './common.models';

export type OutstandingBucket = 'ALL' | 'OVERDUE' | 'CRITICAL' | 'DUE_SOON';

export interface OutstandingQuery {
  page?: number;
  size?: number;
  search?: string;
  bucket?: OutstandingBucket;
  academicYearId?: string;
}

/** One family balance, aggregated from its unpaid fee instalments. */
export interface OutstandingStudent {
  studentId: string;
  studentNumber: string;
  studentName: string;
  photoUrl?: string;
  classroomName?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  outstandingAmount: number;
  overdueAmount: number;
  currency: string;
  oldestDueDate: string;
  daysOverdue: number;
  instalmentCount: number;
}

export interface OutstandingBoard {
  totalOutstanding: number;
  overdueAmount: number;
  studentCount: number;
  criticalCount: number;
  currency: string;
  students: PageResponse<OutstandingStudent>;
}
