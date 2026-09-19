package ci.company.eduops.finance.dto.response;

import ci.company.eduops.finance.domain.DiscountRequestLevelStatus;
import ci.company.eduops.finance.domain.DiscountRequestStatus;
import ci.company.eduops.finance.domain.DiscountType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Une demande de réduction et l'état de son circuit de validation. */
@Getter
@Setter
public class DiscountRequestResponse {

    private UUID id;
    private String reference;
    private UUID studentId;
    private String studentName;
    private String studentNumber;
    private String label;
    private String reason;
    private DiscountType discountType;
    private BigDecimal value;
    private BigDecimal computedAmount;
    private DiscountRequestStatus status;
    private int currentLevel;
    private int totalLevels;
    private String rejectionReason;
    private OffsetDateTime effectiveAt;
    private OffsetDateTime createdAt;
    /** Vrai si le palier en attente est réservé au profil du lecteur. */
    private boolean awaitingMyDecision;
    private List<LevelResponse> levels = new ArrayList<>();

    @Getter
    @Setter
    public static class LevelResponse {
        private int levelNumber;
        private String name;
        private String roleCode;
        private String roleLabel;
        private DiscountRequestLevelStatus status;
        private String approverName;
        private String comment;
        private OffsetDateTime decidedAt;
    }
}
