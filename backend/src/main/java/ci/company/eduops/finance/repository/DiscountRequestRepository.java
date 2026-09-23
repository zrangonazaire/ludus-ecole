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

    @org.springframework.data.jpa.repository.Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
    @org.springframework.data.jpa.repository.Query("select r from DiscountRequest r where r.id = :id and r.schoolId = :schoolId")
    Optional<DiscountRequest> lockByIdAndSchoolId(@org.springframework.data.repository.query.Param("id") UUID id, @org.springframework.data.repository.query.Param("schoolId") UUID schoolId);

    Optional<DiscountRequest> findByIdAndSchoolId(UUID id, UUID schoolId);
}
