package ci.company.eduops.payment.repository;

import ci.company.eduops.payment.domain.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, UUID> {

    Optional<Receipt> findByPaymentId(UUID paymentId);

    Optional<Receipt> findByReceiptNumber(String receiptNumber);

    Optional<Receipt> findByVerificationCode(String verificationCode);

    List<Receipt> findByStudentIdOrderByIssueDateDesc(UUID studentId);
}
