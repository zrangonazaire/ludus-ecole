package ci.company.eduops.notification.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

/**
 * Loads and renders the mail templates stored in {@code notification_template}
 * so wording can be changed without a redeploy.
 *
 * <p>Placeholders use the {@code {{name}}} form.</p>
 */
@Service
public class NotificationTemplateService {

    private final JdbcTemplate jdbcTemplate;

    public NotificationTemplateService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /** A rendered template ready to be sent. */
    public record RenderedTemplate(String subject, String body) {
    }

    public Optional<RenderedTemplate> render(String code, Map<String, Object> variables) {
        return jdbcTemplate.query("""
                        SELECT subject, body_template FROM notification_template
                        WHERE code = ? AND active = true
                        ORDER BY school_id NULLS LAST
                        LIMIT 1
                        """,
                        rs -> rs.next()
                                ? Optional.of(new RenderedTemplate(
                                        substitute(rs.getString("subject"), variables),
                                        substitute(rs.getString("body_template"), variables)))
                                : Optional.empty(),
                        code);
    }

    private String substitute(String template, Map<String, Object> variables) {
        if (template == null) {
            return "";
        }
        String result = template;
        for (Map.Entry<String, Object> entry : variables.entrySet()) {
            String value = entry.getValue() == null ? "" : String.valueOf(entry.getValue());
            result = result.replace("{{" + entry.getKey() + "}}", value);
        }
        // Drop any placeholder left unfilled rather than printing it raw.
        return result.replaceAll("\\{\\{[^}]*}}", "");
    }
}
