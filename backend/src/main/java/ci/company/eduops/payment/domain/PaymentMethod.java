package ci.company.eduops.payment.domain;

public enum PaymentMethod {
    CASH, BANK_TRANSFER, CARD, MOBILE_MONEY, CHEQUE, OTHER;

    /** Methods that must be tied to an open cash session. */
    public boolean requiresCashSession() {
        return this == CASH;
    }
}
