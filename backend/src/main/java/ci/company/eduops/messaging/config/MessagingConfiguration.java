package ci.company.eduops.messaging.config;

import ci.company.eduops.messaging.service.LoggingSmsGateway;
import ci.company.eduops.messaging.service.SmsGateway;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Wires the SMS gateway, and only the SMS gateway.
 *
 * <p>{@code @ConditionalOnMissingBean} belongs here, on a {@code @Bean} method
 * of a {@code @Configuration} class. Spring Boot evaluates it after the
 * regular component scan, so a real operator declared anywhere in the
 * application wins and this default steps aside.</p>
 *
 * <p>The same annotation on a component-scanned {@code @Service} does not
 * work: the condition is evaluated while the bean registry is still being
 * filled, the outcome depends on scan order, and the bean can vanish without
 * a word. That is not a theoretical concern — it is why the application
 * refused to start with « required a bean of type SmsGateway that could not
 * be found ».</p>
 *
 * <h2>Branching a real operator</h2>
 *
 * <p>Write one class implementing {@link SmsGateway}, annotate it
 * {@code @Service}, and this default disappears on the next start. Nothing
 * else in the application changes — {@code MessagingService} depends on the
 * interface alone.</p>
 */
@Configuration
public class MessagingConfiguration {

    /**
     * The gateway used until a real operator is declared.
     *
     * <p>It logs and sends nothing, which is the right default for something
     * that costs money per message and cannot be recalled.</p>
     */
    @Bean
    @ConditionalOnMissingBean(SmsGateway.class)
    public SmsGateway loggingSmsGateway() {
        return new LoggingSmsGateway();
    }
}
