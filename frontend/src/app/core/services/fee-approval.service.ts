import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ApprovalExecution } from '@core/models/approval-execution.models';
import { FeeTypeUpsertPayload, FeeSchedulePayload, FeeApplyPayload } from '@core/models/fee.models';

@Injectable({ providedIn: 'root' })
export class FeeApprovalService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/fees`;
  list() { return this.http.get<ApprovalExecution[]>(`${this.base}/requests`); }
  decide(id: string, decision: 'APPROVE' | 'REJECT', comment: string) {
    return this.http.post<ApprovalExecution>(`${this.base}/requests/${id}/decision`, { decision, comment });
  }
  createType(body: FeeTypeUpsertPayload, circuitId: string) {
    return this.http.post<ApprovalExecution>(`${this.base}/types`, body, { params: { circuitId } });
  }
  updateType(id: string, body: FeeTypeUpsertPayload, circuitId: string) {
    return this.http.put<ApprovalExecution>(`${this.base}/types/${id}`, body, { params: { circuitId } });
  }
  archiveType(id: string, circuitId: string) {
    return this.http.post<ApprovalExecution>(`${this.base}/types/${id}/archive`, {}, { params: { circuitId } });
  }
  saveSchedule(body: FeeSchedulePayload, circuitId: string) {
    return this.http.put<ApprovalExecution>(`${this.base}/schedules`, body, { params: { circuitId } });
  }
  deleteSchedule(id: string, circuitId: string) {
    return this.http.delete<ApprovalExecution>(`${this.base}/schedules/${id}`, { params: { circuitId } });
  }
  apply(body: FeeApplyPayload, circuitId: string) {
    return this.http.post<ApprovalExecution>(`${this.base}/apply`, body, { params: { circuitId } });
  }
}
