package ci.company.eduops.payment.repository;

import ci.company.eduops.payment.domain.Payment;
import ci.company.eduops.payment.domain.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    /** Idempotency lookup: the same operationId never creates a second payment. */
    Optional<Payment> findBySchoolIdAndOperationId(UUID schoolId, String operationId);

    Optional<Payment> findByPaymentReference(String paymentReference);

    List<Payment> findByStudentIdOrderByPaymentDateDesc(UUID studentId);

    List<Payment> findByCashSessionIdAndStatus(UUID cashSessionId, PaymentStatus status);

    @Query("""
           SELECT p FROM Payment p
           WHERE p.academicYear.id = :academicYearId
             AND (:status IS NULL OR p.status = :status)
             AND (:from IS NULL OR p.paymentDate >= :from)
             AND (:to   IS NULL OR p.paymentDate <= :to)
             AND (:search IS NULL
                  OR lower(p.paymentReference)      LIKE lower(concat('%', :search, '%'))
                  OR lower(p.student.lastName)      LIKE lower(concat('%', :search, '%'))
                  OR lower(p.student.studentNumber) LIKE lower(concat('%', :search, '%')))
           ORDER BY p.paymentDate DESC, p.createdAt DESC
           """)
    Page<Payment> search(@Param("academicYearId") UUID academicYearId,
                         @Param("status") PaymentStatus status,
                         @Param("from") LocalDate from,
                         @Param("to") LocalDate to,
                         @Param("search") String search,
                         Pageable pageable);

    @Query("""
           SELECT COALESCE(SUM(p.amount), 0) FROM Payment p
           WHERE p.academicYear.id = :academicYearId AND p.status = 'VALIDATED'
             AND p.paymentDate BETWEEN :from AND :to
           """)
    BigDecimal sumValidatedBetween(@Param("academicYearId") UUID academicYearId,
                                   @Param("from") LocalDate from,
                                   @Param("to") LocalDate to);

    @Query("""
           SELECT COALESCE(SUM(p.amount), 0) FROM Payment p
           WHERE p.cashSession.id = :cashSessionId AND p.status = 'VALIDATED'
             AND p.paymentMethod = 'CASH'
           """)
    BigDecimal sumCashForSession(@Param("cashSessionId") UUID cashSessionId);

    @Query("""
           SELECT p.paymentMethod, COALESCE(SUM(p.amount), 0), COUNT(p) FROM Payment p
           WHERE p.academicYear.id = :academicYearId AND p.status = 'VALIDATED'
             AND p.paymentDate BETWEEN :from AND :to
           GROUP BY p.paymentMethod
           """)
    List<Object[]> sumByMethod(@Param("academicYearId") UUID academicYearId,
                               @Param("from") LocalDate from,
                               @Param("to") LocalDate to);

    @Query("""
           SELECT p FROM Payment p WHERE p.academicYear.id = :academicYearId
             AND p.status = 'VALIDATED'
           ORDER BY p.createdAt DESC
           """)
    List<Payment> findRecent(@Param("academicYearId") UUID academicYearId, Pageable pageable);
}
