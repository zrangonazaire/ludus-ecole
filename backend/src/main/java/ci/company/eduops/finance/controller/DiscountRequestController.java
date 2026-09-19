package ci.company.eduops.finance.controller;

import ci.company.eduops.finance.dto.request.DiscountRequestCreateRequest;
import ci.company.eduops.finance.dto.request.DiscountRequestDecisionRequest;
import ci.company.eduops.finance.dto.response.DiscountRequestResponse;
import ci.company.eduops.finance.service.DiscountRequestService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Circuit de validation des réductions de scolarité.
 *
 * <p>Créer une demande, suivre son avancement palier par palier, trancher le
 * palier courant avec le profil assigné, puis appliquer la réduction une fois
 * tous les paliers approuvés.</p>
 */
@RestController
@RequestMapping("/api/v1/finance/discount-requests")
@Tag(name = "Discount requests",
        description = "Réductions de scolarité validées par un circuit multi-niveaux")
public class DiscountRequestController {

    private final DiscountRequestService service;

    public DiscountRequestController(DiscountRequestService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.DISCOUNT_REQUEST_VIEW + "')")
    @Operation(summary = "Demandes de réduction",
            description = "Fil d'actualité des demandes, de la plus récente. Filtres "
                    + "facultatifs : statut, élève.")
    public ResponseEntity<List<DiscountRequestResponse>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) UUID studentId) {
        return ResponseEntity.ok(service.list(status, studentId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.DISCOUNT_REQUEST_VIEW + "')")
    @Operation(summary = "Détail d'une demande",
            description = "La demande complète avec sa chaîne de validation.")
    public ResponseEntity<DiscountRequestResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.DISCOUNT_REQUEST_MANAGE + "')")
    @Operation(summary = "Créer une demande",
            description = "Définit l'élève, la réduction (pourcentage ou montant fixe) "
                    + "et la chaîne de validation : 1 à 5 paliers, chacun assigné à un profil.")
    public ResponseEntity<DiscountRequestResponse> create(
            @Valid @RequestBody DiscountRequestCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PostMapping("/{id}/decision")
    @PreAuthorize("hasAuthority('" + Permissions.DISCOUNT_REQUEST_DECIDE + "')")
    @Operation(summary = "Trancher le palier courant",
            description = "Approuve ou refuse. Seul le porteur du profil du palier courant "
                    + "(ou un administrateur) peut trancher. Refuser clôt la demande.")
    public ResponseEntity<DiscountRequestResponse> decide(
            @PathVariable UUID id,
            @Valid @RequestBody DiscountRequestDecisionRequest request) {
        return ResponseEntity.ok(service.decide(id, request));
    }

    @PostMapping("/{id}/apply")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_MANAGE + "')")
    @Operation(summary = "Rendre la réduction effective",
            description = "RÉDUIT réellement les montants dus de l'élève. Requiert "
                    + "l'approbation de tous les paliers.")
    public ResponseEntity<DiscountRequestResponse> apply(@PathVariable UUID id) {
        return ResponseEntity.ok(service.apply(id));
    }
}
