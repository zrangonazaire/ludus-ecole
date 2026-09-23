package ci.company.eduops.approval.domain;

import ci.company.eduops.common.entity.BaseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.OffsetDateTime;
import java.util.*;

/** Snapshot of a circuit and its decisions, independent of later template edits. */
@Entity
@Table(name = "approval_execution")
@Getter @Setter
public class ApprovalExecution extends BaseEntity {
    @Column(nullable = false, updatable = false) private UUID schoolId;
    @Column(nullable = false, updatable = false) private UUID resourceId;
    @Column(nullable = false, updatable = false) private String operation;
    @Column(nullable = false, updatable = false) private String label;
    @Column(nullable = false, updatable = false) private String circuitName;
    @Column(nullable = false, updatable = false) private UUID createdBy;
    @Column(nullable = false) private String status = "SUBMITTED";
    @Column(nullable = false) private int currentLevel = 1;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private List<Stage> stages = new ArrayList<>();
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, updatable = false, columnDefinition = "jsonb")
    private JsonNode payload;
    private OffsetDateTime effectiveAt;

    @Data
    public static class Stage {
        private String code;
        private ApprovalMode mode;
        private String status = "PENDING";
        private List<Vote> members = new ArrayList<>();
    }
    @Data
    public static class Vote {
        private UUID userId;
        private String name;
        private String decision;
        private String comment;
        private OffsetDateTime decidedAt;
    }
}
