package ci.company.eduops.common.tenant;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a transactional entry point that must operate before a tenant exists.
 *
 * <p>This is a privileged escape hatch from PostgreSQL Row-Level Security.
 * Keep its use limited to reviewed operations such as public school signup.</p>
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface TenantBypass {
}
