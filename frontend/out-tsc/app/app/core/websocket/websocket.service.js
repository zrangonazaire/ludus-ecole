import { Injectable, inject, signal } from '@angular/core';
import { Subject, filter } from 'rxjs';
import { Client } from '@stomp/stompjs';
import { environment } from '@env/environment';
import { AuthService } from '../auth/auth.service';
import { WS_CHANNELS } from './websocket-events';
import * as i0 from "@angular/core";
/**
 * STOMP-over-SockJS client feeding the live dashboard (section 77).
 *
 * Reconnects with a backoff and never throws into the UI: a lost socket
 * degrades to a manual refresh, it does not break the page.
 */
export class WebSocketService {
    auth = inject(AuthService);
    client;
    subscriptions = new Map();
    messages$ = new Subject();
    _state = signal('idle');
    state = this._state.asReadonly();
    /**
     * Opens the realtime channel.
     *
     * <p>SockJS is imported lazily: the library reads `global` while its module is
     * evaluated, which does not exist in a browser bundle. Loading it on demand
     * keeps it out of the startup path entirely, so the application boots even
     * when realtime is disabled.</p>
     */
    async connect() {
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
    disconnect() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.subscriptions.clear();
        void this.client?.deactivate();
        this._state.set('disconnected');
    }
    /** Stream of every message, whatever the channel. */
    all() {
        return this.messages$.asObservable();
    }
    /** Stream filtered on one or more event types. */
    on(...types) {
        return this.messages$.pipe(filter((message) => types.includes(message.eventType)));
    }
    subscribeTo(channel) {
        if (!this.client?.connected || this.subscriptions.has(channel)) {
            return;
        }
        const subscription = this.client.subscribe(channel, (message) => {
            try {
                this.messages$.next(JSON.parse(message.body));
            }
            catch {
                // A malformed frame must never break the socket.
            }
        });
        this.subscriptions.set(channel, subscription);
    }
    ngOnDestroy() {
        this.disconnect();
    }
    static ɵfac = function WebSocketService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WebSocketService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WebSocketService, factory: WebSocketService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WebSocketService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=websocket.service.js.map