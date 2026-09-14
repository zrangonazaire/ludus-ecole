package ci.company.eduops.notification.repository;

import ci.company.eduops.notification.domain.Notification;
import ci.company.eduops.notification.domain.NotificationChannel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    /**
     * La boîte de réception d'une personne.
     *
     * <p>Le destinataire n'est pas un filtre parmi d'autres : c'est la
     * condition principale, et elle n'est jamais facultative. L'isolation par
     * école posée en V31 empêche de lire l'école du voisin ; elle n'empêche
     * pas, à l'intérieur d'une école, de lire les messages d'un collègue.
     * C'est cette ligne qui s'en charge.</p>
     *
     * <p>Non lus d'abord, puis du plus récent au plus ancien : ouvrir sa boîte
     * pour chercher ce qui reste à traiter est le geste courant.</p>
     */
    @Query("""
           SELECT n FROM Notification n
           WHERE n.recipientUserId = :userId
             AND n.channel = :channel
             AND (:category = '' OR n.category = :category)
             AND (:unreadOnly = FALSE OR n.readAt IS NULL)
           ORDER BY CASE WHEN n.readAt IS NULL THEN 0 ELSE 1 END ASC,
                    n.createdAt DESC
           """)
    Page<Notification> inboxByChannel(@Param("userId") UUID userId,
                             @Param("category") String category,
                             @Param("unreadOnly") boolean unreadOnly,
                             @Param("channel") NotificationChannel channel,
                             Pageable pageable);

    // Bind the enum as a parameter: literal casts use the Java enum name,
    // which differs from PostgreSQL's notification_channel type.
    default Page<Notification> inbox(UUID userId, String category, boolean unreadOnly, Pageable pageable) {
        return inboxByChannel(userId, category, unreadOnly, NotificationChannel.IN_APP, pageable);
    }

    @Query("""
           SELECT COUNT(n) FROM Notification n
           WHERE n.recipientUserId = :userId
             AND n.channel = :channel
             AND n.readAt IS NULL
           """)
    long countUnreadByChannel(@Param("userId") UUID userId,
                              @Param("channel") NotificationChannel channel);

    default long countUnread(UUID userId) {
        return countUnreadByChannel(userId, NotificationChannel.IN_APP);
    }

    /** Les catégories réellement présentes, pour n'offrir que des filtres utiles. */
    @Query("""
           SELECT DISTINCT n.category FROM Notification n
           WHERE n.recipientUserId = :userId
           ORDER BY n.category ASC
           """)
    List<String> categories(@Param("userId") UUID userId);

    /**
     * Un message précis, à condition qu'il soit adressé à cette personne.
     *
     * <p>Chercher par identifiant seul puis comparer le destinataire aurait
     * marché aussi ; le mettre dans la requête garantit qu'aucun appelant ne
     * peut oublier la comparaison.</p>
     */
    Optional<Notification> findByIdAndRecipientUserId(UUID id, UUID recipientUserId);

    @Query("""
           SELECT n FROM Notification n
           WHERE n.recipientUserId = :userId AND n.readAt IS NULL
           """)
    List<Notification> findUnread(@Param("userId") UUID userId);
}
