package ci.company.eduops.messaging.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.notification.domain.NotificationChannel;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * One send: a reminder drawn from a module, or a free announcement.
 *
 * <p>A campaign is created as {@link CampaignStatus#DRAFT} with its recipients
 * already resolved, rendered and costed. Only an explicit send moves it on.
 * The two steps are separate because an SMS cannot be recalled, and because a
 * mistaken filter that reaches the whole school is the failure this screen
 * exists to prevent.</p>
 *
 * <p>The counts and the estimated cost are frozen on the row at send time. The
 * tariff can change; what the school was told it would pay must not.</p>
 */
@Entity
@Table(name = "message_campaign")
@Getter
@Setter
public class MessageCampaign extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "kind", nullable = false, columnDefinition = "campaign_kind")
    private CampaignKind kind;

    /** Renseigné pour une relance, nul pour une annonce libre. */
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "reminder", columnDefinition = "reminder_type")
    private ReminderType reminder;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "channel", nullable = false, columnDefinition = "notification_channel")
    private NotificationChannel channel;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "subject", length = 200)
    private String subject;

    /** Le gabarit tel que rédigé, avec ses variables. */
    @Column(name = "body_template", nullable = false)
    private String bodyTemplate;

    /** La cible en clair, pour que le journal reste lisible sans requête. */
    @Column(name = "audience_label", nullable = false, length = 300)
    private String audienceLabel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "campaign_status")
    private CampaignStatus status = CampaignStatus.DRAFT;

    @Column(name = "recipient_count", nullable = false)
    private int recipientCount;

    @Column(name = "segment_count", nullable = false)
    private int segmentCount;

    @Column(name = "sent_count", nullable = false)
    private int sentCount;

    @Column(name = "failed_count", nullable = false)
    private int failedCount;

    /** Jamais un flottant : ce montant est annoncé au directeur. */
    @Column(name = "estimated_cost", nullable = false, precision = 12, scale = 2)
    private BigDecimal estimatedCost = BigDecimal.ZERO;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "sent_by")
    private UUID sentBy;

    @Column(name = "sent_at")
    private OffsetDateTime sentAt;

    @Column(name = "cancelled_reason")
    private String cancelledReason;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MessageRecipient> recipients = new ArrayList<>();

    /**
     * Closes the campaign once every recipient has been attempted.
     *
     * <p>Counts are recomputed from the rows rather than incremented as we go:
     * a retry that incremented a counter twice would leave a campaign claiming
     * to have reached more families than it has recipients.</p>
     */
    public void close(UUID userId) {
        int sent = 0;
        int failed = 0;
        for (MessageRecipient recipient : recipients) {
            if (recipient.isSent()) {
                sent++;
            } else if (recipient.isFailed()) {
                failed++;
            }
        }
        this.sentCount = sent;
        this.failedCount = failed;
        this.status = CampaignStatus.SENT;
        this.sentAt = OffsetDateTime.now();
        this.sentBy = userId;
    }

    public void cancel(String reason) {
        this.status = CampaignStatus.CANCELLED;
        this.cancelledReason = reason;
    }

    /** Whether anything failed — what the log screen highlights. */
    public boolean hasFailures() {
        return failedCount > 0;
    }
}
