package ci.company.eduops.term.repository;

import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.domain.TermStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TermRepository extends JpaRepository<Term, UUID> {

    List<Term> findByAcademicYearIdOrderBySequenceAsc(UUID academicYearId);

    Optional<Term> findByAcademicYearIdAndCode(UUID academicYearId, String code);

    Optional<Term> findByAcademicYearIdAndSequence(UUID academicYearId, int sequence);

    List<Term> findByAcademicYearIdAndStatus(UUID academicYearId, TermStatus status);

    /** The term covering a given date, used when recording attendance or grades. */
    @Query("""
           SELECT t FROM Term t
           WHERE t.academicYear.id = :academicYearId
             AND :date BETWEEN t.startDate AND t.endDate
           ORDER BY t.sequence ASC
           """)
    Optional<Term> findCoveringDate(@Param("academicYearId") UUID academicYearId,
                                    @Param("date") LocalDate date);

    boolean existsByAcademicYearIdAndCode(UUID academicYearId, String code);
}
