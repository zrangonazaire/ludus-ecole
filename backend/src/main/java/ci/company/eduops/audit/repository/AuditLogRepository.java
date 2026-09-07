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

    /**
     * Le journal d'un établissement.
     *
     * <p>Le filtre sur {@code schoolId} n'est pas optionnel, et c'est le point
     * important : sans lui, cette méthode rend l'historique de toutes les
     * écoles de la base. Elle n'était appelée par personne, donc rien ne le
     * signalait ; le jour où un écran s'y branche, la fuite est totale et
     * silencieuse.</p>
     *
     * <p>Les lignes sans établissement sont exclues plutôt que rattachées :
     * elles ne peuvent être attribuées à personne, et les afficher « au cas
     * où » reviendrait à montrer à une école ce qui appartient peut-être à
     * une autre.</p>
     */
    @Query("""
           SELECT a FROM AuditLog a
           WHERE a.schoolId = :schoolId
             AND (:entityType = '' OR a.entityType = :entityType)
             AND (:entityId   IS NULL OR a.entityId   = :entityId)
             AND (:userId     IS NULL OR a.userId     = :userId)
             AND (:action = '' OR CAST(a.action AS String) = :action)
             AND (CAST(:from AS timestamp) IS NULL OR a.occurredAt >= :from)
             AND (CAST(:to   AS timestamp) IS NULL OR a.occurredAt <= :to)
           ORDER BY a.occurredAt DESC
           """)
    Page<AuditLog> search(@Param("schoolId") UUID schoolId,
                          @Param("entityType") String entityType,
                          @Param("entityId") UUID entityId,
                          @Param("userId") UUID userId,
                          @Param("action") String action,
                          @Param("from") OffsetDateTime from,
                          @Param("to") OffsetDateTime to,
                          Pageable pageable);

    /** Les types d'objets réellement présents, pour alimenter le filtre. */
    @Query("""
           SELECT DISTINCT a.entityType FROM AuditLog a
           WHERE a.schoolId = :schoolId
           ORDER BY a.entityType ASC
           """)
    List<String> entityTypes(@Param("schoolId") UUID schoolId);
}
