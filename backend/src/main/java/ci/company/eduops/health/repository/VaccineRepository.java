package ci.company.eduops.health.repository;

import ci.company.eduops.health.domain.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VaccineRepository extends JpaRepository<Vaccine, UUID> {

    List<Vaccine> findBySchoolIdAndActiveTrueOrderByDisplayOrderAsc(UUID schoolId);

    Optional<Vaccine> findBySchoolIdAndCode(UUID schoolId, String code);
}
