import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import {
  OutstandingReminderPreparePayload,
  OutstandingReminderPreview,
  OutstandingReminderSendResult
} from '@core/models/outstanding-reminder.models';

@Injectable({ providedIn: 'root' })
export class OutstandingReminderService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/outstanding/reminders`;

  prepare(payload: OutstandingReminderPreparePayload) {
    return this.http.post<OutstandingReminderPreview>(`${this.url}/prepare`, payload);
  }

  send(campaignId: string) {
    return this.http.post<OutstandingReminderSendResult>(`${this.url}/${campaignId}/send`, {});
  }
}
