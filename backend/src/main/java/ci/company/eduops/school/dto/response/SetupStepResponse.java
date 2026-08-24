package ci.company.eduops.school.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

/** One line of the setup checklist. */
@Schema(name = "SetupStep", description = "Une étape de configuration de l'établissement")
public class SetupStepResponse {

    @Schema(example = "CLASSES")
    private String key;

    @Schema(example = "Classes")
    private String label;

    private String description;

    @Schema(description = "Deduit des données reelles, pas d'un drapeau")
    private boolean done;

    @Schema(description = "Une étape facultative ne bloque pas la progression")
    private boolean required;

    @Schema(description = "Nombre d'éléments déjà créés", example = "12")
    private long count;

    @Schema(description = "Route Angular vers l'écran concerné", example = "/classes")
    private String actionRoute;

    private String actionLabel;

    public SetupStepResponse() {
        // default constructor for serialization
    }

    public SetupStepResponse(String key, String label, String description, boolean required,
                             long count, String actionRoute, String actionLabel) {
        this.key = key;
        this.label = label;
        this.description = description;
        this.required = required;
        this.count = count;
        this.done = count > 0;
        this.actionRoute = actionRoute;
        this.actionLabel = actionLabel;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public String getActionRoute() {
        return actionRoute;
    }

    public void setActionRoute(String actionRoute) {
        this.actionRoute = actionRoute;
    }

    public String getActionLabel() {
        return actionLabel;
    }

    public void setActionLabel(String actionLabel) {
        this.actionLabel = actionLabel;
    }
}
