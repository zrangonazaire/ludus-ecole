export type ReminderChannel = 'EMAIL' | 'SMS' | 'WHATSAPP';

export interface OutstandingReminderPreparePayload {
  studentIds: string[];
  channel: ReminderChannel;
  title: string;
  subject?: string;
  bodyTemplate: string;
}

export interface OutstandingReminderPreview {
  campaignId: string;
  title: string;
  channel: ReminderChannel;
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
  recipients: OutstandingReminderPreviewRecipient[];
}

export interface OutstandingReminderPreviewRecipient {
  name: string;
  address: string;
}

export interface OutstandingReminderRecipient {
  name: string;
  address: string;
  status: string;
  failureReason?: string;
  sentAt?: string;
}

export interface OutstandingReminderSendResult {
  campaignId: string;
  status: string;
  sentCount: number;
  failedCount: number;
  recipients: OutstandingReminderRecipient[];
}
