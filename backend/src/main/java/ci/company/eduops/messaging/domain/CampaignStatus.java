package ci.company.eduops.messaging.domain;

/** Life of a campaign. Nothing leaves DRAFT without an explicit send. */
public enum CampaignStatus {

    /** Destinataires résolus et chiffrés ; rien n'est parti. */
    DRAFT,
    SENDING,
    /** Terminé, même si des destinataires ont échoué individuellement. */
    SENT,
    CANCELLED;

    /** Whether the campaign can still be edited or its recipients recomputed. */
    public boolean isEditable() {
        return this == DRAFT;
    }

    /**
     * Whether sending is still possible.
     *
     * <p>Deliberately excludes SENDING: two clicks on the button must not send
     * a campaign twice, and an SMS cannot be recalled.</p>
     */
    public boolean canSend() {
        return this == DRAFT;
    }
}
