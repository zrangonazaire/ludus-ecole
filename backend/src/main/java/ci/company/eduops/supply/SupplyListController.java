package ci.company.eduops.supply;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/supply-lists")
@RequiredArgsConstructor
public class SupplyListController {
    private final SupplyListService service;

    @GetMapping("/years")
    @PreAuthorize("hasAuthority('LEVEL_VIEW')")
    public List<SupplyListService.YearOption> years() { return service.years(); }

    @GetMapping("/{levelId}/{yearId}")
    @PreAuthorize("hasAuthority('LEVEL_VIEW')")
    public SupplyListService.Response get(@PathVariable UUID levelId, @PathVariable UUID yearId) {
        return service.get(levelId, yearId);
    }

    @PutMapping("/{levelId}/{yearId}")
    @PreAuthorize("hasAuthority('LEVEL_MANAGE')")
    public SupplyListService.Response save(@PathVariable UUID levelId, @PathVariable UUID yearId,
                                           @Valid @RequestBody SupplyListRequest request) {
        return service.save(levelId, yearId, request);
    }
}
