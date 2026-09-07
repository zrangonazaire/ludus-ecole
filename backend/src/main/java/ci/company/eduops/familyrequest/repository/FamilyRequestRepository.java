package ci.company.eduops.familyrequest.repository;

import ci.company.eduops.familyrequest.domain.FamilyRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FamilyRequestRepository extends JpaRepository<FamilyRequest, UUID> {

    @EntityGraph(attributePaths = "student")
    List<FamilyRequest> findBySchoolId(UUID schoolId);

    @EntityGraph(attributePaths = "student")
    Optional<FamilyRequest> findByIdAndSchoolId(UUID id, UUID schoolId);
}
