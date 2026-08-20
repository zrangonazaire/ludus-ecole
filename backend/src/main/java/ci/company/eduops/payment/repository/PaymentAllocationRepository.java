package ci.company.eduops.payment.repository;

import ci.company.eduops.payment.domain.PaymentAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PaymentAllocationRepository extends JpaRepository<PaymentAllocation, UUID> {

    List<PaymentAllocation> findByPaymentId(UUID paymentId);

    List<PaymentAllocation> findByPaymentIdAndReversedFalse(UUID paymentId);

    List<PaymentAllocation> findByStudentFeeIdAndReversedFalse(UUID studentFeeId);
}
