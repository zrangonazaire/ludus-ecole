package ci.company.eduops.timetable;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.timetable.domain.Timetable;
import ci.company.eduops.timetable.domain.TimetableSlot;
import ci.company.eduops.timetable.domain.TimetableStatus;
import ci.company.eduops.timetable.repository.TimetableSlotRepository;
import ci.company.eduops.timetable.service.TimetableService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TimetableCancellationTest {
    @Mock private TimetableSlotRepository slots;
    @Mock private AuditService audit;
    @InjectMocks private TimetableService service;

    @ParameterizedTest
    @EnumSource(value = TimetableStatus.class, names = {"DRAFT", "PUBLISHED"})
    void deactivatesCourseWithoutDeletingHistory(TimetableStatus status) {
        UUID id = UUID.randomUUID();
        Timetable timetable = new Timetable();
        timetable.setStatus(status);
        Subject subject = new Subject();
        subject.setName("Mathématiques");
        Classroom classroom = new Classroom();
        classroom.setName("6e A");
        TimetableSlot slot = new TimetableSlot();
        slot.setId(id);
        slot.setTimetable(timetable);
        slot.setSubject(subject);
        slot.setClassroom(classroom);
        slot.setActive(true);
        when(slots.findById(id)).thenReturn(Optional.of(slot));

        service.deleteSlot(id);

        assertThat(slot.isActive()).isFalse();
        assertThat(slot.getTimetable()).isSameAs(timetable);
        assertThat(slot.getSubject()).isSameAs(subject);
        assertThat(slot.getClassroom()).isSameAs(classroom);
        verify(slots).save(slot);
        verify(slots, never()).delete(any(TimetableSlot.class));
        verify(slots, never()).deleteById(any());
        verify(audit).logCancel("TimetableSlot", id, "Mathématiques — 6e A", null);
    }

    @Test
    void rejectsUnknownSlotWithoutWritingOrAuditing() {
        UUID id = UUID.randomUUID();
        when(slots.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.deleteSlot(id)).isInstanceOf(BusinessException.class);

        verify(slots, never()).save(any());
        verifyNoInteractions(audit);
    }
}
