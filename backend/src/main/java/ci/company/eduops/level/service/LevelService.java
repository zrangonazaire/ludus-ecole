package ci.company.eduops.level.service;

import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.repository.CurriculumRepository;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.cycle.repository.CycleRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.dto.request.LevelUpsertRequest;
import ci.company.eduops.level.dto.response.LevelResponse;
import ci.company.eduops.level.repository.LevelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * The school's grade levels (6e, 3e, Terminale), ordered inside their cycle.
 *
 * <p>A level is never deleted: classrooms, curricula, fee schedules and
 * admissions all point at it with {@code ON DELETE RESTRICT}. Archiving hides
 * it from the pickers while keeping those references readable — but only when
 * nothing active still depends on it.</p>
 */
@Service
public class LevelService {

    private static final Logger log = LoggerFactory.getLogger(LevelService.class);

    private final LevelRepository levelRepository;
    private final CycleRepository cycleRepository;
    private final ClassroomRepository classroomRepository;
    private final CurriculumRepository curriculumRepository;
    private final AdmissionApplicationRepository admissionRepository;
    private final AuditService auditService;

    public LevelService(LevelRepository levelRepository,
                        CycleRepository cycleRepository,
                        ClassroomRepository classroomRepository,
                        CurriculumRepository curriculumRepository,
                        AdmissionApplicationRepository admissionRepository,
                        AuditService auditService) {
        this.levelRepository = levelRepository;
        this.cycleRepository = cycleRepository;
        this.classroomRepository = classroomRepository;
        this.curriculumRepository = curriculumRepository;
        this.admissionRepository = admissionRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ read

    @Transactional(readOnly = true)
    public List<LevelResponse> list(boolean includeArchived) {
        UUID schoolId = requireSchool();
        List<Level> levels = includeArchived
                ? levelRepository.findAll().stream()
                        .filter(level -> schoolId.equals(level.getCycle().getSchool().getId()))
                        .sorted(LevelService::orderLevels)
                        .toList()
                : levelRepository.findBySchool(schoolId, CommonStatus.ACTIVE);

        List<LevelResponse> result = new ArrayList<>(levels.size());
        for (Level level : levels) {
            result.add(toResponse(level));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public LevelResponse getById(UUID id) {
        return toResponse(require(id));
    }

    // ----------------------------------------------------------------- write

    @Transactional
    public LevelResponse create(LevelUpsertRequest request) {
        UUID schoolId = requireSchool();
        Cycle cycle = requireCycle(request.getCycleId(), schoolId);
        String code = normaliseCode(request.getCode());

        if (levelRepository.existsByCycleIdAndCode(cycle.getId(), code)) {
            throw new BusinessException(ErrorCode.LEVEL_CODE_ALREADY_USED)
                    .detail("code", code);
        }

        Level level = new Level();
        level.setCycle(cycle);
        level.setCode(code);
        apply(level, request, schoolId);
        level.setStatus(CommonStatus.ACTIVE);

        Level saved = levelRepository.save(level);
        auditService.logCreate("Level", saved.getId(), saved.getName(), snapshot(saved));
        log.info("Niveau {} ({}) créé dans le cycle {}", saved.getName(), saved.getCode(),
                cycle.getName());
        return toResponse(saved);
    }

    @Transactional
    public LevelResponse update(UUID id, LevelUpsertRequest request) {
        Level level = require(id);

        if (request.getCycleId() != null
                && !request.getCycleId().equals(level.getCycle().getId())) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Un niveau ne change pas de cycle : créez-le dans le bon cycle.");
        }

        String code = normaliseCode(request.getCode());
        if (!code.equals(level.getCode())
                && levelRepository.existsByCycleIdAndCode(level.getCycle().getId(), code)) {
            throw new BusinessException(ErrorCode.LEVEL_CODE_ALREADY_USED)
                    .detail("code", code);
        }

        Map<String, Object> before = snapshot(level);

        level.setCode(code);
        apply(level, request, requireSchool());

        Level saved = levelRepository.save(level);
        auditService.logUpdate("Level", saved.getId(), saved.getName(), before, snapshot(saved));
        return toResponse(saved);
    }

    /**
     * Archives a level.
     *
     * <p>Refused while an active class, a programme, a pending application or
     * another level's promotion path still points at it: archiving would hide
     * the level from the pickers while live screens keep referencing it.</p>
     */
    @Transactional
    public LevelResponse archive(UUID id) {
        Level level = require(id);
        String blocker = archiveBlocker(id);
        if (blocker != null) {
            throw new BusinessException(ErrorCode.LEVEL_IN_USE, blocker)
                    .detail("level", level.getName());
        }
        level.setStatus(CommonStatus.ARCHIVED);
        Level saved = levelRepository.save(level);
        auditService.logCancel("Level", saved.getId(), saved.getName(), null);
        return toResponse(saved);
    }

    @Transactional
    public LevelResponse restore(UUID id) {
        Level level = require(id);
        level.setStatus(CommonStatus.ACTIVE);
        Level saved = levelRepository.save(level);
        auditService.logValidate("Level", saved.getId(), saved.getName(), null);
        return toResponse(saved);
    }

    // ------------------------------------------------------------- internals

    // ------------------------------------------------------------- internals

    private void apply(Level level, LevelUpsertRequest request, UUID schoolId) {
        level.setName(request.getName().trim());
        level.setShortName(blankToNull(request.getShortName()));
        level.setSequence(request.getSequence());
        level.setTerminal(request.isTerminal());
        level.setNextLevel(resolveNextLevel(level.getId(), request.getNextLevelId(),
                request.isTerminal(), schoolId));
    }

    /**
     * Resolves the promotion target, or {@code null} for a terminal level.
     * Same school only, and no loop: following the chain from the target
     * must never walk back onto the level being saved.
     */
    private Level resolveNextLevel(UUID selfId, UUID nextLevelId, boolean terminal,
                                   UUID schoolId) {
        if (terminal || nextLevelId == null) {
            return null;
        }
        Level next = levelRepository.findById(nextLevelId)
                .filter(candidate -> schoolId.equals(candidate.getCycle().getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.LEVEL_INVALID_NEXT_LEVEL,
                        "Le niveau de destination n'appartient pas à l'établissement."));
        Level cursor = next;
        while (cursor != null) {
            if (selfId != null && cursor.getId() != null && cursor.getId().equals(selfId)) {
                throw new BusinessException(ErrorCode.LEVEL_INVALID_NEXT_LEVEL,
                        "Ce niveau de destination créerait une boucle dans le parcours.");
            }
            cursor = cursor.getNextLevel();
        }
        return next;
    }

    /** The first reason this level cannot be archived, or {@code null}. */
    private String archiveBlocker(UUID id) {
        long classes = classroomRepository.countByLevelIdAndStatus(id, ClassroomStatus.ACTIVE);
        if (classes > 0) {
            return "Des classes actives sont encore rattachées à ce niveau.";
        }
        if (curriculumRepository.existsByLevelId(id)) {
            return "Un programme a déjà été ouvert pour ce niveau.";
        }
        if (admissionRepository.existsByRequestedLevelId(id)) {
            return "Des candidatures visent encore ce niveau.";
        }
        if (levelRepository.countByNextLevelId(id) > 0) {
            return "Un autre niveau désigne celui-ci comme destination de passage.";
        }
        return null;
    }

    private boolean archivable(Level level) {
        return level.getStatus() == CommonStatus.ACTIVE
                && archiveBlocker(level.getId()) == null;
    }

    private Cycle requireCycle(UUID cycleId, UUID schoolId) {
        return cycleRepository.findById(cycleId)
                .filter(cycle -> schoolId.equals(cycle.getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.CYCLE_NOT_FOUND));
    }

    private Level require(UUID id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.LEVEL_NOT_FOUND));
        // Belt and braces: RLS already scopes the query.
        if (!level.getCycle().getSchool().getId().equals(requireSchool())) {
            throw new BusinessException(ErrorCode.LEVEL_NOT_FOUND);
        }
        return level;
    }

    private LevelResponse toResponse(Level level) {
        LevelResponse response = new LevelResponse();
        response.setId(level.getId());
        response.setCycleId(level.getCycle().getId());
        response.setCycleName(level.getCycle().getName());
        response.setCode(level.getCode());
        response.setName(level.getName());
        response.setShortName(level.getShortName());
        response.setSequence(level.getSequence());
        Level next = level.getNextLevel();
        response.setNextLevelId(next == null ? null : next.getId());
        response.setNextLevelName(next == null ? null : next.getName());
        response.setTerminal(level.isTerminal());
        response.setStatus(level.getStatus().name());
        response.setClassroomCount((int) classroomRepository
                .countByLevelIdAndStatus(level.getId(), ClassroomStatus.ACTIVE));
        response.setArchivable(archivable(level));
        return response;
    }

    private static Map<String, Object> snapshot(Level level) {
        Map<String, Object> snapshot = new LinkedHashMap<>();
        snapshot.put("code", level.getCode());
        snapshot.put("name", level.getName());
        snapshot.put("sequence", level.getSequence());
        snapshot.put("terminal", level.isTerminal());
        Level next = level.getNextLevel();
        snapshot.put("nextLevel", next == null ? null : next.getName());
        return snapshot;
    }

    private static int orderLevels(Level a, Level b) {
        int byCycle = Integer.compare(a.getCycle().getSequence(), b.getCycle().getSequence());
        return byCycle != 0 ? byCycle : Integer.compare(a.getSequence(), b.getSequence());
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
