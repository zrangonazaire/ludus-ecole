package ci.company.eduops.attendance.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** One school day, class by class. */
@Schema(name = "AttendanceDay", description = "L'appel du jour, classe par classe")
public class AttendanceDayResponse {

    private LocalDate date;
    private UUID academicYearId;

    @Schema(description = "Nul quand aucune période ne couvre cette date")
    private UUID termId;
    private String termName;

    private int classroomCount;

    @Schema(description = "Classes dont l'appel du jour est enregistré", example = "9")
    private int sheetsDone;

    private int expectedCount;
    private int presentCount;
    private int absentCount;
    private int lateCount;

    @Schema(description = "Taux de présence du jour, sur les classes appelées uniquement. "
            + "Les classes sans appel n'entrent pas dans le calcul : les compter "
            + "présentes ou absentes serait inventer une information.",
            example = "94.20")
    private BigDecimal attendanceRate;

    private List<ClassroomAttendanceResponse> classrooms = new ArrayList<>();

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public int getClassroomCount() {
        return classroomCount;
    }

    public void setClassroomCount(int classroomCount) {
        this.classroomCount = classroomCount;
    }

    public int getSheetsDone() {
        return sheetsDone;
    }

    public void setSheetsDone(int sheetsDone) {
        this.sheetsDone = sheetsDone;
    }

    public int getExpectedCount() {
        return expectedCount;
    }

    public void setExpectedCount(int expectedCount) {
        this.expectedCount = expectedCount;
    }

    public int getPresentCount() {
        return presentCount;
    }

    public void setPresentCount(int presentCount) {
        this.presentCount = presentCount;
    }

    public int getAbsentCount() {
        return absentCount;
    }

    public void setAbsentCount(int absentCount) {
        this.absentCount = absentCount;
    }

    public int getLateCount() {
        return lateCount;
    }

    public void setLateCount(int lateCount) {
        this.lateCount = lateCount;
    }

    public BigDecimal getAttendanceRate() {
        return attendanceRate;
    }

    public void setAttendanceRate(BigDecimal attendanceRate) {
        this.attendanceRate = attendanceRate;
    }

    public List<ClassroomAttendanceResponse> getClassrooms() {
        return classrooms;
    }

    public void setClassrooms(List<ClassroomAttendanceResponse> classrooms) {
        this.classrooms = classrooms;
    }
}
