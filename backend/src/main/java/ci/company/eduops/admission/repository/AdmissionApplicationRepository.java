package ci.company.eduops.admission.repository;

import ci.company.eduops.admission.domain.AdmissionApplication;
import ci.company.eduops.admission.domain.AdmissionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdmissionApplicationRepository extends JpaRepository<AdmissionApplication, UUID> {

    Optional<AdmissionApplication> findByApplicationNumber(String applicationNumber);

    /** Pending or decided applications aimed at a level: the archive guard. */
    boolean existsByRequestedLevelId(UUID requestedLevelId);

    /** Seats held by pending admissions, used by projectedAvailableSeats. */
    @Query("""
           SELECT COUNT(a) FROM AdmissionApplication a
           WHERE a.reservedClassroom.id = :classroomId
             AND a.seatReserved = true
             AND a.status IN ('UNDER_REVIEW','ACCEPTED','WAITLISTED')
           """)
    long countReservedSeats(@Param("classroomId") UUID classroomId);

    @Query("""
           SELECT a FROM AdmissionApplication a
           WHERE a.academicYear.id = :academicYearId
             AND a.status = coalesce(:status, a.status)
             AND a.requestedLevel.id = coalesce(:levelId, a.requestedLevel.id)
                 AND (lower(a.firstName)         LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(a.lastName)          LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(a.applicationNumber) LIKE lower(concat('%', coalesce(:search, ''), '%')))
           """)
    Page<AdmissionApplication> search(@Param("academicYearId") UUID academicYearId,
                                      @Param("status") AdmissionStatus status,
                                      @Param("levelId") UUID levelId,
                                      @Param("search") String search,
                                      Pageable pageable);

    long countByAcademicYearIdAndStatus(UUID academicYearId, AdmissionStatus status);
}
