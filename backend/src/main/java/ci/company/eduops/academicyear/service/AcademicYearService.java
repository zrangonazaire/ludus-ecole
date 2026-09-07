package ci.company.eduops.academicyear.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.dto.request.AcademicYearCreateRequest;
import ci.company.eduops.academicyear.dto.response.AcademicYearResponse;
import ci.company.eduops.academicyear.dto.response.TermResponse;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.domain.TermStatus;
import ci.company.eduops.term.domain.TermType;
import ci.company.eduops.term.repository.TermRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Creates school years and decides which one everything else reads.
 *
 * <p>Roughly twenty services key off the active year — enrolments, marks,
 * attendance, invoices, report cards. Switching it is the single most
 * consequential action in the product: nothing appears to break, every screen
 * simply starts describing a different year. So the switch is deliberate, it
 * is logged, and it is reversible.</p>
 */
@Service
public class AcademicYearService {

    private static final Logger log = LoggerFactory.getLogger(AcademicYearService.class);

    /** Assez de jours pour que chaque période en reçoive au moins sept. */
    private static final int MIN_DAYS_PER_TERM = 7;

    private final AcademicYearRepository yearRepository;
    private final TermRepository termRepository;
    private final SchoolRepository schoolRepository;
    private final ClassroomRepository classroomRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AuditService auditService;

    public AcademicYearService(AcademicYearRepository yearRepository,
                               TermRepository termRepository,
                               SchoolRepository schoolRepository,
                               ClassroomRepository classroomRepository,
                               EnrollmentRepository enrollmentRepository,
                               AuditService auditService) {
        this.yearRepository = yearRepository;
        this.termRepository = termRepository;
        this.schoolRepository = schoolRepository;
        this.classroomRepository = classroomRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public List<AcademicYearResponse> list() {
        UUID schoolId = requireSchool();
        List<AcademicYear> years = yearRepository.findBySchoolOrderByStartDateDesc(schoolId);
        List<AcademicYearResponse> response = new ArrayList<>();
        for (AcademicYear year : years) {
            response.add(toResponse(year, true));
        }
        return response;
    }

    @Transactional(readOnly = true)
    public AcademicYearResponse get(UUID yearId) {
        return toResponse(requireYear(yearId), true);
    }

    /**
     * Crée une année et son découpage en périodes.
     *
     * <p>L'année naît en {@code DRAFT} : la créer ne bascule rien. C'est un
     * geste séparé, parce qu'on prépare souvent la rentrée pendant que
     * l'année en cours tourne encore.</p>
     */
    @Transactional
    public AcademicYearResponse create(AcademicYearCreateRequest request) {
        UUID schoolId = requireSchool();
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));

        String code = request.getCode().trim();
        if (yearRepository.existsBySchoolIdAndCode(schoolId, code)) {
            throw BusinessException.of(ErrorCode.CONFLICT,
                    "Une année « " + code + " » existe déjà dans cet établissement.");
        }
        validateSpan(request.getStartDate(), request.getEndDate(), request.getTermCount());

        AcademicYear year = new AcademicYear();
        year.setSchool(school);
        year.setCode(code);
        year.setLabel(blankToNull(request.getLabel()) == null ? code : request.getLabel().trim());
        year.setStartDate(request.getStartDate());
        year.setEndDate(request.getEndDate());
        year.setStatus(AcademicYearStatus.DRAFT);
        // Chaîner à l'année précédente permet plus tard de retrouver le
        // parcours d'un élève d'une année sur l'autre sans deviner par dates.
        yearRepository.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .ifPresent(year::setPreviousYear);
        AcademicYear saved = yearRepository.save(year);

        List<Term> terms = generateTerms(saved, request.getTermType(), request.getTermCount());
        termRepository.saveAll(terms);

        auditService.logCreate("AcademicYear", saved.getId(), saved.getCode(), Map.of(
                "startDate", saved.getStartDate().toString(),
                "endDate", saved.getEndDate().toString(),
                "termCount", terms.size()));
        log.info("Année scolaire {} créée avec {} période(s)", saved.getCode(), terms.size());
        return toResponse(saved, true);
    }

    /**
     * Fait de cette année celle que lisent tous les écrans.
     *
     * <p>L'ancienne passe en {@code CLOSING} et non en {@code CLOSED} : une
     * bascule prématurée un lundi matin doit pouvoir être défaite. Rien n'est
     * effacé, l'ancienne année reste consultable, et la réactiver la remet en
     * place.</p>
     */
    @Transactional
    public AcademicYearResponse activate(UUID yearId) {
        UUID schoolId = requireSchool();
        AcademicYear target = requireYear(yearId);

        if (target.getStatus() == AcademicYearStatus.CLOSED
                || target.getStatus() == AcademicYearStatus.ARCHIVED) {
            throw BusinessException.of(ErrorCode.ACADEMIC_YEAR_CLOSED,
                    "L'année « " + target.getCode() + " » est clôturée : "
                            + "elle ne peut plus redevenir l'année de travail.");
        }
        if (target.getStatus() == AcademicYearStatus.ACTIVE) {
            return toResponse(target, true);
        }
        if (termRepository.findByAcademicYearIdOrderBySequenceAsc(yearId).isEmpty()) {
            // Sans période, ni note ni bulletin ne peuvent exister : activer
            // une telle année installerait une impasse silencieuse.
            throw BusinessException.of(ErrorCode.ACADEMIC_YEAR_INVALID_TRANSITION,
                    "L'année « " + target.getCode() + " » n'a aucune période. "
                            + "Ajoutez-en avant de l'activer.");
        }

        AcademicYear previous = yearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElse(null);
        if (previous != null && !previous.getId().equals(yearId)) {
            previous.setStatus(AcademicYearStatus.CLOSING);
            yearRepository.save(previous);
            // Vidange explicite avant de promouvoir : la base n'autorise
            // qu'une seule année ACTIVE par école (index unique partiel), et
            // elle vérifie à chaque instruction. Laisser Hibernate choisir
            // l'ordre des écritures ferait échouer la bascule une fois sur
            // deux, avec une violation de contrainte incompréhensible.
            yearRepository.flush();
            auditService.logUpdate("AcademicYear", previous.getId(), previous.getCode(),
                    Map.of("status", AcademicYearStatus.ACTIVE.name()),
                    Map.of("status", AcademicYearStatus.CLOSING.name()));
        }

        AcademicYearStatus before = target.getStatus();
        target.setStatus(AcademicYearStatus.ACTIVE);
        AcademicYear saved = yearRepository.save(target);

        auditService.logUpdate("AcademicYear", saved.getId(), saved.getCode(),
                Map.of("status", before.name()),
                Map.of("status", AcademicYearStatus.ACTIVE.name()));
        log.info("Année de travail : {} remplace {}", saved.getCode(),
                previous == null ? "aucune" : previous.getCode());
        return toResponse(saved, true);
    }

    // ------------------------------------------------------------------
    // Découpage en périodes
    // ------------------------------------------------------------------

    private void validateSpan(LocalDate start, LocalDate end, int termCount) {
        if (!end.isAfter(start)) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "La date de fin doit suivre la date de début.");
        }
        long days = ChronoUnit.DAYS.between(start, end) + 1;
        if (days < (long) termCount * MIN_DAYS_PER_TERM) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Cette période est trop courte pour " + termCount
                            + " découpage(s) : il faut au moins "
                            + (termCount * MIN_DAYS_PER_TERM) + " jours.");
        }
    }

    /**
     * Découpe l'année en périodes contiguës, sans trou ni chevauchement.
     *
     * <p>Le reste de la division va aux premières périodes : un trimestre
     * initial un peu plus long correspond à l'usage, et surtout la dernière
     * période finit exactement le dernier jour de l'année — un jour orphelin
     * entre la fin du dernier trimestre et la fin de l'année laisserait des
     * absences et des notes impossibles à rattacher.</p>
     */
    private List<Term> generateTerms(AcademicYear year, TermType type, int count) {
        long totalDays = ChronoUnit.DAYS.between(year.getStartDate(), year.getEndDate()) + 1;
        long base = totalDays / count;
        long remainder = totalDays % count;

        List<Term> terms = new ArrayList<>();
        LocalDate cursor = year.getStartDate();
        for (int index = 1; index <= count; index++) {
            long length = base + (index <= remainder ? 1 : 0);
            LocalDate end = index == count
                    ? year.getEndDate()
                    : cursor.plusDays(length - 1);

            Term term = new Term();
            term.setAcademicYear(year);
            term.setTermType(type);
            term.setSequence(index);
            term.setName(termName(type, index));
            term.setCode(termCode(type, index));
            term.setStartDate(cursor);
            term.setEndDate(end);
            term.setStatus(TermStatus.PLANNED);
            // Poids égal par défaut : une école qui pondère autrement le fera
            // explicitement, plutôt que de découvrir une pondération qu'elle
            // n'a pas choisie au moment des bulletins.
            term.setWeight(BigDecimal.ONE);
            terms.add(term);

            cursor = end.plusDays(1);
        }
        return terms;
    }

    private String termName(TermType type, int index) {
        String ordinal = index == 1 ? "1er" : index + "e";
        return switch (type) {
            case TRIMESTER -> ordinal + " trimestre";
            case SEMESTER -> ordinal + " semestre";
            case TERM -> ordinal + " période";
            case CUSTOM -> "Période " + index;
        };
    }

    private String termCode(TermType type, int index) {
        String prefix = switch (type) {
            case TRIMESTER -> "T";
            case SEMESTER -> "S";
            case TERM -> "P";
            case CUSTOM -> "C";
        };
        return prefix + index;
    }

    // ------------------------------------------------------------------
    // Conversion
    // ------------------------------------------------------------------

    private AcademicYearResponse toResponse(AcademicYear year, boolean withTerms) {
        AcademicYearResponse response = new AcademicYearResponse();
        response.setId(year.getId());
        response.setCode(year.getCode());
        response.setLabel(year.getLabel());
        response.setStartDate(year.getStartDate());
        response.setEndDate(year.getEndDate());
        response.setStatus(year.getStatus());
        response.setStatusLabel(statusLabel(year.getStatus()));
        response.setActive(year.getStatus() == AcademicYearStatus.ACTIVE);
        response.setEditable(year.getStatus() != AcademicYearStatus.CLOSED
                && year.getStatus() != AcademicYearStatus.ARCHIVED);
        response.setClassroomCount(classroomRepository.countActive(year.getId()));
        response.setEnrollmentCount(enrollmentRepository.countActiveForYear(year.getId()));
        if (withTerms) {
            List<TermResponse> terms = new ArrayList<>();
            for (Term term : termRepository.findByAcademicYearIdOrderBySequenceAsc(year.getId())) {
                terms.add(toResponse(term));
            }
            response.setTerms(terms);
        }
        return response;
    }

    private TermResponse toResponse(Term term) {
        TermResponse response = new TermResponse();
        response.setId(term.getId());
        response.setName(term.getName());
        response.setCode(term.getCode());
        response.setTermType(term.getTermType());
        response.setTermTypeLabel(typeLabel(term.getTermType()));
        response.setSequence(term.getSequence());
        response.setStartDate(term.getStartDate());
        response.setEndDate(term.getEndDate());
        response.setStatus(term.getStatus());
        response.setStatusLabel(termStatusLabel(term.getStatus()));
        response.setWeight(term.getWeight());
        return response;
    }

    private String statusLabel(AcademicYearStatus status) {
        return switch (status) {
            case DRAFT -> "Brouillon";
            case OPEN -> "Ouverte aux inscriptions";
            case ACTIVE -> "Année de travail";
            case CLOSING -> "Clôture en cours";
            case CLOSED -> "Clôturée";
            case ARCHIVED -> "Archivée";
        };
    }

    private String termStatusLabel(TermStatus status) {
        return switch (status) {
            case PLANNED -> "Prévue";
            case OPEN -> "En cours";
            case GRADE_ENTRY -> "Saisie des notes";
            case VALIDATION -> "Validation";
            case CLOSED -> "Close";
        };
    }

    private String typeLabel(TermType type) {
        return switch (type) {
            case TRIMESTER -> "Trimestre";
            case SEMESTER -> "Semestre";
            case TERM -> "Période";
            case CUSTOM -> "Découpage libre";
        };
    }

    private AcademicYear requireYear(UUID yearId) {
        UUID schoolId = requireSchool();
        AcademicYear year = yearRepository.findById(yearId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        // Une année d'un autre établissement est introuvable, pas refusée :
        // répondre « accès refusé » confirmerait qu'elle existe.
        if (!schoolId.equals(year.getSchool().getId())) {
            throw BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND);
        }
        return year;
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
