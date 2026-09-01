package ci.company.eduops.messaging.repository;

import ci.company.eduops.messaging.domain.CampaignStatus;
import ci.company.eduops.messaging.domain.MessageCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageCampaignRepository extends JpaRepository<MessageCampaign, UUID> {

    @Query("""
            SELECT c FROM MessageCampaign c
            WHERE c.academicYear.id = :yearId
              AND (:status IS NULL OR c.status = :status)
            ORDER BY c.createdAt DESC
            """)
    List<MessageCampaign> findForYear(@Param("yearId") UUID yearId,
                                      @Param("status") CampaignStatus status);

    @Query("""
            SELECT c FROM MessageCampaign c
              LEFT JOIN FETCH c.recipients
            WHERE c.id = :id
            """)
    Optional<MessageCampaign> findWithRecipients(@Param("id") UUID id);

    /**
     * Segments already sent today, for the daily cap.
     *
     * <p>Counted from the recipients that actually left, not from the campaign
     * estimates: a campaign whose recipients half failed did not consume the
     * whole allowance, and the school should not be barred for it.</p>
     */
    @Query("""
            SELECT COALESCE(SUM(r.segments), 0) FROM MessageRecipient r
            WHERE r.campaign.school.id = :schoolId
              AND r.channel = ci.company.eduops.notification.domain.NotificationChannel.SMS
              AND r.status IN (ci.company.eduops.notification.domain.NotificationStatus.SENT,
                               ci.company.eduops.notification.domain.NotificationStatus.DELIVERED)
              AND r.sentAt >= :since
            """)
    long countSmsSegmentsSince(@Param("schoolId") UUID schoolId,
                               @Param("since") OffsetDateTime since);
}
