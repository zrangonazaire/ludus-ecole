package ci.company.eduops.curriculum.repository;

import ci.company.eduops.curriculum.domain.CurriculumSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CurriculumSubjectRepository extends JpaRepository<CurriculumSubject, UUID> {

    List<CurriculumSubject> findByCurriculumIdOrderByDisplayOrderAsc(UUID curriculumId);

    Optional<CurriculumSubject> findByCurriculumIdAndSubjectId(UUID curriculumId, UUID subjectId);
}
