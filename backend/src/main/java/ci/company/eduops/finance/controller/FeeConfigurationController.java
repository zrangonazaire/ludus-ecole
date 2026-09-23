package ci.company.eduops.finance.controller;

import ci.company.eduops.approval.dto.response.ApprovalExecutionResponse;
import ci.company.eduops.approval.service.ApprovalExecutionService;
import ci.company.eduops.finance.dto.request.*;
import ci.company.eduops.finance.dto.response.*;
import ci.company.eduops.finance.service.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/fees")
public class FeeConfigurationController {
    private final FeeConfigurationService fees;
    private final FeeApprovalService changes;
    private final ApprovalExecutionService approvals;
    public FeeConfigurationController(FeeConfigurationService fees, FeeApprovalService changes, ApprovalExecutionService approvals) {
        this.fees = fees; this.changes = changes; this.approvals = approvals;
    }
    @GetMapping("/types") @PreAuthorize("hasAuthority('FINANCE_VIEW')")
    public List<FeeTypeResponse> listTypes(@RequestParam(required = false) UUID academicYearId) { return fees.listTypes(academicYearId); }
    @GetMapping("/levels") @PreAuthorize("hasAuthority('FINANCE_VIEW')")
    public List<LevelFeesResponse> overview(@RequestParam(required = false) UUID academicYearId) { return fees.overview(academicYearId); }
    @GetMapping("/levels/{id}") @PreAuthorize("hasAuthority('FINANCE_VIEW')")
    public LevelFeesResponse forLevel(@PathVariable UUID id, @RequestParam(required = false) UUID academicYearId) { return fees.forLevel(id, academicYearId); }

    @PostMapping("/types") @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    public ResponseEntity<ApprovalExecutionResponse> createType(@Valid @RequestBody FeeTypeUpsertRequest body, @RequestParam UUID circuitId) {
        return ResponseEntity.accepted().body(changes.submit("CREATE_TYPE", circuitId, null, null, body));
    }
    @PutMapping("/types/{id}") @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    public ResponseEntity<ApprovalExecutionResponse> updateType(@PathVariable UUID id, @Valid @RequestBody FeeTypeUpsertRequest body, @RequestParam UUID circuitId) {
        return ResponseEntity.accepted().body(changes.submit("UPDATE_TYPE", circuitId, id, null, body));
    }
    @PostMapping("/types/{id}/archive") @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    public ResponseEntity<ApprovalExecutionResponse> archiveType(@PathVariable UUID id, @RequestParam UUID circuitId) {
        return ResponseEntity.accepted().body(changes.submit("ARCHIVE_TYPE", circuitId, id, null, null));
    }
    @PutMapping("/schedules") @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    public ResponseEntity<ApprovalExecutionResponse> saveSchedule(@Valid @RequestBody FeeScheduleUpsertRequest body,
            @RequestParam UUID circuitId, @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.accepted().body(changes.submit("SAVE_SCHEDULE", circuitId, null, academicYearId, body));
    }
    @DeleteMapping("/schedules/{id}") @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    public ResponseEntity<ApprovalExecutionResponse> deleteSchedule(@PathVariable UUID id, @RequestParam UUID circuitId) {
        return ResponseEntity.accepted().body(changes.submit("DELETE_SCHEDULE", circuitId, id, null, null));
    }
    @PostMapping("/apply") @PreAuthorize("hasAuthority('FINANCE_MANAGE')")
    public ResponseEntity<ApprovalExecutionResponse> apply(@Valid @RequestBody FeeApplyRequest body,
            @RequestParam UUID circuitId, @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.accepted().body(changes.submit("APPLY_SCHEDULE", circuitId, null, academicYearId, body));
    }
    @GetMapping("/requests") @PreAuthorize("hasAuthority('FINANCE_VIEW')")
    public List<ApprovalExecutionResponse> requests() { return approvals.feeRequests(); }
    @PostMapping("/requests/{id}/decision") @PreAuthorize("hasAuthority('FINANCE_VIEW')")
    public ApprovalExecutionResponse decide(@PathVariable UUID id, @Valid @RequestBody DiscountRequestDecisionRequest body) {
        return changes.decide(id, body);
    }
}
