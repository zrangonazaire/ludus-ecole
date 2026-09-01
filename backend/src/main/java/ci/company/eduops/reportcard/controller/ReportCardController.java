package ci.company.eduops.reportcard.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.reportcard.dto.request.ReportCardGenerateRequest;
import ci.company.eduops.reportcard.dto.request.ReportCardRemarkRequest;
import ci.company.eduops.reportcard.dto.response.ReportCardBatchResponse;
import ci.company.eduops.reportcard.dto.response.ReportCardResponse;
import ci.company.eduops.reportcard.service.ReportCardService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
@RequestMapping("/api/v1/report-cards")
@Tag(name = "ReportCards", description = "Bulletins : génération, appréciations, remise")
public class ReportCardController {

    private final ReportCardService reportCardService;

    public ReportCardController(ReportCardService reportCardService) {
        this.reportCardService = reportCardService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_VIEW + "')")
    @Operation(summary = "Les bulletins d'une classe pour une période",
            description = """
                    Lisible avant toute génération : l'intérêt d'ouvrir cet écran en
                    début de période de clôture est de voir ce qui manque.

                    Les blocages sont nommés, pas comptés. « 3 devoirs non validés »
                    se traite cet après-midi ; « bulletins indisponibles » ne se
                    traite pas.
                    """)
    public ResponseEntity<ReportCardBatchResponse> batch(
            @RequestParam UUID classroomId,
            @RequestParam UUID termId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                reportCardService.batch(classroomId, termId, academicYearId));
    }

    @PostMapping("/generate")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_GENERATE + "')")
    @Operation(summary = "Générer les bulletins d'une classe",
            description = """
                    La classe entière est calculée en une passe : sans cela le rang
                    n'a pas de sens, puisque chaque bulletin porte la position de son
                    élève parmi les autres, calculée sur les mêmes notes au même
                    moment.

                    Refusé tant qu'un devoir de la période n'a pas ses notes validées :
                    les moyennes porteraient sur une partie du travail, et rien en
                    aval ne s'en apercevrait.

                    `regenerate` recalcule ce qui existe déjà. Un bulletin publié
                    n'est jamais écrasé : il repart en révision suivante, l'ancienne
                    restant consultable — une famille qui tient un bulletin papier
                    doit pouvoir retrouver le document correspondant.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bulletins générés"),
            @ApiResponse(responseCode = "409", description = "REPORT_CARD_NOT_READY",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<ReportCardBatchResponse> generate(
            @Valid @RequestBody ReportCardGenerateRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(reportCardService.generate(request, academicYearId));
    }

    @GetMapping("/{reportCardId}")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_VIEW + "')")
    @Operation(summary = "Un bulletin",
            description = "Tout ce qu'il porte a été calculé une fois, à la génération, "
                    + "et conservé. Il n'est pas recalculé à la lecture : un bulletin "
                    + "remis en décembre doit dire en juin exactement ce qu'il disait "
                    + "alors.")
    public ResponseEntity<ReportCardResponse> get(@PathVariable UUID reportCardId) {
        return ResponseEntity.ok(reportCardService.get(reportCardId));
    }

    @GetMapping("/verify")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_VIEW + "')")
    @Operation(summary = "Vérifier un bulletin par son code",
            description = "Permet de contrôler un bulletin présenté sur papier — à la "
                    + "réinscription, ou quand une famille conteste une note. Un "
                    + "document que personne ne peut vérifier est un document que "
                    + "n'importe qui peut fabriquer.")
    public ResponseEntity<ReportCardResponse> verify(@RequestParam String code) {
        return ResponseEntity.ok(reportCardService.verify(code));
    }

    @PutMapping("/{reportCardId}/remarks")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_GENERATE + "')")
    @Operation(summary = "Porter les appréciations sur un bulletin",
            description = """
                    Les moyennes sortent des notes ; ces lignes sont la seule partie
                    qu'un humain écrit — et celle que les familles lisent en premier.
                    Elles ne sont jamais régénérées.

                    Refusé une fois le bulletin publié : les appréciations font partie
                    du document que la famille a reçu.
                    """)
    public ResponseEntity<ReportCardResponse> remark(
            @PathVariable UUID reportCardId,
            @Valid @RequestBody ReportCardRemarkRequest request) {
        return ResponseEntity.ok(reportCardService.remark(reportCardId, request));
    }

    @PostMapping("/{reportCardId}/publish")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_PUBLISH + "')")
    @Operation(summary = "Remettre un bulletin à la famille",
            description = "Refusé sans moyenne générale : un bulletin vide n'apprend "
                    + "rien à une famille et ne peut pas être contesté.")
    public ResponseEntity<ReportCardResponse> publish(@PathVariable UUID reportCardId) {
        return ResponseEntity.ok(reportCardService.publish(reportCardId));
    }

    @PostMapping("/publish")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_PUBLISH + "')")
    @Operation(summary = "Remettre les bulletins de toute une classe",
            description = "Les bulletins se distribuent ensemble. Les publier un par "
                    + "un ferait que certaines familles voient les notes plusieurs "
                    + "jours avant les autres.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bulletins remis"),
            @ApiResponse(responseCode = "409", description = "REPORT_CARD_NOT_READY",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<ReportCardBatchResponse> publishAll(
            @RequestParam UUID classroomId,
            @RequestParam UUID termId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                reportCardService.publishAll(classroomId, termId, academicYearId));
    }
}
