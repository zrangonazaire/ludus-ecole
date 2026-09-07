package ci.company.eduops.admission.controller;

import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.admission.dto.request.AdmissionCreateRequest;
import ci.company.eduops.admission.dto.request.AdmissionDocumentRequest;
import ci.company.eduops.admission.dto.request.AdmissionStatusRequest;
import ci.company.eduops.admission.dto.response.AdmissionOptionsResponse;
import ci.company.eduops.admission.dto.response.AdmissionResponse;
import ci.company.eduops.admission.service.AdmissionService;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

import static org.springframework.data.domain.Sort.Direction.DESC;

@RestController
@RequestMapping("/api/v1/admissions")
@Tag(name = "Admissions", description = "Dossiers de candidature avant inscription")
public class AdmissionController {

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.ADMISSION_VIEW + "')")
    @Operation(summary = "Rechercher les dossiers d’admission")
    public ResponseEntity<PageResponse<AdmissionResponse>> search(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) AdmissionStatus status,
            @RequestParam(required = false) UUID levelId,
            @RequestParam(required = false) String search,
            @PageableDefault(size = 20, sort = "createdAt", direction = DESC) Pageable pageable) {
        return ResponseEntity.ok(admissionService.search(
                academicYearId, status, levelId, search, pageable));
    }

    @GetMapping("/options")
    @PreAuthorize("hasAuthority('" + Permissions.ADMISSION_VIEW + "')")
    @Operation(summary = "Référentiels nécessaires à l’écran d’admission")
    public ResponseEntity<AdmissionOptionsResponse> options(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(admissionService.options(academicYearId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.ADMISSION_VIEW + "')")
    public ResponseEntity<AdmissionResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(admissionService.get(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.ADMISSION_MANAGE + "')")
    @Operation(summary = "Créer un dossier d’admission")
    public ResponseEntity<AdmissionResponse> create(
            @Valid @RequestBody AdmissionCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(admissionService.create(request));
    }

    @PostMapping("/{id}/status")
    @PreAuthorize("hasAuthority('" + Permissions.ADMISSION_DECIDE + "')")
    @Operation(summary = "Faire avancer ou décider un dossier")
    public ResponseEntity<AdmissionResponse> changeStatus(
            @PathVariable UUID id,
            @Valid @RequestBody AdmissionStatusRequest request) {
        return ResponseEntity.ok(admissionService.changeStatus(id, request));
    }

    @PutMapping("/{admissionId}/documents/{documentId}")
    @PreAuthorize("hasAuthority('" + Permissions.ADMISSION_MANAGE + "')")
    @Operation(summary = "Pointer une pièce reçue ou manquante")
    public ResponseEntity<AdmissionResponse> updateDocument(
            @PathVariable UUID admissionId,
            @PathVariable UUID documentId,
            @Valid @RequestBody AdmissionDocumentRequest request) {
        return ResponseEntity.ok(admissionService.updateDocument(
                admissionId, documentId, request));
    }
}
