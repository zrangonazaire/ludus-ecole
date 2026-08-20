import { WsEventType } from './websocket-events';

/** Message shape emitted by the backend event relay. */
export interface WsMessage<T = Record<string, unknown>> {
  eventType: WsEventType;
  aggregateType: string;
  aggregateId: string;
  occurredAt: string;
  correlationId?: string;
  academicYearId?: string;
  classroomId?: string;
  studentId?: string;
  payload: T;
}

export type WsConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
