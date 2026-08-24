package ci.company.eduops.subject.service;

import ci.company.eduops.assessment.repository.AssessmentRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.repository.CurriculumSubjectRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.domain.SubjectCategory;
import ci.company.eduops.subject.dto.request.SubjectUpsertRequest;
import ci.company.eduops.subject.dto.response.SubjectResponse;
import ci.company.eduops.subject.repository.SubjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * The school's subject catalogue.
 *
 * <p>A subject exists once for the whole school. What varies from one level to
 * the next is its weight, and that lives in the curriculum — see
 * {@code CurriculumService}. Keeping the two apart is what lets a school rename
 * "Mathématiques" once instead of sixteen times.</p>
 */
@Service
public class SubjectService {

    private static final Logger log = LoggerFactory.getLogger(SubjectService.class);

    /** French labels, resolved here so every screen shows the same wording. */
    private static final Map<SubjectCategory, String> CATEGORY_LABELS = Map.of(
            SubjectCategory.SCIENCE, "Sciences",
            SubjectCategory.LITERATURE, "Lettres",
            SubjectCategory.LANGUAGE, "Langues",
            SubjectCategory.ARTS, "Arts",
            SubjectCategory.SPORT, "Sport",
            SubjectCategory.TECHNICAL, "Technique",
            SubjectCategory.RELIGION, "Religion",
            SubjectCategory.CIVICS, "Éducation civique",
            SubjectCategory.OTHER, "Autre");

    private final SubjectRepository subjectRepository;
    private final CurriculumSubjectRepository curriculumSubjectRepository;
    private final AssessmentRepository assessmentRepository;
    private final SchoolRepository schoolRepository;
    private final AuditService auditService;

    public SubjectService(SubjectRepository subjectRepository,
                          CurriculumSubjectRepository curriculumSubjectRepository,
                          AssessmentRepository assessmentRepository,
                          SchoolRepository schoolRepository,
                          AuditService auditService) {
        this.subjectRepository = subjectRepository;
        this.curriculumSubjectRepository = curriculumSubjectRepository;
        this.assessmentRepository = assessmentRepository;
        this.schoolRepository = schoolRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ read

    @Transactional(readOnly = true)
    public List<SubjectResponse> list(boolean includeArchived) {
        UUID schoolId = requireSchool();
        List<Subject> subjects = includeArchived
                ? subjectRepository.findAll().stream()
                        .filter(s -> s.getSchool().getId().equals(schoolId))
                        .sorted((a, b) -> a.getName().compareToIgnoreCase(b.getName()))
                        .toList()
                : subjectRepository.findBySchoolIdAndStatusOrderByNameAsc(
                        schoolId, CommonStatus.ACTIVE);

        List<SubjectResponse> result = new ArrayList<>(subjects.size());
        for (Subject subject : subjects) {
            result.add(toResponse(subject));
        }
        return result;
    }

    /** Nombre de niveaux utilisant la matière, en une requête. */
    private long levelsUsing(UUID subjectId) {
        return curriculumSubjectRepository.countLevelsUsing(subjectId);
    }

    @Transactional(readOnly = true)
    public SubjectResponse getById(UUID id) {
        return toResponse(require(id));
    }

    // ----------------------------------------------------------------- write

    @Transactional
    public SubjectResponse create(SubjectUpsertRequest request) {
        UUID schoolId = requireSchool();
        String code = normaliseCode(request.getCode());

        if (subjectRepository.existsBySchoolIdAndCode(schoolId, code)) {
            throw new BusinessException(ErrorCode.SUBJECT_CODE_ALREADY_USED)
                    .detail("code", code);
        }

        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));

        Subject subject = new Subject();
        subject.setSchool(school);
        subject.setCode(code);
        apply(subject, request);
        subject.setStatus(CommonStatus.ACTIVE);

        Subject saved = subjectRepository.save(subject);
        auditService.logCreate("Subject", saved.getId(), saved.getName(),
                Map.<String, Object>of(
                        "code", saved.getCode(),
                        "category", saved.getCategory().name(),
                        "graded", saved.isGraded()));
        log.info("Matière {} ({}) créée", saved.getName(), saved.getCode());
        return toResponse(saved);
    }

    @Transactional
    public SubjectResponse update(UUID id, SubjectUpsertRequest request) {
        Subject subject = require(id);
        String code = normaliseCode(request.getCode());

        if (!code.equals(subject.getCode())
                && subjectRepository.existsBySchoolIdAndCode(requireSchool(), code)) {
            throw new BusinessException(ErrorCode.SUBJECT_CODE_ALREADY_USED)
                    .detail("code", code);
        }

        Map<String, Object> before = Map.<String, Object>of(
                "code", subject.getCode(),
                "name", subject.getName(),
                "graded", subject.isGraded());

        subject.setCode(code);
        apply(subject, request);

        Subject saved = subjectRepository.save(subject);
        auditService.logUpdate("Subject", saved.getId(), saved.getName(), before,
                Map.<String, Object>of(
                        "code", saved.getCode(),
                        "name", saved.getName(),
                        "graded", saved.isGraded()));
        return toResponse(saved);
    }

    /**
     * Archives a subject.
     *
     * <p>Never a hard delete: report cards, assessments and timetable slots
     * already point at it. Archiving keeps those references readable while
     * removing the subject from the pickers.</p>
     */
    @Transactional
    public SubjectResponse archive(UUID id) {
        Subject subject = require(id);
        long usages = levelsUsing(id);
        if (usages > 0) {
            throw new BusinessException(ErrorCode.SUBJECT_IN_USE,
                    "Retirez d'abord cette matière du programme des niveaux concernés.")
                    .detail("levels", usages);
        }
        subject.setStatus(CommonStatus.ARCHIVED);
        Subject saved = subjectRepository.save(subject);
        auditService.logCancel("Subject", saved.getId(), saved.getName(), null);
        return toResponse(saved);
    }

    @Transactional
    public SubjectResponse restore(UUID id) {
        Subject subject = require(id);
        subject.setStatus(CommonStatus.ACTIVE);
        Subject saved = subjectRepository.save(subject);
        auditService.logValidate("Subject", saved.getId(), saved.getName(), null);
        return toResponse(saved);
    }

    // ------------------------------------------------------------- internals

    private void apply(Subject subject, SubjectUpsertRequest request) {
        subject.setName(request.getName().trim());
        subject.setShortName(blankToNull(request.getShortName()));
        subject.setColorHex(blankToNull(request.getColorHex()));
        subject.setDescription(blankToNull(request.getDescription()));
        subject.setGraded(request.isGraded());
        subject.setCategory(parseCategory(request.getCategory()));
    }

    private SubjectCategory parseCategory(String value) {
        if (value == null || value.isBlank()) {
            return SubjectCategory.OTHER;
        }
        try {
            return SubjectCategory.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Catégorie de matière inconnue : " + value);
        }
    }

    private Subject require(UUID id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.SUBJECT_NOT_FOUND));
        // Belt and braces: RLS already scopes the query.
        if (!subject.getSchool().getId().equals(requireSchool())) {
            throw new BusinessException(ErrorCode.SUBJECT_NOT_FOUND);
        }
        return subject;
    }

    private SubjectResponse toResponse(Subject subject) {
        SubjectResponse response = new SubjectResponse();
        response.setId(subject.getId());
        response.setCode(subject.getCode());
        response.setName(subject.getName());
        response.setShortName(subject.getShortName());
        response.setCategory(subject.getCategory().name());
        response.setCategoryLabel(CATEGORY_LABELS.getOrDefault(subject.getCategory(), "Autre"));
        response.setColorHex(subject.getColorHex());
        response.setDescription(subject.getDescription());
        response.setGraded(subject.isGraded());
        response.setStatus(subject.getStatus().name());

        long levels = levelsUsing(subject.getId());
        response.setLevelCount((int) levels);
        response.setDeletable(levels == 0
                && !assessmentRepository.existsForSubject(subject.getId()));
        return response;
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    /** Codes stay ASCII and uppercase: they end up in exports and file names. */
    private static String normaliseCode(String value) {
        String stripped = Normalizer.normalize(value.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String code = stripped.toUpperCase(Locale.ROOT).replaceAll("[^A-Z0-9-]+", "");
        if (code.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le code doit contenir au moins une lettre ou un chiffre.");
        }
        return code;
    }
}
