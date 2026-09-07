package ci.company.eduops.audit.controller;

import ci.company.eduops.audit.dto.AuditEntryResponse;
import ci.company.eduops.audit.service.AuditQueryService;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Le journal d'audit de l'établissement.
 *
 * <p>Lecture seule, et sans exception : le journal refuse déjà les
 * modifications au niveau de la base (déclencheur posé en V27). Ajouter ici
 * une route d'écriture ou de purge reviendrait à ouvrir une porte que le
 * schéma s'est donné du mal à condamner.</p>
 */
@RestController
@RequestMapping("/api/v1/audit")
@Tag(name = "Journal d'audit", description = "Qui a fait quoi, et quand")
public class AuditController {

    private final AuditQueryService service;

    public AuditController(AuditQueryService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Parcourir le journal",
            description = "Les champs modifiés sont nommés ; leur contenu n'est "
                    + "jamais renvoyé.")
    @PreAuthorize("hasAuthority('" + Permissions.AUDIT_VIEW + "')")
    public ResponseEntity<PageResponse<AuditEntryResponse>> search(
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String entityType,
            @RequestParam(required = false) UUID entityId,
            @RequestParam(required = false) UUID userId,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(service.search(action, entityType, entityId, userId,
                from, to, page, size));
    }

    @GetMapping("/entity-types")
    @Operation(summary = "Les types d'objets présents dans le journal")
    @PreAuthorize("hasAuthority('" + Permissions.AUDIT_VIEW + "')")
    public ResponseEntity<List<String>> entityTypes() {
        return ResponseEntity.ok(service.entityTypes());
    }
}
