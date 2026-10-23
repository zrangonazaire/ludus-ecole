package ci.company.eduops.school.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.Normalizer;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.curriculum.domain.Curriculum;
import ci.company.eduops.curriculum.domain.CurriculumSubject;
import ci.company.eduops.curriculum.repository.CurriculumRepository;
import ci.company.eduops.curriculum.repository.CurriculumSubjectRepository;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.cycle.repository.CycleRepository;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentKind;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.FeeRecurrence;
import ci.company.eduops.finance.domain.FeeSchedule;
import ci.company.eduops.finance.domain.FeeScheduleInstalment;
import ci.company.eduops.finance.domain.FeeType;
import ci.company.eduops.finance.repository.FeeScheduleRepository;
import ci.company.eduops.finance.repository.FeeTypeRepository;
import ci.company.eduops.finance.service.StudentFeeGenerationService;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.domain.GuardianRelationship;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.dto.request.SignupOperationsRequest;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;

/**
 * Turns the walkthrough answers into a school that is actually configured.
 *
 * <p>Before this existed, someone spent four steps describing their cycles,
 * levels, classes, subjects and fees, and arrived on a dashboard announcing
 * « 1 étape sur 10 terminée ». The draft never left the browser: nothing in
 * the signup request carried it. Asking for work and then discarding it is
 * worse than never asking.</p>
 *
 * <h2>The draft is not trusted</h2>
 *
 * <p>It comes from the browser's session storage, which anyone can edit from a
 * console. Bounds are declared on the request and enforced again here, and
 * anything malformed is skipped rather than refused: a stray level name must
 * not cost someone their account creation. What matters is that the school
 * exists and the administrator can sign in — the configuration is a bonus,
 * and it stays a bonus even when it goes wrong.</p>
 *
 * <p>Runs inside the caller's transaction ({@code MANDATORY}). If provisioning
 * fails halfway, the school is rolled back with it: half a configuration is
 * harder to repair than none, because nobody can tell what is missing.</p>
 */
@Service
public class SignupProvisioningService {

    private static final Logger log =
            LoggerFactory.getLogger(SignupProvisioningService.class);

    /** Garde-fous, redits ici : la requete peut avoir ete forgee. */
    private static final int MAX_CYCLES = 10;
    private static final int MAX_LEVELS_PER_CYCLE = 20;
    private static final int MAX_CLASSES_PER_LEVEL = 20;
    private static final int MAX_SUBJECTS = 40;
    private static final int MAX_CAPACITY = 200;

    private final CycleRepository cycleRepository;
    private final LevelRepository levelRepository;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final CurriculumRepository curriculumRepository;
    private final CurriculumSubjectRepository curriculumSubjectRepository;
    private final StudentRepository studentRepository;
    private final GuardianRepository guardianRepository;
    private final StudentGuardianRepository studentGuardianRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final FeeTypeRepository feeTypeRepository;
    private final FeeScheduleRepository feeScheduleRepository;
    private final StudentFeeGenerationService studentFeeGenerationService;

    public SignupProvisioningService(CycleRepository cycleRepository,
                                     LevelRepository levelRepository,
                                     ClassroomRepository classroomRepository,
                                     SubjectRepository subjectRepository,
                                     CurriculumRepository curriculumRepository,
                                     CurriculumSubjectRepository curriculumSubjectRepository,
                                     StudentRepository studentRepository,
                                     GuardianRepository guardianRepository,
                                     StudentGuardianRepository studentGuardianRepository,
                                     EnrollmentRepository enrollmentRepository,
                                     FeeTypeRepository feeTypeRepository,
                                     FeeScheduleRepository feeScheduleRepository,
                                     StudentFeeGenerationService studentFeeGenerationService) {
        this.cycleRepository = cycleRepository;
        this.levelRepository = levelRepository;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.curriculumRepository = curriculumRepository;
        this.curriculumSubjectRepository = curriculumSubjectRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.feeTypeRepository = feeTypeRepository;
        this.feeScheduleRepository = feeScheduleRepository;
        this.studentFeeGenerationService = studentFeeGenerationService;
    }

    /** What was actually created, for the log and the response. */
    public static class Provisioned {

        private int cycles;
        private int levels;
        private int classrooms;
        private int subjects;
        private int curricula;
        private int students;
        private int guardians;
        private int enrollments;
        private int feeSchedules;

        public int getCycles() {
            return cycles;
        }

        public int getLevels() {
            return levels;
        }

        public int getClassrooms() {
            return classrooms;
        }

        public int getSubjects() {
            return subjects;
        }

        public int getCurricula() { return curricula; }
        public int getStudents() { return students; }
        public int getGuardians() { return guardians; }
        public int getEnrollments() { return enrollments; }
        public int getFeeSchedules() { return feeSchedules; }

        public boolean isEmpty() {
            return cycles == 0 && levels == 0 && classrooms == 0 && subjects == 0
                    && students == 0 && enrollments == 0;
        }
    }

    /**
     * Creates the structure described by the walkthrough.
     *
     * @param operations the draft, possibly null when the visitor skipped it
     */
    @Transactional(propagation = Propagation.MANDATORY)
    public Provisioned provision(School school, Campus campus, AcademicYear year,
                                 SignupOperationsRequest operations) {
        Provisioned done = new Provisioned();
        if (operations == null) {
            return done;
        }

        int capacity = clamp(operations.getClassCapacity(), 1, MAX_CAPACITY, 35);
        int classesPerLevel = clamp(operations.getClassesPerLevel(), 0,
                MAX_CLASSES_PER_LEVEL, 1);

        List<Level> createdLevels = new ArrayList<>();
        List<Classroom> createdClassrooms = new ArrayList<>();
        Map<String, Cycle> cyclesByCode = new java.util.HashMap<>();
        int cycleSequence = 1;
        // Les codes sont uniques par ecole : deux cycles nommes « Primaire »
        // se battraient pour le meme code et le second echouerait.
        Set<String> usedCycleCodes = new LinkedHashSet<>();

        for (SignupOperationsRequest.CycleSpec spec : take(operations.getCycles(), MAX_CYCLES)) {
            String name = clean(spec.getName() != null ? spec.getName() : spec.getCode());
            if (name == null) {
                continue;
            }
            Cycle cycle = new Cycle();
            cycle.setSchool(school);
            cycle.setName(name);
            cycle.setCode(uniqueCode(spec.getCode() != null ? spec.getCode() : name,
                    usedCycleCodes, 40));
            cycle.setSequence(cycleSequence++);
            cycle.setStatus(CommonStatus.ACTIVE);
            Cycle savedCycle = cycleRepository.save(cycle);
            cyclesByCode.put(savedCycle.getCode(), savedCycle);
            done.cycles++;

            int levelSequence = 1;
            Set<String> usedLevelCodes = new LinkedHashSet<>();
            List<String> levelNames = take(spec.getLevels(), MAX_LEVELS_PER_CYCLE);
            for (int index = 0; index < levelNames.size(); index++) {
                String levelName = clean(levelNames.get(index));
                if (levelName == null) {
                    continue;
                }
                Level level = new Level();
                level.setCycle(savedCycle);
                level.setName(levelName);
                level.setShortName(shorten(levelName));
                level.setCode(uniqueCode(levelName, usedLevelCodes, 40));
                level.setSequence(levelSequence++);
                // Le dernier niveau du cycle est terminal : c'est lui qui
                // ferme le passage automatique en fin d'annee.
                level.setTerminal(index == levelNames.size() - 1);
                level.setStatus(CommonStatus.ACTIVE);
                createdLevels.add(levelRepository.save(level));
                done.levels++;
            }
        }

        for (Level level : createdLevels) {
            for (int number = 1; number <= classesPerLevel; number++) {
                Classroom classroom = new Classroom();
                classroom.setCampus(campus);
                classroom.setAcademicYear(year);
                classroom.setLevel(level);
                // « 6ème A », « 6ème B » : la lettre suit l'usage des ecoles,
                // et se lit mieux qu'un numero sur une liste d'appel.
                String suffix = classesPerLevel > 1
                        ? " " + (char) ('A' + number - 1) : "";
                classroom.setName(level.getName() + suffix);
                classroom.setCode(level.getCode() + (classesPerLevel > 1
                        ? "-" + (char) ('A' + number - 1) : ""));
                classroom.setCapacityMaximum(capacity);
                classroom.setStatus(ClassroomStatus.ACTIVE);
                createdClassrooms.add(classroomRepository.save(classroom));
                done.classrooms++;
            }
        }

        Set<String> usedSubjectCodes = new LinkedHashSet<>();
        Map<String, List<Subject>> subjectsByCycle = new java.util.HashMap<>();
        for (SignupOperationsRequest.SubjectSpec spec
                : take(operations.getSubjects(), MAX_SUBJECTS)) {
            String name = clean(spec.getName() != null ? spec.getName() : spec.getCode());
            if (name == null) {
                continue;
            }
            Subject subject = new Subject();
            subject.setSchool(school);
            subject.setName(name);
            subject.setShortName(shorten(name));
            subject.setCode(uniqueCode(spec.getCode() != null ? spec.getCode() : name,
                    usedSubjectCodes, 40));
            subject.setStatus(CommonStatus.ACTIVE);
            Subject savedSubject = subjectRepository.save(subject);
            String cycleCode = clean(spec.getCycleCode());
            if (cycleCode == null) {
                for (String code : cyclesByCode.keySet()) {
                    subjectsByCycle.computeIfAbsent(code, ignored -> new ArrayList<>()).add(savedSubject);
                }
            } else if (cyclesByCode.containsKey(cycleCode)) {
                subjectsByCycle.computeIfAbsent(cycleCode, ignored -> new ArrayList<>()).add(savedSubject);
            }
            done.subjects++;
        }

        for (Level level : createdLevels) {
            List<Subject> cycleSubjects = subjectsByCycle.getOrDefault(
                    level.getCycle().getCode(), List.of());
            if (cycleSubjects.isEmpty()) continue;
            Curriculum curriculum = new Curriculum();
            curriculum.setAcademicYear(year);
            curriculum.setCycle(level.getCycle());
            curriculum.setLevel(level);
            curriculum.setCode(level.getCode() + "-" + year.getCode());
            curriculum.setLabel("Programme " + level.getName() + " — " + year.getCode());
            curriculum.setStatus(CommonStatus.ACTIVE);
            curriculum = curriculumRepository.save(curriculum);
            int order = 1;
            for (Subject subject : cycleSubjects) {
                CurriculumSubject row = new CurriculumSubject();
                row.setCurriculum(curriculum);
                row.setSubject(subject);
                row.setCoefficient(BigDecimal.valueOf(coefficientFor(operations, subject)));
                row.setWeeklyHours(new BigDecimal("2.00"));
                row.setMandatory(true);
                row.setDisplayOrder(order++);
                curriculumSubjectRepository.save(row);
            }
            done.curricula++;
        }

        SignupOperationsRequest.FeesSpec fees = operations.getFees();
        if (fees != null) {
            FeeType registration = fees.getRegistration() > 0
                    ? feeType(school, "INSCRIPTION", "Frais d'inscription", "REGISTRATION",
                            FeeRecurrence.ONE_TIME) : null;
            FeeType tuition = fees.getTuitionTotal() > 0
                    ? feeType(school, "SCOLARITE", "Scolarité", "TUITION",
                            FeeRecurrence.ANNUAL) : null;
            for (Level level : createdLevels) {
                if (registration != null) {
                    createSchedule(year, registration, level, "Inscription — " + level.getName(),
                            BigDecimal.valueOf(fees.getRegistration()), 1, fees.getCurrency());
                    done.feeSchedules++;
                }
                if (tuition != null) {
                    createSchedule(year, tuition, level, "Scolarité — " + level.getName(),
                            BigDecimal.valueOf(fees.getTuitionTotal()), fees.getInstalments(),
                            fees.getCurrency());
                    done.feeSchedules++;
                }
            }
        }

        seedDemoStudents(school, year, createdClassrooms, done);

        log.info("Provisioned school {}: {} cycle(s), {} niveau(x), {} classe(s), {} matière(s), "
                        + "{} programme(s), {} élève(s), {} inscription(s), {} barème(s)",
                school.getCode(), done.cycles, done.levels, done.classrooms, done.subjects,
                done.curricula, done.students, done.enrollments, done.feeSchedules);
        return done;
    }

    private int coefficientFor(SignupOperationsRequest operations, Subject subject) {
        return take(operations.getSubjects(), MAX_SUBJECTS).stream()
                .filter(spec -> subject.getName().equals(clean(spec.getName())))
                .mapToInt(SignupOperationsRequest.SubjectSpec::getCoefficient)
                .findFirst().orElse(1);
    }

    private FeeType feeType(School school, String code, String name, String category,
                            FeeRecurrence recurrence) {
        return feeTypeRepository.findBySchoolIdAndCode(school.getId(), code).orElseGet(() -> {
            FeeType type = new FeeType();
            type.setSchool(school);
            type.setCode(code);
            type.setName(name);
            type.setCategory(category);
            type.setRecurrence(recurrence);
            type.setMandatory(true);
            type.setStatus(CommonStatus.ACTIVE);
            return feeTypeRepository.save(type);
        });
    }

    private void createSchedule(AcademicYear year, FeeType type, Level level,
                                String label, BigDecimal total, int count, String currency) {
        FeeSchedule schedule = new FeeSchedule();
        schedule.setAcademicYear(year);
        schedule.setFeeType(type);
        schedule.setLevel(level);
        schedule.setLabel(label);
        schedule.setTotalAmount(total);
        schedule.setCurrency(currency == null || currency.isBlank() ? "XOF" : currency);
        schedule.setStatus(CommonStatus.ACTIVE);
        int instalmentCount = Math.max(1, Math.min(count, 12));
        BigDecimal each = total.divide(BigDecimal.valueOf(instalmentCount), 0, RoundingMode.DOWN);
        BigDecimal remainder = total.subtract(each.multiply(BigDecimal.valueOf(instalmentCount)));
        LocalDate start = year.getStartDate() == null ? LocalDate.now() : year.getStartDate();
        for (int i = 0; i < instalmentCount; i++) {
            FeeScheduleInstalment instalment = new FeeScheduleInstalment();
            instalment.setSequence(i + 1);
            instalment.setLabel(instalmentCount == 1 ? "Paiement unique"
                    : "Tranche " + (i + 1) + " sur " + instalmentCount);
            instalment.setAmount(i == 0 ? each.add(remainder) : each);
            instalment.setDueDate(start.plusMonths(i * 3L));
            instalment.setGraceDays(0);
            schedule.addInstalment(instalment);
        }
        feeScheduleRepository.save(schedule);
    }

    private void seedDemoStudents(School school, AcademicYear year,
                                  List<Classroom> classrooms, Provisioned done) {
        String[][] names = {
                {"Aïssata", "Kouassi", "F"}, {"Koffi", "Yao", "M"},
                {"Mariam", "Koné", "F"}, {"Ibrahim", "Traoré", "M"}
        };
        String[] guardianFirstNames = {"Aminata", "Jean", "Fatou", "Moussa"};
        int index = 0;
        for (Classroom classroom : classrooms) {
            for (int sample = 0; sample < 4 && sample < classroom.getCapacityMaximum(); sample++) {
                int demoSequence = ++index;
                String[] identity = names[sample];
                Student student = new Student();
                student.setSchool(school);
                // La séquence habituelle fait un UPSERT SQL avant le flush de
                // l'école par Hibernate ; sa FK échoue dans la transaction
                // d'inscription. Les matricules de démo restent déterministes
                // et propres à cette école sans toucher à number_sequence.
                student.setStudentNumber(school.getCode() + "-DEMO-"
                        + String.format("%06d", demoSequence));
                student.setFirstName(identity[0]);
                student.setLastName(identity[1]);
                student.setGender("F".equals(identity[2]) ? Gender.FEMALE : Gender.MALE);
                student.setBirthDate(LocalDate.now().minusYears(6 + classroom.getLevel().getSequence())
                        .minusMonths(sample));
                student.setBirthPlace(school.getCity());
                student.setNationality("Ivoirienne");
                student.setCity(school.getCity());
                student.setAdmissionDate(LocalDate.now());
                student.setStatus(StudentStatus.ADMITTED);
                student = studentRepository.save(student);
                done.students++;

                Guardian guardian = new Guardian();
                guardian.setSchool(school);
                guardian.setFirstName(guardianFirstNames[sample]);
                guardian.setLastName(identity[1]);
                guardian.setPhone("+225070000" + String.format("%04d", demoSequence));
                guardian.setCity(school.getCity());
                guardian = guardianRepository.save(guardian);
                done.guardians++;
                StudentGuardian link = new StudentGuardian();
                link.setStudent(student);
                link.setGuardian(guardian);
                link.setRelationship("F".equals(identity[2])
                        ? GuardianRelationship.MOTHER : GuardianRelationship.FATHER);
                link.setPrimary(true);
                link.setFinancialResponsibility(true);
                link.setReceivesFinancialNotifications(true);
                studentGuardianRepository.save(link);

                Enrollment enrollment = new Enrollment();
                enrollment.setStudent(student);
                enrollment.setAcademicYear(year);
                enrollment.setClassroom(classroom);
                enrollment.setEnrollmentKind(EnrollmentKind.NEW);
                enrollment.setEnrollmentDate(LocalDate.now());
                enrollment.setEnrollmentNumber(school.getCode() + "-DEMO-"
                        + String.format("%06d", demoSequence));
                enrollment.setNotes("Élève synthétique créé pour la démonstration.");
                enrollment.changeStatus(EnrollmentStatus.PENDING);
                enrollment.validate(null);
                enrollment.activate();
                enrollmentRepository.save(enrollment);
                student.changeStatus(StudentStatus.ACTIVE);
                studentRepository.save(student);
                studentFeeGenerationService.generateForEnrollment(enrollment);
                done.enrollments++;
            }
        }
    }

    // ------------------------------------------------------------- outils

    private <T> List<T> take(List<T> source, int max) {
        if (source == null) {
            return List.of();
        }
        return source.size() <= max ? source : source.subList(0, max);
    }

    private int clamp(int value, int min, int max, int fallback) {
        if (value < min || value > max) {
            return Math.max(min, Math.min(max, fallback));
        }
        return value;
    }

    private String clean(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    /** A short display name: « Cours Moyen 2 » becomes « CM2 » when it can. */
    private String shorten(String name) {
        String trimmed = name.trim();
        if (trimmed.length() <= 12) {
            return trimmed;
        }
        StringBuilder initials = new StringBuilder();
        for (String word : trimmed.split("\\s+")) {
            if (!word.isEmpty()) {
                initials.append(Character.toUpperCase(word.charAt(0)));
            }
        }
        return initials.length() >= 2 ? initials.toString() : trimmed.substring(0, 12);
    }

    /**
     * A code that is stable, printable and not already taken.
     *
     * <p>Accents are stripped rather than kept: a code travels into file names,
     * URLs and exported spreadsheets, and « 6ème » becomes unreadable in half
     * of them.</p>
     */
    private String uniqueCode(String source, Set<String> used, int maxLength) {
        String base = Normalizer.normalize(source.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toUpperCase(Locale.ROOT)
                .replaceAll("[^A-Z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
        if (base.isEmpty()) {
            base = "CODE";
        }
        if (base.length() > maxLength) {
            base = base.substring(0, maxLength);
        }
        String candidate = base;
        int suffix = 2;
        while (!used.add(candidate)) {
            String tail = "-" + suffix++;
            int cut = Math.min(base.length(), maxLength - tail.length());
            candidate = base.substring(0, Math.max(1, cut)) + tail;
        }
        return candidate;
    }
}
