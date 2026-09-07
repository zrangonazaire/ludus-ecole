package ci.company.eduops.academicyear.dto.response;

import ci.company.eduops.academicyear.domain.AcademicYearStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Une année scolaire, avec ce qu'il faut pour décider quoi en faire.
 *
 * <p>Porte les compteurs d'inscriptions et de classes : basculer l'année
 * active change ce que voient une vingtaine d'écrans, et la question qu'on se
 * pose avant de le faire est « qu'y a-t-il déjà dedans ? ». Obliger à ouvrir
 * un autre écran pour le savoir, c'est inviter à basculer sans regarder.</p>
 */
public class AcademicYearResponse {

    private UUID id;
    private String code;
    private String label;
    private LocalDate startDate;
    private LocalDate endDate;
    private AcademicYearStatus status;
    private String statusLabel;

    /** Vrai pour l'unique année sur laquelle travaillent tous les écrans. */
    private boolean active;

    /** Vrai si l'année peut encore recevoir des écritures. */
    private boolean editable;

    private long classroomCount;
    private long enrollmentCount;
    private List<TermResponse> terms = List.of();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public AcademicYearStatus getStatus() {
        return status;
    }

    public void setStatus(AcademicYearStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public long getClassroomCount() {
        return classroomCount;
    }

    public void setClassroomCount(long classroomCount) {
        this.classroomCount = classroomCount;
    }

    public long getEnrollmentCount() {
        return enrollmentCount;
    }

    public void setEnrollmentCount(long enrollmentCount) {
        this.enrollmentCount = enrollmentCount;
    }

    public List<TermResponse> getTerms() {
        return terms;
    }

    public void setTerms(List<TermResponse> terms) {
        this.terms = terms;
    }
}
