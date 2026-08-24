package ci.company.eduops.classroom.controller;

import ci.company.eduops.classroom.dto.request.ClassroomBulkCreateRequest;
import ci.company.eduops.classroom.dto.request.ClassroomCreateRequest;
import ci.company.eduops.classroom.dto.request.ClassroomUpdateRequest;
import ci.company.eduops.classroom.dto.response.ClassroomResponse;
import ci.company.eduops.classroom.dto.response.LevelCapacityResponse;
import ci.company.eduops.classroom.service.ClassroomService;
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
@RequestMapping("/api/v1/classrooms")
@Tag(name = "Classrooms", description = "Création et suivi des classes")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_VIEW + "')")
    @Operation(summary = "Lister les classes de l'année",
            description = "Les places disponibles sont recalculées à chaque lecture "
                    + "à partir des inscriptions actives, jamais stockées.")
    public ResponseEntity<List<ClassroomResponse>> list(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(classroomService.list(academicYearId));
    }

    @GetMapping("/levels")
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_VIEW + "')")
    @Operation(summary = "État de remplissage de chaque niveau",
            description = """
                    Pour chaque niveau : nombre de classes, places offertes, places prises,
                    et la proposition de nom, de code et d'effectif pour la classe suivante.
                    C'est ce qui permet de repondre a "la configuration initiale n'a pas
                    prevu assez de classes" sans ressaisir quoi que ce soit.
                    """)
    public ResponseEntity<List<LevelCapacityResponse>> levelCapacities(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(classroomService.levelCapacities(academicYearId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_VIEW + "')")
    @Operation(summary = "Détail d'une classe")
    public ResponseEntity<ClassroomResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(classroomService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_MANAGE + "')")
    @Operation(summary = "Créer une classe",
            description = "Le nom, le code et l'effectif sont déduits du niveau lorsqu'ils "
                    + "ne sont pas fournis, en continuant la série existante.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Classe créée"),
            @ApiResponse(responseCode = "409", description = "CLASS_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<ClassroomResponse> create(
            @Valid @RequestBody ClassroomCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classroomService.create(request));
    }

    @PostMapping("/batch")
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_MANAGE + "')")
    @Operation(summary = "Ajouter plusieurs classes à un niveau",
            description = "Crée N classes en une transaction, en poursuivant la série de noms.")
    public ResponseEntity<List<ClassroomResponse>> createMany(
            @Valid @RequestBody ClassroomBulkCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(classroomService.createMany(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_MANAGE + "')")
    @Operation(summary = "Modifier une classe",
            description = "L'effectif maximum ne peut pas descendre sous le nombre d'élèves "
                    + "déjà inscrits.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Classe modifiée"),
            @ApiResponse(responseCode = "409", description = "CLASS_CAPACITY_BELOW_ENROLLMENTS",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<ClassroomResponse> update(
            @PathVariable UUID id, @Valid @RequestBody ClassroomUpdateRequest request) {
        return ResponseEntity.ok(classroomService.update(id, request));
    }

    @PostMapping("/{id}/activate")
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_MANAGE + "')")
    @Operation(summary = "Ouvrir une classe aux inscriptions")
    public ResponseEntity<ClassroomResponse> activate(@PathVariable UUID id) {
        return ResponseEntity.ok(classroomService.activate(id));
    }

    @PostMapping("/{id}/close")
    @PreAuthorize("hasAuthority('" + Permissions.CLASS_MANAGE + "')")
    @Operation(summary = "Fermer une classe",
            description = "Refuse tant que la classe porte des inscriptions actives : "
                    + "les élèves doivent d'abord être transférés.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Classe fermée"),
            @ApiResponse(responseCode = "409", description = "CLASS_NOT_EMPTY",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<ClassroomResponse> close(
            @PathVariable UUID id, @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(classroomService.close(id, reason));
    }
}
