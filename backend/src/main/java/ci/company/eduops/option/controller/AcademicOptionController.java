package ci.company.eduops.option.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.option.domain.OptionChoiceStatus;
import ci.company.eduops.option.dto.OptionChoiceAssignRequest;
import ci.company.eduops.option.dto.OptionChoiceResponse;
import ci.company.eduops.option.dto.OptionChoiceStatusRequest;
import ci.company.eduops.option.dto.OptionOfferingsSaveRequest;
import ci.company.eduops.option.dto.OptionOverviewResponse;
import ci.company.eduops.option.dto.OptionUpsertRequest;
import ci.company.eduops.option.service.AcademicOptionService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/options")
@Tag(name = "Options et langues", description = "Catalogue, offres annuelles et choix des élèves")
public class AcademicOptionController {

    private final AcademicOptionService service;

    public AcademicOptionController(AcademicOptionService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('" + Permissions.CURRICULUM_VIEW + "','"
            + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Vue d’ensemble des options de l’année active")
    public ResponseEntity<OptionOverviewResponse> overview(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(service.overview(academicYearId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Créer une option dans le catalogue")
    public ResponseEntity<OptionOverviewResponse> create(
            @Valid @RequestBody OptionUpsertRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(service.create(request, academicYearId));
    }

    @PutMapping("/{optionId}")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Modifier une option")
    public ResponseEntity<OptionOverviewResponse> update(
            @PathVariable UUID optionId,
            @Valid @RequestBody OptionUpsertRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(service.update(optionId, request, academicYearId));
    }

    @DeleteMapping("/{optionId}")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Archiver une option sans perdre son historique")
    public ResponseEntity<OptionOverviewResponse> archive(
            @PathVariable UUID optionId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(service.archive(optionId, academicYearId));
    }

    @PutMapping("/{optionId}/offerings")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Définir les niveaux, capacités et période de choix")
    public ResponseEntity<OptionOverviewResponse> saveOfferings(
            @PathVariable UUID optionId,
            @Valid @RequestBody OptionOfferingsSaveRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(service.saveOfferings(optionId, request, academicYearId));
    }

    @GetMapping("/choices")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Lister et filtrer les choix des élèves")
    public ResponseEntity<PageResponse<OptionChoiceResponse>> choices(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) UUID offeringId,
            @RequestParam(required = false) OptionChoiceStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(service.choices(
                academicYearId, offeringId, status, search, page, size));
    }

    @PostMapping("/choices")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CREATE + "')")
    @Operation(summary = "Affecter une option à un élève inscrit dans le bon niveau")
    public ResponseEntity<OptionChoiceResponse> assign(
            @Valid @RequestBody OptionChoiceAssignRequest request) {
        return ResponseEntity.ok(service.assign(request));
    }

    @PatchMapping("/choices/{choiceId}/status")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CREATE + "')")
    @Operation(summary = "Confirmer, placer en attente ou annuler un choix")
    public ResponseEntity<OptionChoiceResponse> changeStatus(
            @PathVariable UUID choiceId,
            @Valid @RequestBody OptionChoiceStatusRequest request) {
        return ResponseEntity.ok(service.changeStatus(choiceId, request));
    }
}
