package ci.company.eduops.school.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.cycle.repository.CycleRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.dto.request.SignupOperationsRequest;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

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

    public SignupProvisioningService(CycleRepository cycleRepository,
                                     LevelRepository levelRepository,
                                     ClassroomRepository classroomRepository,
                                     SubjectRepository subjectRepository) {
        this.cycleRepository = cycleRepository;
        this.levelRepository = levelRepository;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
    }

    /** What was actually created, for the log and the response. */
    public static class Provisioned {

        private int cycles;
        private int levels;
        private int classrooms;
        private int subjects;

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

        public boolean isEmpty() {
            return cycles == 0 && levels == 0 && classrooms == 0 && subjects == 0;
        }
    }

    /**
     * Creates the structure described by the walkthrough.
     *
     * @param operations the draft, possibly null when the visitor skipped it
     */
    @Transactional(propagation = Propagation.MANDATORY)
    public Provisioned provision(School school, AcademicYear year,
                                 SignupOperationsRequest operations) {
        Provisioned done = new Provisioned();
        if (operations == null) {
            return done;
        }

        int capacity = clamp(operations.getClassCapacity(), 1, MAX_CAPACITY, 35);
        int classesPerLevel = clamp(operations.getClassesPerLevel(), 0,
                MAX_CLASSES_PER_LEVEL, 1);

        List<Level> createdLevels = new ArrayList<>();
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
                classroomRepository.save(classroom);
                done.classrooms++;
            }
        }

        Set<String> usedSubjectCodes = new LinkedHashSet<>();
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
            subjectRepository.save(subject);
            done.subjects++;
        }

        // Les frais ne sont pas crees ici : le bareme depend des types de frais
        // et d'un echeancier par niveau, que l'assistant de configuration sait
        // poser correctement. Les inventer a l'aveugle produirait des montants
        // que l'ecole devrait defaire avant de facturer quoi que ce soit.

        log.info("Provisioned school {}: {} cycle(s), {} niveau(x), {} classe(s), {} matiere(s)",
                school.getCode(), done.cycles, done.levels, done.classrooms, done.subjects);
        return done;
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
