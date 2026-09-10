package ci.company.eduops.attendance.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.attendance.domain.AttendanceSession;
import ci.company.eduops.attendance.domain.AttendanceSessionStatus;
import ci.company.eduops.attendance.domain.AttendanceStatus;
import ci.company.eduops.attendance.domain.StudentAttendance;
import ci.company.eduops.attendance.dto.request.AbsenceFilter;
import ci.company.eduops.attendance.dto.request.AttendanceJustifyRequest;
import ci.company.eduops.attendance.dto.request.AttendanceRecordRequest;
import ci.company.eduops.attendance.dto.request.AttendanceSheetSubmitRequest;
import ci.company.eduops.attendance.dto.response.AbsenceDigestResponse;
import ci.company.eduops.attendance.dto.response.AbsenceResponse;
import ci.company.eduops.attendance.dto.response.AttendanceDayResponse;
import ci.company.eduops.attendance.dto.response.AttendanceRecordResponse;
import ci.company.eduops.attendance.dto.response.AttendanceSheetResponse;
import ci.company.eduops.attendance.dto.response.ClassroomAttendanceResponse;
import ci.company.eduops.attendance.repository.AttendanceSessionRepository;
import ci.company.eduops.attendance.repository.StudentAttendanceRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.DayOfWeekEnum;
import ci.company.eduops.common.event.DomainEventPublisher;
import ci.company.eduops.common.event.DomainEventType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import ci.company.eduops.timetable.domain.TimetableSlot;
import ci.company.eduops.timetable.repository.TimetableSlotRepository;
import ci.company.eduops.attendance.dto.response.LessonSlotResponse;
import ci.company.eduops.teacher.domain.Teacher;
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
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Attendance: taking the roll call, following the absences, filing the excuses.
 *
 * <p>Three operations that look separate and are not. A mark taken in the
 * morning becomes an absence to chase two days later, and a slip handed in at
 * the office turns that same mark into a justified one. They share this service
 * because they share one row in the database, and because the rules that matter
 * live between them rather than inside any one of them.</p>
 *
 * <p>Four refusals are enforced here rather than left to the screen:</p>
 * <ul>
 *   <li>No roll call on a future date. A sheet dated tomorrow is not a
 *       prediction, it is a mistake — usually a mistyped year — and it would
 *       sit in the register as fact.</li>
 *   <li>No lateness without an arrival time. "Late" with no hour cannot be
 *       measured, cannot be added up at the end of the term, and the database
 *       refuses it anyway; better to say so plainly than to fail obscurely.</li>
 *   <li>No mark for a pupil who is not enrolled in that class. The mark would
 *       be unreachable from the pupil's file and would quietly skew the class
 *       headcount.</li>
 *   <li>No writing on a locked sheet. Once the term is closed the register is
 *       what the report cards were computed from; it stays readable and stops
 *       being editable.</li>
 * </ul>
 *
 * <p>The counters carried by a sheet are recomputed from the marks on every
 * submit, never incremented. An incremented counter drifts the first time a
 * submit is replayed, and a register whose totals disagree with its own lines
 * is worse than no register at all.</p>
 */
@Service
public class AttendanceService {

    private static final Logger log = LoggerFactory.getLogger(AttendanceService.class);

    /**
     * Days an unjustified absence may wait before the family is chased.
     *
     * <p>Two, not one: a slip written the same evening arrives the next
     * morning, and calling before that annoys the families who did nothing
     * wrong. Beyond two days a justification that has not arrived generally
     * does not arrive on its own.</p>
     */
    private static final int FOLLOW_UP_AFTER_DAYS = 2;

    /** Unjustified absences over the window beyond which it stops being an incident. */
    private static final long REPEATED_ABSENCE_THRESHOLD = 3;

    private static final List<EnrollmentStatus> LIVE_ENROLLMENTS =
            List.of(EnrollmentStatus.VALIDATED, EnrollmentStatus.ACTIVE);

    private final AttendanceSessionRepository sessionRepository;
    private final StudentAttendanceRepository attendanceRepository;
    private final ClassroomRepository classroomRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AcademicYearRepository academicYearRepository;
    private final TermRepository termRepository;
    private final SubjectRepository subjectRepository;
    private final TimetableSlotRepository timetableSlotRepository;
    private final DomainEventPublisher eventPublisher;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public AttendanceService(AttendanceSessionRepository sessionRepository,
                             StudentAttendanceRepository attendanceRepository,
                             ClassroomRepository classroomRepository,
                             EnrollmentRepository enrollmentRepository,
                             AcademicYearRepository academicYearRepository,
                             TermRepository termRepository,
                             SubjectRepository subjectRepository,
                             TimetableSlotRepository timetableSlotRepository,
                             DomainEventPublisher eventPublisher,
                             AuditService auditService,
                             CurrentUser currentUser) {
        this.sessionRepository = sessionRepository;
        this.attendanceRepository = attendanceRepository;
        this.classroomRepository = classroomRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.academicYearRepository = academicYearRepository;
        this.termRepository = termRepository;
        this.subjectRepository = subjectRepository;
        this.timetableSlotRepository = timetableSlotRepository;
        this.eventPublisher = eventPublisher;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // ------------------------------------------------------------- the day

    /**
     * Every active class for one day, called or not.
     *
     * <p>Classes with no sheet are listed first in the screen's own ordering,
     * because they are the point: the register is only trustworthy once none
     * are left.</p>
     */
    @Transactional(readOnly = true)
    public AttendanceDayResponse day(LocalDate date, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        LocalDate when = date != null ? date : LocalDate.now();
        requireNotInFuture(when);

        List<Classroom> classrooms = new ArrayList<>(
                classroomRepository.findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE));
        classrooms.sort(Comparator
                .comparingInt((Classroom c) -> c.getLevel() != null ? c.getLevel().getSequence() : 0)
                .thenComparing(Classroom::getName, Comparator.nullsLast(String::compareTo)));

        Map<UUID, Integer> headcount = headcountByClassroom(year.getId());

        // One query for the whole day: asking class by class would return
        // nothing for the classes that have no sheet, which are the ones the
        // screen has to name.
        Map<UUID, AttendanceSession> registers = new HashMap<>();
        for (AttendanceSession session : sessionRepository.findByYearAndDate(year.getId(), when)) {
            if (session.getSubject() == null && session.getStartTime() == null) {
                registers.put(session.getClassroom().getId(), session);
            }
        }

        AttendanceDayResponse response = new AttendanceDayResponse();
        response.setDate(when);
        response.setAcademicYearId(year.getId());
        termRepository.findCoveringDate(year.getId(), when).ifPresent((term) -> {
            response.setTermId(term.getId());
            response.setTermName(term.getName());
        });

        int expectedCalled = 0;
        int present = 0;
        int absent = 0;
        int late = 0;
        int done = 0;

        List<ClassroomAttendanceResponse> lines = new ArrayList<>();
        for (Classroom classroom : classrooms) {
            ClassroomAttendanceResponse line = new ClassroomAttendanceResponse();
            line.setClassroomId(classroom.getId());
            line.setClassroomName(classroom.getName());
            line.setLevelName(classroom.getLevel() != null ? classroom.getLevel().getName() : null);
            Teacher mainTeacher = classroom.getMainTeacher();
            line.setMainTeacherName(mainTeacher != null ? mainTeacher.fullName() : null);
            line.setExpectedCount(headcount.getOrDefault(classroom.getId(), 0));

            AttendanceSession session = registers.get(classroom.getId());
            if (session != null) {
                line.setSheetId(session.getId());
                line.setStatus(session.getStatus());
                line.setStatusLabel(labelOf(session.getStatus()));
                line.setPresentCount(session.getPresentCount());
                line.setAbsentCount(session.getAbsentCount());
                line.setLateCount(session.getLateCount());
                line.setSubmittedAt(session.getSubmittedAt());
                line.setDone(session.getStatus() != AttendanceSessionStatus.OPEN);

                if (line.isDone()) {
                    done++;
                    expectedCalled += session.getExpectedCount();
                    present += session.getPresentCount();
                    absent += session.getAbsentCount();
                    late += session.getLateCount();
                }
            }
            lines.add(line);
        }

        response.setClassrooms(lines);
        response.setClassroomCount(classrooms.size());
        response.setSheetsDone(done);
        response.setExpectedCount(expectedCalled);
        response.setPresentCount(present);
        response.setAbsentCount(absent);
        response.setLateCount(late);
        // A late pupil is a pupil who came. Counting them absent would make the
        // rate say something the register does not.
        response.setAttendanceRate(rate(present + late, expectedCalled));
        return response;
    }

    // --------------------------------------------------- the day's lessons

    /**
     * Les cours d'une classe pour ce jour-là, avec l'état de leur appel.
     *
     * <p>Vient de l'emploi du temps. Une école primaire n'en a pas — un maître,
     * une classe, la journée entière — et reçoit donc une liste vide : l'écran
     * lui laisse alors l'appel de la journée, sans lui imposer de choisir une
     * matière qui n'a pas de sens chez elle.</p>
     *
     * <p>Au collège et au lycée, c'est l'inverse qui compte : un élève présent
     * le matin et parti après la récréation est compté présent toute la journée
     * tant qu'on ne fait qu'un appel quotidien, et rien ne révèle qu'il manque
     * systématiquement le même cours.</p>
     */
    @Transactional(readOnly = true)
    public List<LessonSlotResponse> lessons(UUID classroomId, LocalDate date,
                                            UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        LocalDate when = date == null ? LocalDate.now() : date;
        DayOfWeekEnum day = DayOfWeekEnum.valueOf(when.getDayOfWeek().name());

        List<LessonSlotResponse> lessons = new ArrayList<>();
        for (TimetableSlot slot
                : timetableSlotRepository.findGridByClassroom(classroomId, year.getId())) {
            if (slot.getDayOfWeek() != day) {
                continue;
            }
            lessons.add(describeLesson(slot, classroomId, when));
        }
        return lessons;
    }

    private LessonSlotResponse describeLesson(TimetableSlot slot, UUID classroomId,
                                              LocalDate when) {
        LessonSlotResponse lesson = new LessonSlotResponse();
        lesson.setSubjectId(slot.getSubject().getId());
        lesson.setSubjectName(slot.getSubject().getName());
        lesson.setTeacherId(slot.getTeacher().getId());
        lesson.setTeacherName(slot.getTeacher().fullName());
        lesson.setStartTime(slot.getStartTime());
        lesson.setEndTime(slot.getEndTime());
        if (slot.getRoom() != null) {
            lesson.setRoomName(slot.getRoom().getName());
        }

        // L'appel de ce cours a-t-il deja ete fait ? Sans cette information,
        // un enseignant qui reprend la classe apres un collegue ne sait pas
        // s'il doit refaire l'appel, et le refait « au cas ou ».
        sessionRepository.findLessonSheet(classroomId, when, slot.getSubject().getId())
                .ifPresent(session -> {
                    lesson.setSheetStarted(true);
                    lesson.setDone(session.getStatus() != AttendanceSessionStatus.OPEN);
                    lesson.setAbsentCount(session.getAbsentCount());
                });
        return lesson;
    }

    // ----------------------------------------------------------- the sheet

    /**
     * Opens the sheet of one class, existing or blank.
     *
     * <p>A sheet that has never been submitted is built in memory and returned
     * with everyone present. Nothing is written: opening a class to look at it
     * must not record that its pupils were all there.</p>
     */
    @Transactional(readOnly = true)
    public AttendanceSheetResponse openSheet(UUID classroomId, LocalDate date,
                                             UUID subjectId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        LocalDate when = date != null ? date : LocalDate.now();
        requireNotInFuture(when);
        Classroom classroom = requireClassroom(classroomId);

        Optional<AttendanceSession> existing = findSheet(classroomId, when, subjectId);
        if (existing.isPresent()) {
            AttendanceSession session = existing.get();
            return toResponse(session, attendanceRepository.findByAttendanceSessionId(session.getId()));
        }

        List<Enrollment> enrollments = liveEnrollments(classroomId);
        AttendanceSheetResponse draft = new AttendanceSheetResponse();
        draft.setClassroomId(classroom.getId());
        draft.setClassroomName(classroom.getName());
        draft.setLevelName(classroom.getLevel() != null ? classroom.getLevel().getName() : null);
        draft.setSessionDate(when);
        draft.setStatus(AttendanceSessionStatus.OPEN);
        draft.setStatusLabel(labelOf(AttendanceSessionStatus.OPEN));
        draft.setEditable(true);
        draft.setExpectedCount(enrollments.size());
        draft.setPresentCount(enrollments.size());

        Teacher mainTeacher = classroom.getMainTeacher();
        if (mainTeacher != null) {
            draft.setTeacherId(mainTeacher.getId());
            draft.setTeacherName(mainTeacher.fullName());
        }
        if (subjectId != null) {
            subjectRepository.findById(subjectId).ifPresent((subject) -> {
                draft.setSubjectId(subject.getId());
                draft.setSubjectName(subject.getName());
            });
        }

        List<AttendanceRecordResponse> records = new ArrayList<>();
        for (Enrollment enrollment : enrollments) {
            Student student = enrollment.getStudent();
            AttendanceRecordResponse record = new AttendanceRecordResponse();
            record.setStudentId(student.getId());
            record.setStudentNumber(student.getStudentNumber());
            record.setStudentName(student.fullName());
            record.setPhotoUrl(student.getPhotoUrl());
            record.setStatus(AttendanceStatus.PRESENT);
            record.setStatusLabel(labelOf(AttendanceStatus.PRESENT));
            records.add(record);
        }
        records.sort(Comparator.comparing(AttendanceRecordResponse::getStudentName,
                Comparator.nullsLast(String::compareToIgnoreCase)));
        draft.setRecords(records);
        return draft;
    }

    /**
     * Records a whole sheet.
     *
     * <p>Replaying the same submit with the same idempotency key returns the
     * first sheet untouched. Attendance is taken on a phone in a corridor: the
     * network drops, the person taps again, and neither of them should end up
     * with two registers for the same morning.</p>
     */
    @Transactional
    public AttendanceSheetResponse submit(AttendanceSheetSubmitRequest request, UUID academicYearId) {
        if (request.getIdempotencyKey() != null && !request.getIdempotencyKey().isBlank()) {
            Optional<AttendanceSession> replayed =
                    sessionRepository.findByIdempotencyKey(request.getIdempotencyKey());
            if (replayed.isPresent()) {
                AttendanceSession session = replayed.get();
                log.debug("Attendance submit replayed for sheet {}", session.getId());
                return toResponse(session,
                        attendanceRepository.findByAttendanceSessionId(session.getId()));
            }
        }

        AcademicYear year = resolveYear(academicYearId);
        LocalDate when = request.getSessionDate();
        requireNotInFuture(when);
        Classroom classroom = requireClassroom(request.getClassroomId());

        Teacher teacher = classroom.getMainTeacher();
        if (teacher == null) {
            throw new BusinessException(ErrorCode.TEACHER_NOT_FOUND,
                    "La classe " + classroom.getName() + " n'a pas de professeur principal. "
                            + "Une feuille d'appel est signée par quelqu'un : désignez-le "
                            + "sur la fiche de la classe avant de faire l'appel.");
        }

        AttendanceSession session = findSheet(request.getClassroomId(), when, request.getSubjectId())
                .orElseGet(AttendanceSession::new);
        if (session.getId() != null && !session.getStatus().isEditable()) {
            throw new BusinessException(ErrorCode.ATTENDANCE_SESSION_LOCKED,
                    "La feuille du " + when + " pour " + classroom.getName()
                            + " est verrouillée : elle reste consultable, mais les marques "
                            + "ne peuvent plus changer.");
        }

        Term term = termRepository.findCoveringDate(year.getId(), when).orElse(null);
        session.setClassroom(classroom);
        session.setAcademicYear(year);
        session.setTerm(term);
        session.setTeacher(teacher);
        session.setSessionDate(when);
        session.setStartTime(request.getStartTime());
        session.setEndTime(request.getEndTime());
        if (request.getSubjectId() != null) {
            session.setSubject(subjectRepository.findById(request.getSubjectId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.SUBJECT_NOT_FOUND)));
        }
        if (request.getIdempotencyKey() != null && !request.getIdempotencyKey().isBlank()) {
            session.setIdempotencyKey(request.getIdempotencyKey());
        }
        session = sessionRepository.save(session);

        Map<UUID, Enrollment> enrolled = new LinkedHashMap<>();
        for (Enrollment enrollment : liveEnrollments(classroom.getId())) {
            enrolled.put(enrollment.getStudent().getId(), enrollment);
        }

        Map<UUID, StudentAttendance> known = new HashMap<>();
        for (StudentAttendance existing : attendanceRepository.findByAttendanceSessionId(session.getId())) {
            known.put(existing.getStudent().getId(), existing);
        }

        UUID userId = currentUser.id().orElse(null);
        List<StudentAttendance> saved = new ArrayList<>();
        List<StudentAttendance> toNotify = new ArrayList<>();
        int absent = 0;
        int late = 0;

        for (AttendanceRecordRequest line : request.getRecords()) {
            Enrollment enrollment = enrolled.get(line.getStudentId());
            if (enrollment == null) {
                throw new BusinessException(ErrorCode.ATTENDANCE_STUDENT_NOT_IN_CLASS,
                        "Un élève de la feuille n'est pas inscrit dans " + classroom.getName()
                                + ". Rechargez la page : la composition de la classe a changé "
                                + "depuis l'ouverture de l'appel.");
            }
            AttendanceStatus status = line.getStatus();
            if (status.isLateness() && line.getArrivalTime() == null) {
                throw new BusinessException(ErrorCode.INVALID_ATTENDANCE,
                        "Un retard doit porter une heure d'arrivée : sans elle, il n'est ni "
                                + "mesurable ni cumulable en fin de période.");
            }

            StudentAttendance record = known.get(line.getStudentId());
            boolean isNew = record == null;
            if (isNew) {
                record = new StudentAttendance();
                record.setAttendanceSession(session);
                record.setStudent(enrollment.getStudent());
                record.setEnrollment(enrollment);
            }
            AttendanceStatus previous = record.getStatus();
            record.setClassroom(classroom);
            record.setAcademicYear(year);
            record.setTerm(term);
            record.setAttendanceDate(when);
            record.setStatus(status);
            record.setArrivalTime(line.getArrivalTime());
            record.setDepartureTime(line.getDepartureTime());
            record.setMinutesLate(line.getMinutesLate());
            record.setRecordedBy(userId);
            record.setRecordedAt(OffsetDateTime.now());

            // A justification already filed survives a corrected roll call. The
            // office does not have to chase the same slip twice because a
            // teacher reopened the sheet to fix somebody else's line.
            if (!record.isJustified()) {
                record.setReason(line.getReason());
            }

            if (status.isAbsence()) {
                absent++;
            } else if (status.isLateness()) {
                late++;
            }
            if (status.notifiesGuardian() && (isNew || previous != status)) {
                toNotify.add(record);
            }
            saved.add(attendanceRepository.save(record));
        }

        int expected = request.getRecords().size();
        session.setExpectedCount(expected);
        // Present is what is left: it absorbs LEFT_EARLY, so the four counters
        // always add up to the class in front of you.
        session.recomputeCounters(Math.max(0, expected - absent - late), absent, late);
        session.submit(userId);
        session = sessionRepository.save(session);

        for (StudentAttendance record : toNotify) {
            eventPublisher.event(DomainEventType.ABSENCE_RECORDED,
                            "StudentAttendance", record.getId())
                    .school(requireSchool())
                    .academicYear(year.getId())
                    .classroom(classroom.getId())
                    .student(record.getStudent().getId())
                    .with("studentName", record.getStudent().fullName())
                    .with("classroomName", classroom.getName())
                    .with("date", when.toString())
                    .with("status", record.getStatus().name())
                    .publish();
        }

        auditService.logValidate("AttendanceSession", session.getId(),
                classroom.getName() + " — " + when,
                absent + " absent(s), " + late + " retard(s) sur " + expected);

        log.info("Attendance recorded for {} on {}: {} present, {} absent, {} late",
                classroom.getName(), when, session.getPresentCount(), absent, late);
        return toResponse(session, saved);
    }

    // -------------------------------------------------------- follow-up

    /**
     * Absences and latenesses over a window.
     *
     * <p>The counters describe the whole window; only the list obeys the
     * filter. A filter that also moved the totals would let someone narrow the
     * view until the school looked fine.</p>
     */
    @Transactional(readOnly = true)
    public AbsenceDigestResponse absences(LocalDate from, LocalDate to, UUID classroomId,
                                          AbsenceFilter filter, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        LocalDate end = to != null ? to : LocalDate.now();
        LocalDate start = from != null ? from : end.minusDays(30);
        if (start.isAfter(end)) {
            throw new BusinessException(ErrorCode.INVALID_ATTENDANCE,
                    "La date de début est postérieure à la date de fin.");
        }

        List<StudentAttendance> incidents =
                attendanceRepository.findIncidents(year.getId(), start, end, classroomId);

        List<AbsenceResponse> all = new ArrayList<>();
        Set<UUID> students = new HashSet<>();
        int absences = 0;
        int latenesses = 0;
        int justified = 0;
        int unjustified = 0;
        int followUp = 0;

        for (StudentAttendance record : incidents) {
            AbsenceResponse line = toAbsence(record);
            all.add(line);
            students.add(record.getStudent().getId());
            if (record.getStatus().isAbsence()) {
                absences++;
            } else {
                latenesses++;
            }
            if (record.isJustified()) {
                justified++;
            } else {
                unjustified++;
                if (line.isNeedsFollowUp()) {
                    followUp++;
                }
            }
        }

        AbsenceDigestResponse digest = new AbsenceDigestResponse();
        digest.setFrom(start);
        digest.setTo(end);
        digest.setAbsenceCount(absences);
        digest.setLatenessCount(latenesses);
        digest.setJustifiedCount(justified);
        digest.setUnjustifiedCount(unjustified);
        digest.setFollowUpCount(followUp);
        digest.setStudentCount(students.size());
        digest.setRepeatedCount(attendanceRepository
                .findRepeatedAbsences(year.getId(), start, end, REPEATED_ABSENCE_THRESHOLD).size());

        Double computed = attendanceRepository.attendanceRate(year.getId(), start, end);
        digest.setAttendanceRate(computed == null
                ? null
                : BigDecimal.valueOf(computed).setScale(2, RoundingMode.HALF_UP));

        AbsenceFilter applied = filter != null ? filter : AbsenceFilter.ALL;
        digest.setEntries(all.stream().filter((line) -> matches(line, applied)).toList());
        return digest;
    }

    /**
     * Files the excuse brought by the family.
     *
     * <p>The mark becomes an excused one rather than disappearing. An absence
     * that vanishes once justified leaves a class council wondering why a pupil
     * missed a term's worth of lessons with a clean record.</p>
     */
    @Transactional
    public AbsenceResponse justify(UUID attendanceId, AttendanceJustifyRequest request) {
        StudentAttendance record = requireAttendance(attendanceId);
        AttendanceSession session = record.getAttendanceSession();
        if (session != null && !session.getStatus().isEditable()) {
            throw new BusinessException(ErrorCode.ATTENDANCE_SESSION_LOCKED,
                    "La feuille de cette journée est verrouillée : le justificatif ne peut "
                            + "plus y être rattaché.");
        }

        record.justify(currentUser.id().orElse(null), request.getDocumentUrl(), request.getReason());
        StudentAttendance saved = attendanceRepository.save(record);

        auditService.logUpdate("StudentAttendance", saved.getId(),
                saved.getStudent().fullName() + " — " + saved.getAttendanceDate(),
                Map.of("justified", false),
                Map.of("justified", true, "reason", request.getReason()));

        log.info("Absence {} justified for {}", saved.getId(), saved.getStudent().fullName());
        return toAbsence(saved);
    }

    /**
     * Records that the family has been chased about this absence.
     *
     * <p>Kept on the row rather than in a log so the follow-up list can tell
     * who still has to be called. Two people sharing the job would otherwise
     * ring the same family twice and miss the next one.</p>
     */
    @Transactional
    public AbsenceResponse notifyGuardian(UUID attendanceId) {
        StudentAttendance record = requireAttendance(attendanceId);
        if (record.isJustified()) {
            throw new BusinessException(ErrorCode.INVALID_ATTENDANCE,
                    "Cette absence est déjà justifiée : il n'y a plus rien à réclamer.");
        }
        record.setGuardianNotifiedAt(OffsetDateTime.now());
        StudentAttendance saved = attendanceRepository.save(record);

        eventPublisher.event(DomainEventType.ABSENCE_RECORDED, "StudentAttendance", saved.getId())
                .school(requireSchool())
                .academicYear(saved.getAcademicYear().getId())
                .classroom(saved.getClassroom().getId())
                .student(saved.getStudent().getId())
                .with("kind", "REMINDER")
                .with("studentName", saved.getStudent().fullName())
                .with("classroomName", saved.getClassroom().getName())
                .with("date", saved.getAttendanceDate().toString())
                .publish();

        log.info("Guardian reminder queued for absence {}", saved.getId());
        return toAbsence(saved);
    }

    // ------------------------------------------------------------ mapping

    private AttendanceSheetResponse toResponse(AttendanceSession session,
                                               List<StudentAttendance> records) {
        AttendanceSheetResponse response = new AttendanceSheetResponse();
        response.setId(session.getId());
        Classroom classroom = session.getClassroom();
        response.setClassroomId(classroom.getId());
        response.setClassroomName(classroom.getName());
        response.setLevelName(classroom.getLevel() != null ? classroom.getLevel().getName() : null);

        Subject subject = session.getSubject();
        if (subject != null) {
            response.setSubjectId(subject.getId());
            response.setSubjectName(subject.getName());
        }
        Teacher teacher = session.getTeacher();
        if (teacher != null) {
            response.setTeacherId(teacher.getId());
            response.setTeacherName(teacher.fullName());
        }

        response.setSessionDate(session.getSessionDate());
        response.setStartTime(session.getStartTime());
        response.setEndTime(session.getEndTime());
        response.setStatus(session.getStatus());
        response.setStatusLabel(labelOf(session.getStatus()));
        response.setExpectedCount(session.getExpectedCount());
        response.setPresentCount(session.getPresentCount());
        response.setAbsentCount(session.getAbsentCount());
        response.setLateCount(session.getLateCount());
        response.setSubmittedAt(session.getSubmittedAt());
        response.setEditable(session.getStatus().isEditable());

        List<AttendanceRecordResponse> lines = new ArrayList<>();
        for (StudentAttendance record : records) {
            Student student = record.getStudent();
            AttendanceRecordResponse line = new AttendanceRecordResponse();
            line.setId(record.getId());
            line.setStudentId(student.getId());
            line.setStudentNumber(student.getStudentNumber());
            line.setStudentName(student.fullName());
            line.setPhotoUrl(student.getPhotoUrl());
            line.setStatus(record.getStatus());
            line.setStatusLabel(labelOf(record.getStatus()));
            line.setArrivalTime(record.getArrivalTime());
            line.setDepartureTime(record.getDepartureTime());
            line.setMinutesLate(record.getMinutesLate());
            line.setReason(record.getReason());
            line.setJustified(record.isJustified());
            lines.add(line);
        }
        lines.sort(Comparator.comparing(AttendanceRecordResponse::getStudentName,
                Comparator.nullsLast(String::compareToIgnoreCase)));
        response.setRecords(lines);
        return response;
    }

    private AbsenceResponse toAbsence(StudentAttendance record) {
        AbsenceResponse line = new AbsenceResponse();
        line.setId(record.getId());
        Student student = record.getStudent();
        line.setStudentId(student.getId());
        line.setStudentNumber(student.getStudentNumber());
        line.setStudentName(student.fullName());
        line.setPhotoUrl(student.getPhotoUrl());
        Classroom classroom = record.getClassroom();
        line.setClassroomId(classroom.getId());
        line.setClassroomName(classroom.getName());
        line.setDate(record.getAttendanceDate());
        line.setStatus(record.getStatus());
        line.setStatusLabel(labelOf(record.getStatus()));
        line.setArrivalTime(record.getArrivalTime());
        line.setMinutesLate(record.getMinutesLate());
        line.setReason(record.getReason());
        line.setJustified(record.isJustified());
        line.setJustificationDocumentUrl(record.getJustificationDocumentUrl());
        line.setGuardianNotified(record.getGuardianNotifiedAt() != null);

        int waiting = (int) ChronoUnit.DAYS.between(record.getAttendanceDate(), LocalDate.now());
        line.setDaysWaiting(Math.max(0, waiting));
        line.setNeedsFollowUp(!record.isJustified()
                && record.getStatus() == AttendanceStatus.ABSENT
                && waiting >= FOLLOW_UP_AFTER_DAYS);
        return line;
    }

    private boolean matches(AbsenceResponse line, AbsenceFilter filter) {
        return switch (filter) {
            case ALL -> true;
            case UNJUSTIFIED -> !line.isJustified();
            case FOLLOW_UP -> line.isNeedsFollowUp();
            case JUSTIFIED -> line.isJustified();
            case LATENESS -> line.getStatus() == AttendanceStatus.LATE
                    || line.getStatus() == AttendanceStatus.EXCUSED_LATE;
        };
    }

    // ------------------------------------------------------------- labels

    /** French wording, decided once here rather than in each screen. */
    private String labelOf(AttendanceStatus status) {
        return switch (status) {
            case PRESENT -> "Présent";
            case ABSENT -> "Absent";
            case LATE -> "En retard";
            case EXCUSED_ABSENCE -> "Absence justifiée";
            case EXCUSED_LATE -> "Retard justifié";
            case LEFT_EARLY -> "Parti avant la fin";
        };
    }

    private String labelOf(AttendanceSessionStatus status) {
        return switch (status) {
            case OPEN -> "Appel en cours";
            case SUBMITTED -> "Appel fait";
            case VALIDATED -> "Appel validé";
            case LOCKED -> "Verrouillé";
        };
    }

    // ---------------------------------------------------------- internals

    private Optional<AttendanceSession> findSheet(UUID classroomId, LocalDate date, UUID subjectId) {
        if (subjectId == null) {
            return sessionRepository.findDailyRegister(classroomId, date);
        }
        return sessionRepository.findLessonSheet(classroomId, date, subjectId);
    }

    private List<Enrollment> liveEnrollments(UUID classroomId) {
        return enrollmentRepository.findByClassroomIdAndStatusIn(classroomId, LIVE_ENROLLMENTS);
    }

    private Map<UUID, Integer> headcountByClassroom(UUID academicYearId) {
        Map<UUID, Integer> counts = new HashMap<>();
        for (Object[] row : enrollmentRepository.countActiveByClassroom(academicYearId)) {
            if (row.length >= 2 && row[0] instanceof UUID classroomId && row[1] instanceof Number total) {
                counts.put(classroomId, total.intValue());
            }
        }
        return counts;
    }

    private BigDecimal rate(int attended, int expected) {
        if (expected <= 0) {
            return null;
        }
        return BigDecimal.valueOf(attended)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(expected), 2, RoundingMode.HALF_UP);
    }

    private void requireNotInFuture(LocalDate date) {
        if (date != null && date.isAfter(LocalDate.now())) {
            throw new BusinessException(ErrorCode.INVALID_ATTENDANCE,
                    "On ne fait pas l'appel d'un jour qui n'est pas encore arrivé. "
                            + "Vérifiez la date : c'est le plus souvent l'année qui est fausse.");
        }
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

    private StudentAttendance requireAttendance(UUID attendanceId) {
        StudentAttendance record = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ATTENDANCE_SESSION_NOT_FOUND,
                        "Cette absence n'existe pas ou a été supprimée."));
        UUID schoolId = requireSchool();
        if (record.getAcademicYear() == null
                || record.getAcademicYear().getSchool() == null
                || !schoolId.equals(record.getAcademicYear().getSchool().getId())) {
            throw new BusinessException(ErrorCode.ATTENDANCE_SESSION_NOT_FOUND);
        }
        return record;
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchool(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active : ouvrez-en une avant de faire l'appel."));
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
