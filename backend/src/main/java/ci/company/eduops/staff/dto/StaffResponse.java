package ci.company.eduops.staff.dto;

import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.staff.domain.StaffStatus;

import java.time.LocalDate;
import java.util.UUID;

/** Un membre du personnel non enseignant, tel que l'écran le montre. */
public class StaffResponse {

    private UUID id;
    private String employeeNumber;
    private String firstName;
    private String lastName;
    private String fullName;
    private Gender gender;
    private String email;
    private String phone;
    private String jobTitle;
    private String department;
    private LocalDate hireDate;
    private ContractType contractType;
    private String contractTypeLabel;
    private StaffStatus status;
    private String statusLabel;
    private UUID campusId;
    private String campusName;

    /**
     * Existe-t-il un compte de connexion rattaché ?
     *
     * <p>Un booléen, jamais l'identifiant du compte : cet écran gère des
     * dossiers de personnel, pas des accès. Exposer l'identifiant inviterait à
     * bricoler les droits depuis ici, alors que la gestion des comptes a son
     * propre écran et ses propres garde-fous.</p>
     */
    private boolean hasUserAccount;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public String getContractTypeLabel() {
        return contractTypeLabel;
    }

    public void setContractTypeLabel(String contractTypeLabel) {
        this.contractTypeLabel = contractTypeLabel;
    }

    public StaffStatus getStatus() {
        return status;
    }

    public void setStatus(StaffStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public boolean isHasUserAccount() {
        return hasUserAccount;
    }

    public void setHasUserAccount(boolean hasUserAccount) {
        this.hasUserAccount = hasUserAccount;
    }
}
