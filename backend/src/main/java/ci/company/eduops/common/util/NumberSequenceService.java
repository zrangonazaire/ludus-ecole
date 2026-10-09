package ci.company.eduops.common.util;

import ci.company.eduops.common.dto.SequenceStatus;
import ci.company.eduops.common.entity.NumberSequence;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.repository.NumberSequenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Generates the school's business identifiers from a configurable pattern:
 * {@code EDU-{year}-{seq:6}} produces {@code EDU-2026-000123}.
 *
 * <p>Supported placeholders:</p>
 * <ul>
 *   <li>{@code {year}}       - four digit year (e.g. 2026)</li>
 *   <li>{@code {yy}}         - two digit year (e.g. 26)</li>
 *   <li>{@code {schoolCode}} - the school short code (or {@code {code}})</li>
 *   <li>{@code {seq:n}}      - zero-padded counter on n digits (default 6 digits)</li>
 * </ul>
 *
 * <p>The counter row is locked with {@code SELECT ... FOR UPDATE} so two
 * concurrent registrars can never obtain the same number.</p>
 */
@Service
public class NumberSequenceService {

    private static final Pattern SEQ_PATTERN = Pattern.compile("\\{seq(?::(\\d+))?}");
    public static final String POLICY_ANNUAL = "ANNUAL";
    public static final String POLICY_CONTINUOUS = "CONTINUOUS";
    public static final String GLOBAL_YEAR_PART = "GLOBAL";

    private final NumberSequenceRepository repository;

    public NumberSequenceService(NumberSequenceRepository repository) {
        this.repository = repository;
    }

    /**
     * Reserves the next value for the given scope using default annual reset policy.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public String next(UUID schoolId, String scope, String pattern, String schoolCode) {
        return next(schoolId, scope, pattern, schoolCode, POLICY_ANNUAL, 1L);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public String next(UUID schoolId, String scope, String pattern, String schoolCode, String yearPart) {
        long value = nextValue(schoolId, scope, yearPart, 1L);
        return format(pattern, yearPart, schoolCode, value);
    }

    /**
     * Reserves the next value taking into account the configured reset policy (ANNUAL or CONTINUOUS)
     * and default starting number.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public String next(UUID schoolId, String scope, String pattern, String schoolCode,
                       String resetPolicy, long defaultStartNumber) {
        String currentYear = String.valueOf(LocalDate.now().getYear());
        String sequenceYearPart = resolveSequenceYearPart(resetPolicy, currentYear);
        long value = nextValue(schoolId, scope, sequenceYearPart, defaultStartNumber);
        return format(pattern, currentYear, schoolCode, value);
    }

    private String resolveSequenceYearPart(String resetPolicy, String currentYear) {
        if (POLICY_CONTINUOUS.equalsIgnoreCase(resetPolicy)) {
            return GLOBAL_YEAR_PART;
        }
        return currentYear != null ? currentYear : String.valueOf(LocalDate.now().getYear());
    }

    private long nextValue(UUID schoolId, String scope, String yearPart, long defaultStartNumber) {
        if (repository == null) {
            return defaultStartNumber;
        }
        NumberSequence sequence = repository
                .lockBySchoolIdAndScopeAndYearPart(schoolId, scope, yearPart)
                .orElseGet(() -> repository.save(
                        new NumberSequence(schoolId, scope, yearPart) {{
                            setCurrentValue(Math.max(0L, defaultStartNumber - 1));
                        }}
                ));
        long next = sequence.getCurrentValue() + 1;
        sequence.setCurrentValue(next);
        repository.saveAndFlush(sequence);
        return next;
    }

    /**
     * Retrieves the current sequence counter and status without incrementing it.
     */
    @Transactional(readOnly = true)
    public SequenceStatus getSequenceStatus(UUID schoolId, String scope, String resetPolicy,
                                            long defaultStartNumber, String pattern, String schoolCode) {
        String currentYear = String.valueOf(LocalDate.now().getYear());
        String sequenceYearPart = resolveSequenceYearPart(resetPolicy, currentYear);
        Optional<NumberSequence> opt = repository != null
                ? repository.findBySchoolIdAndScopeAndYearPart(schoolId, scope, sequenceYearPart)
                : Optional.empty();

        long currentValue = opt.map(NumberSequence::getCurrentValue)
                .orElse(Math.max(0L, defaultStartNumber - 1));
        long nextValue = currentValue + 1;
        OffsetDateTime updatedAt = opt.map(NumberSequence::getUpdatedAt).orElse(null);
        String preview = pattern != null ? format(pattern, currentYear, schoolCode, nextValue) : null;

        return new SequenceStatus(
                scope,
                POLICY_CONTINUOUS.equalsIgnoreCase(resetPolicy) ? POLICY_CONTINUOUS : POLICY_ANNUAL,
                sequenceYearPart,
                currentValue,
                nextValue,
                defaultStartNumber,
                updatedAt,
                preview
        );
    }

    /**
     * Configures the next sequence number to be assigned for the given scope and reset policy.
     * E.g. setting nextNumber to 100 sets currentValue to 99, so the next generated record gets 100.
     */
    @Transactional
    public void setNextNumber(UUID schoolId, String scope, String resetPolicy, long nextNumber) {
        if (nextNumber < 1) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Le prochain numéro de séquence doit être supérieur ou égal à 1.");
        }
        if (repository == null) {
            return;
        }
        String currentYear = String.valueOf(LocalDate.now().getYear());
        String sequenceYearPart = resolveSequenceYearPart(resetPolicy, currentYear);

        NumberSequence sequence = repository
                .findBySchoolIdAndScopeAndYearPart(schoolId, scope, sequenceYearPart)
                .orElseGet(() -> new NumberSequence(schoolId, scope, sequenceYearPart));

        sequence.setCurrentValue(nextNumber - 1);
        repository.saveAndFlush(sequence);
    }

    /**
     * Validates that a pattern template is structurally valid and safe.
     */
    public void validatePattern(String pattern) {
        if (pattern == null || pattern.isBlank()) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Le format de numérotation ne peut pas être vide.");
        }
        String trimmed = pattern.trim();
        if (trimmed.length() > 80) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Le gabarit de numérotation ne peut pas dépasser 80 caractères.");
        }
        if (!SEQ_PATTERN.matcher(trimmed).find()) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Le gabarit doit obligatoirement inclure un compteur séquentiel {seq} ou {seq:n} (ex: {seq:6}).");
        }
        // Test sample generation
        String sample = format(trimmed, "2026", "EDU", 1L);
        if (sample.length() > 40) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Le format génère un identifiant trop long (" + sample.length()
                            + " caractères). Le matricule ne doit pas dépasser 40 caractères.");
        }
    }

    /** Renders the pattern; exposed for unit testing and preview screens. */
    public String format(String pattern, String yearPart, String schoolCode, long value) {
        if (pattern == null) {
            return "";
        }
        String effectiveYear = yearPart != null ? yearPart : String.valueOf(LocalDate.now().getYear());
        String result = pattern
                .replace("{year}", effectiveYear)
                .replace("{yy}", effectiveYear.length() >= 2 ? effectiveYear.substring(effectiveYear.length() - 2) : effectiveYear)
                .replace("{schoolCode}", schoolCode == null ? "" : schoolCode)
                .replace("{code}", schoolCode == null ? "" : schoolCode);

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

    /**
     * Helper to render a preview of a pattern.
     */
    public String preview(String pattern, String schoolCode, long value) {
        return format(pattern, String.valueOf(LocalDate.now().getYear()), schoolCode, value);
    }

    private String padLeft(String value, int width) {
        if (value.length() >= width) {
            return value;
        }
        return "0".repeat(width - value.length()) + value;
    }
}
