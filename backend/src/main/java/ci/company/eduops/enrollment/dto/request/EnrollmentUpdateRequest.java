package ci.company.eduops.enrollment.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

/**
 * Payload of {@code PUT /api/v1/enrollments/{id}}.
 *
 * <p>Only what a correction legitimately touches: the class (a pupil moved
 * before the term started), the date and the repeating flag. The student and
 * the academic year are immutable — moving one means cancelling and
 * re-enrolling, which leaves an audit trail.</p>
 */
public class EnrollmentUpdateRequest {

    @NotNull(message = "La classe est obligatoire")
    private java.util.UUID classroomId;

    @NotNull(message = "La date d'inscription est obligatoire")
    private LocalDate enrollmentDate;

    private boolean repeating;

    public java.util.UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(java.util.UUID classroomId) {
        this.classroomId = classroomId;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public boolean isRepeating() {
        return repeating;
    }

    public void setRepeating(boolean repeating) {
        this.repeating = repeating;
    }
}
