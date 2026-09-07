package ci.company.eduops.enrollment.repository;

import ci.company.eduops.enrollment.domain.EnrollmentTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EnrollmentTransferRepository extends JpaRepository<EnrollmentTransfer, UUID> {

    List<EnrollmentTransfer> findByEnrollmentIdOrderByTransferredAtDesc(UUID enrollmentId);

    /**
     * Every class change of a year, newest first.
     *
     * <p>Filtered on the enrollment's year rather than on the classroom's: a
     * pupil who changed class has two classrooms, and joining through either
     * one alone would drop half the movements.</p>
     */
    @Query("""
           SELECT t FROM EnrollmentTransfer t
           WHERE t.enrollment.academicYear.id = :academicYearId
                 AND (lower(t.enrollment.student.firstName)     LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(t.enrollment.student.lastName)      LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(t.enrollment.student.studentNumber) LIKE lower(concat('%', coalesce(:search, ''), '%')))
           ORDER BY t.transferredAt DESC
           """)
    List<EnrollmentTransfer> findForYear(@Param("academicYearId") UUID academicYearId,
                                         @Param("search") String search);
}
