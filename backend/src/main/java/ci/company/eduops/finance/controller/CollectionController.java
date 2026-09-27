package ci.company.eduops.finance.controller;
import ci.company.eduops.finance.dto.request.CollectionActionRequest;
import ci.company.eduops.finance.dto.response.CollectionActionResponse;
import ci.company.eduops.finance.service.CollectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/v1/outstanding/{studentId}/actions")
public class CollectionController {
    private final CollectionService service;
    @GetMapping @PreAuthorize("hasAuthority('FINANCE_VIEW')")
    public List<CollectionActionResponse> history(@PathVariable UUID studentId,
            @RequestParam(required = false) UUID academicYearId) {
        return service.history(studentId, academicYearId);
    }
    @PostMapping @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public CollectionActionResponse create(@PathVariable UUID studentId,
            @RequestParam(required = false) UUID academicYearId,
            @Valid @RequestBody CollectionActionRequest request) {
        return service.create(studentId, academicYearId, request);
    }
}
