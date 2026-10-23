import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import {
  AnnouncementPreparePayload, AnnouncementPreview, AnnouncementSendResult,
  OpinionRequest, ReceivedOpinionResponse
} from '@core/models/announcement.models';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/messages/announcements`;

  prepare(payload: AnnouncementPreparePayload) {
    return this.http.post<AnnouncementPreview>(`${this.url}/prepare`, payload);
  }

  send(campaignId: string) {
    return this.http.post<AnnouncementSendResult>(`${this.url}/${campaignId}/send`, {});
  }

  responses() {
    return this.http.get<ReceivedOpinionResponse[]>(`${this.url}/responses`);
  }

  opinionRequest(token: string) {
    return this.http.get<OpinionRequest>(`${environment.apiBaseUrl}/public/opinion-responses/${encodeURIComponent(token)}`);
  }

  submitOpinion(token: string, answer: string) {
    return this.http.post<void>(`${environment.apiBaseUrl}/public/opinion-responses/${encodeURIComponent(token)}`, { answer });
  }
}
