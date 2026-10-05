package ci.company.eduops.audit.service;

import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.security.service.CurrentUser;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.UnexpectedRollbackException;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuditServiceTest {

    private final AuditWriter writer = mock(AuditWriter.class);
    private final CurrentUser currentUser = mock(CurrentUser.class);
    private final AuditService service = new AuditService(writer, currentUser);

    @Test
    void auditCommitFailureDoesNotFailTheBusinessOperation() {
        UUID entityId = UUID.randomUUID();
        when(currentUser.id()).thenReturn(java.util.Optional.empty());
        doThrow(new UnexpectedRollbackException("transaction commit failed"))
                .when(writer).write(any());

        assertThatCode(() -> service.record(AuditAction.CREATE, "SupplyList", entityId).save())
                .doesNotThrowAnyException();
        verify(writer).write(any());
        verify(writer).write(any());
    }
}
