package ci.company.eduops.council.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

/**
 * Edits the practical details of a council while it is still open.
 *
 * <p>Nothing here re-opens a sealed council: the status is only changed through
 * the dedicated start/close endpoints.</p>
 */
@Schema(name = "CouncilUpdateRequest", description = "Modification d'un conseil de classe")
public class CouncilUpdateRequest {

    @Schema(description = "Date de la réunion")
    private LocalDate meetingDate;

    @Schema(description = "Heure de début (HH:mm)")
    private LocalTime startTime;

    @Schema(description = "Heure de fin (HH:mm)")
    private LocalTime endTime;

    @Schema(description = "Compte utilisateur qui préside")
    private UUID chairedBy;

    @Size(max = 150)
    @Schema(description = "Lieu de la réunion")
    private String location;

    @Schema(description = "Observations du conseil")
    private String remarks;

    @Size(max = 500)
    @Schema(description = "Lien vers le procès-verbal")
    private String minutesUrl;

    public LocalDate getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDate meetingDate) {
        this.meetingDate = meetingDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public UUID getChairedBy() {
        return chairedBy;
    }

    public void setChairedBy(UUID chairedBy) {
        this.chairedBy = chairedBy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getMinutesUrl() {
        return minutesUrl;
    }

    public void setMinutesUrl(String minutesUrl) {
        this.minutesUrl = minutesUrl;
    }
}