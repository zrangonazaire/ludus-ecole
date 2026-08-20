package ci.company.eduops.guardian.repository;

import ci.company.eduops.guardian.domain.Guardian;
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
public interface GuardianRepository extends JpaRepository<Guardian, UUID> {

    Optional<Guardian> findByUserAccountId(UUID userAccountId);

    Optional<Guardian> findBySchoolIdAndPhone(UUID schoolId, String phone);

    boolean existsBySchoolIdAndPhone(UUID schoolId, String phone);

    @Query("""
           SELECT g FROM Guardian g
           WHERE g.school.id = :schoolId
             AND (:search IS NULL
                  OR lower(g.firstName) LIKE lower(concat('%', :search, '%'))
                  OR lower(g.lastName)  LIKE lower(concat('%', :search, '%'))
                  OR g.phone            LIKE concat('%', :search, '%'))
           """)
    Page<Guardian> search(@Param("schoolId") UUID schoolId,
                          @Param("search") String search,
                          Pageable pageable);

    @Query("SELECT sg.guardian FROM StudentGuardian sg WHERE sg.student.id = :studentId")
    List<Guardian> findByStudent(@Param("studentId") UUID studentId);
}
