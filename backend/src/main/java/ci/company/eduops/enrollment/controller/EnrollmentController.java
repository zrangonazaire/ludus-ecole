package ci.company.eduops.enrollment.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.dto.request.EnrollmentCreateRequest;
import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.enrollment.service.EnrollmentCheckResult;
import ci.company.eduops.enrollment.service.EnrollmentService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/enrollments")
@Tag(name = "Enrollments", description = "Annual placement of students in classes")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CREATE + "')")
    @Operation(summary = "Enroll a student",
            description = """
                    Runs the full guard sequence in one transaction: student status,
                    academic year, double-enrollment, class capacity (under a row lock),
                    documents and admission status. Generates the applicable fees and
                    publishes `StudentEnrolledEvent`.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Student enrolled"),
            @ApiResponse(responseCode = "409", description = """
                    STUDENT_ALREADY_ENROLLED, CLASS_CAPACITY_EXCEEDED,
                    ACADEMIC_YEAR_NOT_ACTIVE or ENROLLMENT_WINDOW_CLOSED""",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<EnrollmentResponse> enroll(
            @Valid @RequestBody EnrollmentCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enrollmentService.enroll(request));
    }

    @GetMapping("/check")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Preview whether an enrollment is possible",
            description = "Returns every blocker at once plus the seat counts, without writing anything.")
    public ResponseEntity<EnrollmentCheckResult> check(@RequestParam UUID studentId,
                                                       @RequestParam(required = false) UUID academicYearId,
                                                       @RequestParam UUID classroomId) {
        return ResponseEntity.ok(enrollmentService.check(studentId, academicYearId, classroomId));
    }

    @PostMapping("/{id}/validate")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VALIDATE + "')")
    @Operation(summary = "Validate a draft enrollment")
    public ResponseEntity<EnrollmentResponse> validate(@PathVariable UUID id) {
        return ResponseEntity.ok(enrollmentService.validate(id));
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_CANCEL + "')")
    @Operation(summary = "Cancel an enrollment", description = "Frees the seat. A reason is mandatory.")
    public ResponseEntity<EnrollmentResponse> cancel(@PathVariable UUID id,
                                                     @Valid @RequestBody CancelRequest request) {
        return ResponseEntity.ok(enrollmentService.cancel(id, request.getReason()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Read one enrollment")
    public ResponseEntity<EnrollmentResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(enrollmentService.findById(id));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Search enrollments")
    public ResponseEntity<PageResponse<EnrollmentResponse>> search(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) UUID classroomId,
            @RequestParam(required = false) EnrollmentStatus status,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return ResponseEntity.ok(
                enrollmentService.search(academicYearId, classroomId, status, search, pageable));
    }

    @GetMapping("/students/{studentId}/history")
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "Full school history of a student",
            description = "Every enrollment across every academic year, most recent first.")
    public ResponseEntity<List<EnrollmentResponse>> history(@PathVariable UUID studentId) {
        return ResponseEntity.ok(enrollmentService.historyOf(studentId));
    }

    /** Body of {@code POST /enrollments/{id}/cancel}. */
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
