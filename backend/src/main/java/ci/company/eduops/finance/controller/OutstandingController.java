package ci.company.eduops.finance.controller;

import ci.company.eduops.finance.dto.response.OutstandingBoardResponse;
import ci.company.eduops.finance.service.OutstandingService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/outstanding")
@Tag(name = "Outstanding", description = "Collection board for unpaid school fees")
public class OutstandingController {

    private final OutstandingService service;

    public OutstandingController(OutstandingService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_VIEW + "')")
    @Operation(summary = "List and aggregate outstanding family balances")
    public ResponseEntity<OutstandingBoardResponse> board(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "ALL") String bucket,
            Pageable pageable) {
        return ResponseEntity.ok(service.board(academicYearId, search, bucket, pageable));
    }
}
