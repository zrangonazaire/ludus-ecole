package ci.company.eduops.guardian.repository;

import ci.company.eduops.guardian.domain.StudentGuardian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentGuardianRepository extends JpaRepository<StudentGuardian, UUID> {

    List<StudentGuardian> findByStudentId(UUID studentId);

    List<StudentGuardian> findByGuardianId(UUID guardianId);

    Optional<StudentGuardian> findByStudentIdAndGuardianId(UUID studentId, UUID guardianId);

    Optional<StudentGuardian> findByStudentIdAndPrimaryTrue(UUID studentId);

    Optional<StudentGuardian> findByStudentIdAndFinancialResponsibilityTrue(UUID studentId);

    /**
     * Rule 11 gate: does this guardian account really own this child?
     * Every parent-portal read goes through it.
     */
    @Query("""
           SELECT COUNT(sg) > 0 FROM StudentGuardian sg
           WHERE sg.guardian.id = :guardianId AND sg.student.id = :studentId
           """)
    boolean isGuardianOfStudent(@Param("guardianId") UUID guardianId,
                                @Param("studentId") UUID studentId);

    @Query("SELECT sg.student.id FROM StudentGuardian sg WHERE sg.guardian.id = :guardianId")
    List<UUID> findStudentIdsForGuardian(@Param("guardianId") UUID guardianId);

    boolean existsByStudentIdAndGuardianId(UUID studentId, UUID guardianId);
}
