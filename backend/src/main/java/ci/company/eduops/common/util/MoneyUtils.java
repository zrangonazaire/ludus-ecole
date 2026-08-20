package ci.company.eduops.common.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Money helpers. Rule 18: financial data never touches float or double, and
 * every amount is normalised to two decimals with HALF_UP rounding.
 */
public final class MoneyUtils {

    public static final int SCALE = 2;
    public static final RoundingMode ROUNDING = RoundingMode.HALF_UP;
    public static final BigDecimal ZERO = BigDecimal.ZERO.setScale(SCALE, ROUNDING);

    private MoneyUtils() {
        // utility class
    }

    public static BigDecimal normalize(BigDecimal value) {
        return value == null ? ZERO : value.setScale(SCALE, ROUNDING);
    }

    public static BigDecimal add(BigDecimal left, BigDecimal right) {
        return normalize(nullToZero(left).add(nullToZero(right)));
    }

    public static BigDecimal subtract(BigDecimal left, BigDecimal right) {
        return normalize(nullToZero(left).subtract(nullToZero(right)));
    }

    public static BigDecimal multiply(BigDecimal left, BigDecimal right) {
        return normalize(nullToZero(left).multiply(nullToZero(right)));
    }

    /** Applies a percentage, e.g. {@code percentageOf(600000, 25)} = 150000.00. */
    public static BigDecimal percentageOf(BigDecimal base, BigDecimal percentage) {
        return normalize(nullToZero(base)
                .multiply(nullToZero(percentage))
                .divide(BigDecimal.valueOf(100), SCALE + 4, ROUNDING));
    }

    public static BigDecimal min(BigDecimal left, BigDecimal right) {
        return nullToZero(left).compareTo(nullToZero(right)) <= 0 ? normalize(left) : normalize(right);
    }

    public static BigDecimal max(BigDecimal left, BigDecimal right) {
        return nullToZero(left).compareTo(nullToZero(right)) >= 0 ? normalize(left) : normalize(right);
    }

    public static boolean isPositive(BigDecimal value) {
        return value != null && value.compareTo(BigDecimal.ZERO) > 0;
    }

    public static boolean isZeroOrLess(BigDecimal value) {
        return value == null || value.compareTo(BigDecimal.ZERO) <= 0;
    }

    public static boolean isGreaterThan(BigDecimal left, BigDecimal right) {
        return nullToZero(left).compareTo(nullToZero(right)) > 0;
    }

    public static BigDecimal nullToZero(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}
