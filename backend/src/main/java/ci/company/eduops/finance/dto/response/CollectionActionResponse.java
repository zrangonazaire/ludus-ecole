package ci.company.eduops.finance.dto.response;
import ci.company.eduops.finance.domain.CollectionAction.Channel;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.math.BigDecimal;
@Getter @Setter
public class CollectionActionResponse {
    private UUID id;
    private Channel channel;
    private String note;
    private String authorName;
    private OffsetDateTime createdAt;
    private LocalDate nextContactDate;
    private LocalDate promisedDate;
    private BigDecimal promisedAmount;
}
