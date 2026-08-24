package ci.company.eduops.finance.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.finance.dto.request.FeeApplyRequest;
import ci.company.eduops.finance.dto.request.FeeScheduleUpsertRequest;
import ci.company.eduops.finance.dto.request.FeeTypeUpsertRequest;
import ci.company.eduops.finance.dto.response.FeeTypeResponse;
import ci.company.eduops.finance.dto.response.LevelFeesResponse;
import ci.company.eduops.finance.service.FeeConfigurationService;
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
@RequestMapping("/api/v1/fees")
@Tag(name = "Fees", description = "Types de frais et tarifs par niveau")
public class FeeConfigurationController {

    private final FeeConfigurationService feeService;

    public FeeConfigurationController(FeeConfigurationService feeService) {
        this.feeService = feeService;
    }

    // ------------------------------------------------------ types de frais

    @GetMapping("/types")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_VIEW + "')")
    @Operation(summary = "Lister les types de frais",
            description = "Chaque type indique sur combien de niveaux il est tarifé.")
    public ResponseEntity<List<FeeTypeResponse>> listTypes(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(feeService.listTypes(academicYearId));
    }

    @PostMapping("/types")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Créer un type de frais",
            description = "Un type de frais ne porte pas de montant : "
                    + "son prix se règle niveau par niveau.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Type créé"),
            @ApiResponse(responseCode = "409", description = "FEE_TYPE_CODE_ALREADY_USED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<FeeTypeResponse> createType(
            @Valid @RequestBody FeeTypeUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feeService.createType(request));
    }

    @PutMapping("/types/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Modifier un type de frais")
    public ResponseEntity<FeeTypeResponse> updateType(
            @PathVariable UUID id, @Valid @RequestBody FeeTypeUpsertRequest request) {
        return ResponseEntity.ok(feeService.updateType(id, request));
    }

    @PostMapping("/types/{id}/archive")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Archiver un type de frais",
            description = "Refusé tant qu'un tarif l'utilise.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Type archivé"),
            @ApiResponse(responseCode = "409", description = "FEE_TYPE_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<FeeTypeResponse> archiveType(@PathVariable UUID id) {
        return ResponseEntity.ok(feeService.archiveType(id));
    }

    // ------------------------------------------------------ tarifs

    @GetMapping("/levels")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_VIEW + "')")
    @Operation(summary = "Coût de chaque niveau",
            description = """
                    Renvoie tous les niveaux, y compris ceux sans tarif : ce sont eux
                    dont les inscriptions ne généreront rien à encaisser. Le total par
                    élève ne compte que les frais obligatoires ; les frais facultatifs
                    sont donnés à part.
                    """)
    public ResponseEntity<List<LevelFeesResponse>> overview(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(feeService.overview(academicYearId));
    }

    @GetMapping("/levels/{levelId}")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_VIEW + "')")
    @Operation(summary = "Coût d'un niveau")
    public ResponseEntity<LevelFeesResponse> forLevel(
            @PathVariable UUID levelId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(feeService.forLevel(levelId, academicYearId));
    }

    @PutMapping("/schedules")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Définir le tarif d'un type de frais sur un niveau",
            description = """
                    L'échéancier doit totaliser le montant annoncé. Fournissez soit la
                    liste des échéances, soit un nombre d'échéances régulières : dans
                    ce second cas le serveur répartit le montant et place la différence
                    d'arrondi sur la première, pour que le plan tombe juste au franc près.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Tarif enregistré"),
            @ApiResponse(responseCode = "400", description = "FEE_INSTALMENTS_MISMATCH "
                    + "ou FEE_AMOUNT_INVALID",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<List<LevelFeesResponse>> saveSchedule(
            @Valid @RequestBody FeeScheduleUpsertRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(feeService.saveSchedule(request, academicYearId));
    }

    @DeleteMapping("/schedules/{scheduleId}")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Supprimer un tarif",
            description = "Refusé si des frais élèves en sont déjà issus : les lignes "
                    + "que les familles règlent deviendraient orphelines.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Tarif supprimé"),
            @ApiResponse(responseCode = "409", description = "FEE_SCHEDULE_IN_USE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<Void> deleteSchedule(@PathVariable UUID scheduleId) {
        feeService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/apply")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Appliquer un même tarif à plusieurs niveaux",
            description = """
                    La scolarité augmente en général avec le niveau, mais les autres frais
                    — inscription, cantine, transport — sont identiques pour tous. Saisir
                    seize fois le même montant, c'est seize occasions d'ajouter un zéro.
                    """)
    public ResponseEntity<List<LevelFeesResponse>> apply(
            @Valid @RequestBody FeeApplyRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(feeService.applyToLevels(request, academicYearId));
    }
}
