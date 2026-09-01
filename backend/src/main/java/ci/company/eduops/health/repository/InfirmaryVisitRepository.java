package ci.company.eduops.health.repository;

import ci.company.eduops.health.domain.InfirmaryVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public interface InfirmaryVisitRepository extends JpaRepository<InfirmaryVisit, UUID> {

    @Query("""
            SELECT v FROM InfirmaryVisit v
            WHERE v.academicYear.id = :yearId
              AND v.occurredAt >= :from
              AND (:search IS NULL
                   OR LOWER(v.student.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(v.student.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(v.student.studentNumber) LIKE LOWER(CONCAT('%', :search, '%')))
            ORDER BY v.occurredAt DESC
            """)
    List<InfirmaryVisit> findRegister(@Param("yearId") UUID yearId,
                                      @Param("from") OffsetDateTime from,
                                      @Param("search") String search);

    List<InfirmaryVisit> findByStudentIdOrderByOccurredAtDesc(UUID studentId);

    /**
     * Visits that ended with the pupil leaving, and no family reached.
     *
     * <p>The database refuses these outright, so a row here means someone
     * changed the outcome after the fact. It is worth seeing.</p>
     */
    @Query("""
            SELECT v FROM InfirmaryVisit v
            WHERE v.academicYear.id = :yearId
              AND v.guardianNotifiedAt IS NULL
              AND v.outcome IN (ci.company.eduops.health.domain.InfirmaryOutcome.SENT_HOME,
                                ci.company.eduops.health.domain.InfirmaryOutcome.EMERGENCY)
            ORDER BY v.occurredAt DESC
            """)
    List<InfirmaryVisit> findUnnotified(@Param("yearId") UUID yearId);

    @Query("""
            SELECT COUNT(v) FROM InfirmaryVisit v
            WHERE v.academicYear.id = :yearId AND v.occurredAt >= :from
            """)
    long countSince(@Param("yearId") UUID yearId, @Param("from") OffsetDateTime from);
}
