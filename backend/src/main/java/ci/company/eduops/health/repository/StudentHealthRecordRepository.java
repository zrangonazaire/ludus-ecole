package ci.company.eduops.health.repository;

import ci.company.eduops.health.domain.StudentHealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentHealthRecordRepository extends JpaRepository<StudentHealthRecord, UUID> {

    Optional<StudentHealthRecord> findByStudentId(UUID studentId);

    /**
     * The files of the pupils enrolled this year, with their conditions.
     *
     * <p>Joined eagerly because the caller always reads the conditions: left
     * lazy this would fire one query per pupil to build a single screen.</p>
     */
    @Query("""
            SELECT DISTINCT r FROM StudentHealthRecord r
              LEFT JOIN FETCH r.conditions
              JOIN Enrollment e ON e.student = r.student
            WHERE e.academicYear.id = :yearId
                  AND (LOWER(r.student.firstName) LIKE LOWER(CONCAT('%', COALESCE(:search, ''), '%'))
                    OR LOWER(r.student.lastName) LIKE LOWER(CONCAT('%', COALESCE(:search, ''), '%'))
                    OR LOWER(r.student.studentNumber) LIKE LOWER(CONCAT('%', COALESCE(:search, ''), '%')))
            """)
    List<StudentHealthRecord> findForYear(@Param("yearId") UUID yearId,
                                          @Param("search") String search);

    /**
     * The files carrying at least one alert.
     *
     * <p>This is what a teacher's screen is built from — never the full list
     * filtered afterwards, so that the rest never leaves the database.</p>
     */
    @Query("""
            SELECT DISTINCT r FROM StudentHealthRecord r
              JOIN r.conditions c
              JOIN Enrollment e ON e.student = r.student
            WHERE e.academicYear.id = :yearId
              AND c.active = TRUE
              AND c.severity IN (ci.company.eduops.health.domain.HealthSeverity.HIGH,
                                 ci.company.eduops.health.domain.HealthSeverity.CRITICAL)
            """)
    List<StudentHealthRecord> findWithAlerts(@Param("yearId") UUID yearId);

    @Query("""
            SELECT COUNT(DISTINCT r) FROM StudentHealthRecord r
              JOIN Enrollment e ON e.student = r.student
            WHERE e.academicYear.id = :yearId AND r.careConsent = FALSE
            """)
    long countWithoutConsent(@Param("yearId") UUID yearId);
}
