package ci.company.eduops.finance.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.finance.domain.FeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeeTypeRepository extends JpaRepository<FeeType, UUID> {

    List<FeeType> findBySchoolIdAndStatus(UUID schoolId, CommonStatus status);

    Optional<FeeType> findBySchoolIdAndCode(UUID schoolId, String code);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);
}
