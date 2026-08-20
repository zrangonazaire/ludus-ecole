package ci.company.eduops.enrollment.domain;

import ci.company.eduops.classroom.domain.Classroom;
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

import java.time.OffsetDateTime;
import java.util.UUID;

/** Traceable move of a student between two classes of the same year. */
@Entity
@Table(name = "enrollment_transfer")
@Getter
@Setter
public class EnrollmentTransfer {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_classroom_id", nullable = false)
    private Classroom fromClassroom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_classroom_id", nullable = false)
    private Classroom toClassroom;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "transferred_at", nullable = false)
    private OffsetDateTime transferredAt = OffsetDateTime.now();

    @Column(name = "transferred_by")
    private UUID transferredBy;
}
