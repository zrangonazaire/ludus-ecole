package ci.company.eduops.room.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
    List<Room> findByBuildingRefIdAndStatus(UUID buildingId, CommonStatus status);

    List<Room> findByCampusIdAndStatus(UUID campusId, CommonStatus status);

    Page<Room> findByCampusId(UUID campusId, Pageable pageable);

    Optional<Room> findByCampusIdAndCode(UUID campusId, String code);

    boolean existsByCampusIdAndCode(UUID campusId, String code);

    long countByCampusId(UUID campusId);

    boolean existsByCampusIdAndStatus(UUID campusId, CommonStatus status);

    /**
     * L'écran Bâtiments et salles, en une requête.
     *
     * <p>Le campus est chargé avec la salle : sans le fetch join, une liste de
     * soixante salles demanderait soixante requêtes pour afficher le nom du
     * campus de chacune. Le filtre passe par le campus, seule table qui porte
     * l'établissement (la table {@code room} n'a pas de {@code school_id}).</p>
     *
     * <p>{@code status} vide veut dire « actives et archivées » : la même
     * convention que la recherche des classes, où le filtre est construit par
     * le service.</p>
     */
    @Query("""
           SELECT r FROM Room r
           JOIN FETCH r.campus c
           WHERE c.school.id = :schoolId
             AND (:campusId IS NULL OR c.id = :campusId)
             AND (:status = '' OR CAST(r.status AS String) = :status)
             AND (:roomType = '' OR r.roomType = :roomType)
             AND (:building = ''
                  OR lower(coalesce(r.building, '')) LIKE lower(concat('%', :building, '%')))
             AND (:search = ''
                  OR lower(r.name) LIKE lower(concat('%', :search, '%'))
                  OR lower(r.code) LIKE lower(concat('%', :search, '%'))
                  OR lower(coalesce(r.building, '')) LIKE lower(concat('%', :search, '%')))
           ORDER BY c.name, r.building, r.code
           """)
    List<Room> search(@Param("schoolId") UUID schoolId,
                      @Param("campusId") UUID campusId,
                      @Param("status") String status,
                      @Param("roomType") String roomType,
                      @Param("building") String building,
                      @Param("search") String search);
}
