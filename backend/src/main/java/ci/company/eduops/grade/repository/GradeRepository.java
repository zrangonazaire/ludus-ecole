package ci.company.eduops.grade.repository;

import ci.company.eduops.grade.domain.Grade;
import ci.company.eduops.grade.domain.GradeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GradeRepository extends JpaRepository<Grade, UUID> {

    List<Grade> findByAssessmentId(UUID assessmentId);

    /**
     * Marking progress and class average for a batch of assessments.
     *
     * <p>One query for the whole board. Loading each sheet to count its lines
     * would be a query per assessment, and the board of a busy term holds
     * several dozen.</p>
     *
     * <p>A row counts as marked when it carries a score, an absence or an
     * exemption. A saved row with none of the three is a pupil whose paper has
     * not been looked at yet — which is exactly what the board must show.</p>
     */
    @Query("""
           SELECT g.assessment.id,
                  SUM(CASE WHEN g.score IS NOT NULL OR g.absent = true OR g.exempted = true
                           THEN 1 ELSE 0 END),
                  AVG(g.normalizedScore)
           FROM Grade g
           WHERE g.assessment.id IN :assessmentIds
           GROUP BY g.assessment.id
           """)
    List<Object[]> summarise(@Param("assessmentIds") Collection<UUID> assessmentIds);

    Optional<Grade> findByAssessmentIdAndStudentId(UUID assessmentId, UUID studentId);

    List<Grade> findByStudentIdAndTermId(UUID studentId, UUID termId);

    /**
     * All the marks feeding one pupil's subject average for a term.
     * Loads the assessment so its coefficient is available without an N+1.
     */
    @Query("""
           SELECT g FROM Grade g
           JOIN FETCH g.assessment a
           WHERE g.enrollment.id = :enrollmentId AND g.term.id = :termId
             AND g.subject.id = :subjectId
             AND g.status IN ('VALIDATED','PUBLISHED')
             AND a.countsForAverage = true
           """)
    List<Grade> findCountingForSubjectAverage(@Param("enrollmentId") UUID enrollmentId,
                                              @Param("termId") UUID termId,
                                              @Param("subjectId") UUID subjectId);

    @Query("""
           SELECT g FROM Grade g
           JOIN FETCH g.assessment a
           JOIN FETCH g.subject
           WHERE g.enrollment.id = :enrollmentId AND g.term.id = :termId
             AND g.status IN ('VALIDATED','PUBLISHED')
             AND a.countsForAverage = true
           """)
    List<Grade> findAllCountingForTerm(@Param("enrollmentId") UUID enrollmentId,
                                       @Param("termId") UUID termId);

    @Query("""
           SELECT g FROM Grade g
           JOIN FETCH g.assessment a
           WHERE g.classroom.id = :classroomId AND g.term.id = :termId
             AND g.status IN ('VALIDATED','PUBLISHED')
             AND a.countsForAverage = true
           """)
    List<Grade> findClassGradesForTerm(@Param("classroomId") UUID classroomId,
                                       @Param("termId") UUID termId);

    /** Guard for report card publication: nothing may still be unvalidated. */
    @Query("""
           SELECT COUNT(g) FROM Grade g
           WHERE g.classroom.id = :classroomId AND g.term.id = :termId
             AND g.status IN ('DRAFT','SUBMITTED')
           """)
    long countUnvalidated(@Param("classroomId") UUID classroomId, @Param("termId") UUID termId);

    @Query("""
           SELECT COUNT(g) FROM Grade g
           WHERE g.enrollment.id = :enrollmentId AND g.term.id = :termId
             AND g.status IN ('DRAFT','SUBMITTED')
           """)
    long countUnvalidatedForEnrollment(@Param("enrollmentId") UUID enrollmentId,
                                       @Param("termId") UUID termId);

    @Query("UPDATE Grade g SET g.status = :target WHERE g.assessment.id = :assessmentId AND g.status = :current")
    @org.springframework.data.jpa.repository.Modifying
    int bulkChangeStatus(@Param("assessmentId") UUID assessmentId,
                         @Param("current") GradeStatus current,
                         @Param("target") GradeStatus target);

    @Query("""
           SELECT COALESCE(AVG(g.normalizedScore), 0) FROM Grade g
           WHERE g.academicYear.id = :academicYearId AND g.status = 'PUBLISHED'
           """)
    java.math.BigDecimal schoolAverage(@Param("academicYearId") UUID academicYearId);
}
