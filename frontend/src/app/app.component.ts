import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastHostComponent } from '@shared/ui/toast-host/toast-host.component';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { PageHelpComponent } from '@shared/ui/page-help/page-help.component';
import { AppearancePreferencesService } from '@features/system-config/appearance-preferences.service';
import { I18nService } from '@core/services/i18n.service';

@Component({
  selector: 'eduops-root',
  standalone: true,
  imports: [RouterOutlet, ToastHostComponent, PageHelpComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet />
    <eduops-page-help />
    <eduops-toast-host />
  `
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly ws = inject(WebSocketService);
  // Ensure appearance & language preferences are applied at application startup.
  private readonly appearance = inject(AppearancePreferencesService);
  private readonly i18n = inject(I18nService);

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
