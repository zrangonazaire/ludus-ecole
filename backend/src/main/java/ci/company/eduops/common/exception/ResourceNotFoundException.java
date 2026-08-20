package ci.company.eduops.common.exception;

import java.util.UUID;

/** Thrown when an identifier does not resolve to an existing record. */
public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(ErrorCode errorCode, String resource, Object identifier) {
        super(errorCode, "%s not found: %s".formatted(resource, identifier));
        detail("resource", resource);
        detail("identifier", String.valueOf(identifier));
    }

    public static ResourceNotFoundException of(ErrorCode code, String resource, UUID id) {
        return new ResourceNotFoundException(code, resource, id);
    }
}
