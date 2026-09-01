package ci.company.eduops.assessment.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The assessments of a term, with what is stuck.
 *
 * <p>The counters name the two states that hold everything else up: papers sat
 * but not corrected, and marks entered but not validated. Neither shows up as a
 * problem anywhere else, and both stop the report cards.</p>
 */
@Schema(name = "AssessmentBoard", description = "Les devoirs d'une période")
public class AssessmentBoardResponse {

    private UUID academicYearId;
    private UUID termId;
    private String termName;
    private LocalDate termStart;
    private LocalDate termEnd;

    private int total;

    @Schema(description = "Devoirs annoncés, pas encore passés", example = "6")
    private int plannedCount;

    @Schema(description = "Devoirs passés dont la correction n'est pas finie", example = "4")
    private int gradingCount;

    @Schema(description = "Notes saisies qui attendent la validation de l'administration",
            example = "2")
    private int awaitingValidationCount;

    @Schema(description = "Devoirs validés que les familles ne voient pas encore",
            example = "1")
    private int awaitingPublicationCount;

    private int publishedCount;

    @Schema(description = "Devoirs passés depuis plus de sept jours dont la correction "
            + "n'a pas commencé. Passé une semaine, une copie non rendue ne se "
            + "rattrape plus dans le trimestre.", example = "1")
    private int overdueCount;

    private List<AssessmentResponse> assessments = new ArrayList<>();

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public LocalDate getTermStart() {
        return termStart;
    }

    public void setTermStart(LocalDate termStart) {
        this.termStart = termStart;
    }

    public LocalDate getTermEnd() {
        return termEnd;
    }

    public void setTermEnd(LocalDate termEnd) {
        this.termEnd = termEnd;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPlannedCount() {
        return plannedCount;
    }

    public void setPlannedCount(int plannedCount) {
        this.plannedCount = plannedCount;
    }

    public int getGradingCount() {
        return gradingCount;
    }

    public void setGradingCount(int gradingCount) {
        this.gradingCount = gradingCount;
    }

    public int getAwaitingValidationCount() {
        return awaitingValidationCount;
    }

    public void setAwaitingValidationCount(int awaitingValidationCount) {
        this.awaitingValidationCount = awaitingValidationCount;
    }

    public int getAwaitingPublicationCount() {
        return awaitingPublicationCount;
    }

    public void setAwaitingPublicationCount(int awaitingPublicationCount) {
        this.awaitingPublicationCount = awaitingPublicationCount;
    }

    public int getPublishedCount() {
        return publishedCount;
    }

    public void setPublishedCount(int publishedCount) {
        this.publishedCount = publishedCount;
    }

    public int getOverdueCount() {
        return overdueCount;
    }

    public void setOverdueCount(int overdueCount) {
        this.overdueCount = overdueCount;
    }

    public List<AssessmentResponse> getAssessments() {
        return assessments;
    }

    public void setAssessments(List<AssessmentResponse> assessments) {
        this.assessments = assessments;
    }
}
