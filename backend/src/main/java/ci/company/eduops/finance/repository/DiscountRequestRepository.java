package ci.company.eduops.finance.repository;

import ci.company.eduops.finance.domain.DiscountRequest;
import ci.company.eduops.finance.domain.DiscountRequestLevel;
import ci.company.eduops.finance.domain.DiscountRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DiscountRequestRepository extends JpaRepository<DiscountRequest, UUID> {

    List<DiscountRequest> findBySchoolIdOrderByCreatedAtDesc(UUID schoolId);

    List<DiscountRequest> findBySchoolIdAndStatusOrderByCreatedAtDesc(UUID schoolId,
                                                                      DiscountRequestStatus status);

    /** Compteur annuel servant à bâtir la référence RED-2026-0007. */
    long countBySchoolIdAndAcademicYearId(UUID schoolId, UUID academicYearId);

    Optional<DiscountRequest> findByIdAndSchoolId(UUID id, UUID schoolId);
}
