package ci.company.eduops.school;

import ci.company.eduops.school.controller.SchoolLogoController.Logo;
import jakarta.validation.Validation;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class SchoolLogoValidationTest {
    @Test void permitsRasterDataAndRemovalButRejectsUrlsSvgAndOversizedPayloads() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var validator = factory.getValidator();
            assertThat(validator.validate(new Logo(null))).isEmpty();
            assertThat(validator.validate(new Logo("data:image/png;base64,aGVsbG8="))).isEmpty();
            assertThat(validator.validate(new Logo("https://example.test/logo.png"))).isNotEmpty();
            assertThat(validator.validate(new Logo("data:image/svg+xml;base64,aGVsbG8="))).isNotEmpty();
            assertThat(validator.validate(new Logo("data:image/png;base64," + "a".repeat(750000)))).isNotEmpty();
        }
    }
}
