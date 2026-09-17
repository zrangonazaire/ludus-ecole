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
    private final BuildingService service = new BuildingService(buildings,
            mock(CampusRepository.class), rooms, mock(AuditService.class));
    @AfterEach void cleanup() { TenantContext.clear(); }

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
