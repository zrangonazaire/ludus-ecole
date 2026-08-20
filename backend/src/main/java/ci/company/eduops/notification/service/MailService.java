package ci.company.eduops.notification.service;

import java.util.Map;

/**
 * Mail abstraction (section 8).
 *
 * <p>Business code depends on this interface only, never on Mailpit or on a
 * particular SMTP relay: DEV uses Mailpit, TEST captures, PROD uses the real
 * relay, and swapping one for another changes no business class.</p>
 */
public interface MailService {

    /** Sends a plain message. */
    void send(String to, String subject, String body);

    /**
     * Renders a stored template and sends it.
     *
     * @param templateCode code of a row in {@code notification_template}
     * @param variables    values substituted into the template placeholders
     */
    void sendTemplate(String to, String templateCode, Map<String, Object> variables);

    /** Sends an HTML message. */
    void sendHtml(String to, String subject, String htmlBody);
}
