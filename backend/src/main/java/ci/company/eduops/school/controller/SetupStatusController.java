package ci.company.eduops.school.controller;

import ci.company.eduops.school.dto.response.SetupStatusResponse;
import ci.company.eduops.school.service.SetupStatusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Configuration progress of the caller's school. */
@RestController
@RequestMapping("/api/v1/school")
@Tag(name = "School", description = "Etablissement et avancement de sa configuration")
public class SetupStatusController {

    private final SetupStatusService setupStatusService;

    public SetupStatusController(SetupStatusService setupStatusService) {
        this.setupStatusService = setupStatusService;
    }

    @GetMapping("/setup-status")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Avancement de la configuration",
            description = """
                    Recalcule a chaque appel a partir des donnees reelles : cycles, niveaux,
                    classes, matieres, frais, enseignants et inscriptions. Une etape realisee
                    en dehors de l'assistant est donc reconnue automatiquement.
                    """)
    public ResponseEntity<SetupStatusResponse> setupStatus() {
        return ResponseEntity.ok(setupStatusService.currentStatus());
    }
}
