package ci.company.eduops.cashier.service;

import ci.company.eduops.cashier.domain.CashSession;
import ci.company.eduops.cashier.repository.CashSessionRepository;
import ci.company.eduops.common.exception.*;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.payment.repository.PaymentRepository;
import ci.company.eduops.payment.domain.PaymentStatus;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.audit.service.AuditService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.*;

@Service
@Transactional
public class CashService {
    private final CashSessionRepository sessions;
    private final PaymentRepository payments;
    private final SchoolRepository schools;
    private final CurrentUser user;
    private final AuditService audit;
    public CashService(CashSessionRepository sessions, PaymentRepository payments, SchoolRepository schools, CurrentUser user, AuditService audit) {
        this.sessions=sessions; this.payments=payments; this.schools=schools; this.user=user; this.audit=audit;
    }
    public record Session(UUID id, String reference, String status, OffsetDateTime openedAt, OffsetDateTime closedAt,
        BigDecimal openingBalance, BigDecimal cashReceived, BigDecimal expectedBalance, BigDecimal actualBalance,
        BigDecimal difference, String notes) {}
    public record Movement(UUID id, String reference, String studentName, BigDecimal amount, String method, String date) {}
    private UUID school() {
        UUID id=TenantContext.getSchoolId();
        if(id==null) throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND);
        return id;
    }
    private CashSession owned(CashSession s) {
        if (!school().equals(s.getSchool().getId()) || !user.requireId().equals(s.getCashierUserId()))
            throw BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND);
        return s;
    }
    @Transactional(readOnly=true)
    public List<Session> list() {
        return sessions.findBySchoolIdAndCashierUserIdOrderByOpenedAtDesc(school(), user.requireId()).stream().map(this::response).toList();
    }
    @Transactional(readOnly=true)
    public List<Movement> movements(UUID id) {
        owned(sessions.findById(id).orElseThrow(() -> BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND)));
        return payments.findByCashSessionIdAndStatus(id, PaymentStatus.VALIDATED).stream()
            .map(p -> new Movement(p.getId(), p.getPaymentReference(), p.getStudent().getFirstName()+" "+p.getStudent().getLastName(),
                p.getAmount(), p.getPaymentMethod().name(), p.getPaymentDate().toString())).toList();
    }
    public Session open(BigDecimal balance, String notes) {
        UUID schoolId=school(); UUID userId=user.requireId();
        if(sessions.findOpenForCashier(userId).isPresent()) throw BusinessException.of(ErrorCode.CASH_SESSION_ALREADY_OPEN);
        CashSession s=new CashSession();
        s.setSchool(schools.findById(schoolId).orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND)));
        s.setCashierUserId(userId); s.setReference("CSH-"+UUID.randomUUID()); s.setOpeningBalance(balance); s.setNotes(notes);
        sessions.saveAndFlush(s);
        audit.logCreate("CashSession", s.getId(), s.getReference(), Map.of("openingBalance",balance));
        return response(s);
    }
    public Session close(UUID id, BigDecimal actual, BigDecimal reviewedExpected, String notes) {
        CashSession s=owned(sessions.lockById(id).orElseThrow(() -> BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND)));
        if(!s.isOpen()) throw BusinessException.of(ErrorCode.CASH_SESSION_CLOSED);
        BigDecimal expected=s.getOpeningBalance().add(payments.sumCashForSession(id));
        if(expected.compareTo(reviewedExpected)!=0) throw BusinessException.of(ErrorCode.CONCURRENT_MODIFICATION,
            "Le solde a changé. Actualisez la caisse avant de confirmer la clôture.");
        if(actual.compareTo(expected)!=0 && (notes==null || notes.isBlank()))
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR, "Expliquez l’écart de caisse.");
        s.close(expected,actual); s.setNotes(notes); sessions.saveAndFlush(s);
        audit.logValidate("CashSession",s.getId(),s.getReference(),notes);
        return response(s);
    }
    private Session response(CashSession s) {
        BigDecimal cash=s.isOpen()?payments.sumCashForSession(s.getId()):s.getExpectedBalance().subtract(s.getOpeningBalance());
        BigDecimal expected=s.getOpeningBalance().add(cash);
        return new Session(s.getId(),s.getReference(),s.getStatus().name(),s.getOpenedAt(),s.getClosedAt(),s.getOpeningBalance(),cash,
            expected,s.getActualBalance(),s.getActualBalance()==null?null:s.getActualBalance().subtract(expected),s.getNotes());
    }
}
