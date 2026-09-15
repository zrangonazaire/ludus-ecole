package ci.company.eduops.school.controller;

import ci.company.eduops.document.service.OfficialDocumentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/school/logo")
public class SchoolLogoController {
    private final OfficialDocumentService documents;
    public SchoolLogoController(OfficialDocumentService documents) { this.documents = documents; }

    public record Logo(
        @Size(max = 750000)
        @Pattern(regexp = "^$|^data:image/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$")
        String dataUrl) {}

    @GetMapping
    @PreAuthorize("hasAuthority('SCHOOL_VIEW')")
    public Logo get() { return new Logo(documents.layout().getLogoDataUrl()); }

    @PutMapping
    @PreAuthorize("hasAuthority('SCHOOL_MANAGE')")
    public Logo save(@Valid @RequestBody Logo logo) {
        return new Logo(documents.saveSchoolLogo(logo.dataUrl()));
    }
}
