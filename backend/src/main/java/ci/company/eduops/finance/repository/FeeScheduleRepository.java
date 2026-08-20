package ci.company.eduops.finance.repository;

import ci.company.eduops.finance.domain.FeeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FeeScheduleRepository extends JpaRepository<FeeSchedule, UUID> {

    /**
     * Every active price applicable to a level, including the school-wide ones
     * where {@code level_id} is null. Loaded with instalments to build the
     * student's payment plan in a single pass.
     */
    @Query("""
           SELECT DISTINCT s FROM FeeSchedule s
           LEFT JOIN FETCH s.instalments
           LEFT JOIN FETCH s.feeType
           WHERE s.academicYear.id = :academicYearId
             AND s.status = 'ACTIVE'
             AND (s.level IS NULL OR s.level.id = :levelId)
             AND (s.campus IS NULL OR s.campus.id = :campusId)
           """)
    List<FeeSchedule> findApplicable(@Param("academicYearId") UUID academicYearId,
                                     @Param("levelId") UUID levelId,
                                     @Param("campusId") UUID campusId);

    List<FeeSchedule> findByAcademicYearId(UUID academicYearId);
}
