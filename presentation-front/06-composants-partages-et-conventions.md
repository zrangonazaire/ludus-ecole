# Composants partagés et conventions

Cette annexe décrit les **briques UI réutilisables** (`shared/ui`) et les **conventions**
communes à tous les écrans. Les écrans sont construits par assemblage de ces composants,
ce qui garantit une cohérence visuelle et comportementale.

---

## 1. Composants UI (`shared/ui`)

| Composant | Rôle |
|-----------|------|
| `data-table` | Tableau paginé et triable avec colonnes configurables, caption accessible et événement de changement de page. Utilisé par : élèves, inscriptions, enseignants, paiements. |
| `kpi-card` | Carte d'indicateur clé (valeur + libellé). Utilisée sur le dashboard. |
| `chart-card` | Carte de graphique (barres, ligne, aire) avec titre et sous-titre. |
| `status-badge` | Badge de statut coloré (élève, inscription, paiement, capacité…). |
| `avatar` | Avatar avec initiales ou photo (tailles xs → xl). |
| `loading-state` | État de chargement (message optionnel). |
| `error-state` | État d'erreur avec bouton « Réessayer ». |
| `empty-state` | État vide avec titre et message. Utilisé par le placeholder. |
| `confirm-dialog` | Boîte de dialogue de confirmation, avec mode danger et **motif obligatoire**. Utilisée pour l'annulation d'un paiement. |
| `toast-host` | Conteneur de notifications (toasts de succès/erreur), monté globalement dans `app.component.ts`. |

## 2. Directives et pipes (`shared`)

- **`has-permission`** : directive structurelle qui affiche un élément seulement si le
  compte possède la permission donnée (ex. bouton « Nouvelle inscription », « Annuler »).
- **`money`** : pipe de formatage monétaire (affichage XOF).
- **`grade`** : pipe de formatage de note.
- **`status-label`** : pipe de libellé lisible pour un code de statut.

## 3. Patron commun à chaque écran de données

Tous les écrans qui affichent des données suivent le même patron :

1. **Injection d'une source de données** (token `*_DATA_SOURCE`) — jamais d'appel direct à
   `HttpClient` dans les composants. Le mode mock/API est décidé à la configuration.
2. **États gérés par signaux** : `loading`, `error`, et les données (`data`).
3. **Rendu en 3 états** : `@if (loading)` → `loading-state` ; `@else if (error)` →
   `error-state` (réessayer) ; `@else` → le contenu, avec état vide via `@empty`.

## 4. Temps réel et rafraîchissement

- Le service **WebSocket** ouvre un canal dès qu'une session existe (et se ferme à la
  déconnexion) — voir `app.component.ts`.
- Le **dashboard** s'abonne aux événements de domaine (inscription, appel, absence,
  paiement, alerte) et se **rafraîchit en direct** sans rechargement.
- La **topbar admin** affiche un indicateur d'état du canal temps réel.

## 5. Sécurité et robustesse

- **Guards** : `authGuard` (session requise), `roleGuard` (rôle requis),
  `permissionGuard` (permission requise). Les données de route (`data.title`) sont
  utilisées par les écrans.
- **Intercepteurs HTTP** : corrélation (ID de requête), authentification (jeton), erreurs.
- **Idempotence** : l'inscription et la prise d'appel portent une **clé d'idempotence**
  (UUID) pour empêcher les doublons en cas de double clic ou de reconnexion.
- **Tokens** : conservés en mémoire + `sessionStorage` (pour survivre au rechargement),
  effacés à la déconnexion (minimisation des données locales).
- **PWA** : service worker activé hors dev (mode hors-ligne, adapté aux zones à faible
  débit). La prise d'appel est conçue pour fonctionner hors-ligne puis se synchroniser.

## 6. Thème et langues

- Interface en **français** (locale `fr` enregistrée), dates au format `fr-FR`.
- Variables CSS (`--space`, `--text`, `--brand`, `--danger`, `--warning`, `--success`…)
  pour un thème cohérent.
- Accessibilité : labels visuellement masqués, `aria-label` sur les boutons d'icône,
  tableaux avec `caption`, états `role="alert"` pour les erreurs.
