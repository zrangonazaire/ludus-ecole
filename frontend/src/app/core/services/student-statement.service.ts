import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Enrollment, FinancialSummary, StudentDetail } from '@core/models/domain.models';

export interface StudentStatement {
  schoolName: string; schoolAddress: string; schoolPhone?: string; generatedAt: string;
  student: StudentDetail; enrollments: Enrollment[];
  balances: { academicYearId: string; yearLabel: string; summary: FinancialSummary }[];
  payments: {
    id: string; yearLabel: string; paymentDate: string; reference: string;
    receiptNumber?: string; method: string; status: string; payerName?: string;
    amount: number; allocatedAmount: number; unallocatedAmount: number; currency: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class StudentStatementService {
  private readonly http = inject(HttpClient);
  get(studentId: string) {
    return this.http.get<StudentStatement>(`${environment.apiBaseUrl}/students/${studentId}/statement`);
  }
}
