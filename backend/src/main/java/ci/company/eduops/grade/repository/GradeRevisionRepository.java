package ci.company.eduops.grade.repository;

import ci.company.eduops.grade.domain.GradeRevision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GradeRevisionRepository extends JpaRepository<GradeRevision, UUID> {

    List<GradeRevision> findByGradeIdOrderByChangedAtDesc(UUID gradeId);

    /** How many times a mark has already been corrected. */
    long countByGradeId(UUID gradeId);
}
