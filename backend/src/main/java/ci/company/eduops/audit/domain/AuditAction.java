package ci.company.eduops.audit.domain;

/** Audited operation categories (section 64). */
public enum AuditAction {
    CREATE,
    UPDATE,
    DELETE,
    READ_SENSITIVE,
    VALIDATE,
    PUBLISH,
    CANCEL,
    LOGIN,
    LOGIN_FAILED,
    LOGOUT,
    PERMISSION_CHANGE,
    EXPORT,
    IMPORT
}
