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
             AND (:type IS NULL OR d.type = :type)
             AND (:status IS NULL OR d.status = :status)
             AND (:studentId IS NULL OR d.student.id = :studentId)
             AND (:search IS NULL
                  OR lower(d.documentNumber) LIKE lower(concat('%', :search, '%'))
                  OR lower(d.title) LIKE lower(concat('%', :search, '%'))
                  OR lower(d.student.firstName) LIKE lower(concat('%', :search, '%'))
                  OR lower(d.student.lastName) LIKE lower(concat('%', :search, '%'))
                  OR lower(d.student.studentNumber) LIKE lower(concat('%', :search, '%')))
           ORDER BY d.issuedAt DESC, d.createdAt DESC
           """)
    Page<OfficialDocument> search(@Param("schoolId") UUID schoolId,
                                  @Param("type") DocumentType type,
                                  @Param("status") DocumentStatus status,
                                  @Param("studentId") UUID studentId,
                                  @Param("search") String search,
                                  Pageable pageable);

    Optional<OfficialDocument> findByIdAndSchoolId(UUID id, UUID schoolId);
}

