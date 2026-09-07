package ci.company.eduops.reference.controller;

import ci.company.eduops.dashboard.dto.response.AcademicYearSummary;
import ci.company.eduops.dashboard.dto.response.TermSummary;
import ci.company.eduops.reference.dto.response.GlobalSearchResultResponse;
import ci.company.eduops.reference.service.ReferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Reference lists and the global search box.
 *
 * <p>Two separate paths under one controller: {@code /academic-years} is the
 * calendar every screen needs, {@code /search} is the bar at the top of all of
 * them. Both are open to any authenticated user — a list of school years
 * reveals nothing, and refusing it would block the configuration wizard for
 * the very people meant to run it.</p>
 */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Reference", description = "Années, trimestres et recherche globale")
public class ReferenceController {

    private final ReferenceService referenceService;

    public ReferenceController(ReferenceService referenceService) {
        this.referenceService = referenceService;
    }

    @GetMapping("/academic-years")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Les années scolaires de l'établissement")
    public List<AcademicYearSummary> academicYears() {
        return referenceService.academicYears();
    }

    @GetMapping("/academic-years/{academicYearId}/terms")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Les trimestres d'une année, dans l'ordre")
    public List<TermSummary> terms(@PathVariable UUID academicYearId) {
        return referenceService.terms(academicYearId);
    }

    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "La recherche globale",
            description = "Élèves, responsables et classes. Sous deux "
                    + "caractères, rien n'est renvoyé : une seule lettre "
                    + "ramènerait la moitié de l'école.")
    public List<GlobalSearchResultResponse> search(@RequestParam(name = "q") String query) {
        return referenceService.search(query);
    }
}
