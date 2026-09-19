package ci.company.eduops.finance.domain;

/** État d'une demande de réduction dans son circuit de validation. */
public enum DiscountRequestStatus {
    SUBMITTED, APPROVED, REJECTED, CANCELLED, EFFECTIVE;
}
