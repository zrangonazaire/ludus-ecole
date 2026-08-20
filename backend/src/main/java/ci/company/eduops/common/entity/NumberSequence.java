package ci.company.eduops.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.UUID;

/** Per school / scope / year counter backing every business identifier. */
@Entity
@Table(name = "number_sequence")
public class NumberSequence {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "school_id", nullable = false)
    private UUID schoolId;

    @Column(name = "scope", nullable = false, length = 40)
    private String scope;

    @Column(name = "year_part", nullable = false, length = 10)
    private String yearPart;

    @Column(name = "current_value", nullable = false)
    private long currentValue;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    protected NumberSequence() {
        // required by JPA
    }

    public NumberSequence(UUID schoolId, String scope, String yearPart) {
        this.schoolId = schoolId;
        this.scope = scope;
        this.yearPart = yearPart;
        this.currentValue = 0L;
    }

    public UUID getId() {
        return id;
    }

    public UUID getSchoolId() {
        return schoolId;
    }

    public String getScope() {
        return scope;
    }

    public String getYearPart() {
        return yearPart;
    }

    public long getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(long currentValue) {
        this.currentValue = currentValue;
        this.updatedAt = OffsetDateTime.now();
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}
