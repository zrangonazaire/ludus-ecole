package ci.company.eduops.grade.service;

import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.curriculum.domain.Curriculum;
import ci.company.eduops.curriculum.domain.CurriculumSubject;
import ci.company.eduops.curriculum.repository.CurriculumRepository;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.grade.domain.Grade;
import ci.company.eduops.grade.repository.GradeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * The single place where academic averages are produced (rule 14).
 *
 * <p>Angular never recomputes an official average; it only displays what this
 * service returns, so the mark on screen always equals the mark on the
 * report card.</p>
 *
 * <p>Formulas (section 34):</p>
 * <pre>
 * subjectAverage  = SUM(normalizedScore x assessmentCoefficient)
 *                 / SUM(assessmentCoefficient)
 *
 * generalAverage  = SUM(subjectAverage x subjectCoefficient)
 *                 / SUM(subjectCoefficient)
 * </pre>
 *
 * <p>Rounding, scale and passing mark come from the curriculum's
 * {@code gradingRules}, so each level can use its own convention.</p>
 */
@Service
public class AcademicCalculationService {

    private final GradeRepository gradeRepository;
    private final CurriculumRepository curriculumRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AcademicCalculationService(GradeRepository gradeRepository,
                                      CurriculumRepository curriculumRepository,
                                      EnrollmentRepository enrollmentRepository) {
        this.gradeRepository = gradeRepository;
        this.curriculumRepository = curriculumRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    /**
     * Weighted average of one subject for one pupil over a term.
     *
     * @return {@code null} when the pupil has no counting mark in that subject
     */
    public BigDecimal computeSubjectAverage(List<Grade> grades, int decimals) {
        BigDecimal weightedSum = BigDecimal.ZERO;
        BigDecimal coefficientSum = BigDecimal.ZERO;

        for (Grade grade : grades) {
            if (!grade.entersAverage()) {
                continue;
            }
            BigDecimal coefficient = grade.getAssessment().getCoefficient();
            weightedSum = weightedSum.add(grade.getNormalizedScore().multiply(coefficient));
            coefficientSum = coefficientSum.add(coefficient);
        }

        if (coefficientSum.compareTo(BigDecimal.ZERO) == 0) {
            return null;
        }
        return weightedSum.divide(coefficientSum, decimals, RoundingMode.HALF_UP);
    }

    /** Weighted average of the subject averages, using the curriculum coefficients. */
    public BigDecimal computeGeneralAverage(List<SubjectAverage> subjects, int decimals) {
        BigDecimal weightedSum = BigDecimal.ZERO;
        BigDecimal coefficientSum = BigDecimal.ZERO;

        for (SubjectAverage subject : subjects) {
            if (subject.getAverage() == null) {
                continue;
            }
            weightedSum = weightedSum.add(subject.getAverage().multiply(subject.getCoefficient()));
            coefficientSum = coefficientSum.add(subject.getCoefficient());
        }

        if (coefficientSum.compareTo(BigDecimal.ZERO) == 0) {
            return null;
        }
        return weightedSum.divide(coefficientSum, decimals, RoundingMode.HALF_UP);
    }

    /**
     * Full term result of one pupil, including the class statistics and the
     * rank when the curriculum enables ranking.
     */
    @Transactional(readOnly = true)
    public TermResult computeTermResult(Enrollment enrollment, UUID termId) {
        Classroom classroom = enrollment.getClassroom();
        Curriculum curriculum = curriculumRepository
                .findWithSubjects(classroom.getAcademicYear().getId(), classroom.getLevel().getId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.CURRICULUM_NOT_FOUND,
                        "No curriculum for level " + classroom.getLevel().getName()));

        int decimals = curriculum.decimalPlaces();
        TermResult result = new TermResult();
        result.setEnrollmentId(enrollment.getId());
        result.setStudentId(enrollment.getStudent().getId());
        result.setTermId(termId);
        result.setScaleMax(curriculum.scaleMax());
        result.setPassingMark(curriculum.passingMark());

        List<Grade> allGrades = gradeRepository.findAllCountingForTerm(enrollment.getId(), termId);
        Map<UUID, List<Grade>> gradesBySubject = groupBySubject(allGrades);

        List<SubjectAverage> subjects = new ArrayList<>();
        for (CurriculumSubject curriculumSubject : curriculum.getSubjects()) {
            if (!curriculumSubject.getSubject().isGraded()) {
                continue;
            }
            UUID subjectId = curriculumSubject.getSubject().getId();
            List<Grade> subjectGrades = gradesBySubject.getOrDefault(subjectId, List.of());

            SubjectAverage line = new SubjectAverage();
            line.setSubjectId(subjectId);
            line.setSubjectName(curriculumSubject.getSubject().getName());
            line.setCoefficient(curriculumSubject.getCoefficient());
            line.setAssessmentCount(subjectGrades.size());

            BigDecimal average = computeSubjectAverage(subjectGrades, decimals);
            line.setAverage(average);
            if (average != null) {
                line.setWeightedAverage(average.multiply(curriculumSubject.getCoefficient())
                        .setScale(decimals, RoundingMode.HALF_UP));
                line.setAppreciation(appreciationFor(average, curriculum.scaleMax()));
            }
            subjects.add(line);
        }

        result.setSubjects(subjects);
        result.setTotalCoefficient(curriculum.totalCoefficient());
        result.setGeneralAverage(computeGeneralAverage(subjects, decimals));

        enrichWithClassStatistics(result, classroom, termId, curriculum, decimals);
        return result;
    }

    /**
     * Averages of every pupil of a class for a term, ordered by decreasing
     * average. Used to compute ranks and the class average in one pass.
     */
    @Transactional(readOnly = true)
    public Map<UUID, BigDecimal> computeClassAverages(UUID classroomId, UUID termId,
                                                       Curriculum curriculum, int decimals) {
        List<Grade> classGrades = gradeRepository.findClassGradesForTerm(classroomId, termId);

        // enrollmentId -> subjectId -> grades
        Map<UUID, Map<UUID, List<Grade>>> byEnrollment = new LinkedHashMap<>();
        for (Grade grade : classGrades) {
            if (!grade.entersAverage()) {
                continue;
            }
            byEnrollment
                    .computeIfAbsent(grade.getEnrollment().getId(), k -> new LinkedHashMap<>())
                    .computeIfAbsent(grade.getSubject().getId(), k -> new ArrayList<>())
                    .add(grade);
        }

        Map<UUID, BigDecimal> averages = new LinkedHashMap<>();
        for (Map.Entry<UUID, Map<UUID, List<Grade>>> entry : byEnrollment.entrySet()) {
            List<SubjectAverage> subjects = new ArrayList<>();
            for (CurriculumSubject curriculumSubject : curriculum.getSubjects()) {
                List<Grade> subjectGrades =
                        entry.getValue().get(curriculumSubject.getSubject().getId());
                if (subjectGrades == null || subjectGrades.isEmpty()) {
                    continue;
                }
                SubjectAverage line = new SubjectAverage();
                line.setCoefficient(curriculumSubject.getCoefficient());
                line.setAverage(computeSubjectAverage(subjectGrades, decimals));
                subjects.add(line);
            }
            BigDecimal general = computeGeneralAverage(subjects, decimals);
            if (general != null) {
                averages.put(entry.getKey(), general);
            }
        }
        return averages;
    }

    private void enrichWithClassStatistics(TermResult result, Classroom classroom, UUID termId,
                                            Curriculum curriculum, int decimals) {
        Map<UUID, BigDecimal> classAverages =
                computeClassAverages(classroom.getId(), termId, curriculum, decimals);
        if (classAverages.isEmpty()) {
            return;
        }

        List<BigDecimal> values = new ArrayList<>(classAverages.values());
        BigDecimal sum = values.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        result.setClassAverage(sum.divide(BigDecimal.valueOf(values.size()), decimals,
                RoundingMode.HALF_UP));
        result.setClassMinAverage(values.stream().min(Comparator.naturalOrder()).orElse(null));
        result.setClassMaxAverage(values.stream().max(Comparator.naturalOrder()).orElse(null));

        long classSize = enrollmentRepository
                .findByClassroomIdAndStatusIn(classroom.getId(),
                        List.of(EnrollmentStatus.VALIDATED, EnrollmentStatus.ACTIVE))
                .size();
        result.setClassSize((int) classSize);

        if (curriculum.rankingEnabled()) {
            result.setRankInClass(rankOf(result.getEnrollmentId(), classAverages));
        }
    }

    /**
     * Competition ranking: equal averages share the same rank, and the next
     * rank skips accordingly (1, 2, 2, 4).
     */
    public Integer rankOf(UUID enrollmentId, Map<UUID, BigDecimal> averages) {
        BigDecimal own = averages.get(enrollmentId);
        if (own == null) {
            return null;
        }
        long better = averages.values().stream()
                .filter(value -> value.compareTo(own) > 0)
                .count();
        return (int) better + 1;
    }

    private Map<UUID, List<Grade>> groupBySubject(List<Grade> grades) {
        Map<UUID, List<Grade>> map = new LinkedHashMap<>();
        for (Grade grade : grades) {
            map.computeIfAbsent(grade.getSubject().getId(), k -> new ArrayList<>()).add(grade);
        }
        return map;
    }

    /** Standard French school appreciation, expressed on the configured scale. */
    private String appreciationFor(BigDecimal average, BigDecimal scaleMax) {
        BigDecimal ratio = average.divide(scaleMax, 4, RoundingMode.HALF_UP);
        double percent = ratio.doubleValue() * 100;
        if (percent >= 80) {
            return "Excellent";
        }
        if (percent >= 70) {
            return "Tres bien";
        }
        if (percent >= 60) {
            return "Bien";
        }
        if (percent >= 50) {
            return "Assez bien";
        }
        if (percent >= 40) {
            return "Passable";
        }
        return "Insuffisant";
    }
}
