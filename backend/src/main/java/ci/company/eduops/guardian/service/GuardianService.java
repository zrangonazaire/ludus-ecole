package ci.company.eduops.guardian.service;

import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.guardian.dto.response.GuardianResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class GuardianService {

    private final GuardianRepository guardianRepository;
    private final StudentGuardianRepository linkRepository;

    public GuardianService(GuardianRepository guardianRepository,
                           StudentGuardianRepository linkRepository) {
        this.guardianRepository = guardianRepository;
        this.linkRepository = linkRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<GuardianResponse> search(int page, int size, String search) {
        UUID schoolId = TenantContext.getSchoolId();
        String term = search == null ? "" : search.trim();
        PageRequest pageable = PageRequest.of(Math.max(0, page), Math.min(Math.max(1, size), 200),
                Sort.by("lastName").ascending().and(Sort.by("firstName").ascending()));
        return PageResponse.from(guardianRepository.search(schoolId, term, pageable),
                this::toResponse);
    }

    private GuardianResponse toResponse(Guardian guardian) {
        GuardianResponse response = new GuardianResponse();
        response.setId(guardian.getId());
        response.setFirstName(guardian.getFirstName());
        response.setLastName(guardian.getLastName());
        response.setFullName(guardian.fullName());
        response.setPhone(guardian.getPhone());
        response.setPhoneSecondary(guardian.getPhoneSecondary());
        response.setEmail(guardian.getEmail());
        response.setProfession(guardian.getProfession());
        response.setCity(guardian.getCity());
        response.setPreferredChannel(guardian.getPreferredChannel().name());
        response.setStatus(guardian.getStatus().name());
        response.setStudents(linkRepository.findByGuardianId(guardian.getId()).stream()
                .map(link -> new GuardianResponse.LinkedStudent(
                        link.getStudent().getId(), link.getStudent().fullName(),
                        link.getStudent().getStudentNumber()))
                .toList());
        return response;
    }
}
