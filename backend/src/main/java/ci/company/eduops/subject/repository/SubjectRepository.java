package ci.company.eduops.subject.repository;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.subject.domain.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, UUID> {

    List<Subject> findBySchoolIdAndStatusOrderByNameAsc(UUID schoolId, CommonStatus status);

    Optional<Subject> findBySchoolIdAndCode(UUID schoolId, String code);

    List<Subject> findByIdIn(Collection<UUID> ids);

    @Query("""
           SELECT s FROM Subject s
           WHERE s.school.id = :schoolId
             AND (:search = ''
                  OR lower(s.name) LIKE lower(concat('%', :search, '%'))
                  OR lower(s.code) LIKE lower(concat('%', :search, '%')))
           """)
    Page<Subject> search(@Param("schoolId") UUID schoolId,
                         @Param("search") String search,
                         Pageable pageable);

    boolean existsBySchoolIdAndCode(UUID schoolId, String code);
}
