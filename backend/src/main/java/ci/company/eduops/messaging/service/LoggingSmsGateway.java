package ci.company.eduops.messaging.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

/**
 * The default gateway: it writes to the log and sends nothing.
 *
 * <p>Deliberately <strong>not</strong> annotated. It is declared by {@link
 * ci.company.eduops.messaging.config.MessagingConfiguration}, whose {@code
 * @Bean} method carries {@code @ConditionalOnMissingBean} — the annotation
 * only works reliably there. Placed on a component-scanned {@code @Service}
 * it is evaluated while the registry is still filling, and the bean silently
 * disappears; which is exactly what happened, and what stopped the
 * application from starting.</p>
 *
 * <p>Refusing to send is the safe default. A school that believes messages are
 * leaving while they are not will find out at the end of term; a school whose
 * half-configured gateway sends four hundred real SMS during a test will find
 * out immediately, and expensively. Which is why {@link #isLive()} returns
 * false and the screen says so in plain words.</p>
 */
public class LoggingSmsGateway implements SmsGateway {

    private static final Logger log = LoggerFactory.getLogger(LoggingSmsGateway.class);

    @Override
    public String send(String phone, String body, String senderName) {
        if (phone == null || phone.isBlank()) {
            // Le meme refus qu'un operateur : mieux vaut echouer ici que
            // decouvrir des lignes de journal sans destinataire.
            throw new SmsDeliveryException("Numéro de téléphone absent.");
        }
        log.info("SMS SIMULÉ vers {} (expéditeur « {} »), {} caractère(s) : {}",
                mask(phone), senderName, body == null ? 0 : body.length(), body);
        return "simulation-" + UUID.randomUUID();
    }

    @Override
    public boolean isLive() {
        return false;
    }

    @Override
    public String describe() {
        return "Simulation (aucun message n'est envoyé)";
    }

    /**
     * Masks the middle of a number in the log.
     *
     * <p>An application log is read by more people than a database, and gets
     * copied into tickets. A parent's telephone number has no business being
     * there in full.</p>
     */
    private String mask(String phone) {
        String trimmed = phone.trim();
        if (trimmed.length() <= 6) {
            return "***";
        }
        return trimmed.substring(0, 4) + "***"
                + trimmed.substring(trimmed.length() - 2);
    }
}
