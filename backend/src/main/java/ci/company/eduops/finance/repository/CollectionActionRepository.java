package ci.company.eduops.finance.repository;
import ci.company.eduops.finance.domain.CollectionAction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
public interface CollectionActionRepository extends JpaRepository<CollectionAction, UUID> {
    @org.springframework.data.jpa.repository.Query(value = "SELECT DISTINCT ON (student_id) * FROM collection_action WHERE school_id = :schoolId AND academic_year_id = :yearId ORDER BY student_id, created_at DESC, id DESC", nativeQuery = true)
    List<CollectionAction> latestForYear(@org.springframework.data.repository.query.Param("schoolId") UUID schoolId, @org.springframework.data.repository.query.Param("yearId") UUID yearId);
    List<CollectionAction> findBySchoolIdAndStudentIdAndAcademicYearIdOrderByCreatedAtDesc(UUID schoolId, UUID studentId, UUID yearId);
}
