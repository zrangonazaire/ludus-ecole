package ci.company.eduops.assessment.repository;

import ci.company.eduops.assessment.domain.Assessment;
import ci.company.eduops.assessment.domain.AssessmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, UUID> {

    List<Assessment> findByClassroomIdAndTermId(UUID classroomId, UUID termId);

    List<Assessment> findByClassroomIdAndSubjectIdAndTermId(UUID classroomId, UUID subjectId, UUID termId);

    /** Assessments feeding a subject average: validated or published only. */
    @Query("""
           SELECT a FROM Assessment a
           WHERE a.classroom.id = :classroomId AND a.subject.id = :subjectId
             AND a.term.id = :termId
             AND a.countsForAverage = true
             AND a.status IN ('VALIDATED','PUBLISHED')
           """)
    List<Assessment> findCountingForAverage(@Param("classroomId") UUID classroomId,
                                            @Param("subjectId") UUID subjectId,
                                            @Param("termId") UUID termId);

    @Query("""
           SELECT a FROM Assessment a
           WHERE a.teacher.id = :teacherId
             AND (:status IS NULL OR a.status = :status)
           ORDER BY a.assessmentDate DESC
           """)
    Page<Assessment> findForTeacher(@Param("teacherId") UUID teacherId,
                                    @Param("status") AssessmentStatus status,
                                    Pageable pageable);

    @Query("""
           SELECT a FROM Assessment a
           WHERE a.academicYear.id = :academicYearId
             AND a.assessmentDate BETWEEN :from AND :to
             AND a.status IN ('PLANNED','OPEN')
           ORDER BY a.assessmentDate ASC
           """)
    List<Assessment> findUpcoming(@Param("academicYearId") UUID academicYearId,
                                  @Param("from") LocalDate from,
                                  @Param("to") LocalDate to);

    @Query("""
           SELECT COUNT(a) FROM Assessment a
           WHERE a.academicYear.id = :academicYearId AND a.term.id = :termId
             AND a.status IN ('GRADING','SUBMITTED')
           """)
    long countAwaitingValidation(@Param("academicYearId") UUID academicYearId,
                                 @Param("termId") UUID termId);
}
