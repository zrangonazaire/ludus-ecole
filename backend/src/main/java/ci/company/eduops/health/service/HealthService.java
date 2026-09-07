package ci.company.eduops.health.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.health.domain.ExaminationOutcome;
import ci.company.eduops.health.domain.HealthCondition;
import ci.company.eduops.health.domain.HealthSeverity;
import ci.company.eduops.health.domain.InfirmaryVisit;
import ci.company.eduops.health.domain.MedicalExamination;
import ci.company.eduops.health.domain.StudentHealthRecord;
import ci.company.eduops.health.domain.StudentVaccination;
import ci.company.eduops.health.domain.Vaccine;
import ci.company.eduops.health.dto.request.ExaminationRequest;
import ci.company.eduops.health.dto.request.ExaminationResultRequest;
import ci.company.eduops.health.dto.request.HealthConditionRequest;
import ci.company.eduops.health.dto.request.HealthRecordRequest;
import ci.company.eduops.health.dto.request.InfirmaryVisitRequest;
import ci.company.eduops.health.dto.request.VaccinationRequest;
import ci.company.eduops.health.dto.response.ExaminationResponse;
import ci.company.eduops.health.dto.response.HealthAlertResponse;
import ci.company.eduops.health.dto.response.HealthBoardResponse;
import ci.company.eduops.health.dto.response.HealthConditionResponse;
import ci.company.eduops.health.dto.response.HealthRecordResponse;
import ci.company.eduops.health.dto.response.InfirmaryVisitResponse;
import ci.company.eduops.health.dto.response.VaccinationResponse;
import ci.company.eduops.health.dto.response.VaccineResponse;
import ci.company.eduops.health.repository.HealthConditionRepository;
import ci.company.eduops.health.repository.InfirmaryVisitRepository;
import ci.company.eduops.health.repository.MedicalExaminationRepository;
import ci.company.eduops.health.repository.StudentHealthRecordRepository;
import ci.company.eduops.health.repository.StudentVaccinationRepository;
import ci.company.eduops.health.repository.VaccineRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * School health: the infirmary file, its register, vaccinations and the
 * compulsory examinations.
 *
 * <p><strong>Confidentiality is enforced here, not on the screen.</strong>
 * {@link #board} branches on {@link Permissions#HEALTH_RECORD_VIEW}: a caller
 * without it receives {@link HealthAlertResponse} objects, which have no field
 * for the diagnosis, the medication, the physician or the notes. The medical
 * detail is never loaded and never serialised, so hiding a column on the
 * client is not what protects it. A teacher reading the network response of
 * their own browser learns nothing they were not meant to know.</p>
 *
 * <p>What supervising staff do receive is the label and the action to take,
 * for conditions marked {@code HIGH} or {@code CRITICAL}. That much is not
 * optional: a teacher on a field trip who does not know a pupil carries an
 * adrenaline pen cannot use it.</p>
 *
 * <p>Six refusals are enforced here rather than left to the screen:</p>
 * <ul>
 *   <li>No alert without the action to take. A warning that names a danger and
 *       not the response is the worst of both worlds for whoever reads it.</li>
 *   <li>No infirmary visit recorded in the future.</li>
 *   <li>No pupil sent home or evacuated without the family having been
 *       reached — the mistake the register exists to prevent.</li>
 *   <li>No referral without naming where the pupil was sent.</li>
 *   <li>No fit-with-reserve without writing the reserve down.</li>
 *   <li>No second examination of the same kind for the same pupil and year.</li>
 * </ul>
 *
 * <p>A missing compulsory vaccine is flagged and followed up, never a bar to
 * schooling: the child is not the one who decided.</p>
 */
@Service
public class HealthService {

    private static final Logger log = LoggerFactory.getLogger(HealthService.class);

    /** The register opens on the current week. */
    private static final int REGISTER_DAYS = 7;

    private final StudentHealthRecordRepository recordRepository;
    private final HealthConditionRepository conditionRepository;
    private final InfirmaryVisitRepository visitRepository;
    private final VaccineRepository vaccineRepository;
    private final StudentVaccinationRepository vaccinationRepository;
    private final MedicalExaminationRepository examinationRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AcademicYearRepository academicYearRepository;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public HealthService(StudentHealthRecordRepository recordRepository,
                         HealthConditionRepository conditionRepository,
                         InfirmaryVisitRepository visitRepository,
                         VaccineRepository vaccineRepository,
                         StudentVaccinationRepository vaccinationRepository,
                         MedicalExaminationRepository examinationRepository,
                         StudentRepository studentRepository,
                         EnrollmentRepository enrollmentRepository,
                         AcademicYearRepository academicYearRepository,
                         AuditService auditService,
                         CurrentUser currentUser) {
        this.recordRepository = recordRepository;
        this.conditionRepository = conditionRepository;
        this.visitRepository = visitRepository;
        this.vaccineRepository = vaccineRepository;
        this.vaccinationRepository = vaccinationRepository;
        this.examinationRepository = examinationRepository;
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.academicYearRepository = academicYearRepository;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // ------------------------------------------------------------- reading

    /**
     * The school health screen.
     *
     * <p>Two shapes, decided by permission. Without {@code HEALTH_RECORD_VIEW}
     * only the alerts are read from the database at all.</p>
     */
    @Transactional(readOnly = true)
    public HealthBoardResponse board(UUID academicYearId, String search) {
        AcademicYear year = resolveYear(academicYearId);
        boolean fullAccess = currentUser.hasPermission(Permissions.HEALTH_RECORD_VIEW);

        HealthBoardResponse board = new HealthBoardResponse();
        board.setAcademicYearId(year.getId());
        board.setAcademicYearCode(year.getCode());
        board.setFullAccess(fullAccess);

        Map<UUID, Enrollment> enrollments = enrollmentsByStudent(year.getId());

        // Les alertes vont a tout le monde : c'est leur raison d'etre.
        List<StudentHealthRecord> flagged = recordRepository.findWithAlerts(year.getId());
        List<HealthAlertResponse> alerts = new ArrayList<>();
        for (StudentHealthRecord record : flagged) {
            for (HealthCondition condition : record.alerts()) {
                alerts.add(toAlert(record, condition, enrollments));
            }
        }
        alerts.sort((a, b) -> {
            int bySeverity = Integer.compare(rank(b.getSeverity()), rank(a.getSeverity()));
            return bySeverity != 0 ? bySeverity : a.getStudentName().compareTo(b.getStudentName());
        });
        board.setAlerts(alerts);
        board.setAlertCount(alerts.size());

        if (!fullAccess) {
            // On s'arrete la. Le detail medical n'est pas charge, donc il ne
            // peut pas fuir par la reponse : c'est le serveur qui cloisonne,
            // pas l'ecran.
            return board;
        }

        OffsetDateTime from = OffsetDateTime.now().minusDays(REGISTER_DAYS);
        String term = search == null ? "" : search.trim();
        List<InfirmaryVisit> visits = visitRepository.findRegister(year.getId(), from, term);
        List<InfirmaryVisitResponse> visitRows = new ArrayList<>();
        for (InfirmaryVisit visit : visits) {
            visitRows.add(toVisit(visit, enrollments));
        }
        board.setVisits(visitRows);
        board.setVisitCountThisWeek(visitRows.size());
        board.setAwaitingGuardianCount(visitRepository.findUnnotified(year.getId()).size());

        Map<UUID, List<StudentVaccination>> vaccinations = vaccinationsByRecord(year.getId());
        List<StudentHealthRecord> records = recordRepository.findForYear(year.getId(), term);
        List<HealthRecordResponse> recordRows = new ArrayList<>();
        int missingVaccines = 0;
        for (StudentHealthRecord record : records) {
            HealthRecordResponse row = toRecord(record, enrollments,
                    vaccinations.getOrDefault(record.getId(), List.of()));
            missingVaccines += row.getMissingVaccineCount();
            recordRows.add(row);
        }
        recordRows.sort((a, b) -> {
            int byAlert = Integer.compare(b.getAlertCount(), a.getAlertCount());
            return byAlert != 0 ? byAlert : a.getStudentName().compareTo(b.getStudentName());
        });
        board.setRecords(recordRows);
        board.setMissingVaccineCount(missingVaccines);
        board.setMissingConsentCount((int) recordRepository.countWithoutConsent(year.getId()));

        LocalDate today = LocalDate.now();
        List<MedicalExamination> examinations =
                examinationRepository.findForYear(year.getId(), term);
        List<ExaminationResponse> examRows = new ArrayList<>();
        int overdue = 0;
        for (MedicalExamination examination : examinations) {
            ExaminationResponse row = toExamination(examination, enrollments, today);
            if (row.isOverdue()) {
                overdue++;
            }
            examRows.add(row);
        }
        board.setExaminations(examRows);
        board.setOverdueExaminationCount(overdue);
        return board;
    }

    /** The school's own list of vaccines, in display order. */
    @Transactional(readOnly = true)
    public List<VaccineResponse> vaccines() {
        List<VaccineResponse> rows = new ArrayList<>();
        for (Vaccine vaccine
                : vaccineRepository.findBySchoolIdAndActiveTrueOrderByDisplayOrderAsc(
                        requireSchool())) {
            VaccineResponse row = new VaccineResponse();
            row.setId(vaccine.getId());
            row.setCode(vaccine.getCode());
            row.setLabel(vaccine.getLabel());
            row.setDescription(vaccine.getDescription());
            row.setRequired(vaccine.isRequired());
            row.setDosesExpected(vaccine.getDosesExpected());
            rows.add(row);
        }
        return rows;
    }

    /** One pupil's file, in full. */
    @Transactional(readOnly = true)
    public HealthRecordResponse record(UUID studentId) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_VIEW);
        StudentHealthRecord record = recordRepository.findByStudentId(studentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.HEALTH_RECORD_NOT_FOUND,
                        "Cet élève n'a pas encore de fiche de santé."));
        AcademicYear year = resolveYear(null);
        return toRecord(record, enrollmentsByStudent(year.getId()),
                vaccinationRepository.findByHealthRecordId(record.getId()));
    }

    // ------------------------------------------------------------- writing

    /** Creates the file if it does not exist yet, then updates it. */
    @Transactional
    public HealthRecordResponse saveRecord(HealthRecordRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        Student student = requireStudent(request.getStudentId());
        StudentHealthRecord record = recordRepository.findByStudentId(student.getId())
                .orElseGet(() -> {
                    StudentHealthRecord created = new StudentHealthRecord();
                    created.setStudent(student);
                    return created;
                });

        record.setBloodGroup(blankToNull(request.getBloodGroup()));
        record.setPhysicianName(blankToNull(request.getPhysicianName()));
        record.setPhysicianPhone(blankToNull(request.getPhysicianPhone()));
        record.setInsuranceName(blankToNull(request.getInsuranceName()));
        record.setInsuranceNumber(blankToNull(request.getInsuranceNumber()));
        record.setNotes(blankToNull(request.getNotes()));
        // Le consentement et sa date vont ensemble : l'entite s'en charge, pour
        // qu'une autorisation ne puisse pas rester sans date signee.
        record.setConsent(request.isCareConsent(),
                request.getConsentSignedOn() != null
                        ? request.getConsentSignedOn() : LocalDate.now());
        record.markReviewed(LocalDate.now(), currentUser.id().orElse(null));

        StudentHealthRecord saved = recordRepository.save(record);
        auditService.logUpdate("StudentHealthRecord", saved.getId(), student.fullName(),
                Map.of(), Map.of("careConsent", String.valueOf(request.isCareConsent())));
        log.info("Health file saved for {}", student.fullName());

        AcademicYear year = resolveYear(null);
        return toRecord(saved, enrollmentsByStudent(year.getId()),
                vaccinationRepository.findByHealthRecordId(saved.getId()));
    }

    /** Declares a condition on the file. */
    @Transactional
    public HealthConditionResponse addCondition(HealthConditionRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        requireActionForAlert(request.getSeverity(), request.getActionToTake());

        Student student = requireStudent(request.getStudentId());
        StudentHealthRecord record = recordRepository.findByStudentId(student.getId())
                .orElseGet(() -> {
                    StudentHealthRecord created = new StudentHealthRecord();
                    created.setStudent(student);
                    return recordRepository.save(created);
                });

        HealthCondition condition = new HealthCondition();
        condition.setHealthRecord(record);
        condition.setKind(request.getKind());
        condition.setLabel(request.getLabel().trim());
        condition.setSeverity(request.getSeverity());
        condition.setDescription(blankToNull(request.getDescription()));
        condition.setActionToTake(blankToNull(request.getActionToTake()));
        condition.setMedication(blankToNull(request.getMedication()));
        condition.setSelfCarried(request.isSelfCarried());
        condition.setDeclaredOn(request.getDeclaredOn() != null
                ? request.getDeclaredOn() : LocalDate.now());
        record.getConditions().add(condition);
        recordRepository.save(record);

        auditService.logCreate("HealthCondition", condition.getId(), student.fullName(),
                Map.of("severity", request.getSeverity().name(),
                        "alert", String.valueOf(request.getSeverity().isAlert())));
        log.info("Health condition declared for {} ({})",
                student.fullName(), request.getSeverity());
        return toCondition(condition);
    }

    /** Amends a condition already on the file. */
    @Transactional
    public HealthConditionResponse updateCondition(UUID conditionId,
                                                   HealthConditionRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        requireActionForAlert(request.getSeverity(), request.getActionToTake());

        HealthCondition condition = requireCondition(conditionId);
        condition.setKind(request.getKind());
        condition.setLabel(request.getLabel().trim());
        condition.setSeverity(request.getSeverity());
        condition.setDescription(blankToNull(request.getDescription()));
        condition.setActionToTake(blankToNull(request.getActionToTake()));
        condition.setMedication(blankToNull(request.getMedication()));
        condition.setSelfCarried(request.isSelfCarried());
        recordRepository.save(condition.getHealthRecord());
        return toCondition(condition);
    }

    /**
     * Closes a condition.
     *
     * <p>Never deletes: a condition resolved too early must remain findable.</p>
     */
    @Transactional
    public HealthConditionResponse resolveCondition(UUID conditionId) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        HealthCondition condition = requireCondition(conditionId);
        condition.resolve(LocalDate.now());
        recordRepository.save(condition.getHealthRecord());
        return toCondition(condition);
    }

    /** Records one passage through the infirmary. */
    @Transactional
    public InfirmaryVisitResponse recordVisit(InfirmaryVisitRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_VISIT_RECORD);
        Student student = requireStudent(request.getStudentId());
        AcademicYear year = resolveYear(null);

        OffsetDateTime occurredAt = request.getOccurredAt() != null
                ? request.getOccurredAt() : OffsetDateTime.now();
        if (occurredAt.isAfter(OffsetDateTime.now())) {
            throw new BusinessException(ErrorCode.HEALTH_VISIT_IN_FUTURE,
                    "On ne consigne pas un passage à une heure qui n'est pas venue.");
        }
        if (request.getOutcome().requiresGuardian() && !request.isGuardianNotified()) {
            throw new BusinessException(ErrorCode.HEALTH_GUARDIAN_NOT_NOTIFIED,
                    "L'élève ne peut pas quitter l'école sans que la famille "
                            + "ait été jointe.");
        }
        if (request.getOutcome().requiresReferral()
                && blankToNull(request.getReferredTo()) == null) {
            throw new BusinessException(ErrorCode.HEALTH_REFERRAL_REQUIRED,
                    "Précisez vers quel centre l'élève a été orienté.");
        }

        InfirmaryVisit visit = new InfirmaryVisit();
        visit.setStudent(student);
        visit.setAcademicYear(year);
        enrollmentRepository.findActiveEnrollment(student.getId(), year.getId())
                .ifPresent((enrollment) -> visit.setClassroom(enrollment.getClassroom()));
        visit.setOccurredAt(occurredAt);
        visit.setComplaint(request.getComplaint().trim());
        visit.setCareGiven(request.getCareGiven().trim());
        visit.setTemperatureCelsius(request.getTemperatureCelsius());
        visit.setOutcome(request.getOutcome());
        visit.setNotes(blankToNull(request.getNotes()));
        visit.setReferredTo(blankToNull(request.getReferredTo()));
        if (request.isGuardianNotified()) {
            visit.notifyGuardian(OffsetDateTime.now());
        }
        visit.setRecordedBy(currentUser.id().orElse(null));

        InfirmaryVisit saved = visitRepository.save(visit);
        auditService.logCreate("InfirmaryVisit", saved.getId(), student.fullName(),
                Map.of("outcome", request.getOutcome().name()));
        log.info("Infirmary visit recorded for {} ({})",
                student.fullName(), request.getOutcome());
        return toVisit(saved, enrollmentsByStudent(year.getId()));
    }

    /** Notes that the family has been reached about a visit. */
    @Transactional
    public InfirmaryVisitResponse notifyGuardian(UUID visitId) {
        currentUser.requirePermission(Permissions.HEALTH_VISIT_RECORD);
        InfirmaryVisit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new BusinessException(ErrorCode.HEALTH_VISIT_NOT_FOUND));
        visit.notifyGuardian(OffsetDateTime.now());
        InfirmaryVisit saved = visitRepository.save(visit);
        return toVisit(saved, enrollmentsByStudent(saved.getAcademicYear().getId()));
    }

    /** Records what the office has seen of one vaccine. */
    @Transactional
    public VaccinationResponse saveVaccination(VaccinationRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        Student student = requireStudent(request.getStudentId());
        Vaccine vaccine = vaccineRepository.findById(request.getVaccineId())
                .orElseThrow(() -> new BusinessException(ErrorCode.VACCINE_NOT_FOUND));
        if (request.getDosesReceived() > vaccine.getDosesExpected()) {
            throw new BusinessException(ErrorCode.VACCINATION_DOSES_EXCEEDED,
                    "Le calendrier prévoit " + vaccine.getDosesExpected()
                            + " dose(s) pour ce vaccin.");
        }

        StudentHealthRecord record = recordRepository.findByStudentId(student.getId())
                .orElseGet(() -> {
                    StudentHealthRecord created = new StudentHealthRecord();
                    created.setStudent(student);
                    return recordRepository.save(created);
                });

        StudentVaccination vaccination = vaccinationRepository
                .findByHealthRecordIdAndVaccineId(record.getId(), vaccine.getId())
                .orElseGet(() -> {
                    StudentVaccination created = new StudentVaccination();
                    created.setHealthRecord(record);
                    created.setVaccine(vaccine);
                    return created;
                });
        vaccination.setDosesReceived(request.getDosesReceived());
        vaccination.setLastDoseOn(request.getLastDoseOn());
        vaccination.setNextDoseDueOn(request.getNextDoseDueOn());
        vaccination.setCertificateSeen(request.isCertificateSeen());
        vaccination.setNotes(blankToNull(request.getNotes()));

        StudentVaccination saved = vaccinationRepository.save(vaccination);
        return toVaccination(saved);
    }

    /** Plans a compulsory examination. */
    @Transactional
    public ExaminationResponse planExamination(ExaminationRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        Student student = requireStudent(request.getStudentId());
        AcademicYear year = resolveYear(null);

        examinationRepository
                .findByStudentIdAndAcademicYearIdAndKind(student.getId(), year.getId(),
                        request.getKind())
                .ifPresent((existing) -> {
                    throw new BusinessException(ErrorCode.EXAMINATION_ALREADY_PLANNED,
                            "Cette visite est déjà prévue le " + existing.getScheduledOn()
                                    + " pour cet élève.");
                });

        MedicalExamination examination = new MedicalExamination();
        examination.setStudent(student);
        examination.setAcademicYear(year);
        examination.setKind(request.getKind());
        examination.setScheduledOn(request.getScheduledOn());
        examination.setPractitioner(blankToNull(request.getPractitioner()));
        examination.setNotes(blankToNull(request.getNotes()));
        examination.setOutcome(ExaminationOutcome.PENDING);

        MedicalExamination saved = examinationRepository.save(examination);
        return toExamination(saved, enrollmentsByStudent(year.getId()), LocalDate.now());
    }

    /** Records the finding of an examination. */
    @Transactional
    public ExaminationResponse recordExamination(UUID examinationId,
                                                  ExaminationResultRequest request) {
        currentUser.requirePermission(Permissions.HEALTH_RECORD_MANAGE);
        MedicalExamination examination = examinationRepository.findById(examinationId)
                .orElseThrow(() -> new BusinessException(ErrorCode.EXAMINATION_NOT_FOUND));

        if (request.getOutcome().requiresRestriction()
                && blankToNull(request.getRestriction()) == null) {
            throw new BusinessException(ErrorCode.EXAMINATION_RESTRICTION_REQUIRED,
                    "Une aptitude sous réserve doit dire laquelle : sans cela le "
                            + "professeur d'éducation physique ne sait pas quoi aménager.");
        }

        LocalDate performedOn = request.getPerformedOn() != null
                ? request.getPerformedOn() : LocalDate.now();
        examination.record(request.getOutcome(), performedOn, currentUser.id().orElse(null));
        examination.setRestriction(blankToNull(request.getRestriction()));
        if (blankToNull(request.getPractitioner()) != null) {
            examination.setPractitioner(request.getPractitioner().trim());
        }
        examination.setNotes(blankToNull(request.getNotes()));

        MedicalExamination saved = examinationRepository.save(examination);
        auditService.logUpdate("MedicalExamination", saved.getId(),
                saved.getStudent().fullName(), Map.of(),
                Map.of("outcome", request.getOutcome().name()));
        return toExamination(saved, enrollmentsByStudent(saved.getAcademicYear().getId()),
                LocalDate.now());
    }

    // -------------------------------------------------------------- guards

    /**
     * An alert must carry the action to take.
     *
     * <p>Enforced here rather than by a bean-validation annotation, because the
     * rule depends on another field of the same request.</p>
     */
    private void requireActionForAlert(HealthSeverity severity, String actionToTake) {
        if (severity != null && severity.isAlert() && blankToNull(actionToTake) == null) {
            throw new BusinessException(ErrorCode.HEALTH_ACTION_REQUIRED,
                    "Une condition signalée aux encadrants doit dire quoi faire : "
                            + "une alerte sans conduite à tenir prévient d'un danger "
                            + "sans indiquer la réponse.");
        }
    }

    // ----------------------------------------------------------- rendering

    private HealthAlertResponse toAlert(StudentHealthRecord record,
                                        HealthCondition condition,
                                        Map<UUID, Enrollment> enrollments) {
        Student student = record.getStudent();
        HealthAlertResponse row = new HealthAlertResponse();
        row.setStudentId(student.getId());
        row.setStudentNumber(student.getStudentNumber());
        row.setStudentName(student.fullName());
        row.setClassroomName(classroomNameOf(student.getId(), enrollments));
        row.setLabel(condition.getLabel());
        row.setSeverity(condition.getSeverity().name());
        row.setSeverityLabel(severityLabel(condition.getSeverity()));
        row.setActionToTake(condition.getActionToTake());
        row.setSelfCarried(condition.isSelfCarried());
        return row;
    }

    private HealthRecordResponse toRecord(StudentHealthRecord record,
                                          Map<UUID, Enrollment> enrollments,
                                          List<StudentVaccination> vaccinations) {
        Student student = record.getStudent();
        HealthRecordResponse row = new HealthRecordResponse();
        row.setId(record.getId());
        row.setStudentId(student.getId());
        row.setStudentNumber(student.getStudentNumber());
        row.setStudentName(student.fullName());
        row.setClassroomName(classroomNameOf(student.getId(), enrollments));
        row.setBloodGroup(record.getBloodGroup());
        row.setPhysicianName(record.getPhysicianName());
        row.setPhysicianPhone(record.getPhysicianPhone());
        row.setInsuranceName(record.getInsuranceName());
        row.setInsuranceNumber(record.getInsuranceNumber());
        row.setNotes(record.getNotes());
        row.setCareConsent(record.isCareConsent());
        row.setConsentSignedOn(record.getConsentSignedOn());
        row.setReviewedOn(record.getReviewedOn());

        List<HealthConditionResponse> conditions = new ArrayList<>();
        int alertCount = 0;
        for (HealthCondition condition : record.getConditions()) {
            HealthConditionResponse mapped = toCondition(condition);
            if (mapped.isAlert()) {
                alertCount++;
            }
            conditions.add(mapped);
        }
        row.setConditions(conditions);
        row.setAlertCount(alertCount);

        List<VaccinationResponse> shots = new ArrayList<>();
        int missing = 0;
        for (StudentVaccination vaccination : vaccinations) {
            VaccinationResponse mapped = toVaccination(vaccination);
            if (mapped.isOutstanding()) {
                missing++;
            }
            shots.add(mapped);
        }
        row.setVaccinations(shots);
        row.setMissingVaccineCount(missing);
        return row;
    }

    private HealthConditionResponse toCondition(HealthCondition condition) {
        HealthConditionResponse row = new HealthConditionResponse();
        row.setId(condition.getId());
        row.setKind(condition.getKind().name());
        row.setKindLabel(kindLabel(condition));
        row.setLabel(condition.getLabel());
        row.setSeverity(condition.getSeverity().name());
        row.setSeverityLabel(severityLabel(condition.getSeverity()));
        row.setDescription(condition.getDescription());
        row.setActionToTake(condition.getActionToTake());
        row.setMedication(condition.getMedication());
        row.setSelfCarried(condition.isSelfCarried());
        row.setDeclaredOn(condition.getDeclaredOn());
        row.setResolvedOn(condition.getResolvedOn());
        row.setActive(condition.isActive());
        row.setAlert(condition.isAlert());
        return row;
    }

    private InfirmaryVisitResponse toVisit(InfirmaryVisit visit,
                                           Map<UUID, Enrollment> enrollments) {
        Student student = visit.getStudent();
        InfirmaryVisitResponse row = new InfirmaryVisitResponse();
        row.setId(visit.getId());
        row.setStudentId(student.getId());
        row.setStudentNumber(student.getStudentNumber());
        row.setStudentName(student.fullName());
        row.setClassroomName(visit.getClassroom() != null
                ? visit.getClassroom().getName()
                : classroomNameOf(student.getId(), enrollments));
        row.setOccurredAt(visit.getOccurredAt());
        row.setComplaint(visit.getComplaint());
        row.setCareGiven(visit.getCareGiven());
        row.setTemperatureCelsius(visit.getTemperatureCelsius());
        row.setOutcome(visit.getOutcome().name());
        row.setOutcomeLabel(outcomeLabel(visit));
        row.setNotes(visit.getNotes());
        row.setGuardianNotifiedAt(visit.getGuardianNotifiedAt());
        row.setReferredTo(visit.getReferredTo());
        row.setAwaitingGuardian(visit.getOutcome().requiresGuardian()
                && !visit.isGuardianNotified());
        return row;
    }

    private VaccinationResponse toVaccination(StudentVaccination vaccination) {
        Vaccine vaccine = vaccination.getVaccine();
        VaccinationResponse row = new VaccinationResponse();
        row.setId(vaccination.getId());
        row.setVaccineId(vaccine.getId());
        row.setVaccineCode(vaccine.getCode());
        row.setVaccineLabel(vaccine.getLabel());
        row.setRequired(vaccine.isRequired());
        row.setDosesExpected(vaccine.getDosesExpected());
        row.setDosesReceived(vaccination.getDosesReceived());
        row.setLastDoseOn(vaccination.getLastDoseOn());
        row.setNextDoseDueOn(vaccination.getNextDoseDueOn());
        row.setCertificateSeen(vaccination.isCertificateSeen());
        row.setNotes(vaccination.getNotes());
        // La regle vit sur l'entite : une seconde copie ici serait une seconde
        // chose a corriger le jour ou elle change.
        row.setComplete(vaccination.isComplete());
        row.setOutstanding(vaccination.isOutstanding());
        return row;
    }

    private ExaminationResponse toExamination(MedicalExamination examination,
                                              Map<UUID, Enrollment> enrollments,
                                              LocalDate today) {
        Student student = examination.getStudent();
        ExaminationResponse row = new ExaminationResponse();
        row.setId(examination.getId());
        row.setStudentId(student.getId());
        row.setStudentNumber(student.getStudentNumber());
        row.setStudentName(student.fullName());
        row.setClassroomName(classroomNameOf(student.getId(), enrollments));
        row.setKind(examination.getKind().name());
        row.setKindLabel(examinationLabel(examination));
        row.setScheduledOn(examination.getScheduledOn());
        row.setPerformedOn(examination.getPerformedOn());
        row.setOutcome(examination.getOutcome().name());
        row.setOutcomeLabel(examinationOutcomeLabel(examination));
        row.setRestriction(examination.getRestriction());
        row.setPractitioner(examination.getPractitioner());
        row.setNotes(examination.getNotes());
        row.setOverdue(examination.isOverdue(today));
        return row;
    }

    // ------------------------------------------------------------- labels

    private String severityLabel(HealthSeverity severity) {
        return switch (severity) {
            case LOW -> "Pour information";
            case MODERATE -> "À connaître";
            case HIGH -> "Alerte";
            case CRITICAL -> "Alerte vitale";
        };
    }

    private String kindLabel(HealthCondition condition) {
        return switch (condition.getKind()) {
            case ALLERGY -> "Allergie";
            case CHRONIC_ILLNESS -> "Maladie chronique";
            case TREATMENT -> "Traitement en cours";
            case DISABILITY -> "Situation de handicap";
            case DIETARY -> "Régime alimentaire";
            case OTHER -> "Autre";
        };
    }

    private String outcomeLabel(InfirmaryVisit visit) {
        return switch (visit.getOutcome()) {
            case BACK_TO_CLASS -> "Reparti en cours";
            case RESTED -> "Gardé en observation";
            case SENT_HOME -> "Confié à la famille";
            case REFERRED -> "Orienté vers un centre de santé";
            case EMERGENCY -> "Évacuation en urgence";
        };
    }

    private String examinationLabel(MedicalExamination examination) {
        return switch (examination.getKind()) {
            case ENTRY -> "Visite d'admission";
            case ANNUAL -> "Visite annuelle";
            case SPORT -> "Aptitude au sport";
            case VISION -> "Dépistage visuel";
            case HEARING -> "Dépistage auditif";
            case DENTAL -> "Dépistage dentaire";
        };
    }

    private String examinationOutcomeLabel(MedicalExamination examination) {
        return switch (examination.getOutcome()) {
            case PENDING -> "À passer";
            case FIT -> "Apte";
            case FIT_WITH_RESERVE -> "Apte avec réserve";
            case UNFIT -> "Inapte";
            case REFERRED -> "Orienté vers un spécialiste";
            case MISSED -> "Non présenté";
        };
    }

    private int rank(String severity) {
        return HealthSeverity.valueOf(severity).ordinal();
    }

    // ------------------------------------------------------------ plumbing

    private Map<UUID, Enrollment> enrollmentsByStudent(UUID yearId) {
        Map<UUID, Enrollment> byStudent = new HashMap<>();
        for (Enrollment enrollment : enrollmentRepository.findActiveByYear(yearId)) {
            byStudent.put(enrollment.getStudent().getId(), enrollment);
        }
        return byStudent;
    }

    private Map<UUID, List<StudentVaccination>> vaccinationsByRecord(UUID yearId) {
        Map<UUID, List<StudentVaccination>> byRecord = new HashMap<>();
        for (StudentVaccination vaccination : vaccinationRepository.findForYear(yearId)) {
            byRecord.computeIfAbsent(vaccination.getHealthRecord().getId(),
                    (key) -> new ArrayList<>()).add(vaccination);
        }
        return byRecord;
    }

    private String classroomNameOf(UUID studentId, Map<UUID, Enrollment> enrollments) {
        Enrollment enrollment = enrollments.get(studentId);
        return enrollment != null && enrollment.getClassroom() != null
                ? enrollment.getClassroom().getName() : "";
    }

    private HealthCondition requireCondition(UUID conditionId) {
        return conditionRepository.findById(conditionId)
                .orElseThrow(() -> new BusinessException(ErrorCode.HEALTH_CONDITION_NOT_FOUND));
    }

    private Student requireStudent(UUID studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.STUDENT_NOT_FOUND));
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

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
