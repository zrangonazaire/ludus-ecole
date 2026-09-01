package ci.company.eduops.messaging.repository;

import ci.company.eduops.messaging.domain.MessagingSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MessagingSettingsRepository extends JpaRepository<MessagingSettings, UUID> {

    Optional<MessagingSettings> findBySchoolId(UUID schoolId);
}
