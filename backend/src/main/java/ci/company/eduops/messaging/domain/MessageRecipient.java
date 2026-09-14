package ci.company.eduops.messaging.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.notification.domain.NotificationChannel;
import ci.company.eduops.notification.domain.NotificationStatus;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;

/**
 * One family, one message, as it actually went out.
 *
 * <p>Everything here is frozen at send time: the name, the address, and the
 * rendered text. Re-rendering the template six months later would show today's
 * amount owed on a reminder that quoted another figure — and a guardian who
 * has since changed number would make last term's SMS look as though it went
 * somewhere it never went.</p>
 */
@Entity
@Table(name = "message_recipient")
@Getter
@Setter
public class MessageRecipient extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "campaign_id", nullable = false)
    private MessageCampaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    /** Le nom au moment de l'envoi. */
    @Column(name = "recipient_name", nullable = false, length = 240)
    private String recipientName;

    /** L'adresse réellement utilisée, figée. */
    @Column(name = "address", nullable = false, length = 180)
    private String address;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "channel", nullable = false, columnDefinition = "notification_channel")
    private NotificationChannel channel;

    @Column(name = "rendered_subject", length = 200)
    private String renderedSubject;

    /** Ce que la famille a lu, mot pour mot. */
    @Column(name = "rendered_body", nullable = false)
    private String renderedBody;

    @Column(name = "segments", nullable = false)
    private short segments = 1;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "notification_status")
    private NotificationStatus status = NotificationStatus.PENDING;

    @Column(name = "sent_at")
    private OffsetDateTime sentAt;

    @Column(name = "failure_reason")
    private String failureReason;

    /** La référence rendue par l'opérateur, pour rapprocher une réclamation. */
    @Column(name = "provider_ref", length = 120)
    private String providerRef;

    public boolean isSent() {
        return status == NotificationStatus.SENT || status == NotificationStatus.DELIVERED;
    }

    public boolean isFailed() {
        return status == NotificationStatus.FAILED;
    }

    public void succeed(String reference) {
        this.status = NotificationStatus.SENT;
        this.sentAt = OffsetDateTime.now();
        this.providerRef = reference;
        this.failureReason = null;
    }

    /**
     * Records a refusal without stopping the campaign.
     *
     * <p>One bad number out of four hundred must not roll back the other three
     * hundred and ninety-nine — nor leave them ambiguous.</p>
     */
    public void fail(String reason) {
        this.status = NotificationStatus.FAILED;
        this.failureReason = reason == null || reason.isBlank()
                ? "Refus de l'opérateur, sans motif." : reason;
    }
}
