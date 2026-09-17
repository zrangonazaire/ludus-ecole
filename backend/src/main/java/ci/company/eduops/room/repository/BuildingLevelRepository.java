package ci.company.eduops.room.repository;
import ci.company.eduops.room.domain.BuildingLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
public interface BuildingLevelRepository extends JpaRepository<BuildingLevel, UUID> {
    List<BuildingLevel> findByBuildingIdOrderByNumberAsc(UUID buildingId);
}
