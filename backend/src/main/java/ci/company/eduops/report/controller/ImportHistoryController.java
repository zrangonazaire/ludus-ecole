package ci.company.eduops.report.controller;

import ci.company.eduops.report.dto.ImportBatchResponse;
import ci.company.eduops.report.service.ImportHistoryService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * L'historique des imports de l'établissement.
 *
 * <p>Sous {@code /batches} et non directement sous {@code /imports} : le
 * dépôt d'élèves occupe déjà {@code /imports/students}, et un chemin
 * {@code /imports/{id}} rendrait « students » ambigu avec un identifiant.</p>
 */
@RestController
@RequestMapping("/api/v1/imports/batches")
@Tag(name = "Imports", description = "Historique des listes importées")
public class ImportHistoryController {

    private final ImportHistoryService service;

    public ImportHistoryController(ImportHistoryService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Les imports de l'établissement, du plus récent au plus ancien")
    @PreAuthorize("hasAuthority('" + Permissions.IMPORT_EXECUTE + "')")
    public ResponseEntity<List<ImportBatchResponse>> history() {
        return ResponseEntity.ok(service.history());
    }

    @GetMapping("/{batchId}")
    @Operation(summary = "Un import, avec le détail des lignes refusées")
    @PreAuthorize("hasAuthority('" + Permissions.IMPORT_EXECUTE + "')")
    public ResponseEntity<ImportBatchResponse> detail(@PathVariable UUID batchId) {
        return ResponseEntity.ok(service.detail(batchId));
    }
}
