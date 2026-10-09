package ci.company.eduops.common.dto;

import java.time.OffsetDateTime;

/**
 * État courant d'une séquence de numérotation pour un établissement et un périmètre donné.
 */
public record SequenceStatus(
        String scope,
        String resetPolicy,
        String yearPart,
        long currentValue,
        long nextValue,
        long startNumber,
        OffsetDateTime updatedAt,
        String preview
) {}
