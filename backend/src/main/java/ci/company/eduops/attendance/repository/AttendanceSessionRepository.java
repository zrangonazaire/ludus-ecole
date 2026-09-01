package ci.company.eduops.attendance.repository;

import ci.company.eduops.attendance.domain.AttendanceSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AttendanceSessionRepository extends JpaRepository<AttendanceSession, UUID> {

    List<AttendanceSession> findByClassroomIdAndSessionDate(UUID classroomId, LocalDate date);

    Optional<AttendanceSession> findByIdempotencyKey(String idempotencyKey);

    @Query("""
           SELECT s FROM AttendanceSession s
           WHERE s.classroom.id = :classroomId AND s.sessionDate = :date
             AND (:startTime IS NULL OR s.startTime = :startTime)
             AND (:subjectId IS NULL OR s.subject.id = :subjectId)
           """)
    Optional<AttendanceSession> findExisting(@Param("classroomId") UUID classroomId,
                                             @Param("date") LocalDate date,
                                             @Param("startTime") LocalTime startTime,
                                             @Param("subjectId") UUID subjectId);

    /**
     * The day register of one class: no subject, no time slot.
     *
     * <p>Distinct from {@link #findExisting} on purpose. That one treats a null
     * subject as "any subject", which is right when looking for a clash but
     * wrong here: it would hand back a teacher's maths sheet when asked for the
     * morning roll call, and the day's marks would be written over a lesson.</p>
     */
    @Query("""
           SELECT s FROM AttendanceSession s
           WHERE s.classroom.id = :classroomId AND s.sessionDate = :date
             AND s.subject IS NULL AND s.startTime IS NULL
           """)
    Optional<AttendanceSession> findDailyRegister(@Param("classroomId") UUID classroomId,
                                                  @Param("date") LocalDate date);

    Page<AttendanceSession> findByTeacherIdOrderBySessionDateDesc(UUID teacherId, Pageable pageable);

    /**
     * Every sheet of one day, all classes together.
     *
     * <p>Feeds the day view, which has to name the classes whose roll call is
     * still missing. A query per class would hide exactly those: a class with no
     * sheet returns nothing, and nothing is easy to skip over.</p>
     */
    @Query("""
           SELECT s FROM AttendanceSession s
           WHERE s.academicYear.id = :academicYearId AND s.sessionDate = :date
           """)
    List<AttendanceSession> findByYearAndDate(@Param("academicYearId") UUID academicYearId,
                                              @Param("date") LocalDate date);

    @Query("""
           SELECT COUNT(s) FROM AttendanceSession s
           WHERE s.academicYear.id = :academicYearId AND s.sessionDate = :date
             AND s.status = 'OPEN'
           """)
    long countOpenSheets(@Param("academicYearId") UUID academicYearId,
                         @Param("date") LocalDate date);
}
