package ci.company.eduops.messaging.repository;

import ci.company.eduops.messaging.domain.MessageRecipient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRecipientRepository extends JpaRepository<MessageRecipient, UUID> {

    List<MessageRecipient> findByCampaignId(UUID campaignId);

    /**
     * Everything one family has received.
     *
     * <p>The first question asked when a parent says they were never told.</p>
     */
    List<MessageRecipient> findByGuardianIdOrderByCreatedAtDesc(UUID guardianId);

    List<MessageRecipient> findByStudentIdOrderByCreatedAtDesc(UUID studentId);
}
