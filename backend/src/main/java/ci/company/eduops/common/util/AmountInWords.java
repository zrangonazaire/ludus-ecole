package ci.company.eduops.common.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Spells an amount in French, as legally expected on a receipt:
 * {@code 1 250 000} becomes "un million deux cent cinquante mille".
 */
public final class AmountInWords {

    private static final String[] UNITS = {
            "zero", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
            "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
            "dix-sept", "dix-huit", "dix-neuf"
    };

    private static final String[] TENS = {
            "", "", "vingt", "trente", "quarante", "cinquante",
            "soixante", "soixante", "quatre-vingt", "quatre-vingt"
    };

    private AmountInWords() {
        // utility class
    }

    public static String toFrench(BigDecimal amount, String currencyLabel) {
        if (amount == null) {
            return "";
        }
        long integerPart = amount.setScale(0, RoundingMode.DOWN).longValue();
        String words = spell(integerPart);
        String suffix = currencyLabel == null || currencyLabel.isBlank() ? "" : " " + currencyLabel;
        return capitalize(words) + suffix;
    }

    private static String spell(long value) {
        return spell(value, true);
    }

    /**
     * Spells a number, honouring the French agreement rule for {@code cent} and
     * {@code vingt}: they take an "s" only when they are multiplied <em>and</em>
     * end the number.
     *
     * <p>{@code mille} is a numeral adjective, so it blocks the agreement:
     * 200 000 is "deux cent mille". {@code million} and {@code milliard} are
     * nouns, so they do not: 200 000 000 is "deux cents millions".</p>
     *
     * @param standalone {@code false} when the number continues with a numeral
     *                   that blocks the plural (i.e. when spelling the
     *                   multiplier of {@code mille})
     */
    private static String spell(long value, boolean standalone) {
        if (value == 0) {
            return UNITS[0];
        }
        if (value < 0) {
            return "moins " + spell(-value, standalone);
        }
        if (value >= 1_000_000_000L) {
            long count = value / 1_000_000_000L;
            // "milliard" is a noun: the multiplier keeps its plural.
            return join(count == 1 ? "un milliard" : spell(count, true) + " milliards",
                    spell(value % 1_000_000_000L, standalone));
        }
        if (value >= 1_000_000L) {
            long count = value / 1_000_000L;
            // "million" is a noun: the multiplier keeps its plural.
            return join(count == 1 ? "un million" : spell(count, true) + " millions",
                    spell(value % 1_000_000L, standalone));
        }
        if (value >= 1000L) {
            long count = value / 1000L;
            // "mille" is a numeral: it blocks the plural of cent and vingt.
            return join(count == 1 ? "mille" : spell(count, false) + " mille",
                    spell(value % 1000L, standalone));
        }
        if (value >= 100L) {
            long count = value / 100L;
            String hundreds = count == 1 ? "cent" : UNITS[(int) count] + " cent";
            long rest = value % 100L;
            if (count > 1 && rest == 0 && standalone) {
                hundreds = hundreds + "s";
            }
            return join(hundreds, spell(rest, standalone));
        }
        if (value < 20L) {
            return UNITS[(int) value];
        }
        int tens = (int) (value / 10L);
        int rest = (int) (value % 10L);
        String base = TENS[tens];
        // 70 and 90 are built as 60+10 and 80+10 in French.
        if (tens == 7 || tens == 9) {
            rest += 10;
            return base + linker(rest) + UNITS[rest];
        }
        if (rest == 0) {
            return tens == 8 && standalone ? base + "s" : base;
        }
        return base + linker(rest) + UNITS[rest];
    }

    private static String linker(int rest) {
        return rest == 1 || rest == 11 ? "-et-" : "-";
    }

    private static String join(String left, String right) {
        if (right == null || right.isBlank() || right.equals(UNITS[0])) {
            return left;
        }
        return left + " " + right;
    }

    private static String capitalize(String value) {
        if (value == null || value.isEmpty()) {
            return value;
        }
        return Character.toUpperCase(value.charAt(0)) + value.substring(1);
    }
}
