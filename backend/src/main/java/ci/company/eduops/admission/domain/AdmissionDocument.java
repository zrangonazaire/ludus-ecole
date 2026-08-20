package ci.company.eduops.admission.domain;

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

/** A supporting document expected with an application (birth certificate...). */
@Entity
@Table(name = "admission_document")
@Getter
@Setter
public class AdmissionDocument {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false)
    private AdmissionApplication application;

    @Column(name = "document_code", nullable = false, length = 60)
    private String documentCode;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "received", nullable = false)
    private boolean received;

    @Column(name = "mandatory", nullable = false)
    private boolean mandatory = true;

    @Column(name = "received_at")
    private OffsetDateTime receivedAt;

    public void markReceived(String url) {
        this.received = true;
        this.fileUrl = url;
        this.receivedAt = OffsetDateTime.now();
    }
}
