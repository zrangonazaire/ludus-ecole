package ci.company.eduops.school.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.school.dto.request.OnboardingRequest;
import ci.company.eduops.school.dto.response.OnboardingResponse;
import ci.company.eduops.school.service.OnboardingService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/school")
@Tag(name = "Onboarding", description = "L'assistant de configuration initiale")
public class OnboardingController {

    private final OnboardingService onboardingService;

    public OnboardingController(OnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    @PostMapping("/onboarding")
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_MANAGE + "')")
    @Operation(summary = "Appliquer la configuration de l'assistant",
            description = """
                    Crée les cycles, niveaux, classes, matières et barèmes en une
                    seule transaction : soit l'établissement est configuré, soit
                    rien n'a bougé. Dix appels séparés laisseraient une école à
                    moitié faite le jour où le huitième échoue, sans que
                    personne sache quelle moitié.

                    Renvoie ce qui a réellement été créé — compté sur les lignes
                    enregistrées, jamais sur ce qui a été demandé.
                    """)
    @ApiResponses({
        @ApiResponse(responseCode = "409",
                description = "L'établissement a déjà des cycles : relancer "
                        + "l'assistant créerait tout en double",
                content = @Content(schema = @Schema(implementation = ApiError.class))),
        @ApiResponse(responseCode = "404",
                description = "Aucune année scolaire active",
                content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public OnboardingResponse apply(@Valid @RequestBody OnboardingRequest request) {
        return onboardingService.apply(request);
    }
}
