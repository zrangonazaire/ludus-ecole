package ci.company.eduops.portal.dto.response;

import java.util.ArrayList;
import java.util.List;

/**
 * What a pupil sees of their own schooling.
 *
 * <p>Nothing here identifies anybody else. A portal that returned the class
 * ranking, or a classmate's marks alongside one's own, would turn a private
 * report into a noticeboard — and children are the last people who should be
 * compared publicly by a piece of software.</p>
 */
public class StudentDashboardResponse {

    private StudentDashboardIdentity student;
    private String academicYearLabel = "";
    private String termLabel;
    private StudentDashboardSummary summary = new StudentDashboardSummary();
    private List<StudentDashboardCourse> upcomingCourses = new ArrayList<>();
    private List<StudentDashboardGrade> recentGrades = new ArrayList<>();
    private List<StudentDashboardAnnouncement> announcements = new ArrayList<>();

    public StudentDashboardIdentity getStudent() {
        return student;
    }

    public void setStudent(StudentDashboardIdentity student) {
        this.student = student;
    }

    public String getAcademicYearLabel() {
        return academicYearLabel;
    }

    public void setAcademicYearLabel(String academicYearLabel) {
        this.academicYearLabel = academicYearLabel;
    }

    public String getTermLabel() {
        return termLabel;
    }

    public void setTermLabel(String termLabel) {
        this.termLabel = termLabel;
    }

    public StudentDashboardSummary getSummary() {
        return summary;
    }

    public void setSummary(StudentDashboardSummary summary) {
        this.summary = summary;
    }

    public List<StudentDashboardCourse> getUpcomingCourses() {
        return upcomingCourses;
    }

    public void setUpcomingCourses(List<StudentDashboardCourse> upcomingCourses) {
        this.upcomingCourses = upcomingCourses;
    }

    public List<StudentDashboardGrade> getRecentGrades() {
        return recentGrades;
    }

    public void setRecentGrades(List<StudentDashboardGrade> recentGrades) {
        this.recentGrades = recentGrades;
    }

    public List<StudentDashboardAnnouncement> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(List<StudentDashboardAnnouncement> announcements) {
        this.announcements = announcements;
    }
}
