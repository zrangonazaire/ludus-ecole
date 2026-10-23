export type AnnouncementChannel = 'EMAIL' | 'SMS' | 'WHATSAPP';

export interface AnnouncementPreparePayload {
  studentIds: string[];
  channel: AnnouncementChannel;
  title: string;
  subject?: string;
  bodyTemplate: string;
  collectResponses: boolean;
  responseQuestion?: string;
}

export interface AnnouncementPreview {
  campaignId: string;
  title: string;
  channel: AnnouncementChannel;
  recipientCount: number;
  unreachableCount: number;
  unreachable: string[];
  withoutConsent: number;
  sample?: string;
  sampleIsExample: boolean;
  estimatedCost?: number;
  currency: string;
  smsSegments: number;
  gatewayLive: boolean;
  gatewayName: string;
  recipients: { name: string; address: string }[];
}

export interface AnnouncementSendResult {
  campaignId: string;
  status: string;
  sentCount: number;
  failedCount: number;
  recipients: {
    name: string;
    address: string;
    status: string;
    failureReason?: string;
    sentAt?: string;
  }[];
}

export interface OpinionRequest {
  schoolName: string;
  campaignTitle: string;
  question: string;
  answered: boolean;
  expiresAt: string;
}

export interface ReceivedOpinionResponse {
  id: string;
  campaignTitle: string;
  recipientName: string;
  recipientAddress: string;
  answer: string;
  answeredAt: string;
}
