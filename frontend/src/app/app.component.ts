import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastHostComponent } from '@shared/ui/toast-host/toast-host.component';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';

@Component({
  selector: 'eduops-root',
  standalone: true,
  imports: [RouterOutlet, ToastHostComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet />
    <eduops-toast-host />
  `
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly ws = inject(WebSocketService);

  constructor() {
    // Open the realtime channel as soon as a session exists, close it on logout.
    effect(() => {
      if (this.auth.isAuthenticated()) {
        // Fire and forget: a realtime failure must never block the UI.
        void this.ws.connect();
      } else {
        this.ws.disconnect();
      }
    }, { allowSignalWrites: true });
  }
}
