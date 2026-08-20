package ci.company.eduops.notification.service;

import ci.company.eduops.config.EduOpsProperties;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * The single implementation of {@link MailService}. It talks to whatever SMTP
 * host the active profile configures: Mailpit in dev, a real relay in prod.
 *
 * <p>Sending is asynchronous: a slow mail server must never delay an enrollment
 * or a payment.</p>
 */
@Service
public class SmtpMailService implements MailService {

    private static final Logger log = LoggerFactory.getLogger(SmtpMailService.class);

    private final JavaMailSender mailSender;
    private final EduOpsProperties properties;
    private final NotificationTemplateService templateService;

    public SmtpMailService(JavaMailSender mailSender,
                           EduOpsProperties properties,
                           NotificationTemplateService templateService) {
        this.mailSender = mailSender;
        this.properties = properties;
        this.templateService = templateService;
    }

    @Override
    @Async("mailExecutor")
    public void send(String to, String subject, String body) {
        if (!enabled(to)) {
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(properties.getMail().getFrom());
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.debug("Mail '{}' sent to {}", subject, to);
        } catch (RuntimeException ex) {
            // A mail failure must never break the business operation.
            log.error("Unable to send the mail '{}' to {}: {}", subject, to, ex.getMessage());
        }
    }

    @Override
    @Async("mailExecutor")
    public void sendHtml(String to, String subject, String htmlBody) {
        if (!enabled(to)) {
            return;
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            helper.setFrom(properties.getMail().getFrom());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception ex) {
            log.error("Unable to send the HTML mail '{}' to {}: {}", subject, to, ex.getMessage());
        }
    }

    @Override
    public void sendTemplate(String to, String templateCode, Map<String, Object> variables) {
        templateService.render(templateCode, variables)
                .ifPresentOrElse(
                        rendered -> send(to, rendered.subject(), rendered.body()),
                        () -> log.warn("Mail template {} not found", templateCode));
    }

    private boolean enabled(String to) {
        if (!properties.getMail().isEnabled()) {
            log.debug("Mail disabled by configuration, nothing sent to {}", to);
            return false;
        }
        if (to == null || to.isBlank()) {
            return false;
        }
        return true;
    }
}
