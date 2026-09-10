import { ContractType } from './staff.models';

export interface TeacherCreatePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  speciality: string;
  qualification: string;
  hireDate: string;
  contractType: ContractType;
  weeklyHoursMax: number;
}
