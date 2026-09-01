package ci.company.eduops.attendance.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * The absence follow-up over a window.
 *
 * <p>The counters are computed on the whole window, never on the filtered list.
 * A filter that also moved the totals would let someone narrow the view until
 * the school looks fine.</p>
 */
@Schema(name = "AbsenceDigest", description = "Le suivi des absences sur une période")
public class AbsenceDigestResponse {

    private LocalDate from;
    private LocalDate to;

    private int absenceCount;
    private int latenessCount;
    private int justifiedCount;
    private int unjustifiedCount;

    @Schema(description = "Absences non justifiées depuis deux jours ou plus", example = "4")
    private int followUpCount;

    @Schema(description = "Élèves concernés, tous motifs confondus", example = "17")
    private int studentCount;

    @Schema(description = "Élèves comptant trois absences non justifiées ou plus "
            + "sur la période : ce n'est plus un incident, c'est une tendance.",
            example = "2")
    private int repeatedCount;

    @Schema(description = "Taux de présence sur la période", example = "96.40")
    private BigDecimal attendanceRate;

    private List<AbsenceResponse> entries = new ArrayList<>();

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }

    public int getAbsenceCount() {
        return absenceCount;
    }

    public void setAbsenceCount(int absenceCount) {
        this.absenceCount = absenceCount;
    }

    public int getLatenessCount() {
        return latenessCount;
    }

    public void setLatenessCount(int latenessCount) {
        this.latenessCount = latenessCount;
    }

    public int getJustifiedCount() {
        return justifiedCount;
    }

    public void setJustifiedCount(int justifiedCount) {
        this.justifiedCount = justifiedCount;
    }

    public int getUnjustifiedCount() {
        return unjustifiedCount;
    }

    public void setUnjustifiedCount(int unjustifiedCount) {
        this.unjustifiedCount = unjustifiedCount;
    }

    public int getFollowUpCount() {
        return followUpCount;
    }

    public void setFollowUpCount(int followUpCount) {
        this.followUpCount = followUpCount;
    }

    public int getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(int studentCount) {
        this.studentCount = studentCount;
    }

    public int getRepeatedCount() {
        return repeatedCount;
    }

    public void setRepeatedCount(int repeatedCount) {
        this.repeatedCount = repeatedCount;
    }

    public BigDecimal getAttendanceRate() {
        return attendanceRate;
    }

    public void setAttendanceRate(BigDecimal attendanceRate) {
        this.attendanceRate = attendanceRate;
    }

    public List<AbsenceResponse> getEntries() {
        return entries;
    }

    public void setEntries(List<AbsenceResponse> entries) {
        this.entries = entries;
    }
}
