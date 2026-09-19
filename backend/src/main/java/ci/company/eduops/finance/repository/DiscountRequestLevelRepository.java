package ci.company.eduops.finance.repository;

import ci.company.eduops.finance.domain.DiscountRequestLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DiscountRequestLevelRepository extends JpaRepository<DiscountRequestLevel, UUID> {

    List<DiscountRequestLevel> findByRequestIdOrderByLevelNumberAsc(UUID requestId);
}
