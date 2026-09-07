package ci.company.eduops.reference.dto.response;

/**
 * One hit in the search bar at the top of every screen.
 *
 * <p>Carries its own destination link. The screen must not have to know that
 * a pupil lives under {@code /students/…} and a class under {@code /classes/…}
 * — that mapping belongs in one place, and it is here.</p>
 */
public class GlobalSearchResultResponse {

    /** STUDENT, GUARDIAN, TEACHER, CLASSROOM, RECEIPT, INVOICE. */
    private String type;
    private String id;
    private String primaryLabel;
    private String secondaryLabel;
    private String badge;
    private String routerLink;

    public GlobalSearchResultResponse() {
    }

    public GlobalSearchResultResponse(String type, String id, String primaryLabel,
                                      String secondaryLabel, String routerLink) {
        this.type = type;
        this.id = id;
        this.primaryLabel = primaryLabel;
        this.secondaryLabel = secondaryLabel;
        this.routerLink = routerLink;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrimaryLabel() {
        return primaryLabel;
    }

    public void setPrimaryLabel(String primaryLabel) {
        this.primaryLabel = primaryLabel;
    }

    public String getSecondaryLabel() {
        return secondaryLabel;
    }

    public void setSecondaryLabel(String secondaryLabel) {
        this.secondaryLabel = secondaryLabel;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getRouterLink() {
        return routerLink;
    }

    public void setRouterLink(String routerLink) {
        this.routerLink = routerLink;
    }
}
