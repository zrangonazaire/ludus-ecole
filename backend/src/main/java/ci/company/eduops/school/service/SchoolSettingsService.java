package ci.company.eduops.school.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
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

    /**
     * Apparence et région telles qu'enregistrées pour l'établissement.
     *
     * <p>Couleur et taille de police vivent dans {@code settings.appearance} :
     * des réglages de présentation qui n'ont pas de colonne dédiée, mais qui
     * n'ont plus à rester dans le navigateur d'un seul poste. Devise, langue
     * et fuseau sont les colonnes officielles — les changer ici change les
     * documents, pas seulement l'affichage.</p>
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

    /**
     * Copie des réglages d'apparence — jamais le map vivant de l'entité.
     *
     * <p>Une colonne {@code jsonb} n'est réécrite que si la référence du champ
     * change : modifier en place le map de l'entité est un changement que le
     * contrôle de saleté de Hibernate ne voit pas. On travaille donc sur une
     * copie, et on la repose dans l'entité seulement s'il y a quelque chose à
     * enregistrer.</p>
     */
    @SuppressWarnings("unchecked")
    private Map<String, Object> appearanceValues(Map<String, Object> settings) {
        Map<String, Object> out = new LinkedHashMap<>();
        Object existing = settings.get("appearance");
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
