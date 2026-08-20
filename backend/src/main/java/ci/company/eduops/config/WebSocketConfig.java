package ci.company.eduops.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Real-time channels consumed by the Angular dashboard (section 48).
 *
 * <p>Public topics:</p>
 * <ul>
 *   <li>{@code /channels/dashboard}</li>
 *   <li>{@code /channels/attendance}</li>
 *   <li>{@code /channels/grades}</li>
 *   <li>{@code /channels/payments}</li>
 *   <li>{@code /channels/alerts}</li>
 *   <li>{@code /channels/notifications}</li>
 * </ul>
 *
 * <p>Per-user notifications additionally use {@code /user/queue/notifications}.</p>
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final EduOpsProperties properties;

    public WebSocketConfig(EduOpsProperties properties) {
        this.properties = properties;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/channels", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        String[] origins = properties.getCors().getAllowedOrigins().split(",");
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns(origins)
                .withSockJS();
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns(origins);
    }
}
