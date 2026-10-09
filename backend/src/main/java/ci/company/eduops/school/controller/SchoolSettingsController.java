package ci.company.eduops.school.controller;

import ci.company.eduops.school.dto.request.AppearanceUpdateRequest;
import ci.company.eduops.school.dto.request.SchoolSettingsUpdateRequest;
import ci.company.eduops.school.dto.response.AppearanceResponse;
import ci.company.eduops.school.dto.response.SchoolSettingsResponse;
import ci.company.eduops.school.service.SchoolSettingsService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Paramètres de l'établissement.
 *
 * <p>Le contrat annoncé par l'écran d'administration : la lecture demande
 * {@code SCHOOL_VIEW}, l'écriture {@code SCHOOL_MANAGE}. Le code et le statut
 * de l'école reviennent dans la réponse mais ne s'éditent nulle part.</p>
 */
@RestController
@RequestMapping("/api/v1/school")
@Tag(name = "School settings", description = "Identité, contact, préférences et numérotation de l'établissement")
public class SchoolSettingsController {

    private final SchoolSettingsService service;

    public SchoolSettingsController(SchoolSettingsService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_VIEW + "')")
    @Operation(summary = "Paramètres de l'établissement",
            description = "Identité, coordonnées, préférences (devise, langue, fuseau, échelle de "
                    + "notation) et gabarits de numérotation, tels qu'enregistrés.")
    public ResponseEntity<SchoolSettingsResponse> current() {
        return ResponseEntity.ok(service.current());
    }

    @PutMapping
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_MANAGE + "')")
    @Operation(summary = "Modifier les paramètres",
            description = "Seuls les champs réellement changés sont écrits et journalisés. Le code "
                    + "et le statut de l'établissement ne sont pas modifiables ici.")
    public ResponseEntity<SchoolSettingsResponse> update(
            @Valid @RequestBody SchoolSettingsUpdateRequest request) {
        return ResponseEntity.ok(service.update(request));
    }

    @GetMapping("/appearance")
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_VIEW + "')")
    @Operation(summary = "Apparence et région",
            description = "Couleur du portail, taille de police, devise, langue et fuseau "
                    + "enregistrés pour l'établissement — partagés par tous les postes.")
    public ResponseEntity<AppearanceResponse> appearance() {
        return ResponseEntity.ok(service.appearance());
    }

    @PutMapping("/appearance")
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_MANAGE + "')")
    @Operation(summary = "Modifier l'apparence et la région",
            description = "Couleur et taille de police vont dans les réglages de l'établissement ; "
                    + "devise, langue et fuseau sont les valeurs officielles qui suivent les documents.")
    public ResponseEntity<AppearanceResponse> updateAppearance(
            @Valid @RequestBody AppearanceUpdateRequest request) {
        return ResponseEntity.ok(service.updateAppearance(request));
    }

    @org.springframework.web.bind.annotation.PostMapping("/sequences/preview")
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_VIEW + "')")
    @Operation(summary = "Prévisualiser un gabarit de numérotation",
            description = "Valide le gabarit et génère un exemple de matricule")
    public ResponseEntity<java.util.Map<String, Object>> previewSequence(
            @RequestBody java.util.Map<String, Object> body) {
        String pattern = body.get("pattern") != null ? String.valueOf(body.get("pattern")) : null;
        Long nextNumber = null;
        if (body.get("nextNumber") != null) {
            try {
                nextNumber = Long.parseLong(String.valueOf(body.get("nextNumber")));
            } catch (NumberFormatException ignored) {}
        }
        String resetPolicy = body.get("resetPolicy") != null ? String.valueOf(body.get("resetPolicy")) : null;
        return ResponseEntity.ok(service.previewSequence(pattern, nextNumber, resetPolicy));
    }

    @PutMapping("/sequences/{scope}")
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_MANAGE + "')")
    @Operation(summary = "Mettre à jour la séquence d'attribution",
            description = "Modifie le prochain numéro et/ou la politique de réinitialisation")
    public ResponseEntity<ci.company.eduops.common.dto.SequenceStatus> updateSequence(
            @org.springframework.web.bind.annotation.PathVariable String scope,
            @RequestBody java.util.Map<String, Object> body) {
        Long nextNumber = null;
        if (body.get("nextNumber") != null) {
            try {
                nextNumber = Long.parseLong(String.valueOf(body.get("nextNumber")));
            } catch (NumberFormatException ignored) {}
        }
        String resetPolicy = body.get("resetPolicy") != null ? String.valueOf(body.get("resetPolicy")) : null;
        return ResponseEntity.ok(service.updateSequence(scope, nextNumber, resetPolicy));
    }
}
