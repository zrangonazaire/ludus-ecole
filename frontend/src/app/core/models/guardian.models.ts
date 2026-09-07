/** Administrative view of a legal representative and linked pupils. */
export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  phoneSecondary?: string;
  email?: string;
  profession?: string;
  city?: string;
  preferredChannel: string;
  status: string;
  students: GuardianStudent[];
}

export interface GuardianStudent {
  id: string;
  name: string;
  studentNumber: string;
}

export interface GuardianQuery {
  page?: number;
  size?: number;
  search?: string;
}
