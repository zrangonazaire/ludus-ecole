package ci.company.eduops.health.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.health.dto.request.ExaminationRequest;
import ci.company.eduops.health.dto.request.ExaminationResultRequest;
import ci.company.eduops.health.dto.request.HealthConditionRequest;
import ci.company.eduops.health.dto.request.HealthRecordRequest;
import ci.company.eduops.health.dto.request.InfirmaryVisitRequest;
import ci.company.eduops.health.dto.request.VaccinationRequest;
import ci.company.eduops.health.dto.response.ExaminationResponse;
import ci.company.eduops.health.dto.response.HealthBoardResponse;
import ci.company.eduops.health.dto.response.HealthConditionResponse;
import ci.company.eduops.health.dto.response.HealthRecordResponse;
import ci.company.eduops.health.dto.response.InfirmaryVisitResponse;
import ci.company.eduops.health.dto.response.VaccinationResponse;
import ci.company.eduops.health.dto.response.VaccineResponse;
import ci.company.eduops.health.service.HealthService;
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
@RequestMapping("/api/v1/health")
@Tag(name = "School health", description = "Fiches de santé, infirmerie, vaccins et visites")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    /**
     * The board is guarded by the *alert* permission, not the record one.
     *
     * <p>Supervising staff are meant to reach it — they will simply be served
     * the alert-only shape. The service decides which, and the medical detail
     * is not loaded for a caller who may not see it.</p>
     */
    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_ALERT_VIEW + "')")
    @Operation(summary = "L'écran Santé scolaire",
            description = """
                    Deux formes selon le droit de l'appelant. Sans
                    HEALTH_RECORD_VIEW, seules les alertes sont renvoyées :
                    libellé et conduite à tenir, sans diagnostic ni traitement.
                    Le détail médical n'est alors pas lu en base, il ne peut
                    donc pas transiter.
                    """)
    public HealthBoardResponse board(@RequestParam(required = false) UUID academicYearId,
                                     @RequestParam(required = false) String search) {
        return healthService.board(academicYearId, search);
    }

    @GetMapping("/records/{studentId}")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_VIEW + "')")
    @Operation(summary = "La fiche de santé d'un élève")
    @ApiResponses(@ApiResponse(responseCode = "404", description = "Pas de fiche",
            content = @Content(schema = @Schema(implementation = ApiError.class))))
    public HealthRecordResponse record(@PathVariable UUID studentId) {
        return healthService.record(studentId);
    }

    @PutMapping("/records")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Créer ou mettre à jour une fiche de santé")
    public HealthRecordResponse saveRecord(@Valid @RequestBody HealthRecordRequest request) {
        return healthService.saveRecord(request);
    }

    @PostMapping("/conditions")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Déclarer une allergie, une maladie ou un traitement",
            description = """
                    Une condition classée « Alerte » ou « Alerte vitale » doit
                    porter la conduite à tenir : c'est elle, et elle seule, que
                    le personnel encadrant recevra.
                    """)
    @ApiResponses(@ApiResponse(responseCode = "400",
            description = "Alerte sans conduite à tenir",
            content = @Content(schema = @Schema(implementation = ApiError.class))))
    public ResponseEntity<HealthConditionResponse> addCondition(
            @Valid @RequestBody HealthConditionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(healthService.addCondition(request));
    }

    @PutMapping("/conditions/{conditionId}")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Corriger une condition déclarée")
    public HealthConditionResponse updateCondition(
            @PathVariable UUID conditionId,
            @Valid @RequestBody HealthConditionRequest request) {
        return healthService.updateCondition(conditionId, request);
    }

    @PutMapping("/conditions/{conditionId}/resolve")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Clore une condition",
            description = "Elle reste au dossier : une guérison prononcée trop "
                    + "tôt doit rester retrouvable.")
    public HealthConditionResponse resolveCondition(@PathVariable UUID conditionId) {
        return healthService.resolveCondition(conditionId);
    }

    @PostMapping("/visits")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_VISIT_RECORD + "')")
    @Operation(summary = "Consigner un passage à l'infirmerie",
            description = """
                    Un élève confié à sa famille ou évacué exige que la famille
                    ait été jointe ; une orientation exige le nom du centre.
                    """)
    @ApiResponses(@ApiResponse(responseCode = "409",
            description = "Élève parti sans que la famille ait été jointe",
            content = @Content(schema = @Schema(implementation = ApiError.class))))
    public ResponseEntity<InfirmaryVisitResponse> recordVisit(
            @Valid @RequestBody InfirmaryVisitRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(healthService.recordVisit(request));
    }

    @PutMapping("/visits/{visitId}/notify")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_VISIT_RECORD + "')")
    @Operation(summary = "Noter que la famille a été jointe")
    public InfirmaryVisitResponse notifyGuardian(@PathVariable UUID visitId) {
        return healthService.notifyGuardian(visitId);
    }

    @GetMapping("/vaccines")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_VIEW + "')")
    @Operation(summary = "La liste des vaccins exigés par l'établissement",
            description = "Liste modifiable de l'école, pas une prescription "
                    + "médicale : les calendriers vaccinaux évoluent.")
    public java.util.List<VaccineResponse> vaccines() {
        return healthService.vaccines();
    }

    @PutMapping("/vaccinations")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Enregistrer un vaccin au carnet",
            description = "Un vaccin manquant est signalé et relancé, jamais un "
                    + "obstacle à la scolarité.")
    public VaccinationResponse saveVaccination(
            @Valid @RequestBody VaccinationRequest request) {
        return healthService.saveVaccination(request);
    }

    @PostMapping("/examinations")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Programmer une visite médicale")
    public ResponseEntity<ExaminationResponse> planExamination(
            @Valid @RequestBody ExaminationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(healthService.planExamination(request));
    }

    @PutMapping("/examinations/{examinationId}")
    @PreAuthorize("hasAuthority('" + Permissions.HEALTH_RECORD_MANAGE + "')")
    @Operation(summary = "Consigner le résultat d'une visite",
            description = "« Apte avec réserve » demande d'écrire la réserve.")
    public ExaminationResponse recordExamination(
            @PathVariable UUID examinationId,
            @Valid @RequestBody ExaminationResultRequest request) {
        return healthService.recordExamination(examinationId, request);
    }
}
