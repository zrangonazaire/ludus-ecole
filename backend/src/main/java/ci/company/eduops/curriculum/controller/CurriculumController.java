package ci.company.eduops.curriculum.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.curriculum.dto.request.CurriculumApplyRequest;
import ci.company.eduops.curriculum.dto.request.CurriculumSubjectUpsertRequest;
import ci.company.eduops.curriculum.dto.response.LevelCurriculumResponse;
import ci.company.eduops.curriculum.service.CurriculumService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/v1/curriculum")
@Tag(name = "Curriculum", description = "Programme et coefficients, niveau par niveau")
public class CurriculumController {

    private final CurriculumService curriculumService;

    public CurriculumController(CurriculumService curriculumService) {
        this.curriculumService = curriculumService;
    }

    @GetMapping("/levels")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_VIEW + "')")
    @Operation(summary = "Programme de tous les niveaux",
            description = """
                    Renvoie chaque niveau de l'établissement, y compris ceux qui n'ont
                    aucun programme : ce sont eux qui empêchent la publication des
                    bulletins, ils ont donc leur place dans la liste. Le total des
                    coefficients ne compte que les matières notées.
                    """)
    public ResponseEntity<List<LevelCurriculumResponse>> overview(
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(curriculumService.overview(academicYearId));
    }

    @GetMapping("/levels/{levelId}")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_VIEW + "')")
    @Operation(summary = "Programme d'un niveau")
    public ResponseEntity<LevelCurriculumResponse> forLevel(
            @PathVariable UUID levelId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(curriculumService.forLevel(levelId, academicYearId));
    }

    @PutMapping("/levels/{levelId}/subjects")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Rattacher une matière à un niveau, ou modifier son coefficient",
            description = "Le programme du niveau est créé automatiquement au premier "
                    + "rattachement. Un coefficient nul ou négatif est refusé.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Programme mis à jour"),
            @ApiResponse(responseCode = "400", description = "COEFFICIENT_OUT_OF_RANGE",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<LevelCurriculumResponse> upsertSubject(
            @PathVariable UUID levelId,
            @Valid @RequestBody CurriculumSubjectUpsertRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                curriculumService.upsertSubject(levelId, request, academicYearId));
    }

    @DeleteMapping("/levels/{levelId}/subjects/{subjectId}")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Retirer une matière du programme d'un niveau",
            description = "Refusé si des évaluations existent déjà pour cette matière "
                    + "sur ce niveau : les notes pointeraient vers un coefficient disparu "
                    + "et toutes les moyennes déjà calculées changeraient en silence.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Matière retirée"),
            @ApiResponse(responseCode = "409", description = "CURRICULUM_SUBJECT_HAS_GRADES",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<LevelCurriculumResponse> removeSubject(
            @PathVariable UUID levelId, @PathVariable UUID subjectId,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(
                curriculumService.removeSubject(levelId, subjectId, academicYearId));
    }

    @PostMapping("/apply")
    @PreAuthorize("hasAuthority('" + Permissions.CURRICULUM_MANAGE + "')")
    @Operation(summary = "Appliquer un même programme à plusieurs niveaux",
            description = """
                    Dans un cycle, le programme change rarement d'un niveau à l'autre.
                    Remplir quatre fois le même tableau, c'est quatre occasions de se
                    tromper de coefficient — et un coefficient erroné reste invisible
                    jusqu'au premier bulletin.

                    Avec `replaceExisting` à faux, seules les matières absentes sont
                    ajoutées : les exceptions volontaires d'un niveau sont préservées.
                    Une matière portant déjà des évaluations n'est jamais retirée,
                    même en mode remplacement.
                    """)
    public ResponseEntity<List<LevelCurriculumResponse>> apply(
            @Valid @RequestBody CurriculumApplyRequest request,
            @RequestParam(required = false) UUID academicYearId) {
        return ResponseEntity.ok(curriculumService.applyToLevels(request, academicYearId));
    }
}
