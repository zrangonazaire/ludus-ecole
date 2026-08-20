package ci.company.eduops.finance.repository;

import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.domain.StudentFeeStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentFeeRepository extends JpaRepository<StudentFee, UUID> {

    List<StudentFee> findByStudentIdAndAcademicYearIdOrderByDueDateAsc(UUID studentId,
                                                                       UUID academicYearId);

    List<StudentFee> findByEnrollmentIdOrderBySequenceAsc(UUID enrollmentId);

    /**
     * Outstanding instalments, oldest first: the default allocation order when
     * a family pays without designating a specific line.
     */
    @Query("""
           SELECT f FROM StudentFee f
           WHERE f.student.id = :studentId AND f.academicYear.id = :academicYearId
             AND f.status IN ('DUE','PARTIALLY_PAID','OVERDUE')
           ORDER BY f.dueDate ASC, f.sequence ASC
           """)
    List<StudentFee> findOutstandingOldestFirst(@Param("studentId") UUID studentId,
                                                @Param("academicYearId") UUID academicYearId);

    /** Locks the lines being paid so two cashiers cannot over-allocate. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM StudentFee f WHERE f.id IN :ids")
    List<StudentFee> lockAllByIds(@Param("ids") List<UUID> ids);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM StudentFee f WHERE f.id = :id")
    Optional<StudentFee> lockById(@Param("id") UUID id);

    @Query("""
           SELECT COALESCE(SUM(f.amountDue - f.amountPaid), 0) FROM StudentFee f
           WHERE f.student.id = :studentId AND f.academicYear.id = :academicYearId
             AND f.status <> 'CANCELLED'
           """)
    BigDecimal outstandingForStudent(@Param("studentId") UUID studentId,
                                     @Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT COALESCE(SUM(f.amountDue), 0) FROM StudentFee f
           WHERE f.academicYear.id = :academicYearId AND f.status <> 'CANCELLED'
           """)
    BigDecimal totalExpected(@Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT COALESCE(SUM(f.amountDue - f.amountPaid), 0) FROM StudentFee f
           WHERE f.academicYear.id = :academicYearId AND f.status IN ('DUE','PARTIALLY_PAID','OVERDUE')
           """)
    BigDecimal totalOutstanding(@Param("academicYearId") UUID academicYearId);

    /** Lines that became overdue and still carry a balance. */
    @Query("""
           SELECT f FROM StudentFee f
           WHERE f.dueDate < :today AND f.status IN ('DUE','PARTIALLY_PAID')
           """)
    List<StudentFee> findNewlyOverdue(@Param("today") LocalDate today);

    @Query("""
           SELECT f FROM StudentFee f
           WHERE f.dueDate BETWEEN :from AND :to AND f.status IN ('DUE','PARTIALLY_PAID')
           """)
    List<StudentFee> findDueBetween(@Param("from") LocalDate from, @Param("to") LocalDate to);

    long countByAcademicYearIdAndStatus(UUID academicYearId, StudentFeeStatus status);
}
