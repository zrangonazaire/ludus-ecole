package ci.company.eduops.teacher.repository;

import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.domain.TeacherStatus;
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
public interface TeacherRepository extends JpaRepository<Teacher, UUID> {

    Optional<Teacher> findByUserAccountId(UUID userAccountId);

    Optional<Teacher> findBySchoolIdAndEmployeeNumber(UUID schoolId, String employeeNumber);

    List<Teacher> findBySchoolIdAndStatus(UUID schoolId, TeacherStatus status);

    boolean existsBySchoolIdAndEmployeeNumber(UUID schoolId, String employeeNumber);

    boolean existsBySchoolIdAndEmail(UUID schoolId, String email);

    @Query("""
           SELECT t FROM Teacher t
           WHERE t.school.id = :schoolId
             AND (:status IS NULL OR t.status = :status)
             AND (:search IS NULL
                  OR lower(t.firstName)      LIKE lower(concat('%', :search, '%'))
                  OR lower(t.lastName)       LIKE lower(concat('%', :search, '%'))
                  OR lower(t.employeeNumber) LIKE lower(concat('%', :search, '%')))
           """)
    Page<Teacher> search(@Param("schoolId") UUID schoolId,
                         @Param("status") TeacherStatus status,
                         @Param("search") String search,
                         Pageable pageable);

    long countBySchoolIdAndStatus(UUID schoolId, TeacherStatus status);
}
