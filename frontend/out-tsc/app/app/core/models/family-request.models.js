export const FAMILY_REQUEST_TYPES = [
    { code: 'SCHOOL_CERTIFICATE', label: 'Certificat de scolarité' },
    { code: 'ENROLLMENT_CERTIFICATE', label: "Attestation d'inscription" },
    { code: 'REPORT_CARD_COPY', label: 'Duplicata de bulletin' },
    { code: 'TRANSCRIPT', label: 'Relevé de notes' },
    { code: 'TRANSFER_DOCUMENTS', label: 'Dossier de transfert' },
    { code: 'PAYMENT_STATEMENT', label: 'Situation de paiement' },
    { code: 'DATA_CORRECTION', label: "Correction d'informations" },
    { code: 'APPOINTMENT', label: 'Demande de rendez-vous' },
    { code: 'OTHER', label: 'Autre demande' }
];
export const FAMILY_REQUEST_STATUSES = [
    { code: 'NEW', label: 'Nouvelle', tone: 'new' },
    { code: 'IN_PROGRESS', label: 'En traitement', tone: 'progress' },
    { code: 'WAITING_FAMILY', label: 'Attente famille', tone: 'waiting' },
    { code: 'READY', label: 'Prête', tone: 'ready' },
    { code: 'COMPLETED', label: 'Terminée', tone: 'done' },
    { code: 'REJECTED', label: 'Refusée', tone: 'rejected' }
];
//# sourceMappingURL=family-request.models.js.map