package ci.company.eduops.level.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.level.domain.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LevelRepository extends JpaRepository<Level, UUID> {

    List<Level> findByCycleIdOrderBySequenceAsc(UUID cycleId);

    List<Level> findByCycleIdAndStatusOrderBySequenceAsc(UUID cycleId, CommonStatus status);

    Optional<Level> findByCycleIdAndCode(UUID cycleId, String code);

    @Query("""
           SELECT l FROM Level l
           WHERE l.cycle.school.id = :schoolId AND l.status = :status
           ORDER BY l.cycle.sequence ASC, l.sequence ASC
           """)
    List<Level> findBySchool(@Param("schoolId") UUID schoolId,
                             @Param("status") CommonStatus status);

    boolean existsByCycleIdAndCode(UUID cycleId, String code);

    /**
     * How many levels point at this one as their promotion target. Archiving
     * a level that is somebody's « next » would break the promotion path the
     * class council follows, so the archive guard refuses it.
     */
    long countByNextLevelId(UUID nextLevelId);
}
