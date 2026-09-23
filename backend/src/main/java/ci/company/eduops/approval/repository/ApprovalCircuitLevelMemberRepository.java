package ci.company.eduops.approval.repository;

import ci.company.eduops.approval.domain.ApprovalCircuitLevelMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApprovalCircuitLevelMemberRepository
        extends JpaRepository<ApprovalCircuitLevelMember,
        ApprovalCircuitLevelMember.LevelMemberId> {

    List<ApprovalCircuitLevelMember> findByLevelId(UUID levelId);

    List<ApprovalCircuitLevelMember> findByLevelIdIn(List<UUID> levelIds);

    void deleteByLevelIdIn(List<UUID> levelIds);
}
