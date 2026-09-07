package ci.company.eduops.familyrequest.domain;

import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

/** A traceable request handled by the school on behalf of a family. */
@Entity
@Table(name = "family_request")
@Getter
@Setter
public class FamilyRequest extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "reference", nullable = false, length = 40, updatable = false)
    private String reference;

    @Enumerated(EnumType.STRING)
    @Column(name = "request_type", nullable = false, length = 40)
    private FamilyRequestType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private FamilyRequestStatus status = FamilyRequestStatus.NEW;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false, length = 20)
    private FamilyRequestPriority priority = FamilyRequestPriority.NORMAL;

    @Enumerated(EnumType.STRING)
    @Column(name = "channel", nullable = false, length = 20)
    private FamilyRequestChannel channel;

    @Column(name = "subject", nullable = false, length = 200)
    private String subject;

    @Column(name = "description", length = 2000)
    private String description;

    /** Class displayed when the request was submitted; later transfers do not rewrite history. */
    @Column(name = "classroom_name", length = 160)
    private String classroomName;

    @Column(name = "guardian_name", nullable = false, length = 160)
    private String guardianName;

    @Column(name = "guardian_phone", length = 40)
    private String guardianPhone;

    @Column(name = "assigned_to", length = 160)
    private String assignedTo;

    @Column(name = "internal_note", length = 2000)
    private String internalNote;

    @Column(name = "submitted_at", nullable = false)
    private OffsetDateTime submittedAt;

    @Column(name = "due_at", nullable = false)
    private OffsetDateTime dueAt;

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    public boolean isOverdue(OffsetDateTime now) {
        return !status.isClosed() && dueAt.isBefore(now);
    }
}
