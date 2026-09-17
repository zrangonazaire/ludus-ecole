package ci.company.eduops.room.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.room.domain.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BuildingRepository extends JpaRepository<Building, UUID> {

    @org.springframework.data.jpa.repository.Query("""
            SELECT b FROM Building b JOIN FETCH b.campus c
            WHERE c.school.id = :schoolId
              AND (:campusId IS NULL OR c.id = :campusId)
              AND (:status = '' OR CAST(b.status AS String) = :status)
              AND (:search = '' OR lower(b.name) LIKE lower(concat('%', :search, '%'))
                   OR lower(b.code) LIKE lower(concat('%', :search, '%')))
            ORDER BY c.name, b.code
            """)
    List<Building> search(@org.springframework.data.repository.query.Param("schoolId") UUID schoolId,
                          @org.springframework.data.repository.query.Param("campusId") UUID campusId,
                          @org.springframework.data.repository.query.Param("status") String status,
                          @org.springframework.data.repository.query.Param("search") String search);

    List<Building> findByCampusSchoolId(UUID schoolId);

    List<Building> findByCampusSchoolIdAndStatus(UUID schoolId, CommonStatus status);

    List<Building> findByCampusId(UUID campusId);

    List<Building> findByCampusIdAndStatus(UUID campusId, CommonStatus status);

    Optional<Building> findByCampusIdAndCode(UUID campusId, String code);

    boolean existsByCampusIdAndCode(UUID campusId, String code);

    boolean existsByCampusIdAndStatus(UUID campusId, CommonStatus status);
}
