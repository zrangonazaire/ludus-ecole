package ci.company.eduops.school.domain;

import ci.company.eduops.common.entity.AuditableEntity;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * The institution itself: the root of the academic hierarchy and the holder of
 * every school-wide policy (grading scale, numbering patterns, ranking on/off).
 */
@Entity
@Table(name = "school")
@Getter
@Setter
public class School extends AuditableEntity {

    @Column(name = "code", nullable = false, length = 30)
    private String code;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "legal_name", length = 255)
    private String legalName;

    @Column(name = "motto", length = 255)
    private String motto;

    @Column(name = "registration_number", length = 80)
    private String registrationNumber;

    @Column(name = "email", length = 180)
    private String email;

    @Column(name = "phone", length = 40)
    private String phone;

    @Column(name = "website", length = 200)
    private String website;

    @Column(name = "address_line1", length = 200)
    private String addressLine1;

    @Column(name = "address_line2", length = 200)
    private String addressLine2;

    @Column(name = "city", length = 120)
    private String city;

    @Column(name = "country", nullable = false, length = 120)
    private String country = "Cote d'Ivoire";

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    @Column(name = "locale", nullable = false, length = 10)
    private String locale = "fr-CI";

    @Column(name = "timezone", nullable = false, length = 60)
    private String timezone = "Africa/Abidjan";

    /** Maximum mark of the grading scale, usually 20. */
    @Column(name = "grading_scale_max", nullable = false, precision = 6, scale = 3)
    private BigDecimal gradingScaleMax = new BigDecimal("20.000");

    @Column(name = "ranking_enabled", nullable = false)
    private boolean rankingEnabled = true;

    @Column(name = "student_number_pattern", nullable = false, length = 80)
    private String studentNumberPattern = "EDU-{year}-{seq:6}";

    @Column(name = "receipt_number_pattern", nullable = false, length = 80)
    private String receiptNumberPattern = "REC-{year}-{seq:8}";

    @Column(name = "invoice_number_pattern", nullable = false, length = 80)
    private String invoiceNumberPattern = "INV-{year}-{seq:8}";

    @Type(JsonBinaryType.class)
    @Column(name = "settings", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> settings = new HashMap<>();

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "school_status")
    private SchoolStatus status = SchoolStatus.ACTIVE;
}
