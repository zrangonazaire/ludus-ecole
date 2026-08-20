package ci.company.eduops.finance.domain;

/** Payment state of one instalment (section 43). */
public enum StudentFeeStatus {
    PAID, PARTIALLY_PAID, DUE, OVERDUE, WAIVED, CANCELLED;

    public boolean isOutstanding() {
        return this == DUE || this == PARTIALLY_PAID || this == OVERDUE;
    }
}
