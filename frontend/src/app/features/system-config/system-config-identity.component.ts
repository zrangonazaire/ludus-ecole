import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdministrationComponent } from '../administration/administration.component';

/**
 * Onglet Identite : reutilise l'ecran Paramètres tel quel.
 *
 * Aucune duplication : le contenu (identite, coordonnees, preferences,
 * numerotation, logo, code/statut) est celui de `AdministrationComponent`
 * (`GET`/`PUT /api/v1/school`). Toute evolution de l'ecran se repercute ici.
 */
@Component({
  selector: 'eduops-system-config-identity',
  standalone: true,
  imports: [AdministrationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<eduops-administration />`
})
export class SystemConfigIdentityComponent {}
