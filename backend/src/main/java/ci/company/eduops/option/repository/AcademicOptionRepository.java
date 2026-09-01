package ci.company.eduops.option.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.option.domain.AcademicOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AcademicOptionRepository extends JpaRepository<AcademicOption, UUID> {
    List<AcademicOption> findBySchoolIdAndStatusOrderByNameAsc(UUID schoolId, CommonStatus status);
    Optional<AcademicOption> findByIdAndSchoolId(UUID id, UUID schoolId);
    boolean existsBySchoolIdAndCodeIgnoreCase(UUID schoolId, String code);
    boolean existsBySchoolIdAndCodeIgnoreCaseAndIdNot(UUID schoolId, String code, UUID id);
}
