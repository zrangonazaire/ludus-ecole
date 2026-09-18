package ci.company.eduops.timetable.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.List;

/**
 * Réglages de la grille horaire de l'établissement : jours ouvrés, heures de
 * début et de fin de journée, pas d'affichage de la grille.
 *
 * <p>Écrits dans les réglages de l'école (clés « timetable.* ») : ils
 * s'appliquent à toutes les grilles — classes, enseignants, salles.</p>
 */
@Schema(name = "TimetableSettingsRequest", description = "Réglages de la grille horaire de l'établissement")
public class TimetableSettingsRequest {

    @NotEmpty
    @Schema(description = "Jours ouvrés affichés sur la grille", example = "[\"MONDAY\", \"TUESDAY\"]")
    private List<String> days;

    @NotNull
    @Pattern(regexp = "^([01]\\d|2[0-3]):[0-5]\\d$", message = "L'heure de début doit être au format HH:mm")
    @Schema(description = "Début de la journée, format HH:mm", example = "07:00")
    private String dayStart;

    @NotNull
    @Pattern(regexp = "^([01]\\d|2[0-3]):[0-5]\\d$", message = "L'heure de fin doit être au format HH:mm")
    @Schema(description = "Fin de la journée, format HH:mm", example = "18:00")
    private String dayEnd;

    @NotNull
    @Min(5)
    @Max(240)
    @Schema(description = "Pas de la grille en minutes", example = "30")
    private Integer stepMinutes;

    public List<String> getDays() {
        return days;
    }

    public void setDays(List<String> days) {
        this.days = days;
    }

    public String getDayStart() {
        return dayStart;
    }

    public void setDayStart(String dayStart) {
        this.dayStart = dayStart;
    }

    public String getDayEnd() {
        return dayEnd;
    }

    public void setDayEnd(String dayEnd) {
        this.dayEnd = dayEnd;
    }

    public Integer getStepMinutes() {
        return stepMinutes;
    }

    public void setStepMinutes(Integer stepMinutes) {
        this.stepMinutes = stepMinutes;
    }
}
