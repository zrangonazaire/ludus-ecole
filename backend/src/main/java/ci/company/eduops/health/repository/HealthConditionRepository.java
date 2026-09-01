package ci.company.eduops.health.repository;

import ci.company.eduops.health.domain.HealthCondition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HealthConditionRepository extends JpaRepository<HealthCondition, UUID> {

    List<HealthCondition> findByHealthRecordIdAndActiveTrue(UUID healthRecordId);
}
