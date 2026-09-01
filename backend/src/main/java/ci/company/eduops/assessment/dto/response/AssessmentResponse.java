package ci.company.eduops.assessment.dto.response;

import ci.company.eduops.assessment.domain.AssessmentStatus;
import ci.company.eduops.assessment.domain.AssessmentType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * One assessment as the board shows it.
 *
 * <p>Carries how far the marking has got, not only the status. « En correction »
 * says nothing useful on its own; « 12 notes sur 34 » says whether the teacher
 * has started or is nearly done.</p>
 */
@Schema(name = "Assessment", description = "Un devoir")
public class AssessmentResponse {

    private UUID id;
    private String title;
    private String description;

    private UUID classroomId;
    private String classroomName;
    private UUID subjectId;
    private String subjectName;
    private String subjectColor;
    private UUID teacherId;
    private String teacherName;
    private UUID termId;
    private String termName;

    private AssessmentType assessmentType;
    private String assessmentTypeLabel;
    private LocalDate assessmentDate;
    private Integer durationMinutes;

    private BigDecimal maxScore;
    private BigDecimal coefficient;
    private boolean countsForAverage;

    private AssessmentStatus status;
    private String statusLabel;

    @Schema(description = "Élèves inscrits dans la classe le jour de la lecture")
    private int studentCount;

    @Schema(description = "Élèves ayant une note ou une absence saisie", example = "12")
    private int gradedCount;

    @Schema(description = "Moyenne de la classe, ramenée sur le barème. "
            + "Nulle tant qu'aucune note n'est saisie : zéro serait un mensonge.",
            example = "11.75")
    private BigDecimal classAverage;

    @Schema(description = "Vrai quand la saisie des notes est ouverte")
    private boolean gradeEntryOpen;

    @Schema(description = "Vrai quand toutes les notes sont saisies et que le devoir "
            + "peut passer à l'étape suivante")
    private boolean readyForNextStep;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectColor() {
        return subjectColor;
    }

    public void setSubjectColor(String subjectColor) {
        this.subjectColor = subjectColor;
    }

    public UUID getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
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

    public AssessmentType getAssessmentType() {
        return assessmentType;
    }

    public void setAssessmentType(AssessmentType assessmentType) {
        this.assessmentType = assessmentType;
    }

    public String getAssessmentTypeLabel() {
        return assessmentTypeLabel;
    }

    public void setAssessmentTypeLabel(String assessmentTypeLabel) {
        this.assessmentTypeLabel = assessmentTypeLabel;
    }

    public LocalDate getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(LocalDate assessmentDate) {
        this.assessmentDate = assessmentDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public BigDecimal getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(BigDecimal maxScore) {
        this.maxScore = maxScore;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    public boolean isCountsForAverage() {
        return countsForAverage;
    }

    public void setCountsForAverage(boolean countsForAverage) {
        this.countsForAverage = countsForAverage;
    }

    public AssessmentStatus getStatus() {
        return status;
    }

    public void setStatus(AssessmentStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public int getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(int studentCount) {
        this.studentCount = studentCount;
    }

    public int getGradedCount() {
        return gradedCount;
    }

    public void setGradedCount(int gradedCount) {
        this.gradedCount = gradedCount;
    }

    public BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(BigDecimal classAverage) {
        this.classAverage = classAverage;
    }

    public boolean isGradeEntryOpen() {
        return gradeEntryOpen;
    }

    public void setGradeEntryOpen(boolean gradeEntryOpen) {
        this.gradeEntryOpen = gradeEntryOpen;
    }

    public boolean isReadyForNextStep() {
        return readyForNextStep;
    }

    public void setReadyForNextStep(boolean readyForNextStep) {
        this.readyForNextStep = readyForNextStep;
    }
}
