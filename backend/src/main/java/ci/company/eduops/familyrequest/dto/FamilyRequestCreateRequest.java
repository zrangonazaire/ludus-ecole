package ci.company.eduops.familyrequest.dto;

import ci.company.eduops.familyrequest.domain.FamilyRequestChannel;
import ci.company.eduops.familyrequest.domain.FamilyRequestPriority;
import ci.company.eduops.familyrequest.domain.FamilyRequestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/** What the front desk records when a family asks for something. */
public class FamilyRequestCreateRequest {

    @NotNull
    private UUID studentId;

    @NotBlank
    @Size(max = 160)
    private String guardianName;

    @Size(max = 40)
    private String guardianPhone;

    @NotNull
    private FamilyRequestType type;

    @NotBlank
    @Size(max = 200)
    private String subject;

    @Size(max = 2000)
    private String description;

    @NotNull
    private FamilyRequestPriority priority;

    @NotNull
    private FamilyRequestChannel channel;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getGuardianPhone() {
        return guardianPhone;
    }

    public void setGuardianPhone(String guardianPhone) {
        this.guardianPhone = guardianPhone;
    }

    public FamilyRequestType getType() {
        return type;
    }

    public void setType(FamilyRequestType type) {
        this.type = type;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FamilyRequestPriority getPriority() {
        return priority;
    }

    public void setPriority(FamilyRequestPriority priority) {
        this.priority = priority;
    }

    public FamilyRequestChannel getChannel() {
        return channel;
    }

    public void setChannel(FamilyRequestChannel channel) {
        this.channel = channel;
    }
}
