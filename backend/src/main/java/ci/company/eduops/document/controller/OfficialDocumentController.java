package ci.company.eduops.document.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.document.domain.DocumentStatus;
import ci.company.eduops.document.domain.DocumentType;
import ci.company.eduops.document.dto.DocumentIssueRequest;
import ci.company.eduops.document.dto.DocumentLayoutDto;
import ci.company.eduops.document.dto.DocumentResponse;
import ci.company.eduops.document.service.OfficialDocumentService;
import ci.company.eduops.security.service.Permissions;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/documents")
public class OfficialDocumentController {

    private final OfficialDocumentService service;

    public OfficialDocumentController(OfficialDocumentService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_VIEW + "')")
    public ResponseEntity<PageResponse<DocumentResponse>> search(
            @RequestParam(required = false) DocumentType type,
            @RequestParam(required = false) DocumentStatus status,
            @RequestParam(required = false) UUID studentId,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return ResponseEntity.ok(service.search(type, status, studentId, search, pageable));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_GENERATE + "')")
    public ResponseEntity<DocumentResponse> issue(
            @Valid @RequestBody DocumentIssueRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.issue(request));
    }

    @PostMapping("/{id}/revoke")
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_GENERATE + "')")
    public ResponseEntity<DocumentResponse> revoke(@PathVariable UUID id,
                                                    @Valid @RequestBody RevokeRequest request) {
        return ResponseEntity.ok(service.revoke(id, request.getReason()));
    }

    @GetMapping("/layout")
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_VIEW + "')")
    public ResponseEntity<DocumentLayoutDto> layout() {
        return ResponseEntity.ok(service.layout());
    }

    @PutMapping("/layout")
    @PreAuthorize("hasAuthority('" + Permissions.SCHOOL_MANAGE + "')")
    public ResponseEntity<DocumentLayoutDto> saveLayout(
            @Valid @RequestBody DocumentLayoutDto request) {
        return ResponseEntity.ok(service.saveLayout(request));
    }

    @Getter
    @Setter
    public static class RevokeRequest {
        @NotBlank
        private String reason;
    }
}

