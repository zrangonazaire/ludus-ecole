package ci.company.eduops.option.dto;

import java.util.List;
import java.util.UUID;

public record OptionOverviewResponse(
        UUID academicYearId,
        String academicYearCode,
        List<OptionLevelResponse> levels,
        List<AcademicOptionResponse> options,
        int activeOptionCount,
        int offeringCount,
        int totalCapacity,
        long confirmedCount,
        long waitlistedCount) {
}
