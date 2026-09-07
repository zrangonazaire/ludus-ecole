package ci.company.eduops.council.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

/**
 * Opens a class council for one class and one grading period.
 *
 * <p>The academic year is always the one the classroom belongs to; the caller
 * only says which class and which term.</p>
 */
@Schema(name = "CouncilCreateRequest", description = "Création d'un conseil de classe")
public class CouncilCreateRequest {

    @NotNull
    @Schema(description = "Classe concernée", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID classroomId;

    @NotNull
    @Schema(description = "Période (trimestre/semestre) du conseil", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID termId;

    @NotNull
    @Schema(description = "Date de la réunion", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDate meetingDate;

    @Schema(description = "Heure de début (HH:mm)")
    private LocalTime startTime;

    @Schema(description = "Heure de fin (HH:mm)")
    private LocalTime endTime;

    @Schema(description = "Compte utilisateur qui préside")
    private UUID chairedBy;

    @Size(max = 150)
    @Schema(description = "Lieu de la réunion", example = "Salle des professeurs")
    private String location;

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

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
}