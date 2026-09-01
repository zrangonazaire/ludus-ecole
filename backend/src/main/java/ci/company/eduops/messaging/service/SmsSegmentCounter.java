package ci.company.eduops.messaging.service;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * How many SMS segments a message really costs, and why.
 *
 * <p>Operators bill by segment, not by message. A message written in the GSM
 * 03.38 alphabet fits 160 characters; one that needs a single character from
 * outside it switches the whole message to UCS-2, where a segment holds 70.
 * A 150-character reminder therefore costs one SMS — or three, if somebody
 * typed « Août » instead of « Aout ».</p>
 *
 * <p>That is not a detail for a school sending four hundred reminders a term.
 * This class is why the screen can say « votre message coûte 3 SMS au lieu de
 * 1, à cause de û » rather than presenting a bill after the fact.</p>
 *
 * <p>The French trap is narrow and worth knowing: {@code é è à ù ì ò É Ä Ö Ñ
 * Ü Ç} are in the basic alphabet, but {@code ê â î ô û ë ï ç œ} are not. The
 * lowercase c-cedilla is absent while the uppercase one is present — which is
 * why « français » is expensive and « FRANÇAIS » is not.</p>
 */
@Component
public class SmsSegmentCounter {

    /** GSM 03.38 basic alphabet: one septet each. */
    private static final String GSM_BASIC =
            "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?"
            + "¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";

    /** Reachable only through an escape: two septets each. */
    private static final String GSM_EXTENDED = "^{}\\[~]|€";

    private static final int GSM_SINGLE = 160;
    private static final int GSM_CONCATENATED = 153;
    private static final int UCS2_SINGLE = 70;
    private static final int UCS2_CONCATENATED = 67;

    /**
     * Substitutions the screen can propose: the accent is dropped, the meaning
     * is not. Only characters that genuinely fall outside the basic alphabet.
     */
    private static final char[][] SUGGESTIONS = {
        {'ê', 'e'}, {'â', 'a'}, {'î', 'i'}, {'ô', 'o'}, {'û', 'u'},
        {'ë', 'e'}, {'ï', 'i'}, {'ü', 'u'}, {'ÿ', 'y'}, {'ç', 'c'},
        {'œ', 'o'}, {'æ', 'a'}, {'À', 'A'}, {'È', 'E'}, {'Ù', 'U'},
        {'Ê', 'E'}, {'Â', 'A'}, {'Î', 'I'}, {'Ô', 'O'}, {'Û', 'U'},
        {'’', '\''}, {'‘', '\''}, {'«', '"'}, {'»', '"'}, {'…', '.'},
        {'–', '-'}, {'—', '-'}
    };

    /** The verdict on one message. */
    public static class Estimate {

        private final boolean unicode;
        private final int characters;
        private final int segments;
        private final List<String> offenders;
        private final String suggestion;

        Estimate(boolean unicode, int characters, int segments,
                 List<String> offenders, String suggestion) {
            this.unicode = unicode;
            this.characters = characters;
            this.segments = segments;
            this.offenders = offenders;
            this.suggestion = suggestion;
        }

        /** True when the message had to fall back to UCS-2. */
        public boolean isUnicode() {
            return unicode;
        }

        /** Billable length: an escaped character counts twice. */
        public int getCharacters() {
            return characters;
        }

        public int getSegments() {
            return segments;
        }

        /** The characters that forced UCS-2, in order of appearance. */
        public List<String> getOffenders() {
            return offenders;
        }

        /**
         * The same message, spellable in the basic alphabet.
         *
         * <p>Null when no substitution helps — the school may be writing in a
         * language the alphabet does not cover, and it is not the product's
         * place to mangle it.</p>
         */
        public String getSuggestion() {
            return suggestion;
        }
    }

    /** Measures a message as an operator would bill it. */
    public Estimate estimate(String body) {
        String text = body == null ? "" : body;

        Set<String> offenders = new LinkedHashSet<>();
        int septets = 0;
        boolean unicode = false;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (GSM_BASIC.indexOf(c) >= 0) {
                septets++;
            } else if (GSM_EXTENDED.indexOf(c) >= 0) {
                // L'echappement coute un septet de plus.
                septets += 2;
            } else {
                unicode = true;
                offenders.add(String.valueOf(c));
            }
        }

        int characters;
        int segments;
        if (unicode) {
            // En UCS-2 on compte les unites de code, pas les points de code :
            // c'est ce que l'operateur facture, et un emoji en occupe deux.
            characters = text.length();
            segments = characters == 0 ? 1
                    : characters <= UCS2_SINGLE ? 1
                    : ceilDiv(characters, UCS2_CONCATENATED);
        } else {
            characters = septets;
            segments = characters == 0 ? 1
                    : characters <= GSM_SINGLE ? 1
                    : ceilDiv(characters, GSM_CONCATENATED);
        }

        String suggestion = unicode ? simplify(text) : null;
        // Une proposition qui ne change rien, ou qui reste hors alphabet, ne
        // vaut pas d'etre affichee.
        if (suggestion != null
                && (suggestion.equals(text) || estimateRaw(suggestion).isUnicode())) {
            suggestion = null;
        }

        return new Estimate(unicode, characters, segments,
                new ArrayList<>(offenders), suggestion);
    }

    /** Cost of one message, in the school's currency unit. */
    public java.math.BigDecimal cost(String body, java.math.BigDecimal unitCost) {
        java.math.BigDecimal unit = unitCost == null
                ? java.math.BigDecimal.ZERO : unitCost;
        return unit.multiply(java.math.BigDecimal.valueOf(estimate(body).getSegments()));
    }

    /** Rewrites a message so it fits the basic alphabet, where possible. */
    public String simplify(String body) {
        if (body == null) {
            return null;
        }
        StringBuilder out = new StringBuilder(body.length());
        for (int i = 0; i < body.length(); i++) {
            char c = body.charAt(i);
            char replacement = c;
            for (char[] pair : SUGGESTIONS) {
                if (pair[0] == c) {
                    replacement = pair[1];
                    break;
                }
            }
            out.append(replacement);
        }
        return out.toString();
    }

    /** Same measurement without the suggestion, to avoid recursing. */
    private Estimate estimateRaw(String text) {
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (GSM_BASIC.indexOf(c) < 0 && GSM_EXTENDED.indexOf(c) < 0) {
                return new Estimate(true, text.length(), 1, List.of(), null);
            }
        }
        return new Estimate(false, text.length(), 1, List.of(), null);
    }

    private int ceilDiv(int value, int divisor) {
        return (value + divisor - 1) / divisor;
    }
}
