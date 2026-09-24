package ci.company.eduops.supply;

import ci.company.eduops.academicyear.domain.*;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import jakarta.validation.Validation;
import org.junit.jupiter.api.*;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class SupplyListServiceTest {
    private final SupplyListRepository lists = mock(SupplyListRepository.class);
    private final LevelRepository levels = mock(LevelRepository.class);
    private final AcademicYearRepository years = mock(AcademicYearRepository.class);
    private final AuditService audit = mock(AuditService.class);
    private final SupplyListService service = new SupplyListService(lists, levels, years, audit);
    private final UUID schoolId = UUID.randomUUID(), levelId = UUID.randomUUID(), yearId = UUID.randomUUID();
    private Level level;
    private AcademicYear year;

    @BeforeEach void setup() {
        TenantContext.setSchoolId(schoolId);
        School school = new School(); school.setId(schoolId); school.setName("École témoin");
        Cycle cycle = new Cycle(); cycle.setSchool(school);
        level = new Level(); level.setId(levelId); level.setName("CM2"); level.setCycle(cycle);
        year = new AcademicYear(); year.setId(yearId); year.setSchool(school); year.setLabel("2026–2027");
        when(levels.findById(levelId)).thenReturn(Optional.of(level));
        when(years.findById(yearId)).thenReturn(Optional.of(year));
        when(lists.findBySchoolIdAndLevelIdAndAcademicYearId(schoolId, levelId, yearId)).thenReturn(Optional.empty());
    }
    @AfterEach void cleanup() { TenantContext.clear(); }
    private SupplyListRequest request(Long version) {
        return new SupplyListRequest(version, " Fournitures ", " Étiqueter le matériel ",
                List.of(new SupplyListRequest.Item(" Cahier ", 3, " 96 pages ")));
    }

    @Test void emptyListKeepsSchoolLevelAndYearContext() {
        var result = service.get(levelId, yearId);
        assertThat(result.id()).isNull();
        assertThat(result.schoolName()).isEqualTo("École témoin");
        assertThat(result.levelName()).isEqualTo("CM2");
        assertThat(result.yearLabel()).isEqualTo("2026–2027");
        assertThat(result.items()).isEmpty();
    }

    @Test void createsAndAuditsListWithinCurrentSchool() {
        when(lists.saveAndFlush(any())).thenAnswer(invocation -> {
            SupplyList list = invocation.getArgument(0); list.setId(UUID.randomUUID()); list.setVersion(0L); return list;
        });
        var result = service.save(levelId, yearId, request(null));
        assertThat(result.id()).isNotNull();
        assertThat(result.title()).isEqualTo("Fournitures");
        assertThat(result.items()).containsExactly(new SupplyListRequest.Item("Cahier", 3, "96 pages"));
        verify(lists).saveAndFlush(argThat(l -> l.getSchoolId().equals(schoolId)
                && l.getLevelId().equals(levelId) && l.getAcademicYearId().equals(yearId)));
        verify(audit).logCreate(eq("SupplyList"), eq(result.id()), eq("Fournitures"), anyMap());
    }

    @Test void rejectsLevelFromAnotherSchool() {
        level.getCycle().getSchool().setId(UUID.randomUUID());
        assertThatThrownBy(() -> service.save(levelId, yearId, request(null))).isInstanceOf(BusinessException.class);
        verifyNoInteractions(lists);
    }

    @Test void rejectsYearFromAnotherSchool() {
        School other = new School(); other.setId(UUID.randomUUID()); year.setSchool(other);
        assertThatThrownBy(() -> service.get(levelId, yearId)).isInstanceOf(BusinessException.class);
        verifyNoInteractions(lists);
    }

    @Test void rejectsRequestsWithoutTenant() {
        TenantContext.clear();
        assertThatThrownBy(() -> service.get(levelId, yearId)).isInstanceOf(BusinessException.class);
        verifyNoInteractions(lists, levels, years);
    }

    @Test void closedYearRemainsReadableButCannotBeEdited() {
        year.setStatus(AcademicYearStatus.CLOSED);
        assertThat(service.get(levelId, yearId).yearLabel()).isEqualTo("2026–2027");
        assertThatThrownBy(() -> service.save(levelId, yearId, request(null))).isInstanceOf(BusinessException.class);
        verify(lists, never()).saveAndFlush(any());
    }

    @Test void staleVersionCannotOverwriteAnExistingList() {
        SupplyList list = new SupplyList(); list.setVersion(2L);
        when(lists.findBySchoolIdAndLevelIdAndAcademicYearId(schoolId, levelId, yearId)).thenReturn(Optional.of(list));
        assertThatThrownBy(() -> service.save(levelId, yearId, request(1L))).isInstanceOf(BusinessException.class);
        assertThatThrownBy(() -> service.save(levelId, yearId, request(null))).isInstanceOf(BusinessException.class);
        verify(lists, never()).saveAndFlush(any());
    }

    @Test void validatesNestedItemsAndRequiresAtLeastOneSupply() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var validator = factory.getValidator();
            assertThat(validator.validate(request(null))).isEmpty();
            assertThat(validator.validate(new SupplyListRequest(null, "Liste", "", List.of()))).isNotEmpty();
            assertThat(validator.validate(new SupplyListRequest(null, "Liste", "",
                    List.of(new SupplyListRequest.Item(" ", 0, ""))))).hasSize(2);
        }
    }
}
