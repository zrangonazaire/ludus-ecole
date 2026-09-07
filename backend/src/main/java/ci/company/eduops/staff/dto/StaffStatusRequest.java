package ci.company.eduops.staff.dto;

import ci.company.eduops.staff.domain.StaffStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Un changement de situation, avec son motif.
 *
 * <p>Le motif n'est pas décoratif : il part dans le journal d'audit. Six mois
 * plus tard, « suspendu » sans raison consignée est une information qui ne
 * sert plus à personne et que plus personne ne peut reconstituer.</p>
 */
public class StaffStatusRequest {

    @NotNull
    private StaffStatus status;

    @Size(max = 500)
    private String reason;

    public StaffStatus getStatus() {
        return status;
    }

    public void setStatus(StaffStatus status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
