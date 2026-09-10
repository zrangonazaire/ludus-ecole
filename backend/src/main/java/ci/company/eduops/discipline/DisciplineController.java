package ci.company.eduops.discipline;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/discipline/incidents")
public class DisciplineController {
    private final DisciplineService service;
    public DisciplineController(DisciplineService service) { this.service = service; }

    public record IncidentRequest(@NotNull UUID studentId, @NotNull @PastOrPresent LocalDate incidentDate,
        @NotBlank @Pattern(regexp="BEHAVIOR|VIOLENCE|CHEATING|ABSENTEEISM|LATENESS|PROPERTY_DAMAGE|OTHER") String incidentType,
        @NotBlank @Pattern(regexp="LOW|MEDIUM|HIGH|CRITICAL") String severity,
        @NotBlank @Size(max=5000) String description, @Size(max=150) String location) {}
    public record UpdateRequest(@NotBlank @Pattern(regexp="REPORTED|UNDER_REVIEW|ACTION_TAKEN|CLOSED|CANCELLED") String status,
        boolean guardianInformed, @NotNull Long version) {}
    public record ActionRequest(@NotBlank @Pattern(regexp="WARNING|DETENTION|PARENT_MEETING|SUSPENSION|EXPULSION|OTHER") String actionType,
        @NotBlank @Size(max=5000) String description) {}

    @GetMapping
    @PreAuthorize("hasAuthority('DISCIPLINE_VIEW')")
    public List<Map<String,Object>> list() { return service.list(); }

    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('DISCIPLINE_MANAGE')")
    public void create(@Valid @RequestBody IncidentRequest request) { service.create(request); }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('DISCIPLINE_MANAGE')")
    public void update(@PathVariable UUID id, @Valid @RequestBody UpdateRequest request) { service.update(id, request); }

    @PostMapping("/{id}/actions")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('DISCIPLINE_MANAGE')")
    public void action(@PathVariable UUID id, @Valid @RequestBody ActionRequest request) { service.action(id, request); }
}
