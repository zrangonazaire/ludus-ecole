package ci.company.eduops.health.repository;

import ci.company.eduops.health.domain.StudentVaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentVaccinationRepository extends JpaRepository<StudentVaccination, UUID> {

    List<StudentVaccination> findByHealthRecordId(UUID healthRecordId);

    Optional<StudentVaccination> findByHealthRecordIdAndVaccineId(UUID healthRecordId,
                                                                 UUID vaccineId);

    /**
     * Every record of the year, with its vaccine.
     *
     * <p>Completeness is decided in Java rather than in SQL: the rule lives on
     * {@code StudentVaccination.isOutstanding()} and one copy of it is enough.
     * A second copy in a query is a second thing to get wrong.</p>
     */
    @Query("""
            SELECT DISTINCT sv FROM StudentVaccination sv
              JOIN FETCH sv.vaccine
              JOIN Enrollment e ON e.student = sv.healthRecord.student
            WHERE e.academicYear.id = :yearId
            """)
    List<StudentVaccination> findForYear(@Param("yearId") UUID yearId);
}
