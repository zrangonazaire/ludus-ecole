package ci.company.eduops.council.domain;

import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.staff.domain.Staff;
import ci.company.eduops.teacher.domain.Teacher;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * One person attending (or invited to) a class council.
 *
 * <p>The {@code class_council_participant} table carries no audit columns, so
 * unlike its parent this entity does not extend {@link ci.company.eduops.common.entity.BaseEntity}.
 * A participant is exactly one of a teacher, a staff member or a guardian — the
 * database enforces that with a {@code CHECK (num_nonnulls(...) = 1)} constraint.</p>
 */
@Entity
@Table(name = "class_council_participant")
@Getter
@Setter
public class ClassCouncilParticipant {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "council_id", nullable = false)
    private ClassCouncil council;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    /** The part the person played: « président », « secrétaire », « délégués parents »... */
    @Column(name = "role_label", nullable = false, length = 120)
    private String roleLabel;

    @Column(name = "present", nullable = false)
    private boolean present = true;

    /** The resolved identity: the participant {@code Teacher}, {@code Staff} or {@code Guardian}. */
    public Object identity() {
        if (teacher != null) {
            return teacher;
        }
        if (staff != null) {
            return staff;
        }
        return guardian;
    }
}