package ci.company.eduops.guardian.domain;

import ci.company.eduops.common.entity.BaseEntity;
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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * The student/guardian link, and the source of truth for rule 11: a parent may
 * only see the children explicitly attached to their account.
 */
@Entity
@Table(name = "student_guardian")
@Getter
@Setter
public class StudentGuardian extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "guardian_id", nullable = false)
    private Guardian guardian;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "relationship", nullable = false, columnDefinition = "guardian_relationship")
    private GuardianRelationship relationship;

    @Column(name = "is_primary", nullable = false)
    private boolean primary;

    /** Receives the invoices and is chased for unpaid instalments. */
    @Column(name = "has_financial_responsibility", nullable = false)
    private boolean financialResponsibility;

    @Column(name = "can_pickup_student", nullable = false)
    private boolean canPickupStudent = true;

    @Column(name = "receives_notifications", nullable = false)
    private boolean receivesNotifications = true;

    @Column(name = "receives_academic_reports", nullable = false)
    private boolean receivesAcademicReports = true;

    @Column(name = "receives_financial_notifications", nullable = false)
    private boolean receivesFinancialNotifications;

    @Column(name = "lives_with_student", nullable = false)
    private boolean livesWithStudent = true;

    @Column(name = "note")
    private String note;
}
