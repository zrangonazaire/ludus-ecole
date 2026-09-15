import { Provider } from '@angular/core';
import { environment } from '@env/environment';
import {
  ATTENDANCE_DATA_SOURCE, CLASSROOM_DATA_SOURCE, DASHBOARD_DATA_SOURCE,
  ENROLLMENT_DATA_SOURCE, FINANCE_DATA_SOURCE, GRADE_DATA_SOURCE,
  OFFICIAL_DOCUMENT_DATA_SOURCE, OPTION_DATA_SOURCE, REFERENCE_DATA_SOURCE, TRANSFER_DATA_SOURCE, REPORT_CARD_DATA_SOURCE, HEALTH_DATA_SOURCE, FAMILY_REQUEST_DATA_SOURCE,
  STUDENT_DATA_SOURCE, STUDENT_PORTAL_DATA_SOURCE, TEACHER_DATA_SOURCE, TIMETABLE_DATA_SOURCE,
  CURRICULUM_DATA_SOURCE, FEE_DATA_SOURCE, ACCESS_PROFILE_DATA_SOURCE, ADMISSION_DATA_SOURCE,
    GUARDIAN_DATA_SOURCE, COUNCIL_DATA_SOURCE, LEVEL_DATA_SOURCE, CAMPUS_DATA_SOURCE
} from './data-source';
import {
  MockAttendanceDataSource, MockClassroomDataSource, MockDashboardDataSource,
  MockEnrollmentDataSource, MockFinanceDataSource, MockGradeDataSource,
  MockOptionDataSource, MockReferenceDataSource, MockTransferDataSource, MockHealthDataSource, MockFamilyRequestDataSource, MockReportCardDataSource, MockStudentDataSource, MockTeacherDataSource,
    MockTimetableDataSource, MockCurriculumDataSource, MockFeeDataSource, MockCouncilDataSource
} from './mock/mock-data-sources';
import {
  ApiAttendanceDataSource, ApiClassroomDataSource, ApiDashboardDataSource,
  ApiEnrollmentDataSource, ApiFinanceDataSource, ApiGradeDataSource,
  ApiOptionDataSource, ApiReferenceDataSource, ApiTransferDataSource, ApiHealthDataSource, ApiFamilyRequestDataSource, ApiReportCardDataSource, ApiStudentDataSource, ApiTeacherDataSource,
  ApiTimetableDataSource, ApiCurriculumDataSource, ApiFeeDataSource, ApiCouncilDataSource,
  ApiLevelDataSource
} from './api/api-data-sources';
import { MockOfficialDocumentDataSource } from './mock/mock-official-document-data-source';
import { ApiOfficialDocumentDataSource } from './api/api-official-document-data-source';
import { MockStudentPortalDataSource } from './mock/mock-student-portal-data-source';
import { ApiStudentPortalDataSource } from './api/api-student-portal-data-source';
import { MockAccessProfileDataSource } from './mock/mock-access-profile-data-source';
import { ApiAccessProfileDataSource } from './api/api-access-profile-data-source';
import { MockAdmissionDataSource } from './mock/mock-admission-data-source';
import { MockLevelDataSource } from './mock/mock-level-data-source';
import { MockCampusDataSource } from './mock/mock-campus-data-source';
import { ApiAdmissionDataSource } from './api/api-admission-data-source';
import { ApiGuardianDataSource } from './api/api-guardian-data-source';
import { ApiCampusDataSource } from './api/api-campus-data-source';

/**
 * The single switch between demo mode and the real backend (section 78).
 *
 * Components depend on the tokens only, so flipping `environment.useMockData`
 * swaps every data source without touching a single component.
 */
const useMock = environment.useMockData;

export const dataSourceProviders: Provider[] = [
  { provide: STUDENT_DATA_SOURCE, useClass: useMock ? MockStudentDataSource : ApiStudentDataSource },
  { provide: STUDENT_PORTAL_DATA_SOURCE,
    useClass: useMock ? MockStudentPortalDataSource : ApiStudentPortalDataSource },
  { provide: ENROLLMENT_DATA_SOURCE, useClass: useMock ? MockEnrollmentDataSource : ApiEnrollmentDataSource },
  { provide: CLASSROOM_DATA_SOURCE, useClass: useMock ? MockClassroomDataSource : ApiClassroomDataSource },
  { provide: TEACHER_DATA_SOURCE, useClass: useMock ? MockTeacherDataSource : ApiTeacherDataSource },
  { provide: ATTENDANCE_DATA_SOURCE, useClass: useMock ? MockAttendanceDataSource : ApiAttendanceDataSource },
  { provide: GRADE_DATA_SOURCE, useClass: useMock ? MockGradeDataSource : ApiGradeDataSource },
  { provide: FINANCE_DATA_SOURCE, useClass: useMock ? MockFinanceDataSource : ApiFinanceDataSource },
  { provide: DASHBOARD_DATA_SOURCE, useClass: useMock ? MockDashboardDataSource : ApiDashboardDataSource },
  { provide: TIMETABLE_DATA_SOURCE, useClass: useMock ? MockTimetableDataSource : ApiTimetableDataSource },
  { provide: CURRICULUM_DATA_SOURCE, useClass: useMock ? MockCurriculumDataSource : ApiCurriculumDataSource },
  { provide: FEE_DATA_SOURCE, useClass: useMock ? MockFeeDataSource : ApiFeeDataSource },
  { provide: TRANSFER_DATA_SOURCE, useClass: useMock ? MockTransferDataSource : ApiTransferDataSource },
  { provide: HEALTH_DATA_SOURCE, useClass: useMock ? MockHealthDataSource : ApiHealthDataSource },
  { provide: FAMILY_REQUEST_DATA_SOURCE,
    useClass: useMock ? MockFamilyRequestDataSource : ApiFamilyRequestDataSource },
  { provide: OPTION_DATA_SOURCE, useClass: useMock ? MockOptionDataSource : ApiOptionDataSource },
  { provide: REPORT_CARD_DATA_SOURCE, useClass: useMock ? MockReportCardDataSource : ApiReportCardDataSource },
  { provide: COUNCIL_DATA_SOURCE, useClass: useMock ? MockCouncilDataSource : ApiCouncilDataSource },
  { provide: OFFICIAL_DOCUMENT_DATA_SOURCE,
    useClass: useMock ? MockOfficialDocumentDataSource : ApiOfficialDocumentDataSource },
  { provide: ACCESS_PROFILE_DATA_SOURCE,
    useClass: useMock ? MockAccessProfileDataSource : ApiAccessProfileDataSource },
  { provide: ADMISSION_DATA_SOURCE,
    useClass: useMock ? MockAdmissionDataSource : ApiAdmissionDataSource },
  { provide: LEVEL_DATA_SOURCE,
    useClass: useMock ? MockLevelDataSource : ApiLevelDataSource },
  { provide: CAMPUS_DATA_SOURCE,
    useClass: useMock ? MockCampusDataSource : ApiCampusDataSource },
  { provide: GUARDIAN_DATA_SOURCE, useClass: ApiGuardianDataSource },
  { provide: REFERENCE_DATA_SOURCE, useClass: useMock ? MockReferenceDataSource : ApiReferenceDataSource }
];
