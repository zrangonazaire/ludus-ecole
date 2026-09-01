package ci.company.eduops.assessment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.UUID;

/** One pupil's mark on one assessment. */
@Schema(name = "GradeEntry", description = "La note d'un élève")
public class GradeEntryRequest {

    @NotNull
    private UUID studentId;

    @DecimalMin("0")
    @Schema(description = "Nulle quand l'élève est absent ou dispensé. Une note vide "
            + "n'est pas un zéro : un zéro se saisit.", example = "13.5")
    private BigDecimal score;

    @Schema(description = "Absent le jour du devoir. La note ne compte pas dans la "
            + "moyenne, elle n'est pas comptée zéro.")
    private boolean absent;

    @Schema(description = "Dispensé de ce devoir. Exclu du dénominateur comme un absent.")
    private boolean exempted;

    @Size(max = 500)
    private String comment;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
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
}
