package ci.company.eduops.finance.dto.request;
import ci.company.eduops.finance.domain.CollectionAction.Channel;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.math.BigDecimal;

@Getter @Setter
public class CollectionActionRequest {
    @NotNull private Channel channel;
    @NotBlank @Size(max = 2000) private String note;
    @FutureOrPresent private LocalDate nextContactDate;
    @FutureOrPresent private LocalDate promisedDate;
    @DecimalMin("0.01") @Digits(integer = 13, fraction = 2) private BigDecimal promisedAmount;
}
