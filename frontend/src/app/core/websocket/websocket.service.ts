import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { environment } from '@env/environment';
import { AuthService } from '../auth/auth.service';
import { WS_CHANNELS, WsChannel, WsEventType } from './websocket-events';
import { WsConnectionState, WsMessage } from './websocket.models';

/**
 * STOMP-over-SockJS client feeding the live dashboard (section 77).
 *
 * Reconnects with a backoff and never throws into the UI: a lost socket
 * degrades to a manual refresh, it does not break the page.
 */
@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private readonly auth = inject(AuthService);

  private client?: Client;
  private readonly subscriptions = new Map<string, StompSubscription>();
  private readonly messages$ = new Subject<WsMessage>();

  private readonly _state = signal<WsConnectionState>('idle');
  readonly state = this._state.asReadonly();

  /**
   * Opens the realtime channel.
   *
   * <p>SockJS is imported lazily: the library reads `global` while its module is
   * evaluated, which does not exist in a browser bundle. Loading it on demand
   * keeps it out of the startup path entirely, so the application boots even
   * when realtime is disabled.</p>
   */
  async connect(): Promise<void> {
    if (environment.useMockData || this.client?.active) {
      return;
    }
    const token = this.auth.accessToken();
    if (!token) {
      return;
    }

    this._state.set('connecting');

    const SockJS = (await import('sockjs-client')).default;

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${environment.wsUrl}?access_token=${token}`),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        this._state.set('connected');
        Object.values(WS_CHANNELS).forEach((channel) => this.subscribeTo(channel));
      },
      onWebSocketClose: () => this._state.set('reconnecting'),
      onStompError: () => this._state.set('disconnected'),
      debug: () => undefined
    });
    this.client.activate();
  }

  disconnect(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    void this.client?.deactivate();
    this._state.set('disconnected');
  }

  /** Stream of every message, whatever the channel. */
  all(): Observable<WsMessage> {
    return this.messages$.asObservable();
  }

  /** Stream filtered on one or more event types. */
  on<T = Record<string, unknown>>(...types: WsEventType[]): Observable<WsMessage<T>> {
    return this.messages$.pipe(
      filter((message) => types.includes(message.eventType))
    ) as Observable<WsMessage<T>>;
  }

  private subscribeTo(channel: WsChannel): void {
    if (!this.client?.connected || this.subscriptions.has(channel)) {
      return;
    }
    const subscription = this.client.subscribe(channel, (message: IMessage) => {
      try {
        this.messages$.next(JSON.parse(message.body) as WsMessage);
      } catch {
        // A malformed frame must never break the socket.
      }
    });
    this.subscriptions.set(channel, subscription);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
