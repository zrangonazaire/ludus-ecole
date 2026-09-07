package ci.company.eduops.dashboard.controller;

import ci.company.eduops.dashboard.dto.response.DashboardResponse;
import ci.company.eduops.dashboard.service.DashboardService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard", description = "L'écran d'accueil de l'établissement")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.DASHBOARD_VIEW + "')")
    @Operation(summary = "Le tableau de bord de l'année active",
            description = """
                    Répond aussi pour un établissement qui vient d'être créé :
                    les listes sont vides et des messages indiquent quoi faire
                    ensuite. Une école sans élèves n'est pas une erreur, c'est
                    une école du premier jour.
                    """)
    public DashboardResponse load(@RequestParam(required = false) UUID academicYearId,
                                  @RequestParam(required = false) UUID campusId) {
        return dashboardService.load(academicYearId, campusId);
    }
}
