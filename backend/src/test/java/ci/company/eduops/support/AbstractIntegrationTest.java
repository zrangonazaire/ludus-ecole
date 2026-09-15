package ci.company.eduops.support;

import org.junit.jupiter.api.Tag;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

/**
 * Base class for integration tests.
 *
 * <p>Runs against a real PostgreSQL, because the guarantees that matter most in
 * this system are database-level: the unique partial index on live enrollments,
 * the timetable EXCLUDE constraints, the grade range CHECK, the no-delete
 * trigger on validated payments, and above all the Row-Level Security policies
 * that isolate one school from another. An in-memory database would silently
 * accept what production rejects.</p>
 *
 * <p>The datasource is wired explicitly to the container's dynamic JDBC URL
 * and to a non-superuser application role. The separate bootstrap account is
 * used only by the container init script, because PostgreSQL superusers always
 * bypass Row-Level Security and would make the isolation assertions vacuous.</p>
 *
 * <p>{@code WebEnvironment.MOCK} builds a full web context — Spring Security's
 * {@code HttpSecurity} only exists in one — but starts no Tomcat, so a port
 * clash or a servlet issue can never masquerade as a data problem.</p>
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@ActiveProfiles("test")
@Tag("integration")
public abstract class AbstractIntegrationTest {

    private static final String APP_DB_USER = "eduops_app_test";
    private static final String APP_DB_PASSWORD = "eduops_app_test";

    static final PostgreSQLContainer<?> POSTGRES =
            new PostgreSQLContainer<>("postgres:16-alpine")
                    .withDatabaseName("eduops_test")
                    .withUsername("eduops_admin_test")
                    .withPassword("eduops_admin_test")
                    .withInitScript("db/test/prepare-rls-role.sql");

    static {
        // Spring caches the context across test classes. Keep its database alive
        // for the same JVM lifetime; Testcontainers' Ryuk cleans it up on exit.
        POSTGRES.start();
    }

    /**
     * Everything the application expects but that these tests do not exercise.
     * Redis, mail and the event relay are switched off so a missing service
     * never masks a real assertion failure.
     */
    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", () -> APP_DB_USER);
        registry.add("spring.datasource.password", () -> APP_DB_PASSWORD);
        registry.add("spring.flyway.url", POSTGRES::getJdbcUrl);
        registry.add("spring.flyway.user", () -> APP_DB_USER);
        registry.add("spring.flyway.password", () -> APP_DB_PASSWORD);
        registry.add("spring.cache.type", () -> "none");
        registry.add("spring.data.redis.host", () -> "localhost");
        registry.add("spring.data.redis.port", () -> 6379);
        registry.add("eduops.mail.enabled", () -> false);
        registry.add("eduops.events.relay.enabled", () -> false);
        registry.add("eduops.demo.enabled", () -> false);
        registry.add("eduops.rate-limit.enabled", () -> false);
    }
}
