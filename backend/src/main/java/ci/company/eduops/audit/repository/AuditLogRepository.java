package ci.company.eduops.audit.repository;

import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.audit.domain.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByEntityTypeAndEntityIdOrderByOccurredAtDesc(String entityType, UUID entityId);

    Page<AuditLog> findByUserIdOrderByOccurredAtDesc(UUID userId, Pageable pageable);

    @Query("""
           SELECT a FROM AuditLog a
           WHERE (:entityType IS NULL OR a.entityType = :entityType)
             AND (:entityId   IS NULL OR a.entityId   = :entityId)
             AND (:userId     IS NULL OR a.userId     = :userId)
             AND (:action     IS NULL OR a.action     = :action)
             AND (CAST(:from AS timestamp) IS NULL OR a.occurredAt >= :from)
             AND (CAST(:to   AS timestamp) IS NULL OR a.occurredAt <= :to)
           ORDER BY a.occurredAt DESC
           """)
    Page<AuditLog> search(@Param("entityType") String entityType,
                          @Param("entityId") UUID entityId,
                          @Param("userId") UUID userId,
                          @Param("action") AuditAction action,
                          @Param("from") OffsetDateTime from,
                          @Param("to") OffsetDateTime to,
                          Pageable pageable);
}
