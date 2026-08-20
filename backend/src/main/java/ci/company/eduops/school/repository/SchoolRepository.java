package ci.company.eduops.school.repository;

import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.domain.SchoolStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<School, UUID> {

    Optional<School> findByCode(String code);

    List<School> findByStatus(SchoolStatus status);

    boolean existsByCode(String code);
}
