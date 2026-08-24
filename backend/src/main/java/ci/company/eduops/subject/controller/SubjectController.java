package ci.company.eduops.subject.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.subject.dto.request.SubjectUpsertRequest;
import ci.company.eduops.subject.dto.response.SubjectResponse;
import ci.company.eduops.subject.service.SubjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/subjects")
@Tag(name = "Subjects", description = "Catalogue des matières de l'établissement")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.SUBJECT_VIEW + "')")
    @Operation(summary = "Lister les matières",
            description = "Chaque matière indique combien de niveaux la portent au programme.")
    public ResponseEntity<List<SubjectResponse>> list(
            @RequestParam(defaultValue = "false") boolean includeArchived) {
        return ResponseEntity.ok(subjectService.list(includeArchived));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.SUBJECT_VIEW + "')")
    @Operation(summary = "Détail d'une matière")
    public ResponseEntity<SubjectResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(subjectService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.SUBJECT_MANAGE + "')")
    @Operation(summary = "Créer une matière",
            description = "Le code est normalisé en majuscules sans accent : il sert "
                    + "dans les exports et les noms de fichiers.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Matière créée"),
            @ApiResponse(responseCode = "409", description = "SUBJECT_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<SubjectResponse> create(
            @Valid @RequestBody SubjectUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subjectService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.SUBJECT_MANAGE + "')")
    @Operation(summary = "Modifier une matière",
            description = "Renommer une matière la renomme partout : le nom n'est stocké "
                    + "qu'une fois pour tout l'établissement.")
    public ResponseEntity<SubjectResponse> update(
            @PathVariable UUID id, @Valid @RequestBody SubjectUpsertRequest request) {
        return ResponseEntity.ok(subjectService.update(id, request));
    }

    @PostMapping("/{id}/archive")
    @PreAuthorize("hasAuthority('" + Permissions.SUBJECT_MANAGE + "')")
    @Operation(summary = "Archiver une matière",
            description = "La matière disparaît des listes de choix, mais les bulletins "
                    + "et les évaluations qui la référencent restent lisibles. "
                    + "Refusé tant qu'un niveau la porte au programme.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Matière archivée"),
            @ApiResponse(responseCode = "409", description = "SUBJECT_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<SubjectResponse> archive(@PathVariable UUID id) {
        return ResponseEntity.ok(subjectService.archive(id));
    }

    @PostMapping("/{id}/restore")
    @PreAuthorize("hasAuthority('" + Permissions.SUBJECT_MANAGE + "')")
    @Operation(summary = "Réactiver une matière archivée")
    public ResponseEntity<SubjectResponse> restore(@PathVariable UUID id) {
        return ResponseEntity.ok(subjectService.restore(id));
    }
}
