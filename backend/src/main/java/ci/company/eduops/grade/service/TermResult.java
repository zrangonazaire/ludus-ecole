package ci.company.eduops.grade.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Complete academic result of one pupil for one term. Feeds the report card. */
public class TermResult {

    private UUID enrollmentId;
    private UUID studentId;
    private UUID termId;
    private BigDecimal generalAverage;
    private BigDecimal totalCoefficient;
    private BigDecimal classAverage;
    private BigDecimal classMinAverage;
    private BigDecimal classMaxAverage;
    private Integer rankInClass;
    private Integer classSize;
    private BigDecimal scaleMax;
    private BigDecimal passingMark;
    private List<SubjectAverage> subjects = new ArrayList<>();

    public boolean isPassing() {
        return generalAverage != null && passingMark != null
                && generalAverage.compareTo(passingMark) >= 0;
    }

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public BigDecimal getGeneralAverage() {
        return generalAverage;
    }

    public void setGeneralAverage(BigDecimal generalAverage) {
        this.generalAverage = generalAverage;
    }

    public BigDecimal getTotalCoefficient() {
        return totalCoefficient;
    }

    public void setTotalCoefficient(BigDecimal totalCoefficient) {
        this.totalCoefficient = totalCoefficient;
    }

    public BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(BigDecimal classAverage) {
        this.classAverage = classAverage;
    }

    public BigDecimal getClassMinAverage() {
        return classMinAverage;
    }

    public void setClassMinAverage(BigDecimal classMinAverage) {
        this.classMinAverage = classMinAverage;
    }

    public BigDecimal getClassMaxAverage() {
        return classMaxAverage;
    }

    public void setClassMaxAverage(BigDecimal classMaxAverage) {
        this.classMaxAverage = classMaxAverage;
    }

    public Integer getRankInClass() {
        return rankInClass;
    }

    public void setRankInClass(Integer rankInClass) {
        this.rankInClass = rankInClass;
    }

    public Integer getClassSize() {
        return classSize;
    }

    public void setClassSize(Integer classSize) {
        this.classSize = classSize;
    }

    public BigDecimal getScaleMax() {
        return scaleMax;
    }

    public void setScaleMax(BigDecimal scaleMax) {
        this.scaleMax = scaleMax;
    }

    public BigDecimal getPassingMark() {
        return passingMark;
    }

    public void setPassingMark(BigDecimal passingMark) {
        this.passingMark = passingMark;
    }

    public List<SubjectAverage> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectAverage> subjects) {
        this.subjects = subjects;
    }
}
