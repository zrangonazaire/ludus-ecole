package ci.company.eduops.campus.repository;

import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.common.domain.CommonStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CampusRepository extends JpaRepository<Campus, UUID> {

    List<Campus> findBySchoolIdAndStatus(UUID schoolId, CommonStatus status);

    List<Campus> findBySchoolId(UUID schoolId);

    Optional<Campus> findBySchoolIdAndCode(UUID schoolId, String code);

    Optional<Campus> findBySchoolIdAndMainTrue(UUID schoolId);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);
}
