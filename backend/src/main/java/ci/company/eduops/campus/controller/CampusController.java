package ci.company.eduops.campus.controller;

import ci.company.eduops.campus.dto.request.CampusUpsertRequest;
import ci.company.eduops.campus.dto.response.CampusResponse;
import ci.company.eduops.campus.service.CampusService;
import ci.company.eduops.common.exception.ApiError;
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
@RequestMapping("/api/v1/campuses")
@Tag(name = "Campuses", description = "Gestion des sites physiques de l'établissement")
public class CampusController {

    private final CampusService campusService;

    public CampusController(CampusService campusService) {
        this.campusService = campusService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.CAMPUS_VIEW + "')")
    @Operation(summary = "Lister les campus",
            description = "Retourne les campus actifs, ou tous si `includeArchived` est vrai.")
    public ResponseEntity<List<CampusResponse>> list(
            @RequestParam(defaultValue = "false") boolean includeArchived) {
        return ResponseEntity.ok(campusService.list(includeArchived));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.CAMPUS_VIEW + "')")
    @Operation(summary = "Détail d'un campus")
    public ResponseEntity<CampusResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(campusService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.CAMPUS_MANAGE + "')")
    @Operation(summary = "Créer un campus",
            description = "Le code est normalisé en majuscules sans accent.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Campus créé"),
            @ApiResponse(responseCode = "409", description = "CAMPUS_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "CAMPUS_MAIN_EXISTS",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CampusResponse> create(
            @Valid @RequestBody CampusUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(campusService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.CAMPUS_MANAGE + "')")
    @Operation(summary = "Modifier un campus")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Campus modifié"),
            @ApiResponse(responseCode = "404", description = "CAMPUS_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "CAMPUS_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "CAMPUS_MAIN_EXISTS",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CampusResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody CampusUpsertRequest request) {
        return ResponseEntity.ok(campusService.update(id, request));
    }

    @PostMapping("/{id}/archive")
    @PreAuthorize("hasAuthority('" + Permissions.CAMPUS_MANAGE + "')")
    @Operation(summary = "Archiver un campus",
            description = "Refusé si des salles actives sont encore rattachées au campus.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Campus archivé"),
            @ApiResponse(responseCode = "409", description = "CAMPUS_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CampusResponse> archive(@PathVariable UUID id) {
        return ResponseEntity.ok(campusService.archive(id));
    }

    @PostMapping("/{id}/restore")
    @PreAuthorize("hasAuthority('" + Permissions.CAMPUS_MANAGE + "')")
    @Operation(summary = "Réactiver un campus archivé")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Campus réactivé"),
            @ApiResponse(responseCode = "404", description = "CAMPUS_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CampusResponse> restore(@PathVariable UUID id) {
        return ResponseEntity.ok(campusService.restore(id));
    }
}
