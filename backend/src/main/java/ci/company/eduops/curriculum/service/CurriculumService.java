package ci.company.eduops.curriculum.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.assessment.repository.AssessmentRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.domain.Curriculum;
import ci.company.eduops.curriculum.domain.CurriculumSubject;
import ci.company.eduops.curriculum.dto.request.CurriculumApplyRequest;
import ci.company.eduops.curriculum.dto.request.CurriculumSubjectUpsertRequest;
import ci.company.eduops.curriculum.dto.response.CurriculumSubjectResponse;
import ci.company.eduops.curriculum.dto.response.LevelCurriculumResponse;
import ci.company.eduops.curriculum.repository.CurriculumRepository;
import ci.company.eduops.curriculum.repository.CurriculumSubjectRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * The programme of each level: which subjects are taught, and with what weight.
 *
 * <p>Coefficients sit here rather than on the subject because they are the one
 * thing that genuinely changes from a 6ᵉ to a Terminale. The subject itself —
 * its name, its colour, whether it is graded at all — is the same object across
 * the school.</p>
 *
 * <p>Two refusals are enforced here rather than left to the screen. A subject
 * that already carries assessments on a level cannot be detached from it: the
 * marks would keep pointing at a coefficient that no longer exists, and every
 * average computed since would silently change. And a coefficient of zero is
 * rejected outright, because it divides by zero in the weighted average and
 * turns a whole class's results into nothing.</p>
 */
@Service
public class CurriculumService {

    private static final Logger log = LoggerFactory.getLogger(CurriculumService.class);

    private final CurriculumRepository curriculumRepository;
    private final CurriculumSubjectRepository curriculumSubjectRepository;
    private final SubjectRepository subjectRepository;
    private final LevelRepository levelRepository;
    private final AcademicYearRepository academicYearRepository;
    private final AssessmentRepository assessmentRepository;
    private final AuditService auditService;

    public CurriculumService(CurriculumRepository curriculumRepository,
                             CurriculumSubjectRepository curriculumSubjectRepository,
                             SubjectRepository subjectRepository,
                             LevelRepository levelRepository,
                             AcademicYearRepository academicYearRepository,
                             AssessmentRepository assessmentRepository,
                             AuditService auditService) {
        this.curriculumRepository = curriculumRepository;
        this.curriculumSubjectRepository = curriculumSubjectRepository;
        this.subjectRepository = subjectRepository;
        this.levelRepository = levelRepository;
        this.academicYearRepository = academicYearRepository;
        this.assessmentRepository = assessmentRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ read

    /**
     * Every level of the school with its programme, including the empty ones.
     *
     * <p>Levels without a programme are the reason report cards cannot be
     * published, so they belong in the list rather than being filtered out.</p>
     */
    @Transactional(readOnly = true)
    public List<LevelCurriculumResponse> overview(UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(academicYearId);

        List<Level> levels = levelRepository.findBySchool(schoolId, CommonStatus.ACTIVE);
        Map<UUID, Curriculum> byLevel = new HashMap<>();
        for (Curriculum curriculum : curriculumRepository.findByAcademicYearId(year.getId())) {
            byLevel.put(curriculum.getLevel().getId(), curriculum);
        }

        List<UUID> curriculumIds = byLevel.values().stream().map(Curriculum::getId).toList();
        Map<UUID, List<CurriculumSubject>> rows = new HashMap<>();
        if (!curriculumIds.isEmpty()) {
            for (CurriculumSubject cs : curriculumSubjectRepository
                    .findByCurriculumIdInOrderByDisplayOrderAsc(curriculumIds)) {
                rows.computeIfAbsent(cs.getCurriculum().getId(), k -> new ArrayList<>()).add(cs);
            }
        }

        List<LevelCurriculumResponse> result = new ArrayList<>(levels.size());
        for (Level level : levels) {
            Curriculum curriculum = byLevel.get(level.getId());
            List<CurriculumSubject> subjects = curriculum == null
                    ? List.of()
                    : rows.getOrDefault(curriculum.getId(), List.of());
            result.add(describe(level, curriculum, subjects));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public LevelCurriculumResponse forLevel(UUID levelId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Level level = requireLevel(levelId);
        Curriculum curriculum = curriculumRepository
                .findByAcademicYearIdAndLevelId(year.getId(), levelId)
                .orElse(null);
        List<CurriculumSubject> subjects = curriculum == null
                ? List.of()
                : curriculumSubjectRepository
                        .findByCurriculumIdOrderByDisplayOrderAsc(curriculum.getId());
        return describe(level, curriculum, subjects);
    }

    // ----------------------------------------------------------------- write

    /** Adds a subject to one level, or updates its weight if already present. */
    @Transactional
    public LevelCurriculumResponse upsertSubject(UUID levelId,
                                                 CurriculumSubjectUpsertRequest request,
                                                 UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Level level = requireLevel(levelId);
        Curriculum curriculum = openCurriculum(level, year);
        Subject subject = requireSubject(request.getSubjectId());

        applyRow(curriculum, subject, request, null);

        auditService.logUpdate("Curriculum", curriculum.getId(),
                curriculum.getLabel(), Map.of(),
                Map.<String, Object>of(
                        "subject", subject.getName(),
                        "coefficient", request.getCoefficient().toPlainString()));
        return forLevel(levelId, year.getId());
    }

    /**
     * Detaches a subject from one level.
     *
     * @throws BusinessException when assessments already exist for this subject
     *         on this level
     */
    @Transactional
    public LevelCurriculumResponse removeSubject(UUID levelId, UUID subjectId,
                                                 UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        requireLevel(levelId);

        Curriculum curriculum = curriculumRepository
                .findByAcademicYearIdAndLevelId(year.getId(), levelId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CURRICULUM_NOT_FOUND));

        CurriculumSubject row = curriculumSubjectRepository
                .findByCurriculumIdAndSubjectId(curriculum.getId(), subjectId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CURRICULUM_SUBJECT_NOT_FOUND));

        if (assessmentRepository.existsForSubjectAndLevel(subjectId, levelId)) {
            throw new BusinessException(ErrorCode.CURRICULUM_SUBJECT_HAS_GRADES,
                    "Des évaluations existent déjà pour cette matière sur ce niveau. "
                            + "Le coefficient reste modifiable, mais la matière ne peut plus "
                            + "être retirée du programme.")
                    .detail("subject", row.getSubject().getName());
        }

        curriculumSubjectRepository.delete(row);
        auditService.logCancel("CurriculumSubject", row.getId(),
                row.getSubject().getName() + " — " + curriculum.getLabel(), null);
        return forLevel(levelId, year.getId());
    }

    /**
     * Applies one programme to several levels at once.
     *
     * <p>Within a cycle the programme rarely changes from one level to the next.
     * Filling the same table four times is four chances to mistype a
     * coefficient — and a mistyped coefficient stays invisible until the first
     * report card.</p>
     *
     * <p>Levels that already hold assessments for a subject keep it: the bulk
     * apply updates weights but never removes a subject that carries marks,
     * even when {@code replaceExisting} is set.</p>
     */
    @Transactional
    public List<LevelCurriculumResponse> applyToLevels(CurriculumApplyRequest request,
                                                       UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        List<LevelCurriculumResponse> touched = new ArrayList<>();

        for (UUID levelId : request.getLevelIds()) {
            Level level = requireLevel(levelId);
            Curriculum curriculum = openCurriculum(level, year);

            if (request.isReplaceExisting()) {
                for (CurriculumSubject existing : curriculumSubjectRepository
                        .findByCurriculumIdOrderByDisplayOrderAsc(curriculum.getId())) {
                    boolean stillWanted = request.getSubjects().stream()
                            .anyMatch(s -> s.getSubjectId().equals(existing.getSubject().getId()));
                    boolean hasMarks = assessmentRepository.existsForSubjectAndLevel(
                            existing.getSubject().getId(), levelId);
                    if (!stillWanted && !hasMarks) {
                        curriculumSubjectRepository.delete(existing);
                    }
                }
            }

            int order = 1;
            for (CurriculumSubjectUpsertRequest row : request.getSubjects()) {
                Subject subject = requireSubject(row.getSubjectId());
                boolean present = curriculumSubjectRepository
                        .findByCurriculumIdAndSubjectId(curriculum.getId(), subject.getId())
                        .isPresent();
                // Without replaceExisting, an already-present subject keeps the
                // weight the school gave it: the bulk apply fills gaps, it does
                // not overwrite deliberate exceptions.
                if (present && !request.isReplaceExisting()) {
                    order++;
                    continue;
                }
                // Bulk apply keeps the order of the submitted list, so every
                // level ends up with the same subject order in its report card.
                applyRow(curriculum, subject, row, order);
                order++;
            }

            log.info("Programme appliqué au niveau {} : {} matière(s)",
                    level.getName(), request.getSubjects().size());
            touched.add(forLevel(levelId, year.getId()));
        }

        auditService.logUpdate("Curriculum", null, "Application groupée", Map.of(),
                Map.<String, Object>of(
                        "levels", request.getLevelIds().size(),
                        "subjects", request.getSubjects().size(),
                        "replaceExisting", request.isReplaceExisting()));
        return touched;
    }

    // ------------------------------------------------------------- internals

    private void applyRow(Curriculum curriculum, Subject subject,
                          CurriculumSubjectUpsertRequest request, Integer forcedOrder) {
        if (request.getCoefficient() == null
                || request.getCoefficient().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException(ErrorCode.COEFFICIENT_OUT_OF_RANGE)
                    .detail("subject", subject.getName());
        }

        CurriculumSubject row = curriculumSubjectRepository
                .findByCurriculumIdAndSubjectId(curriculum.getId(), subject.getId())
                .orElseGet(() -> {
                    CurriculumSubject created = new CurriculumSubject();
                    created.setCurriculum(curriculum);
                    created.setSubject(subject);
                    return created;
                });

        row.setCoefficient(request.getCoefficient());
        row.setWeeklyHours(request.getWeeklyHours() == null
                ? new BigDecimal("2.00") : request.getWeeklyHours());
        row.setMandatory(request.isMandatory());
        row.setPassingMark(request.getPassingMark());
        if (request.getDisplayOrder() != null) {
            row.setDisplayOrder(request.getDisplayOrder());
        } else if (forcedOrder != null) {
            row.setDisplayOrder(forcedOrder);
        } else if (row.getDisplayOrder() <= 0) {
            row.setDisplayOrder(nextOrder(curriculum.getId()));
        }
        curriculumSubjectRepository.save(row);
    }

    private int nextOrder(UUID curriculumId) {
        return curriculumSubjectRepository
                .findByCurriculumIdOrderByDisplayOrderAsc(curriculumId)
                .stream()
                .mapToInt(CurriculumSubject::getDisplayOrder)
                .max()
                .orElse(0) + 1;
    }

    /** Returns the level's curriculum, creating it on the first subject added. */
    private Curriculum openCurriculum(Level level, AcademicYear year) {
        return curriculumRepository
                .findByAcademicYearIdAndLevelId(year.getId(), level.getId())
                .orElseGet(() -> {
                    Curriculum created = new Curriculum();
                    created.setAcademicYear(year);
                    created.setCycle(level.getCycle());
                    created.setLevel(level);
                    created.setCode(level.getCode() + "-" + year.getCode());
                    created.setLabel("Programme " + level.getName() + " — " + year.getCode());
                    created.setStatus(CommonStatus.ACTIVE);
                    return curriculumRepository.save(created);
                });
    }

    private LevelCurriculumResponse describe(Level level, Curriculum curriculum,
                                             List<CurriculumSubject> rows) {
        LevelCurriculumResponse response = new LevelCurriculumResponse();
        response.setLevelId(level.getId());
        response.setLevelName(level.getName());
        response.setLevelCode(level.getCode());
        response.setCycleId(level.getCycle().getId());
        response.setCycleName(level.getCycle().getName());
        response.setSequence(level.getSequence());
        response.setCurriculumId(curriculum == null ? null : curriculum.getId());

        BigDecimal coefficients = BigDecimal.ZERO;
        BigDecimal hours = BigDecimal.ZERO;
        boolean graded = false;
        List<CurriculumSubjectResponse> subjects = new ArrayList<>(rows.size());

        for (CurriculumSubject row : rows) {
            Subject subject = row.getSubject();
            CurriculumSubjectResponse item = new CurriculumSubjectResponse();
            item.setId(row.getId());
            item.setSubjectId(subject.getId());
            item.setSubjectCode(subject.getCode());
            item.setSubjectName(subject.getName());
            item.setSubjectShortName(subject.getShortName());
            item.setSubjectColor(subject.getColorHex());
            item.setGraded(subject.isGraded());
            item.setCoefficient(row.getCoefficient());
            item.setWeeklyHours(row.getWeeklyHours());
            item.setMandatory(row.isMandatory());
            item.setPassingMark(row.getPassingMark());
            item.setDisplayOrder(row.getDisplayOrder());
            item.setLocked(assessmentRepository
                    .existsForSubjectAndLevel(subject.getId(), level.getId()));
            subjects.add(item);

            // A non-graded subject sits in the timetable but never in an average,
            // so it must not inflate the total coefficient shown to the user.
            if (subject.isGraded()) {
                coefficients = coefficients.add(row.getCoefficient());
                graded = true;
            }
            if (row.getWeeklyHours() != null) {
                hours = hours.add(row.getWeeklyHours());
            }
        }

        response.setSubjects(subjects);
        response.setSubjectCount(subjects.size());
        response.setTotalCoefficient(coefficients);
        response.setTotalWeeklyHours(hours);
        response.setReady(graded);
        return response;
    }

    private Subject requireSubject(UUID subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SUBJECT_NOT_FOUND));
        if (subject.getStatus() != CommonStatus.ACTIVE) {
            throw new BusinessException(ErrorCode.SUBJECT_NOT_FOUND,
                    "La matière « " + subject.getName() + " » est archivée.");
        }
        return subject;
    }

    private Level requireLevel(UUID levelId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new BusinessException(ErrorCode.LEVEL_NOT_FOUND));
        if (!level.getCycle().getSchool().getId().equals(requireSchool())) {
            throw new BusinessException(ErrorCode.LEVEL_NOT_FOUND);
        }
        return level;
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchool(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active : ouvrez-en une avant de définir "
                                + "le programme."));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
