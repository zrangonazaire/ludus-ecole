package ci.company.eduops.common.exception;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The single error envelope returned by every endpoint (section 84).
 *
 * <pre>
 * {
 *   "timestamp": "2026-09-14T08:31:22.114Z",
 *   "status": 409,
 *   "code": "CLASS_CAPACITY_EXCEEDED",
 *   "message": "La capacite maximale de la classe est atteinte.",
 *   "path": "/api/v1/enrollments",
 *   "details": { "capacityMaximum": 40, "activeEnrollments": 40 }
 * }
 * </pre>
 */
@Schema(name = "ApiError", description = "Standard error envelope")
public class ApiError {

    @Schema(example = "2026-09-14T08:31:22.114Z")
    private OffsetDateTime timestamp = OffsetDateTime.now();

    @Schema(example = "409")
    private int status;

    @Schema(example = "CLASS_CAPACITY_EXCEEDED")
    private String code;

    @Schema(example = "La capacite maximale de la classe est atteinte.")
    private String message;

    @Schema(example = "/api/v1/enrollments")
    private String path;

    @Schema(description = "Correlation identifier, quote it when reporting an incident")
    private String correlationId;

    private Map<String, Object> details = new LinkedHashMap<>();

    public ApiError() {
        // default constructor for serialization
    }

    public ApiError(int status, String code, String message, String path) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.path = path;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }

    public Map<String, Object> getDetails() {
        return details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }
}
