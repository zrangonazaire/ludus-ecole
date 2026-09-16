package ci.company.eduops.security.controller;

import ci.company.eduops.security.dto.*;
import ci.company.eduops.security.service.UserManagementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@PreAuthorize("hasAuthority('USER_MANAGE')")
public class UserManagementController {
    private final UserManagementService service;
    public UserManagementController(UserManagementService service) { this.service = service; }

    @GetMapping
    public List<ManagedUserResponse> list() { return service.list(); }

    @GetMapping("/profiles")
    public List<ManagedUserResponse.Profile> profiles() { return service.profiles(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ManagedUserResponse create(@Valid @RequestBody UserCreateRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}/profiles")
    public ManagedUserResponse updateProfiles(@PathVariable UUID id,
            @Valid @RequestBody UserProfilesRequest request) {
        return service.updateProfiles(id, request);
    }
}
