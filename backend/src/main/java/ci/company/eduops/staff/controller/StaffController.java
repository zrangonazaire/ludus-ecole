package ci.company.eduops.staff.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.staff.domain.StaffStatus;
import ci.company.eduops.staff.dto.StaffResponse;
import ci.company.eduops.staff.dto.StaffSaveRequest;
import ci.company.eduops.staff.dto.StaffStatusRequest;
import ci.company.eduops.staff.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

/** Le personnel non enseignant de l'établissement. */
@RestController
@RequestMapping("/api/v1/staff")
@Tag(name = "Personnel", description = "Dossiers du personnel non enseignant")
public class StaffController {

    private final StaffService service;

    public StaffController(StaffService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Rechercher dans le personnel")
    @PreAuthorize("hasAuthority('" + Permissions.STAFF_VIEW + "')")
    public ResponseEntity<PageResponse<StaffResponse>> search(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) StaffStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {
        return ResponseEntity.ok(service.search(search, status, page, size));
    }

    @GetMapping("/counts")
    @Operation(summary = "Le nombre d'agents dans chaque situation")
    @PreAuthorize("hasAuthority('" + Permissions.STAFF_VIEW + "')")
    public ResponseEntity<Map<String, Long>> counts() {
        return ResponseEntity.ok(service.countByStatus());
    }

    @GetMapping("/{staffId}")
    @Operation(summary = "Le dossier d'un agent")
    @PreAuthorize("hasAuthority('" + Permissions.STAFF_VIEW + "')")
    public ResponseEntity<StaffResponse> get(@PathVariable UUID staffId) {
        return ResponseEntity.ok(service.get(staffId));
    }

    @PostMapping
    @Operation(summary = "Créer un dossier", description = "Le matricule est attribué "
            + "par le serveur et ne change plus.")
    @PreAuthorize("hasAuthority('" + Permissions.STAFF_MANAGE + "')")
    public ResponseEntity<StaffResponse> create(@Valid @RequestBody StaffSaveRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{staffId}")
    @Operation(summary = "Modifier un dossier")
    @PreAuthorize("hasAuthority('" + Permissions.STAFF_MANAGE + "')")
    public ResponseEntity<StaffResponse> update(@PathVariable UUID staffId,
                                                @Valid @RequestBody StaffSaveRequest request) {
        return ResponseEntity.ok(service.update(staffId, request));
    }

    @PatchMapping("/{staffId}/status")
    @Operation(summary = "Changer la situation d'un agent",
            description = "Congé, suspension, départ. Le motif part au journal d'audit.")
    @PreAuthorize("hasAuthority('" + Permissions.STAFF_MANAGE + "')")
    public ResponseEntity<StaffResponse> changeStatus(
            @PathVariable UUID staffId,
            @Valid @RequestBody StaffStatusRequest request) {
        return ResponseEntity.ok(service.changeStatus(staffId, request));
    }
}
