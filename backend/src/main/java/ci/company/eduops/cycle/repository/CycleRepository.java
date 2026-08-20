package ci.company.eduops.cycle.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.cycle.domain.Cycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CycleRepository extends JpaRepository<Cycle, UUID> {

    List<Cycle> findBySchoolIdOrderBySequenceAsc(UUID schoolId);

    List<Cycle> findBySchoolIdAndStatusOrderBySequenceAsc(UUID schoolId, CommonStatus status);

    Optional<Cycle> findBySchoolIdAndCode(UUID schoolId, String code);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);
}
