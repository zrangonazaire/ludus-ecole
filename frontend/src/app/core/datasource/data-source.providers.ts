import { Provider } from '@angular/core';
import { environment } from '@env/environment';
import {
  ATTENDANCE_DATA_SOURCE, CLASSROOM_DATA_SOURCE, DASHBOARD_DATA_SOURCE,
  ENROLLMENT_DATA_SOURCE, FINANCE_DATA_SOURCE, GRADE_DATA_SOURCE,
  REFERENCE_DATA_SOURCE, STUDENT_DATA_SOURCE, TEACHER_DATA_SOURCE
} from './data-source';
import {
  MockAttendanceDataSource, MockClassroomDataSource, MockDashboardDataSource,
  MockEnrollmentDataSource, MockFinanceDataSource, MockGradeDataSource,
  MockReferenceDataSource, MockStudentDataSource, MockTeacherDataSource
} from './mock/mock-data-sources';
import {
  ApiAttendanceDataSource, ApiClassroomDataSource, ApiDashboardDataSource,
  ApiEnrollmentDataSource, ApiFinanceDataSource, ApiGradeDataSource,
  ApiReferenceDataSource, ApiStudentDataSource, ApiTeacherDataSource
} from './api/api-data-sources';

/**
 * The single switch between demo mode and the real backend (section 78).
 *
 * Components depend on the tokens only, so flipping `environment.useMockData`
 * swaps every data source without touching a single component.
 */
const useMock = environment.useMockData;

export const dataSourceProviders: Provider[] = [
  { provide: STUDENT_DATA_SOURCE, useClass: useMock ? MockStudentDataSource : ApiStudentDataSource },
  { provide: ENROLLMENT_DATA_SOURCE, useClass: useMock ? MockEnrollmentDataSource : ApiEnrollmentDataSource },
  { provide: CLASSROOM_DATA_SOURCE, useClass: useMock ? MockClassroomDataSource : ApiClassroomDataSource },
  { provide: TEACHER_DATA_SOURCE, useClass: useMock ? MockTeacherDataSource : ApiTeacherDataSource },
  { provide: ATTENDANCE_DATA_SOURCE, useClass: useMock ? MockAttendanceDataSource : ApiAttendanceDataSource },
  { provide: GRADE_DATA_SOURCE, useClass: useMock ? MockGradeDataSource : ApiGradeDataSource },
  { provide: FINANCE_DATA_SOURCE, useClass: useMock ? MockFinanceDataSource : ApiFinanceDataSource },
  { provide: DASHBOARD_DATA_SOURCE, useClass: useMock ? MockDashboardDataSource : ApiDashboardDataSource },
  { provide: REFERENCE_DATA_SOURCE, useClass: useMock ? MockReferenceDataSource : ApiReferenceDataSource }
];
