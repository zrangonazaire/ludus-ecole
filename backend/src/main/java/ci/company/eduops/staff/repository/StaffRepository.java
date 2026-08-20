package ci.company.eduops.staff.repository;

import ci.company.eduops.staff.domain.Staff;
import ci.company.eduops.staff.domain.StaffStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<Staff, UUID> {

    Optional<Staff> findByUserAccountId(UUID userAccountId);

    List<Staff> findBySchoolIdAndStatus(UUID schoolId, StaffStatus status);

    Page<Staff> findBySchoolId(UUID schoolId, Pageable pageable);

    boolean existsBySchoolIdAndEmployeeNumber(UUID schoolId, String employeeNumber);
}
