package ci.company.eduops.student.service;

import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.payment.repository.PaymentRepository;
import ci.company.eduops.payment.repository.ReceiptRepository;
import ci.company.eduops.student.dto.response.StudentStatementResponse;
import ci.company.eduops.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import java.time.OffsetDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StudentStatementService {
    private final StudentRepository students;
    private final StudentQueryService query;
    private final PaymentRepository payments;
    private final ReceiptRepository receipts;
    private final AcademicYearRepository years;
    private final StudentFeeRepository fees;

    /** One database snapshot prevents a payment arriving halfway through the printed statement. */
    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public StudentStatementResponse get(UUID studentId) {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) throw new BusinessException(ErrorCode.ACCESS_DENIED);
        var student = students.findById(studentId)
                .filter(s -> s.getSchool() != null && schoolId.equals(s.getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.STUDENT_NOT_FOUND));
        var school = student.getSchool();
        var detail = query.detail(studentId);
        var enrollments = query.enrollments(studentId);
        var history = payments.findByStudentIdOrderByPaymentDateDesc(studentId);
        Map<UUID, String> receiptNumbers = new HashMap<>();
        receipts.findByStudentIdOrderByIssueDateDesc(studentId)
                .forEach(r -> receiptNumbers.put(r.getPayment().getId(), r.getReceiptNumber()));
        Set<UUID> yearIds = new HashSet<>(fees.findAcademicYearIdsForStudent(studentId));
        enrollments.forEach(e -> yearIds.add(e.getAcademicYearId()));
        history.forEach(p -> yearIds.add(p.getAcademicYear().getId()));
        var balances = years.findBySchoolOrderByStartDateDesc(schoolId).stream()
                .filter(y -> yearIds.contains(y.getId()))
                .map(y -> new StudentStatementResponse.YearBalance(y.getId(), y.getLabel(),
                        query.financialSummary(studentId, y.getId()))).toList();
        var lines = history.stream().map(p -> new StudentStatementResponse.PaymentLine(
                p.getId(), p.getAcademicYear().getLabel(), p.getPaymentDate(), p.getPaymentReference(),
                receiptNumbers.get(p.getId()), p.getPaymentMethod().name(), p.getStatus().name(), p.getPayerName(),
                p.getAmount(), p.getAllocatedAmount(), p.remainingToAllocate(), p.getCurrency())).toList();
        String address = java.util.stream.Stream.of(school.getAddressLine1(), school.getCity())
                .filter(s -> s != null && !s.isBlank()).collect(java.util.stream.Collectors.joining(" · "));
        return new StudentStatementResponse(school.getName(), address, school.getPhone(), OffsetDateTime.now(),
                detail, enrollments, balances, lines);
    }
}
