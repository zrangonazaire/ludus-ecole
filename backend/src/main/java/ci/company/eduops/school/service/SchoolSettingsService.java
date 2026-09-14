package ci.company.eduops.school.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.dto.request.SchoolSettingsUpdateRequest;
import ci.company.eduops.school.dto.response.SchoolSettingsResponse;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.Permissions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final SchoolRepository schoolRepository;
    private final CurrentUser currentUser;
    private final AuditService auditService;

    public SchoolSettingsService(SchoolRepository schoolRepository,
                                 CurrentUser currentUser,
                                 AuditService auditService) {
        this.schoolRepository = schoolRepository;
        this.currentUser = currentUser;
        this.auditService = auditService;
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

        Map<String, Object> before = new LinkedHashMap<>();
        Map<String, Object> after = new LinkedHashMap<>();

        text(school, request, before, after);

        School saved = schoolRepository.save(school);

        if (!after.isEmpty()) {
            auditService.logUpdate("School", saved.getId(), saved.getName(), before, after);
        }
        return toResponse(saved);
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

    /**
     * Applique chaque champ texte : comparé avant d'être écrit, journalisé
     * seulement s'il change. Comparer évite à la fois de réveiller le
     * verrouillage optimiste pour rien et d'écrire un audit plein de
     * « changements » identiques à l'ancienne valeur.
     */
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
        return response;
    }
}
