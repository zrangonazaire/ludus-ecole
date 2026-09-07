package ci.company.eduops.academicyear;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.dto.request.AcademicYearCreateRequest;
import ci.company.eduops.academicyear.dto.response.AcademicYearResponse;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.academicyear.service.AcademicYearService;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.domain.TermType;
import ci.company.eduops.term.repository.TermRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Le découpage d'une année en périodes.
 *
 * <p>Les mêmes propriétés sont vérifiées côté Angular par
 * {@code check-academic-years.js}. La duplication est voulue : l'écran calcule
 * l'aperçu lui-même pour montrer les dates avant d'enregistrer, et deux
 * implémentations qui divergeraient d'un jour feraient mentir la seule chose
 * que l'utilisateur peut contrôler.</p>
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class AcademicYearTermSplitTest {

    @Mock private AcademicYearRepository yearRepository;
    @Mock private TermRepository termRepository;
    @Mock private SchoolRepository schoolRepository;
    @Mock private ClassroomRepository classroomRepository;
    @Mock private EnrollmentRepository enrollmentRepository;
    @Mock private AuditService auditService;

    private AcademicYearService service;
    private School school;
    private final List<Term> saved = new ArrayList<>();

    @BeforeEach
    @SuppressWarnings("unchecked")
    void setUp() {
        service = new AcademicYearService(yearRepository, termRepository, schoolRepository,
                classroomRepository, enrollmentRepository, auditService);

        school = new School();
        school.setId(UUID.randomUUID());
        school.setCode("EP");
        school.setName("École Pilote");
        TenantContext.setSchoolId(school.getId());

        when(schoolRepository.findById(school.getId())).thenReturn(Optional.of(school));
        when(yearRepository.existsBySchoolIdAndCode(any(), any())).thenReturn(false);
        when(yearRepository.findBySchoolIdAndStatus(any(), any())).thenReturn(Optional.empty());
        when(yearRepository.save(any(AcademicYear.class))).thenAnswer(invocation -> {
            AcademicYear year = invocation.getArgument(0);
            if (year.getId() == null) {
                year.setId(UUID.randomUUID());
            }
            return year;
        });
        saved.clear();
        when(termRepository.saveAll(any())).thenAnswer(invocation -> {
            saved.addAll((List<Term>) invocation.getArgument(0));
            return saved;
        });
        when(termRepository.findByAcademicYearIdOrderBySequenceAsc(any()))
                .thenAnswer(invocation -> saved);
    }

    @AfterEach
    void clearTenant() {
        TenantContext.clear();
    }

    @Test
    void ivorianYearSplitsIntoThreeTrimestersOnExactDates() {
        AcademicYearResponse response = create("2026-2027",
                LocalDate.of(2026, 9, 1), LocalDate.of(2027, 7, 31),
                TermType.TRIMESTER, 3);

        assertThat(response.getTerms()).hasSize(3);
        assertThat(response.getTerms()).extracting("startDate", "endDate")
                .containsExactly(
                        org.assertj.core.groups.Tuple.tuple(
                                LocalDate.of(2026, 9, 1), LocalDate.of(2026, 12, 21)),
                        org.assertj.core.groups.Tuple.tuple(
                                LocalDate.of(2026, 12, 22), LocalDate.of(2027, 4, 11)),
                        org.assertj.core.groups.Tuple.tuple(
                                LocalDate.of(2027, 4, 12), LocalDate.of(2027, 7, 31)));
        assertThat(response.getTerms()).extracting("name")
                .containsExactly("1er trimestre", "2e trimestre", "3e trimestre");
        assertThat(response.getTerms()).extracting("code")
                .containsExactly("T1", "T2", "T3");
    }

    /**
     * Aucun trou, aucun recouvrement, quelle que soit l'année.
     *
     * <p>Un jour orphelin entre deux périodes laisserait des absences et des
     * notes qu'aucune période ne pourrait porter ; un jour compté deux fois
     * les ferait apparaître dans deux bulletins.</p>
     */
    @ParameterizedTest
    @CsvSource({
            "2026-09-01, 2027-07-31, 3",
            "2026-09-01, 2027-06-30, 2",
            "2026-01-01, 2026-12-31, 4",
            "2026-09-15, 2027-06-14, 3",
            "2026-10-01, 2027-05-31, 5",
            "2026-09-01, 2027-07-31, 6",
            "2026-09-01, 2027-07-31, 1"
    })
    void splitCoversTheWholeYearWithoutGapOrOverlap(String startText, String endText, int count) {
        LocalDate start = LocalDate.parse(startText);
        LocalDate end = LocalDate.parse(endText);

        AcademicYearResponse response = create("Y-" + count, start, end,
                TermType.TERM, count);
        var terms = response.getTerms();

        assertThat(terms).hasSize(count);
        assertThat(terms.get(0).getStartDate()).isEqualTo(start);
        assertThat(terms.get(count - 1).getEndDate()).isEqualTo(end);

        long covered = 0;
        long shortest = Long.MAX_VALUE;
        long longest = 0;
        long previousLength = Long.MAX_VALUE;
        for (int index = 0; index < count; index++) {
            var term = terms.get(index);
            if (index > 0) {
                assertThat(term.getStartDate())
                        .isEqualTo(terms.get(index - 1).getEndDate().plusDays(1));
            }
            long length = ChronoUnit.DAYS.between(term.getStartDate(), term.getEndDate()) + 1;
            covered += length;
            shortest = Math.min(shortest, length);
            longest = Math.max(longest, length);
            // Le reste va aux premières périodes : la dernière finit ainsi
            // exactement le dernier jour de l'année.
            assertThat(length).isLessThanOrEqualTo(previousLength);
            previousLength = length;
        }

        assertThat(covered).isEqualTo(ChronoUnit.DAYS.between(start, end) + 1);
        assertThat(longest - shortest).isLessThanOrEqualTo(1);
    }

    @Test
    void refusesAYearTooShortForTheRequestedSplit() {
        assertThatThrownBy(() -> create("2026-2027",
                LocalDate.of(2026, 9, 1), LocalDate.of(2026, 9, 10),
                TermType.TRIMESTER, 3))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("trop courte");
    }

    @Test
    void refusesAnEndDateBeforeTheStart() {
        assertThatThrownBy(() -> create("2026-2027",
                LocalDate.of(2027, 7, 31), LocalDate.of(2026, 9, 1),
                TermType.TRIMESTER, 3))
                .isInstanceOf(BusinessException.class);
    }

    @Test
    void aNewYearNeverStealsTheActiveFlag() {
        // Créer une année pendant que l'année en cours tourne ne doit rien
        // basculer : la préparation de la rentrée est un geste séparé.
        AcademicYearResponse response = create("2027-2028",
                LocalDate.of(2027, 9, 1), LocalDate.of(2028, 7, 31),
                TermType.TRIMESTER, 3);

        assertThat(response.getStatus()).isEqualTo(AcademicYearStatus.DRAFT);
        assertThat(response.isActive()).isFalse();
    }

    private AcademicYearResponse create(String code, LocalDate start, LocalDate end,
                                        TermType type, int count) {
        AcademicYearCreateRequest request = new AcademicYearCreateRequest();
        request.setCode(code);
        request.setStartDate(start);
        request.setEndDate(end);
        request.setTermType(type);
        request.setTermCount(count);
        return service.create(request);
    }
}
