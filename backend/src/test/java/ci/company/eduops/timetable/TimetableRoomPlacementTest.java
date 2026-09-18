package ci.company.eduops.timetable;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.repository.TeacherAssignmentRepository;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import ci.company.eduops.term.repository.TermRepository;
import ci.company.eduops.timetable.domain.Timetable;
import ci.company.eduops.timetable.domain.TimetableSlot;
import ci.company.eduops.timetable.domain.TimetableStatus;
import ci.company.eduops.timetable.dto.request.SlotUpsertRequest;
import ci.company.eduops.timetable.dto.response.TimetableConflictResponse;
import ci.company.eduops.timetable.repository.TimetableRepository;
import ci.company.eduops.timetable.repository.TimetableSlotRepository;
import ci.company.eduops.timetable.service.TimetableService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Rooms on the grid (section 19 / section 27).
 *
 * <p>A course used to be saved with a null room whenever the screen sent no
 * room, which silently skipped the room clash check and left the "par salle"
 * view empty. These tests pin the two halves of the fix: the room a course will
 * really occupy is the class's usual one, and that room is checked.</p>
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class TimetableRoomPlacementTest {

    private static final UUID SCHOOL_ID = UUID.randomUUID();
    private static final UUID YEAR_ID = UUID.randomUUID();
    private static final UUID CLASSROOM_ID = UUID.randomUUID();
    private static final UUID ROOM_ID = UUID.randomUUID();
    private static final UUID OTHER_ROOM_ID = UUID.randomUUID();
    private static final UUID SUBJECT_ID = UUID.randomUUID();
    private static final UUID TEACHER_ID = UUID.randomUUID();

    @Mock private TimetableRepository timetableRepository;
    @Mock private TimetableSlotRepository slotRepository;
    @Mock private ClassroomRepository classroomRepository;
    @Mock private SubjectRepository subjectRepository;
    @Mock private TeacherRepository teacherRepository;
    @Mock private RoomRepository roomRepository;
    @Mock private TermRepository termRepository;
    @Mock private AcademicYearRepository academicYearRepository;
    @Mock private SchoolRepository schoolRepository;
    @Mock private TeacherAssignmentRepository assignmentRepository;
    @Mock private AuditService auditService;
    @Mock private CurrentUser currentUser;

    private TimetableService service;

    @BeforeEach
    void setUp() {
        service = new TimetableService(timetableRepository, slotRepository, classroomRepository,
                subjectRepository, teacherRepository, roomRepository, termRepository,
                academicYearRepository, schoolRepository, assignmentRepository, auditService,
                currentUser);
        TenantContext.setSchoolId(SCHOOL_ID);
    }

    @AfterEach
    void clearTenant() {
        TenantContext.clear();
    }

    @Test
    @DisplayName("un cours posé sans salle est confronté à la salle habituelle de la classe")
    void checksTheUsualRoomWhenTheRequestNamesNone() {
        Room usualRoom = givenActiveYearAndUsualRoom(CommonStatus.ACTIVE);
        givenNoConflictExceptTheRoom();
        TimetableSlot busy = busySlot();
        when(slotRepository.findRoomConflicts(eq(ROOM_ID), any(), any(), any(), any(), any()))
                .thenReturn(List.of(busy));

        List<TimetableConflictResponse> conflicts = service.check(request(null), null);

        assertThat(conflicts).hasSize(1);
        assertThat(conflicts.get(0).getKind()).isEqualTo("ROOM_BUSY");
        assertThat(usualRoom.getStatus()).isEqualTo(CommonStatus.ACTIVE);
    }

    @Test
    @DisplayName("une salle habituelle archivée est ignorée plutôt que refusée")
    void ignoresAnArchivedUsualRoom() {
        givenActiveYearAndUsualRoom(CommonStatus.ARCHIVED);
        givenNoConflictExceptTheRoom();

        List<TimetableConflictResponse> conflicts = service.check(request(null), null);

        assertThat(conflicts).isEmpty();
        verify(slotRepository, never())
                .findRoomConflicts(any(), any(), any(), any(), any(), any());
    }

    @Test
    @DisplayName("la salle choisie à l'écran l'emporte sur la salle habituelle")
    void theChosenRoomWins() {
        givenActiveYearAndUsualRoom(CommonStatus.ACTIVE);
        givenNoConflictExceptTheRoom();
        when(slotRepository.findRoomConflicts(eq(OTHER_ROOM_ID), any(), any(), any(), any(), any()))
                .thenReturn(List.of());

        service.check(request(OTHER_ROOM_ID), null);

        verify(slotRepository).findRoomConflicts(eq(OTHER_ROOM_ID),
                any(), any(), any(), any(), any());
        verify(slotRepository, never())
                .findRoomConflicts(eq(ROOM_ID), any(), any(), any(), any(), any());
    }

    @Test
    @DisplayName("le cours enregistré porte la salle habituelle de la classe")
    void savesTheUsualRoomOnTheGrid() {
        Room usualRoom = givenActiveYearAndUsualRoom(CommonStatus.ACTIVE);
        givenNoConflictExceptTheRoom();
        Subject subject = subject();
        Teacher teacher = teacher();
        Timetable draft = draft();
        when(subjectRepository.findById(SUBJECT_ID)).thenReturn(Optional.of(subject));
        when(teacherRepository.findById(TEACHER_ID)).thenReturn(Optional.of(teacher));
        when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(usualRoom));
        when(timetableRepository
                .findFirstByClassroomIdAndAcademicYearIdAndStatusOrderByEffectiveFromDesc(
                        CLASSROOM_ID, YEAR_ID, TimetableStatus.DRAFT))
                .thenReturn(Optional.of(draft));
        when(slotRepository.save(any(TimetableSlot.class)))
                .thenAnswer(call -> call.getArgument(0));

        service.saveSlot(request(null), null);

        ArgumentCaptor<TimetableSlot> saved = ArgumentCaptor.forClass(TimetableSlot.class);
        verify(slotRepository).save(saved.capture());
        assertThat(saved.getValue().getRoom()).isSameAs(usualRoom);
    }

    // ------------------------------------------------------------- fixtures

    /** Une année active, une classe et sa salle habituelle, selon leur état. */
    private Room givenActiveYearAndUsualRoom(CommonStatus roomStatus) {
        AcademicYear year = mock(AcademicYear.class);
        when(year.getId()).thenReturn(YEAR_ID);
        when(year.getCode()).thenReturn("2026-2027");
        when(academicYearRepository.findBySchoolIdAndStatus(SCHOOL_ID, AcademicYearStatus.ACTIVE))
                .thenReturn(Optional.of(year));

        Room usualRoom = mock(Room.class);
        when(usualRoom.getId()).thenReturn(ROOM_ID);
        when(usualRoom.getName()).thenReturn("Salle B 201");
        when(usualRoom.getStatus()).thenReturn(roomStatus);

        Classroom classroom = mock(Classroom.class);
        when(classroom.getId()).thenReturn(CLASSROOM_ID);
        when(classroom.getName()).thenReturn("6eme A");
        when(classroom.getDefaultRoom()).thenReturn(usualRoom);
        when(classroomRepository.findById(CLASSROOM_ID)).thenReturn(Optional.of(classroom));

        return usualRoom;
    }

    /** Rien ne gêne le placement, sauf une salle occupée quand le test le dit. */
    private void givenNoConflictExceptTheRoom() {
        when(slotRepository.findTeacherConflicts(any(), any(), any(), any(), any(), any()))
                .thenReturn(List.of());
        when(slotRepository.findClassConflicts(any(), any(), any(), any(), any(), any()))
                .thenReturn(List.of());
        when(assignmentRepository.isTeacherAssigned(any(), any(), any())).thenReturn(true);
    }

    private SlotUpsertRequest request(UUID roomId) {
        SlotUpsertRequest request = new SlotUpsertRequest();
        request.setClassroomId(CLASSROOM_ID);
        request.setSubjectId(SUBJECT_ID);
        request.setTeacherId(TEACHER_ID);
        request.setRoomId(roomId);
        request.setDayOfWeek("MONDAY");
        request.setStartTime(LocalTime.of(8, 0));
        request.setEndTime(LocalTime.of(10, 0));
        return request;
    }

    private TimetableSlot busySlot() {
        Subject otherSubject = mock(Subject.class);
        when(otherSubject.getName()).thenReturn("Histoire-Geographie");
        Classroom otherClass = mock(Classroom.class);
        when(otherClass.getName()).thenReturn("5eme B");

        TimetableSlot busy = mock(TimetableSlot.class);
        when(busy.getId()).thenReturn(UUID.randomUUID());
        when(busy.getSubject()).thenReturn(otherSubject);
        when(busy.getClassroom()).thenReturn(otherClass);
        when(busy.getStartTime()).thenReturn(LocalTime.of(9, 0));
        when(busy.getEndTime()).thenReturn(LocalTime.of(11, 0));
        return busy;
    }

    private Subject subject() {
        Subject subject = mock(Subject.class);
        when(subject.getId()).thenReturn(SUBJECT_ID);
        when(subject.getName()).thenReturn("Mathematiques");
        return subject;
    }

    private Teacher teacher() {
        Teacher teacher = mock(Teacher.class);
        when(teacher.getId()).thenReturn(TEACHER_ID);
        when(teacher.fullName()).thenReturn("M. Koffi");
        return teacher;
    }

    private Timetable draft() {
        Timetable draft = mock(Timetable.class);
        when(draft.getId()).thenReturn(UUID.randomUUID());
        when(draft.getStatus()).thenReturn(TimetableStatus.DRAFT);
        return draft;
    }
}
