package ci.company.eduops.enrollment.repository;

import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    Optional<Enrollment> findByEnrollmentNumber(String enrollmentNumber);

    List<Enrollment> findByStudentIdOrderByEnrollmentDateDesc(UUID studentId);

    /**
     * Counts the seats really taken in a class (rule 9). Must be executed after
     * the classroom row has been locked, otherwise two concurrent enrollments
     * can both read 39 and both insert.
     */
    @Query("""
           SELECT COUNT(e) FROM Enrollment e
           WHERE e.classroom.id = :classroomId AND e.status IN ('VALIDATED','ACTIVE')
           """)
    long countOccupiedSeats(@Param("classroomId") UUID classroomId);

    /** checkExistingEnrollment(): is the student already placed for this year? */
    @Query("""
           SELECT e FROM Enrollment e
           WHERE e.student.id = :studentId
             AND e.academicYear.id = :academicYearId
             AND e.status IN ('DRAFT','PENDING','VALIDATED','ACTIVE','SUSPENDED')
           """)
    Optional<Enrollment> findLiveEnrollment(@Param("studentId") UUID studentId,
                                            @Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT e FROM Enrollment e
           WHERE e.student.id = :studentId AND e.academicYear.id = :academicYearId
             AND e.status IN ('VALIDATED','ACTIVE')
           """)
    Optional<Enrollment> findActiveEnrollment(@Param("studentId") UUID studentId,
                                              @Param("academicYearId") UUID academicYearId);

    List<Enrollment> findByClassroomIdAndStatusIn(UUID classroomId, List<EnrollmentStatus> statuses);

    @Query("""
           SELECT e FROM Enrollment e
           WHERE e.academicYear.id = :academicYearId
             AND (:classroomId IS NULL OR e.classroom.id = :classroomId)
             AND (:status IS NULL OR e.status = :status)
             AND (:search IS NULL
                  OR lower(e.student.firstName)     LIKE lower(concat('%', :search, '%'))
                  OR lower(e.student.lastName)      LIKE lower(concat('%', :search, '%'))
                  OR lower(e.student.studentNumber) LIKE lower(concat('%', :search, '%')))
           """)
    Page<Enrollment> search(@Param("academicYearId") UUID academicYearId,
                            @Param("classroomId") UUID classroomId,
                            @Param("status") EnrollmentStatus status,
                            @Param("search") String search,
                            Pageable pageable);

    @Query("""
           SELECT COUNT(e) FROM Enrollment e
           WHERE e.academicYear.id = :academicYearId AND e.status IN ('VALIDATED','ACTIVE')
           """)
    long countActiveForYear(@Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT e.classroom.id, COUNT(e) FROM Enrollment e
           WHERE e.academicYear.id = :academicYearId AND e.status IN ('VALIDATED','ACTIVE')
           GROUP BY e.classroom.id
           """)
    List<Object[]> countActiveByClassroom(@Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT e.classroom.level.name, COUNT(e) FROM Enrollment e
           WHERE e.academicYear.id = :academicYearId AND e.status IN ('VALIDATED','ACTIVE')
           GROUP BY e.classroom.level.name, e.classroom.level.sequence
           ORDER BY e.classroom.level.sequence
           """)
    List<Object[]> countActiveByLevel(@Param("academicYearId") UUID academicYearId);

    @Query("""
           SELECT e FROM Enrollment e
           WHERE e.academicYear.id = :academicYearId
           ORDER BY e.createdAt DESC
           """)
    List<Enrollment> findRecent(@Param("academicYearId") UUID academicYearId, Pageable pageable);
}
