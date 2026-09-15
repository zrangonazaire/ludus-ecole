package ci.company.eduops.room.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {

    List<Room> findByCampusIdAndStatus(UUID campusId, CommonStatus status);

    Page<Room> findByCampusId(UUID campusId, Pageable pageable);

    Optional<Room> findByCampusIdAndCode(UUID campusId, String code);

    boolean existsByCampusIdAndCode(UUID campusId, String code);

    long countByCampusId(UUID campusId);

    boolean existsByCampusIdAndStatus(UUID campusId, CommonStatus status);
}
