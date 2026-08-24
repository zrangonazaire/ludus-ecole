package ci.company.eduops.finance.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * What one level costs a family for the year.
 *
 * <p>Every level appears, including those with no price at all. A level without
 * tuition is not an empty row to scroll past — it is a level whose enrolments
 * will generate nothing to collect, and it says so.</p>
 */
@Schema(name = "LevelFees", description = "Le coût annuel d'un niveau")
public class LevelFeesResponse {

    private UUID levelId;
    private String levelName;
    private String levelCode;
    private UUID cycleId;
    private String cycleName;
    private int sequence;

    @Schema(example = "3", description = "Nombre de tarifs définis sur ce niveau")
    private int scheduleCount;

    @Schema(example = "625000.00", description = "Total dû par élève, frais obligatoires seulement")
    private BigDecimal mandatoryTotal;

    @Schema(example = "75000.00", description = "Total des frais facultatifs proposés")
    private BigDecimal optionalTotal;

    @Schema(example = "3", description = "Nombre d'échéances du frais principal")
    private int instalmentCount;

    @Schema(description = "Vrai quand le niveau porte au moins un tarif obligatoire")
    private boolean ready;

    private String currency;

    private List<FeeScheduleResponse> schedules = new ArrayList<>();

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(String levelCode) {
        this.levelCode = levelCode;
    }

    public UUID getCycleId() {
        return cycleId;
    }

    public void setCycleId(UUID cycleId) {
        this.cycleId = cycleId;
    }

    public String getCycleName() {
        return cycleName;
    }

    public void setCycleName(String cycleName) {
        this.cycleName = cycleName;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public int getScheduleCount() {
        return scheduleCount;
    }

    public void setScheduleCount(int scheduleCount) {
        this.scheduleCount = scheduleCount;
    }

    public BigDecimal getMandatoryTotal() {
        return mandatoryTotal;
    }

    public void setMandatoryTotal(BigDecimal mandatoryTotal) {
        this.mandatoryTotal = mandatoryTotal;
    }

    public BigDecimal getOptionalTotal() {
        return optionalTotal;
    }

    public void setOptionalTotal(BigDecimal optionalTotal) {
        this.optionalTotal = optionalTotal;
    }

    public int getInstalmentCount() {
        return instalmentCount;
    }

    public void setInstalmentCount(int instalmentCount) {
        this.instalmentCount = instalmentCount;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public List<FeeScheduleResponse> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<FeeScheduleResponse> schedules) {
        this.schedules = schedules;
    }
}
