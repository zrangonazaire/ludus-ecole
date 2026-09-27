package ci.company.eduops.finance.service;

import ci.company.eduops.finance.service.CollectionService;
import ci.company.eduops.finance.service.OutstandingService;
import ci.company.eduops.finance.repository.CollectionActionRepository;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.finance.dto.request.CollectionActionRequest;
import jakarta.validation.Validation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import java.util.UUID;
import java.util.Optional;
import java.time.LocalDate;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CollectionServiceTest {
    @AfterEach void clear() { TenantContext.clear(); }

    @Test void rejectsReadingAnotherSchoolsStudent() {
        StudentRepository students = mock(StudentRepository.class);
        CollectionActionRepository actions = mock(CollectionActionRepository.class);
        OutstandingService outstanding = mock(OutstandingService.class);
        Student student = new Student();
        School school = new School(); school.setId(UUID.randomUUID()); student.setSchool(school);
        UUID studentId = UUID.randomUUID();
        when(students.findById(studentId)).thenReturn(Optional.of(student));
        TenantContext.setSchoolId(UUID.randomUUID());
        CollectionService service = new CollectionService(actions, students, outstanding, mock(CurrentUser.class));
        assertThrows(BusinessException.class, () -> service.history(studentId, null));
        assertThrows(BusinessException.class, () -> service.create(studentId, null, new CollectionActionRequest()));
        verifyNoInteractions(actions, outstanding);
    }

    @Test void requiresBothPromiseFieldsAndPreservesLedgerOnSuccess() {
        var students = mock(StudentRepository.class);
        var actions = mock(CollectionActionRepository.class);
        var outstanding = mock(OutstandingService.class);
        var user = mock(CurrentUser.class);
        UUID schoolId = UUID.randomUUID(), studentId = UUID.randomUUID(), yearId = UUID.randomUUID();
        TenantContext.setSchoolId(schoolId);
        School school = new School(); school.setId(schoolId);
        Student student = new Student(); student.setSchool(school);
        var year = new ci.company.eduops.academicyear.domain.AcademicYear(); year.setId(yearId);
        when(students.findById(studentId)).thenReturn(Optional.of(student));
        when(outstanding.resolveYear(null)).thenReturn(year);
        when(user.requireId()).thenReturn(UUID.randomUUID());
        when(user.username()).thenReturn("comptable");
        var service = new CollectionService(actions, students, outstanding, user);
        var request = new CollectionActionRequest();
        request.setChannel(ci.company.eduops.finance.domain.CollectionAction.Channel.PHONE);
        request.setNote("  Appel avec le parent  ");
        request.setPromisedAmount(new BigDecimal("10000.00"));
        assertThrows(BusinessException.class, () -> service.create(studentId, null, request));
        verifyNoInteractions(actions);
        request.setPromisedDate(LocalDate.now().plusDays(5));
        when(actions.saveAndFlush(any())).thenAnswer(call -> call.getArgument(0));
        var response = service.create(studentId, null, request);
        assertEquals("Appel avec le parent", response.getNote());
        assertEquals(new BigDecimal("10000.00"), response.getPromisedAmount());
        var capture = org.mockito.ArgumentCaptor.forClass(ci.company.eduops.finance.domain.CollectionAction.class);
        verify(actions).saveAndFlush(capture.capture());
        assertEquals(schoolId, capture.getValue().getSchoolId());
        assertEquals(yearId, capture.getValue().getAcademicYearId());
        assertEquals(studentId, capture.getValue().getStudentId());
    }

    @Test void rejectsBlankNotesNegativePromisesAndPastFollowUps() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var request = new CollectionActionRequest();
            request.setNote(" ");
            request.setPromisedAmount(new BigDecimal("-1"));
            request.setNextContactDate(LocalDate.now().minusDays(1));
            var violations = factory.getValidator().validate(request);
            assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("note")));
            assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("channel")));
            assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("promisedAmount")));
            assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("nextContactDate")));
        }
    }
}
