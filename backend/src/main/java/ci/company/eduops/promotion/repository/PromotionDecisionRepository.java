package ci.company.eduops.promotion.repository;

import ci.company.eduops.promotion.domain.PromotionDecision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PromotionDecisionRepository extends JpaRepository<PromotionDecision, UUID> {

    Optional<PromotionDecision> findByEnrollmentId(UUID enrollmentId);

    List<PromotionDecision> findByCouncilId(UUID councilId);

    List<PromotionDecision> findByAcademicYearId(UUID academicYearId);

    List<PromotionDecision> findByStudentIdAndAcademicYearId(UUID studentId, UUID academicYearId);
}