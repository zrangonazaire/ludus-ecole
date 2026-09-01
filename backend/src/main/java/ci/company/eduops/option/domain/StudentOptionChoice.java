package ci.company.eduops.option.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "student_option_choice")
@Getter
@Setter
public class StudentOptionChoice extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "offering_id", nullable = false)
    private OptionOffering offering;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @Column(name = "priority", nullable = false)
    private int priority = 1;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private OptionChoiceStatus status = OptionChoiceStatus.REQUESTED;

    @Column(name = "notes")
    private String notes;

    @Column(name = "chosen_at", nullable = false)
    private OffsetDateTime chosenAt = OffsetDateTime.now();

    @Column(name = "confirmed_at")
    private OffsetDateTime confirmedAt;

    @Column(name = "confirmed_by")
    private UUID confirmedBy;

    public void changeStatus(OptionChoiceStatus target, UUID userId) {
        status = target;
        if (target == OptionChoiceStatus.CONFIRMED) {
            confirmedAt = OffsetDateTime.now();
            confirmedBy = userId;
        }
    }
}

