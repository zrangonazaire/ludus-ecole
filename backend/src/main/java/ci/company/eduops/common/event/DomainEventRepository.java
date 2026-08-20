package ci.company.eduops.common.event;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface DomainEventRepository extends JpaRepository<DomainEvent, UUID> {

    @Query("""
           SELECT e FROM DomainEvent e
           WHERE e.status IN ('PENDING','FAILED') AND e.nextAttemptAt <= :now
           ORDER BY e.occurredAt ASC
           """)
    List<DomainEvent> findDispatchable(@Param("now") OffsetDateTime now, Pageable pageable);

    List<DomainEvent> findByAggregateTypeAndAggregateIdOrderByOccurredAtDesc(String aggregateType,
                                                                             UUID aggregateId);
}
