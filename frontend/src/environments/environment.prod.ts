/** Production environment: real API, service worker on, minimal logging. */
export const environment = {
  production: true,
  apiBaseUrl: '/api/v1',
  wsUrl: '/ws',
  useMockData: false,
  schoolName: 'Groupe Scolaire Horizon',
  currency: 'XOF',
  /**
   * Tarif d'entrée affiché sur la page d'accueil.
   *
   * Valeur d'attente : à remplacer par le tarif réel. C'est le seul endroit
   * à modifier — le bandeau et toute future grille de prix le lisent ici.
   */
  pricing: {
    startingFrom: 25000,
    period: 'mois',
    note: 'Sans engagement'
  },
  locale: 'fr-CI',
  gradingScaleMax: 20,
  enableServiceWorker: true,
  logLevel: 'error' as const
};
