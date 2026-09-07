package ci.company.eduops.council.domain;

/**
 * Lifecycle of a class council (conseil de classe).
 *
 * <p>Maps to the {@code council_status} PostgreSQL enum. A council is prepared
 * ({@code PLANNED}), held ({@code IN_PROGRESS}), then sealed ({@code CLOSED}).
 * Decisions may only be recorded while the council is still editable.</p>
 */
public enum CouncilStatus {
    PLANNED,
    IN_PROGRESS,
    CLOSED,
    ARCHIVED;

    /** A council that can still be changed: participants, meeting details, decisions. */
    public boolean isEditable() {
        return this == PLANNED || this == IN_PROGRESS;
    }

    public boolean isClosed() {
        return this == CLOSED || this == ARCHIVED;
    }

    /** Whether a transition from the current status to {@code target} is legal. */
    public boolean canTransitionTo(CouncilStatus target) {
        if (target == null || target == this) {
            return target != null;
        }
        return switch (this) {
            case PLANNED -> target == IN_PROGRESS || target == CLOSED;
            case IN_PROGRESS -> target == CLOSED;
            // A sealed council may only be archived; a archived council never reopens.
            case CLOSED -> target == ARCHIVED;
            case ARCHIVED -> false;
        };
    }
}