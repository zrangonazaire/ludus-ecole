package ci.company.eduops.finance.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/** Optional explanation when the creator withdraws a pending discount request. */
@Getter
@Setter
public class DiscountRequestCancelRequest {

    @Size(max = 2000)
    private String reason;
}
