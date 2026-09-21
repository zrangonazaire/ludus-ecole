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
     * Has this price already produced fees for a family?
     *
     * <p>Asked before a price is deleted. Removing it would orphan the lines
     * families are already paying against, and any receipt issued since would
     * point at nothing.</p>
     */
    @Query("SELECT COUNT(f) > 0 FROM StudentFee f WHERE f.feeSchedule.id = :feeScheduleId")
    boolean existsForSchedule(@Param("feeScheduleId") UUID feeScheduleId);

    @Query("SELECT COUNT(f) > 0 FROM StudentFee f WHERE f.feeType.id = :feeTypeId")
    boolean existsForFeeType(@Param("feeTypeId") UUID feeTypeId);

    /**
     * Outstanding instalments, oldest first: the default allocation order when
     * a family pays without designating a specific line.
     *
     * <p>Fee type, schedule and instalment are fetched eagerly: the financial
     * summary exposes each line with its rubrique (type, category, tariff,
     * amount) without triggering lazy loads.</p>
     */
    @Query("""
           SELECT f FROM StudentFee f
           LEFT JOIN FETCH f.feeType t
           LEFT JOIN FETCH f.feeSchedule s
           LEFT JOIN FETCH f.instalment i
           WHERE f.student.id = :studentId AND f.academicYear.id = :academicYearId
             AND f.status IN ('DUE','PARTIALLY_PAID','OVERDUE')
           ORDER BY f.dueDate ASC, f.sequence ASC
           """)
    List<StudentFee> findOutstandingOldestFirst(@Param("studentId") UUID studentId,
                                                @Param("academicYearId") UUID academicYearId);

    /** All balances of a year, with the relations required by the collection board. */
    @Query("""
           SELECT f FROM StudentFee f
           JOIN FETCH f.student s
           JOIN FETCH f.enrollment e
           JOIN FETCH e.classroom c
           WHERE f.academicYear.id = :academicYearId
             AND f.status IN ('DUE','PARTIALLY_PAID','OVERDUE')
           ORDER BY f.dueDate ASC, f.sequence ASC
           """)
    List<StudentFee> findAllOutstandingForYear(@Param("academicYearId") UUID academicYearId);

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
