package ci.company.eduops.portal.controller;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/portals")
public class PortalManagementController {
    private final JdbcTemplate jdbc;
    public PortalManagementController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @GetMapping
    @PreAuthorize("hasAuthority('SCHOOL_VIEW')")
    @Transactional(readOnly = true)
    public List<Map<String, Object>> coverage() {
        UUID school = TenantContext.getSchoolId();
        if (school == null) throw BusinessException.of(ErrorCode.ACCESS_DENIED);
        return jdbc.queryForList("""
            WITH people AS (
              SELECT id, school_id, first_name, last_name, user_account_id,
                'GUARDIAN' AS kind, '' AS reference, 'PORTAL_PARENT' AS permission
              FROM guardian WHERE school_id = ?
              UNION ALL
              SELECT id, school_id, first_name, last_name, user_account_id,
                'STUDENT', student_number, 'PORTAL_STUDENT'
              FROM student WHERE school_id = ? AND archived_at IS NULL
            )
            SELECT p.id, p.kind, p.reference,
              p.first_name || ' ' || p.last_name AS "fullName",
              u.id IS NOT NULL AS "hasAccount",
              COALESCE(u.status = 'ACTIVE', false) AS "accountActive",
              COALESCE(u.locked_until > now(), false) AS locked,
              u.last_login_at AS "lastLoginAt",
              EXISTS (SELECT 1 FROM app_user_role ur
                JOIN app_role_permission rp ON rp.role_id = ur.role_id
                JOIN app_permission ap ON ap.id = rp.permission_id
                WHERE ur.user_id = u.id AND ap.code = p.permission) AS "portalAllowed"
            FROM people p LEFT JOIN app_user u ON u.id = p.user_account_id AND u.school_id = p.school_id
            ORDER BY p.last_name, p.first_name, p.id
            """, school, school);
    }
}
