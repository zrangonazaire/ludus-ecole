package ci.company.eduops.portal.controller;

import ci.company.eduops.classroom.dto.response.ClassroomResponse;
import ci.company.eduops.portal.service.PortalService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * The teacher's own view.
 *
 * <p>Deliberately takes no teacher id. The server derives it from the
 * authenticated account: a route that accepted {@code ?teacherId=…} would let
 * any teacher read a colleague's classes by editing the address bar.</p>
 */
@RestController
@RequestMapping("/api/v1/teacher")
@Tag(name = "Teacher portal", description = "L'espace du professeur")
public class TeacherPortalController {

    private final PortalService portalService;

    public TeacherPortalController(PortalService portalService) {
        this.portalService = portalService;
    }

    @GetMapping("/classes")
    @PreAuthorize("hasAuthority('" + Permissions.PORTAL_TEACHER + "')")
    @Operation(summary = "Mes classes",
            description = "Déduites du compte connecté, jamais d'un paramètre.")
    public List<ClassroomResponse> myClasses() {
        return portalService.classesOfCurrentTeacher();
    }
}
