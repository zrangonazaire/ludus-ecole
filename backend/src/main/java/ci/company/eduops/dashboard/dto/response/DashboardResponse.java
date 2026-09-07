package ci.company.eduops.dashboard.dto.response;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * The home screen, in one call.
 *
 * <p>Every collection starts empty rather than null. A school on its first
 * morning has no pupils, no payments and no alerts — and that is a normal
 * state, not an error. The screen iterates over these lists; a null would
 * turn an empty school into « Une erreur est survenue », which is exactly
 * the wrong thing to tell someone who has just signed up.</p>
 */
public class DashboardResponse {

    private AcademicYearSummary academicYear;
    private String campusName = "";
    private TermSummary currentTerm;
    private OffsetDateTime generatedAt = OffsetDateTime.now();

    private List<KpiValue> kpis = new ArrayList<>();
    private ChartData enrollmentByLevel = ChartData.empty();
    private ChartData attendanceTrend = ChartData.empty();
    private ChartData academicPerformance = ChartData.empty();
    private ChartData monthlyCollections = ChartData.empty();
    private FinancialBreakdown financialBreakdown = new FinancialBreakdown();

    private List<Object> recentEnrollments = new ArrayList<>();
    private List<Object> todayAbsences = new ArrayList<>();
    private List<Object> recentPayments = new ArrayList<>();
    private List<DashboardAlertItem> alerts = new ArrayList<>();
    private List<Object> upcomingAssessments = new ArrayList<>();
    private List<ClassroomSummary> classesNeedingAttention = new ArrayList<>();

    public AcademicYearSummary getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(AcademicYearSummary academicYear) {
        this.academicYear = academicYear;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public TermSummary getCurrentTerm() {
        return currentTerm;
    }

    public void setCurrentTerm(TermSummary currentTerm) {
        this.currentTerm = currentTerm;
    }

    public OffsetDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(OffsetDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public List<KpiValue> getKpis() {
        return kpis;
    }

    public void setKpis(List<KpiValue> kpis) {
        this.kpis = kpis;
    }

    public ChartData getEnrollmentByLevel() {
        return enrollmentByLevel;
    }

    public void setEnrollmentByLevel(ChartData enrollmentByLevel) {
        this.enrollmentByLevel = enrollmentByLevel;
    }

    public ChartData getAttendanceTrend() {
        return attendanceTrend;
    }

    public void setAttendanceTrend(ChartData attendanceTrend) {
        this.attendanceTrend = attendanceTrend;
    }

    public ChartData getAcademicPerformance() {
        return academicPerformance;
    }

    public void setAcademicPerformance(ChartData academicPerformance) {
        this.academicPerformance = academicPerformance;
    }

    public ChartData getMonthlyCollections() {
        return monthlyCollections;
    }

    public void setMonthlyCollections(ChartData monthlyCollections) {
        this.monthlyCollections = monthlyCollections;
    }

    public FinancialBreakdown getFinancialBreakdown() {
        return financialBreakdown;
    }

    public void setFinancialBreakdown(FinancialBreakdown financialBreakdown) {
        this.financialBreakdown = financialBreakdown;
    }

    public List<Object> getRecentEnrollments() {
        return recentEnrollments;
    }

    public void setRecentEnrollments(List<Object> recentEnrollments) {
        this.recentEnrollments = recentEnrollments;
    }

    public List<Object> getTodayAbsences() {
        return todayAbsences;
    }

    public void setTodayAbsences(List<Object> todayAbsences) {
        this.todayAbsences = todayAbsences;
    }

    public List<Object> getRecentPayments() {
        return recentPayments;
    }

    public void setRecentPayments(List<Object> recentPayments) {
        this.recentPayments = recentPayments;
    }

    public List<DashboardAlertItem> getAlerts() {
        return alerts;
    }

    public void setAlerts(List<DashboardAlertItem> alerts) {
        this.alerts = alerts;
    }

    public List<Object> getUpcomingAssessments() {
        return upcomingAssessments;
    }

    public void setUpcomingAssessments(List<Object> upcomingAssessments) {
        this.upcomingAssessments = upcomingAssessments;
    }

    public List<ClassroomSummary> getClassesNeedingAttention() {
        return classesNeedingAttention;
    }

    public void setClassesNeedingAttention(List<ClassroomSummary> classesNeedingAttention) {
        this.classesNeedingAttention = classesNeedingAttention;
    }
}
