package ci.company.eduops.common.tenant;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.support.AopUtils;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

/**
 * Applies the tenant to the database session at the start of every transaction.
 *
 * <p>{@code SET LOCAL} scopes the setting to the current transaction, so a
 * pooled connection handed to another request never carries a stale tenant.</p>
 *
 * <p>Ordering matters more than it looks. Spring's transaction advisor sits at
 * {@code LOWEST_PRECEDENCE} by default, which would place this aspect
 * <em>outside</em> the transaction and make {@code SET LOCAL} a no-op. See
 * {@code TransactionConfig}, which moves the advisor to the front so this
 * aspect ends up inside the open transaction.</p>
 */
@Aspect
@Component
// Must run *inside* the transaction, otherwise SET LOCAL applies to nothing.
// TransactionConfig pins the transaction advisor to HIGHEST_PRECEDENCE, so a
// lower precedence here places this aspect within the open transaction.
@Order(Ordered.HIGHEST_PRECEDENCE + 100)
public class TenantTransactionAspect {

    private static final Logger log = LoggerFactory.getLogger(TenantTransactionAspect.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Around("@annotation(org.springframework.transaction.annotation.Transactional)"
            + " || @within(org.springframework.transaction.annotation.Transactional)")
    public Object applyTenant(ProceedingJoinPoint joinPoint) throws Throwable {
        applyToSession(hasBypassAnnotation(joinPoint));
        return joinPoint.proceed();
    }

    private boolean hasBypassAnnotation(ProceedingJoinPoint joinPoint) {
        Method signatureMethod = ((MethodSignature) joinPoint.getSignature()).getMethod();
        Method targetMethod = AopUtils.getMostSpecificMethod(
                signatureMethod, joinPoint.getTarget().getClass());
        return AnnotatedElementUtils.hasAnnotation(targetMethod, TenantBypass.class)
                || AnnotatedElementUtils.hasAnnotation(
                        joinPoint.getTarget().getClass(), TenantBypass.class);
    }

    private void applyToSession(boolean annotatedBypass) {
        try {
            if (annotatedBypass || TenantContext.isBypassEnabled()) {
                entityManager
                        .createNativeQuery("SELECT set_config('app.bypass_rls', 'on', true)")
                        .getSingleResult();
                return;
            }

            var schoolId = TenantContext.getSchoolId();
            // set_config(..., true) is the function form of SET LOCAL, and unlike
            // SET LOCAL it accepts a bind parameter.
            entityManager
                    .createNativeQuery("SELECT set_config('app.current_school_id', :value, true)")
                    .setParameter("value", schoolId == null ? "" : schoolId.toString())
                    .getSingleResult();
            entityManager
                    .createNativeQuery("SELECT set_config('app.bypass_rls', 'off', true)")
                    .getSingleResult();
        } catch (RuntimeException ex) {
            // Never let tenant plumbing break a request: RLS still denies by
            // default when the setting is absent, so failing closed is safe.
            log.error("Unable to apply the tenant to the database session", ex);
        }
    }
}
