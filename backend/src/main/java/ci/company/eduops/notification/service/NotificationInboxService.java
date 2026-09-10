package ci.company.eduops.notification.service;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.notification.domain.Notification;
import ci.company.eduops.notification.dto.NotificationResponse;
import ci.company.eduops.notification.repository.NotificationRepository;
import ci.company.eduops.security.service.CurrentUser;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * My inbox.
 *
 * <p>Every method here starts from {@code currentUser.requireId()}. No method
 * accepts a recipient identifier, and none should ever be added: an inbox that
 * takes a user id as a parameter is one guessed UUID away from being everyone's
 * inbox. The tenant policy blocks reading another school; it does nothing about
 * reading a colleague's messages inside the same school. That is this class's
 * job, and it does it by never asking who to read for.</p>
 */
@Service
public class NotificationInboxService {

    private static final int MAX_PAGE_SIZE = 100;

    private final NotificationRepository repository;
    private final CurrentUser currentUser;

    public NotificationInboxService(NotificationRepository repository,
                                    CurrentUser currentUser) {
        this.repository = repository;
        this.currentUser = currentUser;
    }

    @Transactional(readOnly = true)
    public PageResponse<NotificationResponse> inbox(String category, boolean unreadOnly,
                                                    int page, int size) {
        UUID me = currentUser.requireId();
        PageRequest pageable = PageRequest.of(Math.max(0, page),
                Math.min(Math.max(1, size), MAX_PAGE_SIZE));
        return PageResponse.from(
                repository.inbox(me, category == null ? "" : category.trim(),
                        unreadOnly, pageable),
                this::toResponse);
    }

    @Transactional(readOnly = true)
    public long unreadCount() {
        return repository.countUnread(currentUser.requireId());
    }

    @Transactional(readOnly = true)
    public List<String> categories() {
        return repository.categories(currentUser.requireId());
    }

    /**
     * Marque un message comme lu.
     *
     * <p>Un message adressé à quelqu'un d'autre est introuvable, pas refusé :
     * répondre « accès interdit » confirmerait son existence, et permettrait
     * de sonder l'activité d'un collègue un identifiant à la fois.</p>
     */
    @Transactional
    public NotificationResponse markRead(UUID notificationId) {
        Notification notification = repository
                .findByIdAndRecipientUserId(notificationId, currentUser.requireId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.RESOURCE_NOT_FOUND,
                        "Ce message est introuvable."));
        notification.markRead();
        return toResponse(repository.save(notification));
    }

    /** Marque toute la boîte comme lue, et dit combien de messages l'étaient. */
    @Transactional
    public long markAllRead() {
        List<Notification> unread = repository.findUnread(currentUser.requireId());
        for (Notification notification : unread) {
            notification.markRead();
        }
        repository.saveAll(unread);
        return unread.size();
    }

    private NotificationResponse toResponse(Notification notification) {
        NotificationResponse response = new NotificationResponse();
        response.setId(notification.getId());
        response.setCategory(notification.getCategory());
        response.setCategoryLabel(categoryLabel(notification.getCategory()));
        response.setTitle(notification.getTitle());
        response.setBody(notification.getBody());
        response.setActionUrl(notification.getActionUrl());
        response.setStudentId(notification.getStudentId());
        response.setUnread(notification.isUnread());
        response.setCreatedAt(notification.getCreatedAt());
        response.setReadAt(notification.getReadAt());
        return response;
    }

    private String categoryLabel(String category) {
        return switch (category == null ? "" : category) {
            case "ABSENCE" -> "Absence";
            case "GRADE" -> "Notes";
            case "REPORT_CARD" -> "Bulletin";
            case "PAYMENT" -> "Paiement";
            case "ENROLLMENT" -> "Inscription";
            case "ANNOUNCEMENT" -> "Annonce";
            default -> category;
        };
    }
}
