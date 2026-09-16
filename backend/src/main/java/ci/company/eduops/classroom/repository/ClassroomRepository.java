package ci.company.eduops.classroom.repository;

import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, UUID> {

    List<Classroom> findByAcademicYearIdAndStatus(UUID academicYearId, ClassroomStatus status);

    List<Classroom> findByAcademicYearIdAndLevelId(UUID academicYearId, UUID levelId);

    Optional<Classroom> findByAcademicYearIdAndCampusIdAndCode(UUID academicYearId,
                                                               UUID campusId,
                                                               String code);

    /**
     * Pessimistic lock taken before the capacity check so two registrars cannot
     * both grab the last remaining seat (section 68).
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM Classroom c WHERE c.id = :id")
    Optional<Classroom> lockById(@Param("id") UUID id);

    @Query("""
           SELECT c FROM Classroom c
           WHERE c.academicYear.id = :academicYearId
             AND (:campusId IS NULL OR c.campus.id = :campusId)
             AND (:levelId  IS NULL OR c.level.id  = :levelId)
             AND (:status = '' OR CAST(c.status AS String) = :status)
             AND (:search = ''
                  OR lower(c.name) LIKE lower(concat('%', :search, '%'))
                  OR lower(c.code) LIKE lower(concat('%', :search, '%')))
           """)
    Page<Classroom> search(@Param("academicYearId") UUID academicYearId,
                           @Param("campusId") UUID campusId,
                           @Param("levelId") UUID levelId,
                           @Param("status") String status,
                           @Param("search") String search,
                           Pageable pageable);

    @Query("SELECT COUNT(c) FROM Classroom c WHERE c.academicYear.id = :academicYearId AND c.status = 'ACTIVE'")
    long countActive(@Param("academicYearId") UUID academicYearId);

    /** Active classes on a level, whatever the year: the archive guard. */
    long countByLevelIdAndStatus(UUID levelId, ClassroomStatus status);

    boolean existsByAcademicYearIdAndCampusIdAndCode(UUID academicYearId, UUID campusId, String code);

    /**
     * Nombre de classes actives qui ont cette salle par défaut, pour l'écran
     * des salles.
     *
     * <p>Une classe peut pointer sur une salle : si la salle est archivée, la
     * classe se retrouve avec un lieu qui n'existe plus. Le compteur sert à la
     * fois l'affichage et la règle d'archivage.</p>
     */
    @Query("""
           SELECT c.defaultRoom.id, COUNT(c) FROM Classroom c
           WHERE c.defaultRoom IS NOT NULL AND c.status = 'ACTIVE'
           GROUP BY c.defaultRoom.id
           """)
    List<Object[]> countActiveByDefaultRoom();
}
