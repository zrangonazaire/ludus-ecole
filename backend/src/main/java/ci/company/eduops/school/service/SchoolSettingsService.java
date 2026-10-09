package ci.company.eduops.school.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.dto.SequenceStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.dto.request.AppearanceUpdateRequest;
import ci.company.eduops.school.dto.request.SchoolSettingsUpdateRequest;
import ci.company.eduops.school.dto.response.AppearanceResponse;
import ci.company.eduops.school.dto.response.SchoolSettingsResponse;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.Permissions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Consumer;

/**
 * Les paramètres de l'établissement : lecture et édition.
 *
 * <p>Presque tout ici est modifiable par une personne qui détient
 * {@code SCHOOL_MANAGE} — sauf ce qui ne doit jamais l'être au gré d'un
 * formulaire. Le code identifie l'école dans les séquences de numérotation et
 * sur les documents officiels ; le statut décide de ce que le système accepte
 * encore. Les deux sont montrés, jamais proposés à l'édition.</p>
 *
 * <p>Chaque champ effectivement changé est journalisé avec son avant et son
 * après : le classement des bulletins ou l'échelle de notation influencent
 * des documents déjà imprimés, et on doit pouvoir demander qui a changé quoi,
 * et quand.</p>
 */
@Service
public class SchoolSettingsService {

    /** Bleu de la charte, utilisé tant qu'aucune couleur n'a été choisie. */
    private static final String DEFAULT_BRAND = "#1f5fd6";

    private static final String DEFAULT_FONT_SIZE = "normal";

    private final SchoolRepository schoolRepository;
    private final CurrentUser currentUser;
    private final AuditService auditService;
    private final NumberSequenceService numberSequenceService;

    public SchoolSettingsService(SchoolRepository schoolRepository,
                                 CurrentUser currentUser,
                                 AuditService auditService,
                                 NumberSequenceService numberSequenceService) {
        this.schoolRepository = schoolRepository;
        this.currentUser = currentUser;
        this.auditService = auditService;
        this.numberSequenceService = numberSequenceService;
    }

    @Transactional(readOnly = true)
    public SchoolSettingsResponse current() {
        currentUser.requirePermission(Permissions.SCHOOL_VIEW);
        return toResponse(requireSchool());
    }

    @Transactional
    public SchoolSettingsResponse update(SchoolSettingsUpdateRequest request) {
        currentUser.requirePermission(Permissions.SCHOOL_MANAGE);
        School school = requireSchool();

        // Validation des formats de numérotation
        if (request.getStudentNumberPattern() != null) {
            numberSequenceService.validatePattern(request.getStudentNumberPattern());
        }
        if (request.getTeacherNumberPattern() != null && !request.getTeacherNumberPattern().isBlank()) {
            numberSequenceService.validatePattern(request.getTeacherNumberPattern());
        }
        if (request.getStaffNumberPattern() != null && !request.getStaffNumberPattern().isBlank()) {
            numberSequenceService.validatePattern(request.getStaffNumberPattern());
        }

        Map<String, Object> before = new LinkedHashMap<>();
        Map<String, Object> after = new LinkedHashMap<>();

        text(school, request, before, after);

        // Gestion des réglages de numérotation et séquence
        Map<String, Object> settings = new LinkedHashMap<>(
                school.getSettings() == null ? Map.of() : school.getSettings());
        Map<String, Object> numbering = numberingValues(settings);

        String oldPolicy = numbering.get("studentResetPolicy") != null
                ? String.valueOf(numbering.get("studentResetPolicy")) : NumberSequenceService.POLICY_ANNUAL;
        String newPolicy = request.getStudentSequenceResetPolicy() != null && !request.getStudentSequenceResetPolicy().isBlank()
                ? request.getStudentSequenceResetPolicy().trim().toUpperCase() : oldPolicy;

        if (!Objects.equals(oldPolicy, newPolicy)) {
            before.put("studentSequenceResetPolicy", oldPolicy);
            after.put("studentSequenceResetPolicy", newPolicy);
            numbering.put("studentResetPolicy", newPolicy);
        }

        if (request.getStudentSequenceStartNumber() != null) {
            Object oldStart = numbering.get("studentStartNumber");
            if (!Objects.equals(oldStart, request.getStudentSequenceStartNumber())) {
                before.put("studentSequenceStartNumber", oldStart);
                after.put("studentSequenceStartNumber", request.getStudentSequenceStartNumber());
                numbering.put("studentStartNumber", request.getStudentSequenceStartNumber());
            }
        }

        if (request.getTeacherNumberPattern() != null && !request.getTeacherNumberPattern().isBlank()) {
            Object oldTeacher = numbering.get("teacherNumberPattern");
            String newTeacher = request.getTeacherNumberPattern().trim();
            if (!Objects.equals(oldTeacher, newTeacher)) {
                before.put("teacherNumberPattern", oldTeacher);
                after.put("teacherNumberPattern", newTeacher);
                numbering.put("teacherNumberPattern", newTeacher);
            }
        }

        if (request.getStaffNumberPattern() != null && !request.getStaffNumberPattern().isBlank()) {
            Object oldStaff = numbering.get("staffNumberPattern");
            String newStaff = request.getStaffNumberPattern().trim();
            if (!Objects.equals(oldStaff, newStaff)) {
                before.put("staffNumberPattern", oldStaff);
                after.put("staffNumberPattern", newStaff);
                numbering.put("staffNumberPattern", newStaff);
            }
        }

        // Si le prochain numéro de séquence est explicitement configuré par l'utilisateur
        if (request.getStudentSequenceNextNumber() != null) {
            numberSequenceService.setNextNumber(school.getId(), "STUDENT", newPolicy,
                    request.getStudentSequenceNextNumber());
            after.put("studentSequenceNextNumber", request.getStudentSequenceNextNumber());
        }

        settings.put("numbering", numbering);
        school.setSettings(settings);

        School saved = schoolRepository.save(school);

        if (!after.isEmpty()) {
            auditService.logUpdate("School", saved.getId(), saved.getName(), before, after);
        }
        return toResponse(saved);
    }

    /**
     * Apparence et région telles qu'enregistrées pour l'établissement.
     */
    @Transactional(readOnly = true)
    public AppearanceResponse appearance() {
        currentUser.requirePermission(Permissions.SCHOOL_VIEW);
        return toAppearance(requireSchool());
    }

    @Transactional
    public AppearanceResponse updateAppearance(AppearanceUpdateRequest request) {
        currentUser.requirePermission(Permissions.SCHOOL_MANAGE);
        School school = requireSchool();

        Map<String, Object> before = new LinkedHashMap<>();
        Map<String, Object> after = new LinkedHashMap<>();

        Map<String, Object> settings = new LinkedHashMap<>(
                school.getSettings() == null ? Map.of() : school.getSettings());
        Map<String, Object> appearance = appearanceValues(settings);
        change(school, request.getBrand(), textOf(appearance.get("brand")),
                "appearance.brand", before, after,
                value -> appearance.put("brand", value));
        change(school, request.getFontSize(), textOf(appearance.get("fontSize")),
                "appearance.fontSize", before, after,
                value -> appearance.put("fontSize", value));
        change(school, request.getCurrency(), school.getCurrency(), "currency",
                before, after, value -> school.setCurrency(value));
        change(school, request.getLocale(), school.getLocale(), "locale",
                before, after, value -> school.setLocale(value));
        change(school, request.getTimezone(), school.getTimezone(), "timezone",
                before, after, value -> school.setTimezone(value));

        if (after.isEmpty()) {
            return toAppearance(school);
        }
        settings.put("appearance", appearance);
        school.setSettings(settings);
        School saved = schoolRepository.save(school);
        auditService.logUpdate("School", saved.getId(), saved.getName(), before, after);
        return toAppearance(saved);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> previewSequence(String pattern, Long nextNumber, String resetPolicy) {
        currentUser.requirePermission(Permissions.SCHOOL_VIEW);
        School school = requireSchool();
        String effectivePattern = pattern != null && !pattern.isBlank()
                ? pattern.trim()
                : school.getStudentNumberPattern();
        numberSequenceService.validatePattern(effectivePattern);

        Map<String, Object> settings = school.getSettings() == null ? Map.of() : school.getSettings();
        Map<String, Object> numbering = numberingValues(settings);
        String policy = resetPolicy != null && !resetPolicy.isBlank()
                ? resetPolicy.trim().toUpperCase()
                : (numbering.get("studentResetPolicy") != null ? String.valueOf(numbering.get("studentResetPolicy")) : NumberSequenceService.POLICY_ANNUAL);

        long startNumber = 1L;
        if (numbering.get("studentStartNumber") != null) {
            try {
                startNumber = Long.parseLong(String.valueOf(numbering.get("studentStartNumber")));
            } catch (NumberFormatException ignored) {}
        }

        long next = nextNumber != null && nextNumber > 0
                ? nextNumber
                : numberSequenceService.getSequenceStatus(school.getId(), "STUDENT", policy,
                        startNumber, effectivePattern, school.getCode()).nextValue();

        String currentYear = String.valueOf(LocalDate.now().getYear());
        String preview = numberSequenceService.format(effectivePattern, currentYear, school.getCode(), next);
        String nextPreview = numberSequenceService.format(effectivePattern, currentYear, school.getCode(), next + 1);

        return Map.of(
                "valid", true,
                "preview", preview,
                "nextPreview", nextPreview,
                "nextNumber", next,
                "pattern", effectivePattern
        );
    }

    @Transactional
    public SequenceStatus updateSequence(String scope, Long nextNumber, String resetPolicy) {
        currentUser.requirePermission(Permissions.SCHOOL_MANAGE);
        School school = requireSchool();
        String effectiveScope = scope != null ? scope.toUpperCase() : "STUDENT";
        Map<String, Object> settings = new LinkedHashMap<>(school.getSettings() == null ? Map.of() : school.getSettings());
        Map<String, Object> numbering = numberingValues(settings);

        String policy = resetPolicy != null && !resetPolicy.isBlank()
                ? resetPolicy.trim().toUpperCase()
                : (numbering.get("studentResetPolicy") != null ? String.valueOf(numbering.get("studentResetPolicy")) : NumberSequenceService.POLICY_ANNUAL);

        if (nextNumber != null) {
            numberSequenceService.setNextNumber(school.getId(), effectiveScope, policy, nextNumber);
            auditService.logUpdate("NumberSequence", school.getId(), effectiveScope,
                    Map.of("scope", effectiveScope),
                    Map.of("nextNumber", nextNumber, "resetPolicy", policy));
        }

        if ("STUDENT".equalsIgnoreCase(effectiveScope) && resetPolicy != null) {
            numbering.put("studentResetPolicy", policy);
            settings.put("numbering", numbering);
            school.setSettings(settings);
            schoolRepository.save(school);
        }

        long startNumber = 1L;
        if (numbering.get("studentStartNumber") != null) {
            try {
                startNumber = Long.parseLong(String.valueOf(numbering.get("studentStartNumber")));
            } catch (NumberFormatException ignored) {}
        }
        String pattern = "STUDENT".equalsIgnoreCase(effectiveScope)
                ? school.getStudentNumberPattern()
                : "{schoolCode}-{year}-{seq:6}";

        return numberSequenceService.getSequenceStatus(
                school.getId(), effectiveScope, policy, startNumber, pattern, school.getCode());
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> appearanceValues(Map<String, Object> settings) {
        Map<String, Object> out = new LinkedHashMap<>();
        Object existing = settings.get("appearance");
        if (existing instanceof Map<?, ?> map) {
            map.forEach((key, value) -> out.put(String.valueOf(key), value));
        }
        return out;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> numberingValues(Map<String, Object> settings) {
        Map<String, Object> out = new LinkedHashMap<>();
        Object existing = settings.get("numbering");
        if (existing instanceof Map<?, ?> map) {
            map.forEach((key, value) -> out.put(String.valueOf(key), value));
        }
        return out;
    }

    private String textOf(Object value) {
        return value == null ? null : String.valueOf(value);
    }

    private AppearanceResponse toAppearance(School school) {
        Map<String, Object> stored = appearanceValues(
                school.getSettings() == null ? Map.of() : school.getSettings());
        AppearanceResponse response = new AppearanceResponse();
        response.setBrand(textOf(stored.get("brand")) == null
                ? DEFAULT_BRAND : textOf(stored.get("brand")));
        response.setFontSize(textOf(stored.get("fontSize")) == null
                ? DEFAULT_FONT_SIZE : textOf(stored.get("fontSize")));
        response.setCurrency(school.getCurrency());
        response.setLocale(school.getLocale());
        response.setTimezone(school.getTimezone());
        return response;
    }

    private School requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));
    }

    private void text(School school, SchoolSettingsUpdateRequest request,
                      Map<String, Object> before, Map<String, Object> after) {
        change(school, request.getName(), school.getName(), "name",
                before, after, value -> school.setName(value));
        change(school, request.getLegalName(), school.getLegalName(), "legalName",
                before, after, value -> school.setLegalName(value));
        change(school, request.getMotto(), school.getMotto(), "motto",
                before, after, value -> school.setMotto(value));
        change(school, request.getRegistrationNumber(), school.getRegistrationNumber(),
                "registrationNumber", before, after,
                value -> school.setRegistrationNumber(value));
        change(school, request.getEmail(), school.getEmail(), "email",
                before, after, value -> school.setEmail(value));
        change(school, request.getPhone(), school.getPhone(), "phone",
                before, after, value -> school.setPhone(value));
        change(school, request.getWebsite(), school.getWebsite(), "website",
                before, after, value -> school.setWebsite(value));
        change(school, request.getAddressLine1(), school.getAddressLine1(), "addressLine1",
                before, after, value -> school.setAddressLine1(value));
        change(school, request.getAddressLine2(), school.getAddressLine2(), "addressLine2",
                before, after, value -> school.setAddressLine2(value));
        change(school, request.getCity(), school.getCity(), "city",
                before, after, value -> school.setCity(value));
        change(school, request.getCountry(), school.getCountry(), "country",
                before, after, value -> school.setCountry(value));
        change(school, request.getCurrency(), school.getCurrency(), "currency",
                before, after, value -> school.setCurrency(value));
        change(school, request.getLocale(), school.getLocale(), "locale",
                before, after, value -> school.setLocale(value));
        change(school, request.getTimezone(), school.getTimezone(), "timezone",
                before, after, value -> school.setTimezone(value));
        change(school,
                request.getGradingScaleMax() == null ? null
                        : request.getGradingScaleMax().toPlainString(),
                school.getGradingScaleMax() == null ? null
                        : school.getGradingScaleMax().toPlainString(),
                "gradingScaleMax", before, after,
                value -> school.setGradingScaleMax(request.getGradingScaleMax()));
        if (request.isRankingEnabled() != school.isRankingEnabled()) {
            before.put("rankingEnabled", String.valueOf(school.isRankingEnabled()));
            after.put("rankingEnabled", String.valueOf(request.isRankingEnabled()));
            school.setRankingEnabled(request.isRankingEnabled());
        }
        change(school, request.getStudentNumberPattern(), school.getStudentNumberPattern(),
                "studentNumberPattern", before, after,
                value -> school.setStudentNumberPattern(value));
        change(school, request.getReceiptNumberPattern(), school.getReceiptNumberPattern(),
                "receiptNumberPattern", before, after,
                value -> school.setReceiptNumberPattern(value));
        change(school, request.getInvoiceNumberPattern(), school.getInvoiceNumberPattern(),
                "invoiceNumberPattern", before, after,
                value -> school.setInvoiceNumberPattern(value));
    }

    private void change(School school, String incoming, String current, String field,
                        Map<String, Object> before, Map<String, Object> after,
                        Consumer<String> setter) {
        String normalised = incoming == null ? null : incoming.trim();
        String existing = current == null ? null : current.trim();
        if (Objects.equals(normalised, existing)) {
            return;
        }
        before.put(field, existing);
        after.put(field, normalised);
        setter.accept(normalised);
    }

    private SchoolSettingsResponse toResponse(School school) {
        SchoolSettingsResponse response = new SchoolSettingsResponse();
        response.setId(school.getId());
        response.setCode(school.getCode());
        response.setStatus(school.getStatus() == null ? null : school.getStatus().name());
        response.setName(school.getName());
        response.setLegalName(school.getLegalName());
        response.setMotto(school.getMotto());
        response.setRegistrationNumber(school.getRegistrationNumber());
        response.setEmail(school.getEmail());
        response.setPhone(school.getPhone());
        response.setWebsite(school.getWebsite());
        response.setAddressLine1(school.getAddressLine1());
        response.setAddressLine2(school.getAddressLine2());
        response.setCity(school.getCity());
        response.setCountry(school.getCountry());
        response.setCurrency(school.getCurrency());
        response.setLocale(school.getLocale());
        response.setTimezone(school.getTimezone());
        response.setGradingScaleMax(school.getGradingScaleMax());
        response.setRankingEnabled(school.isRankingEnabled());
        response.setStudentNumberPattern(school.getStudentNumberPattern());
        response.setReceiptNumberPattern(school.getReceiptNumberPattern());
        response.setInvoiceNumberPattern(school.getInvoiceNumberPattern());

        Map<String, Object> settings = school.getSettings() == null ? Map.of() : school.getSettings();
        Map<String, Object> numbering = numberingValues(settings);

        String resetPolicy = numbering.get("studentResetPolicy") != null
                ? String.valueOf(numbering.get("studentResetPolicy"))
                : NumberSequenceService.POLICY_ANNUAL;
        long startNumber = 1L;
        if (numbering.get("studentStartNumber") != null) {
            try {
                startNumber = Long.parseLong(String.valueOf(numbering.get("studentStartNumber")));
            } catch (NumberFormatException ignored) {}
        }
        String teacherPattern = numbering.get("teacherNumberPattern") != null
                ? String.valueOf(numbering.get("teacherNumberPattern"))
                : "ENS-{year}-{seq:4}";
        String staffPattern = numbering.get("staffNumberPattern") != null
                ? String.valueOf(numbering.get("staffNumberPattern"))
                : "STF-{year}-{seq:4}";

        SequenceStatus studentSeq = numberSequenceService.getSequenceStatus(
                school.getId(), "STUDENT", resetPolicy, startNumber,
                school.getStudentNumberPattern(), school.getCode());

        response.setStudentSequenceResetPolicy(studentSeq.resetPolicy());
        response.setStudentSequenceCurrentNumber(studentSeq.currentValue());
        response.setStudentSequenceNextNumber(studentSeq.nextValue());
        response.setStudentSequenceStartNumber(studentSeq.startNumber());
        response.setStudentSequencePreview(studentSeq.preview());
        response.setStudentSequenceUpdatedAt(studentSeq.updatedAt());
        response.setTeacherNumberPattern(teacherPattern);
        response.setStaffNumberPattern(staffPattern);

        return response;
    }
}
