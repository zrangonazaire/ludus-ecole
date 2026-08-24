package ci.company.eduops.timetable.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A whole week, ready to be drawn.
 *
 * <p>The screen receives the days and the time ruler alongside the slots rather
 * than deducing them: a school running Saturday mornings and one stopping on
 * Friday should not need different frontend code.</p>
 */
@Schema(name = "TimetableGrid", description = "Une semaine complète, prête à afficher")
public class TimetableGridResponse {

    @Schema(example = "CLASSROOM", description = "CLASSROOM, TEACHER ou ROOM")
    private String scope;

    private UUID scopeId;

    @Schema(example = "6e A", description = "Nom de la classe, du professeur ou de la salle")
    private String scopeLabel;

    private UUID timetableId;

    @Schema(example = "DRAFT", description = "DRAFT, PUBLISHED ou ARCHIVED. Nul en vue professeur ou salle.")
    private String status;

    @Schema(description = "Vrai quand la grille peut être modifiée dans cette vue")
    private boolean editable;

    @Schema(example = "[\"MONDAY\",\"TUESDAY\"]", description = "Jours ouvrés de l'établissement")
    private List<String> days = new ArrayList<>();

    @Schema(example = "07:00")
    private LocalTime dayStart;

    @Schema(example = "18:00")
    private LocalTime dayEnd;

    @Schema(example = "60", description = "Pas de la règle horaire, en minutes")
    private int stepMinutes;

    private List<TimetableSlotResponse> slots = new ArrayList<>();

    @Schema(example = "1320", description = "Total hebdomadaire en minutes")
    private int totalMinutes;

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public UUID getScopeId() {
        return scopeId;
    }

    public void setScopeId(UUID scopeId) {
        this.scopeId = scopeId;
    }

    public String getScopeLabel() {
        return scopeLabel;
    }

    public void setScopeLabel(String scopeLabel) {
        this.scopeLabel = scopeLabel;
    }

    public UUID getTimetableId() {
        return timetableId;
    }

    public void setTimetableId(UUID timetableId) {
        this.timetableId = timetableId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public List<String> getDays() {
        return days;
    }

    public void setDays(List<String> days) {
        this.days = days;
    }

    public LocalTime getDayStart() {
        return dayStart;
    }

    public void setDayStart(LocalTime dayStart) {
        this.dayStart = dayStart;
    }

    public LocalTime getDayEnd() {
        return dayEnd;
    }

    public void setDayEnd(LocalTime dayEnd) {
        this.dayEnd = dayEnd;
    }

    public int getStepMinutes() {
        return stepMinutes;
    }

    public void setStepMinutes(int stepMinutes) {
        this.stepMinutes = stepMinutes;
    }

    public List<TimetableSlotResponse> getSlots() {
        return slots;
    }

    public void setSlots(List<TimetableSlotResponse> slots) {
        this.slots = slots;
    }

    public int getTotalMinutes() {
        return totalMinutes;
    }

    public void setTotalMinutes(int totalMinutes) {
        this.totalMinutes = totalMinutes;
    }
}
