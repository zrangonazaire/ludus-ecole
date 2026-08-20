package ci.company.eduops.enrollment.dto.response;

import ci.company.eduops.enrollment.domain.EnrollmentKind;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public class EnrollmentResponse {

    private UUID id;
    private String enrollmentNumber;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private UUID academicYearId;
    private String academicYearCode;
    private UUID classroomId;
    private String classroomName;
    private UUID levelId;
    private String levelName;
    private EnrollmentKind enrollmentKind;
    private EnrollmentStatus status;
    private LocalDate enrollmentDate;
    private OffsetDateTime validatedAt;
    private boolean repeating;
    private boolean overCapacityOverride;
    private int feeLinesCreated;
    private BigDecimal totalFeesDue;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEnrollmentNumber() {
        return enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public String getAcademicYearCode() {
        return academicYearCode;
    }

    public void setAcademicYearCode(String academicYearCode) {
        this.academicYearCode = academicYearCode;
    }

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public EnrollmentKind getEnrollmentKind() {
        return enrollmentKind;
    }

    public void setEnrollmentKind(EnrollmentKind enrollmentKind) {
        this.enrollmentKind = enrollmentKind;
    }

    public EnrollmentStatus getStatus() {
        return status;
    }

    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public OffsetDateTime getValidatedAt() {
        return validatedAt;
    }

    public void setValidatedAt(OffsetDateTime validatedAt) {
        this.validatedAt = validatedAt;
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

    public int getFeeLinesCreated() {
        return feeLinesCreated;
    }

    public void setFeeLinesCreated(int feeLinesCreated) {
        this.feeLinesCreated = feeLinesCreated;
    }

    public BigDecimal getTotalFeesDue() {
        return totalFeesDue;
    }

    public void setTotalFeesDue(BigDecimal totalFeesDue) {
        this.totalFeesDue = totalFeesDue;
    }
}
