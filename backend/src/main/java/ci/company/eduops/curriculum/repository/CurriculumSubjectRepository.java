package ci.company.eduops.curriculum.repository;

import ci.company.eduops.curriculum.domain.CurriculumSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CurriculumSubjectRepository extends JpaRepository<CurriculumSubject, UUID> {

    List<CurriculumSubject> findByCurriculumIdOrderByDisplayOrderAsc(UUID curriculumId);

    Optional<CurriculumSubject> findByCurriculumIdAndSubjectId(UUID curriculumId, UUID subjectId);

    /**
     * How many levels use each subject, in one query.
     *
     * <p>Returned as pairs (subjectId, count). The catalogue screen needs this
     * figure for every subject at once; asking per subject turned a single page
     * load into one query per row.</p>
     */
    @Query("""
           SELECT cs.subject.id, COUNT(DISTINCT cs.curriculum.id)
           FROM CurriculumSubject cs
           WHERE cs.curriculum.academicYear.id = :academicYearId
           GROUP BY cs.subject.id
           """)
    List<Object[]> countLevelsBySubject(@Param("academicYearId") UUID academicYearId);

    /** Every level that uses this subject, whatever the academic year. */
    @Query("SELECT COUNT(DISTINCT cs.curriculum.id) FROM CurriculumSubject cs "
         + "WHERE cs.subject.id = :subjectId")
    long countLevelsUsing(@Param("subjectId") UUID subjectId);

    List<CurriculumSubject> findByCurriculumIdInOrderByDisplayOrderAsc(Collection<UUID> curriculumIds);
}
