package ci.company.eduops.enrollment.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.enrollment.dto.request.ClassChangeRequest;
import ci.company.eduops.enrollment.dto.request.DepartureCancelRequest;
import ci.company.eduops.enrollment.dto.request.DepartureDocumentsRequest;
import ci.company.eduops.enrollment.dto.request.DepartureRecordRequest;
import ci.company.eduops.enrollment.dto.response.ClassChangeResponse;
import ci.company.eduops.enrollment.dto.response.DepartureResponse;
import ci.company.eduops.enrollment.dto.response.TransferBoardResponse;
import ci.company.eduops.enrollment.service.TransferService;
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

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transfers")
@Tag(name = "Transfers", description = "Changements de classe, départs et radiations")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Les mouvements de l'année",
            description = """
                    Deux listes séparées : les changements de classe, qui sont un
                    arrangement interne, et les départs, qui mettent fin à la scolarité
                    et produisent des pièces qu'on réclamera des années plus tard.

                    Les mêler enfouirait les seconds sous les premiers, bien plus
                    fréquents.
                    """)
    public ResponseEntity<TransferBoardResponse> board(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(transferService.board(academicYearId, search));
    }

    @PostMapping("/class-change")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CREATE + "')")
    @Operation(summary = "Changer un élève de classe",
            description = """
                    Le contrôle de capacité est celui de l'inscription. Un changement
                    de classe qui l'ignorerait serait une façon de surcharger une
                    classe sans que personne l'ait décidé — `overrideCapacity` existe
                    pour les cas où la décision est prise ailleurs, et elle laisse
                    une trace.

                    Le motif est obligatoire : il reste au dossier et se relit au
                    conseil de classe.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Changement enregistré"),
            @ApiResponse(responseCode = "400", description = "TRANSFER_SAME_CLASSROOM",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "CLASS_CAPACITY_EXCEEDED, "
                    + "TRANSFER_CLASSROOM_MISMATCH, CLASS_NOT_ACTIVE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<ClassChangeResponse> changeClass(
            @Valid @RequestBody ClassChangeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transferService.changeClass(request));
    }

    @PostMapping("/departures")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CANCEL + "')")
    @Operation(summary = "Enregistrer la sortie d'un élève",
            description = """
                    L'inscription est close et le dossier de l'élève suit. Le solde dû
                    est lu maintenant et figé sur la sortie : recalculé dans six mois
                    il compterait les frais de l'année suivante et ne correspondrait
                    plus à ce qui a été dit à la famille le jour du départ.

                    Le solde est affiché, jamais bloquant : retenir un dossier
                    scolaire pour dette est illégal dans beaucoup de pays. Ce que le
                    produit doit au secrétariat, c'est le chiffre sous les yeux avant
                    que la famille reparte.

                    Un transfert vers un autre établissement exige son nom : sans lui,
                    l'exeat ne peut pas être rapproché par l'école d'accueil.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Sortie enregistrée"),
            @ApiResponse(responseCode = "409", description = "DEPARTURE_ALREADY_RECORDED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<DepartureResponse> recordDeparture(
            @Valid @RequestBody DepartureRecordRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transferService.recordDeparture(request));
    }

    @PutMapping("/departures/{departureId}/documents")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CANCEL + "')")
    @Operation(summary = "Cocher les pièces remises à la famille",
            description = "Une à une, à mesure qu'elles sont données. Une famille qui "
                    + "revient deux ans plus tard pour un duplicata doit savoir "
                    + "lesquelles des quatre elle a déjà.")
    public ResponseEntity<DepartureResponse> updateDocuments(
            @PathVariable UUID departureId,
            @Valid @RequestBody DepartureDocumentsRequest request) {
        return ResponseEntity.ok(transferService.updateDocuments(departureId, request));
    }

    @PostMapping("/departures/{departureId}/clear")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CANCEL + "')")
    @Operation(summary = "Solder le dossier de sortie",
            description = "Refusé tant qu'une pièce manque. « Soldé » doit vouloir dire "
                    + "que la famille est repartie avec tout, sinon le mot ne vaut rien "
                    + "et quelqu'un découvrira l'exeat manquant deux ans plus tard.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Dossier soldé"),
            @ApiResponse(responseCode = "409", description = "DEPARTURE_DOCUMENTS_INCOMPLETE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<DepartureResponse> clear(@PathVariable UUID departureId) {
        return ResponseEntity.ok(transferService.clearDeparture(departureId));
    }

    @PostMapping("/departures/{departureId}/cancel")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CANCEL + "')")
    @Operation(summary = "Annuler une sortie enregistrée par erreur",
            description = """
                    L'élève revient : l'inscription redevient active et le dossier
                    reprend son état précédent.

                    Le motif est obligatoire et conservé. Un élève qui réapparaît dans
                    une liste de classe après avoir été radié demande une explication
                    écrite, sans quoi la personne suivante conclura à un défaut du
                    logiciel.
                    """)
    public ResponseEntity<DepartureResponse> cancel(
            @PathVariable UUID departureId,
            @Valid @RequestBody DepartureCancelRequest request) {
        return ResponseEntity.ok(transferService.cancelDeparture(departureId, request));
    }
}
