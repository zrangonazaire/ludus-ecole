package ci.company.eduops.council.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.council.dto.request.CouncilCreateRequest;
import ci.company.eduops.council.dto.request.CouncilDecisionRequest;
import ci.company.eduops.council.dto.request.CouncilParticipantRequest;
import ci.company.eduops.council.dto.request.CouncilUpdateRequest;
import ci.company.eduops.council.dto.response.CouncilResponse;
import ci.company.eduops.council.dto.response.CouncilSummaryResponse;
import ci.company.eduops.council.dto.response.StudentDecisionResponse;
import ci.company.eduops.council.service.CouncilService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/v1/councils")
@Tag(name = "Councils", description = "Conseils de classe et décisions de promotion")
public class CouncilController {

    private final CouncilService councilService;

    public CouncilController(CouncilService councilService) {
        this.councilService = councilService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_VIEW + "')")
    @Operation(summary = "Lister les conseils de classe",
            description = "Filtrables par année scolaire, classe et statut. Sans année, "
                    + "l'année active est utilisée.")
    public ResponseEntity<List<CouncilSummaryResponse>> list(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) UUID classroomId,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(councilService.list(academicYearId, classroomId, status));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_VIEW + "')")
    @Operation(summary = "Détail d'un conseil",
            description = "Participants, feuil d'appel et décisions de promotion déjà posées.")
    public ResponseEntity<CouncilResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(councilService.get(id));
    }

    @GetMapping("/{id}/students")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_VIEW + "')")
    @Operation(summary = "Élèves de la classe examinée par le conseil")
    public ResponseEntity<List<StudentDecisionResponse>> students(@PathVariable UUID id) {
        return ResponseEntity.ok(councilService.students(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Créer un conseil de classe",
            description = "Un conseil par classe et par période : la création est refusée "
                    + "si la paire existe déjà.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Conseil créé"),
            @ApiResponse(responseCode = "409", description = "COUNCIL_ALREADY_EXISTS",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<CouncilResponse> create(@Valid @RequestBody CouncilCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(councilService.create(request));
}

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Modifier les informations pratiques d'un conseil",
            description = "Refusé une fois le conseil clos.")
    public ResponseEntity<CouncilResponse> update(@PathVariable UUID id,
                                                  @Valid @RequestBody CouncilUpdateRequest request) {
        return ResponseEntity.ok(councilService.update(id, request));
    }

    @PostMapping("/{id}/start")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Ouvrir le conseil (début de la réunion)")
    public ResponseEntity<CouncilResponse> start(@PathVariable UUID id) {
        return ResponseEntity.ok(councilService.start(id));
    }

    @PostMapping("/{id}/close")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Clore le conseil",
            description = "Recalcule la moyenne de classe et le taux de réussite à partir "
                    + "des décisions posées, puis fige le conseil.")
    public ResponseEntity<CouncilResponse> close(@PathVariable UUID id) {
        return ResponseEntity.ok(councilService.close(id));
    }

    @PostMapping("/{id}/participants")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Ajouter un participant au conseil",
            description = "Le participant est exactement un professeur, un membre du "
                    + "personnel ou un tuteur.")
    public ResponseEntity<CouncilResponse> addParticipant(
            @PathVariable UUID id, @Valid @RequestBody CouncilParticipantRequest request) {
        return ResponseEntity.ok(councilService.addParticipant(id, request));
    }

    @DeleteMapping("/{id}/participants/{participantId}")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Retirer un participant du conseil")
    public ResponseEntity<CouncilResponse> removeParticipant(@PathVariable UUID id,
                                                             @PathVariable UUID participantId) {
        return ResponseEntity.ok(councilService.removeParticipant(id, participantId));
    }

    @PutMapping("/{id}/participants/{participantId}/presence")
    @PreAuthorize("hasAuthority('" + Permissions.COUNCIL_MANAGE + "')")
    @Operation(summary = "Pointer la présence d'un participant")
    public ResponseEntity<CouncilResponse> setPresence(
            @PathVariable UUID id,
            @PathVariable UUID participantId,
            @RequestParam("present") boolean present) {
        return ResponseEntity.ok(councilService.setPresence(id, participantId, present));
    }

    @PostMapping("/{id}/decisions")
    @PreAuthorize("hasAuthority('" + Permissions.PROMOTION_DECIDE + "')")
    @Operation(summary = "Poser (ou corriger) la décision de promotion d'un élève",
            description = "Une seule décision par inscription et par année : enregistrer à "
                    + "nouveau met à jour la ligne existante.")
    public ResponseEntity<StudentDecisionResponse> recordDecision(
            @PathVariable UUID id, @Valid @RequestBody CouncilDecisionRequest request) {
        return ResponseEntity.ok(councilService.recordDecision(id, request));
    }
}