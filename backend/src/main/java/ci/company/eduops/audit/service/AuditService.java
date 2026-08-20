package ci.company.eduops.audit.service;

import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.audit.domain.AuditLog;
import ci.company.eduops.audit.repository.AuditLogRepository;
import ci.company.eduops.common.web.CorrelationIdFilter;
import ci.company.eduops.security.service.CurrentUser;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Writes the audit trail (rule 12).
 *
 * <p>Audit rows are written in a <em>separate</em> transaction: a refused
 * business operation must still leave a trace of the attempt.</p>
 */
@Service
public class AuditService {

    private static final Logger log = LoggerFactory.getLogger(AuditService.class);

    private final AuditLogRepository repository;
    private final CurrentUser currentUser;

    public AuditService(AuditLogRepository repository, CurrentUser currentUser) {
        this.repository = repository;
        this.currentUser = currentUser;
    }

    /** Fluent builder: {@code audit.record(CREATE, "Student", id).label(...).save()}. */
    public Entry record(AuditAction action, String entityType, UUID entityId) {
        return new Entry(action, entityType, entityId);
    }

    public void logCreate(String entityType, UUID entityId, String label, Map<String, Object> newValue) {
        record(AuditAction.CREATE, entityType, entityId).label(label).newValue(newValue).save();
    }

    public void logUpdate(String entityType, UUID entityId, String label,
                          Map<String, Object> oldValue, Map<String, Object> newValue) {
        record(AuditAction.UPDATE, entityType, entityId)
                .label(label).oldValue(oldValue).newValue(newValue)
                .changedFields(diff(oldValue, newValue))
                .save();
    }

    public void logValidate(String entityType, UUID entityId, String label, String reason) {
        record(AuditAction.VALIDATE, entityType, entityId).label(label).reason(reason).save();
    }

    public void logPublish(String entityType, UUID entityId, String label) {
        record(AuditAction.PUBLISH, entityType, entityId).label(label).save();
    }

    public void logCancel(String entityType, UUID entityId, String label, String reason) {
        record(AuditAction.CANCEL, entityType, entityId).label(label).reason(reason).save();
    }

    public void logLogin(UUID userId, String username, boolean success, String errorCode) {
        AuditLog entry = new AuditLog();
        entry.setAction(success ? AuditAction.LOGIN : AuditAction.LOGIN_FAILED);
        entry.setEntityType("AppUser");
        entry.setEntityId(userId);
        entry.setEntityLabel(username);
        entry.setUserId(userId);
        entry.setUsername(username);
        entry.setSuccess(success);
        entry.setErrorCode(errorCode);
        fillContext(entry);
        persist(entry);
    }

    private String[] diff(Map<String, Object> oldValue, Map<String, Object> newValue) {
        if (oldValue == null || newValue == null) {
            return new String[0];
        }
        return newValue.entrySet().stream()
                .filter(e -> !java.util.Objects.equals(oldValue.get(e.getKey()), e.getValue()))
                .map(Map.Entry::getKey)
                .toArray(String[]::new);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void persist(AuditLog entry) {
        try {
            repository.save(entry);
        } catch (RuntimeException ex) {
            // Never let auditing break the business operation; log loudly instead.
            log.error("Unable to write the audit entry {} on {} {}",
                    entry.getAction(), entry.getEntityType(), entry.getEntityId(), ex);
        }
    }

    private void fillContext(AuditLog entry) {
        entry.setCorrelationId(CorrelationIdFilter.currentCorrelationId());
        entry.setRequestId(CorrelationIdFilter.currentRequestId());
        if (entry.getUserId() == null) {
            currentUser.id().ifPresent(entry::setUserId);
            entry.setUsername(currentUser.username());
        }
        currentRequest().ifPresent(request -> {
            entry.setHttpMethod(request.getMethod());
            entry.setEndpoint(request.getRequestURI());
            entry.setIpAddress(clientIp(request));
            entry.setUserAgent(truncate(request.getHeader("User-Agent"), 255));
        });
    }

    private java.util.Optional<HttpServletRequest> currentRequest() {
        if (RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attributes) {
            return java.util.Optional.of(attributes.getRequest());
        }
        return java.util.Optional.empty();
    }

    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private String truncate(String value, int max) {
        if (value == null) {
            return null;
        }
        return value.length() <= max ? value : value.substring(0, max);
    }

    /** Mutable builder returned by {@link #record}. */
    public final class Entry {

        private final AuditLog entry = new AuditLog();

        private Entry(AuditAction action, String entityType, UUID entityId) {
            entry.setAction(action);
            entry.setEntityType(entityType);
            entry.setEntityId(entityId);
        }

        public Entry label(String label) {
            entry.setEntityLabel(label);
            return this;
        }

        public Entry oldValue(Map<String, Object> value) {
            entry.setOldValue(value == null ? null : new LinkedHashMap<>(value));
            return this;
        }

        public Entry newValue(Map<String, Object> value) {
            entry.setNewValue(value == null ? null : new LinkedHashMap<>(value));
            return this;
        }

        public Entry changedFields(String... fields) {
            entry.setChangedFields(fields);
            return this;
        }

        public Entry reason(String reason) {
            entry.setReason(reason);
            return this;
        }

        public Entry school(UUID schoolId) {
            entry.setSchoolId(schoolId);
            return this;
        }

        public Entry academicYear(UUID academicYearId) {
            entry.setAcademicYearId(academicYearId);
            return this;
        }

        public Entry failed(String errorCode) {
            entry.setSuccess(false);
            entry.setErrorCode(errorCode);
            return this;
        }

        public void save() {
            fillContext(entry);
            persist(entry);
        }
    }
}
