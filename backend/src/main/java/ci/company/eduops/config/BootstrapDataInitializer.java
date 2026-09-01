package ci.company.eduops.config;

import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.security.entity.AppRole;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.repository.AppRoleRepository;
import ci.company.eduops.security.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Creates the first administrator on an empty database so the very first login
 * is possible. Roles and permissions themselves come from migration V30.
 *
 * <p>The account is flagged {@code mustChangePassword}: the bootstrap password
 * from the environment is never meant to survive the first login.</p>
 */
@Component
// Excluded from tests: an ApplicationRunner that writes to the database runs on
// every context load, which both pollutes fixtures and turns any failure here
// into an opaque "failed to load ApplicationContext".
@Profile("!test")
public class BootstrapDataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(BootstrapDataInitializer.class);

    private final AppUserRepository userRepository;
    private final AppRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EduOpsProperties properties;

    public BootstrapDataInitializer(AppUserRepository userRepository,
                                    AppRoleRepository roleRepository,
                                    PasswordEncoder passwordEncoder,
                                    EduOpsProperties properties) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    @Transactional
    @TenantBypass
    public void run(ApplicationArguments args) {
        String email = properties.getBootstrap().getAdminEmail();
        if (userRepository.existsByEmailIgnoreCase(email)) {
            return;
        }

        AppRole superAdmin = roleRepository.findByCode("SUPER_ADMIN")
                .orElseThrow(() -> new IllegalStateException(
                        "Role SUPER_ADMIN is missing: did migration V30 run?"));

        AppUser admin = new AppUser();
        admin.setUsername("admin");
        admin.setEmail(email);
        admin.setFirstName("Super");
        admin.setLastName("Administrateur");
        admin.setPasswordHash(passwordEncoder.encode(properties.getBootstrap().getAdminPassword()));
        admin.setStatus(UserStatus.ACTIVE);
        admin.setMustChangePassword(true);
        admin.addRole(superAdmin);
        userRepository.save(admin);

        log.warn("""

                ============================================================
                 First administrator created: {}
                 Change this password immediately after the first login.
                ============================================================
                """, email);
    }
}
