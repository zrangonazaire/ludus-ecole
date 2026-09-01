package ci.company.eduops.security.repository;

import ci.company.eduops.security.entity.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppRoleRepository extends JpaRepository<AppRole, UUID> {

    Optional<AppRole> findByCode(String code);

    List<AppRole> findByCodeIn(Collection<String> codes);

    @Query("""
           SELECT DISTINCT r FROM AppRole r
           WHERE r.systemRole = true OR r.schoolId = :schoolId
           ORDER BY r.systemRole DESC, r.label
           """)
    List<AppRole> findVisible(@Param("schoolId") UUID schoolId);

    @Query("""
           SELECT r FROM AppRole r
           WHERE upper(r.code) = upper(:code)
             AND (r.systemRole = true OR r.schoolId = :schoolId)
           """)
    List<AppRole> findVisibleByCode(@Param("code") String code,
                                    @Param("schoolId") UUID schoolId);
}
