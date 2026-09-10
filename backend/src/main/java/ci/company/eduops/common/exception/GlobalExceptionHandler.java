package ci.company.eduops.common.exception;

import ci.company.eduops.common.web.CorrelationIdFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

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

    /**
     * Whether a 500 may name its own cause in the response.
     *
     * <p>Off by default, so that adding a profile never accidentally opens it.
     * The dev profile turns it on; production sets it to false in writing
     * rather than relying on the default.</p>
     */
    private final boolean exposeInternalErrors;

    public GlobalExceptionHandler(
            @Value("${eduops.diagnostics.expose-internal-errors:false}")
            boolean exposeInternalErrors) {
        this.exposeInternalErrors = exposeInternalErrors;
    }

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

    /**
     * A request that matches no endpoint is a 404, whichever way Spring says so.
     *
     * <p>{@code NoResourceFoundException} belongs here as much as
     * {@code NoHandlerFoundException}: since Spring Boot 3 the dispatcher, when
     * no controller matches, falls through to the static-resource handler and
     * throws that instead. Without it in this list the request landed on the
     * catch-all below and came back as <strong>500 Internal Server Error</strong>
     * — which sends whoever is debugging looking for a broken service when the
     * truth is simply « that route does not exist ». It cost two rounds of
     * investigation on {@code /api/v1/dashboard} before the log made it plain.
     */
    @ExceptionHandler({NoHandlerFoundException.class,
                       NoResourceFoundException.class,
                       HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<ApiError> handleNoHandler(Exception ex, HttpServletRequest request) {
        // En journal d'information, pas d'erreur : une adresse inconnue est un
        // fait courant — un signet perime, un ecran pas encore branche — et non
        // une panne du serveur.
        log.info("Aucun point d'entrée pour {} {}",
                request.getMethod(), request.getRequestURI());
        // Son propre code, pas RESOURCE_NOT_FOUND : l'ecran affichait « Element
        // introuvable », qui se lit « cette fiche n'existe pas » alors que la
        // fiche n'a jamais ete demandee. Le code distingue les deux, et le
        // message nomme la cause la plus frequente.
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(build(HttpStatus.NOT_FOUND, ErrorCode.ENDPOINT_NOT_FOUND.name(),
                        "Aucun point d'entrée ne correspond à cette adresse : "
                                + request.getMethod() + " " + request.getRequestURI()
                                + ". Le serveur en cours d'exécution est peut-être "
                                + "antérieur à cet écran : reconstruisez-le et relancez-le.",
                        request));
    }

    /**
     * A status already chosen by the thrower is kept, not overwritten by 500.
     *
     * <p>Without this method the catch-all below wins. That is not a theoretical
     * risk: {@code @ExceptionHandler(Exception.class)} matches
     * {@code ResponseStatusException} too, and Spring's own
     * {@code ResponseStatusExceptionResolver} never gets a turn — the handler
     * advice is consulted first. Every refusal the discipline module raised —
     * « no active enrollment on that date » (400), « this incident is closed »
     * (409), « unknown incident » (404) — reached the browser as
     * <strong>500 INTERNAL_ERROR</strong>, sending whoever was debugging to look
     * for a broken query when the server had in fact answered the question
     * correctly and then lost the answer on the way out.</p>
     *
     * <p>{@link BusinessException} remains the way to refuse an operation: it
     * carries a stable code the frontend translates. This one exists so that a
     * module which reaches for the Spring exception instead degrades to a wrong
     * <em>message</em> rather than a wrong <em>status</em>.</p>
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiError> handleResponseStatus(ResponseStatusException ex,
                                                         HttpServletRequest request) {
        HttpStatus status = HttpStatus.resolve(ex.getStatusCode().value());
        if (status == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        ErrorCode code = status.is5xxServerError()
                ? ErrorCode.INTERNAL_ERROR
                : ErrorCode.CONFLICT;
        if (status == HttpStatus.NOT_FOUND) {
            code = ErrorCode.RESOURCE_NOT_FOUND;
        } else if (status == HttpStatus.FORBIDDEN) {
            code = ErrorCode.ACCESS_DENIED;
        } else if (status == HttpStatus.BAD_REQUEST) {
            code = ErrorCode.VALIDATION_ERROR;
        }
        // La raison ecrite par l'appelant est deja en francais et decrit le cas
        // precis ; le libelle par defaut du code est un repli en anglais qui ne
        // doit pas atteindre l'utilisateur.
        String message = ex.getReason() == null || ex.getReason().isBlank()
                ? code.getDefaultMessage()
                : ex.getReason();
        log.warn("Refus porte par une ResponseStatusException [{}] sur {} : {}",
                status.value(), request.getRequestURI(), message);
        return ResponseEntity.status(status).body(build(status, code.name(), message, request));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpected(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception on {}", request.getRequestURI(), ex);
        ErrorCode code = ErrorCode.INTERNAL_ERROR;
        ApiError error = build(code.getStatus(), code.name(), code.getDefaultMessage(), request);
        describeForDeveloper(ex, error);
        return ResponseEntity.status(code.getStatus()).body(error);
    }

    /**
     * Names the failure, on a machine where naming it is safe.
     *
     * <p>Until now a 500 said « Erreur interne. Le support a été notifié. » and
     * nothing else. The stack trace went to the server log, which is the right
     * place — but only for whoever can read that log. On a workstation running
     * both halves, that gap turned each failure into several rounds of
     * deduction: {@code /requests}, {@code /staff}, {@code /attendance/lessons},
     * {@code /discipline/incidents}. Each time the answer was one line away, in
     * a console nobody thought to open.</p>
     *
     * <p>The class name and the innermost cause are enough to place the fault —
     * {@code PSQLException: operator does not exist} says something entirely
     * different from {@code NullPointerException}. They also describe internals,
     * so they travel only when {@code eduops.diagnostics.expose-internal-errors}
     * is on: true in the dev profile, false everywhere else, and explicitly
     * false in production. The correlation id keeps pointing at the full trace
     * for the cases this does not settle.</p>
     */
    private void describeForDeveloper(Exception ex, ApiError error) {
        if (!exposeInternalErrors) {
            return;
        }
        error.getDetails().put("exception", ex.getClass().getSimpleName());
        Throwable root = ex;
        while (root.getCause() != null && root.getCause() != root) {
            root = root.getCause();
        }
        String cause = root.getMessage();
        if (cause != null && !cause.isBlank()) {
            error.getDetails().put("cause",
                    root.getClass().getSimpleName() + " : " + truncate(cause));
        }
    }

    private static String truncate(String value) {
        return value.length() <= 500 ? value : value.substring(0, 500) + "…";
    }

    private ApiError build(HttpStatus status, String code, String message, HttpServletRequest request) {
        ApiError error = new ApiError(status.value(), code, message, request.getRequestURI());
        error.setCorrelationId(MDC.get(CorrelationIdFilter.CORRELATION_ID));
        return error;
    }
}
