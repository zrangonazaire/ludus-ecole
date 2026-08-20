package ci.company.eduops.payment.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.payment.domain.PaymentStatus;
import ci.company.eduops.payment.dto.request.PaymentCreateRequest;
import ci.company.eduops.payment.dto.response.PaymentResponse;
import ci.company.eduops.payment.service.PaymentService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Payment endpoints.
 *
 * <p>The controller only validates the transport contract and delegates: every
 * financial rule lives in {@link PaymentService}.</p>
 */
@RestController
@RequestMapping("/api/v1/payments")
@Tag(name = "Payments", description = "Recording payments, receipts and cancellations")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.PAYMENT_CREATE + "')")
    @Operation(summary = "Record a payment",
            description = """
                    Atomic and idempotent. Sending the same `operationId` twice returns the
                    payment created by the first call instead of duplicating it.

                    When `allocations` is empty the server settles the oldest outstanding
                    instalments first.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Payment recorded and receipt issued"),
            @ApiResponse(responseCode = "200", description = "Replay of a known operationId"),
            @ApiResponse(responseCode = "400", description = "PAYMENT_AMOUNT_INVALID",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "PAYMENT_ALREADY_PROCESSED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<PaymentResponse> record(@Valid @RequestBody PaymentCreateRequest request) {
        PaymentResponse response = paymentService.recordPayment(request);
        // A replay returns 200; a genuinely new payment returns 201.
        boolean replayed = response.getValidatedAt() != null
                && response.getReceiptNumber() != null
                && response.getAllocations().isEmpty()
                && response.getOutstandingAfterPayment() == null;
        return ResponseEntity.status(replayed ? HttpStatus.OK : HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasAuthority('" + Permissions.PAYMENT_CANCEL + "')")
    @Operation(summary = "Cancel a payment",
            description = """
                    Never deletes anything: the allocations are reversed, the balances are
                    recomputed and the receipt is marked cancelled. A reason is mandatory.
                    """)
    public ResponseEntity<PaymentResponse> cancel(@PathVariable UUID id,
                                                  @Valid @RequestBody CancelRequest request) {
        return ResponseEntity.ok(paymentService.cancelPayment(id, request.getReason()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.PAYMENT_VIEW + "')")
    @Operation(summary = "Read one payment")
    public ResponseEntity<PaymentResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(paymentService.findById(id));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.PAYMENT_VIEW + "')")
    @Operation(summary = "Search payments")
    public ResponseEntity<PageResponse<PaymentResponse>> search(
            @Parameter(description = "Defaults to the active academic year")
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) PaymentStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return ResponseEntity.ok(
                paymentService.search(academicYearId, status, from, to, search, pageable));
    }

    /** Body of {@code POST /payments/{id}/cancel}. */
    public static class CancelRequest {

        @NotBlank(message = "A cancellation reason is required")
        private String reason;

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }
}
