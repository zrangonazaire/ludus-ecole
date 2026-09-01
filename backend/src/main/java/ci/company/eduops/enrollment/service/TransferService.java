package ci.company.eduops.enrollment.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.enrollment.domain.DepartureReason;
import ci.company.eduops.enrollment.domain.DepartureStatus;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.domain.EnrollmentTransfer;
import ci.company.eduops.enrollment.domain.StudentDeparture;
import ci.company.eduops.enrollment.dto.request.ClassChangeRequest;
import ci.company.eduops.enrollment.dto.request.DepartureCancelRequest;
import ci.company.eduops.enrollment.dto.request.DepartureDocumentsRequest;
import ci.company.eduops.enrollment.dto.request.DepartureRecordRequest;
import ci.company.eduops.enrollment.dto.response.ClassChangeResponse;
import ci.company.eduops.enrollment.dto.response.DepartureResponse;
import ci.company.eduops.enrollment.dto.response.TransferBoardResponse;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.enrollment.repository.EnrollmentTransferRepository;
import ci.company.eduops.enrollment.repository.StudentDepartureRepository;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Movements: changing class inside the school, and leaving it.
 *
 * <p>The two look alike and are not. A change of class is an internal
 * arrangement that leaves the schooling untouched. A departure ends it, and
 * produces paperwork — the exeat, the certificate of withdrawal — that a
 * receiving school will ask for, sometimes years later.</p>
 *
 * <p>The outstanding balance is read once, at the moment of departure, and
 * frozen on the record. It is shown, never enforced: withholding a pupil's
 * school file over a debt is unlawful in many places, and a product that made
 * it easy would be doing the school a disservice. What the product owes the
 * secretary is the figure, in front of them, before the family walks out.</p>
 *
 * <p>Four refusals are enforced here rather than left to the screen:</p>
 * <ul>
 *   <li>No change into the class the pupil is already in, and none into a class
 *       of another year — the enrollment would point at a classroom outside its
 *       own school year.</li>
 *   <li>No second live departure for one enrollment. Two withdrawals for the
 *       same year describe two different stories of the same pupil.</li>
 *   <li>No settling a departure while a document is still owed. « Soldé » means
 *       the family left with everything.</li>
 *   <li>No departure dated before the enrollment itself.</li>
 * </ul>
 */
@Service
public class TransferService {

    private static final Logger log = LoggerFactory.getLogger(TransferService.class);

    private static final List<EnrollmentStatus> LIVE_ENROLLMENTS =
            List.of(EnrollmentStatus.VALIDATED, EnrollmentStatus.ACTIVE);

    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentTransferRepository transferRepository;
    private final StudentDepartureRepository departureRepository;
    private final ClassroomRepository classroomRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final AcademicYearRepository academicYearRepository;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public TransferService(EnrollmentRepository enrollmentRepository,
                           EnrollmentTransferRepository transferRepository,
                           StudentDepartureRepository departureRepository,
                           ClassroomRepository classroomRepository,
                           StudentFeeRepository studentFeeRepository,
                           AcademicYearRepository academicYearRepository,
                           AuditService auditService,
                           CurrentUser currentUser) {
        this.enrollmentRepository = enrollmentRepository;
        this.transferRepository = transferRepository;
        this.departureRepository = departureRepository;
        this.classroomRepository = classroomRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.academicYearRepository = academicYearRepository;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // -------------------------------------------------------------- the board

    @Transactional(readOnly = true)
    public TransferBoardResponse board(UUID academicYearId, String search) {
        AcademicYear year = resolveYear(academicYearId);
        String term = blankToNull(search);

        List<ClassChangeResponse> changes = transferRepository
                .findForYear(year.getId(), term).stream()
                .map(this::toResponse)
                .toList();

        List<DepartureResponse> departures = departureRepository
                .search(year.getId(), null, null, term).stream()
                .map(this::toResponse)
                .toList();

        TransferBoardResponse board = new TransferBoardResponse();
        board.setAcademicYearId(year.getId());
        board.setAcademicYearCode(year.getCode());
        board.setClassChanges(changes);
        board.setDepartures(departures);
        board.setClassChangeCount(changes.size());
        board.setPendingDepartureCount((int) departures.stream()
                .filter((row) -> row.getStatus() == DepartureStatus.RECORDED).count());
        board.setClearedDepartureCount((int) departures.stream()
                .filter((row) -> row.getStatus() == DepartureStatus.CLEARED).count());
        board.setUpcomingDepartureCount((int) departures.stream()
                .filter(DepartureResponse::isUpcoming).count());

        BigDecimal owed = departures.stream()
                .filter((row) -> row.getStatus() == DepartureStatus.RECORDED)
                .map(DepartureResponse::getOutstandingAmount)
                .filter((amount) -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        board.setOutstandingTotal(MoneyUtils.normalize(owed));
        board.setCurrency(departures.isEmpty() ? "XOF" : departures.get(0).getCurrency());
        return board;
    }

    // ------------------------------------------------------- change of class

    /**
     * Moves a pupil to another class of the same year.
     *
     * <p>The seat check is the same one enrollment uses. A class change that
     * ignored capacity would be a way of overfilling a class without anyone
     * having decided to.</p>
     */
    @Transactional
    public ClassChangeResponse changeClass(ClassChangeRequest request) {
        Enrollment enrollment = requireEnrollment(request.getEnrollmentId());
        if (!LIVE_ENROLLMENTS.contains(enrollment.getStatus())) {
            throw new BusinessException(ErrorCode.ENROLLMENT_NOT_ALLOWED,
                    "Cette inscription n'est pas active : elle ne peut pas changer de classe.");
        }

        Classroom from = enrollment.getClassroom();
        Classroom to = classroomRepository.findById(request.getToClassroomId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));

        if (from.getId().equals(to.getId())) {
            throw new BusinessException(ErrorCode.TRANSFER_SAME_CLASSROOM,
                    enrollment.getStudent().fullName() + " est déjà en " + to.getName() + ".");
        }
        if (!to.getAcademicYear().getId().equals(enrollment.getAcademicYear().getId())) {
            throw new BusinessException(ErrorCode.TRANSFER_CLASSROOM_MISMATCH,
                    to.getName() + " appartient à une autre année scolaire.");
        }
        if (to.getStatus() != ClassroomStatus.ACTIVE) {
            throw new BusinessException(ErrorCode.CLASS_NOT_ACTIVE,
                    to.getName() + " n'est pas une classe active.");
        }

        long occupied = enrollmentRepository.countOccupiedSeats(to.getId());
        if (!request.isOverrideCapacity() && occupied >= to.getCapacityMaximum()) {
            throw new BusinessException(ErrorCode.CLASS_CAPACITY_EXCEEDED,
                    to.getName() + " est complète (" + occupied + "/"
                            + to.getCapacityMaximum() + "). Une dérogation explicite est "
                            + "nécessaire pour y placer un élève de plus.")
                    .detail("capacityMaximum", to.getCapacityMaximum())
                    .detail("activeEnrollments", occupied);
        }

        EnrollmentTransfer movement = new EnrollmentTransfer();
        movement.setEnrollment(enrollment);
        movement.setFromClassroom(from);
        movement.setToClassroom(to);
        movement.setReason(request.getReason().trim());
        movement.setTransferredBy(currentUser.id().orElse(null));

        enrollment.setClassroom(to);
        enrollmentRepository.save(enrollment);
        EnrollmentTransfer saved = transferRepository.save(movement);

        auditService.logUpdate("Enrollment", enrollment.getId(),
                enrollment.getStudent().fullName(),
                Map.of("classroom", from.getName()),
                Map.of("classroom", to.getName(), "reason", movement.getReason()));

        log.info("Class change: {} moved from {} to {}",
                enrollment.getStudent().fullName(), from.getName(), to.getName());
        return toResponse(saved);
    }

    // ------------------------------------------------------------ departures

    /**
     * Records that a pupil leaves the school.
     *
     * <p>The enrollment is closed and the pupil's file marked accordingly. The
     * balance owed is read now and frozen: recomputed in six months it would
     * count next year's fees and no longer match what was said to the family
     * on the day.</p>
     */
    @Transactional
    public DepartureResponse recordDeparture(DepartureRecordRequest request) {
        Enrollment enrollment = requireEnrollment(request.getEnrollmentId());
        if (!LIVE_ENROLLMENTS.contains(enrollment.getStatus())) {
            throw new BusinessException(ErrorCode.ENROLLMENT_NOT_ALLOWED,
                    "Cette inscription n'est pas active : il n'y a rien à clore.");
        }
        departureRepository.findLive(enrollment.getId()).ifPresent((existing) -> {
            throw new BusinessException(ErrorCode.DEPARTURE_ALREADY_RECORDED,
                    "Une sortie du " + existing.getDepartureDate() + " est déjà "
                            + "enregistrée pour cet élève. Annulez-la d'abord si elle "
                            + "est erronée.");
        });

        if (request.getDepartureDate().isBefore(enrollment.getEnrollmentDate())) {
            throw new BusinessException(ErrorCode.DEPARTURE_DATE_BEFORE_ENROLLMENT,
                    "La date de sortie précède l'inscription du "
                            + enrollment.getEnrollmentDate() + ".");
        }
        if (request.getReason().requiresDestination()
                && blankToNull(request.getDestinationSchool()) == null) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Un transfert vers un autre établissement demande son nom : sans lui, "
                            + "l'exeat ne peut pas être rapproché par l'école d'accueil.");
        }

        Student student = enrollment.getStudent();
        StudentDeparture departure = new StudentDeparture();
        departure.setStudent(student);
        departure.setEnrollment(enrollment);
        departure.setClassroom(enrollment.getClassroom());
        departure.setAcademicYear(enrollment.getAcademicYear());
        departure.setReason(request.getReason());
        departure.setDepartureDate(request.getDepartureDate());
        departure.setDestinationSchool(blankToNull(request.getDestinationSchool()));
        departure.setDestinationCity(blankToNull(request.getDestinationCity()));
        departure.setNotes(blankToNull(request.getNotes()));
        departure.setRecordedBy(currentUser.id().orElse(null));

        BigDecimal owed = outstandingOf(student.getId(), enrollment.getAcademicYear().getId());
        departure.setOutstandingAmount(owed);
        departure.setCurrency(currencyOf(student.getId(), enrollment.getAcademicYear().getId()));

        StudentDeparture saved = departureRepository.save(departure);
        closeEnrollment(enrollment, request.getReason());

        auditService.logUpdate("Enrollment", enrollment.getId(), student.fullName(),
                Map.of("status", EnrollmentStatus.ACTIVE.name()),
                Map.of("status", EnrollmentStatus.TRANSFERRED.name(),
                        "reason", request.getReason().name(),
                        "outstanding", owed.toPlainString()));

        log.info("Departure recorded: {} leaves on {} ({}), {} owed",
                student.fullName(), request.getDepartureDate(), request.getReason(), owed);
        return toResponse(saved);
    }

    /** Ticks the papers as they are handed over, one at a time. */
    @Transactional
    public DepartureResponse updateDocuments(UUID departureId,
                                             DepartureDocumentsRequest request) {
        StudentDeparture departure = requireDeparture(departureId);
        requireEditable(departure);

        departure.setExeatIssued(request.isExeatIssued());
        departure.setCertificateIssued(request.isCertificateIssued());
        departure.setReportCardIssued(request.isReportCardIssued());
        departure.setFileReturned(request.isFileReturned());
        return toResponse(departureRepository.save(departure));
    }

    /**
     * Closes the file once everything has been handed over.
     *
     * <p>Refused while a document is still owed. « Soldé » has to mean the
     * family left with everything, otherwise the word is worthless and somebody
     * will discover the missing exeat two years later.</p>
     */
    @Transactional
    public DepartureResponse clearDeparture(UUID departureId) {
        StudentDeparture departure = requireDeparture(departureId);
        requireEditable(departure);

        if (!departure.documentsComplete()) {
            throw new BusinessException(ErrorCode.DEPARTURE_DOCUMENTS_INCOMPLETE,
                    "Il manque des pièces à remettre. Solder un dossier incomplet ferait "
                            + "croire que la famille est repartie avec tout.");
        }
        departure.clear(currentUser.id().orElse(null));
        StudentDeparture saved = departureRepository.save(departure);

        auditService.logValidate("StudentDeparture", saved.getId(),
                saved.getStudent().fullName(), "Dossier de sortie soldé");
        return toResponse(saved);
    }

    /**
     * Undoes a departure recorded by mistake.
     *
     * <p>The pupil comes back: the enrollment returns to active and the file to
     * its previous state. The status is restored directly rather than through
     * the transition map, which forbids leaving TRANSFERRED — rightly, since
     * that is a one-way door for a real departure. This is not a transition, it
     * is the correction of something that never should have been written.</p>
     */
    @Transactional
    public DepartureResponse cancelDeparture(UUID departureId, DepartureCancelRequest request) {
        StudentDeparture departure = requireDeparture(departureId);
        if (departure.getStatus() == DepartureStatus.CANCELLED) {
            throw new BusinessException(ErrorCode.DEPARTURE_NOT_EDITABLE,
                    "Cette sortie est déjà annulée.");
        }

        departure.cancel(request.getReason().trim());
        StudentDeparture saved = departureRepository.save(departure);

        Enrollment enrollment = departure.getEnrollment();
        enrollment.setStatus(EnrollmentStatus.ACTIVE);
        enrollmentRepository.save(enrollment);

        Student student = departure.getStudent();
        student.setStatus(StudentStatus.ACTIVE);

        auditService.logUpdate("StudentDeparture", saved.getId(), student.fullName(),
                Map.of("status", DepartureStatus.RECORDED.name()),
                Map.of("status", DepartureStatus.CANCELLED.name(),
                        "reason", saved.getCancelledReason()));

        log.info("Departure {} cancelled: {} is back in {}", departureId,
                student.fullName(), enrollment.getClassroom().getName());
        return toResponse(saved);
    }

    // ------------------------------------------------------------ internals

    /** Ends the schooling: the enrollment closes, the pupil's file follows. */
    private void closeEnrollment(Enrollment enrollment, DepartureReason reason) {
        enrollment.changeStatus(EnrollmentStatus.TRANSFERRED);
        enrollmentRepository.save(enrollment);

        Student student = enrollment.getStudent();
        // Parti vers une autre école : TRANSFERRED. Parti sans destination —
        // déménagement, abandon, exclusion : WITHDRAWN. La distinction sert à
        // la réinscription et aux statistiques de fin d'année.
        StudentStatus target = reason == DepartureReason.TRANSFER_OUT
                ? StudentStatus.TRANSFERRED
                : StudentStatus.WITHDRAWN;
        if (student.getStatus().canTransitionTo(target)) {
            student.changeStatus(target);
        }
    }

    /** Everything still owed for that year, summed once. */
    private BigDecimal outstandingOf(UUID studentId, UUID academicYearId) {
        return studentFeeRepository
                .findOutstandingOldestFirst(studentId, academicYearId).stream()
                .map(StudentFee::getAmountRemaining)
                .filter((amount) -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private String currencyOf(UUID studentId, UUID academicYearId) {
        return studentFeeRepository
                .findByStudentIdAndAcademicYearIdOrderByDueDateAsc(studentId, academicYearId)
                .stream()
                .map(StudentFee::getCurrency)
                .findFirst()
                .orElse("XOF");
    }

    private void requireEditable(StudentDeparture departure) {
        if (!departure.getStatus().isEditable()) {
            throw new BusinessException(ErrorCode.DEPARTURE_NOT_EDITABLE,
                    departure.getStatus() == DepartureStatus.CLEARED
                            ? "Ce dossier est soldé : les pièces ont toutes été remises."
                            : "Cette sortie est annulée.");
        }
    }

    // -------------------------------------------------------------- mapping

    private ClassChangeResponse toResponse(EnrollmentTransfer movement) {
        ClassChangeResponse response = new ClassChangeResponse();
        response.setId(movement.getId());

        Enrollment enrollment = movement.getEnrollment();
        response.setEnrollmentId(enrollment.getId());
        Student student = enrollment.getStudent();
        response.setStudentId(student.getId());
        response.setStudentNumber(student.getStudentNumber());
        response.setStudentName(student.fullName());

        Classroom from = movement.getFromClassroom();
        Classroom to = movement.getToClassroom();
        response.setFromClassroomId(from.getId());
        response.setFromClassroomName(from.getName());
        response.setToClassroomId(to.getId());
        response.setToClassroomName(to.getName());
        response.setCrossesLevel(from.getLevel() != null && to.getLevel() != null
                && !from.getLevel().getId().equals(to.getLevel().getId()));

        response.setReason(movement.getReason());
        response.setTransferredAt(movement.getTransferredAt());
        return response;
    }

    private DepartureResponse toResponse(StudentDeparture departure) {
        DepartureResponse response = new DepartureResponse();
        response.setId(departure.getId());

        Student student = departure.getStudent();
        response.setStudentId(student.getId());
        response.setStudentNumber(student.getStudentNumber());
        response.setStudentName(student.fullName());
        response.setPhotoUrl(student.getPhotoUrl());

        response.setEnrollmentId(departure.getEnrollment().getId());
        Classroom classroom = departure.getClassroom();
        response.setClassroomId(classroom.getId());
        response.setClassroomName(classroom.getName());
        response.setLevelName(classroom.getLevel() != null ? classroom.getLevel().getName() : null);

        response.setReason(departure.getReason());
        response.setReasonLabel(labelOf(departure.getReason()));
        response.setDepartureDate(departure.getDepartureDate());
        response.setUpcoming(departure.getStatus() != DepartureStatus.CANCELLED
                && departure.getDepartureDate().isAfter(LocalDate.now()));

        response.setDestinationSchool(departure.getDestinationSchool());
        response.setDestinationCity(departure.getDestinationCity());
        response.setNotes(departure.getNotes());
        response.setOutstandingAmount(departure.getOutstandingAmount());
        response.setCurrency(departure.getCurrency());

        response.setExeatIssued(departure.isExeatIssued());
        response.setCertificateIssued(departure.isCertificateIssued());
        response.setReportCardIssued(departure.isReportCardIssued());
        response.setFileReturned(departure.isFileReturned());

        int issued = 0;
        if (departure.isExeatIssued()) {
            issued++;
        }
        if (departure.isCertificateIssued()) {
            issued++;
        }
        if (departure.isReportCardIssued()) {
            issued++;
        }
        if (departure.isFileReturned()) {
            issued++;
        }
        response.setDocumentsIssued(issued);
        response.setDocumentsComplete(departure.documentsComplete());

        response.setStatus(departure.getStatus());
        response.setStatusLabel(labelOf(departure.getStatus()));
        response.setEditable(departure.getStatus().isEditable());
        response.setAllowsReturn(departure.getReason().allowsReturn());
        response.setRecordedAt(departure.getRecordedAt());
        response.setClearedAt(departure.getClearedAt());
        response.setCancelledReason(departure.getCancelledReason());
        return response;
    }

    // --------------------------------------------------------------- labels

    /** French wording, decided once here rather than in each screen. */
    private String labelOf(DepartureReason reason) {
        return switch (reason) {
            case TRANSFER_OUT -> "Transfert vers un autre établissement";
            case FAMILY_MOVE -> "Déménagement de la famille";
            case FINANCIAL -> "Raisons financières";
            case DISCIPLINARY -> "Exclusion définitive";
            case ACADEMIC -> "Réorientation";
            case HEALTH -> "Raisons de santé";
            case ABANDONMENT -> "Abandon sans nouvelles";
            case OTHER -> "Autre motif";
        };
    }

    private String labelOf(DepartureStatus status) {
        return switch (status) {
            case DRAFT -> "Brouillon";
            case RECORDED -> "Sortie enregistrée";
            case CLEARED -> "Dossier soldé";
            case CANCELLED -> "Annulée";
        };
    }

    // --------------------------------------------------------------- lookups

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private Enrollment requireEnrollment(UUID enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENROLLMENT_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (enrollment.getAcademicYear() == null
                || enrollment.getAcademicYear().getSchool() == null
                || !schoolId.equals(enrollment.getAcademicYear().getSchool().getId())) {
            throw new BusinessException(ErrorCode.ENROLLMENT_NOT_FOUND);
        }
        return enrollment;
    }

    private StudentDeparture requireDeparture(UUID departureId) {
        StudentDeparture departure = departureRepository.findById(departureId)
                .orElseThrow(() -> new BusinessException(ErrorCode.DEPARTURE_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (departure.getAcademicYear() == null
                || departure.getAcademicYear().getSchool() == null
                || !schoolId.equals(departure.getAcademicYear().getSchool().getId())) {
            throw new BusinessException(ErrorCode.DEPARTURE_NOT_FOUND);
        }
        return departure;
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
