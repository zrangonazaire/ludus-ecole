package ci.company.eduops.room.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.room.domain.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BuildingRepository extends JpaRepository<Building, UUID> {

    List<Building> findByCampusSchoolId(UUID schoolId);

    List<Building> findByCampusSchoolIdAndStatus(UUID schoolId, CommonStatus status);

    List<Building> findByCampusId(UUID campusId);

    List<Building> findByCampusIdAndStatus(UUID campusId, CommonStatus status);

    Optional<Building> findByCampusIdAndCode(UUID campusId, String code);

    boolean existsByCampusIdAndCode(UUID campusId, String code);

    boolean existsByCampusIdAndStatus(UUID campusId, CommonStatus status);
}
