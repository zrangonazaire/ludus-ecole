package ci.company.eduops.teacher.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.domain.TeacherStatus;
import ci.company.eduops.teacher.dto.response.TeacherResponse;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/** Reading the teaching staff. */
@Service
public class TeacherQueryService {

    private static final int MAX_PAGE_SIZE = 200;

    private final TeacherRepository teacherRepository;
    private final AcademicYearRepository academicYearRepository;

    public TeacherQueryService(TeacherRepository teacherRepository,
                               AcademicYearRepository academicYearRepository) {
        this.teacherRepository = teacherRepository;
        this.academicYearRepository = academicYearRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<TeacherResponse> search(int page, int size, String search,
                                                 String status) {
        UUID schoolId = requireSchoolId();
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        PageRequest request = PageRequest.of(Math.max(page, 0), safeSize,
                Sort.by("lastName").ascending().and(Sort.by("firstName").ascending()));

        // Chaîne vide plutôt que null : voir la note sur la requête.
        TeacherStatus parsed = parseStatus(status);
        Page<Teacher> found = teacherRepository.search(schoolId,
                parsed == null ? "" : parsed.name(),
                search == null ? "" : search.trim(),
                request);
        Map<UUID, Integer> classCounts = classCounts();

        List<TeacherResponse> rows = new ArrayList<>();
        for (Teacher teacher : found.getContent()) {
            rows.add(toResponse(teacher, classCounts));
        }

        PageResponse<TeacherResponse> response = new PageResponse<>();
        response.setContent(rows);
        response.setPage(found.getNumber());
        response.setSize(found.getSize());
        response.setTotalElements(found.getTotalElements());
        response.setTotalPages(found.getTotalPages());
        response.setFirst(found.isFirst());
        response.setLast(found.isLast());
        return response;
    }

    @Transactional(readOnly = true)
    public TeacherResponse detail(UUID teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));
        UUID schoolId = requireSchoolId();
        if (teacher.getSchool() == null || !schoolId.equals(teacher.getSchool().getId())) {
            // Meme reponse qu'un identifiant inconnu : distinguer les deux
            // renseignerait sur le personnel d'un autre etablissement.
            throw new BusinessException(ErrorCode.TEACHER_NOT_FOUND);
        }
        return toResponse(teacher, classCounts());
    }

    // ------------------------------------------------------------ plomberie

    private TeacherResponse toResponse(Teacher teacher, Map<UUID, Integer> classCounts) {
        TeacherResponse row = new TeacherResponse();
        row.setId(teacher.getId());
        row.setEmployeeNumber(teacher.getEmployeeNumber());
        row.setFirstName(teacher.getFirstName());
        row.setLastName(teacher.getLastName());
        row.setFullName(teacher.fullName());
        row.setEmail(teacher.getEmail());
        row.setPhone(teacher.getPhone());
        row.setPhotoUrl(teacher.getPhotoUrl());
        row.setSpeciality(teacher.getSpeciality());
        row.setStatus(teacher.getStatus() != null ? teacher.getStatus().name() : null);
        row.setClassCount(classCounts.getOrDefault(teacher.getId(), 0));
        // Les matieres enseignees vivent dans teacher_subject, qui n'a pas
        // encore d'entite. La liste reste vide plutot que remplie au hasard :
        // afficher « Mathematiques » pour un professeur de francais serait pire
        // que ne rien afficher.
        return row;
    }

    /** Form-tutor counts for the active year, in one query. */
    private Map<UUID, Integer> classCounts() {
        Map<UUID, Integer> counts = new HashMap<>();
        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(requireSchoolId(), AcademicYearStatus.ACTIVE)
                .orElse(null);
        if (year == null) {
            return counts;
        }
        for (Object[] row : teacherRepository.countClassesByTeacher(year.getId())) {
            counts.put((UUID) row[0], ((Number) row[1]).intValue());
        }
        return counts;
    }

    private TeacherStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            return null;
        }
        try {
            return TeacherStatus.valueOf(status.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private UUID requireSchoolId() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
