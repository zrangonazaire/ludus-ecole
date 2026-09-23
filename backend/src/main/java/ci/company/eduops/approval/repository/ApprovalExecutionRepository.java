package ci.company.eduops.approval.repository;

import ci.company.eduops.approval.domain.ApprovalExecution;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface ApprovalExecutionRepository extends JpaRepository<ApprovalExecution, UUID> {
    Optional<ApprovalExecution> findByResourceIdAndSchoolId(UUID resourceId, UUID schoolId);
    List<ApprovalExecution> findBySchoolIdAndOperationNotOrderByCreatedAtDesc(UUID schoolId, String operation);
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select e from ApprovalExecution e where e.resourceId = :id and e.schoolId = :schoolId")
    Optional<ApprovalExecution> lockResource(@Param("id") UUID id, @Param("schoolId") UUID schoolId);
}
