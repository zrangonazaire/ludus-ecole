package ci.company.eduops.common.web;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

/**
 * Puts a correlation id and a request id in the MDC so a single business
 * operation can be followed end to end across logs, audit rows and domain
 * events (section 83).
 *
 * <p>The client may propagate an existing correlation id through the
 * {@code X-Correlation-Id} header; otherwise one is generated.</p>
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorrelationIdFilter extends OncePerRequestFilter {

    public static final String CORRELATION_ID = "correlationId";
    public static final String REQUEST_ID = "requestId";
    public static final String HEADER_CORRELATION_ID = "X-Correlation-Id";
    public static final String HEADER_REQUEST_ID = "X-Request-Id";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String correlationId = firstNonBlank(request.getHeader(HEADER_CORRELATION_ID),
                UUID.randomUUID().toString());
        String requestId = UUID.randomUUID().toString();
        try {
            MDC.put(CORRELATION_ID, correlationId);
            MDC.put(REQUEST_ID, requestId);
            response.setHeader(HEADER_CORRELATION_ID, correlationId);
            response.setHeader(HEADER_REQUEST_ID, requestId);
            chain.doFilter(request, response);
        } finally {
            MDC.remove(CORRELATION_ID);
            MDC.remove(REQUEST_ID);
            MDC.remove("username");
        }
    }

    private String firstNonBlank(String candidate, String fallback) {
        return (candidate == null || candidate.isBlank()) ? fallback : candidate;
    }

    public static UUID currentCorrelationId() {
        return parse(MDC.get(CORRELATION_ID));
    }

    public static UUID currentRequestId() {
        return parse(MDC.get(REQUEST_ID));
    }

    private static UUID parse(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return UUID.fromString(value);
        } catch (IllegalArgumentException ignored) {
            return null;
        }
    }
}
