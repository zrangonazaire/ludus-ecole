package ci.company.eduops.messaging.service;

/**
 * One message the operator refused.
 *
 * <p>Deliberately not a {@code BusinessException}: a single rejected number
 * must not roll back a campaign of four hundred. The sender catches this per
 * recipient, records the reason on that row, and carries on.</p>
 */
public class SmsDeliveryException extends RuntimeException {

    public SmsDeliveryException(String message) {
        super(message);
    }

    public SmsDeliveryException(String message, Throwable cause) {
        super(message, cause);
    }
}
