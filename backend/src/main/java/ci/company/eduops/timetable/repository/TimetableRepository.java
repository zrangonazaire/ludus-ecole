package ci.company.eduops.timetable.repository;

import ci.company.eduops.timetable.domain.Timetable;
import ci.company.eduops.timetable.domain.TimetableStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, UUID> {

    List<Timetable> findByClassroomIdAndStatus(UUID classroomId, TimetableStatus status);

    @Query("""
           SELECT DISTINCT t FROM Timetable t
           LEFT JOIN FETCH t.slots s
           LEFT JOIN FETCH s.subject
           LEFT JOIN FETCH s.teacher
           LEFT JOIN FETCH s.room
           WHERE t.classroom.id = :classroomId AND t.status = 'PUBLISHED'
           """)
    Optional<Timetable> findPublishedWithSlots(@Param("classroomId") UUID classroomId);

    List<Timetable> findByAcademicYearId(UUID academicYearId);
}
