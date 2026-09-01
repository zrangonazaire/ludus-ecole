package ci.company.eduops.reportcard.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.assessment.domain.Assessment;
import ci.company.eduops.assessment.domain.AssessmentStatus;
import ci.company.eduops.assessment.repository.AssessmentRepository;
import ci.company.eduops.attendance.domain.AttendanceStatus;
import ci.company.eduops.attendance.repository.StudentAttendanceRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.event.DomainEventPublisher;
import ci.company.eduops.common.event.DomainEventType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.common.util.VerificationCodeGenerator;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.grade.service.AcademicCalculationService;
import ci.company.eduops.grade.service.SubjectAverage;
import ci.company.eduops.grade.service.TermResult;
import ci.company.eduops.promotion.domain.PromotionDecisionType;
import ci.company.eduops.reportcard.domain.ReportCard;
import ci.company.eduops.reportcard.domain.ReportCardLine;
import ci.company.eduops.reportcard.domain.ReportCardStatus;
import ci.company.eduops.reportcard.dto.request.ReportCardGenerateRequest;
import ci.company.eduops.reportcard.dto.request.ReportCardRemarkRequest;
import ci.company.eduops.reportcard.dto.response.ReportCardBatchResponse;
import ci.company.eduops.reportcard.dto.response.ReportCardLineResponse;
import ci.company.eduops.reportcard.dto.response.ReportCardResponse;
import ci.company.eduops.reportcard.repository.ReportCardRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.subject.repository.SubjectRepository;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.term.repository.TermRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Report cards: computing them, reviewing them, handing them out.
 *
 * <p>A report card is a photograph, not a live view. Everything on it is
 * computed once at generation and stored — averages, rank, class statistics,
 * even the subject names. A card given to a family in December must still say
 * in June exactly what it said then, whatever happened to the marks in
 * between.</p>
 *
 * <p>That is why a correction never rewrites a published card. It produces the
 * next revision, and the previous one stays readable. A family holding a paper
 * bulletin must be able to find the document that matches it.</p>
 *
 * <p>Four refusals are enforced here rather than left to the screen:</p>
 * <ul>
 *   <li>No generation while marks of the term are still unvalidated. The
 *       averages would be computed on part of the work and would be wrong in a
 *       way nothing downstream could detect.</li>
 *   <li>No publication of a card without a general average. An empty bulletin
 *       tells a family nothing and cannot be contested.</li>
 *   <li>No editing of a published card. The remarks are part of the document
 *       the family received.</li>
 *   <li>No overwriting of a published card by a regeneration. It becomes a new
 *       revision instead.</li>
 * </ul>
 */
@Service
public class ReportCardService {

    private static final Logger log = LoggerFactory.getLogger(ReportCardService.class);

    private static final String SEQUENCE_SCOPE = "REPORT_CARD";
    private static final String REFERENCE_PATTERN = "BUL-{year}-{seq:6}";

    private static final List<EnrollmentStatus> LIVE_ENROLLMENTS =
            List.of(EnrollmentStatus.VALIDATED, EnrollmentStatus.ACTIVE);

    /** Papers still moving: generating on top of them computes half a term. */
    private static final List<AssessmentStatus> UNSETTLED = List.of(
            AssessmentStatus.OPEN, AssessmentStatus.GRADING, AssessmentStatus.SUBMITTED);

    private static final List<AttendanceStatus> ABSENCES =
            List.of(AttendanceStatus.ABSENT, AttendanceStatus.EXCUSED_ABSENCE);
    private static final List<AttendanceStatus> JUSTIFIED =
            List.of(AttendanceStatus.EXCUSED_ABSENCE);
    private static final List<AttendanceStatus> LATENESSES =
            List.of(AttendanceStatus.LATE, AttendanceStatus.EXCUSED_LATE);

    private final ReportCardRepository reportCardRepository;
    private final AcademicCalculationService calculationService;
    private final AssessmentRepository assessmentRepository;
    private final StudentAttendanceRepository attendanceRepository;
    private final ClassroomRepository classroomRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final SubjectRepository subjectRepository;
    private final TermRepository termRepository;
    private final AcademicYearRepository academicYearRepository;
    private final NumberSequenceService numberSequenceService;
    private final VerificationCodeGenerator codeGenerator;
    private final DomainEventPublisher eventPublisher;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public ReportCardService(ReportCardRepository reportCardRepository,
                             AcademicCalculationService calculationService,
                             AssessmentRepository assessmentRepository,
                             StudentAttendanceRepository attendanceRepository,
                             ClassroomRepository classroomRepository,
                             EnrollmentRepository enrollmentRepository,
                             SubjectRepository subjectRepository,
                             TermRepository termRepository,
                             AcademicYearRepository academicYearRepository,
                             NumberSequenceService numberSequenceService,
                             VerificationCodeGenerator codeGenerator,
                             DomainEventPublisher eventPublisher,
                             AuditService auditService,
                             CurrentUser currentUser) {
        this.reportCardRepository = reportCardRepository;
        this.calculationService = calculationService;
        this.assessmentRepository = assessmentRepository;
        this.attendanceRepository = attendanceRepository;
        this.classroomRepository = classroomRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.subjectRepository = subjectRepository;
        this.termRepository = termRepository;
        this.academicYearRepository = academicYearRepository;
        this.numberSequenceService = numberSequenceService;
        this.codeGenerator = codeGenerator;
        this.eventPublisher = eventPublisher;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // -------------------------------------------------------------- the batch

    /**
     * Where a class stands for a term: what exists, and what still blocks.
     *
     * <p>Readable before anything has been generated. The point of opening this
     * screen in the first week of the closing period is to see what is
     * missing.</p>
     */
    @Transactional(readOnly = true)
    public ReportCardBatchResponse batch(UUID classroomId, UUID termId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Classroom classroom = requireClassroom(classroomId);
        Term term = requireTerm(termId);

        List<Enrollment> enrollments = liveEnrollments(classroomId);
        List<ReportCard> cards = latestRevisions(classroomId, termId);

        ReportCardBatchResponse batch = new ReportCardBatchResponse();
        batch.setClassroomId(classroom.getId());
        batch.setClassroomName(classroom.getName());
        batch.setLevelName(classroom.getLevel() != null ? classroom.getLevel().getName() : null);
        batch.setTermId(term.getId());
        batch.setTermName(term.getName());
        batch.setAcademicYearCode(year.getCode());
        batch.setStudentCount(enrollments.size());

        int unsettled = (int) assessmentRepository
                .findByClassroomIdAndTermId(classroomId, termId).stream()
                .filter((assessment) -> UNSETTLED.contains(assessment.getStatus()))
                .count();
        batch.setUnvalidatedAssessments(unsettled);

        List<ReportCardResponse> described = cards.stream()
                .map(this::toResponse)
                .sorted(rankOrder())
                .toList();
        batch.setReportCards(described);
        batch.setGeneratedCount(described.size());
        batch.setPublishedCount((int) described.stream()
                .filter((card) -> card.getStatus() == ReportCardStatus.PUBLISHED).count());
        batch.setPassingCount((int) described.stream().filter(ReportCardResponse::isPassing).count());

        List<BigDecimal> averages = described.stream()
                .map(ReportCardResponse::getGeneralAverage)
                .filter((average) -> average != null)
                .sorted()
                .toList();
        if (!averages.isEmpty()) {
            BigDecimal sum = averages.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
            batch.setClassAverage(sum.divide(BigDecimal.valueOf(averages.size()), 2,
                    RoundingMode.HALF_UP));
            batch.setClassMinAverage(averages.get(0));
            batch.setClassMaxAverage(averages.get(averages.size() - 1));
        }

        // Un élève sans aucune note validée sortirait avec un bulletin vide :
        // c'est un problème de saisie, pas de bulletin, et il faut le dire avant.
        int empty = 0;
        for (Enrollment enrollment : enrollments) {
            if (calculationService.computeTermResult(enrollment, termId).getGeneralAverage() == null) {
                empty++;
            }
        }
        batch.setStudentsWithoutGrades(empty);
        batch.setReadyToGenerate(unsettled == 0 && !enrollments.isEmpty());
        return batch;
    }

    /**
     * Computes the report cards of a whole class.
     *
     * <p>The class is done in one pass because a rank has no meaning otherwise:
     * every card carries the position of its pupil among the others, and the
     * others must have been computed from the same marks at the same
     * moment.</p>
     */
    @Transactional
    public ReportCardBatchResponse generate(ReportCardGenerateRequest request, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Classroom classroom = requireClassroom(request.getClassroomId());
        Term term = requireTerm(request.getTermId());

        List<Assessment> unsettled = assessmentRepository
                .findByClassroomIdAndTermId(classroom.getId(), term.getId()).stream()
                .filter((assessment) -> UNSETTLED.contains(assessment.getStatus()))
                .toList();
        if (!unsettled.isEmpty()) {
            throw new BusinessException(ErrorCode.REPORT_CARD_NOT_READY,
                    unsettled.size() + " devoir(s) de " + term.getName() + " n'ont pas de "
                            + "notes validées, dont « " + unsettled.get(0).getTitle()
                            + " ». Les moyennes seraient calculées sur une partie du "
                            + "travail, et rien en aval ne s'en apercevrait.");
        }

        List<Enrollment> enrollments = liveEnrollments(classroom.getId());
        if (enrollments.isEmpty()) {
            throw new BusinessException(ErrorCode.REPORT_CARD_NOT_READY,
                    "Aucun élève inscrit dans " + classroom.getName() + ".");
        }

        UUID userId = currentUser.id().orElse(null);
        UUID schoolId = requireSchool();
        int produced = 0;

        for (Enrollment enrollment : enrollments) {
            Optional<ReportCard> existing = latestRevisionOf(enrollment.getId(), term.getId());
            if (existing.isPresent() && !request.isRegenerate()) {
                continue;
            }

            TermResult result = calculationService.computeTermResult(enrollment, term.getId());
            ReportCard card = openCard(existing.orElse(null), enrollment, classroom, year,
                    term, schoolId);
            fill(card, result, enrollment, term, userId);
            reportCardRepository.save(card);
            produced++;
        }

        auditService.logCreate("ReportCard", classroom.getId(),
                classroom.getName() + " — " + term.getName(),
                Map.of("generated", produced, "students", enrollments.size()));

        log.info("{} report card(s) generated for {} — {}", produced,
                classroom.getName(), term.getName());
        return batch(classroom.getId(), term.getId(), year.getId());
    }

    // ------------------------------------------------------------- one card

    @Transactional(readOnly = true)
    public ReportCardResponse get(UUID reportCardId) {
        return toResponse(requireCard(reportCardId));
    }

    /**
     * Looks a card up by the code printed on it.
     *
     * <p>The point of the code is that a school can check a bulletin someone
     * brings in on paper — at re-enrolment, or when a family disputes a mark.
     * A document nobody can verify is a document anybody can forge.</p>
     */
    @Transactional(readOnly = true)
    public ReportCardResponse verify(String verificationCode) {
        ReportCard card = reportCardRepository.findByVerificationCode(verificationCode)
                .orElseThrow(() -> new BusinessException(ErrorCode.REPORT_CARD_NOT_FOUND,
                        "Aucun bulletin ne porte ce code. Vérifiez la saisie : le code "
                                + "figure en bas du document."));
        return toResponse(card);
    }

    /** The only part of a report card a human writes. */
    @Transactional
    public ReportCardResponse remark(UUID reportCardId, ReportCardRemarkRequest request) {
        ReportCard card = requireCard(reportCardId);
        if (!card.getStatus().isEditable()) {
            throw new BusinessException(ErrorCode.REPORT_CARD_ALREADY_PUBLISHED,
                    "Ce bulletin est publié : les appréciations font partie du document "
                            + "que la famille a reçu et ne changent plus.");
        }

        card.setGeneralRemark(trimmed(request.getGeneralRemark()));
        card.setHeadTeacherRemark(trimmed(request.getHeadTeacherRemark()));
        card.setPrincipalRemark(trimmed(request.getPrincipalRemark()));
        card.setCouncilDecision(request.getCouncilDecision());

        ReportCard saved = reportCardRepository.save(card);
        auditService.logUpdate("ReportCard", saved.getId(), saved.getReference(),
                Map.of("status", saved.getStatus().name()),
                Map.of("councilDecision", String.valueOf(request.getCouncilDecision())));
        return toResponse(saved);
    }

    @Transactional
    public ReportCardResponse publish(UUID reportCardId) {
        ReportCard card = requireCard(reportCardId);
        publishOne(card);
        return toResponse(reportCardRepository.save(card));
    }

    /**
     * Publishes a whole class at once.
     *
     * <p>Report cards are handed out together. Publishing them one by one would
     * mean some families see marks days before others, which is exactly the
     * kind of thing that turns into a corridor argument.</p>
     */
    @Transactional
    public ReportCardBatchResponse publishAll(UUID classroomId, UUID termId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        List<ReportCard> cards = latestRevisions(classroomId, termId);
        if (cards.isEmpty()) {
            throw new BusinessException(ErrorCode.REPORT_CARD_NOT_FOUND,
                    "Aucun bulletin généré pour cette classe et cette période.");
        }

        List<String> blocked = new ArrayList<>();
        for (ReportCard card : cards) {
            if (card.getStatus() == ReportCardStatus.PUBLISHED) {
                continue;
            }
            if (card.getGeneralAverage() == null) {
                blocked.add(card.getStudent().fullName());
            }
        }
        if (!blocked.isEmpty()) {
            throw new BusinessException(ErrorCode.REPORT_CARD_NOT_READY,
                    blocked.size() + " bulletin(s) sans moyenne générale, dont celui de "
                            + blocked.get(0) + ". Un bulletin vide n'apprend rien à une "
                            + "famille et ne peut pas être contesté : saisissez les notes "
                            + "manquantes avant de publier.");
        }

        int published = 0;
        for (ReportCard card : cards) {
            if (card.getStatus() != ReportCardStatus.PUBLISHED) {
                publishOne(card);
                reportCardRepository.save(card);
                published++;
            }
        }
        log.info("{} report card(s) published for classroom {}", published, classroomId);
        return batch(classroomId, termId, year.getId());
    }

    // ------------------------------------------------------------ internals

    private void publishOne(ReportCard card) {
        if (card.getStatus() == ReportCardStatus.PUBLISHED) {
            throw new BusinessException(ErrorCode.REPORT_CARD_ALREADY_PUBLISHED);
        }
        if (card.getGeneralAverage() == null) {
            throw new BusinessException(ErrorCode.REPORT_CARD_NOT_READY,
                    "Ce bulletin n'a pas de moyenne générale : aucune matière ne porte "
                            + "de note validée sur la période.");
        }

        card.publish(currentUser.id().orElse(null));
        eventPublisher.event(DomainEventType.REPORT_CARD_PUBLISHED, "ReportCard", card.getId())
                .school(requireSchool())
                .academicYear(card.getAcademicYear().getId())
                .classroom(card.getClassroom().getId())
                .student(card.getStudent().getId())
                .with("reference", card.getReference())
                .with("studentName", card.getStudent().fullName())
                .with("termName", card.getTerm().getName())
                .with("generalAverage", card.getGeneralAverage().toPlainString())
                .publish();

        auditService.logPublish("ReportCard", card.getId(), card.getReference());
    }

    /**
     * Returns the card to write into: the existing draft, or a new revision.
     *
     * <p>A published card is never touched. Regenerating after a corrected mark
     * produces revision n+1, and the family that holds revision n can still be
     * shown what they were given.</p>
     */
    private ReportCard openCard(ReportCard existing, Enrollment enrollment, Classroom classroom,
                                AcademicYear year, Term term, UUID schoolId) {
        if (existing != null && existing.getStatus().isEditable()) {
            existing.getLines().clear();
            return existing;
        }

        ReportCard card = new ReportCard();
        card.setStudent(enrollment.getStudent());
        card.setEnrollment(enrollment);
        card.setClassroom(classroom);
        card.setAcademicYear(year);
        card.setTerm(term);
        card.setReference(numberSequenceService.next(schoolId, SEQUENCE_SCOPE,
                REFERENCE_PATTERN, null));
        card.setVerificationCode(codeGenerator.generate());
        card.setRevision(reportCardRepository.maxRevision(enrollment.getId(), term.getId()) + 1);
        return card;
    }

    private void fill(ReportCard card, TermResult result, Enrollment enrollment,
                      Term term, UUID userId) {
        card.setGeneralAverage(result.getGeneralAverage());
        card.setClassAverage(result.getClassAverage());
        card.setClassMinAverage(result.getClassMinAverage());
        card.setClassMaxAverage(result.getClassMaxAverage());
        card.setRankInClass(result.getRankInClass());
        card.setClassSize(result.getClassSize());
        card.setTotalCoefficient(result.getTotalCoefficient());

        UUID studentId = enrollment.getStudent().getId();
        card.setAbsenceCount((int) attendanceRepository
                .countByStudentAndTermAndStatuses(studentId, term.getId(), ABSENCES));
        card.setJustifiedAbsenceCount((int) attendanceRepository
                .countByStudentAndTermAndStatuses(studentId, term.getId(), JUSTIFIED));
        card.setLatenessCount((int) attendanceRepository
                .countByStudentAndTermAndStatuses(studentId, term.getId(), LATENESSES));

        int order = 1;
        for (SubjectAverage subject : result.getSubjects()) {
            ReportCardLine line = new ReportCardLine();
            // La colonne est obligatoire en base : mieux vaut un refus lisible
            // qu'une violation de contrainte au milieu d'une classe de quarante.
            line.setSubject(subjectRepository.findById(subject.getSubjectId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.SUBJECT_NOT_FOUND,
                            "La matière « " + subject.getSubjectName() + " » du programme "
                                    + "n'existe plus. Corrigez le programme du niveau "
                                    + "avant de générer les bulletins.")));
            // Le nom est figé : renommer la matière plus tard ne doit pas réécrire
            // des bulletins déjà remis aux familles.
            line.setSubjectName(subject.getSubjectName());
            line.setCoefficient(subject.getCoefficient());
            line.setSubjectAverage(subject.getAverage());
            line.setWeightedAverage(subject.getWeightedAverage());
            line.setClassSubjectAverage(subject.getClassAverage());
            line.setMinScore(subject.getMinScore());
            line.setMaxScore(subject.getMaxScore());
            line.setRankInSubject(subject.getRankInSubject());
            line.setAssessmentCount(subject.getAssessmentCount());
            line.setAppreciation(subject.getAppreciation());
            line.setDisplayOrder(order++);
            card.addLine(line);
        }

        // La photographie des paramètres de calcul : sans elle, un bulletin
        // contesté six mois plus tard est irreproductible.
        Map<String, Object> snapshot = new HashMap<>();
        snapshot.put("scaleMax", String.valueOf(result.getScaleMax()));
        snapshot.put("passingMark", String.valueOf(result.getPassingMark()));
        snapshot.put("totalCoefficient", String.valueOf(result.getTotalCoefficient()));
        snapshot.put("subjectCount", result.getSubjects().size());
        snapshot.put("classSize", result.getClassSize());
        snapshot.put("computedAt", OffsetDateTime.now().toString());
        card.setComputationSnapshot(snapshot);

        card.setStatus(ReportCardStatus.GENERATED);
        card.setGeneratedAt(OffsetDateTime.now());
        card.setGeneratedBy(userId);
    }

    /** Latest revision of each pupil's card, which is what the screen shows. */
    private List<ReportCard> latestRevisions(UUID classroomId, UUID termId) {
        Map<UUID, ReportCard> byEnrollment = new HashMap<>();
        for (ReportCard card : reportCardRepository.findByClassroomIdAndTermId(classroomId, termId)) {
            UUID key = card.getEnrollment().getId();
            ReportCard kept = byEnrollment.get(key);
            if (kept == null || card.getRevision() > kept.getRevision()) {
                byEnrollment.put(key, card);
            }
        }
        return new ArrayList<>(byEnrollment.values());
    }

    private Optional<ReportCard> latestRevisionOf(UUID enrollmentId, UUID termId) {
        return reportCardRepository.findRevisions(enrollmentId, termId).stream()
                .max(Comparator.comparingInt(ReportCard::getRevision));
    }

    /** Best average first; cards without an average go last, then by name. */
    private Comparator<ReportCardResponse> rankOrder() {
        return Comparator
                .comparing(ReportCardResponse::getGeneralAverage,
                        Comparator.nullsLast(Comparator.reverseOrder()))
                .thenComparing(ReportCardResponse::getStudentName,
                        Comparator.nullsLast(String::compareToIgnoreCase));
    }

    // -------------------------------------------------------------- mapping

    private ReportCardResponse toResponse(ReportCard card) {
        ReportCardResponse response = new ReportCardResponse();
        response.setId(card.getId());
        response.setReference(card.getReference());
        response.setVerificationCode(card.getVerificationCode());

        Student student = card.getStudent();
        response.setStudentId(student.getId());
        response.setStudentName(student.fullName());
        response.setStudentNumber(student.getStudentNumber());
        response.setPhotoUrl(student.getPhotoUrl());

        Classroom classroom = card.getClassroom();
        response.setClassroomId(classroom.getId());
        response.setClassroomName(classroom.getName());
        response.setLevelName(classroom.getLevel() != null ? classroom.getLevel().getName() : null);

        Term term = card.getTerm();
        response.setTermId(term.getId());
        response.setTermName(term.getName());
        response.setAcademicYearCode(card.getAcademicYear().getCode());

        response.setGeneralAverage(card.getGeneralAverage());
        response.setClassAverage(card.getClassAverage());
        response.setClassMinAverage(card.getClassMinAverage());
        response.setClassMaxAverage(card.getClassMaxAverage());
        response.setRankInClass(card.getRankInClass());
        response.setClassSize(card.getClassSize());
        response.setRankLabel(card.rankLabel());
        response.setTotalCoefficient(card.getTotalCoefficient());

        BigDecimal scaleMax = snapshotDecimal(card, "scaleMax");
        BigDecimal passingMark = snapshotDecimal(card, "passingMark");
        response.setScaleMax(scaleMax);
        response.setPassingMark(passingMark);
        response.setPassing(card.getGeneralAverage() != null && passingMark != null
                && card.getGeneralAverage().compareTo(passingMark) >= 0);

        response.setAbsenceCount(card.getAbsenceCount());
        response.setJustifiedAbsenceCount(card.getJustifiedAbsenceCount());
        response.setLatenessCount(card.getLatenessCount());

        response.setGeneralRemark(card.getGeneralRemark());
        response.setHeadTeacherRemark(card.getHeadTeacherRemark());
        response.setPrincipalRemark(card.getPrincipalRemark());
        response.setCouncilDecision(card.getCouncilDecision());
        response.setCouncilDecisionLabel(labelOf(card.getCouncilDecision()));

        response.setStatus(card.getStatus());
        response.setStatusLabel(labelOf(card.getStatus()));
        response.setEditable(card.getStatus().isEditable());
        response.setRevision(card.getRevision());
        response.setGeneratedAt(card.getGeneratedAt());
        response.setPublishedAt(card.getPublishedAt());

        List<ReportCardLineResponse> lines = new ArrayList<>();
        for (ReportCardLine line : card.getLines()) {
            ReportCardLineResponse item = new ReportCardLineResponse();
            item.setSubjectId(line.getSubject() != null ? line.getSubject().getId() : null);
            item.setSubjectName(line.getSubjectName());
            item.setTeacherName(line.getTeacher() != null ? line.getTeacher().fullName() : null);
            item.setCoefficient(line.getCoefficient());
            item.setSubjectAverage(line.getSubjectAverage());
            item.setWeightedAverage(line.getWeightedAverage());
            item.setClassSubjectAverage(line.getClassSubjectAverage());
            item.setMinScore(line.getMinScore());
            item.setMaxScore(line.getMaxScore());
            item.setRankInSubject(line.getRankInSubject());
            item.setAssessmentCount(line.getAssessmentCount());
            item.setAppreciation(line.getAppreciation());
            item.setDisplayOrder(line.getDisplayOrder());
            lines.add(item);
        }
        lines.sort(Comparator.comparingInt(ReportCardLineResponse::getDisplayOrder));
        response.setLines(lines);
        return response;
    }

    private BigDecimal snapshotDecimal(ReportCard card, String key) {
        Object value = card.getComputationSnapshot().get(key);
        if (value == null || "null".equals(String.valueOf(value))) {
            return null;
        }
        try {
            return new BigDecimal(String.valueOf(value));
        } catch (NumberFormatException ex) {
            log.warn("Unreadable snapshot value {} on report card {}", key, card.getId());
            return null;
        }
    }

    // --------------------------------------------------------------- labels

    /** French wording, decided once here rather than in each screen. */
    private String labelOf(ReportCardStatus status) {
        return switch (status) {
            case DRAFT -> "Brouillon";
            case GENERATED -> "Généré";
            case VALIDATED -> "Validé";
            case PUBLISHED -> "Remis aux familles";
            case ARCHIVED -> "Archivé";
        };
    }

    private String labelOf(PromotionDecisionType decision) {
        if (decision == null) {
            return null;
        }
        return switch (decision) {
            case PASS -> "Admis";
            case REPEAT -> "Redouble";
            case PROMOTED -> "Passe en classe supérieure";
            case GRADUATED -> "Fin de cycle";
            case TRANSFER_RECOMMENDED -> "Réorientation vers un autre établissement";
            case ORIENTATION_REQUIRED -> "Orientation à décider";
            case PENDING_DECISION -> "Décision en attente";
        };
    }

    // --------------------------------------------------------------- lookups

    private String trimmed(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private List<Enrollment> liveEnrollments(UUID classroomId) {
        return enrollmentRepository.findByClassroomIdAndStatusIn(classroomId, LIVE_ENROLLMENTS);
    }

    private ReportCard requireCard(UUID reportCardId) {
        ReportCard card = reportCardRepository.findById(reportCardId)
                .orElseThrow(() -> new BusinessException(ErrorCode.REPORT_CARD_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (card.getAcademicYear() == null || card.getAcademicYear().getSchool() == null
                || !schoolId.equals(card.getAcademicYear().getSchool().getId())) {
            throw new BusinessException(ErrorCode.REPORT_CARD_NOT_FOUND);
        }
        return card;
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
                        "Aucune année scolaire active."));
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
