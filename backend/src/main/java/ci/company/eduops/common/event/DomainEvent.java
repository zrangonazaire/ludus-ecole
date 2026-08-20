package ci.company.eduops.common.event;

import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Transactional outbox row.
 *
 * <p>The event is written inside the business transaction, so an event exists
 * if and only if the operation committed. A background relay then pushes it to
 * WebSocket, notifications, reporting and the audit trail.</p>
 */
@Entity
@Table(name = "domain_event")
@Getter
@Setter
public class DomainEvent {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "event_type", nullable = false, length = 80)
    private String eventType;

    @Column(name = "aggregate_type", nullable = false, length = 80)
    private String aggregateType;

    @Column(name = "aggregate_id", nullable = false)
    private UUID aggregateId;

    @Column(name = "school_id")
    private UUID schoolId;

    @Column(name = "academic_year_id")
    private UUID academicYearId;

    @Column(name = "classroom_id")
    private UUID classroomId;

    @Column(name = "student_id")
    private UUID studentId;

    @Type(JsonBinaryType.class)
    @Column(name = "payload", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> payload = new HashMap<>();

    @Column(name = "correlation_id")
    private UUID correlationId;

    @Column(name = "triggered_by")
    private UUID triggeredBy;

    @Column(name = "occurred_at", nullable = false)
    private OffsetDateTime occurredAt = OffsetDateTime.now();

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "outbox_status")
    private OutboxStatus status = OutboxStatus.PENDING;

    @Column(name = "attempts", nullable = false)
    private int attempts;

    @Column(name = "next_attempt_at", nullable = false)
    private OffsetDateTime nextAttemptAt = OffsetDateTime.now();

    @Column(name = "processed_at")
    private OffsetDateTime processedAt;

    @Column(name = "last_error")
    private String lastError;

    public void markProcessed() {
        this.status = OutboxStatus.PROCESSED;
        this.processedAt = OffsetDateTime.now();
        this.lastError = null;
    }

    /** Exponential backoff, capped at ten minutes. */
    public void markFailed(String error) {
        this.attempts++;
        this.status = OutboxStatus.FAILED;
        this.lastError = error;
        long delaySeconds = Math.min(600L, (long) Math.pow(2, Math.min(attempts, 9)));
        this.nextAttemptAt = OffsetDateTime.now().plusSeconds(delaySeconds);
    }
}
