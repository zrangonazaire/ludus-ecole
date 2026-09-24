package ci.company.eduops.finance.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.finance.domain.FeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeeTypeRepository extends JpaRepository<FeeType, UUID> {

    List<FeeType> findBySchoolIdAndStatus(UUID schoolId, CommonStatus status);

    Optional<FeeType> findBySchoolIdAndCode(UUID schoolId, String code);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);

    /** Tous statuts confondus : verrouille le code d'une catégorie utilisée. */
    long countBySchoolIdAndCategory(UUID schoolId, String category);

    long countBySchoolIdAndCategoryAndStatus(UUID schoolId, String category,
                                             CommonStatus status);

    /** Utilisation actives par rubrique, en une seule passe pour la liste. */
    @Query("""
           SELECT t.category, COUNT(t) FROM FeeType t
           WHERE t.school.id = :schoolId AND t.status = :status
           GROUP BY t.category
           """)
    List<Object[]> countByCategory(@Param("schoolId") UUID schoolId,
                                   @Param("status") CommonStatus status);
}
