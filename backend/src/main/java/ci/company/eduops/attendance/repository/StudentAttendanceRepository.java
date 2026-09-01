package ci.company.eduops.attendance.repository;

import ci.company.eduops.attendance.domain.AttendanceStatus;
import ci.company.eduops.attendance.domain.StudentAttendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, UUID> {

    List<StudentAttendance> findByAttendanceSessionId(UUID attendanceSessionId);

    Optional<StudentAttendance> findByAttendanceSessionIdAndStudentId(UUID sessionId, UUID studentId);

    Page<StudentAttendance> findByStudentIdOrderByAttendanceDateDesc(UUID studentId, Pageable pageable);

    @Query("""
           SELECT COUNT(a) FROM StudentAttendance a
           WHERE a.student.id = :studentId AND a.term.id = :termId AND a.status IN :statuses
           """)
    long countByStudentAndTermAndStatuses(@Param("studentId") UUID studentId,
                                          @Param("termId") UUID termId,
                                          @Param("statuses") List<AttendanceStatus> statuses);

    @Query("""
           SELECT COUNT(a) FROM StudentAttendance a
           WHERE a.academicYear.id = :academicYearId AND a.attendanceDate = :date
             AND a.status IN ('ABSENT','EXCUSED_ABSENCE')
           """)
    long countAbsencesOn(@Param("academicYearId") UUID academicYearId,
                         @Param("date") LocalDate date);

    /** School-wide attendance rate over a window, used by the dashboard KPI. */
    @Query("""
           SELECT COALESCE(
                    100.0 * SUM(CASE WHEN a.status IN ('PRESENT','LATE','EXCUSED_LATE','LEFT_EARLY')
                                     THEN 1 ELSE 0 END) / NULLIF(COUNT(a), 0), 0)
           FROM StudentAttendance a
           WHERE a.academicYear.id = :academicYearId
             AND a.attendanceDate BETWEEN :from AND :to
           """)
    Double attendanceRate(@Param("academicYearId") UUID academicYearId,
                          @Param("from") LocalDate from,
                          @Param("to") LocalDate to);

    @Query("""
           SELECT a FROM StudentAttendance a
           WHERE a.academicYear.id = :academicYearId AND a.attendanceDate = :date
             AND a.status IN ('ABSENT','EXCUSED_ABSENCE')
           ORDER BY a.classroom.name, a.student.lastName
           """)
    List<StudentAttendance> findAbsencesOn(@Param("academicYearId") UUID academicYearId,
                                           @Param("date") LocalDate date);

    /**
     * Absences and latenesses over a window, for the follow-up screen.
     *
     * <p>Latenesses travel with the absences on purpose: three quarters of an
     * hour lost every morning is a schooling problem, and a screen that only
     * listed full absences would never show it.</p>
     */
    @Query("""
           SELECT a FROM StudentAttendance a
           WHERE a.academicYear.id = :academicYearId
             AND a.attendanceDate BETWEEN :from AND :to
             AND a.status IN ('ABSENT','EXCUSED_ABSENCE','LATE','EXCUSED_LATE')
             AND (:classroomId IS NULL OR a.classroom.id = :classroomId)
           ORDER BY a.attendanceDate DESC, a.classroom.name ASC, a.student.lastName ASC
           """)
    List<StudentAttendance> findIncidents(@Param("academicYearId") UUID academicYearId,
                                          @Param("from") LocalDate from,
                                          @Param("to") LocalDate to,
                                          @Param("classroomId") UUID classroomId);

    /** Students whose absence count over a window exceeds a threshold. */
    @Query("""
           SELECT a.student.id, COUNT(a) FROM StudentAttendance a
           WHERE a.academicYear.id = :academicYearId
             AND a.attendanceDate BETWEEN :from AND :to
             AND a.status = 'ABSENT' AND a.justified = false
           GROUP BY a.student.id
           HAVING COUNT(a) >= :threshold
           """)
    List<Object[]> findRepeatedAbsences(@Param("academicYearId") UUID academicYearId,
                                        @Param("from") LocalDate from,
                                        @Param("to") LocalDate to,
                                        @Param("threshold") long threshold);
}
