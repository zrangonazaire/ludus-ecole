package ci.company.eduops.attendance.dto.request;

/** What the follow-up list shows. The counters above it never move. */
public enum AbsenceFilter {

    /** Everything recorded over the window. */
    ALL,

    /** Absences and latenesses with no justification yet. */
    UNJUSTIFIED,

    /** Unjustified for two days or more: the ones to chase today. */
    FOLLOW_UP,

    /** Already justified, kept visible so a justification can be corrected. */
    JUSTIFIED,

    /** Latenesses only. */
    LATENESS
}
