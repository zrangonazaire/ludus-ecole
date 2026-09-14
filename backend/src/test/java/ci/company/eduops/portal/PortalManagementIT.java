package ci.company.eduops.portal;

import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.portal.controller.PortalManagementController;
import ci.company.eduops.support.AbstractIntegrationTest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.UUID;
import static org.assertj.core.api.Assertions.*;

class PortalManagementIT extends AbstractIntegrationTest {
    @Autowired JdbcTemplate jdbc;
    @AfterEach void cleanup() { TenantContext.clear(); }
    @Test void emptySchoolHasNoPortalAccounts() {
        TenantContext.setSchoolId(UUID.randomUUID());
        assertThat(new PortalManagementController(jdbc).coverage()).isEmpty();
    }
    @Test void missingSchoolCannotReadAccounts() {
        TenantContext.clear();
        assertThatThrownBy(() -> new PortalManagementController(jdbc).coverage())
            .isInstanceOf(BusinessException.class);
    }
}
