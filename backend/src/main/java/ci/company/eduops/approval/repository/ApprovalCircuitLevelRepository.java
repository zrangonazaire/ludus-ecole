package ci.company.eduops.approval.repository;

import ci.company.eduops.approval.domain.ApprovalCircuitLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApprovalCircuitLevelRepository extends JpaRepository<ApprovalCircuitLevel, UUID> {

    List<ApprovalCircuitLevel> findByCircuitIdOrderByLevelNumberAsc(UUID circuitId);

    void deleteByCircuitId(UUID circuitId);
}
