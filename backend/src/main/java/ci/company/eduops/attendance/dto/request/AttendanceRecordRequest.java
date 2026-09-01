package ci.company.eduops.attendance.dto.request;

import ci.company.eduops.attendance.domain.AttendanceStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;
import java.util.UUID;

/** One pupil's mark on the sheet being submitted. */
@Schema(name = "AttendanceRecordPayload", description = "La marque d'un élève sur la feuille")
public class AttendanceRecordRequest {

    @NotNull
    private UUID studentId;

    @NotNull
    @Schema(description = "PRESENT, ABSENT, LATE, EXCUSED_ABSENCE, EXCUSED_LATE ou LEFT_EARLY")
    private AttendanceStatus status;

    @Schema(description = "Obligatoire pour un retard : sans elle, le retard n'est pas mesurable",
            example = "08:15")
    private LocalTime arrivalTime;

    @Schema(description = "Heure de départ, pour un élève parti avant la fin", example = "11:00")
    private LocalTime departureTime;

    @Min(0)
    @Max(600)
    private Integer minutesLate;

    @Size(max = 255)
    @Schema(description = "Motif annoncé, tel qu'il a été rapporté. Il ne vaut pas justificatif.")
    private String reason;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    public Integer getMinutesLate() {
        return minutesLate;
    }

    public void setMinutesLate(Integer minutesLate) {
        this.minutesLate = minutesLate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
