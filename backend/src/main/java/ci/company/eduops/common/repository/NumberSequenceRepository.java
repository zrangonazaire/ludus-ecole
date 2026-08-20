package ci.company.eduops.common.repository;

import ci.company.eduops.common.entity.NumberSequence;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NumberSequenceRepository extends JpaRepository<NumberSequence, UUID> {

    /** Pessimistic write lock: two registrars never receive the same number. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
           SELECT s FROM NumberSequence s
           WHERE s.schoolId = :schoolId AND s.scope = :scope AND s.yearPart = :yearPart
           """)
    Optional<NumberSequence> lockBySchoolIdAndScopeAndYearPart(@Param("schoolId") UUID schoolId,
                                                               @Param("scope") String scope,
                                                               @Param("yearPart") String yearPart);
}
