package ci.company.eduops.notification;

import ci.company.eduops.notification.repository.NotificationRepository;
import ci.company.eduops.support.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class NotificationInboxIT extends AbstractIntegrationTest {
    @Autowired NotificationRepository repository;

    @Test
    void emptyInboxAndUnreadCountCanBeQueriedOnPostgres() {
        UUID user = UUID.randomUUID();
        assertThat(repository.inbox(user, "", false, PageRequest.of(0, 30)).getContent()).isEmpty();
        assertThat(repository.inbox(user, "PAYMENT", true, PageRequest.of(0, 30)).getContent()).isEmpty();
        assertThat(repository.countUnread(user)).isZero();
        assertThat(repository.categories(user)).isEmpty();
    }
}
