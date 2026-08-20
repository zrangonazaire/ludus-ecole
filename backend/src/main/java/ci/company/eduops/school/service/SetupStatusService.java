package ci.company.eduops.school.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.cycle.repository.CycleRepository;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.repository.FeeScheduleRepository;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.dto.response.SetupStatusResponse;
import ci.company.eduops.school.dto.response.SetupStepResponse;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.subject.repository.SubjectRepository;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Works out how far a school has got with its configuration.
 *
 * <p>Deliberately derived from the data rather than stored as a flag. An
 * administrator who creates classes by hand, imports pupils from Excel, or
 * abandons the wizard halfway still gets an accurate picture — and nothing has
 * to be kept in sync.</p>
 */
@Service
public class SetupStatusService {

    private final SchoolRepository schoolRepository;
    private final AcademicYearRepository academicYearRepository;
    private final CycleRepository cycleRepository;
    private final LevelRepository levelRepository;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final FeeScheduleRepository feeScheduleRepository;
    private final TeacherRepository teacherRepository;
    private final EnrollmentRepository enrollmentRepository;

    public SetupStatusService(SchoolRepository schoolRepository,
                              AcademicYearRepository academicYearRepository,
                              CycleRepository cycleRepository,
                              LevelRepository levelRepository,
                              ClassroomRepository classroomRepository,
                              SubjectRepository subjectRepository,
                              FeeScheduleRepository feeScheduleRepository,
                              TeacherRepository teacherRepository,
                              EnrollmentRepository enrollmentRepository) {
        this.schoolRepository = schoolRepository;
        this.academicYearRepository = academicYearRepository;
        this.cycleRepository = cycleRepository;
        this.levelRepository = levelRepository;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.feeScheduleRepository = feeScheduleRepository;
        this.teacherRepository = teacherRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Transactional(readOnly = true)
    public SetupStatusResponse currentStatus() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.PORTAL_PROFILE_MISSING,
                    "Aucun etablissement associe a ce compte.");
        }

        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));

        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElse(null);
        UUID yearId = year == null ? null : year.getId();

        List<SetupStepResponse> steps = new ArrayList<>();

        steps.add(new SetupStepResponse(
                "CYCLES", "Cycles et niveaux",
                "Definissez les cycles enseignes et leurs niveaux : primaire, college, lycee.",
                true,
                countLevels(schoolId),
                "/onboarding",
                "Configurer"));

        steps.add(new SetupStepResponse(
                "CLASSES", "Classes",
                "Creez les classes de chaque niveau, avec leur capacite maximale.",
                true,
                yearId == null ? 0 : classroomRepository.countActive(yearId),
                "/classes",
                "Gerer les classes"));

        steps.add(new SetupStepResponse(
                "SUBJECTS", "Matieres",
                "Renseignez les matieres enseignees et leurs coefficients.",
                true,
                subjectRepository.findBySchoolIdAndStatusOrderByNameAsc(
                        schoolId, ci.company.eduops.common.domain.CommonStatus.ACTIVE).size(),
                "/subjects",
                "Gerer les matieres"));

        steps.add(new SetupStepResponse(
                "FEES", "Frais de scolarite",
                "Fixez les frais par niveau et leur echeancier.",
                true,
                yearId == null ? 0 : feeScheduleRepository.findByAcademicYearId(yearId).size(),
                "/finance",
                "Definir les frais"));

        steps.add(new SetupStepResponse(
                "TEACHERS", "Enseignants",
                "Ajoutez les enseignants et affectez-les aux classes et matieres.",
                true,
                teacherRepository.countBySchoolIdAndStatus(
                        schoolId, ci.company.eduops.teacher.domain.TeacherStatus.ACTIVE),
                "/teachers",
                "Ajouter des enseignants"));

        steps.add(new SetupStepResponse(
                "STUDENTS", "Eleves inscrits",
                "Inscrivez vos premiers eleves, un a un ou par import Excel.",
                true,
                yearId == null ? 0 : enrollmentRepository.countActiveForYear(yearId),
                "/enrollments",
                "Inscrire des eleves"));

        return summarise(school, year, steps);
    }

    /** Levels across every cycle of the school. */
    private long countLevels(UUID schoolId) {
        return cycleRepository.findBySchoolIdOrderBySequenceAsc(schoolId).stream()
                .mapToLong(cycle -> levelRepository
                        .findByCycleIdOrderBySequenceAsc(cycle.getId()).size())
                .sum();
    }

    private SetupStatusResponse summarise(School school, AcademicYear year,
                                          List<SetupStepResponse> steps) {
        SetupStatusResponse response = new SetupStatusResponse();
        response.setSchoolId(school.getId());
        response.setSchoolName(school.getName());
        response.setAcademicYearCode(year == null ? null : year.getCode());
        response.setSteps(steps);

        List<SetupStepResponse> required = steps.stream()
                .filter(SetupStepResponse::isRequired)
                .toList();

        int done = (int) required.stream().filter(SetupStepResponse::isDone).count();
        response.setTotalSteps(required.size());
        response.setCompletedSteps(done);
        response.setPercentComplete(required.isEmpty()
                ? 100
                : Math.round(done * 100f / required.size()));
        response.setComplete(done == required.size());

        response.setNextStepKey(required.stream()
                .filter(step -> !step.isDone())
                .map(SetupStepResponse::getKey)
                .findFirst()
                .orElse(null));

        return response;
    }
}
