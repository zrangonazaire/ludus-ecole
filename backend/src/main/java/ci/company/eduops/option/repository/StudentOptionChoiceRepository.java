package ci.company.eduops.option.repository;

import ci.company.eduops.option.domain.OptionChoiceStatus;
import ci.company.eduops.option.domain.StudentOptionChoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentOptionChoiceRepository extends JpaRepository<StudentOptionChoice, UUID> {
    boolean existsByOfferingIdAndStudentId(UUID offeringId, UUID studentId);

    long countByOfferingIdAndStatus(UUID offeringId, OptionChoiceStatus status);

    @Query("""
           SELECT c.offering.id, c.status, COUNT(c)
           FROM StudentOptionChoice c
           WHERE c.offering.academicYear.id = :yearId
           GROUP BY c.offering.id, c.status
           """)
    List<Object[]> countByOfferingAndStatus(@Param("yearId") UUID yearId);

    @EntityGraph(attributePaths = {
            "offering", "offering.option", "offering.level", "student",
            "enrollment", "enrollment.classroom"
    })
    @Query("""
           SELECT c FROM StudentOptionChoice c
           WHERE c.offering.academicYear.id = :yearId
             AND c.offering.option.school.id = :schoolId
             AND (:offeringId IS NULL OR c.offering.id = :offeringId)
             AND (:status = '' OR CAST(c.status AS String) = :status)
             AND (:search IS NULL
                  OR lower(c.student.firstName) LIKE lower(concat('%', :search, '%'))
                  OR lower(c.student.lastName) LIKE lower(concat('%', :search, '%'))
                  OR lower(c.student.studentNumber) LIKE lower(concat('%', :search, '%')))
           """)
    Page<StudentOptionChoice> search(@Param("schoolId") UUID schoolId,
                                     @Param("yearId") UUID yearId,
                                     @Param("offeringId") UUID offeringId,
                                     @Param("status") String status,
                                     @Param("search") String search,
                                     Pageable pageable);
}
