/** Official documents issued by a school and kept in the student's file. */
export const OFFICIAL_DOCUMENT_TEMPLATES = [
    {
        type: 'SCHOOL_CERTIFICATE',
        label: 'Certificat de scolarité',
        description: "Certifie que l'élève fréquente régulièrement l'établissement.",
        shortCode: 'CS',
        tone: 'blue'
    },
    {
        type: 'ENROLLMENT_ATTESTATION',
        label: "Attestation d'inscription",
        description: "Confirme l'inscription administrative pour l'année scolaire.",
        shortCode: 'AI',
        tone: 'green'
    },
    {
        type: 'STUDENT_FILE',
        label: 'Fiche individuelle',
        description: "Synthèse officielle de l'identité et de la situation scolaire.",
        shortCode: 'FI',
        tone: 'slate'
    },
    {
        type: 'SUMMONS',
        label: 'Convocation',
        description: "Convocation nominative avec date, heure, lieu et motif.",
        shortCode: 'CV',
        tone: 'amber'
    },
    {
        type: 'STUDENT_CARD',
        label: "Carte d'élève",
        description: "Carte nominative avec matricule et classe de l'élève.",
        shortCode: 'CE',
        tone: 'violet'
    }
];
//# sourceMappingURL=official-document.models.js.map