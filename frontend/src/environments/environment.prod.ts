/** Production environment: real API, service worker on, minimal logging. */
export const environment = {
  production: true,
  apiBaseUrl: '/api/v1',
  wsUrl: '/ws',
  useMockData: false,
  schoolName: 'Groupe Scolaire Horizon',
  currency: 'XOF',
  locale: 'fr-CI',
  gradingScaleMax: 20,
  enableServiceWorker: true,
  logLevel: 'error' as const
};
