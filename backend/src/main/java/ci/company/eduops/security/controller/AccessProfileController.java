package ci.company.eduops.security.controller;

import ci.company.eduops.security.dto.AccessProfileOverviewResponse;
import ci.company.eduops.security.dto.AccessProfileRequest;
import ci.company.eduops.security.dto.AccessProfileResponse;
import ci.company.eduops.security.service.AccessProfileService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/access-profiles")
@Tag(name = "Access profiles", description = "Profils de droits propres à un établissement")
@PreAuthorize("hasAuthority('" + Permissions.ROLE_MANAGE + "')")
public class AccessProfileController {

    private final AccessProfileService accessProfileService;

    public AccessProfileController(AccessProfileService accessProfileService) {
        this.accessProfileService = accessProfileService;
    }

    @GetMapping
    @Operation(summary = "Lister les profils et les permissions disponibles")
    public ResponseEntity<AccessProfileOverviewResponse> overview() {
        return ResponseEntity.ok(accessProfileService.overview());
    }

    @PostMapping
    @Operation(summary = "Créer un profil personnalisé")
    public ResponseEntity<AccessProfileResponse> create(
            @Valid @RequestBody AccessProfileRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(accessProfileService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifier un profil personnalisé")
    public ResponseEntity<AccessProfileResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody AccessProfileRequest request) {
        return ResponseEntity.ok(accessProfileService.update(id, request));
    }
}
