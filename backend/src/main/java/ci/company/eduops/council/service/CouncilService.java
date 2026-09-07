package ci.company.eduops.council.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.council.domain.ClassCouncil;
import ci.company.eduops.council.domain.ClassCouncilParticipant;
import ci.company.eduops.council.domain.CouncilStatus;
import ci.company.eduops.council.dto.request.CouncilCreateRequest;
import ci.company.eduops.council.dto.request.CouncilDecisionRequest;
import ci.company.eduops.council.dto.request.CouncilParticipantRequest;
import ci.company.eduops.council.dto.request.CouncilUpdateRequest;
import ci.company.eduops.council.dto.response.CouncilParticipantResponse;
import ci.company.eduops.council.dto.response.CouncilResponse;
import ci.company.eduops.council.dto.response.CouncilSummaryResponse;
import ci.company.eduops.council.dto.response.StudentDecisionResponse;
import ci.company.eduops.council.repository.ClassCouncilParticipantRepository;
import ci.company.eduops.council.repository.ClassCouncilRepository;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.promotion.domain.PromotionDecision;
import ci.company.eduops.promotion.domain.PromotionDecisionType;
import ci.company.eduops.promotion.repository.PromotionDecisionRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.staff.domain.Staff;
import ci.company.eduops.staff.repository.StaffRepository;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
/**
 * The class council (conseil de classe) workflow.
 *
 * <p>A council is opened for a class and a grading period (one council per pair,
 * enforced by the schema), the teaching team is invited, and at the end of the
 * meeting the promotion decision of every pupil is recorded. Closing the council
 * freezes it and recomputes the class average and success rate from the recorded
 * decisions — those aggregates are derived on close, never typed.</p>
 *
 * <p>Two invariants matter here:</p>
 * <ul>
 *   <li>a sealed council is immutable: neither participants nor decisions may
 *       change once it is closed;</li>
 *   <li>a decision is one per enrollment for the whole year (unique on
 *       {@code enrollment_id}), so recording an outcome for a pupil already
 *       examined earlier updates that same row.</li>
 * </ul>
 */
@Service
public class CouncilService {

    private static final Logger log = LoggerFactory.getLogger(CouncilService.class);

    private static final List<EnrollmentStatus> ACTIVE_STATUSES = List.of(
            EnrollmentStatus.VALIDATED, EnrollmentStatus.ACTIVE);

    private final ClassCouncilRepository councilRepository;
    private final ClassCouncilParticipantRepository participantRepository;
    private final PromotionDecisionRepository decisionRepository;
    private final ClassroomRepository classroomRepository;
    private final TermRepository termRepository;
    private final AcademicYearRepository academicYearRepository;
    private final LevelRepository levelRepository;
    private final TeacherRepository teacherRepository;
    private final StaffRepository staffRepository;
    private final GuardianRepository guardianRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public CouncilService(ClassCouncilRepository councilRepository,
                          ClassCouncilParticipantRepository participantRepository,
                          PromotionDecisionRepository decisionRepository,
                          ClassroomRepository classroomRepository,
                          TermRepository termRepository,
                          AcademicYearRepository academicYearRepository,
                          LevelRepository levelRepository,
                          TeacherRepository teacherRepository,
                          StaffRepository staffRepository,
                          GuardianRepository guardianRepository,
                          EnrollmentRepository enrollmentRepository,
                          AuditService auditService,
                          CurrentUser currentUser) {
        this.councilRepository = councilRepository;
        this.participantRepository = participantRepository;
        this.decisionRepository = decisionRepository;
        this.classroomRepository = classroomRepository;
        this.termRepository = termRepository;
        this.academicYearRepository = academicYearRepository;
        this.levelRepository = levelRepository;
        this.teacherRepository = teacherRepository;
        this.staffRepository = staffRepository;
        this.guardianRepository = guardianRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }
// ---------------------------------------------------------------- lecture

    @Transactional(readOnly = true)
    public List<CouncilSummaryResponse> list(UUID academicYearId, UUID classroomId, String status) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(schoolId, academicYearId);
        List<ClassCouncil> councils = councilRepository.search(year.getId(), classroomId,
                status == null ? "" : status.trim());
        List<CouncilSummaryResponse> response = new ArrayList<>();
        for (ClassCouncil council : councils) {
            response.add(toSummary(council));
        }
        return response;
    }

    @Transactional(readOnly = true)
    public CouncilResponse get(UUID councilId) {
        ClassCouncil council = requireCouncil(councilId);
        return toResponse(council);
    }

    @Transactional(readOnly = true)
    public List<StudentDecisionResponse> students(UUID councilId) {
        ClassCouncil council = requireCouncil(councilId);
        return studentRows(council, decisionsByEnrollment(council.getId()));
    }
// --------------------------------------------------------------- écriture

    @Transactional
    public CouncilResponse create(CouncilCreateRequest request) {
        UUID schoolId = requireSchool();
        Classroom classroom = classroomRepository.findById(request.getClassroomId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.CLASS_NOT_FOUND));
        requireSameSchool(schoolId, classroom.getAcademicYear());

        Term term = termRepository.findById(request.getTermId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.TERM_NOT_FOUND));
        if (!term.getAcademicYear().getId().equals(classroom.getAcademicYear().getId())) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "La période ne fait pas partie de la même année scolaire que la classe.");
        }
        if (councilRepository.existsByClassroomIdAndTermId(classroom.getId(), term.getId())) {
            throw BusinessException.of(ErrorCode.COUNCIL_ALREADY_EXISTS);
        }

        ClassCouncil council = new ClassCouncil();
        council.setClassroom(classroom);
        council.setTerm(term);
        council.setAcademicYear(classroom.getAcademicYear());
        council.setMeetingDate(request.getMeetingDate());
        council.setStartTime(request.getStartTime());
        council.setEndTime(request.getEndTime());
        council.setChairedBy(request.getChairedBy());
        council.setLocation(blankToNull(request.getLocation()));
        council.setStatus(CouncilStatus.PLANNED);

        ClassCouncil saved = councilRepository.save(council);
        auditService.logCreate("ClassCouncil", saved.getId(), label(saved),
                Map.of("classroomId", saved.getClassroom().getId(),
                        "termId", saved.getTerm().getId()));
        log.info("Conseil de classe créé pour {} / {}", saved.getClassroom().getName(),
                saved.getTerm().getCode());
        return toResponse(saved);
    }

    @Transactional
    public CouncilResponse update(UUID councilId, CouncilUpdateRequest request) {
        ClassCouncil council = requireEditable(councilId);
        if (request.getMeetingDate() != null) {
            council.setMeetingDate(request.getMeetingDate());
        }
        if (request.getStartTime() != null) {
            council.setStartTime(request.getStartTime());
        }
        if (request.getEndTime() != null) {
            council.setEndTime(request.getEndTime());
        }
        if (request.getChairedBy() != null) {
            council.setChairedBy(request.getChairedBy());
        }
        council.setLocation(blankToNull(request.getLocation()));
        council.setRemarks(blankToNull(request.getRemarks()));
        council.setMinutesUrl(blankToNull(request.getMinutesUrl()));
        ClassCouncil saved = councilRepository.save(council);
        auditService.logUpdate("ClassCouncil", saved.getId(), label(saved), Map.of(), Map.of());
        return toResponse(saved);
    }

    @Transactional
    public CouncilResponse start(UUID councilId) {
        ClassCouncil council = requireCouncil(councilId);
        council.changeStatus(CouncilStatus.IN_PROGRESS);
        ClassCouncil saved = councilRepository.save(council);
        auditService.logValidate("ClassCouncil", saved.getId(), label(saved), "Début du conseil");
        return toResponse(saved);
    }

    @Transactional
    public CouncilResponse close(UUID councilId) {
        ClassCouncil council = requireCouncil(councilId);
        if (council.getStatus().isClosed()) {
            throw BusinessException.of(ErrorCode.COUNCIL_CLOSED);
        }
        List<PromotionDecision> decisions = decisionRepository.findByCouncilId(councilId);
        council.setClassAverage(average(decisions));
        council.setSuccessRate(successRate(decisions));
        council.close(currentUser.requireId());
        ClassCouncil saved = councilRepository.save(council);
        auditService.logPublish("ClassCouncil", saved.getId(), label(saved));
        log.info("Conseil de classe {} clos avec {} décision(s)",
                saved.getClassroom().getName(), decisions.size());
        return toResponse(saved);
    }
// ----------------------------------------------------------- participants

    @Transactional
    public CouncilResponse addParticipant(UUID councilId, CouncilParticipantRequest request) {
        ClassCouncil council = requireEditable(councilId);
        ClassCouncilParticipant participant = buildParticipant(council, request);
        participantRepository.save(participant);
        auditService.logCreate("ClassCouncilParticipant", participant.getId(),
                request.getRoleLabel(), Map.of("councilId", council.getId()));
        return toResponse(council);
    }

    @Transactional
    public CouncilResponse removeParticipant(UUID councilId, UUID participantId) {
        ClassCouncil council = requireEditable(councilId);
        ClassCouncilParticipant participant = participantRepository
                .findByIdAndCouncilId(participantId, councilId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.COUNCIL_PARTICIPANT_NOT_FOUND));
        participantRepository.delete(participant);
        return toResponse(council);
    }

    @Transactional
    public CouncilResponse setPresence(UUID councilId, UUID participantId, boolean present) {
        ClassCouncil council = requireEditable(councilId);
        ClassCouncilParticipant participant = participantRepository
                .findByIdAndCouncilId(participantId, councilId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.COUNCIL_PARTICIPANT_NOT_FOUND));
        participant.setPresent(present);
        participantRepository.save(participant);
        return toResponse(council);
    }

    // -------------------------------------------------------------- décisions

    @Transactional
    public StudentDecisionResponse recordDecision(UUID councilId, CouncilDecisionRequest request) {
        ClassCouncil council = requireEditable(councilId);
        EnforcementCheck check = validEnrollment(council, request.getEnrollmentId());

        PromotionDecision decision = decisionRepository.findByEnrollmentId(request.getEnrollmentId())
                .orElseGet(PromotionDecision::new);
        decision.setCouncil(council);
        decision.setStudent(check.enrollment().getStudent());
        decision.setEnrollment(check.enrollment());
        decision.setAcademicYear(council.getAcademicYear());
        decision.setFromLevel(check.fromLevel());
        decision.setAnnualAverage(request.getAnnualAverage());
        decision.setJustification(blankToNull(request.getJustification()));
        decision.setOrientationAdvice(blankToNull(request.getOrientationAdvice()));
        decision.decide(request.getDecision(), currentUser.requireId(),
                resolveTargetLevel(request, check.fromLevel()));

        PromotionDecision saved = decisionRepository.save(decision);
        if (request.getDecision() != PromotionDecisionType.PENDING_DECISION) {
            auditService.logValidate("PromotionDecision", saved.getId(),
                    check.enrollment().getStudent().fullName(), request.getDecision().name());
        }
        return toDecisionResponse(saved, check.enrollment());
    }
// ------------------------------------------------------------ plomberie

    private ClassCouncil requireCouncil(UUID councilId) {
        ClassCouncil council = councilRepository.findById(councilId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.COUNCIL_NOT_FOUND));
        requireSameSchool(requireSchool(), council.getAcademicYear());
        return council;
    }

    private ClassCouncil requireEditable(UUID councilId) {
        ClassCouncil council = requireCouncil(councilId);
        if (!council.getStatus().isEditable()) {
            throw BusinessException.of(ErrorCode.COUNCIL_CLOSED);
        }
        return council;
    }

    private ClassCouncilParticipant buildParticipant(ClassCouncil council,
                                                     CouncilParticipantRequest request) {
        ClassCouncilParticipant participant = new ClassCouncilParticipant();
        participant.setCouncil(council);
        participant.setRoleLabel(request.getRoleLabel().trim());
        participant.setPresent(request.isPresent());

        int provided = countNotNull(request.getTeacherId(), request.getStaffId(),
                request.getGuardianId());
        if (provided != 1) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Un participant doit être exactement un professeur, un membre "
                            + "du personnel ou un tuteur.");
        }
        if (request.getTeacherId() != null) {
            Teacher teacher = teacherRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.TEACHER_NOT_FOUND));
            if (participantRepository.existsByCouncilIdAndTeacherId(council.getId(), teacher.getId())) {
                throw BusinessException.of(ErrorCode.COUNCIL_PARTICIPANT_ALREADY_ADDED);
            }
            participant.setTeacher(teacher);
        } else if (request.getStaffId() != null) {
            Staff staff = staffRepository.findById(request.getStaffId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.STAFF_NOT_FOUND));
            if (participantRepository.existsByCouncilIdAndStaffId(council.getId(), staff.getId())) {
                throw BusinessException.of(ErrorCode.COUNCIL_PARTICIPANT_ALREADY_ADDED);
            }
            participant.setStaff(staff);
        } else {
            Guardian guardian = guardianRepository.findById(request.getGuardianId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.GUARDIAN_NOT_FOUND));
            if (participantRepository.existsByCouncilIdAndGuardianId(council.getId(), guardian.getId())) {
                throw BusinessException.of(ErrorCode.COUNCIL_PARTICIPANT_ALREADY_ADDED);
            }
            participant.setGuardian(guardian);
        }
        return participant;
    }

    private EnforcementCheck validEnrollment(ClassCouncil council, UUID enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ENROLLMENT_NOT_FOUND));
        if (!enrollment.getClassroom().getId().equals(council.getClassroom().getId())
                || !enrollment.getAcademicYear().getId().equals(council.getAcademicYear().getId())) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Cette inscription ne fait pas partie de la classe et de l'année du conseil.");
        }
        return new EnforcementCheck(enrollment, enrollment.getClassroom().getLevel());
    }

    private Level resolveTargetLevel(CouncilDecisionRequest request, Level fromLevel) {
        if (request.getToLevelId() != null) {
            return levelRepository.findById(request.getToLevelId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.LEVEL_NOT_FOUND));
        }
        PromotionDecisionType decision = request.getDecision();
        if (decision == PromotionDecisionType.PASS
                || decision == PromotionDecisionType.PROMOTED) {
            Level next = fromLevel.getNextLevel();
            return next != null && !fromLevel.isTerminal() ? next : null;
        }
        if (decision == PromotionDecisionType.REPEAT) {
            return fromLevel;
        }
        return null;
    }
// ------------------------------------------------------------ réponse

    private CouncilSummaryResponse toSummary(ClassCouncil council) {
        CouncilSummaryResponse response = new CouncilSummaryResponse();
        response.setId(council.getId());
        response.setClassroomId(council.getClassroom().getId());
        response.setClassroomName(council.getClassroom().getName());
        response.setTermId(council.getTerm().getId());
        response.setTermName(council.getTerm().getName());
        response.setAcademicYearId(council.getAcademicYear().getId());
        response.setMeetingDate(council.getMeetingDate());
        response.setStatus(council.getStatus().name());
        response.setClassAverage(council.getClassAverage());
        response.setSuccessRate(council.getSuccessRate());
        return response;
    }

    private CouncilResponse toResponse(ClassCouncil council) {
        CouncilResponse response = new CouncilResponse();
        response.setId(council.getId());
        response.setClassroomId(council.getClassroom().getId());
        response.setClassroomName(council.getClassroom().getName());
        Classroom classroom = council.getClassroom();
        if (classroom.getLevel() != null) {
            response.setLevelId(classroom.getLevel().getId());
            response.setLevelName(classroom.getLevel().getName());
        }
        response.setTermId(council.getTerm().getId());
        response.setTermName(council.getTerm().getName());
        response.setAcademicYearId(council.getAcademicYear().getId());
        response.setMeetingDate(council.getMeetingDate());
        response.setStartTime(council.getStartTime());
        response.setEndTime(council.getEndTime());
        response.setChairedBy(council.getChairedBy());
        response.setLocation(council.getLocation());
        response.setStatus(council.getStatus().name());
        response.setStatusLabel(statusLabel(council.getStatus()));
        response.setClassAverage(council.getClassAverage());
        response.setSuccessRate(council.getSuccessRate());
        response.setRemarks(council.getRemarks());
        response.setMinutesUrl(council.getMinutesUrl());
        response.setClosedAt(council.getClosedAt());
        response.setEditable(council.getStatus().isEditable());

        for (ClassCouncilParticipant participant : participantRepository.findByCouncilId(council.getId())) {
            response.getParticipants().add(toParticipantResponse(participant));
        }
        response.setStudents(studentRows(council, decisionsByEnrollment(council.getId())));
        return response;
    }

    private CouncilParticipantResponse toParticipantResponse(ClassCouncilParticipant participant) {
        CouncilParticipantResponse response = new CouncilParticipantResponse();
        response.setId(participant.getId());
        response.setCouncilId(participant.getCouncil().getId());
        response.setRoleLabel(participant.getRoleLabel());
        response.setPresent(participant.isPresent());
        Object identity = participant.identity();
        if (identity instanceof Teacher teacher) {
            response.setType("TEACHER");
            response.setPersonId(teacher.getId());
            response.setName(teacher.fullName());
        } else if (identity instanceof Staff staff) {
            response.setType("STAFF");
            response.setPersonId(staff.getId());
            response.setName(staff.fullName());
        } else if (identity instanceof Guardian guardian) {
            response.setType("GUARDIAN");
            response.setPersonId(guardian.getId());
            response.setName(guardian.fullName());
        }
        return response;
    }

    private Map<UUID, PromotionDecision> decisionsByEnrollment(UUID councilId) {
        Map<UUID, PromotionDecision> byEnrollment = new HashMap<>();
        for (PromotionDecision decision : decisionRepository.findByCouncilId(councilId)) {
            byEnrollment.put(decision.getEnrollment().getId(), decision);
        }
        return byEnrollment;
    }
private List<StudentDecisionResponse> studentRows(ClassCouncil council,
                                                      Map<UUID, PromotionDecision> decisions) {
        List<StudentDecisionResponse> rows = new ArrayList<>();
        List<Enrollment> enrollments = enrollmentRepository
                .findByClassroomIdAndStatusIn(council.getClassroom().getId(), ACTIVE_STATUSES);
        for (Enrollment enrollment : enrollments) {
            PromotionDecision decision = decisions.get(enrollment.getId());
            rows.add(decision == null
                    ? toPendingDecisionResponse(enrollment)
                    : toDecisionResponse(decision, enrollment));
        }
        rows.sort((a, b) -> a.getStudentName().compareToIgnoreCase(b.getStudentName()));
        return rows;
    }

    private StudentDecisionResponse toPendingDecisionResponse(Enrollment enrollment) {
        StudentDecisionResponse response = baseStudentRow(enrollment);
        response.setDecision(PromotionDecisionType.PENDING_DECISION.name());
        response.setDecided(false);
        return response;
    }

    private StudentDecisionResponse toDecisionResponse(PromotionDecision decision,
                                                       Enrollment enrollment) {
        StudentDecisionResponse response = baseStudentRow(enrollment);
        response.setDecisionId(decision.getId());
        Level toLevel = decision.getToLevel();
        if (toLevel != null) {
            response.setToLevelId(toLevel.getId());
            response.setToLevelName(toLevel.getName());
        }
        response.setDecision(decision.getDecision().name());
        response.setAnnualAverage(decision.getAnnualAverage());
        response.setJustification(decision.getJustification());
        response.setOrientationAdvice(decision.getOrientationAdvice());
        response.setDecidedAt(decision.getDecidedAt());
        response.setDecided(decision.isDecided());
        return response;
    }

    private StudentDecisionResponse baseStudentRow(Enrollment enrollment) {
        StudentDecisionResponse response = new StudentDecisionResponse();
        response.setStudentId(enrollment.getStudent().getId());
        response.setStudentNumber(enrollment.getStudent().getStudentNumber());
        response.setStudentName(enrollment.getStudent().fullName());
        response.setEnrollmentId(enrollment.getId());
        Level fromLevel = enrollment.getClassroom().getLevel();
        if (fromLevel != null) {
            response.setFromLevelId(fromLevel.getId());
            response.setFromLevelName(fromLevel.getName());
        }
        return response;
    }

    private String statusLabel(CouncilStatus status) {
        return switch (status) {
            case PLANNED -> "Prévu";
            case IN_PROGRESS -> "En cours";
            case CLOSED -> "Clos";
            case ARCHIVED -> "Archivé";
        };
    }

    private String label(ClassCouncil council) {
        return council.getClassroom() != null
                ? council.getClassroom().getName() + " / " + council.getTerm().getName()
                : council.getId().toString();
    }
// ------------------------------------------------------------ agrégats

    /** Moyenne des moyennes annuelles parmi les décisions qui en portent une. */
    private BigDecimal average(List<PromotionDecision> decisions) {
        BigDecimal sum = BigDecimal.ZERO;
        int count = 0;
        for (PromotionDecision decision : decisions) {
            if (decision.getAnnualAverage() != null) {
                sum = sum.add(decision.getAnnualAverage());
                count++;
            }
        }
        return count == 0 ? null
                : sum.divide(BigDecimal.valueOf(count), 3, RoundingMode.HALF_UP);
    }

    /** Taux de réussite : part des décisions finales favorables, en pourcentage. */
    private BigDecimal successRate(List<PromotionDecision> decisions) {
        long decided = decisions.stream().filter(PromotionDecision::isDecided).count();
        if (decided == 0) {
            return null;
        }
        long success = decisions.stream()
                .filter(PromotionDecision::isDecided)
                .filter(d -> d.getDecision() == PromotionDecisionType.PASS
                        || d.getDecision() == PromotionDecisionType.PROMOTED
                        || d.getDecision() == PromotionDecisionType.GRADUATED)
                .count();
        return BigDecimal.valueOf(success * 100.0 / decided)
                .setScale(2, RoundingMode.HALF_UP);
    }

    // ------------------------------------------------------------- contexte

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private AcademicYear resolveYear(UUID schoolId, UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
    }

    private void requireSameSchool(UUID schoolId, AcademicYear year) {
        if (year == null || year.getSchool() == null
                || !schoolId.equals(year.getSchool().getId())) {
            throw BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND);
        }
    }

    private static int countNotNull(Object... values) {
        int count = 0;
        for (Object value : values) {
            if (value != null) {
                count++;
            }
        }
        return count;
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    /** Value object carrying what {@link #validEnrollment} checked. */
    private record EnforcementCheck(Enrollment enrollment, Level fromLevel) {
    }
}