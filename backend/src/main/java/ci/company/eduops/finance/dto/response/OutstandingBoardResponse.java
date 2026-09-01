package ci.company.eduops.finance.dto.response;

import ci.company.eduops.common.dto.PageResponse;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/** Headline collection figures and the filtered, paginated family balances. */
@Getter
@Setter
public class OutstandingBoardResponse {
    private BigDecimal totalOutstanding;
    private BigDecimal overdueAmount;
    private long studentCount;
    private long criticalCount;
    private String currency;
    private PageResponse<OutstandingStudentResponse> students;
}
