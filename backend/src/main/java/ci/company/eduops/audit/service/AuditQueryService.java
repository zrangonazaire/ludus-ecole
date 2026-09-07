package ci.company.eduops.audit.service;

import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.audit.domain.AuditLog;
import ci.company.eduops.audit.dto.AuditEntryResponse;
import ci.company.eduops.audit.repository.AuditLogRepository;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Reading the audit trail.
 *
 * <p>The trail records what changed <em>and</em> the values on both sides.
 * This service hands out the first and never the second: an entry says that
 * Aminata changed a pupil's phone number and address, not what they were.
 * Otherwise anyone holding {@code AUDIT_VIEW} could read, through the trail,
 * data they are not allowed to open directly — medical records above all.</p>
 */
@Service
public class AuditQueryService {

    /**
     * Plafond volontairement bas.
     *
     * <p>Le journal est la table qui grossit le plus vite d'un établissement.
     * Une page de mille lignes n'aide personne à lire et invite à aspirer le
     * journal par tranches.</p>
     */
    private static final int MAX_PAGE_SIZE = 100;

    private final AuditLogRepository repository;

    public AuditQueryService(AuditLogRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public PageResponse<AuditEntryResponse> search(String action, String entityType,
                                                   UUID entityId, UUID userId,
                                                   LocalDate from, LocalDate to,
                                                   int page, int size) {
        UUID schoolId = requireSchool();
        PageRequest pageable = PageRequest.of(Math.max(0, page),
                Math.min(Math.max(1, size), MAX_PAGE_SIZE));

        return PageResponse.from(repository.search(
                schoolId,
                normalizeType(entityType),
                entityId,
                userId,
                normalizeAction(action),
                // La borne basse commence au premier instant du jour, la haute
                // finit au dernier : demander « du 3 au 3 » doit rendre la
                // journee du 3, pas un intervalle vide.
                from == null ? null : from.atStartOfDay().atOffset(ZoneOffset.UTC),
                to == null ? null : to.atTime(23, 59, 59).atOffset(ZoneOffset.UTC),
                pageable), this::toResponse);
    }

    /** Les types d'objets présents dans le journal de cet établissement. */
    @Transactional(readOnly = true)
    public List<String> entityTypes() {
        return repository.entityTypes(requireSchool());
    }

    // ------------------------------------------------------------------

    private String normalizeAction(String action) {
        if (action == null || action.isBlank()) {
            return "";
        }
        try {
            return AuditAction.valueOf(action.trim().toUpperCase()).name();
        } catch (IllegalArgumentException exception) {
            // Une action inconnue ne doit pas lever le filtre et tout montrer :
            // elle ne correspond a rien, donc elle ne ramene rien.
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Action inconnue : " + action);
        }
    }

    private String normalizeType(String entityType) {
        return entityType == null || entityType.isBlank() ? "" : entityType.trim();
    }

    private AuditEntryResponse toResponse(AuditLog entry) {
        AuditEntryResponse response = new AuditEntryResponse();
        response.setId(entry.getId());
        response.setOccurredAt(entry.getOccurredAt());
        response.setAction(entry.getAction().name());
        response.setActionLabel(actionLabel(entry.getAction()));
        response.setEntityType(entry.getEntityType());
        response.setEntityTypeLabel(entityLabel(entry.getEntityType()));
        response.setEntityId(entry.getEntityId());
        response.setEntityLabel(entry.getEntityLabel());
        response.setUsername(entry.getUsername());
        response.setUserId(entry.getUserId());
        response.setReason(entry.getReason());
        response.setSuccess(entry.isSuccess());
        response.setErrorCode(entry.getErrorCode());
        response.setIpAddress(entry.getIpAddress());
        response.setCorrelationId(entry.getCorrelationId());

        // Les noms des champs touches, jamais leur contenu. On s'arrete ici :
        // entry.getOldValue() et entry.getNewValue() ne sont pas lus, donc ils
        // ne peuvent pas fuir par la reponse.
        String[] fields = entry.getChangedFields();
        List<String> changed = new ArrayList<>();
        if (fields != null) {
            for (String field : fields) {
                changed.add(fieldLabel(field));
            }
        }
        response.setChangedFields(changed);
        return response;
    }

    private String actionLabel(AuditAction action) {
        return switch (action) {
            case CREATE -> "Création";
            case UPDATE -> "Modification";
            case DELETE -> "Suppression";
            case READ_SENSITIVE -> "Consultation sensible";
            case VALIDATE -> "Validation";
            case PUBLISH -> "Publication";
            case CANCEL -> "Annulation";
            case LOGIN -> "Connexion";
            case LOGIN_FAILED -> "Échec de connexion";
            case LOGOUT -> "Déconnexion";
            case PERMISSION_CHANGE -> "Changement de droits";
            case EXPORT -> "Export";
            case IMPORT -> "Import";
        };
    }

    /** Le nom technique de l'entité, rendu lisible. */
    private String entityLabel(String entityType) {
        return switch (entityType == null ? "" : entityType) {
            case "Student" -> "Élève";
            case "Enrollment" -> "Inscription";
            case "Classroom" -> "Classe";
            case "Teacher" -> "Enseignant";
            case "Staff" -> "Personnel";
            case "Payment" -> "Paiement";
            case "Assessment" -> "Évaluation";
            case "Grade" -> "Note";
            case "ReportCard" -> "Bulletin";
            case "AppUser" -> "Compte";
            case "AcademicYear" -> "Année scolaire";
            case "FamilyRequest" -> "Demande de famille";
            case "ImportBatch" -> "Import de liste";
            case "StudentHealthRecord", "HealthCondition",
                 "InfirmaryVisit", "MedicalExamination" -> "Dossier de santé";
            default -> entityType;
        };
    }

    /** Le nom d'un champ modifié, rendu lisible. */
    private String fieldLabel(String field) {
        return switch (field == null ? "" : field) {
            case "status" -> "situation";
            case "jobTitle" -> "poste";
            case "department" -> "service";
            case "contractType" -> "contrat";
            case "phone" -> "téléphone";
            case "email" -> "e-mail";
            case "classroomId" -> "classe";
            case "amount" -> "montant";
            case "reason" -> "motif";
            case "assignedTo" -> "affectation";
            default -> field;
        };
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
