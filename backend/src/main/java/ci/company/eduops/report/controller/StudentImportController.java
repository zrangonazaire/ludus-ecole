package ci.company.eduops.report.controller;

import ci.company.eduops.report.dto.ImportPreviewResponse;
import ci.company.eduops.report.service.StudentImportService;
import ci.company.eduops.report.service.StudentImportTemplateService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Import d'élèves par fichier Excel.
 *
 * <p>Trois temps, volontairement séparés : on télécharge un modèle, on dépose
 * le fichier rempli pour le faire analyser, puis on confirme. Rien n'est écrit
 * avant la confirmation.</p>
 */
@RestController
@RequestMapping("/api/v1/imports/students")
@Tag(name = "Imports", description = "Import d'élèves depuis un fichier Excel")
public class StudentImportController {

    private static final String XLSX =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    private final StudentImportTemplateService templateService;
    private final StudentImportService importService;

    public StudentImportController(StudentImportTemplateService templateService,
                                   StudentImportService importService) {
        this.templateService = templateService;
        this.importService = importService;
    }

    @GetMapping("/template")
    @PreAuthorize("hasAuthority('" + Permissions.STUDENT_CREATE + "')")
    @Operation(summary = "Télécharger le modèle Excel",
            description = """
                    Le classeur est généré pour votre établissement : les classes
                    réelles de l'année active sont proposées en liste déroulante,
                    ce qui évite les fautes de frappe à la saisie.
                    """)
    public ResponseEntity<Resource> template() {
        byte[] content = templateService.build();
        String name = "modele-import-eleves-" + LocalDate.now() + ".xlsx";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + name + "\"")
                .contentType(MediaType.parseMediaType(XLSX))
                .contentLength(content.length)
                .body(new ByteArrayResource(content));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('" + Permissions.IMPORT_EXECUTE + "')")
    @Operation(summary = "Analyser un fichier, sans rien enregistrer",
            description = """
                    Valide chaque ligne, signale les doublons et les erreurs, et
                    renvoie l'aperçu complet. Aucune écriture en base à ce stade.
                    """)
    public ResponseEntity<ImportPreviewResponse> upload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(importService.analyse(file));
    }

    @PostMapping("/{batchId}/confirm")
    @PreAuthorize("hasAuthority('" + Permissions.IMPORT_EXECUTE + "')")
    @Operation(summary = "Confirmer l'import",
            description = """
                    Crée les élèves retenus et les inscrit. Chaque ligne passe par
                    les mêmes règles qu'une inscription manuelle : une classe pleine
                    bloque cette ligne-là, pas tout le fichier.
                    """)
    public ResponseEntity<ImportPreviewResponse> confirm(@PathVariable UUID batchId) {
        return ResponseEntity.ok(importService.confirm(batchId));
    }
}
