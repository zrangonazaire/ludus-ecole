package ci.company.eduops.reportcard.domain;

public enum ReportCardStatus {
    DRAFT, GENERATED, VALIDATED, PUBLISHED, ARCHIVED;

    public boolean isPublished() {
        return this == PUBLISHED;
    }

    public boolean isEditable() {
        return this == DRAFT || this == GENERATED;
    }
}
