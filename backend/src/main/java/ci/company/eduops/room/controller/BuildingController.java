package ci.company.eduops.room.controller;

import ci.company.eduops.room.dto.request.BuildingUpsertRequest;
import ci.company.eduops.room.dto.response.BuildingResponse;
import ci.company.eduops.room.service.BuildingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/buildings")
public class BuildingController {
    private final BuildingService service;
    public BuildingController(BuildingService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('ROOM_VIEW')")
    public List<BuildingResponse> list(@RequestParam(required = false) UUID campusId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "false") boolean includeArchived) {
        return service.list(campusId, search, includeArchived);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROOM_MANAGE')")
    public BuildingResponse create(@Valid @RequestBody BuildingUpsertRequest request) {
        return service.create(request);
    }

    @PostMapping("/{id}/levels")
    @PreAuthorize("hasAuthority('ROOM_MANAGE')")
    public BuildingResponse addLevel(@PathVariable UUID id) { return service.addLevel(id); }
}
