package ci.company.eduops.student.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.finance.dto.response.StudentFinancialSummaryResponse;
import ci.company.eduops.reportcard.dto.response.ReportCardResponse;
import ci.company.eduops.reportcard.service.ReportCardService;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.student.dto.request.StudentUpdateRequest;
import ci.company.eduops.student.dto.response.StudentDetailResponse;
import ci.company.eduops.student.dto.response.StudentSummaryResponse;
import ci.company.eduops.student.service.StudentQueryService;
import ci.company.eduops.student.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/students")
@Tag(name = "Students", description = "Dossiers des élèves")
public class StudentController {

    private final StudentQueryService studentQueryService;
    private final StudentService studentService;
    private final ReportCardService reportCardService;

    public StudentController(StudentQueryService studentQueryService,
                             StudentService studentService,
                             ReportCardService reportCardService) {
        this.studentQueryService = studentQueryService;
        this.studentService = studentService;
        this.reportCardService = reportCardService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.STUDENT_VIEW + "')")
    @Operation(summary = "Rechercher des élèves",
            description = "Recherche sur le nom, le prénom et le matricule. "
                    + "La taille de page est bornée à 200 : une école ne se "
                    + "charge pas d'un seul coup depuis la barre d'adresse.")
    public PageResponse<StudentSummaryResponse> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) UUID classroomId) {
        return studentQueryService.search(page, size, search, status, classroomId);
    }

    @GetMapping("/{studentId}")
    @PreAuthorize("hasAuthority('" + Permissions.STUDENT_VIEW + "')")
    @Operation(summary = "La fiche d'un élève",
            description = "Identité, responsables légaux, inscription en cours "
                    + "et solde. Sans le dossier médical, qui relève d'un droit "
                    + "distinct.")
    @ApiResponses(@ApiResponse(responseCode = "404", description = "Élève inconnu",
            content = @Content(schema = @Schema(implementation = ApiError.class))))
    public StudentDetailResponse detail(@PathVariable UUID studentId) {
        return studentQueryService.detail(studentId);
    }

    @PutMapping("/{studentId}")
    @PreAuthorize("hasAuthority('" + Permissions.STUDENT_UPDATE + "')")
    @Operation(summary = "Corriger l'état civil d'un élève",
            description = "Mise à jour partielle : un champ absent reste inchangé. "
                    + "Le matricule et le statut ne passent jamais par ici.")
    public StudentDetailResponse update(@PathVariable UUID studentId,
                                        @jakarta.validation.Valid @RequestBody StudentUpdateRequest request) {
        studentService.update(studentId, request);
        return studentQueryService.detail(studentId);
    }

    @GetMapping({"/{studentId}/enrollments", "/{studentId}/history"})
    @PreAuthorize("hasAuthority('" + Permissions.ENROLLMENT_VIEW + "')")
    @Operation(summary = "L'historique des inscriptions de l'élève")
    public List<EnrollmentResponse> enrollments(@PathVariable UUID studentId) {
        return studentQueryService.enrollments(studentId);
    }

    @GetMapping("/{studentId}/financial-summary")
    @PreAuthorize("hasAuthority('" + Permissions.FINANCE_VIEW + "')")
    @Operation(summary = "Ce que la famille doit pour l'année",
            description = "Recalculé à la lecture : un total figé continuerait "
                    + "d'afficher une dette le lendemain de son règlement.")
    public StudentFinancialSummaryResponse financialSummary(
            @PathVariable UUID studentId,
            @RequestParam(required = false) UUID academicYearId) {
        return studentQueryService.financialSummary(studentId, academicYearId);
    }

    @GetMapping("/{studentId}/report-cards")
    @PreAuthorize("hasAuthority('" + Permissions.REPORT_CARD_VIEW + "')")
    @Operation(summary = "Les bulletins de l'élève, du plus récent au plus ancien")
    public List<ReportCardResponse> reportCards(@PathVariable UUID studentId) {
        return reportCardService.forStudent(studentId);
    }
}
