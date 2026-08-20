package ci.company.eduops.common.idempotency;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

/**
 * Guards replayable operations: payments, enrollments, imports and offline
 * mobile actions (rule 13).
 *
 * <p>Contract: the same key with the same payload is idempotent; the same key
 * with a <em>different</em> payload is a client bug and raises
 * {@code IDEMPOTENCY_CONFLICT}.</p>
 */
@Service
public class IdempotencyService {

    private static final Logger log = LoggerFactory.getLogger(IdempotencyService.class);

    public static final String SCOPE_PAYMENT = "PAYMENT";
    public static final String SCOPE_ENROLLMENT = "ENROLLMENT";
    public static final String SCOPE_ATTENDANCE = "ATTENDANCE";
    public static final String SCOPE_IMPORT = "IMPORT";
    public static final String SCOPE_OFFLINE = "OFFLINE";

    private final IdempotencyRecordRepository repository;
    private final ObjectMapper objectMapper;

    public IdempotencyService(IdempotencyRecordRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    /**
     * Looks for a previous execution.
     *
     * @return the already produced resource id when the operation was replayed
     * @throws BusinessException {@code IDEMPOTENCY_CONFLICT} if the same key was
     *                           used with a different payload
     */
    @Transactional(readOnly = true)
    public Optional<UUID> findPreviousResult(String scope, String key, Object payload) {
        if (key == null || key.isBlank()) {
            return Optional.empty();
        }
        return repository.findByScopeAndIdempotencyKey(scope, key)
                .map(record -> {
                    String hash = hash(payload);
                    if (!record.getRequestHash().equals(hash)) {
                        throw BusinessException.of(ErrorCode.IDEMPOTENCY_CONFLICT)
                                .detail("scope", scope)
                                .detail("idempotencyKey", key);
                    }
                    log.info("Replayed operation {} / {} returns {}", scope, key, record.getResourceId());
                    return record.getResourceId();
                });
    }

    /**
     * Stores the outcome. Runs in its own transaction so the marker survives
     * even if the caller decides to roll back afterwards.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remember(String scope, String key, Object payload,
                         String resourceType, UUID resourceId) {
        if (key == null || key.isBlank()) {
            return;
        }
        IdempotencyRecord record = new IdempotencyRecord();
        record.setScope(scope);
        record.setIdempotencyKey(key);
        record.setRequestHash(hash(payload));
        record.setResourceType(resourceType);
        record.setResourceId(resourceId);
        record.setHttpStatus(201);
        repository.save(record);
    }

    public String hash(Object payload) {
        try {
            String json = payload == null ? "" : objectMapper.writeValueAsString(payload);
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return Base64.getEncoder()
                    .encodeToString(digest.digest(json.getBytes(StandardCharsets.UTF_8)));
        } catch (JsonProcessingException | NoSuchAlgorithmException ex) {
            throw new IllegalStateException("Unable to hash the idempotency payload", ex);
        }
    }
}
