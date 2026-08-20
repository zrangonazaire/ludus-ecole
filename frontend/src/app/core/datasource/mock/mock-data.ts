import {
  AcademicYear, Assessment, Classroom, DashboardData, Enrollment, Payment,
  StudentSummary, Subject, Teacher, Term
} from '@core/models/domain.models';

/**
 * Realistic demo dataset (section 87).
 *
 * The figures match the reference dashboard exactly, and the shapes are the
 * shapes the API returns, so switching `useMockData` to false changes nothing
 * in the components.
 */

export const MOCK_ACADEMIC_YEAR: AcademicYear = {
  id: 'ay-2026-2027',
  code: '2026-2027',
  label: 'Annee scolaire 2026-2027',
  startDate: '2026-09-14',
  endDate: '2027-07-03',
  status: 'ACTIVE',
  enrollmentOpenAt: '2026-06-01T08:00:00Z',
  enrollmentCloseAt: '2026-11-30T23:59:00Z'
};

export const MOCK_TERMS: Term[] = [
  { id: 't1', academicYearId: 'ay-2026-2027', name: '1er trimestre', code: 'T1', sequence: 1,
    startDate: '2026-09-14', endDate: '2026-12-19', status: 'CLOSED' },
  { id: 't2', academicYearId: 'ay-2026-2027', name: '2e trimestre', code: 'T2', sequence: 2,
    startDate: '2027-01-05', endDate: '2027-03-27', status: 'GRADE_ENTRY' },
  { id: 't3', academicYearId: 'ay-2026-2027', name: '3e trimestre', code: 'T3', sequence: 3,
    startDate: '2027-04-06', endDate: '2027-07-03', status: 'PLANNED' }
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 's-mat', code: 'MAT', name: 'Mathematiques', shortName: 'Maths', category: 'SCIENCE', colorHex: '#1f5fd6', graded: true },
  { id: 's-fra', code: 'FRA', name: 'Francais', shortName: 'Fr', category: 'LITERATURE', colorHex: '#7c5cd6', graded: true },
  { id: 's-ang', code: 'ANG', name: 'Anglais', shortName: 'Ang', category: 'LANGUAGE', colorHex: '#0f9bb3', graded: true },
  { id: 's-svt', code: 'SVT', name: 'Sciences de la Vie et de la Terre', shortName: 'SVT', category: 'SCIENCE', colorHex: '#16915a', graded: true },
  { id: 's-pc', code: 'PC', name: 'Physique-Chimie', shortName: 'PC', category: 'SCIENCE', colorHex: '#d97a16', graded: true },
  { id: 's-hg', code: 'HG', name: 'Histoire-Geographie', shortName: 'HG', category: 'LITERATURE', colorHex: '#dc3545', graded: true },
  { id: 's-eps', code: 'EPS', name: 'Education Physique et Sportive', shortName: 'EPS', category: 'SPORT', graded: true }
];

export const MOCK_CLASSROOMS: Classroom[] = [
  { id: 'c-6a', code: '6EME-A', name: '6eme A', levelId: 'l-6', levelName: '6eme', campusId: 'cp-1',
    academicYearId: 'ay-2026-2027', capacityMaximum: 40, activeEnrollments: 38, availableSeats: 2,
    projectedAvailableSeats: 1, occupancyRate: 95, capacityStatus: 'WARNING',
    mainTeacherName: 'Kouassi N\'Guessan', status: 'ACTIVE' },
  { id: 'c-6b', code: '6EME-B', name: '6eme B', levelId: 'l-6', levelName: '6eme', campusId: 'cp-1',
    academicYearId: 'ay-2026-2027', capacityMaximum: 40, activeEnrollments: 31, availableSeats: 9,
    projectedAvailableSeats: 9, occupancyRate: 77.5, capacityStatus: 'AVAILABLE',
    mainTeacherName: 'Adjoua Bamba', status: 'ACTIVE' },
  { id: 'c-5a', code: '5EME-A', name: '5eme A', levelId: 'l-5', levelName: '5eme', campusId: 'cp-1',
    academicYearId: 'ay-2026-2027', capacityMaximum: 40, activeEnrollments: 40, availableSeats: 0,
    projectedAvailableSeats: 0, occupancyRate: 100, capacityStatus: 'FULL',
    mainTeacherName: 'Ibrahim Cisse', status: 'ACTIVE' },
  { id: 'c-4a', code: '4EME-A', name: '4eme A', levelId: 'l-4', levelName: '4eme', campusId: 'cp-1',
    academicYearId: 'ay-2026-2027', capacityMaximum: 38, activeEnrollments: 34, availableSeats: 4,
    projectedAvailableSeats: 3, occupancyRate: 89.5, capacityStatus: 'AVAILABLE',
    mainTeacherName: 'Fatou Diallo', status: 'ACTIVE' },
  { id: 'c-3a', code: '3EME-A', name: '3eme A', levelId: 'l-3', levelName: '3eme', campusId: 'cp-1',
    academicYearId: 'ay-2026-2027', capacityMaximum: 36, activeEnrollments: 36, availableSeats: 0,
    projectedAvailableSeats: -2, occupancyRate: 100, capacityStatus: 'FULL',
    mainTeacherName: 'Yao Kouame', status: 'ACTIVE' },
  { id: 'c-3b', code: '3EME-B', name: '3eme B', levelId: 'l-3', levelName: '3eme', campusId: 'cp-1',
    academicYearId: 'ay-2026-2027', capacityMaximum: 36, activeEnrollments: 29, availableSeats: 7,
    projectedAvailableSeats: 7, occupancyRate: 80.6, capacityStatus: 'AVAILABLE',
    mainTeacherName: 'Awa Sanogo', status: 'ACTIVE' }
];

const FIRST_NAMES = ['Aya', 'Kouadio', 'Fatoumata', 'Yao', 'Mariam', 'Ibrahim', 'Adjoua',
  'Sekou', 'Aicha', 'Brou', 'Kadidja', 'Serge', 'Nadege', 'Moussa', 'Estelle', 'Aboubacar'];
const LAST_NAMES = ['Kone', 'Traore', 'Diallo', 'Bamba', 'Cisse', 'Kouame', 'Sanogo',
  'N\'Guessan', 'Ouattara', 'Toure', 'Coulibaly', 'Diarra', 'Yeo', 'Soro'];

/** Deterministic generator: the demo data is identical on every reload. */
export function buildMockStudents(count = 120): StudentSummary[] {
  const students: StudentSummary[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 7) % LAST_NAMES.length];
    const classroom = MOCK_CLASSROOMS[i % MOCK_CLASSROOMS.length];
    const birthYear = 2010 + (i % 5);
    students.push({
      id: `st-${i + 1}`,
      studentNumber: `EDU-2026-${String(i + 1).padStart(6, '0')}`,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender: i % 2 === 0 ? 'FEMALE' : 'MALE',
      birthDate: `${birthYear}-0${(i % 9) + 1}-1${i % 9}`,
      age: 2026 - birthYear,
      status: i % 23 === 0 ? 'SUSPENDED' : 'ACTIVE',
      classroomId: classroom.id,
      classroomName: classroom.name,
      levelName: classroom.levelName
    });
  }
  return students;
}

export const MOCK_STUDENTS = buildMockStudents();

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'tc-1', employeeNumber: 'ENS-0001', firstName: 'Kouassi', lastName: 'N\'Guessan',
    fullName: 'Kouassi N\'Guessan', email: 'kouassi.nguessan@eduops.local', phone: '+225 07 00 00 01',
    speciality: 'Mathematiques', status: 'ACTIVE', subjectNames: ['Mathematiques'], classCount: 4 },
  { id: 'tc-2', employeeNumber: 'ENS-0002', firstName: 'Adjoua', lastName: 'Bamba',
    fullName: 'Adjoua Bamba', email: 'adjoua.bamba@eduops.local', phone: '+225 07 00 00 02',
    speciality: 'Francais', status: 'ACTIVE', subjectNames: ['Francais'], classCount: 5 },
  { id: 'tc-3', employeeNumber: 'ENS-0003', firstName: 'Ibrahim', lastName: 'Cisse',
    fullName: 'Ibrahim Cisse', email: 'ibrahim.cisse@eduops.local', phone: '+225 07 00 00 03',
    speciality: 'Sciences physiques', status: 'ACTIVE', subjectNames: ['Physique-Chimie'], classCount: 6 },
  { id: 'tc-4', employeeNumber: 'ENS-0004', firstName: 'Fatou', lastName: 'Diallo',
    fullName: 'Fatou Diallo', email: 'fatou.diallo@eduops.local', phone: '+225 07 00 00 04',
    speciality: 'Anglais', status: 'ACTIVE', subjectNames: ['Anglais'], classCount: 6 },
  { id: 'tc-5', employeeNumber: 'ENS-0005', firstName: 'Yao', lastName: 'Kouame',
    fullName: 'Yao Kouame', email: 'yao.kouame@eduops.local', phone: '+225 07 00 00 05',
    speciality: 'SVT', status: 'ON_LEAVE', subjectNames: ['SVT'], classCount: 3 }
];

export const MOCK_RECENT_ENROLLMENTS: Enrollment[] = MOCK_STUDENTS.slice(0, 6).map((student, index) => ({
  id: `en-${index + 1}`,
  enrollmentNumber: `ENR-2026-${String(index + 1).padStart(6, '0')}`,
  studentId: student.id,
  studentNumber: student.studentNumber,
  studentName: student.fullName,
  academicYearId: MOCK_ACADEMIC_YEAR.id,
  academicYearCode: MOCK_ACADEMIC_YEAR.code,
  classroomId: student.classroomId!,
  classroomName: student.classroomName!,
  levelId: 'l-6',
  levelName: student.levelName!,
  enrollmentKind: index % 3 === 0 ? 'NEW' : 'RE_ENROLLMENT',
  status: 'ACTIVE',
  enrollmentDate: `2026-09-${String(10 + index).padStart(2, '0')}`,
  repeating: false,
  overCapacityOverride: false
}));

export const MOCK_RECENT_PAYMENTS: Payment[] = MOCK_STUDENTS.slice(10, 16).map((student, index) => ({
  id: `pay-${index + 1}`,
  paymentReference: `PAY-2026-${String(index + 1).padStart(8, '0')}`,
  studentId: student.id,
  studentNumber: student.studentNumber,
  studentName: student.fullName,
  amount: [200000, 150000, 200000, 75000, 300000, 200000][index],
  allocatedAmount: [200000, 150000, 200000, 75000, 300000, 200000][index],
  unallocatedAmount: 0,
  currency: 'XOF',
  paymentMethod: (['CASH', 'MOBILE_MONEY', 'BANK_TRANSFER', 'CASH', 'MOBILE_MONEY', 'CHEQUE'] as const)[index],
  paymentDate: `2027-02-${String(10 + index).padStart(2, '0')}`,
  status: 'VALIDATED',
  receiptNumber: `REC-2026-${String(1234 + index).padStart(8, '0')}`,
  allocations: []
}));

export const MOCK_UPCOMING_ASSESSMENTS: Assessment[] = [
  { id: 'as-1', title: 'Composition du 2e trimestre', classroomId: 'c-3a', classroomName: '3eme A',
    subjectId: 's-mat', subjectName: 'Mathematiques', termId: 't2', assessmentType: 'EXAM',
    assessmentDate: '2027-03-16', maxScore: 20, coefficient: 3, status: 'PLANNED',
    gradedCount: 0, studentCount: 36 },
  { id: 'as-2', title: 'Devoir surveille n°4', classroomId: 'c-4a', classroomName: '4eme A',
    subjectId: 's-fra', subjectName: 'Francais', termId: 't2', assessmentType: 'TEST',
    assessmentDate: '2027-03-18', maxScore: 20, coefficient: 2, status: 'PLANNED',
    gradedCount: 0, studentCount: 34 },
  { id: 'as-3', title: 'Interrogation ecrite', classroomId: 'c-6a', classroomName: '6eme A',
    subjectId: 's-ang', subjectName: 'Anglais', termId: 't2', assessmentType: 'QUIZ',
    assessmentDate: '2027-03-19', maxScore: 10, coefficient: 1, status: 'OPEN',
    gradedCount: 12, studentCount: 38 }
];

/** The reference dashboard figures of section 87. */
export const MOCK_DASHBOARD: DashboardData = {
  academicYear: MOCK_ACADEMIC_YEAR,
  campusName: 'Campus Principal',
  currentTerm: MOCK_TERMS[1],
  generatedAt: new Date().toISOString(),
  kpis: [
    { key: 'enrolled', label: 'Eleves inscrits', value: 1284, formatted: '1 284',
      delta: 46, deltaLabel: 'vs annee precedente', trend: 'up' },
    { key: 'attendance', label: 'Taux de presence', value: 94.8, formatted: '94,8',
      suffix: ' %', tone: 'success', trend: 'flat' },
    { key: 'absent-today', label: "Absents aujourd'hui", value: 37, formatted: '37',
      live: true, tone: 'warning' },
    { key: 'teachers-present', label: 'Enseignants presents', value: '68/72', formatted: '68/72' },
    { key: 'classes', label: 'Classes actives', value: 42, formatted: '42' },
    { key: 'average', label: 'Moyenne generale', value: 13.4, formatted: '13,4',
      suffix: '/20', tone: 'success' },
    { key: 'collections', label: 'Encaissements du mois', value: 18450000,
      formatted: '18 450 000', suffix: ' FCFA', tone: 'success', trend: 'up', delta: 12,
      deltaLabel: '% vs mois dernier' },
    { key: 'outstanding', label: 'Impayes', value: 6240000, formatted: '6 240 000',
      suffix: ' FCFA', tone: 'danger' }
  ],
  enrollmentByLevel: {
    categories: ['6eme', '5eme', '4eme', '3eme', '2nde', '1ere', 'Tle'],
    series: [{ name: 'Effectif', data: [231, 218, 205, 196, 158, 148, 128] }]
  },
  attendanceTrend: {
    categories: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
    series: [
      { name: 'Presence (%)', data: [96.2, 95.8, 94.1, 95.5, 93.8, 94.9, 95.2, 94.8] },
      { name: 'Absence (%)', data: [3.8, 4.2, 5.9, 4.5, 6.2, 5.1, 4.8, 5.2] }
    ]
  },
  academicPerformance: {
    categories: ['T1 2025', 'T2 2025', 'T3 2025', 'T1 2026', 'T2 2026'],
    series: [{ name: 'Moyenne generale', data: [12.6, 12.9, 13.1, 13.2, 13.4] }]
  },
  monthlyCollections: {
    categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Fev'],
    series: [
      { name: 'Encaisse', data: [42500000, 21300000, 15800000, 19200000, 24600000, 18450000] },
      { name: 'Attendu', data: [45000000, 24000000, 18000000, 22000000, 26000000, 22000000] }
    ]
  },
  financialBreakdown: {
    labels: ['Solde', 'Partiellement paye', 'Impaye'],
    values: [742, 389, 153]
  },
  recentEnrollments: MOCK_RECENT_ENROLLMENTS,
  todayAbsences: MOCK_STUDENTS.slice(20, 26).map((student) => ({
    studentId: student.id,
    studentNumber: student.studentNumber,
    studentName: student.fullName,
    status: 'ABSENT' as const,
    justified: false
  })),
  recentPayments: MOCK_RECENT_PAYMENTS,
  alerts: [
    { id: 'al-1', type: 'CLASS_FULL', severity: 'WARNING', title: 'Classe complete',
      message: 'La classe 5eme A a atteint sa capacite maximale (40/40).',
      classroomName: '5eme A', createdAt: new Date().toISOString() },
    { id: 'al-2', type: 'PAYMENT_OVERDUE', severity: 'CRITICAL', title: 'Impayes en hausse',
      message: '153 eleves presentent un impaye depuis plus de 30 jours.',
      createdAt: new Date().toISOString() },
    { id: 'al-3', type: 'GRADE_ENTRY_DELAY', severity: 'WARNING', title: 'Saisie des notes en retard',
      message: '4 evaluations du 2e trimestre attendent encore leurs notes.',
      createdAt: new Date().toISOString() },
    { id: 'al-4', type: 'STUDENT_REPEATED_ABSENCE', severity: 'WARNING', title: 'Absenteisme repete',
      message: 'Yao Brou (EDU-2026-000031) cumule 7 absences non justifiees.',
      studentName: 'Yao Brou', createdAt: new Date().toISOString() }
  ],
  upcomingAssessments: MOCK_UPCOMING_ASSESSMENTS,
  classesNeedingAttention: MOCK_CLASSROOMS.filter((c) => c.capacityStatus !== 'AVAILABLE')
};
