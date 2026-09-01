package ci.company.eduops.reportcard.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A class's report cards for a term, with what still blocks them.
 *
 * <p>The blockers are named rather than counted. « 3 devoirs non validés » is
 * something the office can act on this afternoon; « bulletins indisponibles »
 * is not.</p>
 */
@Schema(name = "ReportCardBatch", description = "Les bulletins d'une classe pour une période")
public class ReportCardBatchResponse {

    private UUID classroomId;
    private String classroomName;
    private String levelName;
    private UUID termId;
    private String termName;
    private String academicYearCode;

    @Schema(description = "Élèves inscrits dans la classe", example = "32")
    private int studentCount;

    @Schema(description = "Bulletins générés, publiés ou non", example = "32")
    private int generatedCount;

    private int publishedCount;

    @Schema(description = "Devoirs de la période dont les notes ne sont pas validées. "
            + "Générer avant qu'ils le soient produirait des moyennes fausses.",
            example = "3")
    private int unvalidatedAssessments;

    @Schema(description = "Élèves sans aucune note validée sur la période : leur "
            + "bulletin sortirait vide.", example = "1")
    private int studentsWithoutGrades;

    @Schema(description = "Moyenne de la classe, calculée sur les bulletins générés")
    private BigDecimal classAverage;

    private BigDecimal classMinAverage;
    private BigDecimal classMaxAverage;

    @Schema(description = "Élèves ayant la moyenne", example = "24")
    private int passingCount;

    @Schema(description = "Vrai quand la génération peut se faire sans produire de "
            + "moyennes incomplètes")
    private boolean readyToGenerate;

    @Schema(description = "Classement de la classe, du meilleur au dernier. "
            + "Vide tant qu'aucun bulletin n'est généré.")
    private List<ReportCardResponse> reportCards = new ArrayList<>();

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

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
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

    public String getAcademicYearCode() {
        return academicYearCode;
    }

    public void setAcademicYearCode(String academicYearCode) {
        this.academicYearCode = academicYearCode;
    }

    public int getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(int studentCount) {
        this.studentCount = studentCount;
    }

    public int getGeneratedCount() {
        return generatedCount;
    }

    public void setGeneratedCount(int generatedCount) {
        this.generatedCount = generatedCount;
    }

    public int getPublishedCount() {
        return publishedCount;
    }

    public void setPublishedCount(int publishedCount) {
        this.publishedCount = publishedCount;
    }

    public int getUnvalidatedAssessments() {
        return unvalidatedAssessments;
    }

    public void setUnvalidatedAssessments(int unvalidatedAssessments) {
        this.unvalidatedAssessments = unvalidatedAssessments;
    }

    public int getStudentsWithoutGrades() {
        return studentsWithoutGrades;
    }

    public void setStudentsWithoutGrades(int studentsWithoutGrades) {
        this.studentsWithoutGrades = studentsWithoutGrades;
    }

    public BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(BigDecimal classAverage) {
        this.classAverage = classAverage;
    }

    public BigDecimal getClassMinAverage() {
        return classMinAverage;
    }

    public void setClassMinAverage(BigDecimal classMinAverage) {
        this.classMinAverage = classMinAverage;
    }

    public BigDecimal getClassMaxAverage() {
        return classMaxAverage;
    }

    public void setClassMaxAverage(BigDecimal classMaxAverage) {
        this.classMaxAverage = classMaxAverage;
    }

    public int getPassingCount() {
        return passingCount;
    }

    public void setPassingCount(int passingCount) {
        this.passingCount = passingCount;
    }

    public boolean isReadyToGenerate() {
        return readyToGenerate;
    }

    public void setReadyToGenerate(boolean readyToGenerate) {
        this.readyToGenerate = readyToGenerate;
    }

    public List<ReportCardResponse> getReportCards() {
        return reportCards;
    }

    public void setReportCards(List<ReportCardResponse> reportCards) {
        this.reportCards = reportCards;
    }
}
