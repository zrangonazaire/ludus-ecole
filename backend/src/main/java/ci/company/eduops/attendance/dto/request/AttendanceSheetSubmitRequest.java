package ci.company.eduops.attendance.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A whole sheet, submitted in one call.
 *
 * <p>Marks travel together rather than one request per pupil: a roll call is one
 * decision taken at one moment, and half a saved sheet is worse than none — it
 * reads as "twelve present, and nothing known about the rest".</p>
 */
@Schema(name = "AttendanceSheetSubmit", description = "Une feuille d'appel complète")
public class AttendanceSheetSubmitRequest {

    @NotNull
    private UUID classroomId;

    @NotNull
    @Schema(description = "Le jour de l'appel. Une date future est refusée.")
    private LocalDate sessionDate;

    @Schema(description = "Nul pour l'appel du jour ; renseigné pour l'appel d'un cours")
    private UUID subjectId;

    private LocalTime startTime;

    private LocalTime endTime;

    @NotEmpty
    @Valid
    private List<AttendanceRecordRequest> records = new ArrayList<>();

    @Size(max = 120)
    @Schema(description = "Rejouer le même envoi avec la même clé ne crée pas "
            + "une seconde feuille : la première est renvoyée telle quelle.")
    private String idempotencyKey;

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
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

    public List<AttendanceRecordRequest> getRecords() {
        return records;
    }

    public void setRecords(List<AttendanceRecordRequest> records) {
        this.records = records;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }
}
