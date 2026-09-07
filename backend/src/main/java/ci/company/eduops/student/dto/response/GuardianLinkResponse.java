package ci.company.eduops.student.dto.response;

import java.util.UUID;

/**
 * One guardian, as seen from the pupil's file.
 *
 * <p>The consent flags travel with the link, not with the guardian: the same
 * person can receive the fee reminders for one child and nothing for another,
 * and flattening that would send letters to the wrong parent.</p>
 */
public class GuardianLinkResponse {

    private UUID id;
    private UUID guardianId;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phone;
    private String email;
    private String relationship;
    private boolean primary;
    private boolean financialResponsibility;
    private boolean canPickupStudent;
    private boolean receivesNotifications;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(UUID guardianId) {
        this.guardianId = guardianId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public boolean isPrimary() {
        return primary;
    }

    public void setPrimary(boolean primary) {
        this.primary = primary;
    }

    public boolean isFinancialResponsibility() {
        return financialResponsibility;
    }

    public void setFinancialResponsibility(boolean financialResponsibility) {
        this.financialResponsibility = financialResponsibility;
    }

    public boolean isCanPickupStudent() {
        return canPickupStudent;
    }

    public void setCanPickupStudent(boolean canPickupStudent) {
        this.canPickupStudent = canPickupStudent;
    }

    public boolean isReceivesNotifications() {
        return receivesNotifications;
    }

    public void setReceivesNotifications(boolean receivesNotifications) {
        this.receivesNotifications = receivesNotifications;
    }
}
