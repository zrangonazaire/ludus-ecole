package ci.company.eduops.council.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * One pupil examined by a council, with their current verdict when one exists.
 */
@Schema(name = "StudentDecision", description = "Élève examiné par le conseil")
public class StudentDecisionResponse {

    private UUID decisionId;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private UUID enrollmentId;
    private UUID fromLevelId;
    private String fromLevelName;
    private UUID toLevelId;
    private String toLevelName;

    @Schema(description = "Verdict du conseil (PASS, REPEAT, PROMOTED, GRADUATED, ...)")
    private String decision;

    @Schema(example = "13.5")
    private BigDecimal annualAverage;

    private String justification;
    private String orientationAdvice;
    private OffsetDateTime decidedAt;
    private boolean decided;

    public UUID getDecisionId() {
        return decisionId;
    }

    public void setDecisionId(UUID decisionId) {
        this.decisionId = decisionId;
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

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public UUID getFromLevelId() {
        return fromLevelId;
    }

    public void setFromLevelId(UUID fromLevelId) {
        this.fromLevelId = fromLevelId;
    }

    public String getFromLevelName() {
        return fromLevelName;
    }

    public void setFromLevelName(String fromLevelName) {
        this.fromLevelName = fromLevelName;
    }

    public UUID getToLevelId() {
        return toLevelId;
    }

    public void setToLevelId(UUID toLevelId) {
        this.toLevelId = toLevelId;
    }

    public String getToLevelName() {
        return toLevelName;
    }

    public void setToLevelName(String toLevelName) {
        this.toLevelName = toLevelName;
    }

    public String getDecision() {
        return decision;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }

    public BigDecimal getAnnualAverage() {
        return annualAverage;
    }

    public void setAnnualAverage(BigDecimal annualAverage) {
        this.annualAverage = annualAverage;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public String getOrientationAdvice() {
        return orientationAdvice;
    }

    public void setOrientationAdvice(String orientationAdvice) {
        this.orientationAdvice = orientationAdvice;
    }

    public OffsetDateTime getDecidedAt() {
        return decidedAt;
    }

    public void setDecidedAt(OffsetDateTime decidedAt) {
        this.decidedAt = decidedAt;
    }

    public boolean isDecided() {
        return decided;
    }

    public void setDecided(boolean decided) {
        this.decided = decided;
    }
}