package ci.company.eduops.cashier;

import ci.company.eduops.cashier.domain.*;
import ci.company.eduops.cashier.repository.CashSessionRepository;
import ci.company.eduops.cashier.service.CashService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.payment.repository.PaymentRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.audit.service.AuditService;
import org.junit.jupiter.api.*;
import java.math.BigDecimal;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CashServiceTest {
    final CashSessionRepository sessions=mock(CashSessionRepository.class);
    final PaymentRepository payments=mock(PaymentRepository.class);
    final SchoolRepository schools=mock(SchoolRepository.class);
    final CurrentUser user=mock(CurrentUser.class);
    final AuditService audit=mock(AuditService.class);
    final CashService service=new CashService(sessions,payments,schools,user,audit);
    final UUID schoolId=UUID.randomUUID(), userId=UUID.randomUUID(), sessionId=UUID.randomUUID();
    CashSession session;
    @BeforeEach void setup() {
        TenantContext.setSchoolId(schoolId); when(user.requireId()).thenReturn(userId);
        School school=new School(); school.setId(schoolId);
        session=new CashSession(); session.setId(sessionId); session.setSchool(school); session.setCashierUserId(userId);
        session.setReference("CSH-TEST"); session.setOpeningBalance(new BigDecimal("5000"));
        when(sessions.lockById(sessionId)).thenReturn(Optional.of(session));
        when(payments.sumCashForSession(sessionId)).thenReturn(new BigDecimal("15000"));
    }
    @AfterEach void cleanup() { TenantContext.clear(); }
    @Test void closesWithOpeningBalanceAndValidatedCash() {
        var result=service.close(sessionId,new BigDecimal("19500"),new BigDecimal("20000"),"Manquant de 500");
        assertEquals("CLOSED",result.status());
        assertEquals(0,new BigDecimal("20000").compareTo(result.expectedBalance()));
        assertEquals(0,new BigDecimal("-500").compareTo(result.difference()));
        verify(sessions).saveAndFlush(session);
        verify(audit).logValidate("CashSession",sessionId,"CSH-TEST","Manquant de 500");
    }
    @Test void rejectsChangedExpectedBalance() {
        assertThrows(BusinessException.class,() -> service.close(sessionId,new BigDecimal("19000"),new BigDecimal("19000"),""));
        assertTrue(session.isOpen()); verify(sessions,never()).saveAndFlush(any());
    }
    @Test void discrepancyRequiresExplanation() {
        assertThrows(BusinessException.class,() -> service.close(sessionId,new BigDecimal("19000"),new BigDecimal("20000")," "));
        assertTrue(session.isOpen());
    }
    @Test void cannotCloseAnotherCashiersSession() {
        session.setCashierUserId(UUID.randomUUID());
        assertThrows(BusinessException.class,() -> service.close(sessionId,BigDecimal.ZERO,BigDecimal.ZERO,""));
        verifyNoInteractions(payments);
    }
    @Test void cannotCloseAnotherSchoolsSession() {
        TenantContext.setSchoolId(UUID.randomUUID());
        assertThrows(BusinessException.class,() -> service.close(sessionId,BigDecimal.ZERO,BigDecimal.ZERO,""));
        verifyNoInteractions(payments);
    }
    @Test void cannotCloseTwice() {
        session.setStatus(CashSessionStatus.CLOSED);
        assertThrows(BusinessException.class,() -> service.close(sessionId,BigDecimal.ZERO,BigDecimal.ZERO,""));
        verifyNoInteractions(payments);
    }
    @Test void cannotOpenTwoSessions() {
        when(sessions.findOpenForCashier(userId)).thenReturn(Optional.of(session));
        assertThrows(BusinessException.class,() -> service.open(BigDecimal.ZERO,""));
        verify(sessions,never()).saveAndFlush(any());
    }
}
