package ci.company.eduops.school.controller;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.school.dto.request.SignupRequest;
import ci.company.eduops.school.dto.response.SignupResponse;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.school.service.SignupService;
import ci.company.eduops.security.repository.AppUserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Public endpoints, reachable without authentication.
 *
 * <p>Mapped under {@code /api/v1/public/**}, which {@code SecurityConfig}
 * permits anonymously.</p>
 */
@RestController
@RequestMapping("/api/v1/public")
@Tag(name = "Public", description = "Inscription et vérifications, sans authentification")
@SecurityRequirements
public class PublicSignupController {

    private final SignupService signupService;
    private final SchoolRepository schoolRepository;
    private final AppUserRepository userRepository;

    public PublicSignupController(SignupService signupService,
                                  SchoolRepository schoolRepository,
                                  AppUserRepository userRepository) {
        this.signupService = signupService;
        this.schoolRepository = schoolRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    @Operation(summary = "Créer un établissement et son compte administrateur",
            description = """
                    Créé en une seule transaction l'établissement, son campus principal,
                    l'année scolaire en cours avec ses trois trimestres, et le compte
                    administrateur. Renvoie directement des jetons pour enchainer sur
                    l'assistant de démarrage.
                    """)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Établissement créé"),
            @ApiResponse(responseCode = "409", description = "Code établissement ou email déjà utilisé",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides ou mot de passe trop faible",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(signupService.signup(request));
    }

    @GetMapping("/check-school-code")
    @Operation(summary = "Vérifier la disponibilité d'un code établissement",
            description = "Permet au formulaire d'inscription de prevenir avant l'envoi.")
    public ResponseEntity<Map<String, Object>> checkSchoolCode(@RequestParam String code) {
        String normalised = code == null ? "" : code.trim().toUpperCase();
        boolean available = normalised.length() >= 2 && !schoolRepository.existsByCode(normalised);
        return ResponseEntity.ok(Map.of(
                "code", normalised,
                "available", available));
    }

    @GetMapping("/check-email")
    @Operation(summary = "Vérifier la disponibilité d'un email")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
        String normalised = email == null ? "" : email.trim().toLowerCase();
        boolean available = !normalised.isBlank()
                && !userRepository.existsByEmailIgnoreCase(normalised);
        return ResponseEntity.ok(Map.of(
                "email", normalised,
                "available", available));
    }
}
