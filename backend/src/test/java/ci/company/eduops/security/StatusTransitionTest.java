package ci.company.eduops.security;

import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.assessment.domain.AssessmentStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Every state machine of the system, in one place.
 *
 * <p>Sections 17, 19, 21 and 31 all say the same thing: the backend controls the
 * transitions and an arbitrary jump is never allowed. These tests make that
 * concrete for each aggregate.</p>
 */
class StatusTransitionTest {

    @Nested
    @DisplayName("Student (section 17)")
    class StudentTransitions {

        @Test
        @DisplayName("the nominal path APPLICANT -> ADMITTED -> ACTIVE -> GRADUATED works")
        void nominalPath() {
            Student student = new Student();
            student.setStatus(StudentStatus.APPLICANT);

            assertThatCode(() -> {
                student.changeStatus(StudentStatus.ADMITTED);
                student.changeStatus(StudentStatus.ACTIVE);
                student.changeStatus(StudentStatus.GRADUATED);
            }).doesNotThrowAnyException();

            assertThat(student.getStatus()).isEqualTo(StudentStatus.GRADUATED);
        }

        @Test
        @DisplayName("ACTIVE -> TRANSFERRED is allowed")
        void transferIsAllowed() {
            Student student = new Student();
            student.setStatus(StudentStatus.ACTIVE);

            assertThatCode(() -> student.changeStatus(StudentStatus.TRANSFERRED))
                    .doesNotThrowAnyException();
        }

        @Test
        @DisplayName("an arbitrary jump APPLICANT -> GRADUATED is refused")
        void refusesArbitraryJump() {
            Student student = new Student();
            student.setStatus(StudentStatus.APPLICANT);

            assertThatThrownBy(() -> student.changeStatus(StudentStatus.GRADUATED))
                    .isInstanceOf(BusinessException.class);
        }

        @Test
        @DisplayName("ARCHIVED is terminal and stamps the archive date")
        void archivedIsTerminal() {
            Student student = new Student();
            student.setStatus(StudentStatus.ACTIVE);
            student.changeStatus(StudentStatus.ARCHIVED);

            assertThat(student.getArchivedAt()).isNotNull();
            assertThatThrownBy(() -> student.changeStatus(StudentStatus.ACTIVE))
                    .isInstanceOf(BusinessException.class);
        }

        @Test
        @DisplayName("only ADMITTED and ACTIVE students may be enrolled")
        void enrollableStatuses() {
            assertThat(StudentStatus.ADMITTED.canBeEnrolled()).isTrue();
            assertThat(StudentStatus.ACTIVE.canBeEnrolled()).isTrue();
            assertThat(StudentStatus.APPLICANT.canBeEnrolled()).isFalse();
            assertThat(StudentStatus.SUSPENDED.canBeEnrolled()).isFalse();
            assertThat(StudentStatus.WITHDRAWN.canBeEnrolled()).isFalse();
            assertThat(StudentStatus.GRADUATED.canBeEnrolled()).isFalse();
        }
    }

    @Nested
    @DisplayName("Academic year (section 19)")
    class AcademicYearTransitions {

        @Test
        @DisplayName("DRAFT -> OPEN -> ACTIVE -> CLOSING -> CLOSED -> ARCHIVED")
        void nominalPath() {
            assertThat(AcademicYearStatus.DRAFT.canTransitionTo(AcademicYearStatus.OPEN)).isTrue();
            assertThat(AcademicYearStatus.OPEN.canTransitionTo(AcademicYearStatus.ACTIVE)).isTrue();
            assertThat(AcademicYearStatus.ACTIVE.canTransitionTo(AcademicYearStatus.CLOSING)).isTrue();
            assertThat(AcademicYearStatus.CLOSING.canTransitionTo(AcademicYearStatus.CLOSED)).isTrue();
            assertThat(AcademicYearStatus.CLOSED.canTransitionTo(AcademicYearStatus.ARCHIVED)).isTrue();
        }

        @Test
        @DisplayName("a closed year cannot be reopened as ACTIVE")
        void closedCannotReopen() {
            assertThat(AcademicYearStatus.CLOSED.canTransitionTo(AcademicYearStatus.ACTIVE)).isFalse();
            assertThat(AcademicYearStatus.ARCHIVED.canTransitionTo(AcademicYearStatus.ACTIVE)).isFalse();
        }

        @Test
        @DisplayName("only OPEN and ACTIVE years accept operations")
        void operationalStatuses() {
            assertThat(AcademicYearStatus.OPEN.acceptsOperations()).isTrue();
            assertThat(AcademicYearStatus.ACTIVE.acceptsOperations()).isTrue();
            assertThat(AcademicYearStatus.DRAFT.acceptsOperations()).isFalse();
            assertThat(AcademicYearStatus.CLOSED.acceptsOperations()).isFalse();
        }
    }

    @Nested
    @DisplayName("Enrollment (section 21)")
    class EnrollmentTransitions {

        @Test
        @DisplayName("only VALIDATED and ACTIVE occupy a seat")
        void seatOccupyingStatuses() {
            assertThat(EnrollmentStatus.VALIDATED.occupiesSeat()).isTrue();
            assertThat(EnrollmentStatus.ACTIVE.occupiesSeat()).isTrue();
            assertThat(EnrollmentStatus.DRAFT.occupiesSeat()).isFalse();
            assertThat(EnrollmentStatus.CANCELLED.occupiesSeat()).isFalse();
            assertThat(EnrollmentStatus.COMPLETED.occupiesSeat()).isFalse();
        }

        @Test
        @DisplayName("draft and pending enrollments still block a second one")
        void blockingStatuses() {
            assertThat(EnrollmentStatus.DRAFT.blocksNewEnrollment()).isTrue();
            assertThat(EnrollmentStatus.PENDING.blocksNewEnrollment()).isTrue();
            assertThat(EnrollmentStatus.SUSPENDED.blocksNewEnrollment()).isTrue();
            assertThat(EnrollmentStatus.CANCELLED.blocksNewEnrollment()).isFalse();
            assertThat(EnrollmentStatus.TRANSFERRED.blocksNewEnrollment()).isFalse();
        }

        @Test
        @DisplayName("a cancelled enrollment is terminal")
        void cancelledIsTerminal() {
            assertThat(EnrollmentStatus.CANCELLED.canTransitionTo(EnrollmentStatus.ACTIVE)).isFalse();
        }
    }

    @Nested
    @DisplayName("Admission (section 9) and assessment (section 31)")
    class OtherTransitions {

        @Test
        @DisplayName("only pending admissions hold a reserved seat")
        void seatReservingAdmissions() {
            assertThat(AdmissionStatus.ACCEPTED.reservesSeat()).isTrue();
            assertThat(AdmissionStatus.WAITLISTED.reservesSeat()).isTrue();
            assertThat(AdmissionStatus.UNDER_REVIEW.reservesSeat()).isTrue();
            assertThat(AdmissionStatus.REJECTED.reservesSeat()).isFalse();
            assertThat(AdmissionStatus.CONVERTED.reservesSeat()).isFalse();
        }

        @Test
        @DisplayName("a rejected admission cannot become accepted")
        void rejectedIsTerminal() {
            assertThat(AdmissionStatus.REJECTED.canTransitionTo(AdmissionStatus.ACCEPTED)).isFalse();
        }

        @Test
        @DisplayName("marks can only be entered on an OPEN or GRADING assessment")
        void gradeEntryWindow() {
            assertThat(AssessmentStatus.OPEN.acceptsGradeEntry()).isTrue();
            assertThat(AssessmentStatus.GRADING.acceptsGradeEntry()).isTrue();
            assertThat(AssessmentStatus.DRAFT.acceptsGradeEntry()).isFalse();
            assertThat(AssessmentStatus.PUBLISHED.acceptsGradeEntry()).isFalse();
        }

        @Test
        @DisplayName("only validated or published assessments feed the averages")
        void averageEligibility() {
            assertThat(AssessmentStatus.VALIDATED.countsForAverage()).isTrue();
            assertThat(AssessmentStatus.PUBLISHED.countsForAverage()).isTrue();
            assertThat(AssessmentStatus.SUBMITTED.countsForAverage()).isFalse();
        }
    }
}
