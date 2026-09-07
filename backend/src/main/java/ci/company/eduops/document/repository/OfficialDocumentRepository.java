package ci.company.eduops.document.repository;

import ci.company.eduops.document.domain.DocumentStatus;
import ci.company.eduops.document.domain.DocumentType;
import ci.company.eduops.document.domain.OfficialDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OfficialDocumentRepository extends JpaRepository<OfficialDocument, UUID> {

    @Query("""
           SELECT d FROM OfficialDocument d
           WHERE d.school.id = :schoolId
             AND (:type = '' OR CAST(d.type AS String) = :type)
             AND (:status = '' OR CAST(d.status AS String) = :status)
             AND (:studentId IS NULL OR d.student.id = :studentId)
                 AND (lower(d.documentNumber) LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(d.title) LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(d.student.firstName) LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(d.student.lastName) LIKE lower(concat('%', coalesce(:search, ''), '%'))
                        OR lower(d.student.studentNumber) LIKE lower(concat('%', coalesce(:search, ''), '%')))
           ORDER BY d.issuedAt DESC, d.createdAt DESC
           """)
    Page<OfficialDocument> search(@Param("schoolId") UUID schoolId,
                                  @Param("type") String type,
                                  @Param("status") String status,
                                  @Param("studentId") UUID studentId,
                                  @Param("search") String search,
                                  Pageable pageable);

    Optional<OfficialDocument> findByIdAndSchoolId(UUID id, UUID schoolId);
}

