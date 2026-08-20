package ci.company.eduops.common.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.UUID;

/**
 * Produces the unguessable code printed (and QR-encoded) on official documents
 * so a third party can verify a report card or a receipt online (section 74).
 */
@Component
public class VerificationCodeGenerator {

    private static final String ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1
    private static final int DEFAULT_LENGTH = 12;

    private final SecureRandom random = new SecureRandom();

    public String generate() {
        return generate(DEFAULT_LENGTH);
    }

    public String generate(int length) {
        StringBuilder builder = new StringBuilder(length + length / 4);
        for (int i = 0; i < length; i++) {
            if (i > 0 && i % 4 == 0) {
                builder.append('-');
            }
            builder.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
        }
        return builder.toString();
    }

    /** Deterministic variant used when the code must be reproducible from an id. */
    public String fromUuid(UUID uuid) {
        long bits = uuid.getMostSignificantBits() ^ uuid.getLeastSignificantBits();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < DEFAULT_LENGTH; i++) {
            if (i > 0 && i % 4 == 0) {
                builder.append('-');
            }
            builder.append(ALPHABET.charAt((int) Math.abs((bits >> (i * 5)) % ALPHABET.length())));
        }
        return builder.toString();
    }
}
