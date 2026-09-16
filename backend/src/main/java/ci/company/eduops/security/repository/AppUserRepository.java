package ci.company.eduops.security.repository;

import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {

    java.util.List<AppUser> findBySchoolIdOrderByLastNameAscFirstNameAsc(UUID schoolId);

    @Query("""
           SELECT u FROM AppUser u
           WHERE lower(u.username) = lower(:login) OR lower(u.email) = lower(:login)
           """)
    Optional<AppUser> findByLogin(@Param("login") String login);

    Optional<AppUser> findByUsernameIgnoreCase(String username);

    Optional<AppUser> findByEmailIgnoreCase(String email);

    boolean existsByUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);

    Page<AppUser> findByStatus(UserStatus status, Pageable pageable);

    @Query("""
           SELECT u FROM AppUser u
           WHERE (:search = ''
                  OR lower(u.firstName) LIKE lower(concat('%', :search, '%'))
                  OR lower(u.lastName)  LIKE lower(concat('%', :search, '%'))
                  OR lower(u.email)     LIKE lower(concat('%', :search, '%'))
                  OR lower(u.username)  LIKE lower(concat('%', :search, '%')))
             AND (:status = '' OR CAST(u.status AS String) = :status)
           """)
    Page<AppUser> search(@Param("search") String search,
                         @Param("status") String status,
                         Pageable pageable);

    @Query(value = """
           SELECT count(*) FROM app_user_role ur
           JOIN app_user u ON u.id = ur.user_id
           WHERE ur.role_id = :roleId AND u.school_id = :schoolId
           """, nativeQuery = true)
    long countByRoleAndSchool(@Param("roleId") UUID roleId,
                              @Param("schoolId") UUID schoolId);
}
