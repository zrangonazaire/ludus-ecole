package ci.company.eduops.common.util;

import ci.company.eduops.common.entity.NumberSequence;
import ci.company.eduops.common.repository.NumberSequenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Generates the school's business identifiers from a configurable pattern:
 * {@code EDU-{year}-{seq:6}} produces {@code EDU-2026-000123}.
 *
 * <p>Supported placeholders:</p>
 * <ul>
 *   <li>{@code {year}}      - four digit year</li>
 *   <li>{@code {yy}}        - two digit year</li>
 *   <li>{@code {schoolCode}}- the school short code</li>
 *   <li>{@code {seq:n}}     - zero-padded counter on n digits</li>
 * </ul>
 *
 * <p>The counter row is locked with {@code SELECT ... FOR UPDATE} so two
 * concurrent registrars can never obtain the same number.</p>
 */
@Service
public class NumberSequenceService {

    private static final Pattern SEQ_PATTERN = Pattern.compile("\\{seq(?::(\\d+))?}");

    private final NumberSequenceRepository repository;

    public NumberSequenceService(NumberSequenceRepository repository) {
        this.repository = repository;
    }

    /**
     * Reserves the next value for the given scope.
     *
     * <p>Runs in its own transaction: the number stays consumed even if the
     * calling business transaction later rolls back, which is preferable to
     * handing the same number to two different records.</p>
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public String next(UUID schoolId, String scope, String pattern, String schoolCode) {
        String yearPart = String.valueOf(LocalDate.now().getYear());
        long value = nextValue(schoolId, scope, yearPart);
        return format(pattern, yearPart, schoolCode, value);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public String next(UUID schoolId, String scope, String pattern, String schoolCode, String yearPart) {
        long value = nextValue(schoolId, scope, yearPart);
        return format(pattern, yearPart, schoolCode, value);
    }

    private long nextValue(UUID schoolId, String scope, String yearPart) {
        NumberSequence sequence = repository
                .lockBySchoolIdAndScopeAndYearPart(schoolId, scope, yearPart)
                .orElseGet(() -> repository.save(new NumberSequence(schoolId, scope, yearPart)));
        long next = sequence.getCurrentValue() + 1;
        sequence.setCurrentValue(next);
        repository.saveAndFlush(sequence);
        return next;
    }

    /** Renders the pattern; exposed for unit testing and preview screens. */
    public String format(String pattern, String yearPart, String schoolCode, long value) {
        String result = pattern
                .replace("{year}", yearPart)
                .replace("{yy}", yearPart.length() >= 2 ? yearPart.substring(yearPart.length() - 2) : yearPart)
                .replace("{schoolCode}", schoolCode == null ? "" : schoolCode);

        Matcher matcher = SEQ_PATTERN.matcher(result);
        StringBuilder builder = new StringBuilder();
        while (matcher.find()) {
            int width = matcher.group(1) == null ? 6 : Integer.parseInt(matcher.group(1));
            matcher.appendReplacement(builder,
                    Matcher.quoteReplacement(padLeft(String.valueOf(value), width)));
        }
        matcher.appendTail(builder);
        return builder.toString();
    }

    private String padLeft(String value, int width) {
        if (value.length() >= width) {
            return value;
        }
        return "0".repeat(width - value.length()) + value;
    }
}
