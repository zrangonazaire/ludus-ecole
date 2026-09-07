package ci.company.eduops.security.controller;

import ci.company.eduops.security.dto.AuthResponse;
import ci.company.eduops.security.dto.ChangePasswordRequest;
import ci.company.eduops.security.dto.CurrentUserResponse;
import ci.company.eduops.security.dto.LoginRequest;
import ci.company.eduops.security.dto.RefreshTokenRequest;
import ci.company.eduops.security.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    @Operation(summary = "Ouvrir une session")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request,
                                              HttpServletRequest servletRequest) {
        return ResponseEntity.ok(authenticationService.login(
                request, servletRequest.getHeader("User-Agent"), clientIp(servletRequest)));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renouveler et faire tourner les jetons")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request,
                                                HttpServletRequest servletRequest) {
        return ResponseEntity.ok(authenticationService.refresh(
                request.getRefreshToken(),
                servletRequest.getHeader("User-Agent"),
                clientIp(servletRequest)));
    }

    @GetMapping("/me")
    @Operation(summary = "Retourner l’identité et les droits du compte courant")
    public ResponseEntity<CurrentUserResponse> me() {
        return ResponseEntity.ok(authenticationService.me());
    }

    @PostMapping("/change-password")
    @Operation(summary = "Changer le mot de passe courant")
    public ResponseEntity<Void> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {
        authenticationService.changePassword(request);
        return ResponseEntity.noContent().build();
    }

    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",", 2)[0].trim();
        }
        return request.getRemoteAddr();
    }
}
