package ci.company.eduops.enrollment.dto.request;

import ci.company.eduops.enrollment.domain.EnrollmentKind;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

@Schema(name = "EnrollmentCreateRequest", description = "Places a student in a class for a year")
public class EnrollmentCreateRequest {

    @NotNull
    private UUID studentId;

    @Schema(description = "Defaults to the active academic year")
    private UUID academicYearId;

    @NotNull
    private UUID classroomId;

    private UUID admissionId;

    private EnrollmentKind enrollmentKind = EnrollmentKind.NEW;

    private LocalDate enrollmentDate;

    private boolean repeating;

    @Schema(description = "Requires the ENROLLMENT_OVERRIDE_CAPACITY permission")
    private boolean overCapacityOverride;

    @Size(max = 500)
    private String overCapacityReason;

    /** Idempotency key so a double-submitted form creates a single enrollment. */
    @Size(max = 120)
    @Schema(example = "8c1f2d3e-4a5b-6c7d-8e9f-0a1b2c3d4e5f")
    private String idempotencyKey;

    private String notes;

    /** Validate immediately instead of leaving the enrollment in DRAFT. */
    @Schema(description = "Validate right away (requires ENROLLMENT_VALIDATE)")
    private boolean validateImmediately = true;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public UUID getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(UUID admissionId) {
        this.admissionId = admissionId;
    }

    public EnrollmentKind getEnrollmentKind() {
        return enrollmentKind;
    }

    public void setEnrollmentKind(EnrollmentKind enrollmentKind) {
        this.enrollmentKind = enrollmentKind;
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

    public boolean isOverCapacityOverride() {
        return overCapacityOverride;
    }

    public void setOverCapacityOverride(boolean overCapacityOverride) {
        this.overCapacityOverride = overCapacityOverride;
    }

    public String getOverCapacityReason() {
        return overCapacityReason;
    }

    public void setOverCapacityReason(String overCapacityReason) {
        this.overCapacityReason = overCapacityReason;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isValidateImmediately() {
        return validateImmediately;
    }

    public void setValidateImmediately(boolean validateImmediately) {
        this.validateImmediately = validateImmediately;
    }
}
