package ci.company.eduops.option.dto;

import ci.company.eduops.option.domain.OptionCategory;

import java.util.List;
import java.util.UUID;

public record AcademicOptionResponse(
        UUID id,
        String code,
        String name,
        OptionCategory category,
        String categoryLabel,
        String languageCode,
        String description,
        String colorHex,
        List<OptionOfferingResponse> offerings,
        int levelCount,
        int totalCapacity,
        long requestedCount,
        long confirmedCount,
        long waitlistedCount) {
}
