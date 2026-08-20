package ci.company.eduops.security.filter;

import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.jwt.JwtTokenProvider;
import ci.company.eduops.security.service.EduOpsUserDetails;
import ci.company.eduops.security.service.EduOpsUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

/**
 * Reads the bearer token, rebuilds the principal from the database and places
 * it in the security context.
 *
 * <p>The authorities always come from the current database state, not only from
 * the token, so a permission revoked one minute ago takes effect immediately.</p>
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtTokenProvider tokenProvider;
    private final EduOpsUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider,
                                   EduOpsUserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String token = resolveToken(request);
        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                Claims claims = tokenProvider.parse(token);
                if (tokenProvider.isAccessToken(claims)) {
                    UUID userId = tokenProvider.extractUserId(claims);

                    // Loading the account happens before a tenant is known, so it
                    // runs with the bypass; the tenant is set immediately after.
                    EduOpsUserDetails principal = TenantContext.runWithoutTenant(
                            () -> (EduOpsUserDetails) userDetailsService.loadUserById(userId));
                    if (principal.isEnabled() && principal.isAccountNonLocked()) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        principal, null, principal.getAuthorities());
                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        MDC.put("username", principal.getUsername());

                        // From here on every query is confined to this school by
                        // PostgreSQL Row-Level Security (migration V31).
                        TenantContext.setSchoolId(principal.getSchoolId());
                    }
                }
            } catch (JwtException | IllegalArgumentException ex) {
                // Leave the context empty; the entry point will answer 401.
                SecurityContextHolder.clearContext();
            }
        }
        chain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader(AUTH_HEADER);
        if (header != null && header.startsWith(BEARER_PREFIX)) {
            return header.substring(BEARER_PREFIX.length()).trim();
        }
        // WebSocket handshakes cannot set headers: allow ?access_token=
        String query = request.getParameter("access_token");
        return (query != null && !query.isBlank()) ? query : null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/actuator/health")
                || path.startsWith("/api/v1/auth/login")
                || path.startsWith("/api/v1/auth/refresh")
                || path.startsWith("/api/v1/auth/password-reset")
                || path.startsWith("/api/v1/public/");
    }
}
