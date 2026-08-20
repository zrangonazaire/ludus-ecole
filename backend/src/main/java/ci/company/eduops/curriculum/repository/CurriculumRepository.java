package ci.company.eduops.curriculum.repository;

import ci.company.eduops.curriculum.domain.Curriculum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CurriculumRepository extends JpaRepository<Curriculum, UUID> {

    Optional<Curriculum> findByAcademicYearIdAndLevelId(UUID academicYearId, UUID levelId);

    List<Curriculum> findByAcademicYearId(UUID academicYearId);

    /** Loads the curriculum with its subjects in one query (avoids N+1 on averages). */
    @Query("""
           SELECT DISTINCT c FROM Curriculum c
           LEFT JOIN FETCH c.subjects cs
           LEFT JOIN FETCH cs.subject
           WHERE c.academicYear.id = :academicYearId AND c.level.id = :levelId
           """)
    Optional<Curriculum> findWithSubjects(@Param("academicYearId") UUID academicYearId,
                                          @Param("levelId") UUID levelId);

    boolean existsByAcademicYearIdAndLevelId(UUID academicYearId, UUID levelId);
}
