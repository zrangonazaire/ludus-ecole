package ci.company.eduops.security.service;

import ci.company.eduops.security.entity.AppUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Authenticated principal.
 *
 * <p>Roles are exposed as {@code ROLE_X} authorities and permissions as bare
 * codes, so both {@code hasRole('TEACHER')} and {@code hasAuthority('GRADE_CREATE')}
 * work in {@code @PreAuthorize}.</p>
 */
public class EduOpsUserDetails implements UserDetails {

    private final UUID userId;
    private final String username;
    private final String password;
    private final String email;
    private final String fullName;
    private final UUID schoolId;
    private final boolean enabled;
    private final boolean accountNonLocked;
    private final boolean mustChangePassword;
    private final Set<String> roleCodes;
    private final Set<String> permissionCodes;
    private final List<GrantedAuthority> authorities;

    public EduOpsUserDetails(AppUser user) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.password = user.getPasswordHash();
        this.email = user.getEmail();
        this.fullName = user.fullName();
        this.schoolId = user.getSchoolId();
        this.enabled = user.getStatus().canAuthenticate();
        this.accountNonLocked = !user.isCurrentlyLocked();
        this.mustChangePassword = user.isMustChangePassword();
        this.roleCodes = user.roleCodes();
        this.permissionCodes = user.permissionCodes();

        List<GrantedAuthority> granted = new ArrayList<>();
        roleCodes.forEach(code -> granted.add(new SimpleGrantedAuthority("ROLE_" + code)));
        permissionCodes.forEach(code -> granted.add(new SimpleGrantedAuthority(code)));
        this.authorities = List.copyOf(granted);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public UUID getSchoolId() {
        return schoolId;
    }

    public boolean isMustChangePassword() {
        return mustChangePassword;
    }

    public Set<String> getRoleCodes() {
        return roleCodes;
    }

    public Set<String> getPermissionCodes() {
        return permissionCodes;
    }

    public boolean hasRole(String roleCode) {
        return roleCodes.contains(roleCode);
    }

    public boolean hasPermission(String permissionCode) {
        return permissionCodes.contains(permissionCode);
    }
}
