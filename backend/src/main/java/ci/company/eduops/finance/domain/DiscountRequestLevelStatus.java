package ci.company.eduops.finance.domain;

/** État d'un palier de validation d'une demande de réduction. */
public enum DiscountRequestLevelStatus {
    PENDING, APPROVED, REJECTED, SKIPPED;
}
