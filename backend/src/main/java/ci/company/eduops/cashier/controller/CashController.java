package ci.company.eduops.cashier.controller;

import ci.company.eduops.cashier.service.CashService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/v1/cash/sessions")
@PreAuthorize("hasAuthority('CASH_SESSION_MANAGE')")
public class CashController {
    private final CashService service;
    public CashController(CashService service) { this.service=service; }
    public record OpenRequest(@NotNull @DecimalMin("0") @Digits(integer=13,fraction=2) BigDecimal openingBalance, @Size(max=2000) String notes) {}
    public record CloseRequest(@NotNull @DecimalMin("0") @Digits(integer=13,fraction=2) BigDecimal actualBalance,
        @NotNull @DecimalMin("0") @Digits(integer=13,fraction=2) BigDecimal expectedBalance, @Size(max=2000) String notes) {}
    @GetMapping public List<CashService.Session> list() { return service.list(); }
    @GetMapping("/{id}/movements") public List<CashService.Movement> movements(@PathVariable UUID id) { return service.movements(id); }
    @PostMapping @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public CashService.Session open(@Valid @RequestBody OpenRequest r) { return service.open(r.openingBalance(),r.notes()); }
    @PostMapping("/{id}/close") public CashService.Session close(@PathVariable UUID id,@Valid @RequestBody CloseRequest r) {
        return service.close(id,r.actualBalance(),r.expectedBalance(),r.notes());
    }
}
