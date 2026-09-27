package ci.company.eduops.finance.service;

import ci.company.eduops.finance.domain.CollectionAction;
import ci.company.eduops.finance.dto.request.CollectionActionRequest;
import ci.company.eduops.finance.dto.response.CollectionActionResponse;
import ci.company.eduops.finance.repository.CollectionActionRepository;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.security.service.CurrentUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class CollectionService {
    private final CollectionActionRepository repository;
    private final StudentRepository students;
    private final OutstandingService outstanding;
    private final CurrentUser currentUser;

    @Transactional(readOnly = true)
    public List<CollectionActionResponse> history(UUID studentId, UUID yearId) {
        checkStudent(studentId);
        UUID year = outstanding.resolveYear(yearId).getId();
        return repository.findBySchoolIdAndStudentIdAndAcademicYearIdOrderByCreatedAtDesc(
                TenantContext.getSchoolId(), studentId, year).stream().map(this::response).toList();
    }

    @Transactional
    public CollectionActionResponse create(UUID studentId, UUID yearId, CollectionActionRequest request) {
        checkStudent(studentId);
        UUID year = outstanding.resolveYear(yearId).getId();
        if ((request.getPromisedAmount() == null) != (request.getPromisedDate() == null)) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Indiquez ensemble le montant promis et la date de paiement.");
        }
        CollectionAction action = new CollectionAction();
        action.setSchoolId(TenantContext.getSchoolId());
        action.setStudentId(studentId);
        action.setAcademicYearId(year);
        action.setCreatedBy(currentUser.requireId());
        action.setAuthorName(currentUser.username());
        action.setChannel(request.getChannel());
        action.setNote(request.getNote().trim());
        action.setNextContactDate(request.getNextContactDate());
        action.setPromisedDate(request.getPromisedDate());
        action.setPromisedAmount(request.getPromisedAmount());
        return response(repository.saveAndFlush(action));
    }

    private void checkStudent(UUID id) {
        var student = students.findById(id)
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));
        if (!student.getSchool().getId().equals(TenantContext.getSchoolId())) {
            throw BusinessException.of(ErrorCode.STUDENT_NOT_FOUND);
        }
    }

    private CollectionActionResponse response(CollectionAction a) {
        var r = new CollectionActionResponse();
        r.setId(a.getId()); r.setChannel(a.getChannel()); r.setNote(a.getNote());
        r.setAuthorName(a.getAuthorName()); r.setCreatedAt(a.getCreatedAt());
        r.setNextContactDate(a.getNextContactDate()); r.setPromisedDate(a.getPromisedDate());
        r.setPromisedAmount(a.getPromisedAmount());
        return r;
    }
}
