package ci.company.eduops.supply;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SupplyListRepository extends JpaRepository<SupplyList, UUID> {
    Optional<SupplyList> findBySchoolIdAndLevelIdAndAcademicYearId(UUID schoolId, UUID levelId, UUID academicYearId);
}
