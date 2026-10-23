package ci.company.eduops.messaging.repository;

import ci.company.eduops.messaging.domain.MessageResponseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageResponseRequestRepository extends JpaRepository<MessageResponseRequest, UUID> {

    Optional<MessageResponseRequest> findByTokenHash(String tokenHash);

    @Query("""
            SELECT r FROM MessageResponseRequest r
              JOIN FETCH r.campaign c
              JOIN FETCH r.recipient recipient
            WHERE r.answeredAt IS NOT NULL
            ORDER BY r.answeredAt DESC
            """)
    List<MessageResponseRequest> findAnswered();

    @Query("""
            SELECT r FROM MessageResponseRequest r
              JOIN FETCH r.campaign c
            WHERE r.tokenHash = :hash
            """)
    Optional<MessageResponseRequest> findForPublicToken(@Param("hash") String hash);
}
