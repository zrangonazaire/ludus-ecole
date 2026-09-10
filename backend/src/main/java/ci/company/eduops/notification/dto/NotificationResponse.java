package ci.company.eduops.notification.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Un message de ma boîte de réception.
 *
 * <p>Aucun champ ne désigne le destinataire : la réponse ne contient que des
 * messages qui me sont adressés, donc le redire serait au mieux inutile. Au
 * pire, un tel champ inviterait un écran à filtrer côté client sur une liste
 * qui contiendrait alors les messages d'autrui — c'est la porte qu'on ferme
 * en ne l'ouvrant pas.</p>
 */
public class NotificationResponse {

    private UUID id;
    private String category;
    private String categoryLabel;
    private String title;
    private String body;
    private String actionUrl;
    private UUID studentId;
    private boolean unread;
    private OffsetDateTime createdAt;
    private OffsetDateTime readAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public void setCategoryLabel(String categoryLabel) {
        this.categoryLabel = categoryLabel;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public boolean isUnread() {
        return unread;
    }

    public void setUnread(boolean unread) {
        this.unread = unread;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(OffsetDateTime readAt) {
        this.readAt = readAt;
    }
}
