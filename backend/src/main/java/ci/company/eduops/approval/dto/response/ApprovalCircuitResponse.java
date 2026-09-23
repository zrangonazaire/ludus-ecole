package ci.company.eduops.approval.dto.response;

import ci.company.eduops.approval.domain.ApprovalMode;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Un circuit et ses niveaux ordonnés, membres valideurs inclus. */
@Getter
@Setter
public class ApprovalCircuitResponse {

    private UUID id;
    private String code;
    private String name;
    private String usage;
    private OffsetDateTime updatedAt;
    private List<LevelResponse> levels = new ArrayList<>();

    @Getter
    @Setter
    public static class LevelResponse {
        private UUID id;
        private int levelNumber;
        private String code;
        private ApprovalMode mode;
        private boolean last;
        private List<MemberResponse> members = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class MemberResponse {
        private UUID id;
        private String username;
        private String fullName;
    }
}
