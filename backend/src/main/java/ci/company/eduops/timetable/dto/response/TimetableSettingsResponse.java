package ci.company.eduops.timetable.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/** Réglages de la grille horaire de l'établissement, tels qu'enregistrés. */
@Schema(name = "TimetableSettingsResponse", description = "Réglages de la grille horaire de l'établissement")
public class TimetableSettingsResponse {

    private List<String> days;
    private String dayStart;
    private String dayEnd;
    private int stepMinutes;

    public static TimetableSettingsResponse of(List<String> days, String dayStart,
                                               String dayEnd, int stepMinutes) {
        TimetableSettingsResponse response = new TimetableSettingsResponse();
        response.days = days;
        response.dayStart = dayStart;
        response.dayEnd = dayEnd;
        response.stepMinutes = stepMinutes;
        return response;
    }

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

    public int getStepMinutes() {
        return stepMinutes;
    }

    public void setStepMinutes(int stepMinutes) {
        this.stepMinutes = stepMinutes;
    }
}
