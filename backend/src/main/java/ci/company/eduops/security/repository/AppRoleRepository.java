package ci.company.eduops.security.repository;

import ci.company.eduops.security.entity.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppRoleRepository extends JpaRepository<AppRole, UUID> {

    Optional<AppRole> findByCode(String code);

    List<AppRole> findByCodeIn(Collection<String> codes);
}
