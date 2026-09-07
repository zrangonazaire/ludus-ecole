package ci.company.eduops.health.repository;

import ci.company.eduops.health.domain.ExaminationKind;
import ci.company.eduops.health.domain.MedicalExamination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MedicalExaminationRepository extends JpaRepository<MedicalExamination, UUID> {

    @Query("""
            SELECT m FROM MedicalExamination m
            WHERE m.academicYear.id = :yearId
                  AND (LOWER(m.student.firstName) LIKE LOWER(CONCAT('%', COALESCE(:search, ''), '%'))
                    OR LOWER(m.student.lastName) LIKE LOWER(CONCAT('%', COALESCE(:search, ''), '%'))
                    OR LOWER(m.student.studentNumber) LIKE LOWER(CONCAT('%', COALESCE(:search, ''), '%')))
            ORDER BY m.scheduledOn ASC
            """)
    List<MedicalExamination> findForYear(@Param("yearId") UUID yearId,
                                         @Param("search") String search);

    Optional<MedicalExamination> findByStudentIdAndAcademicYearIdAndKind(UUID studentId,
                                                                        UUID academicYearId,
                                                                        ExaminationKind kind);

    List<MedicalExamination> findByStudentIdOrderByScheduledOnDesc(UUID studentId);
}
