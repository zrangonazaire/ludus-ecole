package ci.company.eduops.health.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The school health screen, in one call.
 *
 * <p>{@code fullAccess} tells the client which of the two shapes it received.
 * When false, {@code records}, {@code visits} and {@code examinations} are
 * empty and only {@code alerts} is filled: the server has not sent the medical
 * detail at all, rather than sending it and asking the screen to hide it.</p>
 */
public class HealthBoardResponse {

    private UUID academicYearId;
    private String academicYearCode;
    private boolean fullAccess;

    private int alertCount;
    private int visitCountThisWeek;
    private int awaitingGuardianCount;
    private int missingConsentCount;
    private int missingVaccineCount;
    private int overdueExaminationCount;

    private List<HealthAlertResponse> alerts = new ArrayList<>();
    private List<HealthRecordResponse> records = new ArrayList<>();
    private List<InfirmaryVisitResponse> visits = new ArrayList<>();
    private List<ExaminationResponse> examinations = new ArrayList<>();

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public String getAcademicYearCode() {
        return academicYearCode;
    }

    public void setAcademicYearCode(String academicYearCode) {
        this.academicYearCode = academicYearCode;
    }

    public boolean isFullAccess() {
        return fullAccess;
    }

    public void setFullAccess(boolean fullAccess) {
        this.fullAccess = fullAccess;
    }

    public int getAlertCount() {
        return alertCount;
    }

    public void setAlertCount(int alertCount) {
        this.alertCount = alertCount;
    }

    public int getVisitCountThisWeek() {
        return visitCountThisWeek;
    }

    public void setVisitCountThisWeek(int visitCountThisWeek) {
        this.visitCountThisWeek = visitCountThisWeek;
    }

    public int getAwaitingGuardianCount() {
        return awaitingGuardianCount;
    }

    public void setAwaitingGuardianCount(int awaitingGuardianCount) {
        this.awaitingGuardianCount = awaitingGuardianCount;
    }

    public int getMissingConsentCount() {
        return missingConsentCount;
    }

    public void setMissingConsentCount(int missingConsentCount) {
        this.missingConsentCount = missingConsentCount;
    }

    public int getMissingVaccineCount() {
        return missingVaccineCount;
    }

    public void setMissingVaccineCount(int missingVaccineCount) {
        this.missingVaccineCount = missingVaccineCount;
    }

    public int getOverdueExaminationCount() {
        return overdueExaminationCount;
    }

    public void setOverdueExaminationCount(int overdueExaminationCount) {
        this.overdueExaminationCount = overdueExaminationCount;
    }

    public List<HealthAlertResponse> getAlerts() {
        return alerts;
    }

    public void setAlerts(List<HealthAlertResponse> alerts) {
        this.alerts = alerts;
    }

    public List<HealthRecordResponse> getRecords() {
        return records;
    }

    public void setRecords(List<HealthRecordResponse> records) {
        this.records = records;
    }

    public List<InfirmaryVisitResponse> getVisits() {
        return visits;
    }

    public void setVisits(List<InfirmaryVisitResponse> visits) {
        this.visits = visits;
    }

    public List<ExaminationResponse> getExaminations() {
        return examinations;
    }

    public void setExaminations(List<ExaminationResponse> examinations) {
        this.examinations = examinations;
    }
}
