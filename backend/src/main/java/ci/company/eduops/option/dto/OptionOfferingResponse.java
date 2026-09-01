package ci.company.eduops.option.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record OptionOfferingResponse(
        UUID id,
        UUID optionId,
        UUID levelId,
        String levelCode,
        String levelName,
        int capacity,
        long requestedCount,
        long confirmedCount,
        long waitlistedCount,
        int availableSeats,
        BigDecimal weeklyHours,
        LocalDate choiceStartDate,
        LocalDate choiceEndDate) {
}
