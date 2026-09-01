package ci.company.eduops.enrollment.dto.response;

import ci.company.eduops.enrollment.domain.DepartureReason;
import ci.company.eduops.enrollment.domain.DepartureStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

/** One pupil's departure, as the screen shows it. */
@Schema(name = "Departure", description = "La sortie d'un élève")
public class DepartureResponse {

    private UUID id;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String photoUrl;

    private UUID enrollmentId;
    private UUID classroomId;
    private String classroomName;
    private String levelName;

    private DepartureReason reason;
    private String reasonLabel;
    private LocalDate departureDate;

    @Schema(description = "Vrai tant que la date de sortie n'est pas atteinte : l'élève "
            + "est encore en classe.")
    private boolean upcoming;

    private String destinationSchool;
    private String destinationCity;
    private String notes;

    @Schema(description = "Le solde dû figé le jour du départ. Il n'empêche pas la "
            + "sortie : retenir un dossier scolaire pour dette est illégal dans "
            + "beaucoup de pays.", example = "150000.00")
    private BigDecimal outstandingAmount;

    private String currency;

    private boolean exeatIssued;
    private boolean certificateIssued;
    private boolean reportCardIssued;
    private boolean fileReturned;

    @Schema(description = "Pièces remises sur les quatre attendues", example = "3")
    private int documentsIssued;

    @Schema(description = "Vrai quand les quatre pièces sont remises")
    private boolean documentsComplete;

    private DepartureStatus status;
    private String statusLabel;

    @Schema(description = "Faux une fois la sortie soldée ou annulée")
    private boolean editable;

    @Schema(description = "Faux pour une exclusion : la réinscription rouvrirait "
            + "en silence une décision du conseil de discipline.")
    private boolean allowsReturn;

    private OffsetDateTime recordedAt;
    private OffsetDateTime clearedAt;
    private String cancelledReason;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public DepartureReason getReason() {
        return reason;
    }

    public void setReason(DepartureReason reason) {
        this.reason = reason;
    }

    public String getReasonLabel() {
        return reasonLabel;
    }

    public void setReasonLabel(String reasonLabel) {
        this.reasonLabel = reasonLabel;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public boolean isUpcoming() {
        return upcoming;
    }

    public void setUpcoming(boolean upcoming) {
        this.upcoming = upcoming;
    }

    public String getDestinationSchool() {
        return destinationSchool;
    }

    public void setDestinationSchool(String destinationSchool) {
        this.destinationSchool = destinationSchool;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public BigDecimal getOutstandingAmount() {
        return outstandingAmount;
    }

    public void setOutstandingAmount(BigDecimal outstandingAmount) {
        this.outstandingAmount = outstandingAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isExeatIssued() {
        return exeatIssued;
    }

    public void setExeatIssued(boolean exeatIssued) {
        this.exeatIssued = exeatIssued;
    }

    public boolean isCertificateIssued() {
        return certificateIssued;
    }

    public void setCertificateIssued(boolean certificateIssued) {
        this.certificateIssued = certificateIssued;
    }

    public boolean isReportCardIssued() {
        return reportCardIssued;
    }

    public void setReportCardIssued(boolean reportCardIssued) {
        this.reportCardIssued = reportCardIssued;
    }

    public boolean isFileReturned() {
        return fileReturned;
    }

    public void setFileReturned(boolean fileReturned) {
        this.fileReturned = fileReturned;
    }

    public int getDocumentsIssued() {
        return documentsIssued;
    }

    public void setDocumentsIssued(int documentsIssued) {
        this.documentsIssued = documentsIssued;
    }

    public boolean isDocumentsComplete() {
        return documentsComplete;
    }

    public void setDocumentsComplete(boolean documentsComplete) {
        this.documentsComplete = documentsComplete;
    }

    public DepartureStatus getStatus() {
        return status;
    }

    public void setStatus(DepartureStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public boolean isAllowsReturn() {
        return allowsReturn;
    }

    public void setAllowsReturn(boolean allowsReturn) {
        this.allowsReturn = allowsReturn;
    }

    public OffsetDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(OffsetDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    public OffsetDateTime getClearedAt() {
        return clearedAt;
    }

    public void setClearedAt(OffsetDateTime clearedAt) {
        this.clearedAt = clearedAt;
    }

    public String getCancelledReason() {
        return cancelledReason;
    }

    public void setCancelledReason(String cancelledReason) {
        this.cancelledReason = cancelledReason;
    }
}
