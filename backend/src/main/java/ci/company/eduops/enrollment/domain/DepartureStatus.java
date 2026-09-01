package ci.company.eduops.enrollment.domain;

/** Life of a departure record. */
public enum DepartureStatus {

    DRAFT,
    /** La sortie est enregistrée ; les pièces restent à remettre. */
    RECORDED,
    /** Tout est remis : le dossier est soldé et peut être classé. */
    CLEARED,
    CANCELLED;

    /** A cancelled departure frees the enrollment; a cleared one is finished. */
    public boolean isEditable() {
        return this == DRAFT || this == RECORDED;
    }
}
