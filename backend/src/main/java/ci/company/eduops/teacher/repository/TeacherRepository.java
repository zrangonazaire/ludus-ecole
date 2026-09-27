package ci.company.eduops.teacher.repository;

import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.domain.TeacherStatus;
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
public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    @org.springframework.data.jpa.repository.Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT t FROM Teacher t WHERE t.id = :id")
    Optional<Teacher> lockById(@Param("id") UUID id);
    boolean existsBySchoolIdAndEmailIgnoreCase(UUID schoolId, String email);

    Optional<Teacher> findByUserAccountId(UUID userAccountId);

    /**
     * Les comptes utilisateur déjà rattachés à une fiche, en une requête.
     *
     * <p>La liste des utilisateurs montre où en est le rattachement : un
     * appel par ligne ferait autant d'allers-retours que d'utilisateurs.</p>
     */
    @Query("SELECT t.userAccountId FROM Teacher t WHERE t.school.id = :schoolId AND t.userAccountId IS NOT NULL")
    List<UUID> linkedAccountIds(@Param("schoolId") UUID schoolId);

    Optional<Teacher> findBySchoolIdAndEmployeeNumber(UUID schoolId, String employeeNumber);

    List<Teacher> findBySchoolIdAndStatus(UUID schoolId, TeacherStatus status);

    /** Toutes les fiches de l'établissement, rattachées ou non à un compte. */
    List<Teacher> findBySchoolId(UUID schoolId);

    boolean existsBySchoolIdAndEmployeeNumber(UUID schoolId, String employeeNumber);

    boolean existsBySchoolIdAndEmail(UUID schoolId, String email);

    /**
     * Le corps enseignant, filtré et cherché.
     *
     * <p>Aucun paramètre ne vaut {@code null} : un filtre absent arrive en
     * chaîne vide, et le statut est comparé sous sa forme texte. La colonne
     * {@code teacher_status} est un type énuméré natif de PostgreSQL — lier
     * {@code null} sur un tel paramètre laisse le serveur sans type à
     * inférer, et le comparer à un paramètre lié réclame une conversion
     * explicite.</p>
     *
     * <p>L'ordre appartient à la requête, pas au {@code Pageable} : la liste
     * affiche le nom du compte utilisateur, elle doit donc classer sur le
     * même nom. Trier sur {@code t.lastName} rangerait la ligne sous un
     * ancien nom après un renommage du compte.</p>
     */
    @Query("""
           SELECT t FROM Teacher t LEFT JOIN t.userAccount u
           WHERE t.school.id = :schoolId
             AND (:status = '' OR CAST(t.status AS String) = :status)
             AND (:search = ''
                  OR lower(coalesce(u.firstName, t.firstName))      LIKE lower(concat('%', :search, '%'))
                  OR lower(coalesce(u.lastName, t.lastName))       LIKE lower(concat('%', :search, '%'))
                  OR lower(t.employeeNumber) LIKE lower(concat('%', :search, '%')))
           ORDER BY lower(coalesce(u.lastName, t.lastName)), lower(coalesce(u.firstName, t.firstName))
           """)
    Page<Teacher> search(@Param("schoolId") UUID schoolId,
                         @Param("status") String status,
                         @Param("search") String search,
                         Pageable pageable);

    /**
     * How many classes each teacher is form tutor of, in one query.
     *
     * <p>Counted once for the whole page rather than per row: a list of forty
     * teachers would otherwise fire forty extra queries to fill one column.</p>
     */
    @Query("""
           SELECT c.mainTeacher.id, COUNT(c) FROM Classroom c
           WHERE c.mainTeacher IS NOT NULL
             AND c.academicYear.id = :academicYearId
           GROUP BY c.mainTeacher.id
           """)
    List<Object[]> countClassesByTeacher(@Param("academicYearId") UUID academicYearId);

    long countBySchoolIdAndStatus(UUID schoolId, TeacherStatus status);
}
