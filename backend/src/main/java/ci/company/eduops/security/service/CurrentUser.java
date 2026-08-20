package ci.company.eduops.security.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

/**
 * Single access point to the authenticated principal.
 *
 * <p>Services must resolve the acting user through this component rather than
 * trusting an id sent by the client: the server decides what the caller may
 * see (sections 63, 66, 67).</p>
 */
@Component
public class CurrentUser {

    public Optional<EduOpsUserDetails> details() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || !(authentication.getPrincipal() instanceof EduOpsUserDetails principal)) {
            return Optional.empty();
        }
        return Optional.of(principal);
    }

    public EduOpsUserDetails require() {
        return details().orElseThrow(() -> BusinessException.of(ErrorCode.UNAUTHENTICATED));
    }

    public UUID requireId() {
        return require().getUserId();
    }

    public Optional<UUID> id() {
        return details().map(EduOpsUserDetails::getUserId);
    }

    public String username() {
        return details().map(EduOpsUserDetails::getUsername).orElse("system");
    }

    public boolean hasPermission(String permission) {
        return details().map(d -> d.hasPermission(permission)).orElse(false);
    }

    public boolean hasRole(String role) {
        return details().map(d -> d.hasRole(role)).orElse(false);
    }

    public boolean isAdministrator() {
        return hasRole("SUPER_ADMIN") || hasRole("SCHOOL_ADMIN");
    }

    /** Throws {@code ACCESS_DENIED} unless the caller holds the permission. */
    public void requirePermission(String permission) {
        if (!hasPermission(permission)) {
            throw BusinessException.of(ErrorCode.ACCESS_DENIED,
                    "Missing permission: " + permission);
        }
    }
}
