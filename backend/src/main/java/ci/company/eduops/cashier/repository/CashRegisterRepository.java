package ci.company.eduops.cashier.repository;

import ci.company.eduops.cashier.domain.CashRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CashRegisterRepository extends JpaRepository<CashRegister, UUID> {

    @Query("SELECT r FROM CashRegister r JOIN FETCH r.cashier WHERE r.school.id = :schoolId ORDER BY r.name")
    List<CashRegister> findAllBySchool(@Param("schoolId") UUID schoolId);

    @Query("SELECT r FROM CashRegister r JOIN FETCH r.cashier WHERE r.school.id = :schoolId AND r.id = :id")
    Optional<CashRegister> findInSchool(@Param("id") UUID id, @Param("schoolId") UUID schoolId);

    @Query("SELECT r FROM CashRegister r JOIN FETCH r.cashier WHERE r.school.id = :schoolId AND r.cashier.id = :cashierId AND r.active = true")
    Optional<CashRegister> findActiveForCashier(@Param("schoolId") UUID schoolId,
                                                @Param("cashierId") UUID cashierId);
}
