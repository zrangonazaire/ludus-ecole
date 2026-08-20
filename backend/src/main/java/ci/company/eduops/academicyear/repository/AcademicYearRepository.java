package ci.company.eduops.academicyear.repository;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AcademicYearRepository extends JpaRepository<AcademicYear, UUID> {

    Optional<AcademicYear> findBySchoolIdAndCode(UUID schoolId, String code);

    /** The single ACTIVE year of a school (guaranteed unique by the DB index). */
    Optional<AcademicYear> findBySchoolIdAndStatus(UUID schoolId, AcademicYearStatus status);

    @Query("SELECT y FROM AcademicYear y WHERE y.school.id = :schoolId ORDER BY y.startDate DESC")
    List<AcademicYear> findBySchoolOrderByStartDateDesc(@Param("schoolId") UUID schoolId);

    @Query("SELECT y FROM AcademicYear y WHERE y.status IN :statuses ORDER BY y.startDate DESC")
    List<AcademicYear> findByStatuses(@Param("statuses") List<AcademicYearStatus> statuses);

    /** Locks the year row while activating another one, to serialise the switch. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT y FROM AcademicYear y WHERE y.id = :id")
    Optional<AcademicYear> lockById(@Param("id") UUID id);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);
}
