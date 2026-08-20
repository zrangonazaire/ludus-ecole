package ci.company.eduops.config;

import ci.company.eduops.security.service.CurrentUser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.AuditorAware;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

/** Feeds {@code @CreatedBy} / {@code @LastModifiedBy} from the security context. */
@Configuration
public class JpaAuditingConfig {

    @Bean
    public AuditorAware<UUID> auditorAware(CurrentUser currentUser) {
        return () -> {
            Optional<UUID> id = currentUser.id();
            return id.isPresent() ? id : Optional.empty();
        };
    }

    /** Keeps Spring Data's audit timestamps aligned with BaseEntity. */
    @Bean
    public DateTimeProvider dateTimeProvider() {
        return () -> Optional.of(OffsetDateTime.now());
    }
}
