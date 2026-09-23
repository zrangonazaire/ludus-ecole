package ci.company.eduops.approval.repository;

import ci.company.eduops.approval.domain.ApprovalCircuit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApprovalCircuitRepository extends JpaRepository<ApprovalCircuit, UUID> {

    List<ApprovalCircuit> findBySchoolIdOrderByCodeAsc(UUID schoolId);

    Optional<ApprovalCircuit> findByIdAndSchoolId(UUID id, UUID schoolId);

    boolean existsBySchoolIdAndCodeIgnoreCase(UUID schoolId, String code);

    boolean existsBySchoolIdAndCodeIgnoreCaseAndIdNot(UUID schoolId, String code, UUID id);
}
