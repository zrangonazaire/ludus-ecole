package ci.company.eduops.guardian.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.guardian.dto.response.GuardianResponse;
import ci.company.eduops.guardian.service.GuardianService;
import ci.company.eduops.security.service.Permissions;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/guardians")
public class GuardianController {

    private final GuardianService guardianService;

    public GuardianController(GuardianService guardianService) {
        this.guardianService = guardianService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.GUARDIAN_VIEW + "')")
    public ResponseEntity<PageResponse<GuardianResponse>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search,
            Pageable ignored) {
        return ResponseEntity.ok(guardianService.search(page, size, search));
    }
}
