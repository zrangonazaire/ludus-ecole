package ci.company.eduops.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Moves Spring's transaction advisor to the front of the advice chain.
 *
 * <p>By default it sits at {@code LOWEST_PRECEDENCE}, meaning any custom aspect
 * runs <em>before</em> the transaction is opened. {@code TenantTransactionAspect}
 * issues {@code SET LOCAL app.current_school_id}, which only has an effect
 * inside a transaction — outside one it is silently discarded, and every
 * Row-Level Security policy would then see a NULL tenant and hide all rows.</p>
 *
 * <p>Pinning the advisor to {@code HIGHEST_PRECEDENCE} guarantees the
 * transaction is already open by the time the tenant aspect runs.</p>
 */
@Configuration
@EnableTransactionManagement(order = Ordered.HIGHEST_PRECEDENCE)
public class TransactionConfig {
    // Configuration only: the annotation carries the behaviour.
}
