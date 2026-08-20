package ci.company.eduops.security.repository;

import ci.company.eduops.security.entity.AppPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppPermissionRepository extends JpaRepository<AppPermission, UUID> {

    Optional<AppPermission> findByCode(String code);

    List<AppPermission> findByModule(String module);
}
