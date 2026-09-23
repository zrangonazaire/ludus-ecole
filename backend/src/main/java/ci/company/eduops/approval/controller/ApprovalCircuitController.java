package ci.company.eduops.approval.controller;

import ci.company.eduops.approval.dto.request.ApprovalCircuitUpsertRequest;
import ci.company.eduops.approval.dto.response.ApprovalCircuitResponse;
import ci.company.eduops.approval.service.ApprovalCircuitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Circuits de validation nommés (modèle Krindja : code + nom + niveaux).
 *
 * <p>La sécurité est dans le service (section 63) : lecture SCHOOL_VIEW ou
 * DISCOUNT_REQUEST_VIEW, écriture SCHOOL_MANAGE ou DISCOUNT_REQUEST_MANAGE.
 * Pas de {@code @PreAuthorize} ici : un garde fermerait l'écran « Remises et
 * bourses » qui doit voir le modèle pour pré-remplir une demande.</p>
 */
@RestController
@RequestMapping("/api/v1/approval-circuits")
@Tag(name = "Approval circuits", description = "Circuits de validation nommés par établissement")
public class ApprovalCircuitController {

    private final ApprovalCircuitService service;

    public ApprovalCircuitController(ApprovalCircuitService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Circuits de l'établissement",
            description = "Tous les circuits, code croissant, niveaux et membres inclus.")
    public ResponseEntity<List<ApprovalCircuitResponse>> list() {
        return ResponseEntity.ok(service.list());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un circuit",
            description = "Le circuit complet avec ses niveaux ordonnés et ses membres.")
    public ResponseEntity<ApprovalCircuitResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PostMapping
    @Operation(summary = "Créer un circuit",
            description = "Code unique, nom, 1 à 5 niveaux avec au moins un membre chacun.")
    public ResponseEntity<ApprovalCircuitResponse> create(
            @Valid @RequestBody ApprovalCircuitUpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Remplacer un circuit",
            description = "Les niveaux sont remplacés : les demandes existantes gardent leur circuit figé.")
    public ResponseEntity<ApprovalCircuitResponse> update(@PathVariable UUID id,
            @Valid @RequestBody ApprovalCircuitUpsertRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un circuit",
            description = "Les demandes existantes gardent leur propre chaîne de validation.")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
