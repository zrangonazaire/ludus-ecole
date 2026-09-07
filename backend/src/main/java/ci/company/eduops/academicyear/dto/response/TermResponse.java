package ci.company.eduops.academicyear.dto.response;

import ci.company.eduops.term.domain.TermStatus;
import ci.company.eduops.term.domain.TermType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/** Une période de l'année, telle que l'écran la montre. */
public class TermResponse {

    private UUID id;
    private String name;
    private String code;
    private TermType termType;
    private String termTypeLabel;
    private int sequence;
    private LocalDate startDate;
    private LocalDate endDate;
    private TermStatus status;
    private String statusLabel;

    /**
     * Le poids de la période dans la moyenne annuelle.
     *
     * <p>{@code BigDecimal} et non {@code double} : un poids intervient dans
     * le calcul d'une moyenne qui décide d'un passage de classe.</p>
     */
    private BigDecimal weight;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public TermType getTermType() {
        return termType;
    }

    public void setTermType(TermType termType) {
        this.termType = termType;
    }

    public String getTermTypeLabel() {
        return termTypeLabel;
    }

    public void setTermTypeLabel(String termTypeLabel) {
        this.termTypeLabel = termTypeLabel;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public TermStatus getStatus() {
        return status;
    }

    public void setStatus(TermStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }
}
