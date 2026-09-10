package ci.company.eduops.notification.controller;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.notification.dto.NotificationResponse;
import ci.company.eduops.notification.service.NotificationInboxService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Ma boîte de réception.
 *
 * <p>Aucune de ces routes n'accepte d'identifiant de destinataire, et aucune
 * ne porte de {@code @PreAuthorize} : ce sont mes messages, pas une ressource
 * administrative. Exiger une permission reviendrait à priver de sa propre
 * boîte un parent ou un élève, à qui l'on ne donne évidemment aucun droit
 * d'administration. L'authentification suffit, et elle est déjà exigée par la
 * configuration de sécurité.</p>
 */
@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notifications", description = "Les messages qui me sont adressés")
public class NotificationController {

    private final NotificationInboxService service;

    public NotificationController(NotificationInboxService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Mes messages, non lus en premier")
    public ResponseEntity<PageResponse<NotificationResponse>> inbox(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "false") boolean unreadOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size) {
        return ResponseEntity.ok(service.inbox(category, unreadOnly, page, size));
    }

    @GetMapping("/unread-count")
    @Operation(summary = "Combien de messages non lus")
    public ResponseEntity<Map<String, Long>> unreadCount() {
        return ResponseEntity.ok(Map.of("unread", service.unreadCount()));
    }

    @GetMapping("/categories")
    @Operation(summary = "Les catégories présentes dans ma boîte")
    public ResponseEntity<List<String>> categories() {
        return ResponseEntity.ok(service.categories());
    }

    @PatchMapping("/{notificationId}/read")
    @Operation(summary = "Marquer un message comme lu")
    public ResponseEntity<NotificationResponse> markRead(
            @PathVariable UUID notificationId) {
        return ResponseEntity.ok(service.markRead(notificationId));
    }

    @PatchMapping("/read-all")
    @Operation(summary = "Marquer toute la boîte comme lue")
    public ResponseEntity<Map<String, Long>> markAllRead() {
        return ResponseEntity.ok(Map.of("marked", service.markAllRead()));
    }
}
