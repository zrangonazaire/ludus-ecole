package ci.company.eduops.room.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.room.domain.Building;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.room.repository.*;
import org.junit.jupiter.api.*;
import java.util.*;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

class BuildingServiceTest {
    private final BuildingRepository buildings = mock(BuildingRepository.class);
    private final RoomRepository rooms = mock(RoomRepository.class);
    private final CampusRepository campuses = mock(CampusRepository.class);
    private final ci.company.eduops.room.repository.BuildingLevelRepository levels = mock(ci.company.eduops.room.repository.BuildingLevelRepository.class);
    private final BuildingService service = new BuildingService(buildings,
            campuses, rooms, mock(AuditService.class), levels);
    @AfterEach void cleanup() { TenantContext.clear(); }

    private ci.company.eduops.room.dto.request.BuildingUpsertRequest request(UUID campusId) {
        var request = new ci.company.eduops.room.dto.request.BuildingUpsertRequest();
        request.setCampusId(campusId); request.setCode(" bat-a ");
        request.setName(" Bâtiment A "); request.setFloors(2);
        return request;
    }

    private Campus campus(UUID schoolId) {
        var school = new ci.company.eduops.school.domain.School(); school.setId(schoolId);
        Campus campus = new Campus(); campus.setId(UUID.randomUUID());
        campus.setSchool(school); campus.setStatus(CommonStatus.ACTIVE);
        return campus;
    }

    @Test void createsBuildingOnCurrentSchoolsCampus() {
        UUID schoolId = UUID.randomUUID(); TenantContext.setSchoolId(schoolId);
        Campus campus = campus(schoolId);
        when(campuses.findById(campus.getId())).thenReturn(Optional.of(campus));
        when(buildings.saveAndFlush(any(Building.class))).thenAnswer(invocation -> {
            Building building = invocation.getArgument(0); building.setId(UUID.randomUUID()); return building;
        });
        var result = service.create(request(campus.getId()));
        assertThat(result.getCode()).isEqualTo("BAT-A");
        assertThat(result.getName()).isEqualTo("Bâtiment A");
        assertThat(result.getFloors()).isEqualTo(2);
        assertThat(result.getCampusId()).isEqualTo(campus.getId());
        var captor = org.mockito.ArgumentCaptor.forClass(ci.company.eduops.room.domain.BuildingLevel.class);
        verify(levels, times(3)).save(captor.capture());
        assertThat(captor.getAllValues()).extracting(ci.company.eduops.room.domain.BuildingLevel::getNumber)
                .containsExactly(0, 1, 2);
        assertThat(captor.getAllValues()).extracting(ci.company.eduops.room.domain.BuildingLevel::getLabel)
                .containsExactly("Rez-de-chaussée", "1er étage", "2e étage");
    }

    @Test void rejectsCampusOfAnotherSchool() {
        TenantContext.setSchoolId(UUID.randomUUID());
        Campus campus = campus(UUID.randomUUID());
        when(campuses.findById(campus.getId())).thenReturn(Optional.of(campus));
        assertThatThrownBy(() -> service.create(request(campus.getId()))).isInstanceOf(BusinessException.class);
        verify(buildings, never()).saveAndFlush(any());
    }

    @Test void rejectsArchivedCampus() {
        UUID schoolId = UUID.randomUUID(); TenantContext.setSchoolId(schoolId);
        Campus campus = campus(schoolId); campus.setStatus(CommonStatus.ARCHIVED);
        when(campuses.findById(campus.getId())).thenReturn(Optional.of(campus));
        assertThatThrownBy(() -> service.create(request(campus.getId()))).isInstanceOf(BusinessException.class);
        verify(buildings, never()).saveAndFlush(any());
    }

    @Test void rejectsDuplicateCodeWithinCampus() {
        UUID schoolId = UUID.randomUUID(); TenantContext.setSchoolId(schoolId);
        Campus campus = campus(schoolId);
        when(campuses.findById(campus.getId())).thenReturn(Optional.of(campus));
        when(buildings.existsByCampusIdAndCode(campus.getId(), "BAT-A")).thenReturn(true);
        assertThatThrownBy(() -> service.create(request(campus.getId()))).isInstanceOf(BusinessException.class);
        verify(buildings, never()).saveAndFlush(any());
    }

    @Test void rejectsMissingSchoolBeforeReadingBuildings() {
        assertThatThrownBy(() -> service.list(null, "", false)).isInstanceOf(BusinessException.class);
        verifyNoInteractions(buildings);
    }

    @Test void listsBuildingAndCountsActiveRooms() {
        UUID school = UUID.randomUUID();
        TenantContext.setSchoolId(school);
        Campus campus = new Campus(); campus.setId(UUID.randomUUID());
        campus.setCode("MAIN"); campus.setName("Principal");
        Building building = new Building(); building.setId(UUID.randomUUID());
        building.setCampus(campus); building.setCode("A"); building.setName("Bâtiment A");
        Room room = new Room(); room.setCapacity(30);
        Room unknown = new Room(); unknown.setCapacity(0);
        when(buildings.search(school, null, "ACTIVE", "A")).thenReturn(List.of(building));
        when(rooms.findByBuildingRefIdAndStatus(building.getId(), CommonStatus.ACTIVE))
                .thenReturn(List.of(room, unknown));
        var result = service.list(null, " A ", false).getFirst();
        assertThat(result.getRoomCount()).isEqualTo(2);
        assertThat(result.getSeatCount()).isEqualTo(30);
        assertThat(result.getUnknownCapacityCount()).isEqualTo(1);
        assertThat(result.isArchivable()).isFalse();
    }
}
