package ci.company.eduops.academicyear.controller;

import ci.company.eduops.academicyear.dto.request.AcademicYearCreateRequest;
import ci.company.eduops.academicyear.dto.response.AcademicYearResponse;
import ci.company.eduops.academicyear.service.AcademicYearService;
import ci.company.eduops.security.service.Permissions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Les années scolaires de l'établissement.
 *
 * <p>Sous {@code /school} et non sous {@code /academic-years} : ce dernier
 * chemin est déjà pris par les données de référence, en lecture seule et
 * ouvertes à tout compte authentifié. L'écriture demande, elle,
 * {@code ACADEMIC_YEAR_MANAGE}.</p>
 */
@RestController
@RequestMapping("/api/v1/school/academic-years")
@Tag(name = "Années scolaires", description = "Création, découpage et bascule d'année")
public class AcademicYearController {

    private final AcademicYearService service;

    public AcademicYearController(AcademicYearService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Les années de l'établissement, de la plus récente à la plus ancienne")
    @PreAuthorize("hasAuthority('" + Permissions.ACADEMIC_YEAR_VIEW + "')")
    public ResponseEntity<List<AcademicYearResponse>> list() {
        return ResponseEntity.ok(service.list());
    }

    @GetMapping("/{yearId}")
    @Operation(summary = "Une année et ses périodes")
    @PreAuthorize("hasAuthority('" + Permissions.ACADEMIC_YEAR_VIEW + "')")
    public ResponseEntity<AcademicYearResponse> get(@PathVariable UUID yearId) {
        return ResponseEntity.ok(service.get(yearId));
    }

    @PostMapping
    @Operation(summary = "Créer une année et son découpage en périodes")
    @PreAuthorize("hasAuthority('" + Permissions.ACADEMIC_YEAR_MANAGE + "')")
    public ResponseEntity<AcademicYearResponse> create(
            @Valid @RequestBody AcademicYearCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PostMapping("/{yearId}/activate")
    @Operation(summary = "Faire de cette année l'année de travail",
            description = "L'année active précédente passe en clôture en cours ; "
                    + "l'opération est réversible.")
    @PreAuthorize("hasAuthority('" + Permissions.ACADEMIC_YEAR_MANAGE + "')")
    public ResponseEntity<AcademicYearResponse> activate(@PathVariable UUID yearId) {
        return ResponseEntity.ok(service.activate(yearId));
    }
}
