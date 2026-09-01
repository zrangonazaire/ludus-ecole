package ci.company.eduops.assessment.controller;

import ci.company.eduops.assessment.domain.AssessmentStatus;
import ci.company.eduops.assessment.dto.request.AssessmentUpsertRequest;
import ci.company.eduops.assessment.dto.request.GradeCorrectionRequest;
import ci.company.eduops.assessment.dto.request.GradeSheetSaveRequest;
import ci.company.eduops.assessment.dto.response.AssessmentBoardResponse;
import ci.company.eduops.assessment.dto.response.AssessmentResponse;
import ci.company.eduops.assessment.dto.response.GradeSheetResponse;
import ci.company.eduops.assessment.service.AssessmentService;
import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/assessments")
@Tag(name = "Assessments", description = "Devoirs, saisie des notes et validation")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.ASSESSMENT_VIEW + "')")
    @Operation(summary = "Les devoirs d'une période",
            description = """
                    Chaque devoir arrive avec l'avancement de sa correction, pas
                    seulement son état. « En correction » ne dit rien d'utile ;
                    « 12 notes sur 34 » dit si le professeur a commencé ou s'il a
                    presque fini.

                    Les compteurs nomment les deux blocages qui ne se voient nulle
                    part ailleurs et qui retardent les bulletins : les copies
                    passées mais non corrigées, et les notes saisies qui attendent
                    la validation.
                    """)
    public ResponseEntity<AssessmentBoardResponse> board(
            @RequestParam(required = false) UUID termId,
            @RequestParam(required = false) UUID classroomId,
            @RequestParam(required = false) UUID subjectId,
            @RequestParam(required = false) AssessmentStatus status,
            @RequestParam(defaultValue = "false") boolean includeCancelled,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(assessmentService.board(
                termId, classroomId, subjectId, status, includeCancelled, academicYearId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.ASSESSMENT_CREATE + "')")
    @Operation(summary = "Planifier un devoir",
            description = """
                    Trois refus sont tenus ici plutôt que laissés à l'écran :

                    - une date hors de la période retenue ferait entrer la note dans
                      le mauvais bulletin, et rien en aval ne s'en apercevrait ;
                    - une matière absente du programme du niveau n'a pas de
                      coefficient : la note ne pourrait entrer dans aucune moyenne ;
                    - seul l'enseignant affecté à cette classe pour cette matière peut
                      être porté sur le devoir, sinon les notes n'apparaissent sur
                      aucun de ses écrans et personne n'est responsable de la
                      correction.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Devoir planifié"),
            @ApiResponse(responseCode = "400", description = "ASSESSMENT_DATE_OUTSIDE_TERM",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "403", description = "TEACHER_NOT_ASSIGNED",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "CURRICULUM_SUBJECT_NOT_FOUND",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<AssessmentResponse> create(
            @Valid @RequestBody AssessmentUpsertRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(assessmentService.create(request, academicYearId));
    }

    @PutMapping("/{assessmentId}")
    @PreAuthorize("hasAuthority('" + Permissions.ASSESSMENT_MANAGE + "')")
    @Operation(summary = "Corriger la description d'un devoir",
            description = "Le barème est figé dès la première note saisie : le changer "
                    + "après coup ferait bouger toutes les notes déjà entrées sans que "
                    + "personne y touche.")
    public ResponseEntity<AssessmentResponse> update(
            @PathVariable UUID assessmentId,
            @Valid @RequestBody AssessmentUpsertRequest request) {
        return ResponseEntity.ok(assessmentService.update(assessmentId, request));
    }

    @PostMapping("/{assessmentId}/status")
    @PreAuthorize("hasAuthority('" + Permissions.ASSESSMENT_MANAGE + "')")
    @Operation(summary = "Faire avancer un devoir",
            description = """
                    Les passages autorisés sont ceux du cycle de vie : annoncé →
                    saisie ouverte → en correction → à valider → validé → publié.
                    Un devoir peut être annulé tant qu'il n'est pas publié.

                    Ouvrir la saisie crée les lignes vides de la classe, pour que la
                    feuille s'ouvre sur la liste réelle des inscrits.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Devoir mis à jour"),
            @ApiResponse(responseCode = "409", description = "ASSESSMENT_INVALID_TRANSITION",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<AssessmentResponse> changeStatus(
            @PathVariable UUID assessmentId,
            @RequestParam AssessmentStatus target) {
        return ResponseEntity.ok(assessmentService.changeStatus(assessmentId, target));
    }

    @GetMapping("/{assessmentId}/grades")
    @PreAuthorize("hasAuthority('" + Permissions.GRADE_VIEW + "')")
    @Operation(summary = "La feuille de notes d'un devoir",
            description = """
                    Les notes viennent avec la distribution : moyenne, médiane,
                    extrêmes, nombre d'élèves ayant la moyenne. C'est ce qu'il faut
                    voir avant de valider — une copie où les deux tiers de la classe
                    sont sous 5 est rarement une mauvaise classe, c'est le plus
                    souvent un sujet trop dur ou un barème mal saisi.
                    """)
    public ResponseEntity<GradeSheetResponse> grades(@PathVariable UUID assessmentId) {
        return ResponseEntity.ok(assessmentService.sheet(assessmentId));
    }

    @PutMapping("/{assessmentId}/grades")
    @PreAuthorize("hasAuthority('" + Permissions.GRADE_CREATE + "')")
    @Operation(summary = "Enregistrer les notes en brouillon",
            description = """
                    Enregistrer n'est pas soumettre. Une correction étalée sur une
                    soirée doit survivre à un navigateur fermé, et rien de ce qui est
                    encore en cours de saisie ne doit apparaître comme définitif au
                    secrétariat.

                    Une note vide n'est pas un zéro : un zéro se saisit. Un élève
                    absent se marque absent — sa note ne compte pas dans la moyenne,
                    elle n'est pas comptée zéro.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Notes enregistrées"),
            @ApiResponse(responseCode = "400", description = "GRADE_OUT_OF_RANGE",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "ASSESSMENT_NOT_OPEN, "
                    + "GRADE_ALREADY_PUBLISHED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<GradeSheetResponse> saveGrades(
            @PathVariable UUID assessmentId,
            @Valid @RequestBody GradeSheetSaveRequest request) {
        return ResponseEntity.ok(assessmentService.saveGrades(assessmentId, request));
    }

    @PostMapping("/{assessmentId}/submit")
    @PreAuthorize("hasAuthority('" + Permissions.GRADE_CREATE + "')")
    @Operation(summary = "Soumettre les notes à la validation",
            description = "Refusé tant qu'un élève n'a ni note ni absence. Une note "
                    + "manquante ne se voit pas dans une moyenne : l'élève pèse "
                    + "simplement moins, en silence.")
    public ResponseEntity<GradeSheetResponse> submit(@PathVariable UUID assessmentId) {
        return ResponseEntity.ok(assessmentService.submit(assessmentId));
    }

    @PostMapping("/{assessmentId}/validate")
    @PreAuthorize("hasAuthority('" + Permissions.GRADE_VALIDATE + "')")
    @Operation(summary = "Valider les notes d'un devoir",
            description = "À partir d'ici les notes comptent dans les moyennes. Les "
                    + "familles ne les voient pas encore : c'est la publication qui "
                    + "les leur montre.")
    public ResponseEntity<GradeSheetResponse> validate(@PathVariable UUID assessmentId) {
        return ResponseEntity.ok(assessmentService.validate(assessmentId));
    }

    @PostMapping("/{assessmentId}/publish")
    @PreAuthorize("hasAuthority('" + Permissions.GRADE_PUBLISH + "')")
    @Operation(summary = "Publier les notes aux familles",
            description = "Après la publication, plus rien ne change en silence : "
                    + "toute correction exige un motif écrit, conservé avec l'ancienne "
                    + "valeur.")
    public ResponseEntity<GradeSheetResponse> publish(@PathVariable UUID assessmentId) {
        return ResponseEntity.ok(assessmentService.publish(assessmentId));
    }

    @PostMapping("/grades/{gradeId}/correct")
    @PreAuthorize("hasAuthority('" + Permissions.GRADE_CORRECT_PUBLISHED + "')")
    @Operation(summary = "Corriger une note validée ou publiée",
            description = """
                    L'ancienne valeur et le motif sont conservés dans une révision.
                    Sans cette trace, une note corrigée et une note trafiquée se
                    ressemblent, et l'élève n'a aucun moyen de contester.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Note corrigée"),
            @ApiResponse(responseCode = "400", description = "GRADE_JUSTIFICATION_REQUIRED",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<GradeSheetResponse> correct(
            @PathVariable UUID gradeId,
            @Valid @RequestBody GradeCorrectionRequest request) {
        return ResponseEntity.ok(assessmentService.correct(gradeId, request));
    }
}
