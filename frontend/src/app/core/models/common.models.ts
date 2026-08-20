/** Shared transport contracts. These mirror the backend DTOs exactly, so a
 *  mock data source and the real API are interchangeable (section 78). */

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/** The single error envelope returned by every endpoint (section 84). */
export interface ApiError {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  path: string;
  correlationId?: string;
  details?: Record<string, unknown>;
}

export interface PageQuery {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
}

export type CapacityStatus = 'AVAILABLE' | 'WARNING' | 'FULL' | 'OVER_CAPACITY';

export type StudentStatus =
  | 'APPLICANT' | 'ADMITTED' | 'ACTIVE' | 'SUSPENDED'
  | 'WITHDRAWN' | 'GRADUATED' | 'TRANSFERRED' | 'ARCHIVED';

export type EnrollmentStatus =
  | 'DRAFT' | 'PENDING' | 'VALIDATED' | 'ACTIVE'
  | 'SUSPENDED' | 'CANCELLED' | 'COMPLETED' | 'TRANSFERRED';

export type GradeStatus = 'DRAFT' | 'SUBMITTED' | 'VALIDATED' | 'PUBLISHED';

export type AttendanceStatus =
  | 'PRESENT' | 'ABSENT' | 'LATE'
  | 'EXCUSED_ABSENCE' | 'EXCUSED_LATE' | 'LEFT_EARLY';

export type PaymentMethod =
  | 'CASH' | 'BANK_TRANSFER' | 'CARD' | 'MOBILE_MONEY' | 'CHEQUE' | 'OTHER';

export type PaymentStatus = 'PENDING' | 'VALIDATED' | 'CANCELLED' | 'REVERSED' | 'FAILED';

export type StudentFeeStatus =
  | 'PAID' | 'PARTIALLY_PAID' | 'DUE' | 'OVERDUE' | 'WAIVED' | 'CANCELLED';

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
