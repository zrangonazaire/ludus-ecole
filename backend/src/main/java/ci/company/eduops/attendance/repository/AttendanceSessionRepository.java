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

    Page<AttendanceSession> findByTeacherIdOrderBySessionDateDesc(UUID teacherId, Pageable pageable);

    @Query("""
           SELECT COUNT(s) FROM AttendanceSession s
           WHERE s.academicYear.id = :academicYearId AND s.sessionDate = :date
             AND s.status = 'OPEN'
           """)
    long countOpenSheets(@Param("academicYearId") UUID academicYearId,
                         @Param("date") LocalDate date);
}
