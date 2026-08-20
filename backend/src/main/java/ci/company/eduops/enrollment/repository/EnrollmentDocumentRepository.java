package ci.company.eduops.enrollment.repository;

import ci.company.eduops.enrollment.domain.EnrollmentDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EnrollmentDocumentRepository extends JpaRepository<EnrollmentDocument, UUID> {

    List<EnrollmentDocument> findByEnrollmentId(UUID enrollmentId);

    List<EnrollmentDocument> findByEnrollmentIdAndMandatoryTrueAndReceivedFalse(UUID enrollmentId);
}
