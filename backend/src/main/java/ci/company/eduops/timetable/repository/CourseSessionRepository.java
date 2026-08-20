package ci.company.eduops.timetable.repository;

import ci.company.eduops.timetable.domain.CourseSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseSessionRepository extends JpaRepository<CourseSession, UUID> {

    List<CourseSession> findByClassroomIdAndSessionDate(UUID classroomId, LocalDate date);

    List<CourseSession> findByTeacherIdAndSessionDate(UUID teacherId, LocalDate date);

    @Query("""
           SELECT s FROM CourseSession s
           WHERE s.teacher.id = :teacherId AND s.sessionDate BETWEEN :from AND :to
           ORDER BY s.sessionDate, s.startTime
           """)
    List<CourseSession> findTeacherAgenda(@Param("teacherId") UUID teacherId,
                                          @Param("from") LocalDate from,
                                          @Param("to") LocalDate to);

    Optional<CourseSession> findByClassroomIdAndSessionDateAndStartTimeAndSubjectId(
            UUID classroomId, LocalDate sessionDate, java.time.LocalTime startTime, UUID subjectId);
}
