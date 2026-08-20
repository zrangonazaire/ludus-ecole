package ci.company.eduops.common.event;

import ci.company.eduops.config.EduOpsProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Drains the transactional outbox and fans events out to WebSocket subscribers,
 * while invalidating the dashboard cache so the KPI tiles refresh without a
 * page reload (sections 48 and 49).
 */
@Component
@ConditionalOnProperty(prefix = "eduops.events.relay", name = "enabled",
        havingValue = "true", matchIfMissing = true)
public class DomainEventRelay {

    private static final Logger log = LoggerFactory.getLogger(DomainEventRelay.class);

    private final DomainEventRepository repository;
    private final SimpMessagingTemplate messagingTemplate;
    private final CacheManager cacheManager;
    private final EduOpsProperties properties;

    public DomainEventRelay(DomainEventRepository repository,
                            SimpMessagingTemplate messagingTemplate,
                            CacheManager cacheManager,
                            EduOpsProperties properties) {
        this.repository = repository;
        this.messagingTemplate = messagingTemplate;
        this.cacheManager = cacheManager;
        this.properties = properties;
    }

    @Scheduled(fixedDelayString = "${eduops.events.relay.poll-interval-ms:2000}")
    @Transactional
    public void dispatchPending() {
        int batchSize = properties.getEvents().getRelay().getBatchSize();
        List<DomainEvent> events = repository.findDispatchable(
                OffsetDateTime.now(), PageRequest.of(0, batchSize));
        if (events.isEmpty()) {
            return;
        }

        boolean dashboardTouched = false;
        for (DomainEvent event : events) {
            try {
                DomainEventType type = DomainEventType.valueOf(event.getEventType());
                messagingTemplate.convertAndSend(type.channel(), toMessage(event));
                dashboardTouched |= type.affectsDashboard();
                event.markProcessed();
            } catch (IllegalArgumentException ex) {
                log.error("Unknown event type {} on event {}", event.getEventType(), event.getId());
                event.markFailed("Unknown event type: " + event.getEventType());
            } catch (RuntimeException ex) {
                log.warn("Failed to dispatch event {} (attempt {}): {}",
                        event.getId(), event.getAttempts() + 1, ex.getMessage());
                event.markFailed(ex.getMessage());
            }
            repository.save(event);
        }

        if (dashboardTouched) {
            evict("dashboard");
            evict("classroomOccupancy");
        }
        log.debug("{} domain events dispatched", events.size());
    }

    private Map<String, Object> toMessage(DomainEvent event) {
        Map<String, Object> message = new LinkedHashMap<>();
        message.put("eventType", event.getEventType());
        message.put("aggregateType", event.getAggregateType());
        message.put("aggregateId", event.getAggregateId());
        message.put("occurredAt", event.getOccurredAt().toString());
        message.put("correlationId", event.getCorrelationId());
        message.put("academicYearId", event.getAcademicYearId());
        message.put("classroomId", event.getClassroomId());
        message.put("studentId", event.getStudentId());
        message.put("payload", event.getPayload());
        return message;
    }

    private void evict(String cacheName) {
        var cache = cacheManager.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        }
    }
}
