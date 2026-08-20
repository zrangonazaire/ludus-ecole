package ci.company.eduops.enrollment.repository;

import ci.company.eduops.enrollment.domain.EnrollmentTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EnrollmentTransferRepository extends JpaRepository<EnrollmentTransfer, UUID> {

    List<EnrollmentTransfer> findByEnrollmentIdOrderByTransferredAtDesc(UUID enrollmentId);
}
