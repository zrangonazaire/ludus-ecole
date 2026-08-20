package ci.company.eduops.common.exception;

import ci.company.eduops.common.web.CorrelationIdFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Translates every exception into the {@link ApiError} envelope.
 *
 * <p>Business refusals are logged at WARN with their code; unexpected failures
 * are logged at ERROR with the stack trace but never leak internals to the
 * client.</p>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiError> handleBusiness(BusinessException ex, HttpServletRequest request) {
        ErrorCode code = ex.getErrorCode();
        log.warn("Business rule refused the operation [{}] on {}: {}",
                code.name(), request.getRequestURI(), ex.getMessage());
        ApiError error = build(code.getStatus(), code.name(), ex.getMessage(), request);
        error.getDetails().putAll(ex.getDetails());
        return ResponseEntity.status(code.getStatus()).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex,
                                                     HttpServletRequest request) {
        Map<String, Object> fields = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(fe -> fields.putIfAbsent(fe.getField(), fe.getDefaultMessage()));
        ex.getBindingResult().getGlobalErrors()
                .forEach(ge -> fields.putIfAbsent(ge.getObjectName(), ge.getDefaultMessage()));

        ApiError error = build(HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR.name(),
                ErrorCode.VALIDATION_ERROR.getDefaultMessage(), request);
        error.getDetails().put("fields", fields);
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(ConstraintViolationException ex,
                                                              HttpServletRequest request) {
        Map<String, Object> fields = new LinkedHashMap<>();
        ex.getConstraintViolations()
                .forEach(v -> fields.put(v.getPropertyPath().toString(), v.getMessage()));
        ApiError error = build(HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR.name(),
                ErrorCode.VALIDATION_ERROR.getDefaultMessage(), request);
        error.getDetails().put("fields", fields);
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler({MissingServletRequestParameterException.class,
                       MethodArgumentTypeMismatchException.class,
                       HttpMessageNotReadableException.class})
    public ResponseEntity<ApiError> handleBadRequest(Exception ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(
                build(HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR.name(),
                        ex.getMessage(), request));
    }

    /**
     * A unique/check/exclusion violation that slipped past the service layer is
     * still a business conflict: the database is the last line of defence for
     * capacity, double enrollment and timetable conflicts.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrity(DataIntegrityViolationException ex,
                                                        HttpServletRequest request) {
        String constraint = String.valueOf(ex.getMostSpecificCause().getMessage());
        ErrorCode code = mapConstraint(constraint);
        log.warn("Database constraint refused the operation [{}] on {}: {}",
                code.name(), request.getRequestURI(), constraint);
        ApiError error = build(code.getStatus(), code.name(), code.getDefaultMessage(), request);
        error.getDetails().put("constraint", extractConstraintName(constraint));
        return ResponseEntity.status(code.getStatus()).body(error);
    }

    private ErrorCode mapConstraint(String message) {
        String lower = message == null ? "" : message.toLowerCase();
        if (lower.contains("uq_enrollment_active_per_year")) {
            return ErrorCode.STUDENT_ALREADY_ENROLLED;
        }
        if (lower.contains("ex_slot_teacher_conflict") || lower.contains("ex_slot_class_conflict")) {
            return ErrorCode.TIMETABLE_CONFLICT;
        }
        if (lower.contains("ex_slot_room_conflict")) {
            return ErrorCode.ROOM_CONFLICT;
        }
        if (lower.contains("uq_payment_operation_id")) {
            return ErrorCode.PAYMENT_ALREADY_PROCESSED;
        }
        if (lower.contains("ck_grade_range")) {
            return ErrorCode.GRADE_OUT_OF_RANGE;
        }
        if (lower.contains("uq_academic_year_single_active")) {
            return ErrorCode.ACADEMIC_YEAR_ALREADY_ACTIVE;
        }
        if (lower.contains("uq_student_number")) {
            return ErrorCode.STUDENT_NUMBER_ALREADY_USED;
        }
        if (lower.contains("uq_cash_session_open")) {
            return ErrorCode.CASH_SESSION_ALREADY_OPEN;
        }
        if (lower.contains("payment_cancellation_not_allowed")) {
            return ErrorCode.PAYMENT_CANCELLATION_NOT_ALLOWED;
        }
        return ErrorCode.CONFLICT;
    }

    private String extractConstraintName(String message) {
        if (message == null) {
            return null;
        }
        int idx = message.indexOf("constraint \"");
        if (idx < 0) {
            return null;
        }
        int start = idx + "constraint \"".length();
        int end = message.indexOf('"', start);
        return end > start ? message.substring(start, end) : null;
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<ApiError> handleOptimisticLock(OptimisticLockingFailureException ex,
                                                          HttpServletRequest request) {
        ErrorCode code = ErrorCode.CONCURRENT_MODIFICATION;
        log.warn("Optimistic lock conflict on {}", request.getRequestURI());
        return ResponseEntity.status(code.getStatus())
                .body(build(code.getStatus(), code.name(), code.getDefaultMessage(), request));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDenied(AccessDeniedException ex,
                                                        HttpServletRequest request) {
        ErrorCode code = ErrorCode.ACCESS_DENIED;
        log.warn("Access denied on {} for user {}", request.getRequestURI(), MDC.get("username"));
        return ResponseEntity.status(code.getStatus())
                .body(build(code.getStatus(), code.name(), code.getDefaultMessage(), request));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiError> handleAuthentication(AuthenticationException ex,
                                                          HttpServletRequest request) {
        ErrorCode code = ErrorCode.UNAUTHENTICATED;
        return ResponseEntity.status(code.getStatus())
                .body(build(code.getStatus(), code.name(), code.getDefaultMessage(), request));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiError> handleUploadSize(MaxUploadSizeExceededException ex,
                                                      HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(build(HttpStatus.PAYLOAD_TOO_LARGE, ErrorCode.IMPORT_FILE_INVALID.name(),
                        "The uploaded file is too large.", request));
    }

    @ExceptionHandler({NoHandlerFoundException.class, HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<ApiError> handleNoHandler(Exception ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(build(HttpStatus.NOT_FOUND, ErrorCode.RESOURCE_NOT_FOUND.name(),
                        "No endpoint matches this request.", request));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpected(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception on {}", request.getRequestURI(), ex);
        ErrorCode code = ErrorCode.INTERNAL_ERROR;
        return ResponseEntity.status(code.getStatus())
                .body(build(code.getStatus(), code.name(), code.getDefaultMessage(), request));
    }

    private ApiError build(HttpStatus status, String code, String message, HttpServletRequest request) {
        ApiError error = new ApiError(status.value(), code, message, request.getRequestURI());
        error.setCorrelationId(MDC.get(CorrelationIdFilter.CORRELATION_ID));
        return error;
    }
}
