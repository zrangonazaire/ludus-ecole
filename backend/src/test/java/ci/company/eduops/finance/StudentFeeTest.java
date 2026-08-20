package ci.company.eduops.finance;

import ci.company.eduops.common.util.AmountInWords;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.domain.StudentFeeStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Money rules (sections 40 to 43, rules 8 and 18).
 *
 * <p>Every amount is BigDecimal with two decimals; a rounding drift here would
 * show up on a receipt, so the expected values are stated explicitly.</p>
 */
class StudentFeeTest {

    @Nested
    @DisplayName("Instalment balance (rule 8)")
    class Balance {

        @Test
        @DisplayName("a full allocation settles the line")
        void fullPaymentMarksPaid() {
            StudentFee fee = fee("200000.00", LocalDate.now().plusDays(30));

            fee.allocate(new BigDecimal("200000.00"));

            assertThat(fee.outstanding()).isEqualByComparingTo("0.00");
            assertThat(fee.getStatus()).isEqualTo(StudentFeeStatus.PAID);
        }

        @Test
        @DisplayName("a partial allocation leaves the line partially paid")
        void partialPaymentMarksPartiallyPaid() {
            StudentFee fee = fee("200000.00", LocalDate.now().plusDays(30));

            fee.allocate(new BigDecimal("75000.00"));

            assertThat(fee.outstanding()).isEqualByComparingTo("125000.00");
            assertThat(fee.getStatus()).isEqualTo(StudentFeeStatus.PARTIALLY_PAID);
        }

        @Test
        @DisplayName("a past due date turns an unpaid line into OVERDUE")
        void pastDueBecomesOverdue() {
            StudentFee fee = fee("200000.00", LocalDate.now().minusDays(5));

            fee.refreshStatus();

            assertThat(fee.isPastDue()).isTrue();
            assertThat(fee.getStatus()).isEqualTo(StudentFeeStatus.OVERDUE);
        }

        @Test
        @DisplayName("cancelling a payment restores the previous balance exactly")
        void deallocationRestoresBalance() {
            StudentFee fee = fee("200000.00", LocalDate.now().plusDays(30));
            fee.allocate(new BigDecimal("200000.00"));
            assertThat(fee.getStatus()).isEqualTo(StudentFeeStatus.PAID);

            fee.deallocate(new BigDecimal("200000.00"));

            assertThat(fee.outstanding()).isEqualByComparingTo("200000.00");
            assertThat(fee.getStatus()).isEqualTo(StudentFeeStatus.DUE);
        }

        @Test
        @DisplayName("a waived line keeps its status whatever happens")
        void waivedStaysWaived() {
            StudentFee fee = fee("200000.00", LocalDate.now().minusDays(60));
            fee.setStatus(StudentFeeStatus.WAIVED);

            fee.refreshStatus();

            assertThat(fee.getStatus()).isEqualTo(StudentFeeStatus.WAIVED);
        }

        @Test
        @DisplayName("a discount reduces the amount due, not the gross amount")
        void discountReducesAmountDue() {
            StudentFee fee = fee("200000.00", LocalDate.now().plusDays(30));
            fee.setDiscountAmount(new BigDecimal("50000.00"));

            fee.recomputeAmountDue();

            assertThat(fee.getGrossAmount()).isEqualByComparingTo("200000.00");
            assertThat(fee.getAmountDue()).isEqualByComparingTo("150000.00");
        }
    }

    @Nested
    @DisplayName("MoneyUtils (rule 18: never float or double)")
    class Money {

        @Test
        @DisplayName("addition and subtraction stay exact on two decimals")
        void arithmeticIsExact() {
            assertThat(MoneyUtils.add(new BigDecimal("0.10"), new BigDecimal("0.20")))
                    .isEqualByComparingTo("0.30");
            assertThat(MoneyUtils.subtract(new BigDecimal("200000.00"), new BigDecimal("75000.50")))
                    .isEqualByComparingTo("124999.50");
        }

        @Test
        @DisplayName("a percentage is applied without drift")
        void percentageIsExact() {
            // 25 % of 600 000 = 150 000
            assertThat(MoneyUtils.percentageOf(new BigDecimal("600000"), new BigDecimal("25")))
                    .isEqualByComparingTo("150000.00");
        }

        @Test
        @DisplayName("null is treated as zero rather than throwing")
        void nullSafeArithmetic() {
            assertThat(MoneyUtils.add(null, new BigDecimal("100.00")))
                    .isEqualByComparingTo("100.00");
            assertThat(MoneyUtils.nullToZero(null)).isEqualByComparingTo("0");
        }

        @Test
        @DisplayName("min and max pick the right operand")
        void minAndMax() {
            BigDecimal small = new BigDecimal("100.00");
            BigDecimal large = new BigDecimal("900.00");
            assertThat(MoneyUtils.min(small, large)).isEqualByComparingTo("100.00");
            assertThat(MoneyUtils.max(small, large)).isEqualByComparingTo("900.00");
        }
    }

    @Nested
    @DisplayName("Amount in words on a receipt (section 42)")
    class Words {

        @Test
        @DisplayName("spells a typical tuition instalment in French")
        void spellsAmounts() {
            assertThat(AmountInWords.toFrench(new BigDecimal("200000"), "francs CFA"))
                    .isEqualTo("Deux cent mille francs CFA");
            assertThat(AmountInWords.toFrench(new BigDecimal("1250000"), "francs CFA"))
                    .isEqualTo("Un million deux cent cinquante mille francs CFA");
        }

        @Test
        @DisplayName("cent and vingt agree only when multiplied AND ending the number")
        void appliesFrenchAgreementRule() {
            // "cent" multiplied and final -> takes an s
            assertThat(AmountInWords.toFrench(new BigDecimal("200"), "")).isEqualTo("Deux cents");
            assertThat(AmountInWords.toFrench(new BigDecimal("300"), "")).isEqualTo("Trois cents");

            // followed by another figure -> no s
            assertThat(AmountInWords.toFrench(new BigDecimal("301"), "")).isEqualTo("Trois cent un");

            // "mille" is a numeral adjective: it blocks the agreement
            assertThat(AmountInWords.toFrench(new BigDecimal("200000"), ""))
                    .isEqualTo("Deux cent mille");
            assertThat(AmountInWords.toFrench(new BigDecimal("600000"), ""))
                    .isEqualTo("Six cent mille");
            assertThat(AmountInWords.toFrench(new BigDecimal("80000"), ""))
                    .isEqualTo("Quatre-vingt mille");

            // "million" is a noun: the agreement is kept
            assertThat(AmountInWords.toFrench(new BigDecimal("200000000"), ""))
                    .isEqualTo("Deux cents millions");

            // "cent" not multiplied -> never takes an s
            assertThat(AmountInWords.toFrench(new BigDecimal("100000"), "")).isEqualTo("Cent mille");
        }

        @Test
        @DisplayName("handles the French irregulars around 70, 80 and 90")
        void handlesFrenchIrregulars() {
            assertThat(AmountInWords.toFrench(new BigDecimal("71"), "")).isEqualTo("Soixante-et-onze");
            assertThat(AmountInWords.toFrench(new BigDecimal("80"), "")).isEqualTo("Quatre-vingts");
            assertThat(AmountInWords.toFrench(new BigDecimal("95"), "")).isEqualTo("Quatre-vingt-quinze");
        }

        @Test
        @DisplayName("zero and null are handled without throwing")
        void handlesEdgeCases() {
            assertThat(AmountInWords.toFrench(BigDecimal.ZERO, "francs CFA"))
                    .isEqualTo("Zero francs CFA");
            assertThat(AmountInWords.toFrench(null, "francs CFA")).isEmpty();
        }
    }

    private StudentFee fee(String amount, LocalDate dueDate) {
        StudentFee fee = new StudentFee();
        fee.setLabel("Scolarite - Echeance 1");
        fee.setGrossAmount(new BigDecimal(amount));
        fee.setDiscountAmount(MoneyUtils.ZERO);
        fee.recomputeAmountDue();
        fee.setAmountPaid(MoneyUtils.ZERO);
        fee.setDueDate(dueDate);
        fee.refreshStatus();
        return fee;
    }
}
