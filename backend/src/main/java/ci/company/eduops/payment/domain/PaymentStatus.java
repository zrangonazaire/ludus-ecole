package ci.company.eduops.payment.domain;

public enum PaymentStatus {
    PENDING, VALIDATED, CANCELLED, REVERSED, FAILED;

    /** Rule 7: a validated payment is never physically deleted. */
    public boolean isImmutable() {
        return this == VALIDATED || this == REVERSED;
    }

    public boolean countsTowardsBalance() {
        return this == VALIDATED;
    }

    public boolean canBeCancelled() {
        return this == PENDING || this == VALIDATED;
    }
}
