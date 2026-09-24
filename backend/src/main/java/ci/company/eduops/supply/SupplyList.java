package ci.company.eduops.supply;

import ci.company.eduops.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "supply_list")
@Getter @Setter
public class SupplyList extends BaseEntity {
    @Column(nullable = false) private UUID schoolId;
    @Column(nullable = false) private UUID levelId;
    @Column(nullable = false) private UUID academicYearId;
    @Column(nullable = false, length = 160) private String title;
    @Column(nullable = false, length = 4000) private String notes;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private List<SupplyListRequest.Item> items;
}
