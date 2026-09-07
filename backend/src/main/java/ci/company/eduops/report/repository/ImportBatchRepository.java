package ci.company.eduops.report.repository;

import ci.company.eduops.report.domain.ImportBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImportBatchRepository extends JpaRepository<ImportBatch, UUID> {

    /**
     * A batch, scoped to its school.
     *
     * <p>Row-level security already filters this, but the check is repeated in
     * the query: a batch id is a UUID handed back to the browser, and code that
     * relies on a database policy alone breaks quietly the day someone runs it
     * with the tenant bypass on.</p>
     */
    Optional<ImportBatch> findByIdAndSchoolId(UUID id, UUID schoolId);

    List<ImportBatch> findBySchoolIdOrderByUploadedAtDesc(UUID schoolId);

    /**
     * A batch that already wrote rows from an identical file.
     *
     * <p>Only {@code IMPORTED} counts: a preview that was never confirmed
     * created nothing, so re-uploading the same file after abandoning it is
     * ordinary and must not be flagged.</p>
     */
    @Query("""
            SELECT b FROM ImportBatch b
            WHERE b.schoolId = :schoolId
              AND b.fileHash = :fileHash
              AND b.status = ci.company.eduops.report.domain.ImportBatchStatus.IMPORTED
            ORDER BY b.uploadedAt DESC
            """)
    List<ImportBatch> findImportedWithHash(@Param("schoolId") UUID schoolId,
                                           @Param("fileHash") String fileHash);
}
