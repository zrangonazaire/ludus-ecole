package ci.company.eduops.grade;

import ci.company.eduops.assessment.domain.Assessment;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.grade.domain.Grade;
import ci.company.eduops.grade.domain.GradeStatus;
import ci.company.eduops.grade.service.AcademicCalculationService;
import ci.company.eduops.grade.service.SubjectAverage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Tests of the averages engine (section 34 / rule 14).
 *
 * <p>These are the numbers that end up printed on a report card, so the
 * expectations here are written out by hand rather than derived from the code.</p>
 */
class AcademicCalculationServiceTest {

    private final AcademicCalculationService service =
            new AcademicCalculationService(null, null, null);

    @Nested
    @DisplayName("Subject average = SUM(score x coefficient) / SUM(coefficient)")
    class SubjectAverageCalculation {

        @Test
        @DisplayName("weights each assessment by its own coefficient")
        void weightsByAssessmentCoefficient() {
            // 12 (coef 1), 16 (coef 2), 14 (coef 1)
            // = (12*1 + 16*2 + 14*1) / 4 = 58 / 4 = 14.50
            List<Grade> grades = List.of(
                    grade("12.000", "1"),
                    grade("16.000", "2"),
                    grade("14.000", "1"));

            BigDecimal average = service.computeSubjectAverage(grades, 2);

            assertThat(average).isEqualByComparingTo("14.50");
        }

        @Test
        @DisplayName("a simple average when every coefficient is 1")
        void plainAverageWithEqualCoefficients() {
            List<Grade> grades = List.of(
                    grade("10.000", "1"), grade("14.000", "1"), grade("18.000", "1"));

            assertThat(service.computeSubjectAverage(grades, 2)).isEqualByComparingTo("14.00");
        }

        @Test
        @DisplayName("absent pupils are excluded from the denominator, not counted as zero")
        void excludesAbsentGrades() {
            Grade present = grade("16.000", "1");
            Grade absent = grade(null, "1");
            absent.markAbsent();

            // Only the 16 counts: the average is 16, not 8.
            assertThat(service.computeSubjectAverage(List.of(present, absent), 2))
                    .isEqualByComparingTo("16.00");
        }

        @Test
        @DisplayName("unvalidated marks never enter an average")
        void ignoresUnvalidatedGrades() {
            Grade validated = grade("18.000", "1");
            Grade draft = grade("6.000", "1");
            draft.setStatus(GradeStatus.DRAFT);

            assertThat(service.computeSubjectAverage(List.of(validated, draft), 2))
                    .isEqualByComparingTo("18.00");
        }

        @Test
        @DisplayName("no counting mark -> null, never zero")
        void returnsNullWhenNothingCounts() {
            assertThat(service.computeSubjectAverage(List.of(), 2)).isNull();
        }

        @Test
        @DisplayName("rounds HALF_UP on the requested number of decimals")
        void roundsHalfUp() {
            // (10 + 11 + 13) / 3 = 11.3333... -> 11.33
            List<Grade> grades = List.of(
                    grade("10.000", "1"), grade("11.000", "1"), grade("13.000", "1"));

            assertThat(service.computeSubjectAverage(grades, 2)).isEqualByComparingTo("11.33");
        }
    }

    @Nested
    @DisplayName("General average = SUM(subjectAverage x subjectCoefficient) / SUM(coefficient)")
    class GeneralAverageCalculation {

        @Test
        @DisplayName("weights each subject by its curriculum coefficient")
        void weightsBySubjectCoefficient() {
            // Maths 15 (coef 4), Francais 12 (coef 4), Anglais 16 (coef 2)
            // = (60 + 48 + 32) / 10 = 140 / 10 = 14.00
            List<SubjectAverage> subjects = List.of(
                    subject("15.00", "4"),
                    subject("12.00", "4"),
                    subject("16.00", "2"));

            assertThat(service.computeGeneralAverage(subjects, 2)).isEqualByComparingTo("14.00");
        }

        @Test
        @DisplayName("a subject without any mark is skipped, coefficient included")
        void skipsSubjectsWithoutAverage() {
            SubjectAverage graded = subject("16.00", "2");
            SubjectAverage empty = new SubjectAverage();
            empty.setCoefficient(new BigDecimal("5"));
            empty.setAverage(null);

            // The empty subject must not drag the average down.
            assertThat(service.computeGeneralAverage(List.of(graded, empty), 2))
                    .isEqualByComparingTo("16.00");
        }

        @Test
        @DisplayName("no graded subject -> null")
        void returnsNullWhenNoSubjectGraded() {
            assertThat(service.computeGeneralAverage(List.of(), 2)).isNull();
        }
    }

    @Nested
    @DisplayName("Ranking (competition style)")
    class Ranking {

        @Test
        @DisplayName("equal averages share a rank and the next rank skips")
        void handlesTies() {
            UUID first = UUID.randomUUID();
            UUID secondA = UUID.randomUUID();
            UUID secondB = UUID.randomUUID();
            UUID fourth = UUID.randomUUID();

            Map<UUID, BigDecimal> averages = new LinkedHashMap<>();
            averages.put(first, new BigDecimal("17.50"));
            averages.put(secondA, new BigDecimal("15.00"));
            averages.put(secondB, new BigDecimal("15.00"));
            averages.put(fourth, new BigDecimal("12.00"));

            assertThat(service.rankOf(first, averages)).isEqualTo(1);
            assertThat(service.rankOf(secondA, averages)).isEqualTo(2);
            assertThat(service.rankOf(secondB, averages)).isEqualTo(2);
            assertThat(service.rankOf(fourth, averages)).isEqualTo(4);
        }

        @Test
        @DisplayName("an unranked pupil returns null rather than a made-up rank")
        void returnsNullForUnknownEnrollment() {
            assertThat(service.rankOf(UUID.randomUUID(), Map.of())).isNull();
        }
    }

    @Nested
    @DisplayName("Grade range validation (section 32)")
    class RangeValidation {

        @Test
        @DisplayName("maximum 20, score 24 -> refused")
        void refusesScoreAboveMaximum() {
            Grade grade = new Grade();
            grade.setMaxScore(new BigDecimal("20.000"));

            assertThatThrownBy(() ->
                    grade.applyScore(new BigDecimal("24.000"), new BigDecimal("20")))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.GRADE_OUT_OF_RANGE);
        }

        @Test
        @DisplayName("a negative score is refused")
        void refusesNegativeScore() {
            Grade grade = new Grade();
            grade.setMaxScore(new BigDecimal("20.000"));

            assertThatThrownBy(() ->
                    grade.applyScore(new BigDecimal("-1.000"), new BigDecimal("20")))
                    .isInstanceOf(BusinessException.class);
        }

        @Test
        @DisplayName("a score marked out of 40 is normalised onto the /20 scale")
        void normalisesToSchoolScale() {
            Grade grade = new Grade();
            grade.setMaxScore(new BigDecimal("40.000"));

            grade.applyScore(new BigDecimal("32.000"), new BigDecimal("20"));

            assertThat(grade.getScore()).isEqualByComparingTo("32.000");
            assertThat(grade.getNormalizedScore()).isEqualByComparingTo("16.000");
        }

        @Test
        @DisplayName("the boundary values 0 and max are accepted")
        void acceptsBoundaries() {
            Grade zero = new Grade();
            zero.setMaxScore(new BigDecimal("20.000"));
            zero.applyScore(BigDecimal.ZERO, new BigDecimal("20"));
            assertThat(zero.getNormalizedScore()).isEqualByComparingTo("0.000");

            Grade full = new Grade();
            full.setMaxScore(new BigDecimal("20.000"));
            full.applyScore(new BigDecimal("20.000"), new BigDecimal("20"));
            assertThat(full.getNormalizedScore()).isEqualByComparingTo("20.000");
        }
    }

    @Nested
    @DisplayName("Grade workflow (section 33 / rule 6)")
    class Workflow {

        @Test
        @DisplayName("DRAFT -> SUBMITTED -> VALIDATED -> PUBLISHED is allowed")
        void allowsForwardTransitions() {
            Grade grade = new Grade();
            grade.setMaxScore(new BigDecimal("20.000"));

            grade.changeStatus(GradeStatus.SUBMITTED);
            assertThat(grade.getStatus()).isEqualTo(GradeStatus.SUBMITTED);
            grade.changeStatus(GradeStatus.VALIDATED);
            grade.changeStatus(GradeStatus.PUBLISHED);
            assertThat(grade.getStatus()).isEqualTo(GradeStatus.PUBLISHED);
            assertThat(grade.getPublishedAt()).isNotNull();
        }

        @Test
        @DisplayName("DRAFT cannot jump straight to PUBLISHED")
        void refusesSkippingStates() {
            Grade grade = new Grade();

            assertThatThrownBy(() -> grade.changeStatus(GradeStatus.PUBLISHED))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.GRADE_INVALID_TRANSITION);
        }

        @Test
        @DisplayName("a published grade is terminal: no further transition")
        void publishedIsTerminal() {
            assertThat(GradeStatus.PUBLISHED.canTransitionTo(GradeStatus.DRAFT)).isFalse();
            assertThat(GradeStatus.PUBLISHED.canTransitionTo(GradeStatus.VALIDATED)).isFalse();
            assertThat(GradeStatus.PUBLISHED.requiresJustifiedCorrection()).isTrue();
        }

        @Test
        @DisplayName("only VALIDATED and PUBLISHED marks count for an average")
        void onlyValidatedCountsForAverage() {
            assertThat(GradeStatus.DRAFT.countsForAverage()).isFalse();
            assertThat(GradeStatus.SUBMITTED.countsForAverage()).isFalse();
            assertThat(GradeStatus.VALIDATED.countsForAverage()).isTrue();
            assertThat(GradeStatus.PUBLISHED.countsForAverage()).isTrue();
        }
    }

    // ---------------------------------------------------------------- helpers

    private Grade grade(String score, String assessmentCoefficient) {
        Assessment assessment = new Assessment();
        assessment.setCoefficient(new BigDecimal(assessmentCoefficient));
        assessment.setMaxScore(new BigDecimal("20.000"));
        assessment.setCountsForAverage(true);

        Grade grade = new Grade();
        grade.setAssessment(assessment);
        grade.setMaxScore(new BigDecimal("20.000"));
        grade.setStatus(GradeStatus.VALIDATED);
        if (score != null) {
            grade.setScore(new BigDecimal(score));
            grade.setNormalizedScore(new BigDecimal(score));
        }
        return grade;
    }

    private SubjectAverage subject(String average, String coefficient) {
        SubjectAverage line = new SubjectAverage();
        line.setAverage(new BigDecimal(average));
        line.setCoefficient(new BigDecimal(coefficient));
        return line;
    }
}
