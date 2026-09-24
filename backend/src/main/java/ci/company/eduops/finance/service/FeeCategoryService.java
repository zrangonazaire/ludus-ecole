package ci.company.eduops.finance.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.finance.domain.FeeCategory;
import ci.company.eduops.finance.dto.request.FeeCategoryUpsertRequest;
import ci.company.eduops.finance.dto.response.FeeCategoryResponse;
import ci.company.eduops.finance.repository.FeeCategoryRepository;
import ci.company.eduops.finance.repository.FeeTypeRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Les rubriques de frais de l'école : inscription, scolarité… et tout ce
 * qu'elle ajoute elle-même.
 *
 * <p>Écritures directes, sans circuit de validation : une rubrique est un
 * libellé de classement, elle ne change ni ce que les familles doivent ni
 * quand elles le doivent — enjeu que les circuits de V52 protègent sur les
 * types et les tarifs.</p>
 *
 * <p>Deux refus vivent ici : archiver une rubrique encore portée par des
 * types de frais actifs (les reçus et rapports perdraient leur libellé), et
 * renommer le code d'une telle rubrique (la clé étrangère
 * {@code fee_type.category} référençant (school_id, code), le changement
 * casserait la référence).</p>
 */
@Service
public class FeeCategoryService {

    /** Les huit rubriques d'origine, semées à chaque création d'école. */
    private static final String[][] DEFAULTS = {
            {"REGISTRATION", "Inscription"},
            {"TUITION", "Scolarité"},
            {"EXAM", "Examens"},
            {"ACTIVITY", "Activités"},
            {"UNIFORM", "Tenue"},
            {"TRANSPORT", "Transport"},
            {"CANTEEN", "Cantine"},
            {"OTHER", "Autre"}
    };

    private final FeeCategoryRepository feeCategoryRepository;
    private final FeeTypeRepository feeTypeRepository;
    private final SchoolRepository schoolRepository;
    private final AuditService auditService;

    public FeeCategoryService(FeeCategoryRepository feeCategoryRepository,
                              FeeTypeRepository feeTypeRepository,
                              SchoolRepository schoolRepository,
                              AuditService auditService) {
        this.feeCategoryRepository = feeCategoryRepository;
        this.feeTypeRepository = feeTypeRepository;
        this.schoolRepository = schoolRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public List<FeeCategoryResponse> list(boolean includeArchived) {
        UUID schoolId = requireSchool();
        Map<String, Long> usage = activeUsage(schoolId);

        List<FeeCategoryResponse> result = new ArrayList<>();
        for (FeeCategory category : feeCategoryRepository.findBySchoolId(schoolId)) {
            if (!includeArchived && category.getStatus() != CommonStatus.ACTIVE) {
                continue;
            }
            result.add(describe(category, usage.getOrDefault(category.getCode(), 0L)));
        }
        result.sort(Comparator.comparing(FeeCategoryResponse::getLabel,
                String.CASE_INSENSITIVE_ORDER));
        return result;
    }

    @Transactional
    public FeeCategoryResponse create(FeeCategoryUpsertRequest request) {
        UUID schoolId = requireSchool();
        String code = normaliseCode(request.getCode());

        if (feeCategoryRepository.existsBySchoolIdAndCode(schoolId, code)) {
            throw new BusinessException(ErrorCode.FEE_CATEGORY_CODE_ALREADY_USED)
                    .detail("code", code);
        }
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));

        FeeCategory category = new FeeCategory();
        category.setSchool(school);
        category.setCode(code);
        category.setLabel(request.getLabel().trim());
        category.setStatus(CommonStatus.ACTIVE);

        FeeCategory saved = feeCategoryRepository.save(category);
        auditService.logCreate("FeeCategory", saved.getId(), saved.getLabel(),
                Map.<String, Object>of("code", saved.getCode(), "label", saved.getLabel()));
        return describe(saved, 0);
    }

    @Transactional
    public FeeCategoryResponse update(UUID id, FeeCategoryUpsertRequest request) {
        FeeCategory category = require(id);
        String code = normaliseCode(request.getCode());

        if (!code.equals(category.getCode())) {
            if (feeTypeRepository.countBySchoolIdAndCategory(
                    requireSchool(), category.getCode()) > 0) {
                throw new BusinessException(ErrorCode.FEE_CATEGORY_IN_USE,
                        "Des types de frais utilisent encore cette catégorie : "
                                + "son code ne peut pas être modifié. Seul le libellé l'est.")
                        .detail("code", category.getCode());
            }
            if (feeCategoryRepository.existsBySchoolIdAndCode(requireSchool(), code)) {
                throw new BusinessException(ErrorCode.FEE_CATEGORY_CODE_ALREADY_USED)
                        .detail("code", code);
            }
        }

        Map<String, Object> before = Map.<String, Object>of(
                "code", category.getCode(),
                "label", category.getLabel());
        category.setCode(code);
        category.setLabel(request.getLabel().trim());

        FeeCategory saved = feeCategoryRepository.save(category);
        auditService.logUpdate("FeeCategory", saved.getId(), saved.getLabel(), before,
                Map.<String, Object>of("code", saved.getCode(), "label", saved.getLabel()));
        return describe(saved, feeTypeRepository.countBySchoolIdAndCategoryAndStatus(
                requireSchool(), saved.getCode(), CommonStatus.ACTIVE));
    }

    @Transactional
    public FeeCategoryResponse archive(UUID id) {
        FeeCategory category = require(id);
        long used = feeTypeRepository.countBySchoolIdAndCategoryAndStatus(
                requireSchool(), category.getCode(), CommonStatus.ACTIVE);
        if (used > 0) {
            throw new BusinessException(ErrorCode.FEE_CATEGORY_IN_USE,
                    "Des types de frais actifs utilisent encore cette catégorie. "
                            + "Changez leur catégorie avant de l'archiver.")
                    .detail("feeTypes", used);
        }
        category.setStatus(CommonStatus.ARCHIVED);
        FeeCategory saved = feeCategoryRepository.save(category);
        auditService.logCancel("FeeCategory", saved.getId(), saved.getLabel(), null);
        return describe(saved, 0);
    }

    @Transactional
    public FeeCategoryResponse restore(UUID id) {
        FeeCategory category = require(id);
        category.setStatus(CommonStatus.ACTIVE);
        FeeCategory saved = feeCategoryRepository.save(category);
        auditService.logValidate("FeeCategory", saved.getId(), saved.getLabel(),
                "Catégorie réactivée");
        return describe(saved, feeTypeRepository.countBySchoolIdAndCategoryAndStatus(
                requireSchool(), saved.getCode(), CommonStatus.ACTIVE));
    }

    /**
     * Semence des huit rubriques d'origine, idempotente.
     *
     * <p>Appelée à l'inscription (une école neuve) et avant l'onboarding :
     * la clé étrangère (school_id, category) exige que « REGISTRATION » et
     * « TUITION » existent avant que l'assistant crée ses types de frais.</p>
     */
    @Transactional
    public void seedDefaults(School school) {
        for (String[] row : DEFAULTS) {
            if (feeCategoryRepository.existsBySchoolIdAndCode(school.getId(), row[0])) {
                continue;
            }
            FeeCategory category = new FeeCategory();
            category.setSchool(school);
            category.setCode(row[0]);
            category.setLabel(row[1]);
            category.setStatus(CommonStatus.ACTIVE);
            feeCategoryRepository.save(category);
        }
    }

    // ------------------------------------------------------------- internals

    /** Utilisation par code, types actifs seulement, en une passe. */
    private Map<String, Long> activeUsage(UUID schoolId) {
        Map<String, Long> usage = new HashMap<>();
        for (Object[] row : feeTypeRepository.countByCategory(schoolId, CommonStatus.ACTIVE)) {
            usage.put((String) row[0], (Long) row[1]);
        }
        return usage;
    }

    private FeeCategoryResponse describe(FeeCategory category, long feeTypeCount) {
        FeeCategoryResponse response = new FeeCategoryResponse();
        response.setId(category.getId());
        response.setCode(category.getCode());
        response.setLabel(category.getLabel());
        response.setStatus(category.getStatus().name());
        response.setFeeTypeCount(feeTypeCount);
        response.setDeletable(feeTypeCount == 0
                && category.getStatus() == CommonStatus.ACTIVE);
        return response;
    }

    private FeeCategory require(UUID id) {
        return feeCategoryRepository.findById(id)
                .filter(c -> c.getSchool().getId().equals(requireSchool()))
                .orElseThrow(() -> new BusinessException(ErrorCode.FEE_CATEGORY_NOT_FOUND));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    /** Même règle que les codes de types de frais : ASCII, majuscules. */
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

