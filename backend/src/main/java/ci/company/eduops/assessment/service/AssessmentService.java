package ci.company.eduops.assessment.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.assessment.domain.Assessment;
import ci.company.eduops.assessment.domain.AssessmentStatus;
import ci.company.eduops.assessment.domain.AssessmentType;
import ci.company.eduops.assessment.dto.request.AssessmentUpsertRequest;
import ci.company.eduops.assessment.dto.request.GradeCorrectionRequest;
import ci.company.eduops.assessment.dto.request.GradeEntryRequest;
import ci.company.eduops.assessment.dto.request.GradeSheetSaveRequest;
import ci.company.eduops.assessment.dto.response.AssessmentBoardResponse;
import ci.company.eduops.assessment.dto.response.AssessmentResponse;
import ci.company.eduops.assessment.dto.response.GradeRowResponse;
import ci.company.eduops.assessment.dto.response.GradeSheetResponse;
import ci.company.eduops.assessment.repository.AssessmentRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.event.DomainEventPublisher;
import ci.company.eduops.common.event.DomainEventType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.domain.Curriculum;
import ci.company.eduops.curriculum.repository.CurriculumRepository;
import ci.company.eduops.curriculum.repository.CurriculumSubjectRepository;
import ci.company.eduops.curriculum.repository.TeacherAssignmentRepository;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.grade.domain.Grade;
import ci.company.eduops.grade.domain.GradeRevision;
import ci.company.eduops.grade.domain.GradeStatus;
import ci.company.eduops.grade.repository.GradeRepository;
import ci.company.eduops.grade.repository.GradeRevisionRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.repository.TermRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Assessments and the marks they carry.
 *
 * <p>A paper goes through six states, and each one is a different person's
 * responsibility: planned by whoever holds the timetable, sat, corrected by the
 * teacher, submitted, validated by the office, published to the families. The
 * chain exists so that no mark reaches a parent without a second pair of eyes,
 * and so that a mark which entered an average can be traced back to the day it
 * was validated.</p>
 *
 * <p>Five refusals are enforced here rather than left to the screen:</p>
 * <ul>
 *   <li>A paper dated outside its term is refused. The mark would land in the
 *       wrong report card, and nothing downstream would notice.</li>
 *   <li>A subject that is not in the level's programme carries no coefficient.
 *       Marking it produces figures that cannot enter any average — the screen
 *       says so and names where to fix it.</li>
 *   <li>Only the teacher assigned to that class and that subject may be put on
 *       the paper. Otherwise the marks are unreachable from the teacher's own
 *       screens, and nobody is accountable for the correction.</li>
 *   <li>A half-marked sheet cannot be submitted. Missing marks are invisible in
 *       an average: the pupils simply weigh less, quietly.</li>
 *   <li>A published mark changes only with a written reason, kept beside the
 *       old value. A mark that moves silently is indistinguishable from one
 *       that was tampered with, and the pupil cannot contest it.</li>
 * </ul>
 */
@Service
public class AssessmentService {

    private static final Logger log = LoggerFactory.getLogger(AssessmentService.class);

    /** Past this, a paper sat but not corrected will not catch up in the term. */
    private static final int OVERDUE_AFTER_DAYS = 7;

    private static final List<EnrollmentStatus> LIVE_ENROLLMENTS =
            List.of(EnrollmentStatus.VALIDATED, EnrollmentStatus.ACTIVE);

    private final AssessmentRepository assessmentRepository;
    private final GradeRepository gradeRepository;
    private final GradeRevisionRepository revisionRepository;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherRepository teacherRepository;
    private final TermRepository termRepository;
    private final AcademicYearRepository academicYearRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CurriculumRepository curriculumRepository;
    private final CurriculumSubjectRepository curriculumSubjectRepository;
    private final TeacherAssignmentRepository assignmentRepository;
    private final DomainEventPublisher eventPublisher;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public AssessmentService(AssessmentRepository assessmentRepository,
                             GradeRepository gradeRepository,
                             GradeRevisionRepository revisionRepository,
                             ClassroomRepository classroomRepository,
                             SubjectRepository subjectRepository,
                             TeacherRepository teacherRepository,
                             TermRepository termRepository,
                             AcademicYearRepository academicYearRepository,
                             EnrollmentRepository enrollmentRepository,
                             CurriculumRepository curriculumRepository,
                             CurriculumSubjectRepository curriculumSubjectRepository,
                             TeacherAssignmentRepository assignmentRepository,
                             DomainEventPublisher eventPublisher,
                             AuditService auditService,
                             CurrentUser currentUser) {
        this.assessmentRepository = assessmentRepository;
        this.gradeRepository = gradeRepository;
        this.revisionRepository = revisionRepository;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
        this.termRepository = termRepository;
        this.academicYearRepository = academicYearRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.curriculumRepository = curriculumRepository;
        this.curriculumSubjectRepository = curriculumSubjectRepository;
        this.assignmentRepository = assignmentRepository;
        this.eventPublisher = eventPublisher;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // ------------------------------------------------------------- the board

    @Transactional(readOnly = true)
    public AssessmentBoardResponse board(UUID termId, UUID classroomId, UUID subjectId,
                                         AssessmentStatus status, boolean includeCancelled,
                                         UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Term term = termId != null
                ? requireTerm(termId)
                : termRepository.findCoveringDate(year.getId(), LocalDate.now()).orElse(null);

        List<Assessment> assessments = assessmentRepository.search(
                year.getId(), term != null ? term.getId() : null,
                classroomId, subjectId, status == null ? "" : status.name(),
                includeCancelled);

        List<AssessmentResponse> lines = describe(assessments, year.getId());

        AssessmentBoardResponse board = new AssessmentBoardResponse();
        board.setAcademicYearId(year.getId());
        if (term != null) {
            board.setTermId(term.getId());
            board.setTermName(term.getName());
            board.setTermStart(term.getStartDate());
            board.setTermEnd(term.getEndDate());
        }
        board.setAssessments(lines);
        board.setTotal(lines.size());
        board.setPlannedCount(count(lines, AssessmentStatus.PLANNED)
                + count(lines, AssessmentStatus.DRAFT));
        board.setGradingCount(count(lines, AssessmentStatus.OPEN)
                + count(lines, AssessmentStatus.GRADING));
        board.setAwaitingValidationCount(count(lines, AssessmentStatus.SUBMITTED));
        board.setAwaitingPublicationCount(count(lines, AssessmentStatus.VALIDATED));
        board.setPublishedCount(count(lines, AssessmentStatus.PUBLISHED));

        LocalDate today = LocalDate.now();
        board.setOverdueCount((int) lines.stream()
                .filter((line) -> line.getStatus() == AssessmentStatus.OPEN
                        || line.getStatus() == AssessmentStatus.GRADING)
                .filter((line) -> line.getGradedCount() == 0)
                .filter((line) -> ChronoUnit.DAYS.between(line.getAssessmentDate(), today)
                        >= OVERDUE_AFTER_DAYS)
                .count());
        return board;
    }

    // -------------------------------------------------------- the assessment

    @Transactional
    public AssessmentResponse create(AssessmentUpsertRequest request, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Assessment assessment = new Assessment();
        assessment.setAcademicYear(year);
        apply(assessment, request, year);
        assessment.setStatus(AssessmentStatus.PLANNED);

        Assessment saved = assessmentRepository.save(assessment);
        auditService.logCreate("Assessment", saved.getId(),
                saved.getTitle(),
                Map.of("classroom", saved.getClassroom().getName(),
                        "subject", saved.getSubject().getName(),
                        "date", saved.getAssessmentDate().toString(),
                        "maxScore", saved.getMaxScore().toPlainString()));

        log.info("Assessment planned: {} for {} on {}", saved.getTitle(),
                saved.getClassroom().getName(), saved.getAssessmentDate());
        return describe(saved, year.getId());
    }

    /**
     * Corrects a paper's description.
     *
     * <p>The scale is frozen once a single mark exists. Changing it afterwards
     * would leave every mark already entered attached to a scale it was not
     * marked on, and each of them would move without anyone touching it.</p>
     */
    @Transactional
    public AssessmentResponse update(UUID assessmentId, AssessmentUpsertRequest request) {
        Assessment assessment = requireAssessment(assessmentId);
        if (assessment.getStatus() == AssessmentStatus.PUBLISHED
                || assessment.getStatus() == AssessmentStatus.CANCELLED) {
            throw new BusinessException(ErrorCode.ASSESSMENT_INVALID_TRANSITION,
                    "Un devoir publié ou annulé ne se modifie plus.");
        }

        BigDecimal previousScale = assessment.getMaxScore();
        long marks = gradeRepository.findByAssessmentId(assessmentId).stream()
                .filter((grade) -> grade.getScore() != null)
                .count();
        if (marks > 0 && previousScale.compareTo(request.getMaxScore()) != 0) {
            throw new BusinessException(ErrorCode.ASSESSMENT_INVALID_TRANSITION,
                    "Le barème ne peut plus changer : " + marks + " note(s) ont déjà été "
                            + "saisies sur /" + previousScale.stripTrailingZeros().toPlainString()
                            + ". Les modifier toutes en une fois ferait bouger des notes "
                            + "sans que personne y touche.");
        }

        apply(assessment, request, assessment.getAcademicYear());
        Assessment saved = assessmentRepository.save(assessment);
        auditService.logUpdate("Assessment", saved.getId(), saved.getTitle(),
                Map.of("title", assessment.getTitle()),
                Map.of("title", request.getTitle(),
                        "date", request.getAssessmentDate().toString()));
        return describe(saved, saved.getAcademicYear().getId());
    }

    /** Moves the paper along its lifecycle, with the entity guarding the order. */
    @Transactional
    public AssessmentResponse changeStatus(UUID assessmentId, AssessmentStatus target) {
        Assessment assessment = requireAssessment(assessmentId);
        AssessmentStatus previous = assessment.getStatus();
        assessment.changeStatus(target);

        if (target == AssessmentStatus.OPEN) {
            ensureGradeRows(assessment);
        }
        Assessment saved = assessmentRepository.save(assessment);
        auditService.logUpdate("Assessment", saved.getId(), saved.getTitle(),
                Map.of("status", previous.name()), Map.of("status", target.name()));
        log.info("Assessment {} moved {} -> {}", saved.getId(), previous, target);
        return describe(saved, saved.getAcademicYear().getId());
    }

    // -------------------------------------------------------------- the marks

    @Transactional(readOnly = true)
    public GradeSheetResponse sheet(UUID assessmentId) {
        Assessment assessment = requireAssessment(assessmentId);
        return buildSheet(assessment, gradeRepository.findByAssessmentId(assessmentId));
    }

    /**
     * Saves the marks as drafts.
     *
     * <p>Saving is not submitting. A correction spread over an evening has to
     * survive a closed browser, and nothing that is still being typed should be
     * visible as final to the office.</p>
     */
    @Transactional
    public GradeSheetResponse saveGrades(UUID assessmentId, GradeSheetSaveRequest request) {
        Assessment assessment = requireAssessment(assessmentId);
        if (!assessment.getStatus().acceptsGradeEntry()) {
            throw new BusinessException(ErrorCode.ASSESSMENT_NOT_OPEN,
                    "La saisie n'est pas ouverte sur ce devoir (" + labelOf(assessment.getStatus())
                            + "). Ouvrez-la depuis le tableau des devoirs.");
        }

        Map<UUID, Enrollment> enrolled = new LinkedHashMap<>();
        for (Enrollment enrollment : liveEnrollments(assessment.getClassroom().getId())) {
            enrolled.put(enrollment.getStudent().getId(), enrollment);
        }
        Map<UUID, Grade> known = new HashMap<>();
        for (Grade grade : gradeRepository.findByAssessmentId(assessmentId)) {
            known.put(grade.getStudent().getId(), grade);
        }

        UUID userId = currentUser.id().orElse(null);
        List<Grade> saved = new ArrayList<>();

        for (GradeEntryRequest entry : request.getEntries()) {
            Enrollment enrollment = enrolled.get(entry.getStudentId());
            if (enrollment == null) {
                throw new BusinessException(ErrorCode.GRADE_NOT_ALLOWED,
                        "Un élève de la feuille n'est plus inscrit dans "
                                + assessment.getClassroom().getName()
                                + ". Rechargez la page avant de continuer.");
            }
            Grade grade = known.get(entry.getStudentId());
            if (grade == null) {
                grade = newGrade(assessment, enrollment);
            }
            if (grade.getStatus().requiresJustifiedCorrection()) {
                throw new BusinessException(ErrorCode.GRADE_ALREADY_PUBLISHED,
                        "La note de " + enrollment.getStudent().fullName() + " est déjà "
                                + "validée. Sa correction passe par le formulaire dédié, "
                                + "avec un motif écrit.");
            }

            grade.setExempted(entry.isExempted());
            if (entry.isAbsent()) {
                grade.markAbsent();
            } else {
                // applyScore refuse une note hors barème et recalcule la note
                // ramenée : c'est elle qui entrera dans la moyenne.
                grade.applyScore(entry.getScore(), assessment.getMaxScore());
            }
            grade.setComment(entry.getComment());
            grade.setEnteredBy(userId);
            saved.add(gradeRepository.save(grade));
        }

        // Le devoir bascule tout seul en correction dès la première note : le
        // tableau doit montrer que quelqu'un s'y est mis.
        if (assessment.getStatus() == AssessmentStatus.OPEN) {
            assessment.changeStatus(AssessmentStatus.GRADING);
            assessmentRepository.save(assessment);
        }

        log.info("{} grade(s) saved on assessment {}", saved.size(), assessmentId);
        return buildSheet(assessment, gradeRepository.findByAssessmentId(assessmentId));
    }

    /** The teacher hands the marks over: they become visible to the office. */
    @Transactional
    public GradeSheetResponse submit(UUID assessmentId) {
        Assessment assessment = requireAssessment(assessmentId);
        List<Grade> grades = gradeRepository.findByAssessmentId(assessmentId);

        long missing = countMissing(assessment, grades);
        if (missing > 0) {
            throw new BusinessException(ErrorCode.ASSESSMENT_NOT_OPEN,
                    missing + " élève(s) n'ont ni note ni absence. Une note manquante "
                            + "ne se voit pas dans une moyenne : l'élève pèse simplement "
                            + "moins, en silence. Marquez-les absents si c'est le cas.");
        }

        assessment.changeStatus(AssessmentStatus.SUBMITTED);
        moveGrades(grades, GradeStatus.DRAFT, GradeStatus.SUBMITTED);
        assessmentRepository.save(assessment);

        auditService.logValidate("Assessment", assessment.getId(), assessment.getTitle(),
                grades.size() + " note(s) soumises");
        log.info("Assessment {} submitted with {} grades", assessmentId, grades.size());
        return buildSheet(assessment, gradeRepository.findByAssessmentId(assessmentId));
    }

    /** The office accepts the marks: from here they count in the averages. */
    @Transactional
    public GradeSheetResponse validate(UUID assessmentId) {
        Assessment assessment = requireAssessment(assessmentId);
        List<Grade> grades = gradeRepository.findByAssessmentId(assessmentId);

        assessment.changeStatus(AssessmentStatus.VALIDATED);
        assessment.setValidatedAt(OffsetDateTime.now());
        assessment.setValidatedBy(currentUser.id().orElse(null));
        moveGrades(grades, GradeStatus.SUBMITTED, GradeStatus.VALIDATED);
        assessmentRepository.save(assessment);

        auditService.logValidate("Assessment", assessment.getId(), assessment.getTitle(),
                "Notes validées : elles entrent désormais dans les moyennes");
        log.info("Assessment {} validated", assessmentId);
        return buildSheet(assessment, gradeRepository.findByAssessmentId(assessmentId));
    }

    /** The families see the marks. Nothing changes silently after this point. */
    @Transactional
    public GradeSheetResponse publish(UUID assessmentId) {
        Assessment assessment = requireAssessment(assessmentId);
        List<Grade> grades = gradeRepository.findByAssessmentId(assessmentId);

        assessment.changeStatus(AssessmentStatus.PUBLISHED);
        assessment.setPublishedAt(OffsetDateTime.now());
        moveGrades(grades, GradeStatus.VALIDATED, GradeStatus.PUBLISHED);
        assessmentRepository.save(assessment);

        eventPublisher.event(DomainEventType.GRADE_PUBLISHED, "Assessment", assessment.getId())
                .school(requireSchool())
                .academicYear(assessment.getAcademicYear().getId())
                .classroom(assessment.getClassroom().getId())
                .with("title", assessment.getTitle())
                .with("subjectName", assessment.getSubject().getName())
                .with("classroomName", assessment.getClassroom().getName())
                .with("gradeCount", grades.size())
                .publish();

        auditService.logPublish("Assessment", assessment.getId(), assessment.getTitle());
        log.info("Assessment {} published to families", assessmentId);
        return buildSheet(assessment, gradeRepository.findByAssessmentId(assessmentId));
    }

    /**
     * Corrects a mark the family has already seen.
     *
     * <p>The previous value and the reason are kept in a revision. Without that
     * trail a corrected mark and a tampered one look exactly alike.</p>
     */
    @Transactional
    public GradeSheetResponse correct(UUID gradeId, GradeCorrectionRequest request) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new BusinessException(ErrorCode.GRADE_NOT_FOUND));
        Assessment assessment = requireAssessment(grade.getAssessment().getId());

        if (!grade.getStatus().requiresJustifiedCorrection()) {
            throw new BusinessException(ErrorCode.GRADE_NOT_ALLOWED,
                    "Cette note n'est pas encore validée : elle se modifie directement "
                            + "dans la feuille de saisie, sans passer par une correction.");
        }
        if (request.getJustification() == null || request.getJustification().isBlank()) {
            throw new BusinessException(ErrorCode.GRADE_JUSTIFICATION_REQUIRED);
        }
        currentUser.requirePermission(Permissions.GRADE_CORRECT_PUBLISHED);

        GradeRevision revision = new GradeRevision();
        revision.setGrade(grade);
        revision.setPreviousScore(grade.getScore());
        revision.setPreviousStatus(grade.getStatus());
        revision.setNewStatus(grade.getStatus());
        revision.setJustification(request.getJustification().trim());
        revision.setChangedBy(currentUser.id().orElse(null));

        if (request.isAbsent()) {
            grade.markAbsent();
        } else {
            grade.applyScore(request.getScore(), assessment.getMaxScore());
        }
        revision.setNewScore(grade.getScore());
        revisionRepository.save(revision);
        gradeRepository.save(grade);

        auditService.logUpdate("Grade", grade.getId(),
                grade.getStudent().fullName() + " — " + assessment.getTitle(),
                Map.of("score", String.valueOf(revision.getPreviousScore())),
                Map.of("score", String.valueOf(grade.getScore()),
                        "justification", revision.getJustification()));

        log.info("Grade {} corrected from {} to {}", gradeId,
                revision.getPreviousScore(), grade.getScore());
        return buildSheet(assessment, gradeRepository.findByAssessmentId(assessment.getId()));
    }

    // ------------------------------------------------------------- internals

    private void apply(Assessment assessment, AssessmentUpsertRequest request, AcademicYear year) {
        Classroom classroom = requireClassroom(request.getClassroomId());
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new BusinessException(ErrorCode.SUBJECT_NOT_FOUND));
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));

        Term term = request.getTermId() != null
                ? requireTerm(request.getTermId())
                : termRepository.findCoveringDate(year.getId(), request.getAssessmentDate())
                        .orElseThrow(() -> new BusinessException(ErrorCode.TERM_NOT_FOUND,
                                "Aucune période ne couvre le " + request.getAssessmentDate()
                                        + ". Vérifiez la date, ou ouvrez la période "
                                        + "correspondante dans les paramètres de l'année."));

        // Une date hors période ferait entrer la note dans le mauvais bulletin,
        // et rien en aval ne s'en apercevrait.
        if (request.getAssessmentDate().isBefore(term.getStartDate())
                || request.getAssessmentDate().isAfter(term.getEndDate())) {
            throw new BusinessException(ErrorCode.ASSESSMENT_DATE_OUTSIDE_TERM,
                    "Le " + request.getAssessmentDate() + " ne tombe pas dans "
                            + term.getName() + " (du " + term.getStartDate() + " au "
                            + term.getEndDate() + "). La note irait dans le mauvais bulletin.");
        }

        requireSubjectInCurriculum(classroom, subject, year);
        requireTeacherAssigned(teacher, classroom, subject);

        assessment.setClassroom(classroom);
        assessment.setSubject(subject);
        assessment.setTeacher(teacher);
        assessment.setTerm(term);
        assessment.setTitle(request.getTitle().trim());
        assessment.setDescription(request.getDescription());
        assessment.setAssessmentType(request.getAssessmentType());
        assessment.setAssessmentDate(request.getAssessmentDate());
        assessment.setDurationMinutes(request.getDurationMinutes());
        assessment.setMaxScore(request.getMaxScore());
        assessment.setCoefficient(request.getCoefficient());
        assessment.setCountsForAverage(request.isCountsForAverage());
    }

    private void requireSubjectInCurriculum(Classroom classroom, Subject subject, AcademicYear year) {
        if (classroom.getLevel() == null) {
            return;
        }
        Curriculum curriculum = curriculumRepository
                .findByAcademicYearIdAndLevelId(year.getId(), classroom.getLevel().getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CURRICULUM_SUBJECT_NOT_FOUND,
                        "Le niveau " + classroom.getLevel().getName() + " n'a pas encore de "
                                + "programme. Sans coefficient, la note ne pourrait entrer "
                                + "dans aucune moyenne."));

        curriculumSubjectRepository
                .findByCurriculumIdAndSubjectId(curriculum.getId(), subject.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CURRICULUM_SUBJECT_NOT_FOUND,
                        subject.getName() + " n'est pas au programme de "
                                + classroom.getLevel().getName() + ". Ajoutez-la au programme "
                                + "de ce niveau, avec son coefficient, avant de la noter."));
    }

    private void requireTeacherAssigned(Teacher teacher, Classroom classroom, Subject subject) {
        boolean assigned = assignmentRepository.isTeacherAssigned(
                teacher.getId(), classroom.getId(), subject.getId());
        if (!assigned) {
            throw new BusinessException(ErrorCode.TEACHER_NOT_ASSIGNED,
                    teacher.fullName() + " n'enseigne pas " + subject.getName() + " en "
                            + classroom.getName() + ". Affectez-le à cette classe pour cette "
                            + "matière, sinon les notes n'apparaîtront sur aucun de ses écrans.");
        }
    }

    /** Creates the empty rows so the sheet opens on the real class list. */
    private void ensureGradeRows(Assessment assessment) {
        Map<UUID, Grade> known = new HashMap<>();
        for (Grade grade : gradeRepository.findByAssessmentId(assessment.getId())) {
            known.put(grade.getStudent().getId(), grade);
        }
        for (Enrollment enrollment : liveEnrollments(assessment.getClassroom().getId())) {
            if (!known.containsKey(enrollment.getStudent().getId())) {
                gradeRepository.save(newGrade(assessment, enrollment));
            }
        }
    }

    private Grade newGrade(Assessment assessment, Enrollment enrollment) {
        Grade grade = new Grade();
        grade.setAssessment(assessment);
        grade.setStudent(enrollment.getStudent());
        grade.setEnrollment(enrollment);
        grade.setClassroom(assessment.getClassroom());
        grade.setSubject(assessment.getSubject());
        grade.setTerm(assessment.getTerm());
        grade.setAcademicYear(assessment.getAcademicYear());
        grade.setMaxScore(assessment.getMaxScore());
        return grade;
    }

    private void moveGrades(List<Grade> grades, GradeStatus from, GradeStatus to) {
        for (Grade grade : grades) {
            if (grade.getStatus() == from) {
                grade.changeStatus(to);
                grade.setValidatedBy(to == GradeStatus.VALIDATED
                        ? currentUser.id().orElse(null) : grade.getValidatedBy());
                gradeRepository.save(grade);
            }
        }
    }

    private long countMissing(Assessment assessment, List<Grade> grades) {
        Map<UUID, Grade> byStudent = new HashMap<>();
        grades.forEach((grade) -> byStudent.put(grade.getStudent().getId(), grade));
        return liveEnrollments(assessment.getClassroom().getId()).stream()
                .map((enrollment) -> byStudent.get(enrollment.getStudent().getId()))
                .filter((grade) -> grade == null
                        || (grade.getScore() == null && !grade.isAbsent() && !grade.isExempted()))
                .count();
    }

    // ------------------------------------------------------------- mapping

    private List<AssessmentResponse> describe(List<Assessment> assessments, UUID academicYearId) {
        if (assessments.isEmpty()) {
            return List.of();
        }
        Map<UUID, Integer> headcount = headcountByClassroom(academicYearId);
        Map<UUID, int[]> marked = new HashMap<>();
        Map<UUID, BigDecimal> averages = new HashMap<>();

        List<UUID> ids = assessments.stream().map(Assessment::getId).toList();
        for (Object[] row : gradeRepository.summarise(ids)) {
            if (row.length >= 3 && row[0] instanceof UUID id) {
                marked.put(id, new int[] { row[1] instanceof Number n ? n.intValue() : 0 });
                if (row[2] instanceof Number average) {
                    averages.put(id, BigDecimal.valueOf(average.doubleValue())
                            .setScale(2, RoundingMode.HALF_UP));
                }
            }
        }

        List<AssessmentResponse> lines = new ArrayList<>();
        for (Assessment assessment : assessments) {
            AssessmentResponse line = toResponse(assessment);
            line.setStudentCount(headcount.getOrDefault(assessment.getClassroom().getId(), 0));
            int[] counters = marked.get(assessment.getId());
            line.setGradedCount(counters != null ? counters[0] : 0);
            line.setClassAverage(averages.get(assessment.getId()));
            line.setReadyForNextStep(line.getStudentCount() > 0
                    && line.getGradedCount() >= line.getStudentCount());
            lines.add(line);
        }
        return lines;
    }

    private AssessmentResponse describe(Assessment assessment, UUID academicYearId) {
        List<AssessmentResponse> described = describe(List.of(assessment), academicYearId);
        return described.isEmpty() ? toResponse(assessment) : described.get(0);
    }

    private AssessmentResponse toResponse(Assessment assessment) {
        AssessmentResponse response = new AssessmentResponse();
        response.setId(assessment.getId());
        response.setTitle(assessment.getTitle());
        response.setDescription(assessment.getDescription());

        Classroom classroom = assessment.getClassroom();
        response.setClassroomId(classroom.getId());
        response.setClassroomName(classroom.getName());

        Subject subject = assessment.getSubject();
        response.setSubjectId(subject.getId());
        response.setSubjectName(subject.getName());
        response.setSubjectColor(subject.getColorHex());

        Teacher teacher = assessment.getTeacher();
        response.setTeacherId(teacher.getId());
        response.setTeacherName(teacher.fullName());

        Term term = assessment.getTerm();
        response.setTermId(term.getId());
        response.setTermName(term.getName());

        response.setAssessmentType(assessment.getAssessmentType());
        response.setAssessmentTypeLabel(labelOf(assessment.getAssessmentType()));
        response.setAssessmentDate(assessment.getAssessmentDate());
        response.setDurationMinutes(assessment.getDurationMinutes());
        response.setMaxScore(assessment.getMaxScore());
        response.setCoefficient(assessment.getCoefficient());
        response.setCountsForAverage(assessment.isCountsForAverage());
        response.setStatus(assessment.getStatus());
        response.setStatusLabel(labelOf(assessment.getStatus()));
        response.setGradeEntryOpen(assessment.getStatus().acceptsGradeEntry());
        return response;
    }

    private GradeSheetResponse buildSheet(Assessment assessment, List<Grade> grades) {
        Map<UUID, Grade> byStudent = new HashMap<>();
        grades.forEach((grade) -> byStudent.put(grade.getStudent().getId(), grade));

        List<GradeRowResponse> rows = new ArrayList<>();
        List<BigDecimal> scores = new ArrayList<>();
        int absent = 0;
        int exempted = 0;
        int missing = 0;
        int passed = 0;
        BigDecimal half = assessment.getMaxScore().divide(BigDecimal.valueOf(2), 3,
                RoundingMode.HALF_UP);

        for (Enrollment enrollment : liveEnrollments(assessment.getClassroom().getId())) {
            Student student = enrollment.getStudent();
            Grade grade = byStudent.get(student.getId());

            GradeRowResponse row = new GradeRowResponse();
            row.setStudentId(student.getId());
            row.setStudentNumber(student.getStudentNumber());
            row.setStudentName(student.fullName());
            row.setPhotoUrl(student.getPhotoUrl());

            if (grade == null) {
                row.setStatus(GradeStatus.DRAFT);
                row.setStatusLabel(labelOf(GradeStatus.DRAFT));
                missing++;
            } else {
                row.setId(grade.getId());
                row.setScore(grade.getScore());
                row.setNormalizedScore(grade.getNormalizedScore());
                row.setAbsent(grade.isAbsent());
                row.setExempted(grade.isExempted());
                row.setComment(grade.getComment());
                row.setStatus(grade.getStatus());
                row.setStatusLabel(labelOf(grade.getStatus()));
                row.setRequiresJustifiedCorrection(grade.getStatus().requiresJustifiedCorrection());
                row.setRevisionCount((int) revisionRepository.countByGradeId(grade.getId()));

                if (grade.isExempted()) {
                    exempted++;
                } else if (grade.isAbsent()) {
                    absent++;
                } else if (grade.getScore() == null) {
                    missing++;
                } else {
                    scores.add(grade.getScore());
                    if (grade.getScore().compareTo(half) >= 0) {
                        passed++;
                    }
                }
            }
            rows.add(row);
        }
        rows.sort(Comparator.comparing(GradeRowResponse::getStudentName,
                Comparator.nullsLast(String::compareToIgnoreCase)));

        GradeSheetResponse sheet = new GradeSheetResponse();
        sheet.setAssessment(describe(assessment, assessment.getAcademicYear().getId()));
        sheet.setRows(rows);
        sheet.setAbsentCount(absent);
        sheet.setExemptedCount(exempted);
        sheet.setMissingCount(missing);
        sheet.setPassCount(passed);

        if (!scores.isEmpty()) {
            List<BigDecimal> sorted = new ArrayList<>(scores);
            sorted.sort(Comparator.naturalOrder());
            sheet.setMinScore(sorted.get(0));
            sheet.setMaxScoreObtained(sorted.get(sorted.size() - 1));
            sheet.setMedian(median(sorted));

            BigDecimal total = scores.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
            sheet.setClassAverage(total.divide(BigDecimal.valueOf(scores.size()), 2,
                    RoundingMode.HALF_UP));
        }
        return sheet;
    }

    private BigDecimal median(List<BigDecimal> sorted) {
        int size = sorted.size();
        if (size % 2 == 1) {
            return sorted.get(size / 2).setScale(2, RoundingMode.HALF_UP);
        }
        return sorted.get(size / 2 - 1).add(sorted.get(size / 2))
                .divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
    }

    private int count(List<AssessmentResponse> lines, AssessmentStatus status) {
        return (int) lines.stream().filter((line) -> line.getStatus() == status).count();
    }

    // -------------------------------------------------------------- labels

    /** French wording, decided once here rather than in each screen. */
    private String labelOf(AssessmentStatus status) {
        return switch (status) {
            case DRAFT -> "Brouillon";
            case PLANNED -> "Annoncé";
            case OPEN -> "Saisie ouverte";
            case GRADING -> "En correction";
            case SUBMITTED -> "À valider";
            case VALIDATED -> "Validé";
            case PUBLISHED -> "Publié";
            case CANCELLED -> "Annulé";
        };
    }

    private String labelOf(AssessmentType type) {
        return switch (type) {
            case HOMEWORK -> "Devoir de maison";
            case QUIZ -> "Interrogation";
            case TEST -> "Devoir surveillé";
            case EXAM -> "Composition";
            case ORAL -> "Oral";
            case PRACTICAL -> "Travaux pratiques";
            case PROJECT -> "Projet";
            case CONTINUOUS_ASSESSMENT -> "Contrôle continu";
            case OTHER -> "Autre";
        };
    }

    private String labelOf(GradeStatus status) {
        return switch (status) {
            case DRAFT -> "En saisie";
            case SUBMITTED -> "Soumise";
            case VALIDATED -> "Validée";
            case PUBLISHED -> "Publiée";
        };
    }

    // ------------------------------------------------------------ lookups

    private List<Enrollment> liveEnrollments(UUID classroomId) {
        return enrollmentRepository.findByClassroomIdAndStatusIn(classroomId, LIVE_ENROLLMENTS);
    }

    private Map<UUID, Integer> headcountByClassroom(UUID academicYearId) {
        Map<UUID, Integer> counts = new HashMap<>();
        for (Object[] row : enrollmentRepository.countActiveByClassroom(academicYearId)) {
            if (row.length >= 2 && row[0] instanceof UUID classroomId && row[1] instanceof Number n) {
                counts.put(classroomId, n.intValue());
            }
        }
        return counts;
    }

    private Assessment requireAssessment(UUID assessmentId) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ASSESSMENT_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (assessment.getAcademicYear() == null
                || assessment.getAcademicYear().getSchool() == null
                || !schoolId.equals(assessment.getAcademicYear().getSchool().getId())) {
            throw new BusinessException(ErrorCode.ASSESSMENT_NOT_FOUND);
        }
        return assessment;
    }

    private Classroom requireClassroom(UUID classroomId) {
        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (classroom.getAcademicYear() == null
                || classroom.getAcademicYear().getSchool() == null
                || !schoolId.equals(classroom.getAcademicYear().getSchool().getId())) {
            throw new BusinessException(ErrorCode.CLASS_NOT_FOUND);
        }
        return classroom;
    }

    private Term requireTerm(UUID termId) {
        return termRepository.findById(termId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TERM_NOT_FOUND));
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchool(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active : ouvrez-en une avant de planifier "
                                + "des devoirs."));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
