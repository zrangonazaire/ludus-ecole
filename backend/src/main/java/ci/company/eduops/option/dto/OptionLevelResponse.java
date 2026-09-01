package ci.company.eduops.option.dto;

import java.util.UUID;

public record OptionLevelResponse(UUID id, String code, String name,
                                  String cycleName, int sequence) {
}
