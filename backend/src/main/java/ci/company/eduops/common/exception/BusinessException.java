package ci.company.eduops.common.exception;

import java.util.HashMap;
import java.util.Map;

/**
 * Base class for every deliberate business refusal.
 *
 * <p>Carries a stable {@link ErrorCode} plus optional structured details so the
 * frontend can react precisely (for instance show the remaining seats when a
 * class is full) without parsing message text.</p>
 */
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;
    private final transient Map<String, Object> details = new HashMap<>();

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getDefaultMessage());
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public BusinessException detail(String key, Object value) {
        this.details.put(key, value);
        return this;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public Map<String, Object> getDetails() {
        return details;
    }

    public static BusinessException of(ErrorCode code) {
        return new BusinessException(code);
    }

    public static BusinessException of(ErrorCode code, String message) {
        return new BusinessException(code, message);
    }
}
