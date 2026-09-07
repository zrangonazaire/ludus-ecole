package ci.company.eduops.portal.dto.response;

import java.time.OffsetDateTime;
import java.util.UUID;

/** Une annonce de l'établissement, visible de l'élève. */
public class StudentDashboardAnnouncement {

    private UUID id;
    /** GENERAL, ACADEMIC, EVENT, URGENT. */
    private String category = "GENERAL";
    private String title;
    private String message;
    private OffsetDateTime publishedAt;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public OffsetDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(OffsetDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
}
