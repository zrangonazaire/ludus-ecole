package ci.company.eduops.academicyear.dto.request;

import ci.company.eduops.term.domain.TermType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * Une année scolaire à créer, avec le découpage qu'elle recevra.
 *
 * <p>Le nombre de périodes est demandé plutôt que la liste : une école
 * ivoirienne découpe en trois trimestres ou en deux semestres, et faire saisir
 * six dates à la main pour un cas aussi standard est une corvée qui invite aux
 * fautes de frappe. Les dates générées restent modifiables ensuite.</p>
 */
public class AcademicYearCreateRequest {

    @NotBlank
    @Size(max = 30)
    private String code;

    @Size(max = 120)
    private String label;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private TermType termType;

    /**
     * Combien de périodes découper.
     *
     * <p>Borné à six : au-delà, il ne s'agit plus d'un découpage scolaire mais
     * d'une saisie manuelle, et un nombre absurde produirait des périodes de
     * quelques jours sans que rien ne l'arrête.</p>
     */
    @NotNull
    @Min(1)
    @Max(6)
    private Integer termCount;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

    public TermType getTermType() {
        return termType;
    }

    public void setTermType(TermType termType) {
        this.termType = termType;
    }

    public Integer getTermCount() {
        return termCount;
    }

    public void setTermCount(Integer termCount) {
        this.termCount = termCount;
    }
}
