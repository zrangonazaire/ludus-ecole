package ci.company.eduops.portal.controller;

import ci.company.eduops.portal.dto.response.StudentDashboardResponse;
import ci.company.eduops.portal.service.PortalService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The pupil's own space.
 *
 * <p>Takes no pupil id, on purpose. The server resolves it from the connected
 * account: a route that accepted one would let any pupil read a classmate's
 * marks by editing the address bar.</p>
 */
@RestController
@RequestMapping("/api/v1/student")
@Tag(name = "Student portal", description = "L'espace de l'élève")
public class StudentPortalController {

    private final PortalService portalService;

    public StudentPortalController(PortalService portalService) {
        this.portalService = portalService;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('" + Permissions.PORTAL_STUDENT + "')")
    @Operation(summary = "Mon espace",
            description = "Déduit du compte connecté. Ne contient rien qui "
                    + "concerne un autre élève : ni rang, ni moyenne de classe.")
    public StudentDashboardResponse dashboard() {
        return portalService.studentDashboard();
    }
}
