package ci.company.eduops.assessment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

/**
 * Correction of a mark the family has already seen.
 *
 * <p>The justification is mandatory and kept. A published mark that changes
 * without a written reason is indistinguishable from a mark that was tampered
 * with, and the pupil has no way to contest it.</p>
 */
@Schema(name = "GradeCorrection", description = "La correction d'une note déjà publiée")
public class GradeCorrectionRequest {

    @DecimalMin("0")
    @Schema(description = "La nouvelle note. Nulle pour marquer l'élève absent.")
    private BigDecimal score;

    private boolean absent;

    @NotBlank
    @Size(max = 500)
    @Schema(description = "Pourquoi la note change, en clair. Ce texte est conservé "
            + "avec l'ancienne valeur et reste consultable.",
            example = "Erreur d'addition sur la copie, exercice 3 recompté")
    private String justification;

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

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }
}
