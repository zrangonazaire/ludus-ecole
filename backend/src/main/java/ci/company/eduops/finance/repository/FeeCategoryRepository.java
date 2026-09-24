package ci.company.eduops.finance.repository;

import ci.company.eduops.finance.domain.FeeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeeCategoryRepository extends JpaRepository<FeeCategory, UUID> {

    List<FeeCategory> findBySchoolId(UUID schoolId);

    Optional<FeeCategory> findBySchoolIdAndCode(UUID schoolId, String code);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);
}
