package ci.company.eduops.messaging.service;

/**
 * The one place the product touches an SMS operator.
 *
 * <p>Business code depends on this interface only, never on Orange, MTN or an
 * aggregator: swapping one for another changes no business class, exactly as
 * {@code MailService} does for e-mail.</p>
 *
 * <p>Until a real operator is wired in, {@link LoggingSmsGateway} implements
 * it by writing to the log and returning a fake reference. That is the safe
 * default: a half-configured gateway that silently sends nothing is far less
 * damaging than one that silently sends everything.</p>
 */
public interface SmsGateway {

    /**
     * Sends one message and returns the operator's reference.
     *
     * @param phone     the recipient, in international form
     * @param body      the message, already rendered for this recipient
     * @param senderName the name shown instead of a number, when allowed
     * @return the operator reference, used later to trace a complaint
     * @throws SmsDeliveryException when the operator refuses the message
     */
    String send(String phone, String body, String senderName);

    /**
     * Whether messages actually leave the building.
     *
     * <p>The screen shows this. A school that believes it is chasing unpaid
     * fees while nothing is being sent will notice far too late — at the end
     * of term, when nobody has paid.</p>
     */
    boolean isLive();

    /** A short name for the log and the screen: « Simulation », « Orange CI ». */
    String describe();
}
