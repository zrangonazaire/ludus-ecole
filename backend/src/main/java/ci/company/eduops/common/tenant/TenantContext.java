package ci.company.eduops.common.tenant;

import java.util.UUID;

/**
 * The school the current request belongs to.
 *
 * <p>EduOps is a public service: several schools share one database. This holds
 * the tenant for the duration of a request, and {@code TenantTransactionAspect}
 * pushes it down to PostgreSQL so Row-Level Security can enforce the isolation
 * even if a service forgets a filter.</p>
 *
 * <p>{@code bypass} exists for the operations that legitimately run without a
 * tenant: public signup, authentication, scheduled maintenance.</p>
 */
public final class TenantContext {

    private static final ThreadLocal<UUID> CURRENT_SCHOOL = new ThreadLocal<>();
    private static final ThreadLocal<Boolean> BYPASS = ThreadLocal.withInitial(() -> false);

    private TenantContext() {
        // utility holder
    }

    public static void setSchoolId(UUID schoolId) {
        CURRENT_SCHOOL.set(schoolId);
    }

    public static UUID getSchoolId() {
        return CURRENT_SCHOOL.get();
    }

    public static boolean hasSchool() {
        return CURRENT_SCHOOL.get() != null;
    }

    /** Enables the bypass for the current thread. Always pair with {@link #clear()}. */
    public static void enableBypass() {
        BYPASS.set(true);
    }

    public static void disableBypass() {
        BYPASS.set(false);
    }

    public static boolean isBypassEnabled() {
        return Boolean.TRUE.equals(BYPASS.get());
    }

    /**
     * Runs an operation outside any tenant, then restores the previous state.
     * Used by signup and authentication, which both run before a school is known.
     *
     * <p>Deliberately not overloaded with a {@code Runnable} variant: a lambda
     * such as {@code () -> repository.find(id)} would match both, and Java would
     * reject the call as ambiguous. The void form is
     * {@link #runWithoutTenantVoid(Runnable)}.</p>
     */
    public static <T> T runWithoutTenant(java.util.function.Supplier<T> action) {
        boolean previous = isBypassEnabled();
        try {
            enableBypass();
            return action.get();
        } finally {
            BYPASS.set(previous);
        }
    }

    /** Void counterpart of {@link #runWithoutTenant(java.util.function.Supplier)}. */
    public static void runWithoutTenantVoid(Runnable action) {
        boolean previous = isBypassEnabled();
        try {
            enableBypass();
            action.run();
        } finally {
            BYPASS.set(previous);
        }
    }

    /** Must be called at the end of every request; thread pools are reused. */
    public static void clear() {
        CURRENT_SCHOOL.remove();
        BYPASS.remove();
    }
}
