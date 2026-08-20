package ci.company.eduops.enrollment.domain;

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

/** Mandatory paperwork checked by {@code checkRequiredDocuments()} before validation. */
@Entity
@Table(name = "enrollment_document")
@Getter
@Setter
public class EnrollmentDocument {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @Column(name = "document_code", nullable = false, length = 60)
    private String documentCode;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "mandatory", nullable = false)
    private boolean mandatory = true;

    @Column(name = "received", nullable = false)
    private boolean received;

    @Column(name = "received_at")
    private OffsetDateTime receivedAt;
}
