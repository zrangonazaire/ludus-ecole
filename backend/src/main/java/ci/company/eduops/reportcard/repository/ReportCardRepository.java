package ci.company.eduops.reportcard.repository;

import ci.company.eduops.reportcard.domain.ReportCard;
import ci.company.eduops.reportcard.domain.ReportCardStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReportCardRepository extends JpaRepository<ReportCard, UUID> {

    Optional<ReportCard> findByVerificationCode(String verificationCode);

    Optional<ReportCard> findByReference(String reference);

    List<ReportCard> findByStudentIdOrderByCreatedAtDesc(UUID studentId);

    List<ReportCard> findByClassroomIdAndTermId(UUID classroomId, UUID termId);

    @Query("""
           SELECT r FROM ReportCard r
           WHERE r.enrollment.id = :enrollmentId AND r.term.id = :termId
           ORDER BY r.revision DESC
           """)
    List<ReportCard> findRevisions(@Param("enrollmentId") UUID enrollmentId,
                                   @Param("termId") UUID termId);

    @Query("""
           SELECT r FROM ReportCard r
           WHERE r.enrollment.id = :enrollmentId AND r.term.id = :termId
             AND r.status = 'PUBLISHED'
           ORDER BY r.revision DESC
           """)
    List<ReportCard> findPublished(@Param("enrollmentId") UUID enrollmentId,
                                   @Param("termId") UUID termId);

    @Query("""
           SELECT COUNT(r) FROM ReportCard r
           WHERE r.academicYear.id = :academicYearId AND r.term.id = :termId AND r.status = :status
           """)
    long countByStatus(@Param("academicYearId") UUID academicYearId,
                       @Param("termId") UUID termId,
                       @Param("status") ReportCardStatus status);

    @Query("SELECT COALESCE(MAX(r.revision), 0) FROM ReportCard r WHERE r.enrollment.id = :enrollmentId AND r.term.id = :termId")
    int maxRevision(@Param("enrollmentId") UUID enrollmentId, @Param("termId") UUID termId);
}
