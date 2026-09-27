package ci.company.eduops.teacher.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.domain.TeacherStatus;
import ci.company.eduops.teacher.dto.response.TeacherResponse;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/** Reading the teaching staff. */
@Service
public class TeacherQueryService {

    private static final int MAX_PAGE_SIZE = 200;

    private final TeacherRepository teacherRepository;
    private final AcademicYearRepository academicYearRepository;
    private final AppUserRepository userRepository;

    public TeacherQueryService(TeacherRepository teacherRepository,
                               AcademicYearRepository academicYearRepository,
                               AppUserRepository userRepository) {
        this.teacherRepository = teacherRepository;
        this.academicYearRepository = academicYearRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<TeacherResponse> search(int page, int size, String search,
                                                 String status) {
        UUID schoolId = requireSchoolId();
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        PageRequest request = PageRequest.of(Math.max(page, 0), safeSize);

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

    /**
     * Le tableau des enseignants : les comptes portant le profil Enseignant,
     * avec leur fiche quand elle existe.
     *
     * <p>Un compte au profil Enseignant est un enseignant même sans fiche
     * pédagogique : il doit donc apparaître, avec l'action qui permet de créer
     * la fiche. Une fiche restée sans compte figure aussi, sinon plus aucun
     * écran ne permettrait de la rattacher (voir la migration V56).</p>
     *
     * <p>Le tri et la pagination sont faits ici : les deux sources sont
     * fusionnées avant de découper la page, la base ne peut pas ordonner un
     * ensemble qu'elle ne connaît pas d'un seul tenant.</p>
     */
    @Transactional(readOnly = true)
    public PageResponse<TeacherResponse> roster(int page, int size, String search, String status) {
        UUID schoolId = requireSchoolId();
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        String term = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        String wanted = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
        Map<UUID, Integer> classCounts = classCounts();

        // Une fiche par compte : la contrainte uq_teacher_user le garantit.
        Map<UUID, Teacher> fichesByAccount = new HashMap<>();
        List<Teacher> fichesWithoutAccount = new ArrayList<>();
        for (Teacher teacher : teacherRepository.findBySchoolId(schoolId)) {
            if (teacher.getUserAccountId() == null) {
                fichesWithoutAccount.add(teacher);
            } else {
                fichesByAccount.put(teacher.getUserAccountId(), teacher);
            }
        }

        List<TeacherResponse> rows = new ArrayList<>();
        for (AppUser account : userRepository.findTeacherProfiles(schoolId)) {
            rows.add(fromAccount(account, fichesByAccount.remove(account.getId()), classCounts));
        }
        // Ce qui reste : les fiches sans compte, et celles dont le compte ne
        // porte pas le profil Enseignant. Les perdre rendrait le rattachement
        // impossible (voir la migration V56).
        for (Teacher orphan : fichesByAccount.values()) {
            rows.add(toResponse(orphan, classCounts));
        }
        for (Teacher orphan : fichesWithoutAccount) {
            rows.add(toResponse(orphan, classCounts));
        }

        List<TeacherResponse> matching = rows.stream()
                .filter(row -> term.isEmpty() || matches(row, term))
                .filter(row -> wanted.isEmpty()
                        || wanted.equalsIgnoreCase(row.getStatus() == null ? "" : row.getStatus()))
                .sorted(Comparator
                        .comparing((TeacherResponse row) -> lower(row.getLastName()))
                        .thenComparing(row -> lower(row.getFirstName())))
                .toList();

        int from = Math.min(Math.max(page, 0) * safeSize, matching.size());
        int to = Math.min(from + safeSize, matching.size());
        PageResponse<TeacherResponse> response = new PageResponse<>();
        response.setContent(new ArrayList<>(matching.subList(from, to)));
        response.setPage(safeSize == 0 ? 0 : from / safeSize);
        response.setSize(safeSize);
        response.setTotalElements(matching.size());
        response.setTotalPages(safeSize == 0 ? 0 : (int) Math.ceil((double) matching.size() / safeSize));
        response.setFirst(from == 0);
        response.setLast(to >= matching.size());
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
        row.setHasTeacherRecord(true);
        row.setUserAccountId(teacher.getUserAccountId());
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

    /**
     * Une ligne née d'un compte au profil Enseignant.
     *
     * <p>Sans fiche, l'identité et le statut viennent du compte, et
     * l'identifiant de ligne est celui du compte : la ligne existe pour que la
     * fiche puisse être créée, pas pour être ouverte comme une fiche.</p>
     */
    private TeacherResponse fromAccount(AppUser account, Teacher fiche, Map<UUID, Integer> classCounts) {
        TeacherResponse row;
        if (fiche == null) {
            row = new TeacherResponse();
            row.setId(account.getId());
            row.setUserAccountId(account.getId());
            row.setHasTeacherRecord(false);
            row.setStatus(account.getStatus() != null ? account.getStatus().name() : null);
            row.setClassCount(0);
        } else {
            row = toResponse(fiche, classCounts);
            row.setUserAccountId(account.getId());
        }
        // L'identité affichée est celle du compte : il peut être renommé, la
        // fiche gardant les valeurs copiées à sa création.
        row.setFirstName(account.getFirstName());
        row.setLastName(account.getLastName());
        row.setFullName(account.getFirstName() + " " + account.getLastName());
        row.setEmail(account.getEmail());
        row.setPhone(account.getPhone());
        return row;
    }

    private boolean matches(TeacherResponse row, String term) {
        return contains(row.getFullName(), term) || contains(row.getEmail(), term)
                || contains(row.getEmployeeNumber(), term) || contains(row.getSpeciality(), term);
    }

    private static boolean contains(String value, String term) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(term);
    }

    private static String lower(String value) {
        return value == null ? "" : value.toLowerCase(Locale.ROOT);
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
