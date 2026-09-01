package ci.company.eduops.messaging.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The billing rule, checked against the vectors the screen also uses.
 *
 * <p>Two implementations of one billing rule always drift apart eventually.
 * {@code sms-segment-vectors.json} is what makes the drift show up here rather
 * than on an invoice: the TypeScript counter that warns the secretary while
 * she types reads the same file.</p>
 */
class SmsSegmentCounterTest {

    private final SmsSegmentCounter counter = new SmsSegmentCounter();

    private static List<JsonNode> vectors() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        try (InputStream in = SmsSegmentCounterTest.class
                .getResourceAsStream("/sms-segment-vectors.json")) {
            JsonNode root = mapper.readTree(in);
            List<JsonNode> cases = new ArrayList<>();
            root.get("cases").forEach(cases::add);
            return cases;
        }
    }

    /** Rebuilds the message described by one vector. */
    private static String bodyOf(JsonNode node) {
        if (node.has("repeat")) {
            return node.get("repeat").get(0).asText()
                    .repeat(node.get("repeat").get(1).asInt());
        }
        if (node.has("repeatThenAppend")) {
            JsonNode spec = node.get("repeatThenAppend");
            return spec.get(0).asText().repeat(spec.get(1).asInt()) + spec.get(2).asText();
        }
        return node.get("body").asText();
    }

    @ParameterizedTest(name = "{0}")
    @MethodSource("cases")
    @DisplayName("Les vecteurs partagés avec l'écran")
    void matchesSharedVector(String label, JsonNode node) {
        SmsSegmentCounter.Estimate estimate = counter.estimate(bodyOf(node));

        if (node.has("unicode")) {
            assertThat(estimate.isUnicode())
                    .as("bascule UCS-2 — %s", label)
                    .isEqualTo(node.get("unicode").asBoolean());
        }
        if (node.has("characters")) {
            assertThat(estimate.getCharacters())
                    .as("longueur facturable — %s", label)
                    .isEqualTo(node.get("characters").asInt());
        }
        if (node.has("segments")) {
            assertThat(estimate.getSegments())
                    .as("segments — %s", label)
                    .isEqualTo(node.get("segments").asInt());
        }
        if (node.has("offenders")) {
            List<String> expected = new ArrayList<>();
            node.get("offenders").forEach((n) -> expected.add(n.asText()));
            assertThat(estimate.getOffenders())
                    .as("caractères coupables — %s", label)
                    .isEqualTo(expected);
        }
        if (node.has("suggestion")) {
            JsonNode expected = node.get("suggestion");
            assertThat(estimate.getSuggestion())
                    .as("proposition — %s", label)
                    .isEqualTo(expected.isNull() ? null : expected.asText());
        }
    }

    static List<org.junit.jupiter.params.provider.Arguments> cases() throws Exception {
        List<org.junit.jupiter.params.provider.Arguments> args = new ArrayList<>();
        for (JsonNode node : vectors()) {
            args.add(org.junit.jupiter.params.provider.Arguments.of(
                    node.get("label").asText(), node));
        }
        return args;
    }

    @Test
    @DisplayName("Un accent circonflexe triple la facture d'une relance de masse")
    void oneCircumflexTriplesTheBill() {
        String clean = "a".repeat(150);
        String withAccent = "a".repeat(149) + "û";
        BigDecimal unit = new BigDecimal("25");

        assertThat(counter.cost(clean, unit)).isEqualByComparingTo("25");
        assertThat(counter.cost(withAccent, unit)).isEqualByComparingTo("75");

        // Quatre cents familles : 10 000 F ou 30 000 F selon une seule lettre.
        BigDecimal families = BigDecimal.valueOf(400);
        assertThat(counter.cost(clean, unit).multiply(families))
                .isEqualByComparingTo("10000");
        assertThat(counter.cost(withAccent, unit).multiply(families))
                .isEqualByComparingTo("30000");
    }

    @Test
    @DisplayName("Le tarif absent ne coûte rien plutôt que de planter")
    void missingTariffCostsNothing() {
        assertThat(counter.cost("Bonjour", null)).isEqualByComparingTo("0");
    }

    @Test
    @DisplayName("Le c cédille minuscule coûte cher, la majuscule non")
    void theCedillaTrap() {
        assertThat(counter.estimate("Le français").isUnicode()).isTrue();
        assertThat(counter.estimate("ÇA VA").isUnicode()).isFalse();
    }
}
