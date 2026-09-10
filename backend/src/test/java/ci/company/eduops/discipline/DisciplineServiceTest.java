package ci.company.eduops.discipline;

import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import org.junit.jupiter.api.*;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;

class DisciplineServiceTest {
    private final JdbcTemplate jdbc = mock(JdbcTemplate.class);
    private final DisciplineService service = new DisciplineService(jdbc);
    private final UUID school = UUID.randomUUID();
    private final UUID incident = UUID.randomUUID();
    @BeforeEach void setup() { TenantContext.setSchoolId(school); }
    @AfterEach void cleanup() { TenantContext.clear(); }

    @Test void missingTenantCannotReadRegister() {
        TenantContext.clear();
        assertEquals(ErrorCode.ACCESS_DENIED, assertThrows(BusinessException.class, service::list).getErrorCode());
        verifyNoInteractions(jdbc);
    }
    @Test void incidentOutsideSchoolCannotBeUpdated() {
        when(jdbc.queryForList(anyString(), eq(incident), eq(school))).thenReturn(List.of());
        assertEquals(ErrorCode.INCIDENT_NOT_FOUND, assertThrows(BusinessException.class,
            () -> service.update(incident, new DisciplineController.UpdateRequest("CLOSED", true, 0L))).getErrorCode());
        verify(jdbc, never()).update(anyString(), any(Object[].class));
    }
    @Test void closedIncidentCannotReceiveSanction() {
        when(jdbc.queryForList(anyString(), eq(incident), eq(school))).thenReturn(List.of(Map.of("status", "CLOSED")));
        assertEquals(ErrorCode.INCIDENT_CLOSED, assertThrows(BusinessException.class,
            () -> service.action(incident, new DisciplineController.ActionRequest("WARNING", "Rappel"))).getErrorCode());
        verify(jdbc, never()).update(anyString(), any(Object[].class));
    }
    @Test void staleVersionCannotOverwriteFollowup() {
        when(jdbc.queryForList(anyString(), eq(incident), eq(school))).thenReturn(List.of(Map.of("status", "UNDER_REVIEW", "version", 2L)));
        assertEquals(ErrorCode.CONCURRENT_MODIFICATION, assertThrows(BusinessException.class,
            () -> service.update(incident, new DisciplineController.UpdateRequest("CLOSED", true, 1L))).getErrorCode());
        verify(jdbc, never()).update(anyString(), any(Object[].class));
    }
}
