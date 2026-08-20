package ci.company.eduops.student.repository;

import ci.company.eduops.student.domain.StudentStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentStatusHistoryRepository extends JpaRepository<StudentStatusHistory, UUID> {

    List<StudentStatusHistory> findByStudentIdOrderByChangedAtDesc(UUID studentId);
}
