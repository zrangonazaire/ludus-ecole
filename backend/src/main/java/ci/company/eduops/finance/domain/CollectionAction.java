package ci.company.eduops.finance.domain;

import ci.company.eduops.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity @Table(name = "collection_action") @Getter @Setter
public class CollectionAction extends BaseEntity {
    public enum Channel { PHONE, SMS, EMAIL, MEETING, NOTE }
    @Column(nullable = false) private UUID schoolId;
    @Column(nullable = false) private UUID studentId;
    @Column(nullable = false) private UUID academicYearId;
    @Column(nullable = false) private UUID createdBy;
    @Column(nullable = false, length = 200) private String authorName;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Channel channel;
    @Column(nullable = false, length = 2000) private String note;
    private LocalDate nextContactDate;
    private LocalDate promisedDate;
    @Column(precision = 15, scale = 2) private BigDecimal promisedAmount;
}
