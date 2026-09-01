package ci.company.eduops.assessment.dto.response;

import ci.company.eduops.grade.domain.GradeStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

/** One line of a grade sheet. */
@Schema(name = "GradeRow", description = "La note d'un élève sur un devoir")
public class GradeRowResponse {

    @Schema(description = "Nul tant qu'aucune note n'a été enregistrée pour cet élève")
    private UUID id;

    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String photoUrl;

    @Schema(description = "Nulle quand l'élève est absent, dispensé, ou pas encore corrigé")
    private BigDecimal score;

    @Schema(description = "La note ramenée sur le barème du devoir, telle qu'elle "
            + "entrera dans la moyenne", example = "16.000")
    private BigDecimal normalizedScore;

    private boolean absent;
    private boolean exempted;
    private String comment;

    private GradeStatus status;
    private String statusLabel;

    @Schema(description = "Vrai quand la note a déjà été publiée : la corriger exige "
            + "un motif écrit, conservé avec l'ancienne valeur.")
    private boolean requiresJustifiedCorrection;

    @Schema(description = "Nombre de corrections déjà apportées à cette note", example = "0")
    private int revisionCount;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public BigDecimal getNormalizedScore() {
        return normalizedScore;
    }

    public void setNormalizedScore(BigDecimal normalizedScore) {
        this.normalizedScore = normalizedScore;
    }

    public boolean isAbsent() {
        return absent;
    }

    public void setAbsent(boolean absent) {
        this.absent = absent;
    }

    public boolean isExempted() {
        return exempted;
    }

    public void setExempted(boolean exempted) {
        this.exempted = exempted;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public GradeStatus getStatus() {
        return status;
    }

    public void setStatus(GradeStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public boolean isRequiresJustifiedCorrection() {
        return requiresJustifiedCorrection;
    }

    public void setRequiresJustifiedCorrection(boolean requiresJustifiedCorrection) {
        this.requiresJustifiedCorrection = requiresJustifiedCorrection;
    }

    public int getRevisionCount() {
        return revisionCount;
    }

    public void setRevisionCount(int revisionCount) {
        this.revisionCount = revisionCount;
    }
}
