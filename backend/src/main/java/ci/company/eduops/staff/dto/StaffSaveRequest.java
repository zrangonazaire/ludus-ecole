package ci.company.eduops.staff.dto;

import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.domain.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

/**
 * La fiche d'un membre du personnel, à la création comme à la modification.
 *
 * <p>Ni le statut ni le matricule ne figurent ici. Le matricule est attribué
 * par le serveur et ne bouge plus : c'est la référence qu'on retrouve sur les
 * bulletins de paie et les registres. Le statut change par une action nommée
 * — mettre en congé, suspendre, acter un départ — et non en éditant un
 * formulaire, parce que chacun de ces gestes mérite d'être décidé, pas glissé
 * au milieu d'une correction d'adresse.</p>
 */
public class StaffSaveRequest {

    @NotBlank
    @Size(max = 120)
    private String firstName;

    @NotBlank
    @Size(max = 120)
    private String lastName;

    private Gender gender;

    @Email
    @Size(max = 180)
    private String email;

    @Size(max = 40)
    private String phone;

    @NotBlank
    @Size(max = 150)
    private String jobTitle;

    @Size(max = 120)
    private String department;

    @NotNull
    private LocalDate hireDate;

    @NotNull
    private ContractType contractType;

    private UUID campusId;

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

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
    }
}
