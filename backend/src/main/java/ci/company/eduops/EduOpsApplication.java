package ci.company.eduops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * EduOps - integrated school management system.
 *
 * <p>Modular monolith: every business domain lives in its own package with its
 * own controller / service / domain / repository / dto / mapper layers, so a
 * module can later be extracted without rewriting its internals.</p>
 */
@SpringBootApplication
@ConfigurationPropertiesScan
@EnableJpaAuditing(
        auditorAwareRef = "auditorAware",
        dateTimeProviderRef = "dateTimeProvider")
@EnableCaching
@EnableAsync
@EnableScheduling
public class EduOpsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EduOpsApplication.class, args);
    }
}
