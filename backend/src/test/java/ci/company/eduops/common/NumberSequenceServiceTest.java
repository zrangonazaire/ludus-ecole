package ci.company.eduops.common;

import ci.company.eduops.common.repository.NumberSequenceRepository;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.common.util.VerificationCodeGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Identifier formatting (sections 16 and 42).
 *
 * <p>The pattern is configurable per school, so the renderer is tested on its
 * own without touching the counter table.</p>
 */
class NumberSequenceServiceTest {

    private final NumberSequenceService service =
            new NumberSequenceService((NumberSequenceRepository) null);

    @Test
    @DisplayName("EDU-{year}-{seq:6} renders EDU-2026-000123")
    void rendersStudentNumber() {
        assertThat(service.format("EDU-{year}-{seq:6}", "2026", "GSH", 123))
                .isEqualTo("EDU-2026-000123");
    }

    @Test
    @DisplayName("REC-{year}-{seq:8} renders REC-2026-00001234")
    void rendersReceiptNumber() {
        assertThat(service.format("REC-{year}-{seq:8}", "2026", "GSH", 1234))
                .isEqualTo("REC-2026-00001234");
    }

    @Test
    @DisplayName("the school code and the two digit year are substituted")
    void supportsSchoolCodeAndShortYear() {
        assertThat(service.format("{schoolCode}-{yy}-{seq:4}", "2026", "GSH", 7))
                .isEqualTo("GSH-26-0007");
    }

    @Test
    @DisplayName("a counter wider than its padding is not truncated")
    void doesNotTruncateLargeCounters() {
        assertThat(service.format("EDU-{year}-{seq:3}", "2026", "GSH", 123456))
                .isEqualTo("EDU-2026-123456");
    }

    @Test
    @DisplayName("{seq} without a width defaults to six digits")
    void defaultWidth() {
        assertThat(service.format("ENR-{year}-{seq}", "2026", "GSH", 42))
                .isEqualTo("ENR-2026-000042");
    }

    @Test
    @DisplayName("verification codes are grouped, unambiguous and unique")
    void generatesVerificationCodes() {
        VerificationCodeGenerator generator = new VerificationCodeGenerator();
        String code = generator.generate();

        assertThat(code).matches("[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}");
        // no I, O, 0 or 1: a code read aloud over the phone stays unambiguous
        assertThat(code).doesNotContain("I").doesNotContain("O")
                .doesNotContain("0").doesNotContain("1");
        assertThat(generator.generate()).isNotEqualTo(code);
    }
}
