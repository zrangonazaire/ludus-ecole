package ci.company.eduops.council.repository;

import ci.company.eduops.council.domain.ClassCouncil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassCouncilRepository extends JpaRepository<ClassCouncil, UUID> {

    List<ClassCouncil> findByAcademicYearIdOrderByMeetingDateDesc(UUID academicYearId);

    Optional<ClassCouncil> findByClassroomIdAndTermId(UUID classroomId, UUID termId);

    boolean existsByClassroomIdAndTermId(UUID classroomId, UUID termId);

    @Query("""
           SELECT c FROM ClassCouncil c
             JOIN FETCH c.classroom
             JOIN FETCH c.term
           WHERE c.academicYear.id = :academicYearId
             AND (:classroomId IS NULL OR c.classroom.id = :classroomId)
             AND (:status = '' OR CAST(c.status AS String) = :status)
           ORDER BY c.meetingDate DESC
           """)
    List<ClassCouncil> search(@Param("academicYearId") UUID academicYearId,
                              @Param("classroomId") UUID classroomId,
                              @Param("status") String status);
}