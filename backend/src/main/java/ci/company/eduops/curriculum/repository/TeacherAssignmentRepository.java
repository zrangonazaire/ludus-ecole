package ci.company.eduops.curriculum.repository;

import ci.company.eduops.curriculum.domain.AssignmentStatus;
import ci.company.eduops.curriculum.domain.TeacherAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeacherAssignmentRepository extends JpaRepository<TeacherAssignment, UUID> {

    List<TeacherAssignment> findByTeacherIdAndAcademicYearIdAndStatus(UUID teacherId,
                                                                      UUID academicYearId,
                                                                      AssignmentStatus status);

    List<TeacherAssignment> findByClassroomIdAndStatus(UUID classroomId, AssignmentStatus status);

    Optional<TeacherAssignment> findByTeacherIdAndClassroomIdAndSubjectIdAndStatus(
            UUID teacherId, UUID classroomId, UUID subjectId, AssignmentStatus status);

    /**
     * The single question that gates every teacher write operation (rule 10):
     * is this teacher currently allowed on this class and this subject?
     */
    @Query("""
           SELECT COUNT(a) > 0 FROM TeacherAssignment a
           WHERE a.teacher.id = :teacherId
             AND a.classroom.id = :classroomId
             AND a.subject.id = :subjectId
             AND a.status = 'ACTIVE'
           """)
    boolean isTeacherAssigned(@Param("teacherId") UUID teacherId,
                              @Param("classroomId") UUID classroomId,
                              @Param("subjectId") UUID subjectId);

    @Query("""
           SELECT COUNT(a) > 0 FROM TeacherAssignment a
           WHERE a.teacher.id = :teacherId AND a.classroom.id = :classroomId AND a.status = 'ACTIVE'
           """)
    boolean isTeacherOnClassroom(@Param("teacherId") UUID teacherId,
                                 @Param("classroomId") UUID classroomId);

    @Query("""
           SELECT DISTINCT a.classroom.id FROM TeacherAssignment a
           WHERE a.teacher.id = :teacherId AND a.academicYear.id = :academicYearId
             AND a.status = 'ACTIVE'
           """)
    List<UUID> findClassroomIdsForTeacher(@Param("teacherId") UUID teacherId,
                                          @Param("academicYearId") UUID academicYearId);

    @Query("SELECT COUNT(a) FROM TeacherAssignment a "
         + "WHERE a.academicYear.id = :academicYearId AND a.status = 'ACTIVE'")
    long countActiveForYear(@Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT COALESCE(SUM(a.weeklyHours), 0) FROM TeacherAssignment a
           WHERE a.teacher.id = :teacherId AND a.academicYear.id = :academicYearId
             AND a.status = 'ACTIVE'
           """)
    java.math.BigDecimal sumWeeklyHours(@Param("teacherId") UUID teacherId,
                                        @Param("academicYearId") UUID academicYearId);
}
