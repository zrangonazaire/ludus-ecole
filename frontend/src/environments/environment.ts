/** Development environment: mock data sources, verbose logging. */
export const environment = {
  production: false,
  apiBaseUrl: '/api/v1',
  wsUrl: '/ws',
  /** Switch to false to hit the real backend instead of the mock services. */
  useMockData: true,
  schoolName: 'Groupe Scolaire Horizon',
  currency: 'XOF',
  locale: 'fr-CI',
  gradingScaleMax: 20,
  enableServiceWorker: false,
  logLevel: 'debug' as const
};
