package ci.company.eduops.messaging.domain;

/** What a campaign is for. */
public enum CampaignKind {

    /** Relance alimentée par un module : le logiciel sait déjà qui écrire. */
    REMINDER,
    /** Message libre à une classe, un niveau, l'établissement. */
    ANNOUNCEMENT;

    public boolean isReminder() {
        return this == REMINDER;
    }
}
