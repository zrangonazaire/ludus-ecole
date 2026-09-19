package ci.company.eduops.finance.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/** Décision sur le palier en attente d'une demande de réduction. */
@Getter
@Setter
public class DiscountRequestDecisionRequest {

    public enum Decision { APPROVE, REJECT }

    @NotNull
    private Decision decision;

    /** Motif obligatoire en cas de refus, informatif sinon. */
    @Size(max = 2000)
    private String comment;
}
