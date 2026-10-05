package ci.company.eduops.audit.service;

import ci.company.eduops.audit.domain.AuditLog;
import ci.company.eduops.audit.repository.AuditLogRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Writes one audit row in its own transaction.
 *
 * <h2>Why a separate bean</h2>
 *
 * <p>{@code REQUIRES_NEW} used to sit on a method of {@code AuditService} that
 * only ever ran through self-invocation — {@code Entry.save()} and
 * {@code logLogin} both called it on {@code this}, so the Spring proxy was
 * never crossed and the annotation did nothing at all. Every audit row joined
 * the caller's transaction, which broke the guarantee the class documents in
 * two directions:</p>
 *
 * <ul>
 *   <li>a refused operation erased its own trace. The worst case is the failed
 *       login: it is recorded, then the refusal rolls the transaction back and
 *       takes the record with it — so the one event a head teacher wants in the
 *       journal, five failed attempts on an account, was the one event never
 *       written;</li>
 *   <li>an audit insert that failed could fail the business operation. A
 *       failure during flush can mark the audit transaction rollback-only, and
 *       its commit can fail after this method returns. {@link AuditService}
 *       catches that failure outside this proxy boundary.</li>
 * </ul>
 *
 * <p>Crossing a bean boundary is what makes the propagation real. The rule is
 * worth stating plainly: a {@code @Transactional} method reached only from
 * inside its own class is not transactional at all.</p>
 */
@Component
public class AuditWriter {

    private final AuditLogRepository repository;

    public AuditWriter(AuditLogRepository repository) {
        this.repository = repository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void write(AuditLog entry) {
        repository.saveAndFlush(entry);
    }
}
