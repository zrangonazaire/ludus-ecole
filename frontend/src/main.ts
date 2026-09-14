import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// crypto.randomUUID n'est disponible que dans un contexte sûr (HTTPS ou
// localhost). Sur un accès HTTP via IP (déploiement provisoire), il est
// absent et fait planter l'app au chargement. On le polyfill ici AVANT le
// bootstrap, quel que soit l'appelant (code applicatif ou dépendance).
if (globalThis.crypto && typeof (globalThis.crypto as any).randomUUID !== 'function') {
  (globalThis.crypto as any).randomUUID ??= () => {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  };
}

bootstrapApplication(AppComponent, appConfig)
  .catch((error) => console.error('Soocloo failed to start', error));
