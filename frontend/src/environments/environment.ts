/** Development environment: mock data sources, verbose logging. */
export const environment = {
  production: false,
  apiBaseUrl: '/api/v1',
  wsUrl: '/ws',
  /**
   * Faux : l'application parle au vrai serveur.
   *
   * À vrai, toutes les sources de données basculent sur leur version de
   * démonstration, et chaque magasin s'amorce tout seul dans son constructeur.
   * L'école témoin apparaît alors quel que soit le compte créé — et
   * `SignupService` ne contacte même pas le serveur : il fabrique sa réponse.
   * C'est commode pour montrer le produit, trompeur pour le configurer.
   */
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
  enableServiceWorker: false,
  logLevel: 'debug' as const
};
