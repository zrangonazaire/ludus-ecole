package ci.company.eduops.report.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.report.domain.ImportBatch;
import ci.company.eduops.report.domain.ImportBatchStatus;
import ci.company.eduops.report.dto.ImportBatchResponse;
import ci.company.eduops.report.dto.ImportRowResponse;
import ci.company.eduops.report.repository.ImportBatchRepository;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.repository.AppUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Reads back what has been imported into this school.
 *
 * <p>The point of this service is accountability, not statistics. When two
 * hundred pupils appear on a Tuesday, someone has to be able to answer « who
 * loaded that file, when, and what did it refuse ». Before the batches were
 * persisted there was no answer at all.</p>
 */
@Service
public class ImportHistoryService {

    private final ImportBatchRepository batchRepository;
    private final AppUserRepository userRepository;

    public ImportHistoryService(ImportBatchRepository batchRepository,
                                AppUserRepository userRepository) {
        this.batchRepository = batchRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<ImportBatchResponse> history() {
        UUID schoolId = requireSchool();
        List<ImportBatch> batches =
                batchRepository.findBySchoolIdOrderByUploadedAtDesc(schoolId);

        // Les noms sont resolus en une fois : une requete par ligne ferait
        // vingt allers-retours pour afficher un tableau de vingt lignes.
        Map<UUID, String> names = namesOf(batches);
        List<ImportBatchResponse> history = new ArrayList<>();
        for (ImportBatch batch : batches) {
            history.add(toResponse(batch, names, false));
        }
        return history;
    }

    /** Un import précis, avec le détail des lignes refusées. */
    @Transactional(readOnly = true)
    public ImportBatchResponse detail(UUID batchId) {
        UUID schoolId = requireSchool();
        ImportBatch batch = batchRepository.findByIdAndSchoolId(batchId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.IMPORT_BATCH_NOT_FOUND,
                        "Cet import est introuvable."));
        return toResponse(batch, namesOf(List.of(batch)), true);
    }

    private Map<UUID, String> namesOf(List<ImportBatch> batches) {
        List<UUID> ids = new ArrayList<>();
        for (ImportBatch batch : batches) {
            if (batch.getUploadedBy() != null) {
                ids.add(batch.getUploadedBy());
            }
            if (batch.getConfirmedBy() != null) {
                ids.add(batch.getConfirmedBy());
            }
        }
        Map<UUID, String> names = new HashMap<>();
        if (ids.isEmpty()) {
            return names;
        }
        for (AppUser user : userRepository.findAllById(ids)) {
            names.put(user.getId(), user.fullName());
        }
        return names;
    }

    private ImportBatchResponse toResponse(ImportBatch batch, Map<UUID, String> names,
                                           boolean withRefused) {
        ImportBatchResponse response = new ImportBatchResponse();
        response.setId(batch.getId());
        response.setImportType(batch.getImportType());
        response.setImportTypeLabel(typeLabel(batch.getImportType()));
        response.setFileName(batch.getFileName());
        response.setStatus(batch.getStatus().name());
        response.setStatusLabel(statusLabel(batch.getStatus()));
        response.setTotalRows(batch.getTotalRows());
        response.setValidRows(batch.getValidRows());
        response.setInvalidRows(batch.getInvalidRows());
        response.setDuplicateRows(batch.getDuplicateRows());
        response.setImportedRows(batch.getImportedRows());
        response.setUploadedByName(nameOf(batch.getUploadedBy(), names));
        response.setUploadedAt(batch.getUploadedAt());
        response.setConfirmedByName(nameOf(batch.getConfirmedBy(), names));
        response.setConfirmedAt(batch.getConfirmedAt());
        if (withRefused) {
            response.setRefusedRows(refusedRows(batch));
        }
        return response;
    }

    /**
     * Relit les lignes refusées consignées à la confirmation.
     *
     * <p>Le JSONB vient de la base, mais il a été écrit par nous : une forme
     * inattendue signale un bogue, pas une attaque. On rend une liste vide
     * plutôt que de faire échouer l'écran d'historique pour autant.</p>
     */
    private List<ImportRowResponse> refusedRows(ImportBatch batch) {
        Map<String, Object> errors = batch.getErrors();
        Object stored = errors == null ? null : errors.get("refused");
        if (!(stored instanceof List<?> list)) {
            return List.of();
        }
        List<ImportRowResponse> rows = new ArrayList<>();
        for (Object item : list) {
            if (!(item instanceof Map<?, ?> map)) {
                continue;
            }
            ImportRowResponse row = new ImportRowResponse();
            if (map.get("rowNumber") instanceof Number number) {
                row.setRowNumber(number.intValue());
            }
            if (map.get("errors") instanceof List<?> messages) {
                for (Object message : messages) {
                    row.addError(String.valueOf(message));
                }
            }
            rows.add(row);
        }
        return rows;
    }

    private String nameOf(UUID userId, Map<UUID, String> names) {
        if (userId == null) {
            return null;
        }
        // Un compte supprime ne doit pas effacer la trace de son import.
        return names.getOrDefault(userId, "Compte supprimé");
    }

    private String typeLabel(String importType) {
        return switch (importType == null ? "" : importType) {
            case "STUDENT" -> "Élèves";
            case "GUARDIAN" -> "Responsables légaux";
            case "TEACHER" -> "Enseignants";
            case "GRADE" -> "Notes";
            default -> importType;
        };
    }

    private String statusLabel(ImportBatchStatus status) {
        return switch (status) {
            case UPLOADED, PARSED, VALIDATED -> "En cours de lecture";
            case PREVIEWED -> "Aperçu non confirmé";
            case CONFIRMED -> "Confirmé";
            case IMPORTED -> "Importé";
            case REJECTED -> "Refusé";
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
