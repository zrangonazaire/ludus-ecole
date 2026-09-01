package ci.company.eduops.option.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.option.domain.OptionOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OptionOfferingRepository extends JpaRepository<OptionOffering, UUID> {
    @Query("""
           SELECT o FROM OptionOffering o
           JOIN FETCH o.option ao
           JOIN FETCH o.level l
           JOIN FETCH l.cycle
           WHERE o.academicYear.id = :yearId AND o.status = :status
             AND ao.school.id = :schoolId
           ORDER BY ao.name, l.sequence
           """)
    List<OptionOffering> findForOverview(@Param("schoolId") UUID schoolId,
                                         @Param("yearId") UUID yearId,
                                         @Param("status") CommonStatus status);

    List<OptionOffering> findByOptionIdAndAcademicYearId(UUID optionId, UUID academicYearId);

    @Query("""
           SELECT o FROM OptionOffering o
           JOIN FETCH o.option ao
           JOIN FETCH o.level l
           JOIN FETCH o.academicYear ay
           WHERE o.id = :id AND ao.school.id = :schoolId
           """)
    Optional<OptionOffering> findByIdAndSchool(@Param("id") UUID id,
                                               @Param("schoolId") UUID schoolId);
}
