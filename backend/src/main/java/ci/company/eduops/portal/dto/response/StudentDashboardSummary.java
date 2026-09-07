package ci.company.eduops.portal.dto.response;

import java.math.BigDecimal;

/**
 * Les chiffres de l'élève, les siens seuls.
 *
 * <p>Pas de rang dans la classe. Une moyenne se compare à une exigence, pas à
 * ses camarades, et un logiciel qui affiche « 23ᵉ sur 38 » à un enfant chaque
 * matin lui apprend surtout à se mesurer aux autres.</p>
 */
public class StudentDashboardSummary {

    private BigDecimal academicAverage;
    private int averageScale = 20;
    private BigDecimal attendanceRate;
    private int publishedReportCards;
    private int unjustifiedAbsences;

    public BigDecimal getAcademicAverage() {
        return academicAverage;
    }

    public void setAcademicAverage(BigDecimal academicAverage) {
        this.academicAverage = academicAverage;
    }

    public int getAverageScale() {
        return averageScale;
    }

    public void setAverageScale(int averageScale) {
        this.averageScale = averageScale;
    }

    public BigDecimal getAttendanceRate() {
        return attendanceRate;
    }

    public void setAttendanceRate(BigDecimal attendanceRate) {
        this.attendanceRate = attendanceRate;
    }

    public int getPublishedReportCards() {
        return publishedReportCards;
    }

    public void setPublishedReportCards(int publishedReportCards) {
        this.publishedReportCards = publishedReportCards;
    }

    public int getUnjustifiedAbsences() {
        return unjustifiedAbsences;
    }

    public void setUnjustifiedAbsences(int unjustifiedAbsences) {
        this.unjustifiedAbsences = unjustifiedAbsences;
    }
}
