package ci.company.eduops.security.service;

import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.repository.AppUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class EduOpsUserDetailsService implements UserDetailsService {

    private final AppUserRepository userRepository;

    public EduOpsUserDetailsService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Resolves an account by login.
     *
     * <p>Runs without a tenant on purpose: at sign-in time nobody knows yet
     * which school the credentials belong to. Only the accounts table is
     * reachable this way, and it is deliberately excluded from RLS.</p>
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String login) {
        return TenantContext.runWithoutTenant(() -> userRepository.findByLogin(login)
                .map(EduOpsUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("No account for " + login)));
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(UUID userId) {
        return TenantContext.runWithoutTenant(() -> userRepository.findById(userId)
                .map(EduOpsUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("No account with id " + userId)));
    }
}
