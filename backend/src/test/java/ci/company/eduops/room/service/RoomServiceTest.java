package ci.company.eduops.room.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.room.dto.request.RoomUpsertRequest;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.timetable.repository.TimetableSlotRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/**
 * Règles de l'écran Bâtiments et salles.
 *
 * <p>Ce qui se teste ici n'est pas la persistance mais les refus : code déjà
 * pris dans le campus, type inconnu, salle occupée qu'on voudrait archiver ou
 * déplacer, salle d'un autre établissement. Ce sont ces règles-là qu'un
 * utilisateur rencontre, et qu'un écran ne peut pas deviner seul.</p>
 */
class RoomServiceTest {

    private final RoomRepository rooms = mock(RoomRepository.class);
    private final CampusRepository campuses = mock(CampusRepository.class);
    private final ClassroomRepository classrooms = mock(ClassroomRepository.class);
    private final TimetableSlotRepository timetableSlots = mock(TimetableSlotRepository.class);
    private final AuditService audit = mock(AuditService.class);
    private final ci.company.eduops.room.repository.BuildingLevelRepository levels = mock(ci.company.eduops.room.repository.BuildingLevelRepository.class);
    private final RoomService service = new RoomService(rooms, campuses, classrooms,
            timetableSlots, audit, levels);

    private final School school = new School();
    private final Campus campus = new Campus();
    private final Room room = new Room();
    private final RoomUpsertRequest request = new RoomUpsertRequest();

    @BeforeEach
    void setUp() {
        school.setId(UUID.randomUUID());
        TenantContext.setSchoolId(school.getId());

        campus.setId(UUID.randomUUID());
        campus.setSchool(school);
        campus.setCode("CAMP-1");
        campus.setName("Campus Principal");
        campus.setStatus(CommonStatus.ACTIVE);

        room.setId(UUID.randomUUID());
        room.setCampus(campus);
        room.setCode("A-101");
        room.setName("Ancien nom");
        room.setCapacity(40);
        room.setRoomType("CLASSROOM");
        room.setStatus(CommonStatus.ACTIVE);

        request.setCampusId(campus.getId());
        request.setCode(" a-101 ");
        request.setName(" Salle A 101 ");
        request.setBuilding(" Bâtiment A ");
        request.setFloor(" 1er étage ");
        request.setCapacity(45);
        request.setRoomType("classroom");

        when(campuses.findById(campus.getId())).thenReturn(Optional.of(campus));
        when(rooms.findById(room.getId())).thenReturn(Optional.of(room));
        when(rooms.existsByCampusIdAndCode(eq(campus.getId()), anyString())).thenReturn(false);
        when(rooms.save(any(Room.class))).thenAnswer(invocation -> {
            Room saved = invocation.getArgument(0);
            if (saved.getId() == null) {
                saved.setId(UUID.randomUUID());
            }
            return saved;
        });
    }

    @AfterEach
    void clear() {
        TenantContext.clear();
    }

    @Test
    void createsRoomWithNormalisedCodeAndType() {
        when(timetableSlots.countActiveByRoom()).thenReturn(List.of());
        when(classrooms.countActiveByDefaultRoom()).thenReturn(List.of());

        var response = service.create(request);

        assertEquals("A-101", response.getCode());
        assertEquals("Salle A 101", response.getName());
        assertEquals("Bâtiment A", response.getBuilding());
        assertEquals("1er étage", response.getFloor());
        assertEquals(45, response.getCapacity());
        assertEquals("CLASSROOM", response.getRoomType());
        assertEquals("ACTIVE", response.getStatus());
        assertTrue(response.isArchivable());
        verify(audit).logCreate(eq("Room"), any(UUID.class), eq("Salle A 101"), any());
    }

    @Test
    void rejectsDuplicateCodeInTheSameCampus() {
        when(rooms.existsByCampusIdAndCode(campus.getId(), "A-101")).thenReturn(true);

        var error = assertThrows(BusinessException.class, () -> service.create(request));

        assertEquals(ErrorCode.ROOM_CODE_ALREADY_USED, error.getErrorCode());
        verify(rooms, never()).save(any());
        verifyNoInteractions(audit);
    }

    @Test
    void rejectsUnknownRoomType() {
        request.setRoomType("PISCINE");

        var error = assertThrows(BusinessException.class, () -> service.create(request));

        assertEquals(ErrorCode.ROOM_TYPE_INVALID, error.getErrorCode());
        verify(rooms, never()).save(any());
        verifyNoInteractions(audit);
    }

    @Test
    void refusesArchiveWhileTheTimetableUsesTheRoom() {
        when(timetableSlots.countActiveByRoom())
                .thenReturn(List.<Object[]>of(new Object[] { room.getId(), 4L }));
        when(classrooms.countActiveByDefaultRoom()).thenReturn(List.of());

        var error = assertThrows(BusinessException.class, () -> service.archive(room.getId()));

        assertEquals(ErrorCode.ROOM_IN_USE, error.getErrorCode());
        assertTrue(error.getMessage().contains("4 cours"));
        assertEquals(CommonStatus.ACTIVE, room.getStatus());
        verify(rooms, never()).save(any());
        verifyNoInteractions(audit);
    }

    @Test
    void refusesArchiveWhileAClassUsesTheRoomByDefault() {
        when(timetableSlots.countActiveByRoom()).thenReturn(List.of());
        when(classrooms.countActiveByDefaultRoom())
                .thenReturn(List.<Object[]>of(new Object[] { room.getId(), 2L }));

        var error = assertThrows(BusinessException.class, () -> service.archive(room.getId()));

        assertEquals(ErrorCode.ROOM_IN_USE, error.getErrorCode());
        assertTrue(error.getMessage().contains("2 classe(s)"));
        verify(rooms, never()).save(any());
    }

    @Test
    void archivesAFreeRoom() {
        when(timetableSlots.countActiveByRoom()).thenReturn(List.of());
        when(classrooms.countActiveByDefaultRoom()).thenReturn(List.of());

        var response = service.archive(room.getId());

        assertEquals("ARCHIVED", response.getStatus());
        assertEquals(CommonStatus.ARCHIVED, room.getStatus());
        assertFalse(response.isArchivable());
        verify(audit).logCancel(eq("Room"), eq(room.getId()), eq("Ancien nom"), anyString());
    }

    @Test
    void restoresAnArchivedRoom() {
        room.setStatus(CommonStatus.ARCHIVED);
        when(timetableSlots.countActiveByRoom()).thenReturn(List.of());
        when(classrooms.countActiveByDefaultRoom()).thenReturn(List.of());

        var response = service.restore(room.getId());

        assertEquals("ACTIVE", response.getStatus());
        assertTrue(response.isArchivable());
        verify(audit).logValidate(eq("Room"), eq(room.getId()), eq("Ancien nom"), anyString());
    }

    @Test
    void refusesToMoveAnOccupiedRoomToAnotherCampus() {
        Campus other = new Campus();
        other.setId(UUID.randomUUID());
        other.setSchool(school);
        other.setCode("CAMP-2");
        other.setName("Campus Adjoint");
        other.setStatus(CommonStatus.ACTIVE);
        request.setCampusId(other.getId());
        when(campuses.findById(other.getId())).thenReturn(Optional.of(other));
        when(rooms.existsByCampusIdAndCode(eq(other.getId()), anyString())).thenReturn(false);
        when(timetableSlots.countActiveByRoom()).thenReturn(List.of());
        when(classrooms.countActiveByDefaultRoom())
                .thenReturn(List.<Object[]>of(new Object[] { room.getId(), 1L }));

        var error = assertThrows(BusinessException.class,
                () -> service.update(room.getId(), request));

        assertEquals(ErrorCode.ROOM_IN_USE, error.getErrorCode());
        assertEquals(campus.getId(), room.getCampus().getId());
        verify(rooms, never()).save(any());
    }

    @Test
    void hidesRoomsFromAnotherSchool() {
        Campus foreign = new Campus();
        foreign.setId(UUID.randomUUID());
        School otherSchool = new School();
        otherSchool.setId(UUID.randomUUID());
        foreign.setSchool(otherSchool);
        room.setCampus(foreign);

        var error = assertThrows(BusinessException.class, () -> service.getById(room.getId()));

        assertEquals(ErrorCode.ROOM_NOT_FOUND, error.getErrorCode());
    }
}
