package ci.company.eduops.student.repository;

import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
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
public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByStudentNumber(String studentNumber);

    Optional<Student> findByUserAccountId(UUID userAccountId);

    boolean existsByStudentNumber(String studentNumber);

    /** Backs the students list screen and the global search bar. */
    @Query("""
           SELECT s FROM Student s
           WHERE s.school.id = :schoolId
             AND (:status = '' OR CAST(s.status AS String) = :status)
                 AND (lower(s.firstName)     LIKE lower(concat('%', coalesce(:search, ''), '%'))
                  OR lower(s.lastName)      LIKE lower(concat('%', coalesce(:search, ''), '%'))
                  OR lower(s.studentNumber) LIKE lower(concat('%', coalesce(:search, ''), '%')))
           """)
    Page<Student> search(@Param("schoolId") UUID schoolId,
                         @Param("status") String status,
                         @Param("search") String search,
                         Pageable pageable);

    /** Recherche restreinte a une classe, filtree cote requete : la page et le total portent exactement sur la classe. */
    @Query("""
            SELECT DISTINCT s FROM Student s
            JOIN Enrollment e ON e.student.id = s.id
            WHERE s.school.id = :schoolId
              AND e.classroom.id = :classroomId
              AND e.status IN ('VALIDATED','ACTIVE')
              AND (:status = '' OR CAST(s.status AS String) = :status)
              AND (lower(s.firstName)     LIKE lower(concat('%', coalesce(:search, ''), '%'))
               OR lower(s.lastName)      LIKE lower(concat('%', coalesce(:search, ''), '%'))
               OR lower(s.studentNumber) LIKE lower(concat('%', coalesce(:search, ''), '%')))
            """)
    Page<Student> searchByClassroom(@Param("schoolId") UUID schoolId,
                                    @Param("classroomId") UUID classroomId,
                                    @Param("status") String status,
                                    @Param("search") String search,
                                    Pageable pageable);

    /** Students of a class for a given year, resolved through their enrollment. */
    @Query("""
           SELECT e.student FROM Enrollment e
           WHERE e.classroom.id = :classroomId AND e.status IN ('VALIDATED','ACTIVE')
           ORDER BY e.student.lastName ASC, e.student.firstName ASC
           """)
    List<Student> findByClassroom(@Param("classroomId") UUID classroomId);

    @Query("SELECT COUNT(s) FROM Student s WHERE s.school.id = :schoolId AND s.status = :status")
    long countByStatus(@Param("schoolId") UUID schoolId, @Param("status") StudentStatus status);

    @Query("""
           SELECT s FROM Student s
           WHERE s.school.id = :schoolId
             AND lower(s.lastName) = lower(:lastName)
             AND lower(s.firstName) = lower(:firstName)
             AND s.birthDate = :birthDate
           """)
    List<Student> findPotentialDuplicates(@Param("schoolId") UUID schoolId,
                                          @Param("firstName") String firstName,
                                          @Param("lastName") String lastName,
                                          @Param("birthDate") java.time.LocalDate birthDate);
}
