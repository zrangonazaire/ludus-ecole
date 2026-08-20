package ci.company.eduops.timetable.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.term.domain.Term;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** The weekly schedule of one class. Only one PUBLISHED timetable per class/term. */
@Entity
@Table(name = "timetable")
@Getter
@Setter
public class Timetable extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_id")
    private Term term;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom = LocalDate.now();

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "timetable_status")
    private TimetableStatus status = TimetableStatus.DRAFT;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Column(name = "published_by")
    private UUID publishedBy;

    @OneToMany(mappedBy = "timetable", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TimetableSlot> slots = new ArrayList<>();

    public void addSlot(TimetableSlot slot) {
        slots.add(slot);
        slot.setTimetable(this);
    }
}
