package ci.company.eduops.subject.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/** One subject of the school catalogue. */
@Schema(name = "Subject", description = "Une matière du catalogue")
public class SubjectResponse {

    private UUID id;
    private String code;
    private String name;
    private String shortName;
    private String category;
    private String categoryLabel;
    private String colorHex;
    private String description;
    private boolean graded;
    private String status;

    @Schema(example = "12", description = "Nombre de niveaux où la matière est au programme")
    private int levelCount;

    @Schema(description = "Vrai quand la matière peut être supprimée : "
            + "aucun programme ne l'utilise et aucune évaluation ne la référence")
    private boolean deletable;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
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

    public String getColorHex() {
        return colorHex;
    }

    public void setColorHex(String colorHex) {
        this.colorHex = colorHex;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isGraded() {
        return graded;
    }

    public void setGraded(boolean graded) {
        this.graded = graded;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getLevelCount() {
        return levelCount;
    }

    public void setLevelCount(int levelCount) {
        this.levelCount = levelCount;
    }

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(boolean deletable) {
        this.deletable = deletable;
    }
}
