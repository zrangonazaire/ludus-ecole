package ci.company.eduops.level.controller;

<<<<<<< HEAD
import ci.company.eduops.common.exception.ApiError;
=======
>>>>>>> 13f4202 (envoi de maj)
import ci.company.eduops.level.dto.request.LevelUpsertRequest;
import ci.company.eduops.level.dto.response.LevelResponse;
import ci.company.eduops.level.service.LevelService;
import ci.company.eduops.security.service.Permissions;
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
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> 13f4202 (envoi de maj)

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/levels")
<<<<<<< HEAD
@Tag(name = "Levels", description = "Niveaux d'enseignement de l'établissement")
=======
@Tag(name = "Levels", description = "Gestion des niveaux scolaires (niveaux, classes)")
>>>>>>> 13f4202 (envoi de maj)
public class LevelController {

    private final LevelService levelService;

    public LevelController(LevelService levelService) {
        this.levelService = levelService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_VIEW + "')")
<<<<<<< HEAD
    @Operation(summary = "Lister les niveaux",
            description = "Regroupés par cycle dans l'ordre du parcours. "
                    + "Chaque niveau indique ses classes actives et s'il peut être archivé.")
    public ResponseEntity<List<LevelResponse>> list(
            @RequestParam(defaultValue = "false") boolean includeArchived) {
        return ResponseEntity.ok(levelService.list(includeArchived));
=======
    @Operation(summary = "Lister les niveaux", description = "Retourne tous les niveaux actifs de l'établissement")
    public ResponseEntity<List<LevelResponse>> list() {
        return ResponseEntity.ok(levelService.list());
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_VIEW + "')")
    @Operation(summary = "Lister tous les niveaux (avec archivés)", description = "Inclus les niveaux archivés")
    public ResponseEntity<List<LevelResponse>> listAll() {
        return ResponseEntity.ok(levelService.listAll());
>>>>>>> 13f4202 (envoi de maj)
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_VIEW + "')")
<<<<<<< HEAD
    @Operation(summary = "Détail d'un niveau")
=======
    @Operation(summary = "Détail d'un niveau", description = "Retourne les informations d'un niveau")
>>>>>>> 13f4202 (envoi de maj)
    public ResponseEntity<LevelResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(levelService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_MANAGE + "')")
    @Operation(summary = "Créer un niveau",
<<<<<<< HEAD
            description = "Le code est normalisé en majuscules sans accent : il sert "
                    + "dans les exports et les noms de fichiers.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Niveau créé"),
            @ApiResponse(responseCode = "409", description = "LEVEL_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
=======
            description = "Crée un nouveau niveau dans un cycle existant")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Niveau créé"),
            @ApiResponse(responseCode = "409", description = "LEVEL_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ci.company.eduops.common.exception.ApiError.class)))
>>>>>>> 13f4202 (envoi de maj)
    })
    public ResponseEntity<LevelResponse> create(
            @Valid @RequestBody LevelUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(levelService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_MANAGE + "')")
    @Operation(summary = "Modifier un niveau",
<<<<<<< HEAD
            description = "Le niveau reste dans son cycle : un changement de cycle "
                    + "est refusé, il faut créer le niveau au bon endroit.")
    @ApiResponses({
            @ApiResponse(responseCode = "409", description = "LEVEL_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<LevelResponse> update(
            @PathVariable UUID id, @Valid @RequestBody LevelUpsertRequest request) {
=======
            description = "Met à jour les informations d'un niveau (le cycle ne peut pas être modifié)")
    public ResponseEntity<LevelResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody LevelUpsertRequest request) {
>>>>>>> 13f4202 (envoi de maj)
        return ResponseEntity.ok(levelService.update(id, request));
    }

    @PostMapping("/{id}/archive")
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_MANAGE + "')")
    @Operation(summary = "Archiver un niveau",
<<<<<<< HEAD
            description = "Le niveau disparaît des listes de choix, mais les classes, "
                    + "les programmes et les candidatures qui le référencent restent "
                    + "lisibles. Refusé tant qu'une classe active, un programme, "
                    + "une candidature ou un parcours de passage s'y rattache.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Niveau archivé"),
            @ApiResponse(responseCode = "409", description = "LEVEL_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
=======
            description = "Archive un niveau. Refusé si le niveau contient des classes actives.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Niveau archivé"),
            @ApiResponse(responseCode = "409", description = "LEVEL_HAS_ACTIVE_CLASSES",
                    content = @Content(schema = @Schema(implementation = ci.company.eduops.common.exception.ApiError.class)))
>>>>>>> 13f4202 (envoi de maj)
    })
    public ResponseEntity<LevelResponse> archive(@PathVariable UUID id) {
        return ResponseEntity.ok(levelService.archive(id));
    }

    @PostMapping("/{id}/restore")
    @PreAuthorize("hasAuthority('" + Permissions.LEVEL_MANAGE + "')")
    @Operation(summary = "Réactiver un niveau archivé")
    public ResponseEntity<LevelResponse> restore(@PathVariable UUID id) {
        return ResponseEntity.ok(levelService.restore(id));
    }
}