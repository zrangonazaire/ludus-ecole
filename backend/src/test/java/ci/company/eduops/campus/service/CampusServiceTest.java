package ci.company.eduops.campus.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.dto.request.CampusUpsertRequest;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CampusServiceTest {
    private final CampusRepository campuses = mock(CampusRepository.class);
    private final AuditService audit = mock(AuditService.class);
    private final CampusService service = new CampusService(campuses,
            mock(RoomRepository.class), mock(SchoolRepository.class), audit);
    private final Campus campus = new Campus();
    private final CampusUpsertRequest request = new CampusUpsertRequest();

    @BeforeEach
    void setUp() {
        School school = new School();
        school.setId(UUID.randomUUID());
        TenantContext.setSchoolId(school.getId());
        campus.setId(UUID.randomUUID());
        campus.setSchool(school);
        campus.setCode("SITE-A");
        campus.setName("Ancien nom");
        request.setCode(" site-a ");
        request.setName(" Nouveau nom ");
        when(campuses.findById(campus.getId())).thenReturn(Optional.of(campus));
    }

    @AfterEach
    void clear() {
        TenantContext.clear();
    }

    @Test
    void updatesCurrentMainCampusWithEmptyOptionalFields() {
        campus.setMain(true);
        request.setMain(true);
        when(campuses.findBySchoolIdAndMainTrue(TenantContext.getSchoolId()))
                .thenReturn(Optional.of(campus));
        when(campuses.save(campus)).thenReturn(campus);

        var response = service.update(campus.getId(), request);

        assertEquals("SITE-A", response.getCode());
        assertEquals("Nouveau nom", response.getName());
        assertTrue(campus.isMain());
        verify(audit).logUpdate(eq("Campus"), eq(campus.getId()), eq("Nouveau nom"),
                argThat(before -> "Ancien nom".equals(before.get("name"))),
                argThat(after -> "Nouveau nom".equals(after.get("name"))
                        && after.containsKey("email") && after.get("email") == null));
    }

    @Test
    void rejectsDuplicateCode() {
        request.setCode("site-b");
        when(campuses.existsBySchoolIdAndCode(TenantContext.getSchoolId(), "SITE-B"))
                .thenReturn(true);
        assertRejected(ErrorCode.CAMPUS_CODE_ALREADY_USED);
    }

    @Test
    void rejectsAnotherMainCampus() {
        Campus other = new Campus();
        other.setId(UUID.randomUUID());
        request.setMain(true);
        when(campuses.findBySchoolIdAndMainTrue(TenantContext.getSchoolId()))
                .thenReturn(Optional.of(other));
        assertRejected(ErrorCode.CAMPUS_MAIN_EXISTS);
    }

    @Test
    void rejectsCampusFromAnotherSchool() {
        TenantContext.setSchoolId(UUID.randomUUID());
        assertRejected(ErrorCode.CAMPUS_NOT_FOUND);
    }

    private void assertRejected(ErrorCode code) {
        var error = assertThrows(BusinessException.class,
                () -> service.update(campus.getId(), request));
        assertEquals(code, error.getErrorCode());
        assertEquals("SITE-A", campus.getCode());
        assertEquals("Ancien nom", campus.getName());
        verify(campuses, never()).save(any());
        verifyNoInteractions(audit);
    }
}
