package ci.company.eduops.staff.repository;

import ci.company.eduops.staff.domain.Staff;
import ci.company.eduops.staff.domain.StaffStatus;
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
public interface StaffRepository extends JpaRepository<Staff, UUID> {

    Optional<Staff> findByUserAccountId(UUID userAccountId);

    List<Staff> findBySchoolIdAndStatus(UUID schoolId, StaffStatus status);

    Page<Staff> findBySchoolId(UUID schoolId, Pageable pageable);

    boolean existsBySchoolIdAndEmployeeNumber(UUID schoolId, String employeeNumber);

    Optional<Staff> findByIdAndSchoolId(UUID id, UUID schoolId);

    /**
     * Le personnel de l'école, filtré et cherché.
     *
     * <p>Le filtrage se fait ici et non en mémoire : une école de cinquante
     * agents tient en RAM, mais un groupe scolaire multi-campus n'y tient
     * plus, et le jour où cela déborde personne ne relie la lenteur à cette
     * ligne.</p>
     *
     * <p>Le tri est écrit dans la requête, et l'appelant passe une pagination
     * <em>sans</em> tri. Laisser Spring Data ajouter l'{@code ORDER BY} l'oblige
     * à deviner l'alias de la requête, et cette détection se trompe en
     * présence d'un {@code JOIN FETCH} : aucune autre requête paginée du
     * projet ne combine les deux, celle-ci était la seule à s'y risquer.</p>
     *
     * <h2>Aucun paramètre nul</h2>
     *
     * <p>Les filtres absents arrivent en chaîne vide, jamais en {@code null}, et
     * le statut est comparé sous sa forme texte plutôt que lié comme
     * énumération. Les colonnes de statut sont des types énumérés natifs de
     * PostgreSQL : lier {@code null} sur un tel paramètre laisse le serveur
     * sans type à inférer, et comparer une énumération native à un paramètre
     * lié réclame une conversion explicite. Passer par le texte supprime les
     * deux difficultés d'un coup, au prix d'une comparaison de chaînes que
     * l'index de statut couvre de toute façon mal sur cinq valeurs.</p>
     */
    @Query("""
            SELECT s FROM Staff s
              LEFT JOIN FETCH s.campus
            WHERE s.school.id = :schoolId
              AND (:status = '' OR CAST(s.status AS String) = :status)
              AND (:search = ''
                   OR LOWER(s.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(s.employeeNumber) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(s.jobTitle) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(COALESCE(s.department, '')) LIKE LOWER(CONCAT('%', :search, '%')))
            ORDER BY s.lastName ASC, s.firstName ASC
            """,
            countQuery = """
            SELECT COUNT(s) FROM Staff s
            WHERE s.school.id = :schoolId
              AND (:status = '' OR CAST(s.status AS String) = :status)
              AND (:search = ''
                   OR LOWER(s.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(s.employeeNumber) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(s.jobTitle) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(COALESCE(s.department, '')) LIKE LOWER(CONCAT('%', :search, '%')))
            """)
    Page<Staff> search(@Param("schoolId") UUID schoolId,
                       @Param("status") String status,
                       @Param("search") String search,
                       Pageable pageable);

    @Query("""
            SELECT s.status, COUNT(s) FROM Staff s
            WHERE s.school.id = :schoolId
            GROUP BY s.status
            """)
    List<Object[]> countByStatus(@Param("schoolId") UUID schoolId);
}
