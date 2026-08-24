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

    /** Every price of the year, instalments included, in one query. */
    @Query("""
           SELECT DISTINCT s FROM FeeSchedule s
           LEFT JOIN FETCH s.instalments
           LEFT JOIN FETCH s.feeType
           LEFT JOIN FETCH s.level
           WHERE s.academicYear.id = :academicYearId
             AND s.status = 'ACTIVE'
           """)
    List<FeeSchedule> findAllOfYear(@Param("academicYearId") UUID academicYearId);

    /**
     * Levels that carry at least one price.
     *
     * <p>Drives the configuration checklist: a school with prices on two levels
     * out of sixteen has not finished this step, and the count says so.</p>
     */
    @Query("""
           SELECT COUNT(DISTINCT s.level.id) FROM FeeSchedule s
           WHERE s.academicYear.id = :academicYearId
             AND s.status = 'ACTIVE'
             AND s.level IS NOT NULL
           """)
    long countPricedLevels(@Param("academicYearId") UUID academicYearId);

    boolean existsByAcademicYearIdAndFeeTypeIdAndLevelId(UUID academicYearId,
                                                         UUID feeTypeId,
                                                         UUID levelId);

    long countByFeeTypeIdAndStatus(UUID feeTypeId,
                                   ci.company.eduops.common.domain.CommonStatus status);
}
