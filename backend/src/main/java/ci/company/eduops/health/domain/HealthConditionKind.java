package ci.company.eduops.health.domain;

/** What kind of thing is recorded on the health file. */
public enum HealthConditionKind {

    ALLERGY,
    CHRONIC_ILLNESS,
    /** Traitement en cours, avec ou sans médicament conservé à l'école. */
    TREATMENT,
    DISABILITY,
    /** Régime particulier à la cantine. */
    DIETARY,
    OTHER;

    /**
     * Whether a medicine kept at school is expected for this kind.
     *
     * <p>Used to warn — never to refuse: a treatment can perfectly well be
     * taken at home, and an allergy managed by avoidance alone.</p>
     */
    public boolean expectsMedication() {
        return this == TREATMENT || this == CHRONIC_ILLNESS;
    }
}
