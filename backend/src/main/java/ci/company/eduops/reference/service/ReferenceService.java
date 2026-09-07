package ci.company.eduops.reference.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.dashboard.dto.response.AcademicYearSummary;
import ci.company.eduops.dashboard.dto.response.TermSummary;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.reference.dto.response.GlobalSearchResultResponse;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.repository.TermRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The lists every screen needs, and the search bar at the top of all of them.
 *
 * <p>Kept apart from the business modules on purpose: years, terms and the
 * search box belong to no one domain, and hanging them off whichever module
 * happened to need them first is how a codebase ends up with the academic
 * calendar living inside the fees service.</p>
 */
@Service
public class ReferenceService {

    /** Au-delà, la barre de recherche devient illisible. */
    private static final int SEARCH_LIMIT = 8;
    /** En deçà, on cherche tout et n'importe quoi. */
    private static final int MIN_SEARCH_LENGTH = 2;

    private final AcademicYearRepository academicYearRepository;
    private final TermRepository termRepository;
    private final StudentRepository studentRepository;
    private final GuardianRepository guardianRepository;
    private final ClassroomRepository classroomRepository;

    public ReferenceService(AcademicYearRepository academicYearRepository,
                            TermRepository termRepository,
                            StudentRepository studentRepository,
                            GuardianRepository guardianRepository,
                            ClassroomRepository classroomRepository) {
        this.academicYearRepository = academicYearRepository;
        this.termRepository = termRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
        this.classroomRepository = classroomRepository;
    }

    /** Les années scolaires de l'établissement, la plus récente d'abord. */
    @Transactional(readOnly = true)
    public List<AcademicYearSummary> academicYears() {
        List<AcademicYearSummary> rows = new ArrayList<>();
        for (AcademicYear year : academicYearRepository
                .findBySchoolOrderByStartDateDesc(requireSchoolId())) {
            rows.add(toYear(year));
        }
        return rows;
    }

    /** Les trimestres d'une année, dans l'ordre. */
    @Transactional(readOnly = true)
    public List<TermSummary> terms(UUID academicYearId) {
        List<TermSummary> rows = new ArrayList<>();
        for (Term term
                : termRepository.findByAcademicYearIdOrderBySequenceAsc(academicYearId)) {
            rows.add(toTerm(term));
        }
        return rows;
    }

    /**
     * The search bar: pupils, guardians and classes, in that order.
     *
     * <p>Pupils first because that is what is being looked for nine times out
     * of ten — usually with a matricule half-remembered from a receipt.</p>
     *
     * <p>Below two characters nothing is returned. A single letter matches
     * most of the school and turns a search box into a slow way of listing
     * everybody.</p>
     */
    @Transactional(readOnly = true)
    public List<GlobalSearchResultResponse> search(String query) {
        List<GlobalSearchResultResponse> results = new ArrayList<>();
        String needle = query == null ? "" : query.trim();
        if (needle.length() < MIN_SEARCH_LENGTH) {
            return results;
        }
        UUID schoolId = requireSchoolId();
        PageRequest limit = PageRequest.of(0, SEARCH_LIMIT);

        for (Student student
                : studentRepository.search(schoolId, "", needle, limit).getContent()) {
            results.add(new GlobalSearchResultResponse("STUDENT",
                    student.getId().toString(), student.fullName(),
                    student.getStudentNumber(), "/students/" + student.getId()));
        }
        for (Guardian guardian : guardianRepository.search(schoolId, needle, limit).getContent()) {
            results.add(new GlobalSearchResultResponse("GUARDIAN",
                    guardian.getId().toString(), guardian.fullName(),
                    guardian.getPhone(), "/guardians/" + guardian.getId()));
        }
        String lower = needle.toLowerCase();
        for (Classroom classroom : classroomRepository.findAll()) {
            if (results.size() >= SEARCH_LIMIT * 3) {
                break;
            }
            if (classroom.getName() != null
                    && classroom.getName().toLowerCase().contains(lower)) {
                results.add(new GlobalSearchResultResponse("CLASSROOM",
                        classroom.getId().toString(), classroom.getName(),
                        classroom.getLevel() != null ? classroom.getLevel().getName() : null,
                        "/classes/" + classroom.getId()));
            }
        }
        return results;
    }

    // ----------------------------------------------------------- conversion

    private AcademicYearSummary toYear(AcademicYear year) {
        AcademicYearSummary summary = new AcademicYearSummary();
        summary.setId(year.getId());
        summary.setCode(year.getCode());
        summary.setLabel(year.getLabel());
        summary.setStartDate(year.getStartDate());
        summary.setEndDate(year.getEndDate());
        summary.setStatus(year.getStatus().name());
        return summary;
    }

    private TermSummary toTerm(Term term) {
        TermSummary summary = new TermSummary();
        summary.setId(term.getId());
        summary.setAcademicYearId(term.getAcademicYear().getId());
        summary.setName(term.getName());
        summary.setCode(term.getCode());
        summary.setSequence(term.getSequence());
        summary.setStartDate(term.getStartDate());
        summary.setEndDate(term.getEndDate());
        summary.setStatus(term.getStatus().name());
        return summary;
    }

    private UUID requireSchoolId() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
