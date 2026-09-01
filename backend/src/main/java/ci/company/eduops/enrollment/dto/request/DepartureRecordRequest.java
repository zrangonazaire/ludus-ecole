package ci.company.eduops.enrollment.dto.request;

import ci.company.eduops.enrollment.domain.DepartureReason;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

/** Recording that a pupil leaves the school. */
@Schema(name = "DepartureRecord", description = "La sortie d'un élève de l'établissement")
public class DepartureRecordRequest {

    @NotNull
    private UUID enrollmentId;

    @NotNull
    @Schema(description = "Le motif décide des pièces à remettre et de la possibilité "
            + "d'une réinscription ultérieure.")
    private DepartureReason reason;

    @NotNull
    @Schema(description = "Le dernier jour de présence. Peut être à venir : une famille "
            + "annonce souvent son départ pour la fin du mois.")
    private LocalDate departureDate;

    @Size(max = 200)
    @Schema(description = "Obligatoire pour un transfert : sans nom d'établissement, "
            + "l'exeat ne peut être rapproché par l'école d'accueil.",
            example = "Collège Moderne de Cocody")
    private String destinationSchool;

    @Size(max = 120)
    private String destinationCity;

    @Size(max = 2000)
    private String notes;

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public DepartureReason getReason() {
        return reason;
    }

    public void setReason(DepartureReason reason) {
        this.reason = reason;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public String getDestinationSchool() {
        return destinationSchool;
    }

    public void setDestinationSchool(String destinationSchool) {
        this.destinationSchool = destinationSchool;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
