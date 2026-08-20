package ci.company.eduops.common.event;

import ci.company.eduops.common.web.CorrelationIdFilter;
import ci.company.eduops.security.service.CurrentUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Records a domain event in the outbox.
 *
 * <p>Always called from inside the business transaction so the event and the
 * state change commit or roll back together.</p>
 */
@Service
public class DomainEventPublisher {

    private final DomainEventRepository repository;
    private final CurrentUser currentUser;

    public DomainEventPublisher(DomainEventRepository repository, CurrentUser currentUser) {
        this.repository = repository;
        this.currentUser = currentUser;
    }

    public Builder event(DomainEventType type, String aggregateType, UUID aggregateId) {
        return new Builder(type, aggregateType, aggregateId);
    }

    @Transactional
    public DomainEvent save(DomainEvent event) {
        return repository.save(event);
    }

    /** Fluent builder so call sites read like a sentence. */
    public final class Builder {

        private final DomainEvent event = new DomainEvent();

        private Builder(DomainEventType type, String aggregateType, UUID aggregateId) {
            event.setEventType(type.name());
            event.setAggregateType(aggregateType);
            event.setAggregateId(aggregateId);
            event.setCorrelationId(CorrelationIdFilter.currentCorrelationId());
            currentUser.id().ifPresent(event::setTriggeredBy);
            event.setPayload(new LinkedHashMap<>());
        }

        public Builder school(UUID schoolId) {
            event.setSchoolId(schoolId);
            return this;
        }

        public Builder academicYear(UUID academicYearId) {
            event.setAcademicYearId(academicYearId);
            return this;
        }

        public Builder classroom(UUID classroomId) {
            event.setClassroomId(classroomId);
            return this;
        }

        public Builder student(UUID studentId) {
            event.setStudentId(studentId);
            return this;
        }

        public Builder with(String key, Object value) {
            event.getPayload().put(key, value);
            return this;
        }

        public Builder payload(Map<String, Object> payload) {
            event.getPayload().putAll(payload);
            return this;
        }

        public DomainEvent publish() {
            return save(event);
        }
    }
}
