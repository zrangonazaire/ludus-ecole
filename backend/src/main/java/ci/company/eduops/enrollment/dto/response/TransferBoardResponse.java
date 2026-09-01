package ci.company.eduops.enrollment.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Movements of the year: who changed class, who left.
 *
 * <p>The two are kept apart on purpose. A change of class is an internal
 * arrangement; a departure ends the schooling and produces paperwork somebody
 * will ask for years later. Mixing them in one list would bury the second under
 * the first, which is far more frequent.</p>
 */
@Schema(name = "TransferBoard", description = "Les mouvements de l'année")
public class TransferBoardResponse {

    private UUID academicYearId;
    private String academicYearCode;

    @Schema(description = "Changements de classe enregistrés cette année", example = "12")
    private int classChangeCount;

    @Schema(description = "Sorties enregistrées, pièces non encore toutes remises",
            example = "4")
    private int pendingDepartureCount;

    @Schema(description = "Sorties soldées : toutes les pièces ont été remises",
            example = "9")
    private int clearedDepartureCount;

    @Schema(description = "Sorties annoncées dont la date n'est pas encore atteinte : "
            + "l'élève est encore en classe.", example = "2")
    private int upcomingDepartureCount;

    @Schema(description = "Total dû par les familles qui partent, tous départs non "
            + "soldés confondus. Affiché, jamais bloquant.", example = "450000.00")
    private BigDecimal outstandingTotal;

    private String currency;

    private List<ClassChangeResponse> classChanges = new ArrayList<>();
    private List<DepartureResponse> departures = new ArrayList<>();

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public String getAcademicYearCode() {
        return academicYearCode;
    }

    public void setAcademicYearCode(String academicYearCode) {
        this.academicYearCode = academicYearCode;
    }

    public int getClassChangeCount() {
        return classChangeCount;
    }

    public void setClassChangeCount(int classChangeCount) {
        this.classChangeCount = classChangeCount;
    }

    public int getPendingDepartureCount() {
        return pendingDepartureCount;
    }

    public void setPendingDepartureCount(int pendingDepartureCount) {
        this.pendingDepartureCount = pendingDepartureCount;
    }

    public int getClearedDepartureCount() {
        return clearedDepartureCount;
    }

    public void setClearedDepartureCount(int clearedDepartureCount) {
        this.clearedDepartureCount = clearedDepartureCount;
    }

    public int getUpcomingDepartureCount() {
        return upcomingDepartureCount;
    }

    public void setUpcomingDepartureCount(int upcomingDepartureCount) {
        this.upcomingDepartureCount = upcomingDepartureCount;
    }

    public BigDecimal getOutstandingTotal() {
        return outstandingTotal;
    }

    public void setOutstandingTotal(BigDecimal outstandingTotal) {
        this.outstandingTotal = outstandingTotal;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public List<ClassChangeResponse> getClassChanges() {
        return classChanges;
    }

    public void setClassChanges(List<ClassChangeResponse> classChanges) {
        this.classChanges = classChanges;
    }

    public List<DepartureResponse> getDepartures() {
        return departures;
    }

    public void setDepartures(List<DepartureResponse> departures) {
        this.departures = departures;
    }
}
