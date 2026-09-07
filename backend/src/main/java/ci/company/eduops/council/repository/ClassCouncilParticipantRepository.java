package ci.company.eduops.council.repository;

import ci.company.eduops.council.domain.ClassCouncilParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassCouncilParticipantRepository extends JpaRepository<ClassCouncilParticipant, UUID> {

    List<ClassCouncilParticipant> findByCouncilId(UUID councilId);

    Optional<ClassCouncilParticipant> findByIdAndCouncilId(UUID id, UUID councilId);

    void deleteByCouncilId(UUID councilId);

    boolean existsByCouncilIdAndTeacherId(UUID councilId, UUID teacherId);

    boolean existsByCouncilIdAndStaffId(UUID councilId, UUID staffId);

    boolean existsByCouncilIdAndGuardianId(UUID councilId, UUID guardianId);
}