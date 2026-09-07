package ci.company.eduops.familyrequest.controller;

import ci.company.eduops.familyrequest.domain.FamilyRequestStatus;
import ci.company.eduops.familyrequest.domain.FamilyRequestType;
import ci.company.eduops.familyrequest.dto.FamilyRequestBoardResponse;
import ci.company.eduops.familyrequest.dto.FamilyRequestCreateRequest;
import ci.company.eduops.familyrequest.dto.FamilyRequestResponse;
import ci.company.eduops.familyrequest.dto.FamilyRequestUpdateRequest;
import ci.company.eduops.familyrequest.service.FamilyRequestService;
import ci.company.eduops.security.service.Permissions;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/family-requests")
public class FamilyRequestController {

    private final FamilyRequestService service;

    public FamilyRequestController(FamilyRequestService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_VIEW + "')")
    public ResponseEntity<FamilyRequestBoardResponse> board(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) FamilyRequestType type) {
        return ResponseEntity.ok(service.board(search, status, type));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_GENERATE + "')")
    public ResponseEntity<FamilyRequestResponse> create(
            @Valid @RequestBody FamilyRequestCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PatchMapping("/{requestId}")
    @PreAuthorize("hasAuthority('" + Permissions.DOCUMENT_GENERATE + "')")
    public ResponseEntity<FamilyRequestResponse> update(
            @PathVariable UUID requestId,
            @Valid @RequestBody FamilyRequestUpdateRequest request) {
        return ResponseEntity.ok(service.update(requestId, request));
    }
}
