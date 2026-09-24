package ci.company.eduops.school.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.cycle.repository.CycleRepository;
import ci.company.eduops.finance.domain.FeeRecurrence;
import ci.company.eduops.finance.service.FeeCategoryService;
import ci.company.eduops.finance.domain.FeeSchedule;
import ci.company.eduops.finance.domain.FeeScheduleInstalment;
import ci.company.eduops.finance.domain.FeeType;
import ci.company.eduops.finance.repository.FeeScheduleRepository;
import ci.company.eduops.finance.repository.FeeTypeRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.dto.request.OnboardingRequest;
import ci.company.eduops.school.dto.response.OnboardingResponse;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import java.util.UUID;

/**
 * The setup wizard, made real.
 *
 * <p>What the wizard used to do, in full:</p>
 *
 * <pre>
 * setTimeout(() =&gt; {
 *   this.notifications.success('7 niveaux, 14 classes … prêts');
 *   this.router.navigate(['/dashboard']);
 * }, 900);
 * </pre>
 *
 * <p>Nine hundred milliseconds of nothing, then a message announcing figures
 * that had been typed but never saved. The component did not inject a single
 * data source. That is the defect this class exists to close.</p>
 *
 * <h2>All of it, or none of it</h2>
 *
 * <p>One transaction. Ten calls from the browser would leave a school half
 * configured the day the eighth fails, and nobody — not the head teacher, not
 * the support desk — could say which half. Here the school is either
 * configured or untouched.</p>
 *
 * <h2>What it refuses, and what it merely skips</h2>
 *
 * <p>A duplicate level or an empty name is skipped and reported in
 * {@code skipped}: the school sees what to redo instead of starting over. But
 * running the wizard twice is refused outright — the second run would double
 * every class, and « 6ème A » twice over is a mess to unpick by hand.</p>
 */
@Service
public class OnboardingService {

    private static final Logger log = LoggerFactory.getLogger(OnboardingService.class);

    /** Le code du type de frais « inscription », créé au besoin. */
    private static final String REGISTRATION_CODE = "INSCRIPTION";
    /** Celui de la scolarité proprement dite. */
    private static final String TUITION_CODE = "SCOLARITE";

    private final CycleRepository cycleRepository;
    private final LevelRepository levelRepository;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final FeeTypeRepository feeTypeRepository;
    private final FeeScheduleRepository feeScheduleRepository;
    private final AcademicYearRepository academicYearRepository;
    private final SchoolRepository schoolRepository;
    private final CampusRepository campusRepository;
    private final FeeCategoryService feeCategoryService;
    private final AuditService auditService;

    public OnboardingService(CycleRepository cycleRepository,
                             LevelRepository levelRepository,
                             ClassroomRepository classroomRepository,
                             SubjectRepository subjectRepository,
                             FeeTypeRepository feeTypeRepository,
                             FeeScheduleRepository feeScheduleRepository,
                             AcademicYearRepository academicYearRepository,
                             SchoolRepository schoolRepository,
                             CampusRepository campusRepository,
                             FeeCategoryService feeCategoryService,
                             AuditService auditService) {
        this.cycleRepository = cycleRepository;
        this.levelRepository = levelRepository;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.feeTypeRepository = feeTypeRepository;
        this.feeScheduleRepository = feeScheduleRepository;
        this.academicYearRepository = academicYearRepository;
        this.schoolRepository = schoolRepository;
        this.campusRepository = campusRepository;
        this.feeCategoryService = feeCategoryService;
        this.auditService = auditService;
    }

    /** Creates everything the wizard described, in one transaction. */
    @Transactional
    public OnboardingResponse apply(OnboardingRequest request) {
        UUID schoolId = requireSchoolId();
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));
        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active : impossible d'y créer des classes."));
        Campus campus = campusRepository.findBySchoolIdAndMainTrue(schoolId)
            .or(() -> campusRepository.findBySchoolId(schoolId).stream().findFirst())
            .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND,
                "Aucun campus n'est configuré pour cet établissement."));

        // Rejouer l'assistant doublerait chaque classe. On refuse plutot que
        // de laisser l'ecole demeler « 6eme A » en double a la main.
        if (!cycleRepository.findBySchoolIdOrderBySequenceAsc(schoolId).isEmpty()) {
            throw new BusinessException(ErrorCode.CONFLICT,
                    "Cet établissement a déjà des cycles. Passez par les écrans "
                            + "Niveaux et Classes pour les compléter : relancer "
                            + "l'assistant créerait tout en double.");
        }

        OnboardingResponse done = new OnboardingResponse();
        Set<String> usedCycleCodes = new LinkedHashSet<>();
        Set<String> usedLevelCodes = new LinkedHashSet<>();
        Set<String> usedClassroomCodes = new LinkedHashSet<>();
        int cycleSequence = 1;

        // Les types de frais pointent vers fee_category par clé étrangère :
        // les huit rubriques d'origine doivent exister avant toute création.
        feeCategoryService.seedDefaults(school);

        FeeType registrationType = null;
        FeeType tuitionType = null;

        for (OnboardingRequest.CycleSetup cycleSetup : request.getCycles()) {
            String cycleName = clean(cycleSetup.getName());
            if (cycleName == null) {
                done.getSkipped().add("Un cycle sans nom a été ignoré.");
                continue;
            }
            Cycle cycle = new Cycle();
            cycle.setSchool(school);
            cycle.setName(cycleName);
            cycle.setCode(uniqueCode(cycleSetup.getCode(), cycleName, usedCycleCodes, 40));
            cycle.setSequence(cycleSequence++);
            cycle.setStatus(CommonStatus.ACTIVE);
            Cycle savedCycle = cycleRepository.save(cycle);
            done.setCycles(done.getCycles() + 1);

            int levelSequence = 1;
            List<OnboardingRequest.LevelSetup> levels = cycleSetup.getLevels();
            for (int index = 0; index < levels.size(); index++) {
                OnboardingRequest.LevelSetup levelSetup = levels.get(index);
                String levelName = clean(levelSetup.getName());
                if (levelName == null) {
                    done.getSkipped().add("Un niveau sans nom de « " + cycleName
                            + " » a été ignoré.");
                    continue;
                }

                Level level = new Level();
                level.setCycle(savedCycle);
                level.setName(levelName);
                level.setShortName(shorten(levelName));
                level.setCode(uniqueCode(levelSetup.getCode(), levelName, usedLevelCodes, 40));
                level.setSequence(levelSequence++);
                // Le dernier niveau ferme le cycle : c'est lui qui arrete le
                // passage automatique en fin d'annee.
                level.setTerminal(index == levels.size() - 1);
                level.setStatus(CommonStatus.ACTIVE);
                Level savedLevel = levelRepository.save(level);
                done.setLevels(done.getLevels() + 1);

                for (String rawName : levelSetup.getClassNames()) {
                    String className = clean(rawName);
                    if (className == null) {
                        done.getSkipped().add("Une classe sans nom de « " + levelName
                                + " » a été ignorée.");
                        continue;
                    }
                    Classroom classroom = new Classroom();
                    classroom.setAcademicYear(year);
                    classroom.setCampus(campus);
                    classroom.setLevel(savedLevel);
                    classroom.setName(className);
                    classroom.setCode(uniqueCode(null, className, usedClassroomCodes, 40));
                    classroom.setCapacityMaximum(levelSetup.getCapacity());
                    classroom.setStatus(ClassroomStatus.ACTIVE);
                    classroomRepository.save(classroom);
                    done.setClassrooms(done.getClassrooms() + 1);
                }

                // Les frais sont propres au niveau : une ecole ne facture pas
                // le CP1 comme la terminale, et fee_schedule.level_id le sait.
                if (levelSetup.getRegistrationFee() > 0) {
                    if (registrationType == null) {
                        registrationType = feeTypeFor(school, REGISTRATION_CODE,
                                "Frais d'inscription", "REGISTRATION",
                                FeeRecurrence.ONE_TIME);
                    }
                    createSchedule(year, registrationType, savedLevel,
                            "Inscription — " + levelName,
                            BigDecimal.valueOf(levelSetup.getRegistrationFee()), 1);
                    done.setFeeSchedules(done.getFeeSchedules() + 1);
                }
                if (levelSetup.getTuitionTotal() > 0) {
                    if (tuitionType == null) {
                        tuitionType = feeTypeFor(school, TUITION_CODE,
                                "Scolarité", "TUITION", FeeRecurrence.ANNUAL);
                    }
                    createSchedule(year, tuitionType, savedLevel,
                            "Scolarité — " + levelName,
                            BigDecimal.valueOf(levelSetup.getTuitionTotal()),
                            levelSetup.getInstalments());
                    done.setFeeSchedules(done.getFeeSchedules() + 1);
                }
            }
        }

        Set<String> usedSubjectCodes = new LinkedHashSet<>();
        for (OnboardingRequest.SubjectSetup subjectSetup : request.getSubjects()) {
            String subjectName = clean(subjectSetup.getName());
            if (subjectName == null) {
                continue;
            }
            Subject subject = new Subject();
            subject.setSchool(school);
            subject.setName(subjectName);
            subject.setShortName(shorten(subjectName));
            subject.setCode(uniqueCode(subjectSetup.getCode(), subjectName,
                    usedSubjectCodes, 40));
            subject.setStatus(CommonStatus.ACTIVE);
            subjectRepository.save(subject);
            done.setSubjects(done.getSubjects() + 1);
        }

        auditService.logCreate("SchoolOnboarding", school.getId(), school.getName(),
                Map.of("cycles", String.valueOf(done.getCycles()),
                        "levels", String.valueOf(done.getLevels()),
                        "classrooms", String.valueOf(done.getClassrooms()),
                        "subjects", String.valueOf(done.getSubjects()),
                        "feeSchedules", String.valueOf(done.getFeeSchedules())));
        log.info("Onboarding applied to {}: {} cycle(s), {} niveau(x), {} classe(s), "
                        + "{} matiere(s), {} bareme(s), {} element(s) ignore(s)",
                school.getCode(), done.getCycles(), done.getLevels(),
                done.getClassrooms(), done.getSubjects(), done.getFeeSchedules(),
                done.getSkipped().size());
        return done;
    }

    // ------------------------------------------------------------- finances

    /** Reuses the fee type if the school already has one under that code. */
    private FeeType feeTypeFor(School school, String code, String name,
                               String category, FeeRecurrence recurrence) {
        return feeTypeRepository.findBySchoolIdAndCode(school.getId(), code)
                .orElseGet(() -> {
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

    /**
     * One price for one level, split into instalments.
     *
     * <p>The split gives the remainder to the <em>first</em> instalment, not
     * the last. 450 000 F over four terms is 112 500 each and divides cleanly;
     * 100 000 over three is 33 334 then 33 333 twice. Putting the extra franc
     * first means the school collects it early, and the closing instalment is
     * never the odd one out on a receipt.</p>
     */
    private void createSchedule(AcademicYear year, FeeType feeType, Level level,
                                String label, BigDecimal total, int instalmentCount) {
        FeeSchedule schedule = new FeeSchedule();
        schedule.setAcademicYear(year);
        schedule.setFeeType(feeType);
        schedule.setLevel(level);
        schedule.setLabel(label);
        schedule.setTotalAmount(total);
        schedule.setStatus(CommonStatus.ACTIVE);

        int count = Math.max(1, instalmentCount);
        BigDecimal each = total.divide(BigDecimal.valueOf(count), 0, RoundingMode.DOWN);
        BigDecimal remainder = total.subtract(each.multiply(BigDecimal.valueOf(count)));

        LocalDate start = year.getStartDate() != null ? year.getStartDate() : LocalDate.now();
        List<FeeScheduleInstalment> instalments = new ArrayList<>();
        for (int index = 0; index < count; index++) {
            FeeScheduleInstalment instalment = new FeeScheduleInstalment();
            instalment.setFeeSchedule(schedule);
            instalment.setSequence(index + 1);
            instalment.setLabel(count == 1 ? "Paiement unique"
                    : "Tranche " + (index + 1) + " sur " + count);
            instalment.setAmount(index == 0 ? each.add(remainder) : each);
            // Une tranche par trimestre, a partir de la rentree.
            instalment.setDueDate(start.plusMonths(index * 3L));
            instalments.add(instalment);
        }
        schedule.setInstalments(instalments);
        feeScheduleRepository.save(schedule);
    }

    // --------------------------------------------------------------- outils

    private String clean(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

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
     * A code that is printable, stable and not already taken.
     *
     * <p>Accents are stripped: a code ends up in file names, URLs and exported
     * spreadsheets, and « 6ème » survives none of them intact.</p>
     */
    private String uniqueCode(String preferred, String fallback, Set<String> used,
                              int maxLength) {
        String source = clean(preferred) != null ? preferred : fallback;
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

    private UUID requireSchoolId() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
