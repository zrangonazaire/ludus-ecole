package ci.company.eduops.messaging.controller;

import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.messaging.service.MessageResponseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

/** Public page API; the random per-recipient token is its sole credential. */
@RestController
@RequestMapping("/api/v1/public/opinion-responses")
public class PublicOpinionResponseController {

    private final MessageResponseService service;

    public PublicOpinionResponseController(MessageResponseService service) {
        this.service = service;
    }

    public record RequestResponse(String schoolName, String campaignTitle,
                                  String question, boolean answered,
                                  OffsetDateTime expiresAt) { }

    public record SubmitRequest(@NotBlank @Size(max = 3000) String answer) { }

    @GetMapping("/{token}")
    @TenantBypass
    public RequestResponse read(@PathVariable String token) {
        var request = service.publicRequest(token);
        return new RequestResponse(request.schoolName(), request.campaignTitle(),
                request.question(), request.answered(), request.expiresAt());
    }

    @PostMapping("/{token}")
    @TenantBypass
    public ResponseEntity<Void> answer(@PathVariable String token,
                                       @Valid @RequestBody SubmitRequest request) {
        service.answer(token, request.answer());
        return ResponseEntity.noContent().build();
    }
}
