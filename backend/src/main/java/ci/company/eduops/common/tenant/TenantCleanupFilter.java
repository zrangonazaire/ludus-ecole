package ci.company.eduops.common.tenant;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Clears the tenant at the end of every request.
 *
 * <p>Servlet threads are pooled and reused: without this, a request could
 * inherit the school of whoever used the thread before it.</p>
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class TenantCleanupFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}
