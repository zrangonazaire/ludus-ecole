package ci.company.eduops.teacher.domain;

public enum TeacherStatus {
    ACTIVE, ON_LEAVE, SUSPENDED, RESIGNED, RETIRED, ARCHIVED;

    public boolean canTeach() {
        return this == ACTIVE;
    }
}
