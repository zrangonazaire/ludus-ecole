package ci.company.eduops.enrollment.repository;

import ci.company.eduops.enrollment.domain.DepartureStatus;
import ci.company.eduops.enrollment.domain.StudentDeparture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentDepartureRepository extends JpaRepository<StudentDeparture, UUID> {

    /**
     * The live departure of an enrollment, if any.
     *
     * <p>Cancelled ones are excluded: a cancelled departure is a mistake that
     * was corrected, and the pupil is back in class. Counting it would refuse a
     * second, genuine departure later in the year.</p>
     */
    @Query("""
           SELECT d FROM StudentDeparture d
           WHERE d.enrollment.id = :enrollmentId AND d.status <> 'CANCELLED'
           """)
    Optional<StudentDeparture> findLive(@Param("enrollmentId") UUID enrollmentId);

    /**
     * Departures of a year, newest first, optionally narrowed.
     *
     * <p>Cancelled ones stay in the list when asked for explicitly: a secretary
     * checking why a pupil is still enrolled needs to see that a departure was
     * recorded and undone.</p>
     */
    @Query("""
           SELECT d FROM StudentDeparture d
           WHERE d.academicYear.id = :academicYearId
             AND (:status IS NULL OR d.status = :status)
             AND (:classroomId IS NULL OR d.classroom.id = :classroomId)
             AND (:search IS NULL
                  OR lower(d.student.firstName)     LIKE lower(concat('%', :search, '%'))
                  OR lower(d.student.lastName)      LIKE lower(concat('%', :search, '%'))
                  OR lower(d.student.studentNumber) LIKE lower(concat('%', :search, '%')))
           ORDER BY d.departureDate DESC, d.recordedAt DESC
           """)
    List<StudentDeparture> search(@Param("academicYearId") UUID academicYearId,
                                  @Param("status") DepartureStatus status,
                                  @Param("classroomId") UUID classroomId,
                                  @Param("search") String search);

    @Query("""
           SELECT COUNT(d) FROM StudentDeparture d
           WHERE d.academicYear.id = :academicYearId AND d.status = :status
           """)
    long countByStatus(@Param("academicYearId") UUID academicYearId,
                       @Param("status") DepartureStatus status);

    List<StudentDeparture> findByStudentIdOrderByDepartureDateDesc(UUID studentId);
}
