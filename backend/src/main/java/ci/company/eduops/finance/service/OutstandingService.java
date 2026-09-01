package ci.company.eduops.finance.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.dto.response.OutstandingBoardResponse;
import ci.company.eduops.finance.dto.response.OutstandingStudentResponse;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.student.domain.Student;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/** Builds the collection board from the fee ledger, never from payment totals. */
@Service
public class OutstandingService {

    private static final int CRITICAL_AFTER_DAYS = 30;
    private static final int DUE_SOON_DAYS = 15;

    private final StudentFeeRepository feeRepository;
    private final StudentGuardianRepository guardianRepository;
    private final AcademicYearRepository academicYearRepository;

    public OutstandingService(StudentFeeRepository feeRepository,
                              StudentGuardianRepository guardianRepository,
                              AcademicYearRepository academicYearRepository) {
        this.feeRepository = feeRepository;
        this.guardianRepository = guardianRepository;
        this.academicYearRepository = academicYearRepository;
    }

    @Transactional(readOnly = true)
    public OutstandingBoardResponse board(UUID academicYearId, String search,
                                          String bucket, Pageable pageable) {
        AcademicYear year = resolveYear(academicYearId);
        List<OutstandingStudentResponse> allRows = aggregate(
                feeRepository.findAllOutstandingForYear(year.getId()));

        OutstandingBoardResponse response = totals(allRows, year);
        List<OutstandingStudentResponse> filtered = allRows.stream()
                .filter(row -> matches(row, search))
                .filter(row -> inBucket(row, bucket))
                .sorted(Comparator.comparingLong(OutstandingStudentResponse::getDaysOverdue)
                        .reversed()
                        .thenComparing(OutstandingStudentResponse::getOutstandingAmount,
                                Comparator.reverseOrder())
                        .thenComparing(OutstandingStudentResponse::getStudentName,
                                String.CASE_INSENSITIVE_ORDER))
                .toList();

        int size = Math.max(1, pageable.getPageSize());
        int page = Math.max(0, pageable.getPageNumber());
        int from = Math.min(page * size, filtered.size());
        int to = Math.min(from + size, filtered.size());
        int totalPages = filtered.isEmpty() ? 0 : (int) Math.ceil(filtered.size() / (double) size);
        response.setStudents(new PageResponse<>(
                filtered.subList(from, to), page, size, filtered.size(), totalPages,
                page == 0, totalPages == 0 || page >= totalPages - 1));
        return response;
    }

    private List<OutstandingStudentResponse> aggregate(List<StudentFee> fees) {
        Map<UUID, List<StudentFee>> byStudent = new LinkedHashMap<>();
        for (StudentFee fee : fees) {
            byStudent.computeIfAbsent(fee.getStudent().getId(), ignored -> new ArrayList<>())
                    .add(fee);
        }

        LocalDate today = LocalDate.now();
        List<OutstandingStudentResponse> rows = new ArrayList<>();
        for (List<StudentFee> studentFees : byStudent.values()) {
            StudentFee first = studentFees.get(0);
            Student student = first.getStudent();
            OutstandingStudentResponse row = new OutstandingStudentResponse();
            row.setStudentId(student.getId());
            row.setStudentNumber(student.getStudentNumber());
            row.setStudentName(student.fullName());
            row.setPhotoUrl(student.getPhotoUrl());
            row.setClassroomName(first.getEnrollment().getClassroom().getName());
            row.setCurrency(first.getCurrency());
            row.setInstalmentCount(studentFees.size());
            row.setOutstandingAmount(studentFees.stream().map(StudentFee::outstanding)
                    .reduce(MoneyUtils.ZERO, BigDecimal::add));
            row.setOverdueAmount(studentFees.stream()
                    .filter(fee -> fee.getDueDate().isBefore(today))
                    .map(StudentFee::outstanding)
                    .reduce(MoneyUtils.ZERO, BigDecimal::add));
            LocalDate oldest = studentFees.stream().map(StudentFee::getDueDate)
                    .min(LocalDate::compareTo).orElse(today);
            row.setOldestDueDate(oldest);
            row.setDaysOverdue(oldest.isBefore(today)
                    ? ChronoUnit.DAYS.between(oldest, today) : 0);
            attachGuardian(row, student.getId());
            rows.add(row);
        }
        return rows;
    }

    private void attachGuardian(OutstandingStudentResponse row, UUID studentId) {
        StudentGuardian link = guardianRepository
                .findByStudentIdAndFinancialResponsibilityTrue(studentId)
                .or(() -> guardianRepository.findByStudentIdAndPrimaryTrue(studentId))
                .orElse(null);
        if (link == null) return;
        row.setGuardianName(link.getGuardian().fullName());
        row.setGuardianPhone(link.getGuardian().getPhone());
        row.setGuardianEmail(link.getGuardian().getEmail());
    }

    private OutstandingBoardResponse totals(List<OutstandingStudentResponse> rows,
                                            AcademicYear year) {
        OutstandingBoardResponse response = new OutstandingBoardResponse();
        response.setTotalOutstanding(rows.stream().map(OutstandingStudentResponse::getOutstandingAmount)
                .reduce(MoneyUtils.ZERO, BigDecimal::add));
        response.setOverdueAmount(rows.stream().map(OutstandingStudentResponse::getOverdueAmount)
                .reduce(MoneyUtils.ZERO, BigDecimal::add));
        response.setStudentCount(rows.size());
        response.setCriticalCount(rows.stream()
                .filter(row -> row.getDaysOverdue() >= CRITICAL_AFTER_DAYS).count());
        response.setCurrency(year.getSchool().getCurrency());
        return response;
    }

    private boolean matches(OutstandingStudentResponse row, String search) {
        if (search == null || search.isBlank()) return true;
        String needle = search.trim().toLowerCase(Locale.ROOT);
        return contains(row.getStudentName(), needle)
                || contains(row.getStudentNumber(), needle)
                || contains(row.getClassroomName(), needle)
                || contains(row.getGuardianName(), needle);
    }

    private boolean contains(String value, String needle) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(needle);
    }

    private boolean inBucket(OutstandingStudentResponse row, String bucket) {
        if (bucket == null || bucket.isBlank() || "ALL".equalsIgnoreCase(bucket)) return true;
        return switch (bucket.toUpperCase(Locale.ROOT)) {
            case "OVERDUE" -> row.getDaysOverdue() > 0;
            case "CRITICAL" -> row.getDaysOverdue() >= CRITICAL_AFTER_DAYS;
            case "DUE_SOON" -> row.getDaysOverdue() == 0
                    && !row.getOldestDueDate().isAfter(LocalDate.now().plusDays(DUE_SOON_DAYS));
            default -> true;
        };
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            AcademicYear year = academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
            if (!requireSchool().equals(year.getSchool().getId())) {
                throw new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND);
            }
            return year;
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchool(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active."));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        }
        return schoolId;
    }
}
