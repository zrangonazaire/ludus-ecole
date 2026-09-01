package ci.company.eduops.document.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

/** Immutable printable document registered under a unique business number. */
@Entity
@Table(name = "document")
@Getter
@Setter
public class OfficialDocument {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "document_type", nullable = false, columnDefinition = "document_type")
    private DocumentType type;

    @Column(name = "document_number", nullable = false, length = 60, updatable = false)
    private String documentNumber;

    @Column(name = "verification_code", nullable = false, length = 60, updatable = false)
    private String verificationCode;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academic_year_id")
    private AcademicYear academicYear;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "document_status")
    private DocumentStatus status = DocumentStatus.DRAFT;

    @Column(name = "issued_at")
    private OffsetDateTime issuedAt;

    @Column(name = "issued_by")
    private UUID issuedBy;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    @Column(name = "revoked_at")
    private OffsetDateTime revokedAt;

    @Column(name = "revoke_reason")
    private String revokeReason;

    @Type(JsonBinaryType.class)
    @Column(name = "metadata", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> metadata = new LinkedHashMap<>();

    @Column(name = "mime_type", nullable = false, length = 120)
    private String mimeType = "application/pdf";

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    void onCreate() {
        OffsetDateTime now = OffsetDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public void revoke(String reason) {
        status = DocumentStatus.REVOKED;
        revokedAt = OffsetDateTime.now();
        revokeReason = reason;
    }
}

