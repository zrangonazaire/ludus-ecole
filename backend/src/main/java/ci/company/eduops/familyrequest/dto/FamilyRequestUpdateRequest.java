package ci.company.eduops.familyrequest.dto;

import ci.company.eduops.familyrequest.domain.FamilyRequestStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** What the office changes while it works through a request. */
public class FamilyRequestUpdateRequest {

    @NotNull
    private FamilyRequestStatus status;

    @Size(max = 160)
    private String assignedTo;

    @Size(max = 2000)
    private String internalNote;

    public FamilyRequestStatus getStatus() {
        return status;
    }

    public void setStatus(FamilyRequestStatus status) {
        this.status = status;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getInternalNote() {
        return internalNote;
    }

    public void setInternalNote(String internalNote) {
        this.internalNote = internalNote;
    }
}
