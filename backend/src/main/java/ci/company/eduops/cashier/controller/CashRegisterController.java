package ci.company.eduops.cashier.controller;

import ci.company.eduops.cashier.service.CashRegisterService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cash/registers")
@PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('SCHOOL_ADMIN') or hasAuthority('USER_MANAGE')")
public class CashRegisterController {
    private final CashRegisterService service;
    private final ci.company.eduops.cashier.service.CashService cashService;

    public CashRegisterController(CashRegisterService service,
                                  ci.company.eduops.cashier.service.CashService cashService) {
        this.service = service;
        this.cashService = cashService;
    }

    public record RegisterRequest(@NotBlank @Size(max = 100) String name, @NotNull UUID cashierUserId) { }
    public record OpenRequest(@NotNull @DecimalMin("0") @Digits(integer = 13, fraction = 2) java.math.BigDecimal openingBalance,
                              @Size(max = 2000) String notes) { }

    @GetMapping
    public CashRegisterService.Overview overview() { return service.overview(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CashRegisterService.RegisterResponse create(@Valid @RequestBody RegisterRequest request) {
        return service.create(request.name(), request.cashierUserId());
    }

    @PutMapping("/{id}")
    public CashRegisterService.RegisterResponse update(@PathVariable UUID id,
                                                       @Valid @RequestBody RegisterRequest request) {
        return service.update(id, request.name(), request.cashierUserId());
    }

    @PostMapping("/{id}/open")
    @ResponseStatus(HttpStatus.CREATED)
    public ci.company.eduops.cashier.service.CashService.Session open(
            @PathVariable UUID id, @Valid @RequestBody OpenRequest request) {
        return cashService.openForRegister(id, request.openingBalance(), request.notes());
    }
}
