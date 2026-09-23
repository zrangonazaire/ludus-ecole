import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS as P } from '@core/models/auth.models';
import { SystemConfigIdentityComponent } from './system-config-identity.component';
import { SystemConfigAppearanceComponent } from './system-config-appearance.component';
import { SystemConfigCircuitComponent } from './system-config-circuit.component';

type TabKey = 'IDENTITY' | 'APPEARANCE' | 'CIRCUIT';

/**
 * Configuration systeme : 3 onglets.
 *
 * Identite = parametrage de l'etablissement (GET/PUT /api/v1/school).
 * Apparence et region = affichage de ce navigateur (couleur, taille de
 * police, devise, langue, fuseau, en localStorage). Circuit de validation =
 * modele hierarchique des reductions de scolarite : N niveaux ordonnes,
 * chacun confie a un profil et a un utilisateur nomme.
 */
@Component({
  selector: 'eduops-system-config',
  standalone: true,
  imports: [RouterLink, SystemConfigIdentityComponent,
    SystemConfigAppearanceComponent, SystemConfigCircuitComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './system-config.component.html',
  styleUrl: './system-config.component.scss'
})
export class SystemConfigComponent {
  readonly auth = inject(AuthService);
  readonly tab = signal<TabKey>('IDENTITY');
  readonly tabs: readonly { key: TabKey; label: string; hint: string }[] = [
    { key: 'IDENTITY', label: 'Identité', hint: 'Paramétrage de l’établissement' },
    { key: 'APPEARANCE', label: 'Apparence et région', hint: 'Affichage de ce navigateur' },
    { key: 'CIRCUIT', label: 'Circuit de validation', hint: 'Réductions de scolarité' }
  ];
  readonly canSeeCircuit = computed(() =>
    this.auth.hasAny(P.SCHOOL_VIEW, P.DISCOUNT_REQUEST_VIEW, P.DISCOUNT_REQUEST_MANAGE));
}
